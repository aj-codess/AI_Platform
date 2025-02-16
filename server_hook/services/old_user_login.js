import net from "./../global_dcl/base.js";
import dcl from "./../global_dcl/dcl.js";

const login_old=async(payload)=>{

    try{

        const response = await net.post("/login/old_user", JSON.stringify(payload), {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });

        if (response.headers["set-cookie"]) {

            dcl.header_peek(response.header["set-cookie"]);
            
        };

        return response.data;

    } catch(error){
        
        console.error({
            message: error.message,
            name: error.name,
            stack: error.stack,
        })

    };

};


export default login_old;