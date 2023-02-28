import iDempiereUser from "../../model/iDempiereUser";

export interface UserState {
  currentUser?: iDempiereUser | undefined,
  errMsg: string
};

export enum userConstants {
    USERS_LOGIN_REQUEST = 'USERS_LOGIN',
    USERS_LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS',
    USERS_LOGOUT = 'USERS_LOGOUT'
};

interface LoginUser {
  type: typeof userConstants.USERS_LOGIN_SUCCESS,
  currentUser: iDempiereUser
}

interface LogoutUser {
  type: typeof userConstants.USERS_LOGOUT
}

export type UserActionTypes = LoginUser | LogoutUser;
