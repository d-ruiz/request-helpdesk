import { AuthResponse, JSONResponse, LoginInfo, LoginParams } from "../../model/Helpers";
import RequestError from "../../model/error/RequestError";
import iDempiereUser from "../../model/iDempiereUser";
import { IDEMPIERE_URLS, LOGIN_INFO_ITEM, getJSONCall, getURL } from "./api";
import { UserActionTypes, userConstants } from "../constants/userActionTypes";

export const fetchToken = (user: iDempiereUser, authenticationToken: string) => async (dispatch: any) => {

  let loginInfo: LoginInfo = {
    clientId: user !== null ? user.clientId : -1,
  }

  let params: LoginParams = {
    client: loginInfo.clientId
  }

  let url = getURL(IDEMPIERE_URLS.roles, params);

  // Get the available roles
  return fetch(url, getJSONCall('GET', authenticationToken))
    .then((response: JSONResponse) => {
      if (response.ok) {
        return response;
      } else {
        throw new RequestError(response);
      }
    },
      error => { //When an error is not from the server
        throw new Error(error.message);
      })
    .then((response) => response.json())
    .then((response: AuthResponse) => { //Get the available organizations
      if (response.roles) {
        loginInfo.roleId = response.roles[0].id;
        params.role = loginInfo.roleId;
        url = getURL(IDEMPIERE_URLS.orgs, params);
        return fetch(url, getJSONCall('GET', authenticationToken));
      } else {
        throw new Error('No roles defined for this user');
      }
    })
    .then((response: JSONResponse) => {
      if (response.ok) {
        return response;
      } else {
        throw new RequestError(response);
      }
    },
      error => { //When an error is not from the server
        throw new Error(error.message);
      })
    .then(response => response.json())
    .then((response: AuthResponse) => { //Get the available correct token
      if (response.organizations) {
        loginInfo.organizationId = response.organizations.filter((org: any) => org.id !== 0)[0].id;
        params.organization = loginInfo.organizationId;
        url = getURL(IDEMPIERE_URLS.warehouses, params);
        return fetch(url, getJSONCall('GET', authenticationToken));
      } else {
        throw new Error('No organizations defined for this user/role');
      }
    })
    .then((response: JSONResponse) => {
      if (response.ok) {
        return response;
      } else {
        throw new RequestError(response);
      }
    },
      error => { //When an error is not from the server
        throw new Error(error.message);
      })
    .then(response => response.json())
    .then((response: AuthResponse) => { //Get the available correct token
      if (response.warehouses) {
        loginInfo.warehouseId = response.warehouses[0].id;
        return fetch(IDEMPIERE_URLS.authToken, getJSONCall('PUT', authenticationToken, JSON.stringify(loginInfo)));
      } else {
        throw new Error('No warehouse defined for this user/role/organization');
      }
    })
    .then((response: JSONResponse) => {
      if (response.ok) {
        return response;
      } else {
        throw new RequestError(response);
      }
    },
      error => { //When an error is not from the server
        throw new Error(error.message);
      })
    .then(response => response.json())
    .then(response => {
      loginInfo.token = response.token;
      user.setUserId(response.userId);

      localStorage.setItem(LOGIN_INFO_ITEM, JSON.stringify(loginInfo));
      dispatch(login(user));
    })
    .catch(error => {
      console.error('fetchToken: ', error.message);
      dispatch(logout());
    });
}

export const logout = () => async (dispatch: any) => {
  localStorage.removeItem(LOGIN_INFO_ITEM);
  dispatch(userLogout());
}

export const login = (user: iDempiereUser): UserActionTypes => ({
  type: userConstants.USERS_LOGIN_SUCCESS,
  currentUser: user
});

export const userLogout = (): UserActionTypes => ({
  type: userConstants.USERS_LOGOUT
});
