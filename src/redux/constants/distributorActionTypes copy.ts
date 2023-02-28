export enum distConstants {
    FETCH_SUCCESS = 'FETCH_SUCCESS',
    LOADING_RECORDS = 'LOADING_RECORDS'
};

export interface DistState {
  isLoading: boolean,
  errMsg: string | null,
  email: string | null
};

interface LoadingAction {
  type: typeof distConstants.LOADING_RECORDS
}

interface FetchSuccess {
  type: typeof distConstants.FETCH_SUCCESS,
  email: string
}

export type DistActionTypes = LoadingAction | FetchSuccess;
