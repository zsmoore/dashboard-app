import { createStore, applyMiddleware } from 'redux';
// import reducer from './reducers';
import homepage from './reducers/homepage';
import thunk from 'redux-thunk';

let store = createStore(homepage, applyMiddleware(thunk));

export default store;