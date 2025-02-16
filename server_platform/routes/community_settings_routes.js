import express from 'express';
import com_settings_contr from './../controller/com_settings_controller.js';

const com_settings_router = express.Router();

com_settings_router.post("/system_settings");

com_settings_router.post("/make_admin");

com_settings_router.post("/remove_admin");

com_settings_router.post("/close_community");

com_settings_router.post("/remove_user");

export default com_settings_router;