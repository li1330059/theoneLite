import https from '../utils/request.js';

//订单购买取消
export const orderBuyCancel = (params) => {
    return https.post('/order/api/orderBuy/cancel', params)
}
export const saleRecordDetail = (params) => {
    return https.post('/lite-market/api/saleRecord/detail', params)
}
// 订单详情
export const orderBuyDetail = (params) => {
    return https.post('/order/api/orderBuy/detail', params)
}
// 藏品出售
export const saleRecordAdd = (params) => {
    return https.post('/lite-goods/api/saleRecord/add', params)
}

// 藏品sku
export const treasureSkuList = (params) => {
    return https.post('/lite-goods/api/treasureSku/list', params)
}
