import express from "express";

const get_profile=async(req,res)=>{

    console.log("Request Headers:", req.headers);
    console.log("Request Cookies:", req.cookies);
    console.log("Authorization:", req.headers.authorization);

    return res.json("try text");

};


export default {
    get_profile
};