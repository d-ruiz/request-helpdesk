import { UserActionTypes, UserState, userConstants } from "../constants/userActionTypes";


const initialState: UserState = {
  currentUser: undefined,
  errMsg: ''
}

export const Users = (state =  initialState, action: UserActionTypes) => {
  switch(action.type) {
    case userConstants.USERS_LOGOUT:
      return {...state, currentUser: undefined, errMsg: ''};
    case userConstants.USERS_LOGIN_SUCCESS:
      return {...state, currentUser: action.currentUser, errMsg: ''};

    default:
        return state;
  }
}
