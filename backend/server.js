// imports
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import userRoute from "./routes/usersRoutes.js"
import listRoute from "./routes/listsRoutes.js"

//Configurations
const app = express()
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FE_URL,
    credentials: true,
  })
);

// Routes
app.use('/api/users', userRoute)
app.use('/api/lists', listRoute)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
  res.send("Connected");
});

// MongoDB connection
const connect = async () => {
    try {
		await mongoose.connect(process.env.MONGO);
		console.log("mongoDB Connected.");
    }catch (error) {
		  throw error;
    }
};

mongoose.connection.on("Disconnected", () => {
    console.log("mongoDB disconnected")
});

app.listen(process.env.PORT, () =>{
    connect()
    console.log("Backend Connected.")
});
