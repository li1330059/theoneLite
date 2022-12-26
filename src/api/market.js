import https from '../utils/request.js';


let getCategoryList = (params) => {
    return https.post('/lite-market/api/commodityCategory/list', params)
}
let getGoodList = (params) => {
    return https.post('/lite-market/api/saleRecord/list', params)
}
let userAttributeGetPwdPayCount = (params) => {
    return https.post('/lite-market/api/userAttribute/getPwdPayCount', params)
}

let saleRecordCheckSalePrice = (params) => {
    return https.post('/lite-goods/api/saleRecord/checkSalePrice', params)
}
let commoditySearch = (params) => {
    return https.post('/lite-market/api/commodity/search', params)
}
let keyGet = (params) => {
    return https.get("/lite-market/api/key/get", params)
}
//低价寄售验证码
let saleRecordSendCode = (params) => {
    return https.post("/lite-goods/api/saleRecord/sendCode", params)
}

let bannerList = (params) => {
    return https.post("/lite-market/api/banner/list", params)
}

export default {
    getCategoryList, getGoodList, userAttributeGetPwdPayCount, saleRecordCheckSalePrice, commoditySearch,keyGet,saleRecordSendCode,bannerList
}