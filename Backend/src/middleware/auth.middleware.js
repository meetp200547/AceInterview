import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import BlacklistToken from "../models/blacklistToken.model.js";
import dotenv from "dotenv";
dotenv.config();

const protect = async (req, res, next) => {
    try {

        let token;
        const authHeader = req.headers.authorization;

if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({
        success: false,
        message: "Authorization token missing",
    });
}

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. No token provided.",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const blacklisted = await BlacklistToken.findOne({ token });

        if (blacklisted) {
            return res.status(401).json({
                success: false,
                message: "Token has been revoked.",
            });
        }
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }

        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });

    }
};

export default protect;