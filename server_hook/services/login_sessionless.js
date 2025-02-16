import express from "express";
import axios from "axios";
import os from "os";

import dcl from "./../global_dcl/dcl.js";

const temp_session = async () => {
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

            dcl.header_peek(response.header["set-cookie"]);

        };

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
