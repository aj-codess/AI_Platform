import mongoose from "mongoose";
import bcrypt from "bcrypt";

const communitySchema = new mongoose.Schema({
    community_id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    role: {
        type: String,
        trim: true
    },
    admins: [{
        type: String // Custom user ID instead of ObjectId
    }],
    message_queue: {
        type: [{
            id: { type: String }, // Custom message ID
            forAI: { type: Boolean, default: false },
            sender: { type: String, required: true }, // Custom user ID
            message: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
            forUser: [{ type: String }], // Array of custom user IDs
            seen_id: [{
                id: { type: String }, // Custom user ID
                timestamp: { type: Date, default: Date.now }
            }],
            replies: [{
                id: { type: String }, // Custom reply ID
                sender: { type: String, required: true }, // Custom user ID
                message: { type: String, required: true },
                timestamp: { type: Date, default: Date.now }
            }]
        }],
        default: []
    },
    client_last_message_ref: [{
        id: { type: String }, // Custom reference ID
        timestamp: { type: Date }
    }],
    submembers: [{
        type: String, // Custom user ID instead of ObjectId
        unique:true
    }],
    owner_id: {
        type: String, // Custom owner ID instead of ObjectId
        required: true
    },
    awaiting_submembers: [{
        type: String // Custom user ID
    }],
    community_token: {
        type: String,
        unique: true,
        required:true
    },
    settings: {
        open_community: { type: Boolean, default: true },
        allow_submembers_chat: { type: Boolean, default: true },
        admin_AI_queryOnly: { type: Boolean, default: false }
    }
}, { timestamps: true });


const community = mongoose.model('Community', communitySchema);


export default community;
