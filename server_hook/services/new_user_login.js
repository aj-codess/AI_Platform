import express from "express";

import net from "./../global_dcl/base.js";
import dcl from "./../global_dcl/dcl.js";

const login_new=async(payload)=>{

    try{

        const response = await net.post("/login/new_user", JSON.stringify(payload), {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });

        if (response.headers["set-cookie"]) {
            const cookies = response.headers["set-cookie"];
        
            const authCookie = cookies.find((cookie) => cookie.startsWith("auth_token="));
        
            if (authCookie) {
                dcl.authToken = authCookie.split("=")[1].split(";")[0];
            }

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

export default login_new;