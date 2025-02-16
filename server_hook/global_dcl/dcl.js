
let authToken=null;

let gmail=null;

let header_peek=(cookie)=>{

    const authCookie = cookies.find((cookie) => cookie.startsWith("auth_token="));
        
    if (authCookie) {
        authToken = authCookie.split("=")[1].split(";")[0];
    };

}

export default {
    authToken,
    header_peek
}