import { legacy_createStore } from 'redux'
import  todoReducer from './Reducer'

let store=legacy_createStore(todoReducer);

export default store;