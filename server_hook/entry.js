import login_new from "./services/new_user_login.js";
import login_old from "./services/old_user_login.js";
import temp_session from "./services/login_sessionless.js";
import get_profile from "./services/user_profile.js";
import dcl from "./global_dcl/dcl.js";
import system_settings from "./services/system_settings.js";
import make_admin from "./services/make_admin.js";
import remove_admin from "./services/remove_admin.js";
import close_community from "./services/close_com.js";
import caller from "./services/caller.js";

import axios from "axios";


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class entry{
    constructor(){
        this.new_user_log=login_new;
        this.old_user_log=login_old;
        this.profile=get_profile;
        this.log_temp_session=temp_session;
        this.makeAdmin=make_admin;
        this.settings=system_settings;
        this.remove=remove_admin;
        this.close=close_community;
        this.trigger=caller;
    }

    logAs_new(payload){
        return this.new_user_log(payload);
    }


    logAs_old(payload){
        return this.old_user_log(payload);
    }

    async logAs_temp(){
        return await this.log_temp_session();
    }

    get_prof(){
        return this.profile();
    }

    async makeAdm(payload){
        return await this.makeAdmin(payload);
    }

    //payload {viaToken:(bool),open_community:(bool),allow_submembers_chat:(bool),adm_AI_queryOnly:(bool)};
    async com_settings(payload){
        return await this.settings(payload);
    }

    async removeAdm(payload){
        return await this.makeAdmin(payload);
    }

    async closeCom(){
        return await this.close();
    }


};


const payload = {
    email: "jgyei339@gmail.com",
    password: "C%ry9to_2_g3t"
};

const dev_entry = new entry();