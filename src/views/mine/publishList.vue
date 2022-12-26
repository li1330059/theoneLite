<!-- 我发布的 -->
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
			<span class="no">单据编号：<copy class="m-copy-blue" :txt="item.saleRecordNo"/></span>
			<div class="order-status-m">
			  <div :class="`status_typ${item.statusSale}`">
			    {{ item.statusSale | statusSale }}
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
            </div>
          </div>
		  <div class="price">¥{{ item.price }}</div>
		  <div class="amount-bar">
			  <div>
				  <label class="label">可用数量：</label>
				  <span class="shopping-c-main">{{ item.amountAvailable }}</span>
			  </div>
			  <div>
				  <label class="label">锁定数量：</label>
				  <span class="shopping-c-main">{{ item.amountLock }}</span>
			  </div>
			  <div>
				  <label class="label">卖出数量：</label>
				  <span class="shopping-c-main">{{ item.amountSold }}</span>
			  </div>
<!-- 		    <template v-if="item.amountAvailable">
		      <label class="label">可用数量：</label>
		      <span class="shopping-c-main"
		        >x{{ item.amountAvailable }}</span
		      >
		    </template>
		    <template v-if="item.amountLock">
		      <label class="label">锁定数量：</label>
		      <span class="shopping-c-main">x{{ item.amountLock }}</span>
		    </template>
		    <template v-if="item.amountSold">
		      <label class="label">卖出数量：</label>
		      <span class="shopping-c-main">x{{ item.amountSold }}</span>
		    </template> -->
		  </div>
          <div class="order-status" :style="{'flex': ([0, 1, 4].includes(item.statusSale)? '1':'2')}">
            <div>
              {{ item.createTime }}
            </div>
            <div :class="`status_typ${item.statusSale}`">
              {{ item.statusSale | statusSale }}
            </div>
          </div>
          <div class="order-operate" v-if="[0, 1, 4].includes(item.statusSale)">
            <div
              class="btn btn-cancel"
              v-preventReClick
              @click="handlerCancle(item)"
            >
              取消发布
            </div>
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
    <div v-if="list.length == 0 && !loading">
      <empty page="publish" />
    </div>
  </div>
</template>

<script>
import utils from "../../utils/utils";
import { publistList, canclePublist } from "../../api/my";
import empty from "@/components/page/empty.vue";
import mineTabs from "./components/mineTabs.vue";
export default {
  name: "publishList",
  components: { mineTabs,empty },
  data() {
    return {
      isMobile: utils._isMobile(),
      loading: false,
      noMore: false,
      form: {
        pageCount: 1,
        pageSize: 10,
        statusSale: "",
      },
      list: [],
      curren: 0,
      tabsData: [
		{ name: "全部", key: "" },
        { name: "发布中", key: 1 },
        { name: "已售罄", key: 2 },
        { name: "已取消", key: 3 },
        // { name: "被锁定", key: 5 },
      ],
    };
  },
  filters: {
    statusSale(value) {
      let aStatus = ["待处理", "发布中", "已售罄", "已取消", "拒绝出售"];
      return aStatus[value];
    },
  },
  computed: {
    disabled() {
      return this.loading || this.noMore;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
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
      publistList(this.form).then((res) => {
        if (res.data.code == 200) {
          this.loading = false;
          if (res.data.data.records.length < 10) {
            this.noMore = true;
          }
          this.form.pageCount++;
          this.list = this.list.concat(res.data.data.records);
        }else{
          this.$message.error(res.data.message)
        }
      });
    },
    handlerCancle(item) {
      this.$confirm("确定取消发布吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          canclePublist({
            id: item.id,
          }).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "取消成功!",
              });
              this.resetForm();
              this.load();
            } else {
              this.$message({
                type: "error",
                message: res.data.message,
              });
            }
          });
        })
        .catch(() => {});
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
      this.form.statusSale = res.key;
      this.load();
    },
  },
};
</script>

<style lang="scss" scoped>
.shopping-mine-list {
  .only-top-pc {
    margin-top: 16px;
  }
}
@media screen and (max-width: 540px) {
  .phone-margin {
    margin-top: 0.15rem;
  }
  .shopping-mine-list {
    .only-top-pc {
      margin-top: 0;
    }
  }
}
</style>
