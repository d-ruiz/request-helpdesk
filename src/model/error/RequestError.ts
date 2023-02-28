import { JSONResponse, STATUS } from "../Helpers";

class RequestError extends Error {

    response: JSONResponse;

    constructor(response: JSONResponse) {
        const message = response.statusText;
        super(message);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RequestError);
        }

        this.name = 'RequestError';
        this.response = response;
    }

    getStatus(): STATUS {
        return this.response.status;
    }
}


export default RequestError;