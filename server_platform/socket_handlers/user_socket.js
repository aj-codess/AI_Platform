import WebSocket from "ws";
import user_schema from "./../models/user_schema.js";
import community_schema from "./../models/community_schema.js";

import sessionless from "./../controller/sessionless_controller.js";

const user_socketModel = new WebSocket.Server({noServer:true});

user_socketModel.on("connection",async (socket_address,req)=>{

    socket_address.send(JSON.stringify({status:"sucess",message:"Start Your AI Chat"}));

    if(!sessionless.idIsIn_session(socket_address.id)){

        const user_payload=await user_schema.findOne(
            {id:socket_address.id},
            {"chat_queue.id":1,"chat_queue.name":1}
        );

        if(user_payload.length>0){
            socket_address.send(JSON.stringify({message:payload}));
        }

    };


    socket_address.on("message",(message)=>{

        try{

            let payload_in=JSON.parse(message);

            if(payload_in.action){

                let payload_out;

                switch(payload_in.action){
                    case "create_chat":
                    //payload_out=
                    break;

                    case "Delete_chat":

                    break;

                    case "Delete_message":

                    break;

                    case "make_chat":
                        
                    break;

                    defaut:
                    payload_out={message:"Unsupported Action"};
                    break;

                };

            };

            socket_address.send(JSON.stringify(payload_out));

        } catch(error){

            socket_address.send(JSON.stringify({message:"internal Server Error",error}));

            console.log(error.message);

        }

    });


    socket_address.on("close",()=>{

        //get track of the user that disconnected

    })

    socket_address.on("error",(err)=>{

        console.error("websocket Error: ",err);

    });

});

export default user_socketModel;