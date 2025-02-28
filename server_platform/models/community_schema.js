import mongoose from "mongoose";
import bcrypt from "bcrypt";

const communitySchema = new mongoose.Schema({
    _id:false,
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
        type: String,
        unique:true
    }],
    message_queue: {
        type: [{
            _id:false,
            id: { type: String },
            forAI: { type: Boolean, default: false },
            sender: { type: String, required: true },
            message: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
            forUser: [{ type: String }],
            seen_id: [{
                _id:false,
                id: { type: String },
                timestamp: { type: Date, default: Date.now }
            }],
            replies: [{
                _id:false,
                id: { type: String },
                sender: { type: String, required: true },
                message: { type: String, required: true },
                timestamp: { type: Date, default: Date.now }
            }]
        }],
        default: []
    },
    client_last_message_ref: [{
        _id:false,
        id: { type: String },
        timestamp: { type: Date }
    }],
    submembers: [{
        type: String,
        unique:true
    }],
    owner_id: {
        type: String,
        required: true
    },
    awaiting_submembers: [{
        type: String
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


const community_schema = mongoose.model('Community', communitySchema);


export default community_schema;
