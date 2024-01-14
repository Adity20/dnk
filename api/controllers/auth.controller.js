import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import {errorHandler} from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashPassword});
    try {
        await newUser.save();
        res.status(201).json('User Created');
    } catch (err) { 
        next(errorHandler(err));
    }
};


export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const ValidUser = await User.findOne({email});
        if(!ValidUser) return next(errorHandler(401, 'Email or Password is wrong'));
        const validPassword = bcryptjs.compareSync(password, ValidUser.password);
        if(!validPassword) return next(errorHandler(401, 'Email or Password is wrong'));
        const token = jwt.sign({id: ValidUser._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.cookie('token', token, {httpOnly: true});
        res.status(200).json('User Logged');
        const {password: pass, ...user} = ValidUser._doc;
    } catch (error) {
        next(errorHandler(error))
    }
}

