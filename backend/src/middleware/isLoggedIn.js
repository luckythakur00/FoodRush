import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

export const isLoggedIn = async (req, res, next) => {
    if (!req.cookies.token || req.cookies.token === '') {
        return res.status(400).json({ message: "You Don't have access" });
    }
    try {
        let data = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        if (!data) {
            return res.status(400).json({ message: "Invalid token" });
        }
        let user = await User.findOne({ _id: data.id }).select('-password');
        req.user = user
        next();
    } catch (error) {
        console.log("Error is isLoggedIn middleware::", error.message);
        res.status(500).json({ message: "Server Error!" });
    }
}