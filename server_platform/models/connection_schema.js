import mongoose from "mongoose";
import bcrypt from "bcrypt";

const connectionSchema = new mongoose.Schema({
    _id: false,
    community_id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    socket_addresses: [
        {
            socket_id: { type: String, required: true },
            ip: { type: String, required: true },
            port: { type: Number, required: true },
            connected_at: { type: Date, default: Date.now }
        }
    ]
});

const connection_schema=mongoose.model("Connections",connectionSchema);

export default connections_schema;