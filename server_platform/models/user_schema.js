const mongoose = require("mongoose");

// Define User Schema
const userSchema = new mongoose.Schema(
    {
        _id:{
            type:string,
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
            unique: true,
            lowercase: true,
            trim: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        phone:{
            type:string,
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

// Create User Model
const User = mongoose.model("User", userSchema);

module.exports = User;
