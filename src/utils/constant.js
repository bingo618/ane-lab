export const VERSIONS = "V1.2.3"
export const environment = 'PROD' //PROD(正式环境) DEV(测试环境)


/**
 * 试剂来源
 */
export const CHEM_SOURCE = [{
    name: "采购人",
    id: 2
}, {
    name: "课题组",
    id: 1
}, {
    name: "调配试剂",
    id: 0
}]

/**
 * 申领状态
 */
export const APPLY_STATE = [{
    id: '',
    name: '全部'
}, {
    id: 1,
    name: '审批中'
}, {
    id: 2,
    name: '待领用'
}, {
    id: 3,
    name: '已领用'
}, {
    id: 4,
    name: '已拒绝'
}, {
    id: 5,
    name: '已关闭'
}]

/**
 * 默认头像
 */
export const DEF_FACE_URL = 'https://static.ananlab.com/wx/218842535ea743f5b73caf039933bc73.png';