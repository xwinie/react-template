import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {Button, Form, Input, Spin} from "antd";
import DocumentTitle from "react-document-title";
import "./index.scss";
import {local, session} from "../../common/util/storage.js";
import logoImg from "./logo.png";
import CryptoJS from "crypto-js";
import {loginUser} from "../../actions/LoginActionCreators";
const FormItem = Form.Item;
const createForm = Form.create;


function noop() {
    return false;
}

@createForm()
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.login = this.login.bind(this)
        this.onKeyPressLogin = this.onKeyPressLogin.bind(this)
    }

    static componentDidMount() {
        session.removeAll()
    }

    login = (e) => {
        e.preventDefault();
        this.props.form.validateFields((errors) => {
            if (errors) {
                return false;
            }
            let requestData = new Map();
            requestData.set("username", this.props.form.getFieldValue("username"));
            requestData.set("password", CryptoJS.MD5(CryptoJS.MD5(this.props.form.getFieldValue("password")).toString() + CryptoJS.MD5(this.props.form.getFieldValue("username")).toString()).toString());
            this.props.loginUser(requestData);
        });
    }

    onKeyPressLogin(event) {
        if (event.which === 13) {
            this.login(event);
        }
    }

    render() {

        const {getFieldDecorator} = this.props.form
        return (
            <div className="login-page">
                <DocumentTitle title="管理台"/>
                <div className="login-box">
                    <img src={logoImg} alt="logo" className="logo"/>
                    <Spin spinning={this.props.auth.loading} size="large">
                        <Form className="login-form" onKeyPress={this.onKeyPressLogin}>
                            <FormItem>
                                {getFieldDecorator('username', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入账户名'
                                        }
                                    ],
                                })(
                                    <Input placeholder="账户"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入密码'
                                        }
                                    ],
                                })(
                                    <Input autoComplete="off" type="password" placeholder="密码" onContextMenu={noop}
                                           onPaste={noop} onCopy={noop} onCut={noop}/>
                                )}
                            </FormItem>
                            <Button type="primary" onClick={this.login}>登录</Button>
                        </Form>
                    </Spin>
                </div>
            </div>
        )
    }
}


Login.propTypes = {
    loginUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {auth: state.auth};
};

const mapDispatchToProps = (dispatch) => (
    {
        loginUser: (requestData) => dispatch(loginUser(requestData))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
