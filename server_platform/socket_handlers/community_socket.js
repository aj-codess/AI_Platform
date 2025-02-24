import WebSocket from "ws";
import community_schema from "./../models/community_schema.js";
import connection_schema from "./../models/connection_schema.js";
import generateResponse from "./../config/api_endpoint.js";
import logService from "../service/logService.js";
import dotenv from "dotenv";


dotenv.config();

const community_socketModel = new WebSocet.Server({noServer:true});

community_socketModel.on("connection",async(socket_address,req)=>{

    const {community_id,name}=socket_address.body;

    const isInCommunity=await community_schema.findOne({
        community_id:community_id,
        name:name
    });

    if(!isInCommunity.admins.includes(socket_address.id) || !isInCommunity.submembers.includes(socket_address.id) || !isInCommunity.owner_id==socket_address.id){

        socket_address.terminate();

    };

    socket_address.send(JSON.stringify({status:"success",payload:isInCommunity}));


    const socket_details={
        socket_id:socker_address.id,
        ip:socket_address.handshake.address,
        port:process.env.SERVER_PORT,
        connected_at: new Date()
    };


    await store_connection(community_id,name,socket_details);

    socket_address.on("message",async(message)=>{

        try{

            let payload_in=JSON.parse(message);

            await make_broadcast(community_id,name,payload_in);

            let ai_response;

            let AI_res_obj;

            if(payload_in.forAI==true){

                const users=new Array();

                users.push(socket_address.id);

                ai_response=await generateResponse(payload_in.message);

                AI_res_obj={
                    id: logService.gen_id(),
                    forAI: false,
                    sender: "AI",
                    message: ai_response,
                    forUser: users,
                    seen_id: [],
                    replies: []
                };

            };


            await make_broadcast(community_id,name,AI_res_obj);

            await pushTo_db(community_id,name,payload_in);

            await pushTo_db(community_id,name,AI_res_obj);

        } catch(error){

            socket_address.send(JSON.stringify({message:"internal Server Error",error}));

            console.log(error.message);

        }

    });


//make a ping pong event mechanism for db streaming

    socket_address.on("close",()=>{

        //get track of the user that disconnected

    });

    socket_address.on("error",(err)=>{

        console.error("websocket Error: ",err);

    });


    socket.on("disconnect", async () => {
        console.log(`Socket disconnected: ${socket.id}`);
        await connectionSchema.findOneAndUpdate(
            { "socket_addresses.socket_id": socket.id },
            { $pull: { socket_addresses: { socket_id: socket.id } } }
        );
    });

    

});



const getActiveSockets=async(community_id,name)=>{

    const community = await connectionSchema.findOne({community_id:community_id,name:name});

    return community ? community.socket_addresses : [];

};


const make_broadcast=async(community_id,name,payload)=>{

    try{

        const active_sockets=await getActiveSockets(community_id,name);

        active_sockets.forEach(({ socket_id }) => {
            community_socketModel.to(socket_id).emit("message", payload);
        });

        return {status:"success",message:"Message Sent"};

    } catch(error){

        return {status:"Error",message:"Error Making broadcast"};

    }

};



const pushTo_db=async(community_id,name,payload)=>{

    const isPushed=await community_schema.findOneAndUpdate(
        {community_id,name},
        {
            $push:{message_queue:payload}
        },
        {new:true}
    );

    if(isPushed){

        return true;

    } else{

        return false;

    };

};



const store_connection=async(community_id,name,socket_details)=>{

    try{

        const connection=await connection_schema.findOneAndUpdate(
            {community_id:community_id,name:name},
            {
                $addToSet:{socket_addresses:socket_details}
            },
            {new:true}
        );
    
        if(connection){
    
            return true;
    
        };

    } catch(error){

        return false;

    }

};


export default community_socketModel;