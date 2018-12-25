import {getMenu} from "../service/home"
import Utils from "../utils/util";
import Taro from "@tarojs/taro"

export default {
  namespace: 'home',
  state: {
    menuList: []
  },
  effects: {
    * getMenuList(_, {call, put}) {
      const {errcode, data} = yield call(getMenu, {});
      if (Utils.isString(errcode)) {
        Taro.stopPullDownRefresh();
        let length = data.length, arr = [], mod = length % 3;
        if (mod !== 0) {
          for (let i = 0; i < 3 - mod; i++) {
            arr.push({})
          }
        }
        yield put({
          type: 'save', payload: {
            menuList: [...data, ...arr],
          }
        });
      }
    },
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
  },
};
