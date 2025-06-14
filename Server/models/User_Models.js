const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Name must be at least 3 characters long"],
      },
      email: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, "Email must be at least 3 characters long"],
      },
      password: {
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 characters long"],
        select: false,
      },
      role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
      },

      uploadedImages: {
        type: [String],
        default: [],
      },

      joinDate: {
        type: Date,
        default: Date.now,
      },
})

// ✅ Instance methods
UserSchema.methods.generateToken = function () {
    const token = jwt.sign(
        {id: this._id},
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    )
    return token
}


UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}

const UserModel =  mongoose.model("User" ,UserSchema)
module.exports = UserModel 