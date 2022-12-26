<!-- 我卖出的 -->
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
			<span class="time">
				<template v-if="item.statusPay == 1">{{ item.payTime }}</template>
				<template v-else>{{ item.createTime }}</template>
			</span>
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
              <div class="v1-artist-bar mini" v-if="item.buyUser">
                <label class="label">买家：{{ item.buyUser.nickname }}</label>
              </div>
            </div>
          </div>
		  <div class="price">¥{{ item.pricePay }}</div>
          <div class="order-status">
            <div :class="`status_typ${item.statusPay}`">
              {{ item.statusPay | statusPay }}
            </div>
          </div>
        </div>
		<div class="byNo">单据编号：{{ item.orderBuyNo }}</div>
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
    <div v-if="list.length == 0 && !loading">
      <empty page="sell" />
    </div>
  </div>
</template>

<script>
import utils from "../../utils/utils";
import { saleList } from "../../api/my";
import mineTabs from "./components/mineTabs.vue";
import empty from "@/components/page/empty.vue";
export default {
  name: "sellList",
  components: { mineTabs, empty },
  data() {
    return {
      isMobile: utils._isMobile(),
      loading: false,
      noMore: false,
      form: {
        pageCount: 1,
        pageSize: 10,
        statusPay: "",
      },
      list: [],
      curren: 0,
      tabsData: [
		{ name: "全部", key: "" },
        { name: "已完成", key: 1 },
        { name: "待支付", key: 0 },
      ],
    };
  },
  computed: {
    disabled() {
      return this.loading || this.noMore;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  filters: {
    statusPay(value) {
      let aStatus = ["待支付", "已完成", "已取消"];
      return aStatus[value];
    },
  },
  created() {
    this.load();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, true);
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
      saleList(this.form).then((res) => {
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
      this.$router.push({
        path: "orderDetail",
        query: {
          id: item.id,
        },
      });
    },
    resetForm() {
      this.form.pageCount = 1;
      this.form.pageSize = 10;
      this.list = [];
    },
    handlerChange(res) {
      this.resetForm();
      this.form.statusPay = res.key;
      this.load();
    },
  },
};
</script>

<style lang="scss" scoped></style>
