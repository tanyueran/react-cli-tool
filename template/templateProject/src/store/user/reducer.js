/**
 * @author tanxin
 * @date $
 * @Description: user 的 reducer
 */
import Storage from '../../utils/storage';

// 设置登录信息
export const SET_USER = 'SET_USER';
export const DEl_USER = 'DEl_USER';
// 设置token
export const SET_TOKEN = 'SET_TOKEN';
// 设置是否正在登录
export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';

// 初始化值
const defaultValue = {
  loading: false,
  loginErr: '',
  userInfo: {
    data: {},
    isLogin: false,
    token: '',
  },
  // 菜单
  menu: [],
  // 二级菜单对应对的按钮权限
  button: {},
};

// 从缓存中取
const val = Storage.get('userInfo');
if (val !== null) {
  defaultValue.userInfo = val;
}
const menu = Storage.get('userMenu');
if (menu !== null) {
  defaultValue.menu = menu;
}
const button = Storage.get('userButton');
if (button !== null) {
  defaultValue.button = button;
}

export function userReducer(state = defaultValue, action) {
  switch (action.type) {
    case SET_USER: {
      const o = {
        data: action.value,
        token: state.userInfo.token,
        isLogin: true,
      };
      const obj1 = { ...state, userInfo: o };
      Storage.set('userInfo', o);
      return obj1;
    }
    case SET_TOKEN: {
      const o2 = {
        data: {},
        token: action.value,
        isLogin: true,
      };
      const obj3 = { ...state, userInfo: o2 };
      Storage.set('userInfo', o2);
      return obj3;
    }
    case DEl_USER: {
      const obj2 = {
        ...state,
        userInfo: {
          data: {},
          isLogin: false,
          token: '',
        },
        menu: [],
      };
      Storage.remove('userInfo');
      Storage.remove('userMenu');
      return obj2;
    }

    case SET_LOGIN_STATUS: {
      const obj = { ...state, loading: action.value };
      return obj;
    }

    default:
      return state;
  }
}
