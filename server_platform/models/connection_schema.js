import mongoose from "mongoose";
import bcrypt from "bcrypt";

const connectionSchema=new mongoose.Schema({
    _id:false,
    community_id:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    
});

const connections=mongoose.model("Connections",connectionSchema);

export default connections;