/**
 * Created by bobo on 17/07/2017.
 */

import cFetch from "../common/request/cFetch";
import JsonUtils from "../common/util/JsonUtils";
import {BASEURL} from "../constant/common-constant";
import {LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER} from "../constant/index";
import {hashHistory} from "react-router";
import jwtDecode from "jwt-decode";
import {local, session} from "../common/util/storage.js";

export function loginUserSuccess(token, token_type) {
    session.set('access_token', token);
    session.set('token_type', token_type);
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            token: token
        }
    }
}

export function loginUserFailure(error) {
    session.remove('access_token');
    return {
        type: LOGIN_USER_FAILURE,
    }
}

export function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST
    }
}

export function logout() {
    session.remove('access_token');
    return {
        type: LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return (dispatch) => {
        dispatch(logout());
        hashHistory.push('/');
    }
}

export function loginUser(requestData, redirect = "/home") {
    return function (dispatch) {
        dispatch(loginUserRequest());
        return cFetch(`${BASEURL}/api/login`, {method: "POST", body: JsonUtils.mapToJson(requestData)})
            .then(response => {
                try {
                    let decoded = jwtDecode(response.access_token);
                    // console.log(decoded);
                    session.set('jwtdecode', decoded);
                    dispatch(loginUserSuccess(response.access_token));
                    hashHistory.push('/home');
                } catch (e) {
                    dispatch(loginUserFailure(e));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}


