import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: () => import("@/views/home"),
    meta: {
      hideService: true,
    },
  },
  {
    path: "/login",
    component: () => import("@/views/login"),
    meta: {
      hideService: true,
    },
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    meta: {
      hideService: true,
    },
  },
  {
    path: "/home",
    component: () => import("@/views/home"),
    meta: {
      hideService: true,
    },
  },
  {
    path: "/activity",
    component: () => import("@/views/activity"),
    meta: {
      hideService: true,
    },
  },
  {
    path: "/activity/:id",
    component: () => import("@/views/activity-detail"),
    meta: {
      hideService: true,
    },
  },
  {
    path: "/notice",
    component: () => import("@/views/notice"),
    meta: {
      hideService: true,
    },
  },
	{
	  path: "/shop_join",
	  component: () => import("@/views/shop-join"),
	  meta: {
	    hideService: true,
	  },
	},
  {
    path: "/notice/:id",
    component: () => import("@/views/notice-detail"),
    meta: {
      hideService: true,
    },
  },
  {
    path: "/market",
    component: () => import("@/views/market"),
    meta: {
      hideService: true,
    },
  },
  {
    path: "/goods_detail/:saleRecordId",
    component: () => import("@/views/goods-detail"),
    meta: {
      hideService: true,
    },
  },
  {
    path: "/goods_buy",
    component: () => import("@/views/goods-buy"),
    meta: {
      hideService: true,
    },
  },
  {
    path: "/order/success",
    component: () => import("@/views/order/success"),
    meta: {
      hideService: true,
    },
  },
  {
    path: "/order/fail",
    component: () => import("@/views/order/fail"),
    meta: {
      hideService: true,
    },
  },
  {
    path: "/mine/mIndex",
    name: 'collection',
    component: () => import("@/views/mine/mIndex"),
    meta: {
     requiresAuth: true
    }
  },
  {
    path: "/mine",
    component: () => import("@/views/mine/index"),
    name: 'mine', // 路径名
    redirect: '/mine/buy',
    children: [
      {
        path: "collection",
        name: 'collection',
        component: () => import("@/views/mine/collection"),
      },
      {
        path: "collection_sku/:id",
        name: 'collection_sku',
        component: () => import("@/views/mine/collectionSku"),
      },
      {
        path: "accountmanagement",
        name: 'accountmanagement',
        component: () => import("@/views/mine/accountManagement"),
      },
      {
        path: "buy",
        name: 'buy',
        component: () => import("@/views/mine/buyList"),
      },
      {
        path: "orderDetail",
        name: 'orderDetail',
        component: () => import("@/views/mine/orderDetail"),
      },
      {
        path: "payment",
        name: 'payment',
        component: () => import("@/views/mine/paymentList"),
      },
      {
        path: "publish",
        name: 'publish',
        component: () => import("@/views/mine/publishList"),
      }, {
        path: "sell",
        name: 'sell',
        component: () => import("@/views/mine/sellList"),
      },
      {
        path: "bindcard",
        name: 'bindcard',
        component: () => import("@/views/mine/bindCard"),
      },
      {
        path: "uploadcard",
        name: 'uploadcard',
        component: () => import("@/views/mine/uploadCard"),
      },
      {
        path: "idcard",
        name: 'idcard',
        component: () => import("@/views/mine/idCard"),
      },
      {
        path: "changecard",
        name: 'changecard',
        component: () => import("@/views/mine/accountChangeCard"),
      },
      {
        path: "viewcard",
        name: 'viewcard',
        component: () => import("@/views/mine/viewCard"),
      },
			{
        path: "userset",
        name: 'userset',
        component: () => import("@/views/mine/userSet"),
      },
    ]
  },
  {
    path: "/agreement/:id",
    name: 'agreement',
    component: () => import("@/views/agreement"),
  },
  {
    path: "*",
    redirect: "/404",
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
	if (savedPosition) {
		return savedPosition
	} else {
		return { x: 0, y: 0 }
	}
  }
})

router.beforeEach(async (to, from, next) => {
  if (JSON.stringify(store.state.userStore.userInfo) == "{}") {
    let user = localStorage.getItem('THEONE_USER');
    if (user) {
      user = JSON.parse(user);
      store.commit("setUserInfo", user);
    } else {
      if (localStorage.getItem('authorization')) {
        await store.dispatch("getUserInfo");
      } else {
        if (to.matched.some(record => record.meta.requiresAuth)) {
          //检查页面是否需要登录
          next('/login')
        }
      }

    }
  }



  next();
});

export default router
