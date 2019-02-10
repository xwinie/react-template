"use strict"
import React from 'react'
import Page from '../page/index.jsx'
import {Icon} from 'antd'

import './style.scss'

export default (props) =>

    <Page loading={false} title="404">
        <div className='error-404'>
            <Icon type='frown-o'/>
            <h1>404 Not Found</h1>
        </div>
    </Page>
