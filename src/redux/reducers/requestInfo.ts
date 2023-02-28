import { RequestActionTypes, RequestInfoState, requestInfoConstants } from "../constants/requestInfoActionTypes";


const initialState: RequestInfoState = {
  isLoading: false,
  errMsg: null,
  confidentialities: [],
  types: []
}

export const RequestInfo = (state =  initialState, action: RequestActionTypes): RequestInfoState => {
  switch(action.type) {
    case requestInfoConstants.RINFO_LOADING:
      return {...state, errMsg: null, confidentialities: [], types: [], isLoading: true};
    case requestInfoConstants.FETCH_SUCCESS:
      return {...state, errMsg: null, confidentialities: action.confidentialities, types: action.types, isLoading: false};
    case requestInfoConstants.REQUEST_FAILED:
      return {...state, errMsg: action.errMsg, confidentialities: [], types: [], isLoading: false};

    default:
        return state;
  }
}
