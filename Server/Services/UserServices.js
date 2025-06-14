const UserModel = require('../models/User_Models')

module.exports.createUser = async ({name, email, password}) => {
    try {
        if(!name || !email || !password) {
            throw new Error("All fields are required for creating an account")
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            throw new Error("User with this email already exists")
        }

        const user = await UserModel.create({
            name: name,
            email: email,
            password: password
        })

        return user
    } catch (error) {
        console.error('Error in createUser service:', error)
        throw error
    }
}