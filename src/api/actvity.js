import https from '../utils/request.js';

// 活动日历列表
export let activityList = (params) => {
  return https.post('activity/api/activityCalendar/page', params)
}

// 活动详情
export let activityDetail = (params) => {
  return https.post('/activity/api/activityCalendar/detail', params)
}

// 活动签名
export let activity_getResultV2 = (params) => {
  return https.post('activity/api/activity/getResultV2', params)
}

// 校验是否为活动有效期
export let activity_valid = (params) => {
  return https.post('/activity/api/activity/valid', params)
}

// 报名
export let activity_signUp = (params) => {
  return https.post('/activity/api/activity/signUp', params)
}

// 活动结果
export let activity_getResult = (params) => {
  return https.post('/activity/api/activity/getResult', params)
}
