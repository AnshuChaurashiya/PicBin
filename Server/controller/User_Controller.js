const UserService = require('../Services/UserServices');
const UserModel = require("../models/User_Models");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Authentication Middleware
module.exports.AuthUser = async (req, res, next) => {
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

// Admin Authentication Middleware
module.exports.AuthAdmin = async (req, res, next) => {
    try {
        // First authenticate the user
        await module.exports.AuthUser(req, res, () => {
            // Check if user is admin
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: "Access denied: Admin privileges required" });
            }
            next();
        });
    } catch (error) {
        console.error("Admin authentication error:", error);
        return res.status(401).json({ message: 'Admin authentication failed' });
    }
};

// Register User
module.exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        const hashedPassword = await UserModel.hashPassword(password);

        const user = await UserService.createUser({
            name,
            email,
            password: hashedPassword,
        });

        const token = user.generateToken();
        res.status(201).json({ user, token });

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: error.message });
    }
};

// Login User
module.exports.loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await UserModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = user.generateToken();
        res.cookie("token", token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.status(200).json({ user, token });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: error.message });
    }
};

// User Profile
module.exports.userProfile = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: 'Profile fetch error' });
    }
};

// Update User Data
module.exports.getUserDataUpdata = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, email, password } = req.body;
        const updates = {};
        if (name) updates.name = name;
        if (email) updates.email = email;
        if (password) {
            updates.password = await UserModel.hashPassword(password);
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        const token = updatedUser.generateToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return res.status(200).json({ user: updatedUser, token });
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
};

// Logout User
module.exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Logout user server error' });
    }
};

// Admin Routes
module.exports.getAdminProfile = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({
            user,
            isAdmin: true
        });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

// Update User Role (Admin only)
module.exports.updateUserRole = async (req, res) => {
    try {
        const {id} = req.params;
        const {role} = req.body;

        if(!['admin', 'user'].includes(role)){
            return res.status(400).json({ message: 'Invalid role specified' });
        }

        const user = await UserModel.findByIdAndUpdate(
            id,
            { role: role },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json({user});
    } catch (error) {
        return res.status(500).json({ message: 'updateUserRole server error' });
    }
};

// Get All Users (Admin only)
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('-password');
        res.status(200).json({users});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};