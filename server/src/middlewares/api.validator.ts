import { RequestHandler, Request, Response } from 'express';
import validator from 'validator';
import { IRouteSignIn, IRouteSignUp } from '../types/routes.objects.js';
import { ClientError } from './error.handler.js';
import { EStatusCode } from '../constants/statusCode.js';

const apiValidator = (req: Request, res: Response) => {
    /* TODO: handle the cookie and req.body object */
    const headers = req.headers;

    return true;
}

export const signInValidator: RequestHandler = (req, res, next) => {
    const { email, password }: IRouteSignIn = req.body;

    if(!email) {
        throw new ClientError('Email is required', EStatusCode.UNPROCESSABLE_CONTENT);
    }

    if(!password) {
        throw new ClientError('Password is required', EStatusCode.UNPROCESSABLE_CONTENT);
    }

    if(!validator.isEmail(email)) {
        throw new ClientError('Invalid Email', EStatusCode.UNPROCESSABLE_CONTENT);
    }

    next();
};

export const signUpValidator: RequestHandler = (req, res, next) => {
    const { name, email, password, cpassword }: IRouteSignUp = req.body;

    if(!name) {
        throw new ClientError('Name is required', EStatusCode.UNPROCESSABLE_CONTENT);
    }

    if(!email) {
        throw new ClientError('Email is required', EStatusCode.UNPROCESSABLE_CONTENT);
    }

    if(!password) {
        throw new ClientError('Password is required', EStatusCode.UNPROCESSABLE_CONTENT);
    }

    if(cpassword && (cpassword !== password)) {
        throw new ClientError('Password Mismatched', EStatusCode.UNPROCESSABLE_CONTENT);
    }

    if(!validator.isEmail(email)) {
        throw new ClientError('Invalid email', EStatusCode.UNPROCESSABLE_CONTENT);
    }

    if(!validator.isLength(name, {min: 3})) {
        throw new ClientError('Name should have atleast 3 character', EStatusCode.UNPROCESSABLE_CONTENT);
    }

    if(!validator.isLength(password, { min: 6})) {
        throw new ClientError('Password should have atleast 6 character', EStatusCode.UNPROCESSABLE_CONTENT);
    }

    next();
};
