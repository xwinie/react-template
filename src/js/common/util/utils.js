/**
 * Created by bobo on 27/06/2017.
 */
import React from "react";
import CryptoJS from "crypto-js";
export function createConstants(...constants) {
    return constants.reduce((acc, constant) => {
        acc[constant] = constant;
        return acc;
    }, {});
}

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer
            ? reducer(state, action.payload)
            : state;
    };
}

export function encryptByAesCbcNoPadding(data,key,iv) {
    var key  = CryptoJS.enc.Latin1.parse(key);
    var iv   = CryptoJS.enc.Latin1.parse(iv);
    return CryptoJS.AES.encrypt(data, key, {iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding}).toString();
}

