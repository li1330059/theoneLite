<template>
  <div class="shop-page-goodsbuy">
    <div v-loading="loading">
      <div class="order-wrap">
        <div class="order-title">订单信息</div>
        <section class="goods-info">
          <div class="goods-frame">
            <div class="goods-view">
              <goods-nopadd
                size=".13rem"
                :img="goodsDetail.commodity.cover"
                :lg="goodsDetail.commodity.actualPicture"
              ></goods-nopadd>
            </div>
          </div>
          <div class="goods-info-wrap">
            <div class="line-bar space-between phone-no-flex">
              <div class="key">
                <div class="line-bar">
                  <div class="flex-wrap">
                    <div class="key phone-hide">商品名称:</div>
                    <div class="val num-wrap">
                      {{ goodsDetail.commodity.name }}
                      <div class="num">
                        <commodity-num :treasure="goodsDetail" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="val">
                <span class="price">{{
                  $common.formatMoney(orderInfo.price)
                }}</span>
              </div>
            </div>
            <order-attr :goods="goodsDetail"></order-attr>
          </div>
        </section>
        <section class="goods-buy-info">
          <div class="line-bar paytype-cont" v-if="payWayInfo&&payWayInfo.name">
            <div class="key">支付方式</div>
            <div class="paytype-btn">
              <div class="paytype">{{ payWayInfo.name }}</div>
            </div>
          </div>
          <div class="line-bar">
            <div class="key"><span>1</span>件商品 总商品金额：</div>
            <div class="val">
              <span class="price">{{
                $common.formatMoney(orderInfo.price)
              }}</span>
            </div>
          </div>
        </section>
        <section class="btn-group">
          <div class="btn btn-lg btn-border" @click="goback">返回详情</div>
          <div
            class="btn btn-primary btn-lg"
            :class="{
              'btn-disabled':
                subBtnDisabled ||
                isSelfSold ||
                goodsDetail.amountAvailable <= 0,
            }"
            @click="submit"
          >
            立即支付
          </div>
        </section>
        <div class="ui-message" v-if="goodsDetail.amountAvailable <= 0">
          <p>当前有人下单，请稍后在试</p>
        </div>
      </div>
      <dialog-idcard ref="IdcardRef" @bindSucess="verifiedSucess" />
      <dialog-bindcard
        ref="bankSubmit"
        :userInfo="userInfo"
        @bindSucess="listenBankSubmit"
      ></dialog-bindcard>
    </div>
  </div>
</template>

<script>
import utils from "../utils/utils.js";
import goodsNopadd from "../components/model/goods/goodsNopadd.vue";
export default {
  components: {goodsNopadd},
  data() {
    return {
      subBtnDisabled: false,
      checkClassName: "",
      checkClassSecondName: "",
      isMobile: utils._isMobile(),
      payWayArr: [],
      payWayIdx: 0,
      isShowVerified: false,
      loading: true,
      orderInfo: {
        price: 0, //总价
        num: 1, //几件
      },
      goodsDetail: {
        commodity: {},
        author: {},
      },
    };
  },
  computed: {
    payWayInfo() {
      return this.payWayArr[this.payWayIdx] || {};
    },
    userInfo() {
      return this.$store.state.userStore.userInfo;
    },
    isSelfSold() {
      if (
        this.goodsDetail.publisher &&
        this.goodsDetail.publisher.id ==
          this.$store.state.userStore.userInfo.userUuid
      ) {
        return true;
      }
      return false;
    },
  },
  created() {
    this.saleRecordId = this.$route.query.saleRecordId; //从商品详情来
    this.orderId = this.$route.query.orderId; //从支付订单来
    this.checkClassName = this.$route.query.checkClassName;
    this.checkClassSecondName = this.$route.query.checkClassSecondName;
    this.loading = true;
    this.init();
  },
  methods: {
    init() {
      this.getGoods();

      if (this.saleRecordId) {
        this.getGoodsDetail();
      } else if (this.orderId) {
        this.getOrderBuyDetail();
      } else {
        this.$message.warning("缺少参数");
      }
    },

    listenBankSubmit() {},
    goback() {
      this.$router.back();
    },
    async submit() {
      if (
        this.subBtnDisabled ||
        this.isSelfSold ||
        this.goodsDetail.amountAvailable <= 0
      ) {
        return;
      }

      /* 
      if (this.userInfo.statusVerified !== 1) {
        this.$refs.IdcardRef.init();
        //判断是否实名认证
        return;
      } */
      if (this.subBtnDisabled) {
        return;
      }
      this.subBtnDisabled = true;
      if (this.orderNo) {
        this.payHandle();
      } else {
        this.createOrder();
      }
    },
    async getGoods() {
      //测试数据
      const res = await this.$api.getGoods({
        pageCount: 1,
        pageSize: 10,
      });
      console.log(res);
    },
    async getGoodsDetail() {
      //获取商品信息
      const res = await this.$api.saleRecordDetail({
        id: this.saleRecordId,
      });

      this.loading = false;
      if (res.data.code == 200) {
        this.goodsDetail = res.data.data;
        this.orderInfo.price = this.goodsDetail.price;
        this.getPayWay();
      } else {
        this.$message.error(res.data.message);
      }
    },
    async getOrderBuyDetail() {
      //获取订单信息
      const res = await this.$api.orderBuyDetail({
        id: this.orderId,
      });
      this.loading = false;
      if (res.data.code == 200) {
        this.saleRecordId = res.data.data.saleRecordId;
        this.goodsDetail = res.data.data;
        this.orderNo = this.goodsDetail.orderBuyNo;
        this.orderInfo.price = this.goodsDetail.pricePay;
        this.getPayWay();
      } else {
        this.$message.error(res.data.message);
      }
    },
    async getPayWay() {
      //获取支付方式
      const res = await this.$api.thirdAccountSellerChannel({
        needWallet: false,
        saleRecordId: this.saleRecordId,
      });
      if (res.data.code == 200) {
        this.payWayArr = res.data.data;
      } else {
        this.$message.error(res.data.message);
      }
    },
    async createOrder() {
      //下单
      const res = await this.$api.orderBuyAdd([
        {
          saleRecordAmount: 1,
          saleRecordId: this.saleRecordId,
        },
      ]);
      if (res.data.code == 200) {
        this.orderNo = res.data.data;
        this.payHandle();
      } else {
        this.subBtnDisabled = false;
        this.$message.error(res.data.message);
      }
    },
    async payHandle() {
      //唤起支付
      const res = await this.$api.pay({
        clientType: 1, //APP:2,PC:1
        orderNo: this.orderNo,
        payChannel: this.payWayInfo.payChannel,
      });
      this.subBtnDisabled = false;
      if (res.data.code == 200) {
        this.init();
        if (this.$common._isMobile()) {
          window.location.href = res.data.data.detail;
        } else {
          window.open(res.data.data.detail);
        }
      } else {
        this.$message.error(res.data.message);
      }
    },
    calcOrder() {},
    verifiedSucess(info) {
      this.isShowVerified = false;
      this.$store.dispatch("getUserInfo");
    },
  },
};
</script>

<style lang='scss' scoped>
.shop-page-goodsbuy {
	padding-top: 1.5rem;
  .ui-message {
    text-align: right;
    color: $color-btn;
  }
  .order-wrap {
	background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
	box-shadow: 0px 2px 42px 0px rgba(67,39,39,0.0600);
	border: 3px solid #FFFFFF;
    border-radius: $radius;
    max-width: 12rem;
    margin: 0 auto;
    padding: .24rem .24rem .24rem .32rem;
	font-size: .14rem;
    .order-title {
      font-weight: 400;
      color: $fc-main;
      margin-bottom: 0.35rem;
	  line-height: 19px;
    }
    .goods-info {
      display: flex;
      margin-bottom: 0.16rem;
      padding-bottom: 0.16rem;
      border-bottom: 1px solid rgba(153, 153, 153, .1);
      .goods-frame {
        width: 1.87rem;
        height: 1.87rem;
        position: relative;
        top: 0;
        left: 0;
        .top,
        .bottom {
          height: 0.13rem;
        }
        .right,
        .left {
          width: 0.13rem;
        }
        .goods-view {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      .goods-info-wrap {
        flex: 1;
        padding-left: 0.33rem;
		line-height: .19rem;
        .price {
          font-size: .14rem;
          font-weight: bold;
          color: $color-btn;
        }
      }
    }
  }
  .line-bar {
    display: flex;
    align-items: center;
    padding: 0.08rem 0;
    .key {
      font-size: 0.14rem;
      font-weight: 400;
      color: $fc-label;
      min-width: 0.73rem;
    }
    .val {
      font-size: 0.14rem;
      font-weight: 400;
      color: $fc-title;
    }
    .num-wrap {
      display: flex;
      .num {
        padding-left: 0.12rem;
      }
    }
  }
  .line {
    border-bottom: 0.01rem solid $color-border;
    margin-bottom: 0.08rem;
  }
  .flex-wrap {
    display: flex;
    align-items: center;
  }
  .goods-buy-info {
	  line-height: .16rem;
    .line-bar {
      justify-content: flex-end;
	  .key{
		  span{
			  color: $color-btn;
		  }
	  }
      .val {
        min-width: 2rem;
        text-align: right;
        font-size: 0.14rem;
        font-weight: 400;
        color: $color-btn;
		font-weight: bold;
		line-height: .19rem;
      }
	  .paytype{
		  font-weight: 400;
	  }
    }
	.paytype-cont{
		justify-content: flex-start;
		margin-bottom: .24rem;
		.paytype-btn{
			width: 1.4rem;
			height: .36rem;
			line-height: .36rem;
			text-align: center;
			background: #FFFFFF;
			border-radius: $radius;
			border: 1px solid $color-theme;
			color: $color-theme;
			font-size: .12rem;
		}
	}
  }
  .price {
  }
  .space-between {
    justify-content: space-between;
    padding: 0;
  }
  .btn-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.16rem;
	.btn-border{
		color: $fc-sub;
	}
    .btn {
      min-width: 1.7rem;
    }
  }
  @media screen and (max-width: 540px) {
	  padding-top: .44rem;
    .phone-hide {
      display: none;
    }
    .order-wrap {
      box-shadow: none;
      border-radius: 0;
      max-width: inherit;
	  padding: .16rem;
      .order-title {
        display: none;
      }
      .goods-info {
        display: block;
		margin-bottom: 0.16rem;
		padding-bottom: 0;
		border-bottom: 0;
        .goods-frame {
          width: 100%;
          height: 46vh;
		  background: #FFFFFF;
		  box-shadow: 0px 2px 13px 0px rgba(0,0,0,0.1100), inset 0px 0px 20px 0px rgba(0,0,0,0.0900);
		  border: 6px solid #FFFFFF;
          .top,
          .bottom {
            height: 0.26rem;
          }
          .right,
          .left {
            width: 0.26rem;
          }
        }
        .goods-info-wrap {
          flex: 1;
          padding: 0 .16rem .08rem;
		background: #FFFFFF;
		box-shadow: 0px 2px 16px 0px rgba(182,182,182,0.16);
		border-radius: $radius;
		margin-top: .16rem;
			.key{
				.val{
					color: $fc-title;
					font-size: .16rem;
					font-weight: 500;
					line-height: .23rem;
				}
				.num{
					display: none;
				}
			}
        }
      }
    }
    .line-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.08rem 0;
      .key {
        font-size: 0.14rem;
        font-weight: 400;
        min-width: auto;
      }
      .val {
        font-size: 0.14rem;
        font-weight: 400;
        color: $fc-title;
      }
      .num-wrap {
        display: block;
        .num {
          margin-top: 0.12rem;
          padding-left: 0;
        }
      }
    }
    .phone-no-flex {
      display: block;
    }
    .line {
      border-bottom: 0.01rem solid $color-border;
      margin-bottom: 0.08rem;
    }
    .flex-wrap {
      display: flex;
      align-items: center;
    }
    .goods-buy-info {
		background: #FFFFFF;
		box-shadow: 0px 2px 16px 0px rgba(182,182,182,0.16);
		border-radius: $radius;
		padding: .16rem .16rem .2rem;
      .line-bar {
        justify-content: space-between;
        .val {
          min-width: auto;
          text-align: right;
          font-size: 0.14rem;
          font-weight: 400;
          color: $color-btn;
        }
      }
	  .paytype-cont{
	  	display: block;
	  	.paytype-btn{
			margin-top: .16rem;
	  		width: 1.4rem;
	  		height: .4rem;
	  		line-height: .4rem;
	  		text-align: center;
	  		border-radius: $radius;
	  		background: rgba(230,31,26,0.0600);
	  		border: none;
	  		color: $color-theme;
	  		font-size: .14rem;
	  	}
	  }
    }
    .price {
      margin: 0.05rem 0;
      display: inline-block;
	  font-size: 0.2rem;
	  font-weight: 400;
	  color: $color-btn;
    }
    .space-between {
      justify-content: space-between;
    }
    .btn-group {
      margin-top: 0.24rem;
      justify-content: space-between;
      .btn {
        width: 48%;
      }
      .btn-border {
        border: 0.01rem solid $bc-inp;
        color: $fc-label;
        background-color: #fff;
      }
    }
  }
}
</style>
