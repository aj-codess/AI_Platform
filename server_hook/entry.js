import temp_session from "./services/login_sessionless.js";
import caller from "./services/caller.js";


let url;

class entry{
    constructor(){
        this.log_temp_session=temp_session;
        this.trigger=caller;
    }

    async logAs_new(payload){
        
        url="/login/new_user";

        return await this.trigger("post", url, payload);

    }


    async logAs_old(payload){

        url="/login/old_user";

        return await this.trigger("post",url,payload);

    }

    async logAs_temp(){

        url="/login/sessionless";

        return await this.log_temp_session("get",url,{});

    };


    async get_prof(){

        url="/user/profile";

        return await this.trigger("get",url,{});

    }

    async makeAdm(payload){

        url="/community/make_admin";

        return await this.trigger("post",url,payload);

    }

    //payload {viaToken:(bool),open_community:(bool),allow_submembers_chat:(bool),adm_AI_queryOnly:(bool)};
    async com_settings(payload){

        url="/community/system_settings";

        return await this.trigger("post",url,payload);

    }

    async removeAdm(payload){

        url="/community/remove_admin";

        return await this.trigger("post",url,payload);

    }

    async closeCom(payload){

        url="/community/close_community";

        return await this.trigger("post",url,payload);

    }


    async removeUser(payload){

        url="/community/remove_user";

        return await this.trigger("post",url,payload);

    }


    async acceptFrom_awaiting(payload){

        url="/community/accept";

        return await this.trigger("post",url,payload);

    }


    async createCom(payload){

        url="/user/create_community";

        return await this.trigger("post",url,payload);

    }


    async joinCom(payload){

        url="/user/join_community";

        return await this.trigger("post",url,payload);

    }


    async leaveCom(payload){

        url="/user/leave_community";

        return await this.trigger("post",url,payload);

    }

    async reportCom(payload){

        url="/user/report_community";

        return await this.trigger("post",url,payload);

    }


    async submembers(payload){

        url="/user/community_submembers";

        return await this.trigger("get",url,payload);

    }


    async getAwaiting(payload){

        url="/user/get_awaiting";

        return await this.trigger("get",url,payload);

    }


    async delete_session(){

        url="/login/remove_session";

        return await this.trigger("post",url,{});

    }


};


const payload = {
    email: "jgyei339@gmail.com",
    password: "C%ry9to_2_g3t",
    name:"aj-codess",
    phone:"0207924832"
};

const dev_entry = new entry();

dev_entry.logAs_new(payload).then((response) => {
    console.log("login Response :", response);

    setTimeout(() => {
        console.log("Waited for 5 seconds");

        dev_entry.get_prof().then((response) => {
            console.log("profile: ", response);
        });

    }, 5000);

}).catch((error) => {
    console.error("error: ", error);
});
