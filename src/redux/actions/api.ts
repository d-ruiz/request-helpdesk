import { LoginInfo, LoginParams, UrlParams } from "../../model/Helpers";

export const LOGIN_INFO_ITEM = 'LoginInfo';
export const EXP_DATE = 'ExpDate';

type methodType = "POST" | "PUT" | "DELETE" | "GET";

const BASE_URL = '/api/v1/';

const modelUrl = BASE_URL + 'models/'

export const IDEMPIERE_URLS = {
    authToken: BASE_URL + 'auth/tokens',
    roles: BASE_URL + 'auth/roles',
    orgs: BASE_URL + 'auth/organizations',
    warehouses: BASE_URL + 'auth/warehouses',
    user: modelUrl + 'AD_User/',
    request: modelUrl + 'R_Request',
    requestTypes: modelUrl + 'R_RequestType',
    confidentialities: BASE_URL + 'reference/340'
}


export function getToken(): string | undefined {
    const loginInfo = getLoginInfo();
    return loginInfo.token;
}

export function getLoginInfo(): LoginInfo {
    const plainInfo = localStorage.getItem(LOGIN_INFO_ITEM);
    if (!plainInfo) {
        throw new Error('No token saved');
    }

    return JSON.parse(plainInfo);
}

export function getJSONCall(method: methodType, token: string | undefined, body?: Object): Object {
    return {
        method: method,
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token,
        },
        credentials: 'same-origin'
    };
}

export function getURL(baseUrl: string, params: UrlParams | LoginParams): string {
    let url = baseUrl + '?';

    Object.entries(params).map(item => url = url + item[0] + '=' + item[1] + '&');
    return url.slice(0, -1); //Remove the last &
}
