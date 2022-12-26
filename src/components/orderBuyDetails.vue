<template>
  <div class="shopping-collection-modal" v-if="ifCollectionWindow" @click.self="ifCollectionWindow = false">
    <div class="collection-window">
		<div class="no">订单信息：<copy class="m-copy-blue" :txt="detail.orderBuyNo"/></div>
		<div class="flex-cont">
			<div class="goods-fram">
			        <div
			          class="img-view bg-img"
			          :style="`background-image:url(${detail.commodity&&detail.commodity.cover})`"
			        ></div>
			      </div>

			      <div class="collection_form">
			        <div class="tit-line title">
			          {{ detail.commodity&&detail.commodity.name }}
			        </div>
			<!--        <div class="price label-flex">
			          <div class="label">购买价格：</div>
			          <div class="num">
			            {{ formatMoney(detail.priceBuy) }}
			          </div>
			        </div> -->
			        <div class="label-flex">
			          <div class="label">价格</div>
			          <div class="num price">{{ formatMoney(detail.pricePay) }}</div>
			        </div>
					<div class="label-flex">
					  <div class="label">艺术家</div>
					  <div class="num">{{detail.author&&detail.author.nickname}}</div>
					</div>
					<div class="label-flex">
					  <div class="label">寄售方</div>
					  <div class="num">{{detail.saleUser&&detail.saleUser.nickname}}</div>
					</div>
					<div class="label-flex line"></div>
					<div class="label-flex">
					  <div class="label">{{ detail.amount }}件商品，总商品金额：</div>
					  <div class="num price">{{ detail.pricePay }}</div>
					</div>
					<div class="label-flex">
					  <div class="label">订单状态：</div>
					  <div class="num">{{detail.statusPay | statusPay}}</div>
					</div>
					<div class="label-flex">
					  <div class="label">创建时间：</div>
					  <div class="num">{{ detail.createTime }}</div>
					</div>
					<div class="label-flex">
					  <div class="label">支付时间：</div>
					  <div class="num">{{ detail.payTime }}</div>
					</div>

			        <div class="btnGroup">
			          <div class="btn btn-primary"  @click="ifCollectionWindow = false">确定</div>
			        </div>
			      </div>
		</div>
    </div>
  </div>
</template>
<script>
import utils from "../utils/utils";
import { orderDetail } from "../api/my";
export default {
  components: {},
  name: "my",
  data() {
    return {
      isMobile: utils._isMobile(),
	  isShowConsignment: false,
	  detail:{},

      formatMoney: utils.formatMoney,
      successInfo: {
        url: "http://theoneart-public.oss-cn-qingdao.aliyuncs.com/pc/shopping/bg-bind-success.png",
        text: "恭喜您寄售成功",
      },
      active: 0,
      path: this.$route.name,
      ifCollectionWindow: false,
      dialogVisible: false,
      visibleSucess: false,
      setPrice: "",
      getPoundageResult: {
        rate: "7.5",
      },
      realAmount: 0,
      collectionItem: {},
      treasureAddSaleRecordParam: {
        saleMessage: "",
        treasureId: "",
        treasureSkuIdList: [],
      },
      isAgreecConsignment: false,
      btnTxt: "",
      showAgreeBtnDown: false,
      isDownOver: false,
      isBottom: false,
      consignmentHtml: "",
      agreewidth: "600px",
    };
  },
  filters: {
    statusPay(value) {
      let arr = ["待支付", "已完成", "已取消"];
      return arr[value];
    },
  },
  watch: {
    $route(v) {
      this.path = v.name;
      console.log(this.path);
    },
    setPrice: {
      handler(val, oldVal) {
        if (this.getPoundageResult) {
          let charge = new BigNumber(val)
            .times(this.getPoundageResult.rate)
            .div(100);
          this.realAmount = new BigNumber(val).minus(charge);
        }
      },
    },
  },
  beforeDestroy() {
  },
  created() {
  },
  mounted() {
    let _this = this;
    _this.$root.$on("next", function (item) {
      _this.changeWindow(item);
    });
  },
  methods: {
    init(data) {
		this.ifCollectionWindow = true;
      orderDetail({
        id: data,
      }).then((res) => {
        if (res.data.data&&res.data.code == 200) {
          this.detail = res.data.data;
        }else{
          this.$message.error(res.data.message)
        }
      });
    },
    priceHandle(val) {
      const isRealNum = this.$common.checkPrice(val);
      if (val) {
        if (isRealNum) {
          this.setPrice = val;
        }
      } else {
        this.setPrice = val;
      }
    },
    linkTo(path) {
      this.$router.push(path);
    },

    handlerClose() {
      this.visibleSucess = false;
    },
    onCancelC() {
      this.isShowConsignment = false;
      this.isAgreecConsignment = false;
      localStorage.removeItem(`${KEY}${this.userInfo.userUuid}`);
      if (this.countDown) {
        this.countDown.stop();
      }
    },
    onScroll(e, info) {
      const el = e.target;
      if (el.scrollTop + el.clientHeight + 20 >= el.scrollHeight) {
        console.log("到底了");
        if (!this.isBottom) {
          this.isBottom = true;
        }

        return false;
      }
    },
    onIAgree() {
      if (this.showAgreeBtnDown) {
        this.isAgreecConsignment = true;
        this.isShowConsignment = false;
        localStorage.setItem(`${KEY}${this.userInfo.userUuid}`, "1");
      } else {
        this.$message.warning("请阅读完协议");
      }
    },
    showConsignment() {
      this.isDownOver = false;
      this.isBottom = false;
      this.isShowConsignment = true;
      this.getConsignment();
      this.showAgreeBtnDown = true;
      if (this.countDown) {
        this.countDown.stop();
        this.countDown = null;
      }
      this.countDown = new countDown({
        cdTime: 6,
        tickCall: (obj) => {
          this.btnTxt = `请下滑阅读全文:${obj.cdTime}s`;
        },
        endCall: () => {
          this.btnTxt = `请下滑阅读全文`;
          this.isDownOver = true;
        },
      });
    },

    async getConsignment() {
      this.consignmentHtml = "";
      const res = await dynamicNews({
        location: "in_agreement",
      });
      console.log(res);
      if (res.data.code == 200) {
        this.consignmentHtml = res.data.data[0].details;
      } else {
        this.$message.error(res.data.message);
      }
    },

    logOut() {
      // 开发阶段先不清除token
      // localStorage.removeItem('authorization')
      localStorage.removeItem("userInfo");
      localStorage.removeItem("authorization");
      localStorage.removeItem("THEONE_USER");
      this.$router.push("/login");
    },
    checkRadio() {
      if (!this.isAgreecConsignment) {
        this.showConsignment();
      } else {
        this.isAgreecConsignment = !this.isAgreecConsignment;
      }
    },
    async submit() {
      if (
        !/^\d+(.\d+)?$/.test(this.setPrice.replace(/,/g, "")) ||
        Number(this.setPrice) <= 0
      ) {
        this.$message.error("请输入正确的价格");
        return;
      }
      if (!this.isAgreecConsignment && this.$webConfig.flag.mineSellXY) {
        this.$message.warning("请先阅读并勾选《商户入驻协议》");
        return;
      }
      this.$refs.sellConfirmRef.init({
        txt: `是否确认以<span>${this.$common.formatMoney(
          this.setPrice
        )}</span>价格出售<span>${
          this.collectionItem.commodity.name
        }</span>商品`,
        sure: async () => {
          this.sell();
          //低价校验
          /*        const res = await this.$api.saleRecordCheckSalePrice({
            id: this.collectionItem.treasureId,
            price: this.setPrice,
          });
          if (res.data.code == 200 && res.data.data.result) {
            //低价
            this.$refs.smallConsignmentRef.init(res.data.data.phone);
          } else {
            this.sell();
          } */
        },
      });
    },
    async sell() {
      //寄售
      /*     const resPassword = await Encryption.getPassword(this.password);
      if (!resPassword) {
        this.$message.warning("密码加密错误");
        return;
      } */
      /*       this.$refs.sellSuccessRef.init();
      return; */
      this.treasureAddSaleRecordParam.price = this.setPrice;
      /*   this.treasureAddSaleRecordParam.password = resPassword; */
      let result = await this.$api.saleRecordAdd(
        this.treasureAddSaleRecordParam
      );
      if (result.data.code == 200) {
        this.$message.success("操作成功");
        this.$refs.sellSuccessRef.init();
      } else {
        this.$message.error(result.data.message);
      }
    },
    listenSellSuccess() {
      this.ifCollectionWindow = false;
    },
  },
};
</script>

<style lang='scss' scoped>
.shopping-collection-modal {
  width: 100%;
  height: 100%;
  background: rgba(51, 51, 51, 0.3);
  backdrop-filter: blur(1px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;

  .collection-window {
    width: 7.39rem;
    background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
    box-shadow: 0px 2px 42px 0px rgba(67,39,39,0.0600);
    border-radius: 3px;
    border: 3px solid #FFFFFF;
	margin: 0 .16rem;
	.flex-cont{
		display: flex;
		padding: .24rem;
	}
	.no{
		 font-size: .14rem;
		 color: $fc-title;
		 font-weight: 500;
		 display: flex;
		 align-items: center;
		 line-height: .2rem;
		 margin: .24rem .24rem 0;
		 .m-copy-blue{
			  color: $fc-main;
			  font-size: .12rem;
			  font-weight: 400;
		 }
	}
    .goods-fram {
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      width: 50%;
      padding: 0;
	  margin-right: .24rem;

      .img-view {
		  padding-bottom: 100%;
      }
    }

    .collection_form {
      flex: 1;
	  display: flex;
	  flex-direction: column;
      .label-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .16rem;
		line-height: .2rem;
		.label {
		  color: $fc-label;
		}
		.num {
		  color: $fc-main;
		}
		.price{
			color: $color-theme;
		}
      }
	  .line{
		  border-bottom: 1px dashed $fc-label;
	  }
      .tit-line {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: .16rem;
        margin-top: .16rem;
        color: $fc-title;
		line-height: .2rem;
      }
	  .title{
	  	font-size: .14rem;
	  	font-weight: 500;
		padding-bottom: .16rem;
	  }

      .btnGroup {
        display: none;
        justify-content: space-between;
		margin-top: auto;
		flex-wrap: wrap;
        .btn {
			width: 48%;
			margin: 0;
        }
      }
    }
  }
}


@media screen and (max-width: 540px) {
  .shopping-collection-modal {
    z-index: 99999;
    display: flex;
    align-items: flex-start;
    padding-top: .5rem;
	overflow-y: auto;
    .collection-window {
      width: 100%;
      background: $white;
      border-radius: 2px;
      border: 1px solid $color-border;
	  display: flex;
	  flex-direction: column;
      padding: .16rem;
	  margin: .16rem;

      .goods-fram {
        width: 100%;
        padding: 0;
        .img-view {
          padding-bottom: 100%;
        }
      }
	  .flex-cont{
	  	flex-direction: column;
		flex: 1;
		padding: 0;
	  }
	  .no{
	  	 font-size: .14rem;
	  	 color: $fc-title;
	  	 font-weight: 500;
	  	 display: flex;
	  	 align-items: center;
	  	 line-height: .2rem;
	  	 margin: 0;
		 margin-bottom: .08rem;
		 justify-content: space-between;
	  	 .m-copy-blue{
	  		  color: $fc-main;
	  		  font-size: .12rem;
	  		  font-weight: 400;
	  	 }
	  }
      .collection_form {
		padding: 0;
        .label-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: .16rem;
        }

        .tit-line {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: .16rem;
          margin-top: .16rem;
          color: $fc-title;
		  font-size: .12rem;
		  line-height: .2rem;
        }
		.title{
			font-size: .14rem;
			font-weight: 500;
		}

        .btnGroup {
          display: flex;
          justify-content: space-between;
          .btn {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
