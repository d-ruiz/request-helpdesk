import { BackendResponseError, ERROR_PROPERTY_NAME } from "./error/BackendError";

interface BackendResponse {
    [ERROR_PROPERTY_NAME]?: BackendResponseError;
    [propName: string]: any;
}

class BackendResponseHelper {

    static isSuccessfulResponse(response: BackendResponse) {
        return response[ERROR_PROPERTY_NAME] === undefined;
    }

}

export default BackendResponseHelper;