<template>
  <div class="shopping-collection-modal" v-if="ifCollectionWindow">
    <div class="collection-window">
      <div class="goods-fram">
        <div
          class="img-view bg-img"
          :style="`background-image:url(${collectionItem.commodity.cover})`"
        ></div>
      </div>

      <div class="collection_form">
        <div class="tit-line">
          <div>
            <img src="../assets/images/smart-home.png" />
          </div>
          <div class="label">寄售</div>
          <div class="num" style="margin-left: auto">
            {{ collectionItem.commodity.name }}
          </div>
        </div>
        <!--      <div class="id-num label-flex">
          <div class="label">编号：</div>
          <div class="num">
            <commodity-num :treasure="collectionItem"></commodity-num>
          </div>
        </div> -->
        <div class="price label-flex">
          <div class="label">购买价格：</div>
          <div class="num">
            {{ formatMoney(collectionItem.priceBuy) }}
          </div>
        </div>
        <div class="input-label label-flex">您要寄售的价格为：</div>
        <el-input
          style="margin-bottom: 16px"
          :value="setPrice"
          @input="priceHandle"
          placeholder="请输入出售价格"
        ></el-input>
        <div class="sev-price label-flex">
          <div class="label">服务费：</div>
          <div class="num">手续费5% 版税2.5%</div>
        </div>
        <div class="real-price" style="text-align: right; margin-bottom: 16px">
          <span v-if="!isNaN(realAmount) && realAmount > 0"
            >预计此次出售实际可得{{ $common.formatMoney(realAmount) }}元</span
          >
          <span v-else>预计此次出售实际可得{{ $common.formatMoney(0) }}元</span>
        </div>

        <div class="btnGroup">
			<div class="shopping-s-main protocol" v-if="$webConfig.flag.mineSellXY">
			  <img
			    @click="checkRadio()"
			    v-if="isAgreecConsignment"
			    src="../assets/images/selector.png"
			    class="checkBtn"
			  />
			  <img
			    @click="checkRadio()"
			    v-if="!isAgreecConsignment"
			    src="../assets/images/selector-n.png"
			    class="checkBtn"
			  />
			  <div class="c-title hand" @click="checkRadio()">
			    我知晓并同意<span @click.stop="showConsignment"
			      >《商家入驻协议》</span
			    >
			  </div>
			</div>
          <div
            class="btn btn-cancel"
            @click="ifCollectionWindow = false"
          >
            取消
          </div>
          <div class="btn btn-primary" @click="submit">确定</div>
        </div>
      </div>
    </div>

    <el-dialog
      class="shopping-collection-dialog"
      :visible.sync="isShowConsignment"
      append-to-body
      :width="agreewidth"
      title="商家入驻协议"
    >
      <div class="content consignment-content">
        <div
          class="c-html"
          v-html="consignmentHtml"
          @scroll="onScroll($event)"
        ></div>
        <div class="btn-group">
          <div class="btn btn-default" @click="onCancelC">不同意</div>

          <div
            class="btn btn-primary"
            v-if="isBottom && isDownOver"
            @click="onIAgree()"
          >
            我同意
          </div>
          <div class="btn btn-default" v-else>
            {{ btnTxt }}
          </div>
        </div>
      </div>
    </el-dialog>
    <sell-success
      ref="sellSuccessRef"
      @listen="listenSellSuccess"
    ></sell-success>
    <sell-confirm ref="sellConfirmRef"> </sell-confirm>
    <small-consignment ref="smallConsignmentRef"></small-consignment>
  </div>
</template>
<script>
import utils from "../utils/utils";
const BigNumber = require("bignumber.js");
import Encryption from "../utils/encryption";
import countDown from "../utils/countDown";
import { dynamicNews } from "../api/base";
const KEY = "AgreecConsignment";
export default {
  components: {},
  name: "my",
  data() {
    return {
      isMobile: utils._isMobile(),
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
      isShowConsignment: false,
      isAgreecConsignment: false,
      btnTxt: "",
      showAgreeBtnDown: false,
      isDownOver: false,
      isBottom: false,
      consignmentHtml: "",
      agreewidth: "600px",
    };
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
  computed: {
    userInfo() {
      return this.$store.state.userStore.userInfo;
    },
  },
  beforeDestroy() {
    if (this.countDown) {
      this.countDown.stop();
    }
  },
  created() {
    if (this.isMobile) {
      this.agreewidth = "90%";
    }
  },
  mounted() {
    let _this = this;
    _this.$root.$on("next", function (item) {
      _this.changeWindow(item);
    });
  },
  methods: {
    init(data, password) {
      this.setPrice = "";
      this.ifCollectionWindow = true;
      this.collectionItem = data;
      this.password = password;
      this.treasureAddSaleRecordParam.authCode = "";
      this.treasureAddSaleRecordParam.treasureId =
        this.collectionItem.treasureId;
      this.treasureAddSaleRecordParam.treasureSkuIdList = [];
      this.treasureAddSaleRecordParam.treasureSkuIdList.push(
        this.collectionItem.id
      );
      const isAgree = localStorage.getItem(`${KEY}${this.userInfo.userUuid}`);

      if (isAgree) {
        this.isAgreecConsignment = true;
      }
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
      this.$emit("listen", this.setPrice);
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
    width: 764px;
    background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
    box-shadow: 0px 2px 42px 0px rgba(67,39,39,0.0600);
    border-radius: 3px;
    border: 3px solid #FFFFFF;
    display: flex;
	margin: 0 16px;
    .goods-fram {
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      width: 50%;
      padding: 0.24rem;
      .img-view {
		  padding-bottom: 100%;
      }
    }

    .collection_form {
      flex: 1;
      padding-right: 0.24rem;
      padding-bottom: 0.24rem;
	  display: flex;
	  flex-direction: column;
      .label-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .tit-line {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 16px;
        margin-top: 24px;
        color: $fc-title;
        .label {
          font-size: 14px;
		  line-height: .2rem;
        }

        .num {
          font-size: 12px;
		  line-height: .2rem;
        }

        img {
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }
      }

      .id-num {
        font-size: 12px;

        .label {
          color: $fc-label;
        }

        .num {
          color: $fc-title;
        }
      }

      .price {
        font-size: 12px;

        .label {
          color: $fc-label;
        }

        .num {
          color: $fc-title;
        }
      }

      .input-label {
        color: $fc-label;
        font-size: 12px;
		line-height: .2rem;
      }

      .sev-price {
        font-size: 12px;

        .label {
          color: $fc-label;
        }

        .num {
          color: $fc-title;
        }
      }

      .real-price {
        color: $fc-title;
        font-size: 12px;
      }

      .protocol {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        font-size: 12px;

        div {
          color: $fc-title;
        }

        .checkBtn {
          margin-right: 12px;
          width: 18px;
          height: 18px;
        }

        span {
          color: $color-sub;
        }
      }

      .btnGroup {
        display: flex;
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
.shopping-collection-dialog {
  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity 0.25s ease;
  }
  .component-fade-enter,
  .component-fade-leave-to {
    opacity: 0;
  }
  ::v-deep .el-input__inner {
    height: 48px;
    border: 1px solid $bc-inp;
    &::placeholder {
      color: $fc-sub;
      font-size: 14px;
    }
  }
  .dialog-confirm {
    .btn-bg-danger {
      width: 100%;
      margin-top: 32px;
    }
  }
  .consignment-content {
    .c-html {
      max-height: 240px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.7);
      line-height: 20px;
      overflow-y: auto;
    }
    .btn-group {
      display: flex;
      align-items: right;
      justify-content: flex-end;
      padding-top: 26px;
      .btn {
        display: inline-block;
        line-height: 30px;
        background: #e5e5e5;
        border-radius: 15px;
        font-size: 14px;
        text-align: center;
        padding: 0 36px;
        margin-left: 24px;
        cursor: pointer;
      }
      .btn-default {
        background-color: #e5e5e5;
        color: rgba(0, 0, 0, 0.7);
      }
      .btn-primary {
        background: linear-gradient(90deg, #ff7a64 0%, #e61f1a 100%);
        color: $fc-mask;
      }
    }
    @media screen and (max-width: 540px) {
      .btn-group {
        justify-content: space-between;
        .btn {
          margin: 0;
          padding: 0;
          text-align: center;
          font-size: 0.28rem;
        }

        .btn-default {
          width: 46%;
        }
        .btn-primary {
          width: 50%;
        }
      }
    }
  }
}

@media screen and (max-width: 540px) {
  .shopping-collection-modal {
    z-index: 999;
    padding: 0.4rem 0;
    display: flex;
	overflow-y: auto;
	align-items: flex-start;
	padding-top: .5rem;
    .collection-window {
      width: 100%;
      background: $white;
      border-radius: 4px;
      border: 1px solid $color-border;
	  display: flex;
	  flex-direction: column;
      padding: 0.16rem;

      .goods-fram {
        width: 100%;
        padding: 0;
        .img-view {
          padding-bottom: 100%;
        }
      }

      .collection_form {
        flex: 1;
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
          margin-top: .19rem;
          color: $fc-title;
          .label {
            font-size: .12rem;
          }

          .num {
            font-size: .12rem;
          }

          img {
            width: .24rem;
            height: .24rem;
            margin-right: .1rem;
          }
        }

        .id-num {
          font-size: .12rem;
		  line-height: .2rem;
        }

        .price {
          font-size: .12rem;
		  line-height: .2rem;
        }

        .input-label {
          font-size: .12rem;
		  line-height: .2rem;
        }

        .sev-price {
          font-size: .12rem;
		  line-height: .2rem;
        }

        .real-price {
          font-size: .12rem;
		  line-height: .2rem;
        }

        .protocol {
          display: flex;
          align-items: center;
          margin-bottom: .16rem;
          font-size: .12rem;

          div {
            color: $fc-title;
          }

          .checkBtn {
            margin-right: .12rem;
            width: .18rem;
            height: .18rem;
          }

          span {
          }
        }

        .btnGroup {
          display: flex;
          justify-content: space-between;
          .btn {
            width: 48%;
          }
        }
      }
    }
  }
}
</style>
