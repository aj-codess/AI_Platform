import mongoose from "mongoose";
import dotenv from "dotenv";

import user_schema from "./../models/user_schema.js";
import community_schema from "./../models/community_schema.js";

dotenv.config();

const connectDB=async()=>{

    try{

        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to Mongo.....");

    }catch(error){

        console.error("MongoDB Connection Error:", err);

        process.exit(1);

    }

};

export default connectDB;