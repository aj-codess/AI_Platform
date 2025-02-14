import net from "./../global_dcl/base.js";
import express from "express";
import dcl from "./../global_dcl/dcl.js";

const get_profile=async()=>{

    try{

        const response = await net.get("/user/profile");

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