import user_schema from "./../models/user_schema.js";
import logService from "./../service/logService.js"


const create_chat = async (user_id, name) => {

    try {

        const chat_id = log_service.gen_id();

        const isExist = await user_schema.findOne({ id: user_id });

        if (isExist) {

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




const delete_chat=async(user_id,chat_id)=>{

    try{

        const isExist=await user_schema.findOne({id:user_id});

        if(isExist){

            const isDeleted=await user_schema.findOneAndUpdate(
                {id:user_id},
                {
                    $pull:{chat_queue:{chat_id:chat_id}}

                },
                {new:true}
            );

            if(isDeleted){

                const newChatList=await user_schema.findOne(
                    {id:user_id},
                    {"chat_queue.chat_id":1,"chat_queue.name":1}
                );
        
                if(newChatList.length>0){

                    return {status:"Success",newChatList};

                };

            };

        } else{
            
            return { status: "Error", message: "User not found" };

        };

    } catch(error){

        console.error("Database Error: ",error);

        return {status:"Error",message:"Internal Server Error"};

    }

};


const delete_message=async(user_id,chat_id,message_id)=>{

};


const make_chat=async()=>{

};


export default {
    create_chat,
    delete_chat,
    delete_message,
    make_chat
}