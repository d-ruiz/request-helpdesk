import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import history from './history';
import rootReducer from './rootReducer';

export const ConfigureStore = () => {

  const enhancer = composeWithDevTools(applyMiddleware(
    routerMiddleware(history),
    thunk,
    logger));

  return createStore(rootReducer, enhancer);
};
