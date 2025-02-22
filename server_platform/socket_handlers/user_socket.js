import WebSocket from "ws";
import user_schema from "./../models/user_schema.js";
import community_schema from "./../models/community_schema.js";
import socket_action from "./../controller/socket_action_controller.js";
import sessionless from "./../controller/sessionless_controller.js";

const user_socketModel = new WebSocket.Server({noServer:true});



user_socketModel.on("connection",async (socket_address,req)=>{

    socket_address.send(JSON.stringify({status:"sucess",message:"Start Your AI Chat"}));

    if(!sessionless.idIsIn_session(socket_address.id)){

        const user_payload=await user_schema.findOne(
            {id:socket_address.id},
            { "chat_queue.chat_id": 1, "chat_queue.name": 1, "chat_queue.message_queue": 0, _id: 0 }
        );

        if(user_payload){

            socket_address.send(JSON.stringify({message:user_payload}));

        } else {

            socket_address.send(JSON.stringify({message:"User Not Found"}))

        };

    };


    socket_address.on("message",async (message)=>{

        try{

            let payload_in=JSON.parse(message);

            let payload_out;

            if(payload_in.action){

                switch(payload_in.action){
                    case "create_chat":
                    payload_out=await socket_action.create_chat(socket_address.id,payload_in.chat_name);
                    break;

                    case "Delete_chat":
                    payload_out=await socket_action.delete_chat(socket_address.id,payload_in.chat_id);
                    break;

                    case "Delete_message":
                    payload_out=await socket_action.delete_message(socket_address.id,payload_in.chat_id,payload_in.message_id)
                    break;

                    case "chatMessage":
                    payload_out=await socket_action.chatMessage(socket_address.id,payload_in.chat_id);
                    break;

                    case "make_chat":
                    payload_out=await socket_action.make_chat(socket_address.id,chat_id,"user");
                    break;

                    defaut:
                    payload_out={success:"Error",message:"Unsupported Action"};
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