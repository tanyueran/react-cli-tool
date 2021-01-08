import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// antd 配置文件
import { ConfigProvider } from 'antd';
import store from './store/index';
// 全局样式
import './style/index.scss';
import App from './App';
import config from './config/antd.config';

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider {...config}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root'),
);
