import WebSocket from "ws";
import community_schema from "./../models/community_schema.js";
import connection_schema from "./../models/connection_schema.js";
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


    const storedConnection=await connection_schema.findOneAndUpdate(
        {community_id:community_id},
        {
            $addToSet:{socket_addresses:socket_details}
        },
        {new:true}
    );


    socket_address.on("message",async(message)=>{

        try{

            let payload_in=JSON.parse(message);

            

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

});

export default community_socketModel;