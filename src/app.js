import '@tarojs/async-await'
import Taro, {Component} from '@tarojs/taro'
import {Provider} from '@tarojs/redux'

import Index from './pages/index'
import './app.less'
import Utils from "./utils/util";
import httpProvider from "./utils/http"

import dva from './utils/dva'
import models from "./models"

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();


class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/user/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true
    },
    tabBar: {
      selectedColor: "#39b383",
      list: [
        {
          pagePath: "pages/index/index",
          text: "实验室",
          iconPath: "assets/images/lab.png",
          selectedIconPath: "assets/images/lab-s.png"
        },
        // {
        //   pagePath: "pages/task/task-list/task-list",
        //   text: "课题组",
        //   iconPath: "assets/images/kt.png",
        //   selectedIconPath: "assets/images/kt-s.png"
        // },
        // {
        //   pagePath: "pages/msg/msg",
        //   text: "消息",
        //   iconPath: "assets/images/msg.png",
        //   selectedIconPath: "assets/images/msg-s.png"
        // },
        {
          pagePath: "pages/user/index",
          text: "我的",
          iconPath: "assets/images/user.png",
          selectedIconPath: "assets/images/user-s.png"
        }
      ]
    },
    networkTimeout: {
      request: 10000,
      downloadFile: 10000
    },
  };

  componentDidMount() {
  }

  componentDidShow() {
    Taro.login().then(result => {
      this.appBootstrap(result.code)
    }).catch(err => console.log(err.errMsg))
  }

  /**
   * APP启动
   */
  appBootstrap(code) {
    if (!Utils.isString(code)) {
      Utils.toast.info('未获取微信登陆用户登录凭证');
      return;
    }
    //获取token
    httpProvider.get(`oauth/token`, {
      code: code,
      client_type: "miniwx",
      appId: 'wx864f118d52ab84e8'
    }, true).then(res => {
      if (Utils.isSuccess(res.errcode)) {
        this.registeredHandler(res.data);
      } else if (res.errcode === '1001') {
        this.unregisteredHandler(res.data)
      } else {
        Utils.toast.info(res.data || res.errmsg);
      }
    }, error => {
      Utils.toast.info(error);
    })
  }

  /**
   * 已经注册用户
   */
  registeredHandler(token) {
    Utils.userService.setToken(token);
    this.getUserInfo()
    Taro.reLaunch({
      url: '../../pages/index/index'
    })
  }


  /**
   * 未注册用户
   */
  unregisteredHandler(key) {
    Utils.userService.setSessionKey(key)
    Taro.reLaunch({
      url: `../../pages/user/register/register`
    })
  }

  /**
   * 获取用户信息
   */
  getUserInfo() {
    const getUser = httpProvider.get('cp/user/get', {}, true);
    const getDept = httpProvider.get('cp/dept/list', {
      id: 0,
      userScope: true
    });
    Promise.all([getUser, getDept]).then(result => {
      const depts = result[1].data || [];
      Utils.userService.setUserInfo(result[0].data);
      Utils.userService.setDeptInfo(depts);
    }).catch(err => {
      Utils.toast.info(err)
    })
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index/>
      </Provider>
    )
  }
}

Taro.render(<App/>, document.getElementById('app')
)
