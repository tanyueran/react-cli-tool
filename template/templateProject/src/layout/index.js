/**
 * @author [%author%]
 * @date [%date%]
 * @Description: 布局页面
 */
import React from 'react';
import { withRouter, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

import {
  Layout,
  Avatar,
  Row,
  Col,
  Dropdown,
  Menu,
} from 'antd';

import {
  UserOutlined,
  CaretDownOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import {
  del_user,
  pullUserInfo,
} from '../store/user/action';

import MNav from '../component/MNav';

import './index.scss';

import logo from '../assets/images/logo.jpg';
import { previewFile } from '../api/commom';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  componentDidMount() {
    // 判断是否登录
    if (!this.props.user.userInfo.isLogin) {
      this.props.history.replace('/login');
    } else if (!this.props.user.userInfo.data.userCode) {
      // 获取用户信息
      this.props.pullUserInfo();
    }
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  /**
   *  切换
   */
  toggle = () => {
    this.setState((state) => ({
        collapsed: !state.collapsed,
      }));
  };

  /**
   * 退出登录
   * */
  logoutHandler = () => {
    this.props.del_user();
    this.props.history.replace('/login');
  };

  render() {
    return (
      <Layout className="app-wrapper">
        <Layout.Sider theme="light" trigger={null} collapsible collapsed={this.state.collapsed}>
          <div
            className="logo"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              this.props.history.push('/');
            }}>
            <img alt="logo" width={40} src={logo} />
            {
              this.state.collapsed ? '' : '蛋糕商城管理系统'
            }
          </div>
          <MNav />
        </Layout.Sider>
        <Layout className="app-content-wrapper">
          <Layout.Header style={{ padding: '0 10px' }}>
            <Row type="flex">
              <Col span={12}>
                {
                  this.state.collapsed
                    ? <MenuUnfoldOutlined onClick={this.toggle} />
                    : <MenuFoldOutlined onClick={this.toggle} />
                }
              </Col>
              <Col push={8} span={4} style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                {/* 头像 */}
                {
                  this.props.user.userInfo.data.headImg
                    ? (
                      <Avatar
                        src={previewFile(this.props.user.userInfo.data.headImg)}
                        style={{ margin: '0 1em' }}
                        size="large" />
                    )
                    : <Avatar style={{ margin: '0 1em' }} size="large" icon={<UserOutlined />} />
                }
                <Dropdown overlay={(
                  <Menu theme="light">
                    <Menu.Item onClick={() => {
                      this.props.history.push('/home/personInfo');
                    }}>
                      个人中心
                    </Menu.Item>
                    <Menu.Item onClick={this.logoutHandler}>退出</Menu.Item>
                  </Menu>
                )}>
                  <a
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    style={{ fontSize: '16px' }}>
                    {this.props.user.userInfo.data.userName}
                    <CaretDownOutlined style={{ marginLeft: '5px' }} />
                  </a>
                </Dropdown>
              </Col>
            </Row>
          </Layout.Header>
          <Layout.Content
            className="app-content-wrapper_box"
            style={{ overflow: 'auto', margin: '20px 10px' }}>
            {/* 配置子路由 */}
            {
              this.props.routes.map((item, i) => (
                <Route
                  exact={item.exact}
                  path={item.path}
                  key={i}
                  render={(props) => <item.component {...props} />} />
              ))
            }
            {/* 配置404 */}
            {
              this.props.routes.findIndex(
                (item) => item.path === this.props.location.pathname,
              ) === -1
              && <Redirect to="/home/404" />
            }
          </Layout.Content>
          <Layout.Footer className="text-center" style={{ margin: '0 10px' }}>
            ©2020
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  }
}

/*
* 通过connect 引入store
* */
export default connect(
  (state) => ({
    user: state.userReducer,
  }),
  {
    del_user,
    pullUserInfo,
  },
)(withRouter(IndexPage));
