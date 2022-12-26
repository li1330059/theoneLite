<template>
  <div class="shopping-mine-orderDetail">
    <mine-nav :navList="navList"></mine-nav>
    <div class="orderDetail-centent">
      <div class="orderDetail-number shopping-s-title shopping-c-title orderDetail-title">
        {{ detail.orderBuyNo }}
      </div>
      <div class="orderDetail-item-main">
        <div
          class="orderDetail-item-img"
          :style="{
            backgroundImage: `url(${
              detail.commodity && detail.commodity.cover
            })`,
          }"
        ></div>
        <div class="orderDetail-item-info shopping-s-main shopping-c-sub">
          <div class="orderDetail-name shopping-s-title shopping-c-title">
            {{ detail.commodity && detail.commodity.name }}
          </div>
          <div class="orderDetail-info-item">
            <label class="shopping-c-sub" for="">价格：</label>
            <span class="shopping-c-active">¥ {{ detail.priceUnit }}</span>
          </div>
          <div class="orderDetail-info-item">
            <label class="shopping-c-sub" for="">寄售方：</label>
            <span class="shopping-c-main">{{
              detail.saleUser && detail.saleUser.nickname
            }}</span>
          </div>
          <div class="shopping-line"></div>
          <div
            class="shopping-shopping-c-sub shopping-s-main orderDetail-info-num"
          >
            <span class="shopping-c-active">{{ detail.amount }}</span
            >件商品
          </div>
          <div class="orderDetail-info-item">
            <label class="shopping-c-sub" for="">总商品金额：</label>
            <span class="shopping-c-active">¥ {{ detail.pricePay }}</span>
          </div>
          <div class="orderDetail-info-item">
            <label class="shopping-c-sub" for="">订单状态：</label>
            <span class="shopping-c-active">{{
              detail.statusPay | statusPay
            }}</span>
          </div>
          <div class="orderDetail-info-item">
            <label class="shopping-c-sub" for="">创建时间：</label>
            <span class="shopping-c-main">{{ detail.createTime }}</span>
          </div>
          <div class="orderDetail-info-item">
            <label class="shopping-c-sub" for="">支付时间：</label>
            <span class="shopping-c-main">{{ detail.payTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { orderDetail } from "../../api/my";
import mineNav from "./components/mineNav.vue";
export default {
  components: { mineNav },
  data() {
    return {
      detail: {},
       navList: [
        { name: "我买到的", path: "buy" },
        { name: "订单信息", path: "" },
      ],
    };
  },
  filters: {
    statusPay(value) {
      let arr = ["待支付", "已完成", "已取消"];
      return arr[value];
    },
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      orderDetail({
        id: this.$route.query.id,
      }).then((res) => {
        if (res.data.data&&res.data.code == 200) {
          this.detail = res.data.data;
        }else{
          this.$message.error(res.data.message)
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
// 我买到的
.shopping-mine-orderDetail {
  .orderDetail-centent {
    .orderDetail-item-main {
      display: flex;
    }
    .orderDetail-title{
      margin: 16px 0;
    }
    .orderDetail-item-img {
      width: 293px;
      height: 293px;
      background-size: contain;
      background-position: center;
      border: .01rem solid $color-border;
      background-repeat: no-repeat;
      flex: none;
      margin-right: 32px;
    }
    .orderDetail-item-info {
      margin-right: 32px;
      flex: auto;
    }
    .orderDetail-info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 16px 0;
    }
  }
}
@media screen and (max-width: 540px) {
  // 我买到的
  .shopping-mine-orderDetail {

    .orderDetail-centent {
      .orderDetail-item-main {
        display: block;
      }
      .orderDetail-title{
        margin: .16rem 0;
      }
      .orderDetail-item-img {
        width: 100%;
        height: 2.93rem;
        flex: none;
        margin-right: 0;
      }
      .orderDetail-item-info {
        margin-right: 0;
        margin-top: .16rem;
        flex: auto;
      }
      .orderDetail-info-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: .16rem 0;
      }
    }
  }
}
</style>