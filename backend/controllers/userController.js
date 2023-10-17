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
    //import vars form body
    const {username, email, password} = req.body
    //check if null
    if(!username || !email || !password){
        res.status(400)
        throw new Error ('Please add all fields')
    }
    //check if user already exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        .json({error:'User already exists'})
        throw new Error('User already exists')
    }
    //check password length
    if(password.length <= 5){
        res.status(400)
        .json({error:"Password must be 6 characters!"})
        throw new Error ('Password must be 6 characters!')
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
    //return success with params
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.username,
            email: user.email,
        })
    //return failed    
    }else{
        res.status(400)
        .json({error:"Password must be 6 characters!"})
        throw new Error('Invaild Data')
    }

})

//@desc auth a user
//@route POST /api/users/login
//@desc auth a user
//@route POST /api/users/login
//@access Public
export const loginUser = asynchandler (async (req, res) => {
    //import vars form body
    const {email, password} = req.body
    //Check for user email
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))) {
        res.cookie('authorization', generateToken(user.id), {
            httpOnly: true,
            secure:true,
            sameSite:'lax',
            expires: new Date(Date.now() + 2348978575 * 1000),
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

//@desc push saved show
//@route POST /api/users/savedShow
//access Private
export const SaveShow = asynchandler (async (req, res) => {
    //import vars form body and find user
    const {id, StreamName, StreamType, Index} = req.body;
    const updateShows = await User.findById(id)
    if(updateShows){
        updateShows.savedShows.push({streamName: StreamName, streamType: StreamType, index: Index});
        updateShows.save().then(savedDoc => {
            res.status(201).json({Message:savedDoc})
        })
        .catch((error) => {
            res.status(201).json({error:error})
        })
    }else{
        throw new Error('Please login!')
    }
})

//@desc logout user
//@route POST /api/users/logout
//access Private
export const logout = asynchandler (async (req, res) => {
    // Set token to none and expire after 5 seconds
    res.cookie('authorization', 'none', {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure:true,
        sameSite:'lax',
    })
    res.status(200)
        .json({ success: true, message: 'User logged out successfully' })
})

//@desc Generate token
//access Private
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })

}
