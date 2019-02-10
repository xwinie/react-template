'use strict'

import axios from "axios";
import qs from "qs";
import {ACCESS_KEY, ACCESS_SECRET} from "../../constant/common-constant";
import {message} from "antd";
import CryptoJS from "crypto-js";
import hmacSHA512 from "crypto-js/hmac-sha512";
import session from "../../common/util/storage"
import {hashHistory} from "react-router"


let nonce = String(Date.now() * 1e6);
let unixTime = Math.round(new Date().getTime() / 1000);
export default {
    post (url, data) {
        let sign = hmacSHA512("POST" + "\n" + url.protocol + "\n" + url.context + "\n" + ACCESS_KEY + "\n" + nonce + "\n" + unixTime + "\n" + data + "\n", ACCESS_SECRET);
        return axios({
            method: 'post',
            // baseURL: 'https://randomuser.me/api',
            url,
            data: qs.stringify(data),
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': "HmacSHA512 " + ACCESS_KEY + ":" + nonce + ":" + CryptoJS.enc.Base64.stringify(sign)
            }
        }).then(res => {
            // 此处可以根据返回值做权限控制
            console.log(res)

            if (res.code === '401') {
                session.set('isLogin', false)
                hashHistory.push('/login')
            }

            if (res.code === '403') {
                message.error('没有权限')
            }

            return res
        })
            .catch(function (error) {
                console.log('global handle ajax error:', error)
                return error
            })
    },
    get (url, params) {
        return axios({
            method: 'get',
            // baseURL: 'https://randomuser.me/api',
            url,
            params, // get 请求时带的参数
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            // 此处可以根据返回值做权限控制
            console.log(res)

            if (res.code === '401') {
                session.set('isLogin', false)
                hashHistory.push('/login')
            }

            if (res.code === '403') {
                message.error('没有权限')
            }

            return res
        })
            .catch(function (error) {
                console.log('global handle ajax error:', error)
                return error
            })
    }
}