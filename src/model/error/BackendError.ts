import { STATUS } from "../Helpers";

export const ERROR_PROPERTY_NAME = 'error_backend_odintest';

type ErrorBody = {
    detail: string,
    status: number,
    title: string
}

export interface BackendResponseError {
    http_body: string,
    http_status_code: STATUS
}

class BackendError extends Error {

    error: ErrorBody;

    constructor(response: BackendResponseError) {
        const errorObj = JSON.parse(response.http_body)
        const message = errorObj.detail;
        super(message);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BackendError);
        }

        this.name = 'RequestError';
        this.error = errorObj;
    }

    getStatus(): STATUS {
        return this.error.status;
    }
}


export default BackendError;