import BackendResponseHelper from '../../model/BackendResponseHelper';
import { JSONResponse } from '../../model/Helpers';
import BackendError, { ERROR_PROPERTY_NAME } from '../../model/error/BackendError';
import RequestError from '../../model/error/RequestError';
import iDempiereUser from '../../model/iDempiereUser';
import { AuthActionTypes, authenticatorConstants } from '../constants/authenticatorActionTypes';
import { fetchToken } from './userActionCreators';
import { IDEMPIERE_URLS } from './api';

export const verifyLogin = (username: string, password: string) => async (dispatch: any) => {

  const credentials = {
      userName: username,
      password: password
  }

  return fetch(IDEMPIERE_URLS.authToken, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    credentials: 'same-origin'
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
    
    if (!BackendResponseHelper.isSuccessfulResponse(response)) {
      throw new BackendError(response[ERROR_PROPERTY_NAME]);
    }

    const user = new iDempiereUser(response.clients[0].id, response.clients[0].name, username);
    dispatch(loginSuccessful(response.token));
    dispatch(fetchToken(user, response.token));
  })
  .catch(error => {
    const errorMessage = error.message;
    console.error('VerifyLogin', errorMessage);
    dispatch(loginFailed(errorMessage));
  });
}

export const loginSuccessful = (token: string): AuthActionTypes => ({
    type: authenticatorConstants.LOGIN_SUCCESS,
    authenticationToken: token
});

export const loginFailed = (errMsg: string): AuthActionTypes => ({
    type: authenticatorConstants.LOGIN_FAILURE,
    errMsg: errMsg
});

export const loginLoading = (): AuthActionTypes => ({
    type: authenticatorConstants.LOGIN_LOADING
});

export const logout = (): AuthActionTypes => ({
  type: authenticatorConstants.LOGOUT
});

