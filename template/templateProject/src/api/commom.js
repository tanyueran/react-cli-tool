/**
 * @author [%author%]
 * @date [%date%]
 * @Description: 公用的api
 */
import request from '../utils/request';
import { PROXY_API } from '../constant/index';

const api = {
  // 获取主键
  getKey: `${PROXY_API}/utils/id`,
};

// 获取主键
export async function getKey(num) {
  return request({
    url: `${api.getKey}/${num}`,
  });
}

export const a = 1;
