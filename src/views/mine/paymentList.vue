<template>
  <div class="shopping-payment-list shopping-s-main shopping-c-main">
    <!-- 头部 -->
    <div class="shopping-account--header">
      <span class="flex-center"
        >总金额(元)
        <i
          class="icon-animate"
          :class="[showAmount ? 'icon-eye' : 'icon-eye-close']"
          @click="showAmount = !showAmount"
        ></i
      ></span>
      <span class="flex-price" v-if="showAmount"
        >¥
        {{
          (wallet.yb && wallet.yb.amount && wallet.yb.amount) || "0.00"
        }}</span
      >
      <span v-else>***</span>
    </div>
    <!-- 列表区域 -->
    <div class="account-content">
      <div class="account-title">账单</div>
      <mine-load
        :list="list"
        :noMore="noMore"
        :loading="loading"
        @handlerLoad="load"
      >
        <paymentItem :list="list"></paymentItem>
      </mine-load>
    </div>

    <div v-if="list.length == 0 && !loading">
      <empty page="payment" />
    </div>
  </div>
</template>

<script>
import utils from "../../utils/utils";
import { walletLogList, getUserWallet } from "../../api/my";
import paymentItem from "./paymen/paymentItem.vue";
import empty from "@/components/page/empty.vue";
import mineLoad from "./components/mineLoad.vue";
export default {
  name: "walletLogList",
  components: { paymentItem, mineLoad, empty },
  data() {
    return {
      isMobile: utils._isMobile(),
      loading: false,
      noMore: false,
      form: {
        pageCount: 1,
        pageSize: 10,
      },
      showAmount: false,
      wallet: {},
      list: [],
    };
  },
  filters: {
    dataType(val) {
      let type = ["", "出售所得", "充值", "支付账单", "提现", "退款"];
      return type[val];
    },
  },
  computed: {
    disabled() {
      return this.loading || this.noMore;
    },
  },
  created() {
    this.load();
    this.userWallet();
  },
  methods: {
    userWallet() {
      getUserWallet().then((res) => {
        if (res.data.code == 200 && res.data.data) {
          this.wallet = res.data.data;
        }
      });
    },
    load() {
      this.loading = true;
      walletLogList(this.form).then((res) => {
        if (res.data.code == 200) {
          this.loading = false;
          if (res.data.data.records.length < 10) {
            this.noMore = true;
          }
          res.data.data.records.forEach((item) => {
            item.dataJson = JSON.parse(item.dataJson);
          });
          this.form.pageCount++;
          this.list = this.list.concat(res.data.data.records);
        }else{
          this.$message.error(res.data.message)
        }
      });
    },
    linkTo(item) {
      this.$router.push({
        path: "orderDetail",
        query: {
          id: item.id,
        },
      });
    },
  },
};
</script>

<style lang='scss' scoped>
// 支付总览
.shopping-payment-list {
  margin: 0;
  max-width: 9.79rem;
  .account-content {
	  padding: 0 .24rem 0 .06rem;
  }
  .account-title {
    line-height: .2rem;
    margin: .23rem 0 0 0;
    color: $fc-title;
    font-weight: 400;
	color: $fc-title;
  }
  .icon-animate {
    transition: all 0.25s;
    background-size: contain;
    color: #fff;
    background-repeat: no-repeat;
    .svg {
      color: #fff;
      fill: #fff;
    }
  }
  .icon-eye {
    width: 0.2rem;
    height: 0.2rem;
    background-image: url("../../assets/images/mine/eye.png");
    margin-left: .08rem;
    color: #fff;
    cursor: pointer;
  }
  .icon-eye-close {
    width: 0.2rem;
    height: 0.2rem;
    background-image: url("../../assets/images/mine/eye-off.png");
    margin-left: .08rem;
    color: #fff;
    cursor: pointer;
  }
  .flex-center {
    display: flex;
    align-items: center;
	font-size: .12rem;
	font-weight: 600;
	line-height: .17rem;
	color: $fc-title;
  }
  .flex-price{
	  color: $fc-title;
  }
}
// 移动端样式
@media screen and (max-width: 540px) {
  .shopping-payment-list {
    margin: 0;
    .account-content {
      font-weight: 400;
	  padding: 0 .16rem 0 .06rem;
    }
    .account-title {
      line-height: 0.2rem;
      margin: 0.23rem 0 0 0;
    }
    .flex-center {
      display: flex;
      align-items: center;
    }
  }
}
</style>