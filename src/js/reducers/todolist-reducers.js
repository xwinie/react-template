/**
 * Created by bobo on 29/06/2017.
 */

import {ADD_TODO, SET_FILTER, COMPLETED_TODO, VISIBLY_VALUE} from '../actions/todolist-action';


export function visiblyValue(state=VISIBLY_VALUE.SHOW_ALL, action){
    switch (action.type){
        case SET_FILTER:
            return action.filter;
        default:
            return state;
    }
}

export function todos(state=[], action){
    switch (action.type){
        case ADD_TODO:
            return [
                ...state,
                {
                    completed: false,
                    text: action.text
                }
            ];
        case COMPLETED_TODO:
            return state.map( (todo, index) => {
                if(index === action.index){
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }else{
                    return todo;
                }
            })
        default:
            return state;
    }
}
