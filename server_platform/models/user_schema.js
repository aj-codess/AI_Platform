import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    _id:false,
    id:{
        type: String,
        required: true,
        unique: true,
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
    phone: {
        type: String,
        required: false,
        minlength: 10,
        maxlength: 13,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    owned_communities: [{
        _id:false,
        community_id: { type: String ,required:true},
        name:{type: String},
        community_token: { type: String, required: true }
    }],
    chat_queue: {
        type: [{
            _id:false,
            chat_id: { type: String, required: true },
            name: { type: String, required: true },
            message_queue: [{
                _id:false,
                message_id:{type:String,required:true},
                message:{type:String,required:true},
                timestamp:{type:Date,default:Date.now}
            }],
            default:[]
        }],
        default: []
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true});



userSchema.methods.matchPassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);

};




userSchema.methods.toJSON = function () {

    const obj = this.toObject();

    delete obj.password;
    
    return obj;

};



const user = mongoose.model("User", userSchema);

export default user;
