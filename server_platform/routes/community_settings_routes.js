import express from 'express';
import com_settings_contr from './../controller/com_settings_controller.js';

const com_settings_router = express.Router();

com_settings_router.post("/system_settings",(req, res) => com_settings_contr.system_settings(req, res));

com_settings_router.post("/make_admin",(req, res) => com_settings_contr.make_admin(req, res));

com_settings_router.post("/remove_admin",(req, res) => com_settings_contr.remove_admin(req, res));

com_settings_router.post("/close_community",(req, res) => com_settings_contr.close_community(req, res));

com_settings_router.post("/remove_user",(req, res) => com_settings_contr.remove_user(req, res));

com_settings_router.post("/accept",(req, res) => com_settings_contr.acceptFrom_awaiting(req, res));

export default com_settings_router;