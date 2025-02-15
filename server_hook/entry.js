import login_new from "./services/new_user_login.js";
import login_old from "./services/old_user_login.js";
import temp_session from "./services/login_sessionless.js";
import get_profile from "./services/user_profile.js";
import dcl from "./global_dcl/dcl.js";

import axios from "axios";


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class entry{
    constructor(){
        this.new_user_log=login_new;
        this.old_user_log=login_old;
        this.profile=get_profile;
        this.log_temp_session=temp_session;
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

};


const payload = {
    email: "jgyei339@gmail.com",
    password: "C%rypto_2_get"
};

const dev_entry = new entry();

// dev_entry.logAs_new(payload).then(async (response) => {

//     console.log("response from server ", response);
    
//     await new Promise(resolve => setTimeout(resolve, 5000));
    
//     console.log(dcl.authToken);

//     dev_entry.get_prof().then(response => {
//         console.log("response from the server - ", response);
//     });

// });



// dev_entry.logAs_temp().then((response)=>{
//     console.log(response);
// });