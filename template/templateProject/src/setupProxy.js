/**
 * @author [%author%]
 * @date [%date%]
 * @Description: 代理配置
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

// 没有开启mock是启用代理
const app = process.argv[2] === 'mock' ? () => {
// eslint-disable-next-line no-shadow
} : (app) => {
  console.log('代理开启了=====');
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // rewrite path
      },
    }),
  );
};

module.exports = app;
