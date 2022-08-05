import reducerFunc from './../_reducers/reducer';
import { createStore } from 'redux';

const store = createStore(reducerFunc);

console.log("store : ", store);
console.log("starting state : ", store.getState())

export default store;

