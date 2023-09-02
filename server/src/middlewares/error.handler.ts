import { EErrorType } from '../constants/error.type.js';
import { EStatusCode } from '../constants/statusCode.js';

export class RouteError extends Error {
    private _statusCode: EStatusCode;

    constructor(message: string, statusCode: number) {
        super(message);
        this._statusCode = statusCode;
    }

    public get statusCode() {
        return this._statusCode;
    }
}

export class DevError extends Error {
    constructor(message: string) {
        super(message);
        this.name = EErrorType.DEV_ERROR;
    }
}

export class ClientError extends RouteError{

    constructor(message: string, statusCode: EStatusCode) {
        if(statusCode >=500 || statusCode < 400) {
            throw new DevError(`Status code ${statusCode}  is invalid for clientError`);
        }
        super(message, statusCode);
        this.name = EErrorType.CLIENT_ERROR;
    }
}

export class ServerError extends RouteError {
    constructor(message: string, statusCode: EStatusCode) {
        if(statusCode >=600 || statusCode < 500) {
            throw new DevError(`Status code ${statusCode}  is invalid for serverError`);
        }
        super(message, statusCode);
        this.name = EErrorType.SERVER_ERROR
    }
}