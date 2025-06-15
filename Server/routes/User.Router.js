const express = require('express') 
const router = express.Router()
const {body} = require('express-validator') 
const UserController = require('../controller/User_Controller')

router.post('/register', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage('Password must be atleast 8 characters'),
], UserController.registerUser)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage('Password must be atleast 8 characters'),
], UserController.loginUser)
 
router.get("/profile", UserController.AuthUser, UserController.userProfile)
router.put("/profile/update", UserController.AuthUser, UserController.getUserDataUpdata)
router.get("/logout", UserController.AuthUser, UserController.logoutUser)
 
// admin routes
router.get("/admin", UserController.AuthAdmin, UserController.getAdminProfile)
router.get("/admin/user", UserController.AuthAdmin, UserController.getAllUsers)
router.get("/admin/users/:id/role", UserController.AuthAdmin, UserController.updateUserRole)

module.exports = router;