import express from "express";

import net from "./../global_dcl/base.js";
import dcl from "./../global_dcl/dcl.js";

const system_settings=async(payload)=>{

    try{

        const response = await net.post("/community/system_settings", JSON.stringify(payload), {
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
          });

          return null;

    }

};

export default system_settings;