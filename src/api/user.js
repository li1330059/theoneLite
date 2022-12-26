import https from '../utils/request.js';

//获取用户信息
export const userAttributeUserInfo = () => {
    return https.post('/lite-market/api/userAttribute/userInfo', {})
}

//设置初始支付密码
export const operationInitialPayPw = (data) => {
    return https.post('/user/api/operation/initialPayPw', data)
}
//验证
export const operationVerifiedPayPw = (data) => {
    return https.post('/user/api/operation/verifiedPayPw', data)
}
//更改支付密码
export const operationChangePayPw = (data) => {
    return https.post('/user/api/operation/changePayPw', data)
}
