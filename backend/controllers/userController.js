import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asynchandler from 'express-async-handler'
import User from '../models/Users.js'
import dotenv from 'dotenv';

dotenv.config();

//@desc Register new user
//@route POST /api/users
//@access Public
export const registerUser = asynchandler (async (req, res) => {
    const {username, email, password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error ('Please add all fields')
    }
    //check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    //Create user
    const user = await User.create({
        username,
        email,
        password: hashPassword
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.username,
            email: user.email,
        })
    }else{
        res.status(400)
        throw new Error('Invaild Data')
    }

})

//@desc auth a user
//@route POST /api/users/login
//@access Public
export const loginUser = asynchandler (async (req, res) =>{
    const {email, password} = req.body
    //Check for user email
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))) {
        res.cookie('authorization', generateToken(user.id), {
            httpOnly: true,
            secure:false,
            sameSite:'lax',
            expires: new Date(Date.now() + 2348978575),
        })
        .json({
            _id: user.id,
            name: user.username,
            email: user.email,
        })
    }else{
        res.status(400)
        throw new Error('Invaild credentails')
    }
})

//@desc Get user data
//@route GET /api/users/me
//@access Private
export const getMe = asynchandler (async (req, res) => {
    const {username} = await User.findById(req.user.id)
    res.status(200).json({
        username
    })
})

export const logout = asynchandler (async (req, res) => {
    // Set token to none and expire after 5 seconds
    res.cookie('authorization', 'none', {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure:false,
        sameSite:'lax',
    })
    res
        .status(200)
        .json({ success: true, message: 'User logged out successfully' })
})
// Generate token
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '1d'
    })

}




