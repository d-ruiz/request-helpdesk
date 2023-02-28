import { RequestState, RequestTypes, requestConstants } from "../constants/requestActionTypes";


const initialState: RequestState = {
  isLoading: false,
  errMsg: null,
  records: []
}

export const Requests = (state = initialState, action: RequestTypes): RequestState => {
  switch (action.type) {
    case requestConstants.R_LOADING:
      return { ...state, errMsg: null, isLoading: !state.isLoading, records: [] };
    case requestConstants.FETCH_SUCCESS:
      return { ...state, errMsg: null, records: action.records, isLoading: false };
    case requestConstants.REQUEST_FAILED:
      return { ...state, errMsg: action.errMsg, isLoading: false, records: [] };

    default:
      return state;
  }
}
