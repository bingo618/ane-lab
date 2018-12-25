export default class Cloud {

    static instance = null;

    constructor(code) {
        this.db = this._initDb(code)
    }

    /**
     * 初始化云数据库
     * @param code
     * @returns {*}
     * @private
     */
    _initDb(code) {
        return wx.cloud.database().collection(code)
    }

    /**
     * 根据参数查询
     * @param param
     * @returns {*}
     */
    getItem(param = {}) {
        return this.db.where({
            ...param,
            _openid: 'user-open-id'
        }).get()
    }

    /**
     * 添加
     * @param param
     * @returns {*}
     */
    addItem(param = {}) {
        return this.db.add({
            data: param
        })
    }

    /**
     * 更新
     * @param id
     * @param param
     * @returns {*}
     */
    updateItem(id, param = {}) {
        return this.db.doc(id).set({
            data: param
        })
    }

    /**
     * 创建实例
     * @param code
     * @returns {*}
     */
    static getInstance(code) {
        if (this.instance === null) {
            this.instance = new Cloud(code)
        }
        return this.instance
    }
}