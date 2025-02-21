import user_schema from "./../models/user_schema.js";
import logService from "./../service/logService.js"


const create_chat = async (user_id, name) => {

    try {

        const isExist = await user_schema.findOne({ id: user_id });

        if (isExist) {

            const chat_id = log_service.gen_id();

            const isCreated = await user_schema.findOneAndUpdate(
                { id: user_id },
                {
                    $push: {
                        chat_queue: {
                            id: chat_id,
                            name: name,
                            message_queue: []
                        }
                    }
                },
                { new: true }
            );

            if (isCreated) {

                return { status: "Success", chatData: { chat_id, name } };

            } else {

                return { status: "Error", message: "Failed to create chat" };

            }
        } else {

            return { status: "Error", message: "User not found" };

        }
    } catch (error) {

        console.error("Database Error:", error);

        return { status: "Error", message: "Internal Server Error" };

    }

};




const delete_chat = async (user_id, chat_id) => {

    try {

        const user = await user_schema.findOne({ id: user_id });

        if (!user) {

            return { status: "Error", message: "User not found" };

        }

        const isDeleted = await user_schema.findOneAndUpdate(
            { id: user_id },
            { $pull: { chat_queue: { chat_id: chat_id } } },
            { new: true }
        );

        if (!isDeleted) {

            return { status: "Error", message: "Chat not found or could not be deleted" };

        }


        const newChatList = await user_schema.findOne(
            { id: user_id },
            { "chat_queue.chat_id": 1, "chat_queue.name": 1, _id: 0 }
        );

        return { status: "Success", newChatList: newChatList.chat_queue };

    } catch (error) {

        console.error("Database Error:", error);

        return { status: "Error", message: "Internal Server Error" };

    };

};



const delete_message=async(user_id,chat_id,message_id)=>{

    try{

        const isExist=await user_schema.findOne({user_id:user_id});

        if(!isExist){

            return {status:"Error",message:"User not Found"};

        };
        
        const isDeleted = await user_schema.findOneAndUpdate(
            { user_id: user_id, "chat_queue.chat_id": chat_id },
            {
                $pull: {
                    "chat_queue.$.message_queue": { message_id: message_id }
                }
            },
            { new: true }
        );

        if (!isDeleted) {

            return { status: "Error", message: "Message not found or could not be deleted" };

        }else{

            return {status:"success",message:"Message Deleted"}

        };


    } catch(error){

        console.error("Database Error:", error);

        return { status: "Error", message: "Internal Server Error!. Message was not Deleted" };

    }

};





const chatMessage=async(user_id,chat_id)=>{

    try{

        const userChat = await user_schema.findOne(
            { id: user_id, "chat_queue.chat_id": chat_id },
            { "chat_queue.$": 1 }
        );

        if (!userChat || !userChat.chat_queue.length) {
            return { status: "Error", message: "Chat not found" };
        }

        const messages = userChat.chat_queue[0].message_queue;

        return { status: "Success", chat_id, messages };

    } catch(error){

        console.error("Database Error: ",error);

        return {status:"Error",message:"Internal Server Error!."}

    }

};




const make_chat=async(user_id,chat_id)=>{



};


export default {
    create_chat,
    delete_chat,
    delete_message,
    chatMessage,
    make_chat
}