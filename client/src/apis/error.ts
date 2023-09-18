interface IApiError {
    code?: string;
    message?: string;
    name?: string;
    response?: {
        status?: number;
        data?: {
            message: string;
            status: number;
            info?: string;
            data?: object;
            headers?: object
        }
    }
}

export class ApiError extends Error {
    private _error: IApiError;
    private _statusCode: number;
    constructor(error: any) {
        super(error?.response?.data?.message || `Error Code: ${error.code}`);
        this._error = error;
        this.name = 'ApiCallingError';
        this._statusCode = error?.response?.status || error?.response?.data.status || 403;
    }

    get errorInfo() {
        return this._error;
    }
}