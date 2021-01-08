/**
 * @author [%author%]
 * @date [%date%]
 * @Description: 模拟数据服务入口文件
 */
const apiMocker = require('mocker-api');
const path = require('path');

// 配置mock-server
module.exports = (app) => {
  console.log("开启mock了");
  apiMocker(app, path.resolve(__dirname, './api.js'), {
    header: {
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
    }
  });
};
