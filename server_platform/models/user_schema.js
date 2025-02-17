import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define User Schema
const userSchema = new mongoose.Schema(
    {
        id:{
            type: String,
            required:true,
            unique:true,
        },
        userName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        phone:{
            type: String,
            required:false,
            minlength:10,
            maxlength:13,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);


userSchema.methods.matchPassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);

};

// Create User Model
const user = mongoose.model("User", userSchema);

export default user;
