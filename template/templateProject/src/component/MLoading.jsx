/**
 * @author [%author%]
 * @date [%date%]
 * @Description: loading组件
 */
import React from 'react';
import { Spin } from 'antd';

const style = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const loading = () => <Spin delay={300} style={style} size="large" />;

export default loading;
