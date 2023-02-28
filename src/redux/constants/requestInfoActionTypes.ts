export enum requestInfoConstants {
    FETCH_SUCCESS = 'RINFO_FETCH_SUCCESS',
    REQUEST_FAILED = 'RINFO_REQUEST_FAILED',
    RINFO_LOADING = 'RINFO_LOADING'
};

export interface RequestInfoState {
  isLoading: boolean,
  errMsg: string | null,
  types: Array<any>,
  confidentialities: Array<any>
};

interface LoadingAction {
  type: typeof requestInfoConstants.RINFO_LOADING
}

interface FetchSuccess {
  type: typeof requestInfoConstants.FETCH_SUCCESS,
  types: Array<any>,
  confidentialities: Array<any>
}

interface FailedAction {
  type: typeof requestInfoConstants.REQUEST_FAILED,
  errMsg: string
}

export type RequestActionTypes = LoadingAction | FetchSuccess | FailedAction;
