import { AuthActionTypes, AuthState, authenticatorConstants } from "../constants/authenticatorActionTypes";

const initialState: AuthState = {
  authenticationToken: '',
  errMsg: ''
}

export const Authentication = (state =  initialState, action: AuthActionTypes): AuthState => {
  switch(action.type) {
    case authenticatorConstants.LOGIN_SUCCESS:
      return {...state, errMsg: '', authenticationToken: action.authenticationToken};
    case authenticatorConstants.LOGIN_FAILURE:
      return {...state, errMsg: action.errMsg, authenticationToken: ''};
    case authenticatorConstants.LOGOUT:
    return {...state, errMsg: '', authenticationToken: ''};

    default:
        return state;
  }
}
