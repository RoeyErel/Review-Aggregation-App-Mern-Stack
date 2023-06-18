import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/Users.js'
import dotenv from 'dotenv';

//Configurations
dotenv.config();
export const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.authorization
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        }catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if (!token) {
        res.status(401)
    }
})
