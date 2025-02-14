import express from 'express';
import user_control from './../controller/user_controller.js';

const user_router = express.Router();

user_router.get("/profile",(req, res) => user_control.get_profile(req, res));

//user_router.post("/old_user",(req,res)=> log_control.old_log_control(req,res));

export default user_router;