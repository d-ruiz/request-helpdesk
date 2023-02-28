export type JSONResponse = {
  ok: boolean,
  status: STATUS,
  statusText: string,
  url: string,
  type: string,
  [propName: string]: any;
}

/**
* Reducers interfaces
**/
export interface UrlParams {
  $filter?: string;
  $expand?: string;
  $select?: string;
  $orderby?: string;
}

export interface LoginParams {
  client: number;
  role?: number,
  organization?: number;
}

export interface LoginInfo {
  clientId: number;
  roleId?: number,
  organizationId?: number;
  warehouseId?: number;
  token?: string;
  language?: string;
}

export interface AuthResponse {
  roles?: Array<any>;
  organizations?: Array<any>;
  warehouses?: Array<any>;
}

export enum STATUS {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}