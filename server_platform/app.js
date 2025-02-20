
import dotenv from "dotenv";
import express from 'express';
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import log_router from "./routes/login_routes.js";
import auth_router from "./middleware/auth_reader.js";
import user_router from "./routes/user_routes.js";
import community_settings_router from "./routes/community_settings_routes.js";

import user_socketModel from "./socket_handlers/user_socket.js";
import community_socketModel from "./socket_handlers/community_socket.js";

dotenv.config();

connectDB();

const app=express();

const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.SECRET_KEY));

app.use("/login", log_router);
app.use("/", auth_router);
app.use("/user", user_router);
app.use("/community",community_settings_router);


const server=app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});


server.on("upgrade",async (req,socket,head)=>{

    const res = {
        status: (code) => ({
            json: (message) => {
                socket.write(`HTTP/1.1 ${code} ${message.message}\r\n\r\n`);
                socket.destroy();
            },
        }),
    };    

    const runMiddleware = (req, res) => {
        return new Promise((resolve, reject) => {
            auth_router.handle(req, res, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    };

    try{

        await runMiddleware(req,res);

        if (!req.id) {
            socket.write(`HTTP/1.1 403 Forbidden\r\n\r\n`);
            socket.destroy();
            return;
        };

        const url = new URL(req.url, `http://${req.headers.host}`).pathname;

        if(url.includes("/user/chat")){

            user_socketModel.handleUpgrade(req,socket,head,(socket_address)=>{

                socket_address.id=req.iq

                user_socketModel.emit("connection",socket_address,req);

            });

        } else if(url.includes("/user/community_chat")){

            community_socketModel.handleUpgrade(req,socket,head,(socket_address)=>{

                socket_address.id=req.id;

                community_socketModel.emit("connection",socket_address,req);

            });

        };

    } catch(error){

        socket.write(`HTTP/1.1 403 Forbidden\r\n\r\n`);
        
        socket.destroy();

    };

});