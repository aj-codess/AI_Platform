import dotenv from "dotenv";
import express from 'express';
import cookieParser from "cookie-parser";

import log_router from "./routes/login_routes.js";
import auth_router from "./middleware/auth_reader.js";
import user_router from "./routes/user_routes.js";

dotenv.config();

const app=express();

const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.SECRET_KEY));

app.use("/login", log_router);
app.use("/", auth_router); // Apply auth AFTER login route
app.use("/user", user_router);

const server=app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});