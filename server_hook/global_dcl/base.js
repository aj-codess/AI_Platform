import axios from "axios";

import dcl from "./dcl.js";

const net=axios.create({
    baseURL:"http://localhost:3000",
    timeout:5000,
    headers:{
        "Content-Type":"application/json"
    }
});


net.inceptor.request.use((config)=>{
    if(authToken){

        config.headers["Authoprization"]=`Bearer ${dcl.authToken}`;

    };

    return config;
},(error)=>{

    return Promise.reject(error);

});

export default net;