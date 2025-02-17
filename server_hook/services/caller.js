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

        dcl.header_peek(response.headers["set-cookie"]);

    };

}


const caller = async (method, url, payload) => {
    try {
        let response;

        switch (method) {
            case "post":

                response = await post_req(url, payload);
                
                break;

            case "get":

                response = await get_req(url, payload);
                
                break;

            case "delete":
                
                response = await delete_req(url, payload);

                break;

            default:
                throw new Error("Unsupported method");
        }

        auth_peek(response);
        return response.data;

    } catch (error) {

        console.error({
            message: error.message,
            name: error.name,
            stack: error.stack,

        });


        return null;

    }
    
};

export default caller;
