const CracoLessPlugin = require('craco-less');
const path = require('path');

module.exports = {
  devServer: {
    // 开启mock server数据,process.argv的第四个参数mock 表明是否为mock版本的
    before: process.argv[2] && require('./mock/index.js'),
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1da57a' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    // 可以此处拦截
    configure: (webpackConfig, { env, paths }) => webpackConfig,
  },
};
