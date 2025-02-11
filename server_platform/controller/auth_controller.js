import log_service from "./../service/logService.js";

const cookie_validity=async(cookie)=>{

    const decode=await log_service.verify_token(cookie);

    if(decode){
        return {
            tokenIsValid:true,token_id:decode.user_id
        };
    };

    return {
        tokenIsValid:false
    };

};


export default {
    cookie_validity
}