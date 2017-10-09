import { createStore } from 'redux';
// import reducer from './reducers';
import homepage from './reducers/homepage';

// let store = createStore(reducer);
let store = createStore(homepage);

export default store;