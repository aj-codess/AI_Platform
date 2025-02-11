import express from 'express';
import log_control from '../controller/logController.js';

const log_router = express.Router();

log_router.post("/new_user",(req, res) => log_control.new_log_control(req, res));

log_router.post("/old_user",(req,res)=> log_control.old_log_control(req,res));

export default log_router;