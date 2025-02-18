import user_schema from "./../models/user_schema.js";
import community_schema from "../models/community_schema.js";

import sessionless_contr from "./sessionless_controller.js";

const get_profile= async (req,res)=>{

    try{

        const user_id=req.id;

        if(sessionless_contr.idIsIn_session(user_id)){
            return res.status(200).json({message:"You are in Sessionless. Signup."})
        };

        const user_profile=await user_schema.findOne({id:user_id});

        return res.status(200).json(user_profile);

    } catch(error){

        return res.status(500).json({ message: "Internal Server Error", error });

    };

};


const createCom=(req,res)=>{

};


const joinCom=(req,res)=>{

};


const leaveCom=(req,res)=>{

};


const reportCom=(req,res)=>{

};


const comSubmembers=(req,res)=>{

};


const getAdm=(req,res)=>{

};


export default {
    get_profile,
    createCom,
    joinCom,
    leaveCom,
    reportCom,
    comSubmembers,
    getAdm,
};