import { RequestHandler, ErrorRequestHandler } from 'express';
import { Console } from '../config/console.js';
import { RouteError } from './error.handler.js';
import { EStatusCode } from '../constants/statusCode.js';

export const handleApiRequest: RequestHandler = (req, res, next) => {
    const start = Date.now();
    Console.ApiRequestLog(`${req.hostname} ( ${req.method} ${req.path} )`);
    res.on('finish', () => {
        const end = Date.now();
        Console.ApiResponseLog(req, res, ((end-start)/1000));
    });

    next();
}

export const handleUnknownRouteRequest: RequestHandler = (req, res) => {
    return res.status(EStatusCode.NOT_FOUND).json({
        message: `Route Not Found for ${req.path}`,
        status: EStatusCode.NOT_FOUND
    });
}

export const handleErrorOnRequest: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof RouteError) {
        res.append('error', [err.name, err.message]);
        return res.status(err.statusCode).json({
            message: err.message,
            status: err.statusCode
        });
    } else if(err instanceof Error) {
        res.append('error', [err.name, err.message]);
        return res.status(EStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Internal Server Error',
            status: EStatusCode.INTERNAL_SERVER_ERROR
        });
    }
    next();
}