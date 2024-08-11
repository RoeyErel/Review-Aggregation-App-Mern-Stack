import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/Users.js';

const tokenMiddleware = asyncHandler(async (req, res, next) => {
    let token;    
    if (req.headers.cookie.startsWith('authorization')) {
        try {
            token = req.headers.cookie.split('authorization=')[1];            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');
            next();s
        } catch (error) {
            res.status(401);
            throw new Error('לא מאושר, ה-Token נכשל');
        }
    } else {
        res.status(401);
        throw new Error('לא מאושר, אין Token');
    }
});

export { tokenMiddleware }