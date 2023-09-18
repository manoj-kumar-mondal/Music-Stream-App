import { RequestHandler, Request, Response } from 'express';
import validator from 'validator';
import { IRouteSignIn, IRouteSignUp, IRouteUploadStreamData } from '../types/routes.objects.js';
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


export const uploadStreamValidator: RequestHandler = (req, res, next) => {
    const { title, artist }: IRouteUploadStreamData = req.body;
    
    if(!title) {
        throw new ClientError('Title is qequired', EStatusCode.UNPROCESSABLE_CONTENT);
    }

    if(!artist) {
        throw new ClientError('Artist is required', EStatusCode.UNPROCESSABLE_CONTENT);
    }

    //@ts-ignore
    const file1 = req.files['musicFile'];

    if(!file1) {
        throw new ClientError('Music File is required', EStatusCode.UNPROCESSABLE_CONTENT);
    }

    next();
}

export const downloadStreamValidator: RequestHandler = (req, res, next) => {
    const { range } = req.headers;
    const id = req.params.id;
    console.log(range);

    if(!range) {
        throw new ClientError('Range Parameter required to process this request', EStatusCode.RANGE_NOT_SATISFIED);
    }
    
    if(!id) {
        throw new ClientError('id not found for this request', EStatusCode.UNPROCESSABLE_CONTENT);
    }

    next();
}