import RequestObject from "../../model/Request";

export enum requestConstants {
    FETCH_SUCCESS = 'R_FETCH_SUCCESS',
    REQUEST_FAILED = 'R_REQUEST_FAILED',
    R_LOADING = 'R_LOADING'
};

export interface RequestState {
  isLoading: boolean,
  errMsg: string | null,
  records: Array<RequestObject>
};

interface LoadingAction {
  type: typeof requestConstants.R_LOADING
}

interface FetchSuccess {
  type: typeof requestConstants.FETCH_SUCCESS,
  records: Array<RequestObject>
}

interface FailedAction {
  type: typeof requestConstants.REQUEST_FAILED,
  errMsg: string
}

export type RequestTypes = LoadingAction | FetchSuccess | FailedAction;
