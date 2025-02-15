import express from "express";
import auth_control from "./../controller/auth_controller.js";

const auth_router = express.Router();

auth_router.all("*", async (req, res, next) => {

    if (req.path=="/login" || req.path.startsWith("/login/")) {

        return next();

    };

        // Extract token from Authorization header or cookies
    const authHeader = req.headers.authorization;

    const tokenFromHeader = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    
    const tokenFromCookie = req.cookies.auth_token;
    
    const token = tokenFromHeader || tokenFromCookie;

    if (token){

        try {
                const isValid_obj = await auth_control.cookie_validity(token);

                if (isValid_obj.tokenIsValid==true) {

                    req.id = isValid_obj.user_id;

                    return next();
                };

        } catch (err) {

            return res.status(403).json({ message: "Invalid or expired token! Re-login" });

        };

    } else{

        return res.status(403).json({ message: "Missing required token! Re-login" });

    }

});


export default auth_router;