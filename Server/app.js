const express = require( 'express')
const app = express()
const dotenv = require('dotenv')
const UserRouter = require('./routes/User.Router')
const connectDB = require('./DataBase/DbConnect')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const imageRoutes = require('./routes/imageRoute');

app.use(cors({
  origin: process.env.FRONTED_URL,
  credentials: true  ,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']            
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
dotenv.config();
connectDB()

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/user', UserRouter)
app.use('/api/images', imageRoutes);


module.exports = app