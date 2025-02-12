import login_new from "./services/new_user_login.js";
import login_old from "./services/old_user_login.js";

class entry{
    constructor(){
        this.new_user_log=new login_new();
        this.old_user_log=new login_old();
    }

    logAs_new(payload){
        return this.new_user_log(payload);
    }


    logAs_old(payload){
        return this.old_user_log(payload)
    }

}