import express from "express";

import net from "./../global_dcl/base.js";
import dcl from "./../global_dcl/dcl.js";



const post_req=async(url,payload)=>{

    const response = await net.post(`${url}`, JSON.stringify(payload), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });

    return response;

};



const get_req=async(url,payload)=>{

    const response = await net.post(`${url}`, JSON.stringify(payload), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });

    return response;

};


const delete_req=async(url,payload)=>{

    const response = await net.delete(`${url}`, JSON.stringify(payload), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });

    return response;

};



const auth_peek=(response)=>{

    if (response.headers["set-cookie"]) {

        dcl.header_peek(response.header["set-cookie"]);

    };

}


const caller=async(method,url,payload)=>{

    try{

        let response;

        switch(method){
            case "post":
                response=await post_req(url,payload);

                auth_peek(response);

            break;

            case "get":
                response=await post_req(url,payload);

                auth_peak(response);

            break;

            case "delete":
                response=await delete_req(url,payload);

                auth_peak(response);

            break;
        }

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

export default caller;