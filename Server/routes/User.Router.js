const express = require('express')
const router = express()
const {body} = require('express-validator') 
const UserController = require('../controller/User_Controller')
const  authUser = require('../middleware/Auth')
const  AdminMiddleware = require('../middleware/Admin_Auth')

router.post('/register', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage('Password must be atleast 8 characters'),
], UserController.registerUser)


router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage('Password must be atleast 8 characters'),
], UserController.loginUser)
 
router.get("/profile", authUser.authUser, UserController.userProfile)
router.put("/profile/update", authUser.authUser, UserController.getUserDataUpdata)
router.get("/logout", authUser.authUser, UserController.logoutUser)
 

// admin
router.get("/admin", AdminMiddleware.AdminMideleware,authUser.authUser, UserController.getAdminProfile)
router.get("/admin/user", AdminMiddleware.AdminMideleware,authUser.authUser, UserController.getAllUsers)
router.get("/admin/users/:id/role", AdminMiddleware.AdminMideleware,authUser.authUser, UserController.updateUserRole)
module.exports = router;