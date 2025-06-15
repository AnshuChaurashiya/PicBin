const jwt = require('jsonwebtoken');
const UserModel = require('../models/User_Models');
require('dotenv').config();

const authUser = async (req, res, next) => {
    try {
        // Get token from cookies or authorization header
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Verify the token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID
        const user = await UserModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        // Attach user to request object
        req.user = user;

        // Proceed to next middleware/route handler
        next();

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: 'Authentication failed or token expired' });
    }
};

module.exports = authUser; 