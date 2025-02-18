import authToken from "./dcl.js";

let header_peek=(cookie)=>{

    const authCookie = cookie.find((cookie) => cookie.startsWith("auth_token="));
        
    if (authCookie) {
        authToken.token = authCookie.split("=")[1].split(";")[0];
    };

};

export default header_peek;