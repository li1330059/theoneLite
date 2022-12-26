<template>
  <div class="shop-empty">
    <div :class="`icon icon${page}`"></div>
    <p>{{ pageData[page].msg }}</p>
<!--    <router-link :to="pageData[page].path" v-if="pageData[page].path">
      <div class="btn btn-line">{{ pageData[page].btn }}</div>
    </router-link> -->
    <div v-if="click" @click="click" class="btn btn-line">
      {{ pageData[page].btn }}
    </div>
  </div>
</template>

<script>
export default {
  name: "empty",
  props: {
    page: {
      type: String,
      //   default: "collection",
    },
    click: {
      type: Function,
    },
  },
  data() {
    return {
      pageData: {
        collection: {
          msg: "暂无藏品",
          path: "/market",
          btn: "前往市场",
        },
        market: {
          msg: "暂无内容",
        },
        buy: {
          msg: "暂无内容",
        },
        publish: {
          msg: "暂无内容",
        },
        sell: {
          msg: "暂无内容",
        },
        payment: {
          msg: "暂无内容",
        },
        bindcard: {
          msg: "暂无绑定银行卡",
          btn: "绑定银行卡",
        },
        activity: {
          msg: "暂无内容",
        },
        notice: {
          msg: "暂无内容",
        }
      },
    };
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.shop-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 1.36rem;
  .icon {
    background: url(~@/assets/images/mine/bg-innovation-empty.png) no-repeat
      center center;
    background-size: 100% 100%;
    margin: 0 auto 0.24rem;
  }
  .iconcollection {
    background-image: url(~@/assets/images/mine/bg-innovation-empty.png);
    width: 2.79rem;
    height: 1.39rem;
  }
  .iconbuy {
    background-image: url(~@/assets/images/mine/order-empty.png);
    width: 2.62rem;
    height: 1.53rem;
  }
  .iconpublish {
    background-image: url(~@/assets/images/mine/order-empty.png);
    width: 2.62rem;
    height: 1.53rem;
  }
  .iconsell {
    background-image: url(~@/assets/images/mine/order-empty.png);
    width: 2.62rem;
    height: 1.53rem;
  }
  .iconpayment {
    background-image: url(~@/assets/images/mine/order-empty.png);
    width: 2.62rem;
    height: 1.53rem;
  }
  .iconbindcard {
    background-image: url(~@/assets/images/mine/order-empty.png);
	width: 2.62rem;
	height: 1.53rem;
  }
  @media screen and (max-width: 540px) {
  	  padding-top: .88rem;
	  .icon {
	    margin: 0 auto 0.08rem;
	  }
	  .iconbuy {
	    background-image: url(~@/assets/images/mine/order-empty.png);
	    width: 2.05rem;
	    height: 1.2rem;
	  }
	  .iconpublish {
	    background-image: url(~@/assets/images/mine/order-empty.png);
	    width: 2.05rem;
	    height: 1.2rem;
	  }
	  .iconsell {
	    background-image: url(~@/assets/images/mine/order-empty.png);
	    width: 2.05rem;
	    height: 1.2rem;
	  }
	  .iconpayment {
	    background-image: url(~@/assets/images/mine/order-empty.png);
	    width: 2.05rem;
	    height: 1.2rem;
	  }
  }
  p {
    color: $fc-label;
    font-size: 0.14rem;
    text-align: center;
    margin-top: .08rem;
	line-height: .2rem;
  }
  .btn {
    width: 3.79rem;
  }
}
</style>
