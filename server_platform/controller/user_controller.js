import user_schema from "./../models/user_schema.js";
import community_schema from "../models/community_schema.js";
import connection_schema from "./../models/connection_schema.js"

import sessionless_contr from "./sessionless_controller.js";
import generateCommunityToken from "../service/token_dep_module.js";
import logService from "../service/logService.js";

const get_profile= async (req,res)=>{

    try{

        const user_id=req.id;

        if(sessionless_contr.idIsIn_session(user_id)){
            return res.status(200).json({message:"You are in Sessionless. Signup."})
        };

        const user_profile=await user_schema.findOne({id:user_id});

        if(user_profile){

            return res.status(200).json(user_profile);

        } else{
            res.status(500).json({message:"Unable to Find user Data"});
        };

    } catch(error){

        return res.status(500).json({ message: "Internal Server Error", error });

    };

};





const createCom=async(req,res)=>{

    try{

        const id=req.id;

        const com_id=log_service.gen_id();

        const token=generateCommunityToken();

        const {name}=req.body;

        const new_community=new community_schema({
            community_id:com_id,
            name:name,
            owner_id:id,
            community_token:token,
        });

        const new_room=new connection_schema({
            community_id:com_id,
            socket_addresses:[]
        });

        const ref={
            community_id:com_id,
            name:name,
            community_token:token
        };

        const comIsSaved=await new_community.save();
        const roomIsSaved=await new_room.save();

        const isSaved_ref=await user_schema.findOneAndUpdate(
            {id:id},
            {$addToSet:{owned_communities:ref}},
            {new:true}
        );

        if(comIsSaved && !isSaved_ref){

            return res.status(500).json({message:"Internal server Error Re-create community"});

        } else if(!comIsSaved && isSaved_ref){

            const isRemoved=await user_schema.findOneAndUpdate(
                {id:id},
                {
                    $pull:{"owned_communities":com_id}
                },
                {new:true}
            );

            if(isRemoved){
                return res.status(500).json({message:"Internal server Error Re-create community"});
            }

        } else if(comIsSaved && isSaved_ref && roomIsSaved){

            return res.status(200).json({
                message:"community Created",
                community_data:created_com
            });

        };

    } catch(error){

        return res.status(500).json({ message: "Internal Server Error", error });

    }

};





const joinCom=async(req,res)=>{

    try{

        const id=req.id;

        const {name,community_token}=req.body;

        const community_data=await community_schema.findOne({name:name});

        if (community_data) {

            if (community_data.community_token === community_token) {

                if(community_data.settings.open_community==true){

                    const isAdded=await community_schema.findOneAndUpdate(
                        {name,name},
                        {$addToSet:{submembers:id}},
                        {new:true}
                    );

                    if(isAdded){
                        return res.status(200).json({
                            messageFrom_system:"Token Matches",
                            messageFrom_community:`welcome to ${name}`,
                            name:community_data.name,
                            community_id:community_data.community_id,
                            community_token:community_data.community_token
                        });
                    }

                } else{

                    const isAdded=await community_schema.findOneAndUpdate(
                        {name:name},
                        {$addToSet:{awaiting_submembers:id}},
                        {new:false}
                    );

                    if(isAdded){
                        return res.status(200).json({
                            messageFrom_system:"Token Matches",
                            messageFrom_community:"In Awaiting Room. Admin will Add you soon"
                        });
                    }

                };

            } else {

                return res.status(401).json({message:"Token Does Not Match"})

            }

        } else {

            return res.status(404).json({message:"Community not found."});

        };
        

    } catch(error){

        return res.status(500).json({ message: "Internal Server Error. Unable to Join Community", error });

    };

};



const leaveCom=async(req,res)=>{

    try{

        const id=req.id;

        const {community_id,name}=req.body;

        const community_data=await community_schema.findOne({community_id:community_id});

        if(community_data){

            if(community_data.submembers.includes(id)){

                const isRemovedFrom_sub=await community_schema.findOneAndUpdate(
                    {community_id:community_id},
                    {$pull:{submembers:id}},
                    {new:true}
                );

                const isRemovedFrom_admn=await community_schema.findOneAndUpdate(
                    {community_id:community_id},
                    {
                        $pull:{admins:id}
                    },
                    {new:true}
                );

                if(isRemovedFrom_sub || isRemovedFrom_admn){
                    return res.status(200).json({message:"Removed From Community"});
                }

            };

        } else{

            return res.status(500).json({ message: "Unable to find Community"});

        };

    } catch(error){

        return res.status(500).json({ message: "Internal Server Error. Unable to Leave Community", error });

    }

};


const reportCom=async(req,res)=>{

};


const comSubmembers=async (req,res)=>{

    try{

        const id=req.id;

        const {community_id}=req.body;

        const community_data=await community_schema.findOne({community_id:community_id});

        if(community_data){

            return res.status(200).json({submembers:community_data.submembers});

        } else{

            return res.status(500).json({ message: "Internal Server Error. Unable to find Community"});

        };

    } catch(error){

        return res.status(500).json({ message: "Internal Server Error. Unable to get Members", error });

    };

};


const getAwaiting=async(req,res)=>{

    try{

        const id=req.id;

        const {community_id}=req.body;

        const community_data=await community_schema.findOne({community_id:community_id});

        if(community_data){

            return res.status(200).json({submembers:community_data.awaiting_submembers});

        } else{

            return res.status(500).json({ message: "Internal Server Error. Unable to find Community"});

        };

    } catch(error){

        return res.status(500).json({ message: "Internal Server Error. Unable to get community", error });

    };

};


export default {
    get_profile,
    createCom,
    joinCom,
    leaveCom,
    reportCom,
    comSubmembers,
    getAwaiting,
};