import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import {visiblyValue, todos, todoListReducer} from './todolist-reducers'
import auth from "./LoginReducer"
const rootReducer = combineReducers({
    routing: routerReducer,
    visiblyValue, todos, auth
});

export default rootReducer;