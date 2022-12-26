import https from '../utils/request.js';

// 上传图片
export let uploadCert = (params) => {
  return https.post('/base/api/upload/uploadCert', params)
}

// 上传图片
export let dynamicNews = (params) => {
  return https.get('/lite-market/api/dynamicNews/list', params)
}