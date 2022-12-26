<template>
  <div class="shop-page-collection">
    <div class="v1-collection">
	  <div
	    v-for="item in list"
	    class="goods-bar hand"
	    :key="item.id"
	    @click="saleWindow(item)"
	  >
	    <div class="goods-bar-wrap">
	      <div
	        class="cover-wrap bg-img"
	        :style="`background-image:url(${item.commodity.cover})`"
	      ></div>
	      <div class="info-wrap">
	        <div class="goods-name hidden-txt-1">{{ item.commodity.name }}</div>
	        <div class="another">
	          <span class="hidden-txt-1" v-if="item.author">
	            首发方：{{ item.author.nickname || item.author.name }}
	          </span>
	        </div>
	      </div>
	    </div>
	  </div>
    </div>
    <p class="c-sub shopping-s-main ui-center mt16" v-if="loading">加载中...</p>

    <div v-if="list.length == 0 && !loading">
      <empty page="collection" />
    </div>

    <set-pay-password
      ref="setPayPasswordRef"
      @listen="setPasswordSuccess"
    ></set-pay-password>
    <password-verified ref="passwordVerifiedRef"></password-verified>
    <sell-add ref="sellAddRef"></sell-add>
  </div>
</template>

<script>
import utils from "../../utils/utils.js";
import empty from "@/components/page/empty.vue";
import { treasureList } from "../../api/my";
export default {
  components: { empty },
  data() {
    return {
      isMobile: utils._isMobile(),
      list: [],
      loading: false,
      noMore: false,
      form: {
        pageCount: 1,
        pageSize: 10,
      },
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  created() {
    this.getList();
  },
  beforeDestroy() {
    console.log("beforeDestroy");
    window.removeEventListener("scroll", this.handleScroll, true);
  },
  computed: {
    userInfo() {
      return this.$store.state.userStore.userInfo;
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
        this.getList(); //也可以使用setTimeout定时器延时追加内容
      }
    },
    saleWindow(item) {
      this.$router.push(`/mine/collection_sku/${item.id}`);
    },
    consignment() {},
    setPasswordSuccess() {
      //交易密码设置成功
      this.saleWindow();
    },
    async getList() {
      const self = this;
      this.loading = true;
      const res = await treasureList(this.form);

      console.log("获得结果--------------");
      console.log(res);
      if (res) {
        if (res.data.code == 200) {
          this.loading = false;
          if (res.data.data.records.length < 1) {
            this.noMore = true;
          }
          this.form.pageCount++;
					let arr = this.list.concat(res.data.data.records);
					this.list = utils.uniqueAry(arr,"id");
        } else {
          self.$message({
            message: res.data.message,
            type: "error",
          });
        }
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.shop-page-collection {
  .shopping-mine-nav {
    padding-left: 0.16rem;
  }
}
</style>