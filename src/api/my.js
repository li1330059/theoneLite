import https from '../utils/request.js';

// 我买到的
export let orderList = (params) => {
  return https.post('/order/api/orderBuy/list', params)
}

// 订单详情
export let orderDetail = (params) => {
  return https.post('/order/api/orderBuy/detail', params)
}
// 我卖出的
export let saleList = (params) => {
  return https.post('/order/api/orderBuy/listSale', params)
}

//  银行卡列表
export let bankList = (params) => {
  return https.post('/user/api/userBank/findBankAccount', params)
}

//藏品列表
export let treasureList = (params) => {
  return https.post('/lite-goods/api/treasure/list', params)
}


// 我发布的
export let publistList = (params) => {
  return https.post('lite-goods/api/saleRecord/mine/list', params)
}


// 我发布的
export let canclePublist = (params) => {
  return https.post('/lite-goods/api/saleRecord/cancel', params)
}

// 绑定银行卡 未实名认证
export let bankVerified = (params) => {
  return https.post('/user/api/userBankVerified/verified', params)
}

// 绑定银行卡 未实名认证
export let bankVerified2 = (params) => {
  return https.post('/user/api/userBankVerified/verified2', params)
}



// 银行列表
export let bankListShortName = (params) => {
  return https.post('/base/pi/bankInfo/listShortName', params)
}

// 银行支行列表
export let bankListName = (params) => {
  return https.post('/base/pi/bankInfo/list', params)
}


// 解除绑定卡片
export let bankUnbound = (params) => {
  return https.post('/user/api/userBank/unbound', params)
}

// 账单
export let walletLogList = (params) => {
  return https.post('/lite-market/api/walletLog/list', params)
}

// 钱包
export let getUserWallet = (params) => {
  return https.post('/lite-market/api/wallet/query', params)
}

// 开户
export let openAccount = (params) => {
  return https.post('/user/api/payChannel/openAccount', params)
}

// 支付渠道状态
export let accountInfo = (params) => {
  return https.post('/user/api/payChannel/accountInfo', params)
}

// 查询地址
export let queryYbAddress = (params) => {
  return https.post('/user/api/payChannel/queryYbAddress', params)
}

// 查询地址
export let verifiedIdcard = (params) => {
  return https.post('/user/api/userAttribute/verifiedIdcard', params)
}

// 查询当前用户信息
export let userInfo = (params) => {
  return https.post('/lite-market/api/userAttribute/userInfo', params)
}
// 查询当前用户信息lite
export let userInfoLite = (params) => {
  return https.post('/lite-market/api/userAttribute/userInfo', params)
}
// 保存个人设置
export let userChange = (params) => {
  return https.post('/user/api/userAttribute/change', params)
}
// 更新支行银行名称
export let updateBnakInfo = (params) => {
  return https.post('/user/api/userBank/updateBnakInfo', params)
}



// 更新账户绑定的卡
export let changeYbSettleBankCard = (params) => {
  return https.post('/user/api/payChannel/changeYbSettleBankCard', params)
}

// 获取用户身份证
export let getCardImage = (params) => {
  return https.post('/user/api/userAttribute/getCardImage', params)
}

// api推送藏品
export const pushTreasure = (params) => {
  return https.post('/open/api/treasure/pushTreasure', params)
}

export default {
  orderList,
  orderDetail,
  saleList,
  bankListShortName,
  bankList,
  treasureList,
  pushTreasure
}