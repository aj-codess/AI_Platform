import express from 'express';
import user_control from './../controller/user_controller.js';

const user_router = express.Router();

user_router.get("/profile",(req, res) => user_control.get_profile(req,res));

user_router.post("/create_community",(req, res) => user_control.createCom(req,res));

user_router.post("/join_community",(req, res) => user_control.joinCom(req,res));

user_router.post("/leave_community",(req, res) => user_control.leaveCom(req,res));

user_router.post("/report_community",(req, res) => user_control.reportCom(req,res));

user_router.get("/community_submembers",(req, res) => user_control.comSubmembers(req,res));

user_router.get("/get_awaiting",(req, res) => user_control.getAdm(req,res));

//this will upgrade to a websocket
// community name and community token is required
user_router.post("/community_chat",(req, res) => user_control);

user_router.post("/chat",(req,res)=>user_control)

export default user_router;