import reducer from './reducer.js';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store =  createStore(reducer, composeEnhancer(applyMiddleware(thunk))
);

export default store;