/**
 * @author [%author%]
 * @date [%date%]
 * @Description: 用户的登录、个人中心的配置api接口
 */
import request from '../utils/request';
import { PROXY_API } from '../constant/index';

const api = {
  // 登录
  login: `${PROXY_API}/admin/user/aLogin`,
  // 获取用户信息
  getUserInfo: `${PROXY_API}/admin/user/getInfo`,
};

// 用户登录
export async function login(data) {
  return request({
    method: 'post',
    url: api.login,
    data,
  });
}

// 获取用户信息
export async function getUserInfo() {
  return request({
    method: 'get',
    url: api.getUserInfo,
  });
}
