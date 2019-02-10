import React from 'react';
import Layout from './containers/layout/Layout';
import Home from './containers/home/index'
import pageRoutes from './containers/routeConfig'
import {local, session} from 'common/util/storage.js'

let routes = [
    {
        path: '/home',
        component: Layout,
        indexRoute: {
            component: Home,
            // onEnter(nextState, replace) {
            //     replace('/home')
            // }
        },
        childRoutes: pageRoutes,
    },
    {
        path: '/login',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./containers/Login/Login'))
            })
        }
    },
    {
        path: '*',
        indexRoute: {
            onEnter(nextState, replace) {
                if (!session.get('isLogin')) {
                    replace('/login')
                } else {
                    replace('/404')
                }
            }
        }
    }
]


export default routes;