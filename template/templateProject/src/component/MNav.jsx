/**
 * @author [%author%]
 * @date [%date%]
 * @Description: 导航组件
 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Menu } from 'antd';

import { createFromIconfontCN } from '@ant-design/icons';

// 自定义的iconfont
const IconFont = createFromIconfontCN({
  scriptUrl: '/iconfont/iconfont.js', // 引用静态的地址
});

class MNav extends React.Component {
  clickHandler = (val) => {
    this.props.history.push(val.key);
  };

  render() {
    const fontStyle = {
      fontSize: '18px',
    };
    return (
      <Menu mode="inline" onClick={this.clickHandler} selectedKeys={this.props.location.pathname}>
        <Menu.Item key="/home/index">
          <IconFont style={fontStyle} type="myiconshouye" />
          <span>首页</span>
        </Menu.Item>
        <Menu.Item key="/home/personInfo">
          <IconFont style={fontStyle} type="myiconyonghuzhuzhanghaoguanli" />
          <span>个人信息</span>
        </Menu.Item>
        <Menu.Item key="/home/roleManager">
          <IconFont style={fontStyle} type="myiconzichanxinxibuquancelve" />
          <span>角色管理</span>
        </Menu.Item>
        <Menu.Item key="/home/userManager">
          <IconFont style={fontStyle} type="myiconmingdanzixuexi" />
          <span>用户管理</span>
        </Menu.Item>
        <Menu.Item key="/home/categoriesManager">
          <IconFont style={fontStyle} type="myiconzuzhijigou" />
          <span>蛋糕类型管理</span>
        </Menu.Item>
        <Menu.Item key="/home/cakeManager">
          <IconFont style={fontStyle} type="myiconfangwenkongzhicelve" />
          <span>蛋糕管理</span>
        </Menu.Item>
        <Menu.Item key="/home/orderManager">
          <IconFont style={fontStyle} type="myiconbaobiao" />
          <span>订单管理</span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default connect(
  (state) => ({
    user: state.userReducer,
  }),
)(withRouter(MNav));
