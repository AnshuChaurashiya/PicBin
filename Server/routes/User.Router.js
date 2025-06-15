const express = require('express')
const router = express.Router()
const {body} = require('express-validator') 
const UserController = require('../controller/User_Controller')
const authUser = require('../middleware/auth')
const AdminMiddleware = require('../middleware/Admin_Auth')

router.post('/register', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage('Password must be atleast 8 characters'),
], UserController.registerUser)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage('Password must be atleast 8 characters'),
], UserController.loginUser)
 
router.get("/profile", authUser, UserController.userProfile)
router.put("/profile/update", authUser, UserController.getUserDataUpdata)
router.get("/logout", authUser, UserController.logoutUser)
 
// admin routes
router.get("/admin", authUser, AdminMiddleware.AdminMideleware, UserController.getAdminProfile)
router.get("/admin/user", authUser, AdminMiddleware.AdminMideleware, UserController.getAllUsers)
router.get("/admin/users/:id/role", authUser, AdminMiddleware.AdminMideleware, UserController.updateUserRole)

module.exports = router;