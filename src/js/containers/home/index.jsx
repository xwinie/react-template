"use strict"

import React from 'react'
import {message, Button, Icon} from 'antd'
import Page from '../page/index.jsx'
import './index.scss'

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page>
                <div className='wellcome'>
                    <Icon type='smile-o'/>
                    <h3>antd admin boilerplate</h3>
                </div>
            </Page>
        )
    }
}

export default Home
