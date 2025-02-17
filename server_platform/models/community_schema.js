import mongoose, { mongo } from "mongoose";

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
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim:true
    },
    admins: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    message_queue: {
        type: [{
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            forAI:{type:Boolean,default:false},
            sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            message: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
            forUser:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
            seen_id:[{id:mongoose.Schema.Types.ObjectId,timestamp:Date,ref:'User'}],
            replies: [{
                _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
                sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
                message: { type: String, required: true },
                timestamp: { type: Date, default: Date.now }
            }]
        }],
        default: []
    },
    client_last_message_ref:{
        type:[{id:mongoose.Schema.Types.ObjectId,timestamp:Date}],
        default:[]
    },
    submembers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    awaiting_submembers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    community_token: {
        type: String,
        required: true,
        unique: true
    },
    settings: {
        allow_token_invites: { type: Boolean, default: true },
        open_community: { type: Boolean, default: true },
        allow_submembers_chat: { type: Boolean, default:true },
        admin_AI_queryOnly:{type:Boolean,default:false}
    }
}, { timestamps: true });


const community = mongoose.model('Community', communitySchema);

export default community;