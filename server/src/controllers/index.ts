import { Request, Response } from 'express';
export * from './auth.controller.js';

export default function homeRouteController(req: Request, res: Response) {
    res.status(200).json({
        message: 'Sorry, nothin to display'
    });
};