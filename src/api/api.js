
/* eslint-disable */
import login from './login'
import market from './market'
import * as pay from './pay'
import * as user from './user'
import * as order from './order'
import * as my from './my'
import * as actvity from './actvity'
import * as news from './news'
export default {
    ...login,
    ...market,
    ...pay,
    ...user,
    ...order,
    ...my,
    ...actvity,
    ...news
}
