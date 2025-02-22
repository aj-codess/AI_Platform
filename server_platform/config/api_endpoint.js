import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();


if (!process.env.OPENAI_API_KEY) {
  console.error("Error with API key in env.");
  process.exit(1);
}


const openai = new OpenAI({

});



let generateResponse=async(userMessage)=>{

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        });

        return response.choices[0]?.message?.content || "No response generated.";

    } catch (error) {

        console.error("ERROR:", error.response?.data || error.message);

        return "An error occurred while processing your request.";
  
    };

}


export default generateResponse;