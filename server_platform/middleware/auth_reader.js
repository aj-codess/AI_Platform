import express from "express";
import auth_control from "./../controller/auth_controller.js";

const auth_router = express.Router();

auth_router.all("*", async (req, res, next) => {

    if (req.url.includes("login")) {

        return next();

    };

    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        try {
            const isValid_obj = await auth_control.cookie_validity(token);

            if (isValid_obj.isValid) {
console.log(isValid_obj);
                // req.id = isValid_obj.token_id;

                return next();
            }
        } catch (err) {

            return res.status(403).json({ message: "Invalid or expired token! Re-login" });

        }
    }

    return res.status(403).json({ message: "Missing required token! Re-login" });
});


export default auth_router;