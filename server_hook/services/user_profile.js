import net from "./../global_dcl/base.js";

const get_profile=async()=>{

    try{

        const response = await net.get("/user/profile",{
            headers:{ "Content-Type": "application/json"},
            withCredentials: true,
        });

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