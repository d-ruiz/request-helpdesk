export interface AuthState {
  authenticationToken: string,
  errMsg?: string
};

export enum authenticatorConstants {
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
    LOGIN_LOADING = 'LOGIN_LOADING',

    LOGOUT = 'LOGOUT',
};

interface LoginAction {
  type: typeof authenticatorConstants.LOGIN_SUCCESS,
  authenticationToken: string
}

interface LoginFailed {
  type: typeof authenticatorConstants.LOGIN_FAILURE,
  errMsg: string
}

interface LoadingLogin {
  type: typeof authenticatorConstants.LOGIN_LOADING
}

interface LogoutAction {
  type: typeof authenticatorConstants.LOGOUT
}

export type AuthActionTypes = LoginAction | LoginFailed | LoadingLogin | LogoutAction;
