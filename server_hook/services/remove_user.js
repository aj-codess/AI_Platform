import express from "express";

import net from "./../global_dcl/base.js";
import dcl from "./../global_dcl/dcl.js";

const remove_subMember=async()=>{

    try{

        const response = await net.post("/community/remove_user", JSON.stringify() , {
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

export default remove_subMember;