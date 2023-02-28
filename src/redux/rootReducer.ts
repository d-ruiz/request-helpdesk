import history from './history';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { Authentication } from './reducers/authenticator';
import { Users } from './reducers/users';
import { Requests } from './reducers/requests';
import { RequestInfo } from './reducers/requestInfo';

const appReducer = combineReducers({
    router: connectRouter(history),
    authenticator: Authentication,
    users: Users,
    requests: Requests,
    requestInfo: RequestInfo
});

const rootReducer = (state: any, action: any) => {
    return appReducer(state, action);
};

export default rootReducer;