import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import {errorHandler} from '../utils/error.js';

export const signup = async (req, res) => {
    const {username, email, password} = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashPassword});
    try {
        await newUser.save();
        res.status(201).json('User Created');
    } catch (err) { 
        next(errorHandler(500, 'Internal Server Error'));
    }
};

