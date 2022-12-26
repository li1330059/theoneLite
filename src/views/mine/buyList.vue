<template>
  <div>
    <mine-tabs
      :tabsData="tabsData"
      :curren="curren"
      @handlerChange="handlerChange"
    ></mine-tabs>
    <div class="shopping-mine-list v1-order">
      <div class="v1-order-item" v-for="(item, index) in list" :key="index">
		  <div class="th">
		  	<span class="time">{{item.createTime}}</span>
		  	<span class="no">单据编号：<copy class="m-copy-blue" :txt="item.orderBuyNo"/></span>
				<div class="order-status-m">
					<div :class="`status_typ${item.statusPay}`">
					{{ item.statusPay | statusPay }}
					</div>
				</div>
		  </div>
        <div class="order-content">
          <div class="order-info">
            <goods-pic
              size=".13rem"
              :img="item.commodity && item.commodity.cover"
              :lg="item.commodity && item.commodity.actualPicture"
            ></goods-pic>
            <div class="order-goods">
              <div class="name">
                <div class="title">{{ item.commodity && item.commodity.name }}</div>
				<span class="amount">X {{ item.amount }}</span>
              </div>
              <div class="v1-artist-bar mini" v-if="item.author">
                <!-- <img class="avatar" :src="item.author.cover" /> -->
                {{ item.author.nickname }}
              </div>
			  <div class="m-price">¥{{ item.pricePay }}</div>
            </div>
          </div>
		  <div class="price">¥{{ item.pricePay }}</div>
          <div class="order-status">
			  <div :class="`status_typ${item.statusPay}`">
			    {{ item.statusPay | statusPay }}
			  </div>
            <div class="time" v-if="item.statusPay == 1">支付时间：{{item.payTime}}</div>
          </div>
          <div class="order-operate">
            <div
              class="btn btn-cancel"
              v-if="item.statusPay != 0"
              @click="linkTo(item)"
            >
              订单详情
            </div>
            <div
              class="btn btn-primary"
              v-if="item.statusPay == 0"
              @click="goPay(item)"
            >
              支付
            </div>
            <div
              class="btn cancel"
              v-if="item.statusPay == 0"
              v-preventReClick
              @click="cancelOrder(item)"
            >
              取消订单
            </div>
          </div>
        </div>
      </div>

      <div class="shopping-c-sub shopping-s-main ui-center mt16" v-if="loading">
        加载中...
      </div>
      <div
        class="shopping-c-sub shopping-s-main ui-center mt40 mb16"
        v-if="noMore && list.length > 0"
      >
        没有更多了
      </div>
    </div>
    <div v-if="list.length == 0 && !loading">
      <empty page="buy" />
    </div>
	<order-buy-details ref="orderBuyDetailsRef"></order-buy-details>
  </div>
</template>

<script>
import { orderList } from "../../api/my";
import empty from "@/components/page/empty.vue";
import GoodsPic from "../../components/model/goods/goodsPic.vue";
import mineTabs from "./components/mineTabs.vue";
import orderBuyDetails from "@/components/orderBuyDetails.vue";
export default {
  components: { empty, mineTabs, GoodsPic,orderBuyDetails },
  name: "orderList",
  data() {
    return {
      loading: false,
      noMore: false,
      form: {
        pageCount: 1,
        pageSize: 10,
        statusPay: "",
      },
      curren: 0,
      tabsData: [
		{ name: "全部", key: "" },
		{ name: "待付款", key: 0 },
        { name: "已完成", key: 1 },
        { name: "已取消", key: 2 },
      ],
      userInfo: {},
      list: [],
      clintWidth: window.innerWidth,
    };
  },
  computed: {
    disabled() {
      return this.loading || this.noMore;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    window.addEventListener("resize", () => {
      this.clintWidth = window.innerWidth;
    });
  },
  created() {
    this.load();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, true);
  },
  filters: {
    statusPay(value) {
      let aStatus = ["待支付", "已完成", "已取消"];
      return aStatus[value];
    },
  },
  methods: {
    handleScroll() {
      let scrollDom = document.getElementsByClassName("shopping-mine");
      scrollDom = scrollDom && scrollDom[0];
      let scrollTop = scrollDom.scrollTop;
      let windowHeight = scrollDom.clientHeight;
      let scrollHeight = scrollDom.scrollHeight;
      if (
        scrollHeight - scrollTop - windowHeight < 100 &&
        !this.noMore &&
        !this.loading
      ) {
        this.load(); //也可以使用setTimeout定时器延时追加内容
      }
    },
    load() {
      this.loading = true;
      orderList(this.form).then((res) => {
        if (res.data.code == 200) {
          this.loading = false;
          if (res.data.data.records.length < 10) {
            this.noMore = true;
          }
          this.form.pageCount++;
          this.list = this.list.concat(res.data.data.records);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    linkTo(item) {
		this.$refs.orderBuyDetailsRef.init(item.id);
      // this.$router.push({
      //   path: "orderDetail",
      //   query: {
      //     id: item.id,
      //   },
      // });
    },
    async cancelOrder(data) {
      //取消待付款订单
      const res = await this.$api.orderBuyCancel({
        orderBuyNo: data.orderBuyNo,
        id: data.id,
      });
      if (res.data.code == 200) {
        this.resetForm();
        this.load();
      } else {
        this.$message.error(res.data.message);
      }
    },
    goPay(item) {
      this.$router.push(`/goods_buy?orderId=${item.id}`);
    },
    resetForm() {
      this.form.pageCount = 1;
      (this.form.pageSize = 10), (this.list = []);
    },
    handlerChange(res) {
      this.resetForm();
      this.form.statusPay = res.key;
      this.load();
    },
  },
};
</script>
 