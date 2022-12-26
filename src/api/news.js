import https from '../utils/request.js';


// 分类列表
export let categoryList = (params) => {
  return https.post('/lite-market/api/category/findList', params)
}


// 新闻列表
export let newsList = (params) => {
  return https.post('/lite-market/api/dynamicNews/findNewsList', params)
}

// 置顶列表
export let topList = (params) => {
  return https.post('/lite-market/api/dynamicNews/topList', params)
}

// 新闻详情
export let newsDetail = (params) => {
  return https.post('/lite-market/api/dynamicNews/findNews', params)
}
