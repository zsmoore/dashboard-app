import { createStore, applyMiddleware } from 'redux';
// import reducer from './reducers';
import homepage from './reducers/homepage';
import thunk from 'redux-thunk';

// creates the react store which holds page state and data.
let store = createStore(homepage, applyMiddleware(thunk));

export default store;