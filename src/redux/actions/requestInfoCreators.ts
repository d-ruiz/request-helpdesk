import { JSONResponse, UrlParams } from "../../model/Helpers";
import RequestObject from "../../model/Request";
import RequestError from "../../model/error/RequestError";
import { RequestActionTypes, requestInfoConstants } from "../constants/requestInfoActionTypes";
import { IDEMPIERE_URLS, getJSONCall, getToken, getURL } from "./api";


export const fetchRequestTypeAndConfindentiality = () => async (dispatch: any) => {

  return Promise.all([dispatch(fetchConfidentialities()), dispatch(fetchTypes())])
    .then(([confidentialities, types]) => {
      return dispatch(fetchDataSuccessfully(confidentialities, types.records));
    })
    .catch(error => {
      console.error('fetchRequestInfo: ', error.message);
      dispatch(requestFailed(error.message));
    });
};

const fetchConfidentialities = () => async (dispatch: any) => {

  return fetch(IDEMPIERE_URLS.confidentialities, getJSONCall('GET', getToken()))
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
    .then((response) => {
      return response.reflist;
    })
    .catch(error => {
      console.error('Fetch Types', error.message);
      dispatch(requestFailed(error.message));
    });
};

const fetchTypes = () => (dispatch: any) => {

  dispatch(requestInfoLoading());

  const params: UrlParams = {
    $select: "Name",
    $orderby: "Name"
  }

  const url = getURL(IDEMPIERE_URLS.requestTypes, params);

  return fetch(url, getJSONCall('GET', getToken()))
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
    .then((response: any) => {
      return response.json();
    })
    .then((response: JSONResponse) => {
      return response;
    })
    .catch(error => {
      console.error('fetchRequests: ', error.message);
      dispatch(requestFailed(error.message));
    });
};

export const saveRequest = (request: RequestObject) => (dispatch: any) => {

  let url: string = IDEMPIERE_URLS.request;
  let method: any = 'POST';
  let object: any = JSON.stringify(request);

  if (request.id) {
    url = url + '/' + request.id;
    method = 'PUT';
    const newRequest: any = {
      id: request.id,
      Result: request.LastResult
    }
    object = JSON.stringify(newRequest);
  }

  return fetch(url, getJSONCall(method, getToken(), object))
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
    .then((response) => {
      return response;
    })
    .catch(error => {
      console.error('saveProductCategory', error.message);
      dispatch(requestFailed(error.message));
    });
};

/**
* Action Creators send to the reducer
**/
export const requestInfoLoading = (): RequestActionTypes => ({
  type: requestInfoConstants.RINFO_LOADING
});

export const fetchDataSuccessfully = (confidentialities: Array<any>, types: Array<any>): RequestActionTypes => ({
  type: requestInfoConstants.FETCH_SUCCESS,
  confidentialities: confidentialities,
  types: types
});

export const requestFailed = (errmsg: string): RequestActionTypes => ({
  type: requestInfoConstants.REQUEST_FAILED,
  errMsg: errmsg
});
