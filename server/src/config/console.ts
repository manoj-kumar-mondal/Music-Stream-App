import { Response, Request } from 'express';

export class Console {
    static generateCurrentDateAndTime(): string {
        const date = new Date(Date.now());
        return date.toLocaleString();
    }

    static Log(message: string) {
        console.log(`[${Console.generateCurrentDateAndTime()}] [INFO] ${message}`);
    }

    static Error(message: string) {
        console.error(`[${Console.generateCurrentDateAndTime()}] [ERROR] ${message}`);
    }

    static Warning(message: string) {
        console.warn(`[${Console.generateCurrentDateAndTime()}] [WARN] ${message}`);
    }

    static ApiRequestLog(message: string) {
        console.log(`[${Console.generateCurrentDateAndTime()}] [ <--- ] ${message}`);
    }

    static ApiResponseLog(req: Request, res: Response, time: number = 0) {
        
        if(res.statusCode >= 200 && res.statusCode < 300) {
            if(res.statusCode == 206) {
                console.log('content sending 206');
            } else {
                console.log(`[${Console.generateCurrentDateAndTime()}] [ ---> ] [Success(${res.statusCode})] ( ${req.method} - ${req.path} ) ${time} sec`);
            }
        } else {
            const error = res.get('error');
            if(error) {
                console.log(`[${Console.generateCurrentDateAndTime()}] [ ---> ] [Rejected(${res.statusCode})] ( ${req.method} - ${req.path} )\n[ERROR]: {Name: "${error[0]}", Message: "${error[1]}"}`);
            } else {
                console.log(`[${Console.generateCurrentDateAndTime()}] [ ---> ] [Rejected(${res.statusCode})] ( ${req.method} - ${req.path} ) Reason: "${res.statusMessage}"`);
            }
        }
    }
}