/**
 * Created by bobo on 18/07/2017.
 */
import {LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER} from "../constant/index";




const defaultauth = () => {
    return {
        loading: false
    }
};

const auth = (state = defaultauth(), action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return Object.assign({}, state, {
                loading: true
            })
        case LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {
                loading: false
            })
        case LOGIN_USER_FAILURE:
            return Object.assign({}, state, {
                loading: false
            })
        case LOGOUT_USER:
            return Object.assign({}, state, {
                loading: false
            })
        default:
            return state
    }
};

export default auth;