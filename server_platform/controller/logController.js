import cookie from 'cookie';
import express from "express";
import log_service from '../service/logService.js';
import sessionless_controller from './sessionless_controller.js';


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
            const user_id = log_service.gen_id(email,password,name);
    
            const token = await log_service.sign_token(user_id);
    
            res.cookie('auth_token', token, cookieOptions);

            return res.json({
                email: log_mail_checks,
                password: log_pass_checks,
                message: 'Authentication successful'
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

    let mail_check=log_service.mail_isExist(email);

    let pass_check=log_service.pass_isExist(password);
    
    if(mail_check == true && pass_check == true){

        const user_id=log_service.get_id_from_db(email);

        const token = await log_service.sign_token(user_id);

        res.cookie('auth_token', token, cookieOptions);

        return res.json({isLoggedIn:true});

    } else{

        return res.json({isLoggedIn:false});

    };

};



const sessionless = async (req,res)=>{

    try{
        const cookieOptions = {
            httpOnly: true, 
            secure: true,
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000
        };

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


export default {
    new_log_control,
    old_log_control,
    sessionless
  };