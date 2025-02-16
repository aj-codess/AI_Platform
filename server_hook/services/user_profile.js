import net from "./../global_dcl/base.js";

const get_profile=async()=>{

    try{

        const response = await net.get("/user/profile",{
            headers:{ "Content-Type": "application/json"},
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
          });

          return null;
    }
};

export default get_profile;