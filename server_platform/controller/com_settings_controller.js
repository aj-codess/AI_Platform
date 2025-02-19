import user_schema from "./../models/user_schema.js";
import community_schema from "./../models/community_schema.js";



const system_settings=async(req,res)=>{

    try{

        const id=req.id;

        const {community_id,open_community,allow_submembers_chat,admin_AI_queryOnly}=req.body;
    
        const community_data=await community_schema.findOne(commmunity_id);

        if(community_data){

            const isUpdated=await community_schema.findOneAndUpdate(
                {community_id:community_id},
                {
                    $set:{
                        "settings.open_community": open_community,
                        "settings.allow_submembers_chat": allow_submembers_chat,
                        "settings.admin_AI_queryOnly": admin_AI_queryOnly
                    }
                },
                {new:true}
            );

            if(isUpdated){
                res.status(200).json({message:"settings updated Successfully"});
            }
            

        } else{

            return res.status(404).json({message:"Internal Server Error. cannnot find Community"})

        }

    } catch(error){

        return res.status(500).json({message:"Internal server Error"});

    }

}




const make_admin=async(req,res)=>{

    try{

        const id=req.id;

        const {community_id,idTo_admin}=req.body;

        const community_data=await community_schema.findOne({community_id:community_id});

        if(community_data.owner_id==id || community_data.admins.includes(id)){

            const isUpdated=await community_schema.findOneAndUpdate(
                {community_id:community_id},
                {
                    $addToSet:{admins:idTo_admin}
                },
                {new:true}
            );

            if(isUpdated){
                res.status(200).json({message:"User Added to Admin"})
            };

        } else{

            return res.json({message:"Not an Admin"});

        };

    } catch(error){

        return res.status(500).json({message:"Internal Server Error. Error making Admin",error});

    };

}





const remove_admin=async(req,res)=>{

    try{

        const id=req.id;

        const {community_id,idTo_unAdmin}=req.body;

        const community_data=await community_schema.findOne({community_id:community_id});

        if(community_data.owner_id==id || community_data.admins.includes(id)){

            const isUpdated=await community_schema.findOneAndUpdate(
                {community_id:community_id},
                {
                    $pull:{admins:idTo_unAdmin}
                },
                {new:true}
            );

            if(isUpdated){
                res.status(200).json({message:"User Removed From Admin"})
            };

        } else{

            return res.json({message:"Admins Only Allowed to Remove Admins"});

        };


    } catch(error){

        return res.status(500).json({message:"Internal Server Error. Error Removing Admin",error});

    };

}





const close_community=async(req,res)=>{

    try{

        const id=req.id;

        const {community_id}=req.body;

        const community_data=await findOne({community_id:community_id});

        if(community_data){

            if(community_data.owner_id==id){

                const result = await community_schema.deleteOne({community_id:community_id});

                const ref_isDeleted=await user_schema.updateMany(
                    {"owned_communities.community_id":community_id},
                    {
                        $pull:{owned_communities:{community_id:community_id}}
                    },
                    {new:true}
                );

                if(result.deletedCount != 0 && ref_isDeleted){

                    return res.status(200).json({message:"Community Deleted successfully"})
                
                } else{

                    return res.json({message:"Server Malfunctioned. Try Deleting Again"})

                }

            } else{

                return res.json({message:"Only Community Owner Is Allowed To Delete"});

            }

        } else{

            await user_schema.findOneAndUpdate(
                {id:id},
                {
                $pull:{owned_communities:{community_id:community_id}}
                }
            );

            return res.status(404).json({ message: "Community not found" });

        };

    } catch(error){

        return res.status(500).json({message:"Internal Server Error",error});

    };

}




const remove_user=async(req,res)=>{

    try{

        const id=req.id;

        const {community_id,id_toRemove}=req.body;

        const community_data=await community_schema.findOne({community_id:community_id});

        if(community_data.owner_id==id && community_data.admins.include(id_toRemove)){
            const isRemoved=await community_schema.findOneAndUpdate(
                {community_id:community_id},
                {
                    $pull:{admins:id_toRemove}
                },
                {new:true}
            );

            if(isRemoved){
                return res.status(200).json({message:"User Removed From Community"});
            };
        };


        if(community_data.owner_id == id_toRemove || community_data.admins.includes(id_toRemove)){
            
            return res.json({message:"Cannot remove Admin"});

        } else if(community_data.admins.includes(id) || community_data.owner_id == id){
            
            const isRemoved=await community_schema.findOneAndUpdate(
                {community_id:community_id},
                {
                    $pull:{submembers:id_toRemove}
                },
                {new:true}
            );

            if(isRemoved){
                return res.status(200).json({message:"User Removed From Community"});
            }

        }

    } catch(error){

        return res.status(500).json({message:"Internal Server Error",error})

    };

}




const acceptFrom_awaiting=async(req,res)=>{

    try{

        const id=req.id;

        const {community_id,id_toAccept}=req.body;

        const isIncluded=await community_schema.findOne({community_id:community_id});

        if(isIncluded){

            if(isIncluded.awaiting_submembers.includes(id_toAccept)){

                const update_com = await community_schema.findOneAndUpdate(
                    { community_id: community_id },
                    {
                        $pull: { awaiting_submembers: id_toAccept },
                        $addToSet: { submembers: id_toAccept }
                    },
                    { new: true }
                );                

                if(update_com){
                    
                    return res.status(200).json({isAdded:true});

                };

            } else{

                return res.status(404).json({message:"user not found in awaiting Room"});

            }

        } else{
            return res.status(404).json({message:"user not found in Awaiting Room"});
        };

    } catch(error){

        return res.status(500).json({message:"Internal Server Error"})

    }

}


export default {
    system_settings,
    make_admin,
    remove_admin,
    close_community,
    remove_user,
    acceptFrom_awaiting
}