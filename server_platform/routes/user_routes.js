import express from 'express';
import user_control from './../controller/user_controller.js';

const user_router = express.Router();

user_router.get("/profile",(req, res) => user_control.get_profile(req, res));


export default user_router;