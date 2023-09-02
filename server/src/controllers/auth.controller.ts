import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../schemas/user.schema.js';
import { ClientError, ServerError } from '../middlewares/error.handler.js';
import { IRouteSignIn, IRouteSignUp } from '../types/routes.objects.js';
import { EStatusCode } from '../constants/statusCode.js';
import { jwtPrivateKey } from '../main.js';

export const signUpHandler: RequestHandler = async (req, res, next) => {
    try {
        const { name, email, password }: IRouteSignUp = req.body;
        const findEmail = await UserModel.findOne({email});
    
        if(findEmail) {
            throw new ClientError('User already exists', EStatusCode.BAD_REQUEST);
        }
    
        const _password = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            email, name, password: _password
        });
    
        res.status(201).json({ message: 'User registered Successfully' });

    } catch (error) {
        next(error);
    }
};

export const signInHandler: RequestHandler = async (req, res, next) => {
    try {
        const { email, password }: IRouteSignIn = req.body;
    
        const user = await UserModel.findOne({email});
    
        if(!user) {
            throw new ClientError('Invalid credentials', EStatusCode.NOT_FOUND);
        }
    
        const verifyPassword = await bcrypt.compare(password, user.password);

        if(!verifyPassword) {
            throw new ClientError('Invalid credentials', EStatusCode.FORBIDDEN);
        }

        const token = jwt.sign({id: user._id}, jwtPrivateKey, {
            expiresIn: '1h',
            algorithm: 'HS256',
            issuer: 'Music-Stream'
        });

        const userData = {
            name: user.name,
            email: user.email,
            token: token
        };

        res.cookie('jwtToken', token, {
            path: '',
            httpOnly: true,
            maxAge: 3600,
            sameSite: 'strict'
        });

        res.status(200).json({ data: userData, message: 'Signin Successful' });
        
    } catch (error) {
        next(error);
    }

};