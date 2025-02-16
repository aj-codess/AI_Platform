import express from 'express';
import user_control from './../controller/user_controller.js';

const user_router = express.Router();

user_router.get("/profile",(req, res) => user_control.get_profile(req, res));

user_router.post("/create_community");

user_router.get("/join_community");

user_router.get("/leave_community");

user_router.post("/report_community");

user_router.get("/submembers");

user_routes.get("/get_admins");

//this will upgrade to a websocket
user_router.get("/open_community");

export default user_router;