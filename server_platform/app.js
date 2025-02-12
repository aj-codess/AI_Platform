import dotenv from "dotenv";
import express from 'express';
import cookieParser from "cookie-parser";

import log_router from "./routes/login_routes.js";
import auth from "./middleware/auth_reader.js";

dotenv.config();

const app=express();

const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.SECRETE_KEY));

app.use("/",auth.auth);
app.use("/login",log_router);

const server=app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});