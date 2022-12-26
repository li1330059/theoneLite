<template>
  <div class="shop-page-collection-sku">
    <mine-nav :navList="navList"></mine-nav>
    <div class="v1-collection">
      <div v-for="(item, idx) in list" class="goods-bar" :key="item.id">
        <div class="goods-bar-wrap">
<!--          <div class="number">{{ item.commoditySku.number }}</div> -->
          <div
            class="cover-wrap bg-img"
            :style="`background-image:url(${item.commodity.cover})`"
          >
            <div class="mask hand" v-if="$webConfig.marketType==2&&item.statusAvailable == 1">
              <div class="btn-group">
                <div class="btn btn-white" @click="pushTreasure(item, idx)">
                  {{ $webConfig.treasureBackText }}
                </div>
                <div class="btn btn-primary" @click="sellAdd(item, idx)">
                  寄售
                </div>
              </div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="goods-name hidden-txt-1">
              {{ item.commodity.name }}
            </div>
            <div
              class="line-bar"
              v-if="item.operationType == 1 || item.operationType == 2"
            >
              <div class="key">寄售价：</div>
              <div class="val price">
                {{ $common.formatMoney(item.priceSale) }}
              </div>
            </div>
            <div class="line-bar" v-else>
              <div class="key">藏品状态：</div>
              <div class="val">私藏</div>
            </div>
            <div class="line-bar">
              <div class="key time-label">获得时间：</div>
              <div class="val">{{ item.createTime }}</div>
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
    <sell-add ref="sellAddRef" @listen="listenSellSuccess"></sell-add>
    <dialog-bindcard-new
      ref="bindcardRef"
      :userInfo="userInfo"
      @bindSucess="listenBankSubmit"
    ></dialog-bindcard-new>
  </div>
</template>

<script>
import utils from "../../utils/utils.js";
import empty from "@/components/page/empty.vue";
import mineNav from "./components/mineNav.vue";
export default {
  components: { empty, mineNav },
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
      listParams: {
        pageCount: 1,
        pageSize: 20,
        sort: { field: 1, upOrDown: 1 },
        treasureId: "",
        visible: "",
      },
      navList: [
        { name: "我的藏品", path: "collection" },
        { name: this.goodsName, path: "" },
      ],
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },

  created() {
    this.listParams.treasureId = this.$route.params.id;

    this.getList();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, true);
  },
  computed: {
    userInfo() {
      return this.$store.state.userStore.userInfo;
    },
    goodsName() {
      return this.list[0] ? this.list[0].commodity.name : "";
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
        console.log(1)
        this.getList(); //也可以使用setTimeout定时器延时追加内容
      }
    },
    async pushTreasure(item, idx) {
      const res = await this.$api.pushTreasure({ treasureSkuId: item.id });
      if (res.data.code == 200) {
        this.$message.success("推送成功");
        this.list = [];
        this.getList();
      } else {
        this.$message.error(res.data.message);
      }
    },
    sellAdd(item, idx) {
      this.goodsInfo = item;
      this.goodsIdx = idx;
      if (this.userInfo.statusBankVerified !== 1) {
        this.$refs.bindcardRef.init();
        return;
      }
      this.$refs.sellAddRef.init(item, 11111);
      /*       if (this.userInfo.isPayPwd == 1) {
      
        this.$refs.passwordVerifiedRef.init((password) => {
          this.$refs.sellAddRef.init(item, password);
        }); 
      } else {
        //设置交易密码
        this.$refs.setPayPasswordRef.init();
      } */
    },
    consignment() {},
    async listenBankSubmit() {
      //银行卡绑定成功
      await this.$store.dispatch("getUserInfo");
      this.sellAdd(this.goodsInfo);
    },
    setPasswordSuccess() {
      //交易密码设置成功
      this.sellAdd(this.goodsInfo);
    },
    listenSellSuccess(price) {
      let list = JSON.parse(JSON.stringify(this.list));
      list[this.goodsIdx].operationType = 1;
      list[this.goodsIdx].priceSale = price;
      list[this.goodsIdx].statusAvailable = 0;
      this.list = list;
    },
    async getList() {
      const self = this;
      this.loading = true;
      const res = await this.$api.treasureSkuList(this.listParams);

      if (res) {
        if (res.data.code == 200) {
          this.loading = false;
          if (res.data.data.records.length < 10) {
            this.noMore = true;
          }
          this.listParams.pageCount++;
          this.list = this.list.concat(res.data.data.records);
          if (this.list[0] && this.list[0].commodity) {
            this.$set(this.navList[1], "name", this.list[0].commodity.name);
          }
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
.shop-page-collection-sku {
  .shopping-mine-nav {
    padding-left: 0.16rem;
  }
}
.btn{
	padding: 0!important;
	margin: 0 .05rem;
	/* min-width: .8rem; */
}
@media screen and (max-width: 540px) {
	.v1-mine-nav{
		display: none;
	}
    .goods-bar {
      width: 100%;
	}
	.mask {
	  opacity: 1!important;
	  background-color: rgba(51, 51, 51, 0)!important;
	
	  .btn-group {
		display: flex!important;
		justify-content: space-between;
		padding: 0 0.12rem!important;
		.btn{
			flex: 1;
			margin: 0 .04rem!important;
			background: linear-gradient(149deg, #FF7A64 0%, $color-btn 100%)!important;
		}
	  }
	}
}
</style>