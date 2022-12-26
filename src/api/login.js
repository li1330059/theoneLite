import https from '../utils/request.js';


let getAuthCode = (params) => {
    return https.post('/auth/api/auth/getAuthCode', params)
}
let authCodeLogin = (params) => {
    return https.post('/auth/api/auth/authCodeLogin', params)
}
export default {
    getAuthCode,
	authCodeLogin
}