import { JSONResponse, UrlParams } from "../../model/Helpers";
import RequestObject from "../../model/Request";
import RequestError from "../../model/error/RequestError";
import { RequestTypes, requestConstants } from "../constants/requestActionTypes";
import { IDEMPIERE_URLS, getJSONCall, getToken, getURL } from "./api";

export const fetchRequests = () => (dispatch: any) => {

  dispatch(requestLoading());

  const params: UrlParams = {
    $select: "DocumentNo,R_RequestType_ID,Summary,ConfidentialType",
    $orderby: "DocumentNo"
  }

  const url = getURL(IDEMPIERE_URLS.request, params);

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
    const pos = response.records;
    dispatch(fetchRequestSuccessful(pos));

    return pos;
  })
  .catch(error => {
    console.error('fetchRequests: ', error.message);
    dispatch(requestFailed(error.message));
  });
};

export const fetchRequestSuccessful = (requests: Array<RequestObject>): RequestTypes => ({
  type: requestConstants.FETCH_SUCCESS,
  records: requests
});

export const requestLoading = (): RequestTypes  => ({
  type: requestConstants.R_LOADING,
});

export const requestFailed = (errmsg: string): RequestTypes => ({
  type: requestConstants.REQUEST_FAILED,
  errMsg: errmsg
});

