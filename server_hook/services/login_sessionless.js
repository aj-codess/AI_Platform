import express from "express";
import axios from "axios";
import os from "os";

import dcl from "./../global_dcl/dcl.js";

const temp_session = async (payload) => {
    try {
        const device_osName = os.hostname();

        const response = await axios.post("http://localhost:3000/login/sessionless", {}, {
            headers: {
                Authorization: `os ${device_osName}`,
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        if (response.headers["set-cookie"]) {
            const cookies = response.headers["set-cookie"];
            const authCookie = cookies.find((cookie) => cookie.startsWith("auth_token="));

            if (authCookie) {
                dcl.authToken = authCookie.split("=")[1].split(";")[0];
            }
        }

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

export default temp_session;
