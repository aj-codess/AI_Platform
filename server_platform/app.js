import dotenv from "dotenv";
import express from 'express';

import log_router from "./routes/login_routes.js";
import auth from "./middleware/auth_reader.js";

dotenv.config();

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",auth.auth);
app.use("login",log_router);

const PORT = process.env.SERVER_PORT || 3000;

const server=app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});