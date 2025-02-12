import express from "express";
import dotenv from "dotenv";

import net from "./../global_dcl/base.js";
import dcl from "./../global_dcl/dcl.js";

const login_new=async(payload)=>{

    try{

        const response = await net.post("/login/new_user", JSON.stringify(payload), {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });

        const cookies=response.headers["set-cookie"];

        if(cookies){

            dcl.authToken=cookie.find((cookie) => cookie.startsWith("auth_token="))?.split("=")[1].split(";")[0];

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

export default login_new;