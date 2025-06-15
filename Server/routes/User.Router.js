const express = require('express') 
const router = express.Router()
const {body} = require('express-validator') 
const UserController = require('../controller/User_Controller')
const AuthUser = require('../middleware/Auth')
const AdminMiddleware = require('../middleware/Admin_Auth')
console.log(AuthUser)

router.post('/register', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage('Password must be atleast 8 characters'),
], UserController.registerUser)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage('Password must be atleast 8 characters'),
], UserController.loginUser)
 
router.get("/profile", AuthUser, UserController.userProfile)
router.put("/profile/update", AuthUser, UserController.getUserDataUpdata)
router.get("/logout", AuthUser, UserController.logoutUser)
 
// admin routes
router.get("/admin", AuthUser, AdminMiddleware.AdminMideleware, UserController.getAdminProfile)
router.get("/admin/user", AuthUser, AdminMiddleware.AdminMideleware, UserController.getAllUsers)
router.get("/admin/users/:id/role", AuthUser, AdminMiddleware.AdminMideleware, UserController.updateUserRole)

module.exports = router;