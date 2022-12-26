import Vue from 'vue'
import App from './App.vue'
import VueClipboard from "vue-clipboard2";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from "./router"
import utils from './utils/utils';
import store from "./store";
import dayjs from "dayjs";
import './utils/vant';
import authInfomation from "./utils/auth-infomation";
import './components/global' // 全局组件注册
import api from './api/api'
import "./assets/style/index.scss"
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import directive from './utils/directive';
directive(Vue)
Vue.use(preview)
Vue.prototype.$api = api
Vue.prototype.$common = utils
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false

import { Lazyload, Tabbar, TabbarItem, Tab, Tabs, Swipe, SwipeItem  } from "vant"
import 'vant/lib/index.css';

Vue.use(Lazyload)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(ElementUI)
Vue.use(VueClipboard);

Vue.prototype.$authInfomation = authInfomation;


Vue.prototype.$webConfig = {
  flag: {
    mineSellXY: false
  },
  marketType:1,//1:一级市场 2:二级市场
  menu: [
    {
      name: '首页',
      path: "/home",
      target: 2 // 内部打开
    },
    {
      name: '市场',
      path: '/market',
      target: 2 // 内部打开
    },
    {
      name: '活动日历',
      path: '/activity',
      target: 2 // 内部打
      
    },
    {
      name: '新闻公告',
      path: '/notice',
      target: 2 // 内部打开
    }
  ],
  searchText: "请输入内容",
  treasureBackText: "推回首发",
  tabbarList: [
    {
      name: "首页",
      url: "/home",
      active: "",
      inactive: ""
    },
    {
      name: "市场",
      url: "/market",
      active: "",
      inactive: ""
    },
    {
      name: "我的",
      url: "/mine/mindex",
      active: "",
      inactive: ""
    },
  ],
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
