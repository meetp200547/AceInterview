import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import BlacklistToken from "../models/blacklistToken.model.js";

export const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // Check for missing fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
        });

        // Generate JWT
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};
export const getProfile = async (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    });

};
export const logout = async (req, res) => {
    try {

        const token = req.headers.authorization.split(" ")[1];

        // Decode token to get expiration
        const decoded = jwt.decode(token);

        await BlacklistToken.create({
            token,
            expiresAt: new Date(decoded.exp * 1000),
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};