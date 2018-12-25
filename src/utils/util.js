const getType = Object.prototype.toString;

const isString = (obj) => {
    return getType.call(obj) === '[object String]';
};

const isNumber = (obj) => {
    return getType.call(obj) === '[object Number]';
};

const isBoolean = (obj) => {
    return getType.call(obj) === '[object Boolean]';
};

const isFunction = (obj) => {
    return getType.call(obj) === '[object Function]';
};

const isObject = (obj) => {
    return getType.call(obj) === '[object Object]';
};

const isArray = (obj) => {
    return getType.call(obj) === '[object Array]';
};

const isNull = (obj) => {
    return getType.call(obj) === '[object Null]';
};

const isUndefined = (obj) => {
    return getType.call(obj) === '[object Undefined]';
};

const isEmptyObject = (o) => {
    if (isString(o)) {
        return o.trim().length === 0;
    }
    for (var name in o) {
        return false;
    }
    return true;
};

/**
 * toast提示封装
 */
const toast = (() => {
    let info = msg => {
        wx.showToast({
            title: msg,
            icon: "none"
        });
    };
    let error = msg => {
        wx.showToast({
            title: msg,
            image: "/assets/images/error.png"
        });
    };
    let success = msg => {
        wx.showToast({
            title: msg,
            icon: "success"
        });
    };
    return {
        info: info,
        success: success,
        error: error
    };
})();

/**
 * 用户信息服务
 */
const userService = (() => {
    let _setToken = (token) => {
        wx.setStorageSync("token_info", token)
    };
    let _setUserInfo = (user) => {
        wx.setStorageSync("user_info", user)
    };
    let _setDeptInfo = (dept) => {
        wx.setStorageSync("dept_info", dept)
    };
    let _setSessionKey = (key) => {
        wx.setStorageSync("session_key", key)
    };
    let _getToken = () => {
        return wx.getStorageSync("token_info").token || ''
    };
    let _getPost = () => {
        return wx.getStorageSync("user_info").post || []
    };
    let _getSessionKey = () => {
        return wx.getStorageSync("session_key")
    };
    let _getUserInfo = () => {
        return wx.getStorageSync("user_info")
    };
    let _getDeptInfo = (type = '') => {
        if (!type) {
            return wx.getStorageSync("dept_info")
        }
        const list = wx.getStorageSync("dept_info")
            .filter(item => item.type === type)
        return list;
    };
    let _getUserId = () => {
        return wx.getStorageSync("user_info").orgUserId
    };
    let _isLogin = () => {
        return _getToken() ? true : false
    };
    let _isSubscribe = () => {
        return wx.getStorageSync("user_info").isSubscribe;
    };

    return {
        setToken: _setToken,
        setUserInfo: _setUserInfo,
        setDeptInfo: _setDeptInfo,
        setSessionKey: _setSessionKey,
        getToken: _getToken,
        getPost: _getPost,
        getSessionKey: _getSessionKey,
        getUserInfo: _getUserInfo,
        getDeptInfo: _getDeptInfo,
        getUserId: _getUserId,
        isLogin: _isLogin,
        isSubscribe: _isSubscribe
    }
})();

/**
 * 本地存储服务
 */
const storageService = (() => {
    let _set = (key, data) => {
        wx.setStorageSync(key, data)
    };
    let _get = (key) => {
        return wx.getStorageSync(key) || null;
    };
    let _remove = (key) => {
        wx.removeStorageSync(key)
    };
    let _clear = () => {
        wx.clearStorageSync()
    };
    return {
        set: _set,
        get: _get,
        remove: _remove,
        clear: _clear
    }

})();

const setStorage = (key, value) => {
    wx.setStorage({
        key: key,
        data: value
    });
};

const isSuccess = code => {
    return code === "0";
};

const includeItem = (arr, item, flag) => {
    for (let i = 0; i < arr.length; i++) {
        if (item === arr[i][flag]) {
            return false;
        }
    }
    return true;
};

const wipeRepetByFlag = (list, flag) => {
    let result = [];
    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[i][flag] === list[j][flag]) {
                j = ++i;
            }
        }
        result.push(list[i]);
    }
    return result;
};

const _removeByValue = (list, item) => {
    let index = list.indexOf(item);
    list.splice(index, 1);
    return list
};

const _formatTime = (date, flag) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    if (flag == 'm') {
        return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
    } else if (flag == 'day') {
        return [year, month, day].map(formatNumber).join('-')
    }
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
};

const _replaceQrCode = (n) => {
    // if (n.substring(0, 15) !== 'http://ane.kim/') {
    //     return '';
    // }
    return n.replace(/http:\/\/ane.kim\//g, '')
};

const _dateFormat = (o, v = false) => {
    if (!o) return '';
    var date = new Date(o);
    var d = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    var ct = ' 00:00:00';
    if (v) {
        ct = ' 23:59:59';
    }
    return new Date(d.split('-').join('/') + ct).getTime() / 1000;
};

const _unshiftByKey = (arr, key, flag) => {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][flag] === key) {
            //item = arr[i][flag];
            arr.splice(i, 1);
            arr.unshift(arr[i]);
            break;
        }
    }
}

const _trim = (str) => {
    return str.replace(/^\s+|\s+$/g, "")
}

const Utils = {
    isString: isString,
    isNumber: isNumber,
    isBoolean: isBoolean,
    isFunction: isFunction,
    isObject: isObject,
    isArray: isArray,
    isNull: isNull,
    isUndefined: isUndefined,
    isEmptyObject: isEmptyObject,
    toast: toast,
    userService: userService,
    setStorage: setStorage,
    isSuccess: isSuccess,
    includeItem: includeItem,
    wipeRepetByFlag: wipeRepetByFlag,
    storageService: storageService,
    removeByValue: _removeByValue,
    formatTime: _formatTime,
    dateFormat: _dateFormat,
    replaceQrCode: _replaceQrCode,
    unshiftByKey: _unshiftByKey,
    trim: _trim
};

export default Utils;