/**
 * Created by bobo on 29/06/2017.
 */
import fetch from "isomorphic-fetch";
import StandardError from "standard-error";
import {ACCESS_KEY, ACCESS_SECRET} from "../../constant/common-constant";
import {message, Modal} from "antd";
import CryptoJS from "crypto-js";
import hmacSHA512 from "crypto-js/hmac-sha512";
require('es6-promise').polyfill();


function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

function jsonParse(res) {
    return res.json();
}

function setUriParam(keys, value, keyPostfix) {
    let keyStr = keys[0];

    keys.slice(1).forEach((key) => {
        keyStr += `[${key}]`;
    });

    if (keyPostfix) {
        keyStr += keyPostfix;
    }

    return `${encodeURIComponent(keyStr)}=${encodeURIComponent(value)}`;
}

function getUriParam(keys, object) {
    const array = [];

    if (object instanceof (Array)) {
        object.forEach((value) => {
            array.push(setUriParam(keys, value, '[]'));
        });
    } else if (object instanceof (Object)) {
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const value = object[key];

                array.push(getUriParam(keys.concat(key), value));
            }
        }
    } else {
        if (object !== undefined) {
            array.push(setUriParam(keys, object));
        }
    }

    return array.join('&');
}

function toQueryString(object) {
    const array = [];

    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const str = getUriParam([key], object[key]);

            if (str !== '') {
                array.push(str);
            }
        }
    }

    return array.join('&');
}


function cFetch(url, options) {
    let mergeUrl = url;
    const defaultOptions = {
        method: 'GET'
    };
    const opts = Object.assign({}, defaultOptions, {...options});
    // add query params to url when method is GET
    if (opts && opts.method == "GET" && opts['params']) {
        mergeUrl = mergeUrl + '?' + toQueryString(opts['params']);
    } else if (opts && opts.method == "POST") {
    }
    opts.headers = {
        ...opts.headers,
        'Content-Type': 'application/json;charset=utf-8',
    };
    return fetch(mergeUrl, opts)
        .then(checkStatus)
        .then(jsonParse);
}

//catch all the unhandled exception
window.addEventListener("unhandledrejection", function (err) {
    const ex = err.reason;
    if (ex.constructor != null && ex.constructor == StandardError || ex.msg != null) {
        message.error(ex.msg, 2.5);
    }
});

export default cFetch;
