import React, {PropTypes} from "react";
import {Button, Dropdown, Menu, message, Popconfirm} from "antd";
import {connect} from "react-redux";
import FAIcon from "../../components/faicon/index.jsx";
import {local, session} from "../../common/util/storage.js";
import {logoutAndRedirect} from "../../actions/LoginActionCreators";
import "./index.scss";

import UpdateModal from "./UpdateModal.jsx";

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // update modal
            updateModalVisible: false,
            updateModalConfirmLoading: false,
            initialUpdateValue: {}
        }

        this.logout = this.logout.bind(this)
    }

    logout() {

        this.props.logoutAndRedirect();
    }


    onToggle() {
    }


    render() {
        const mini = this.props.miniMode

        const userInfo = session.get('jwtdecode') || {unique_name: '紫霞仙子'}

        const menu = (
            <Menu >
                <Menu.Item key="updatePwd">修改密码</Menu.Item>
            </Menu>
        )

        return (
            <header className="yt-admin-framework-header clearfix">
                <h1 className="yt-admin-framework-header-brand">
                    {
                        mini? 'A': 'Ant Design'
                    }
                    <Button type="ghost" style={{display: 'none'}}>only for use antd button styles</Button>
                </h1>
                <div className="yt-admin-framework-header-sidebar-toggle">
                    <a href="javascript:;" onClick={this.onToggle}>
                        <FAIcon name="bars" className="toggle-icon"/>
                    </a>
                </div>
                <ul className="yt-admin-framework-header-menu clearfix">
                    {
                        //     <li className="menu-item">
                        //     <a href="javascript:;">
                        //         <FAIcon name="leaf"/>
                        //         <span className="header-menu-text">叶子</span>
                        //     </a>
                        // </li>
                    }
                    <li className="menu-item">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a href="javascript:;">
                                <FAIcon name="user"/>
                                <span className="header-menu-text">{userInfo.unique_name}</span>
                            </a>
                        </Dropdown>
                    </li>

                    <li className="menu-item">
                        <Popconfirm placement="bottomRight" title="您确定要退出系统吗？" onConfirm={this.logout}>
                            <a href="javascript:;">
                                <FAIcon name="sign-out"/>
                                <span className="header-menu-text">退出系统</span>
                            </a>
                        </Popconfirm>
                    </li>
                </ul>
                <UpdateModal
                    initialValue={this.state.initialUpdateValue}
                    visible={ this.state.updateModalVisible }
                    confirmLoading={ this.state.updateModalConfirmLoading }
                />
            </header>
        )
    }
}


Header.propTypes = {
    logoutAndRedirect: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    const {loading} = state.auth;
    return {
        loading
    };
};

const mapDispatchToProps = (dispatch) => (
    {
        logoutAndRedirect: () => dispatch(logoutAndRedirect())
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
