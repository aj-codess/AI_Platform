import cookie from 'cookie';
import express from "express";
import log_service from '../service/logService.js';
import sessionless_controller from './sessionless_controller.js';

import user_schema from "./../models/user_schema.js";


const cookieOptions = {
    httpOnly: true, 
    secure: true,
    sameSite: 'Strict',
};



const new_log_control = async (req, res) => {

    const {name,phone,email,password} = req.body;

    const log_mail_checks=log_service.mail_checks(email);

    const log_pass_checks=log_service.pass_checks(password);

    if (log_mail_checks.isValid !== false && log_pass_checks.isValid !== false) {
        try {

            const password_crypto=log_service.pass_crypto(password);

            const user_id = log_service.gen_id();

            const new_user=new user_schema({
                id:user_id,
                userName:name,
                email:email,
                phone:phone,
                password:password_crypto,
            });

            await new_user.save();
    
            const token = await log_service.sign_token(user_id);
    
            res.cookie('auth_token', token, cookieOptions);

            return res.json({
                email: log_mail_checks,
                password: log_pass_checks,
                message: 'Authentication successful',
            });

    
        } catch (error) {

            console.error('Error during token creation:', error);

            return res.status(500).json({ error: 'Internal Server Error' });
        };

    };

        return res.status(500).json({email : log_mail_checks, password : log_pass_checks});
};



const old_log_control= async (req,res)=>{

    const {email,password}=req.body;

    let mail_valid=log_service.mail_checks(email);

    let pass_valid=log_service.pass_checks(password);
    
    if(mail_valid.isValid !== false && pass_valid.isValid !== false){

        const user_data=await user_schema.findOne({email});

        if(!user_data || !(await user_data.matchPassword(password))){

            return res.status(401).json({ isLoggedIn: false});

        };

        const token = await log_service.sign_token(user_data.id);

        res.cookie('auth_token', token, cookieOptions);

        return res.json({isLoggedIn:true});

    } else{

        return res.json({isLoggedIn:false});

    };

};



const sessionless = async (req,res)=>{

    try{

        const authHeader = req.headers.authorization;

        const deviceFromHeader = authHeader && authHeader.startsWith("os ") ? authHeader.split(" ")[1] : null;
    
        const temp_id=log_service.gen_id();

        const token = await log_service.sign_token(temp_id);

        const session_isCreated=sessionless_controller.create_session(temp_id,deviceFromHeader);

        if(session_isCreated){
            res.cookie('auth_token', token, cookieOptions);

            return res.json({
                message: 'Temporary Session successful'
            });
        } else{

            return res.json({
                message:"Unable to create Temporary Session"
            })

        }

    } catch(error){

        console.error('Error during token creation:', error);

        return res.status(500).json({ error: 'Internal Server Error' });

    }

};



const remove_session=async()=>{
    try{

        if(sessionless_controller.idIsIn_session(user_id)){

            sessionless_controller.delete_session(user_id);
            
            return res.status(200).json({message:"Temporary Session Deleted."})
        };

    } catch(error){

        console.error('Error During Session Deletion :', error);

        return res.status(500).json({ error: 'Internal Server Error' });

    };

};



export default {
    new_log_control,
    old_log_control,
    sessionless,
    remove_session
  };