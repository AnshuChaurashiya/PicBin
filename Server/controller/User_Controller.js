const UserService = require('../Services/UserServices');
const UserModel = require("../models/User_Models");
const { validationResult } = require('express-validator');

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
        res.status(200).json({ user }); // FIXED: join() → json()
    } catch (error) {
        return res.status(500).json({ message: 'Profile fetch error' });
    }
};

// usser ipdate data
module.exports.getUserDataUpdata = async (req, res) => {
    try {
        const userId = req.user._id; // from auth middleware
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
}

// Logout User
module.exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Logout user server error' });
    }
};

// Admin Route (Starter)

module.exports.getAdminProfile = async (req, res, next) => {
    try {
        const user = req.user
        res.status(200).json({
            user,
            isAdmin: true
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


// updateUserRole
module.exports.updateUserRole = async (req, res) => {
    try {
        const {id} = req.params
        const {role} = req.body

        if(!['admin', 'user'].includes(role)){
            res.status(200).json({ message: 'Admin route is working.' });
        }

        const user = await UserModel.findByIdAndUpdate({
            _id: id,
            role: role,
            new:true
        }.select('-password'))

        if (!user) {
            return res.status(404).json({message: "User not found"})
        }

        res.status(200).json({user})


    } catch (error) {
        return res.status(500).json({ message: 'updateUserRole server error' });
    }
};


module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find().select('-password')
        res.status(200).json({users})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}