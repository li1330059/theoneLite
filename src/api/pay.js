import https from '../utils/request.js';

//下单
export const orderBuyAdd = (params) => {
    return https.post('/order/api/orderBuy/add', params)
}

export const getGoods = (params) => {
    return https.post('/lite-market/api/saleRecord/list', params)
}
//支付
export const pay = (params) => {
    return https.post('/pay/api/pay', params)
}
//卖家支持的支付渠道
export const thirdAccountSellerChannel = (params) => {
    return https.post('/user/api/thirdAccount/sellerChannel', params)
}