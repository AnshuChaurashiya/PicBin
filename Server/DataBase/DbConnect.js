const mongoose = require("mongoose");
const dotenv = require("dotenv");
  
function connectDB() {
    try {
        mongoose.connect(process.env.DBCONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        })
        .then(() => {
            console.log(" ✅ Connected to MongoDB");
        })
    } catch (error) { 
        console.log(" ❌ Error connecting to MongoDB", error);
    }
}

module.exports = connectDB; 