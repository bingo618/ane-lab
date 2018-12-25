import Utils from "./util.js";
import ENV_CONFIG from "./config.js"

//请求任务记录
const RES_LIST = {}

//添加请求任务
const addRequsetKey = (key) => {
  RES_LIST[key] = true
}

//移除请求任务
const removeRequestKey = (key) => {
  delete RES_LIST[key]
}

//移除请求任务是否存在
const hasRequestKey = (key) => {
  return RES_LIST[key]
}

const handleResStatusCode = (code) => {
  if (code === 400) {
    Utils.toast.info(`请求参数有误`);
  } else if (code === 404) {
    Utils.toast.info(`404API不存在`);
  } else if (code >= 500) {
    Utils.toast.info('服务器错误');
  }
}

// const deleteSpace = (obj) => {
//     for (let i in obj) {
//         const key = obj[i];
//         Utils.trim(obj[key])
//     }
// }

const httpProvider = (() => {
  /**
   * 统一请求处理方法
   */
  const _http = (METHOD, URL, DATA, contentType) => {
    var request_key = 'Method: ' + METHOD + ',Url: ' + URL + ',Data: ';

    try {
      request_key += JSON.stringify(DATA)
    } catch (e) {
      request_key += DATA
    }

    if (hasRequestKey(request_key)) {
      throw Error('重复提交请求：' + request_key)
      return false;
    }

    addRequsetKey(request_key)

    return new Promise((resolve, reject) => {
      wx.request({
        method: METHOD,
        url: ENV_CONFIG.BASIC_URL + URL,
        data: DATA,
        header: {
          "content-type": contentType || "application/json",
          "auth-header": Utils.userService.getToken()
        },
        success: res => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            handleResStatusCode(res.statusCode)
          }
        },
        fail: error => {
          Utils.toast.info(error.errMsg);
          reject(error);
        },
        complete: res => {
          removeRequestKey(request_key)
        }
      })
    })
  }

  /**
   * get方式请求
   */
  var _get = (path, params) => {
    return _http('GET', path, params)
  };

  /**
   * post方式请求
   */
  var _post = (path, params, contentType) => {
    return _http('POST', path, params, contentType)
  };

  /**
   * 文件上传oss
   */
  var _upload = (file, params) => {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: ENV_CONFIG.UPLOAD_URL,
        filePath: file,
        name: "file",
        formData: params,
        success: res => {
          resolve(res);
        },
        fail: error => {
          Utils.toast.info(error.errMsg);
          reject(error);
        }
      })
    })
  }

  return {
    get: _get,
    post: _post,
    upload: _upload
  };

})();

export default httpProvider;
