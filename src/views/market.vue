<template>
  <div class="shop-page-market">
    <div class="m-option">
      <div
        v-if="form.sort.field == 1 && form.sort.upOrDown == 1"
        class="sort-active-up m-option-item"
        @click="changeSort(1, 2)"
      >
        时间
      </div>
      <div
        v-else-if="form.sort.field == 1 && form.sort.upOrDown == 2"
        class="sort-active-down m-option-item"
        @click="changeSort(1, 1)"
      >
        时间
      </div>
      <div v-else class="m-option-item" @click="changeSort(1, 2)">时间</div>

      <div
        v-if="form.sort.field == 2 && form.sort.upOrDown == 1"
        class="sort-active-up m-option-item"
        @click="changeSort(2, 2)"
      >
        价格
      </div>
      <div
        v-else-if="form.sort.field == 2 && form.sort.upOrDown == 2"
        class="sort-active-down m-option-item"
        @click="changeSort(2, 1)"
      >
        价格
      </div>
      <div v-else class="m-option-item" @click="changeSort(2, 2)">价格</div>

      <div class="m-option-filter" @click="M_showClassify = true">筛选</div>
    </div>
    <div :class="['tag-class', showClassify ? '' : 'tag-class-transform']">
      <div>
        <div class="shopping-class-on" @click="showClassify = !showClassify">
          <div>筛选</div>
        </div>
      </div>
      <div class="is-menu" v-if="showClassify">
        <div
          :class="[showFirstBox == true ? 't-active' : '', 'market-tag-title']"
          @click="showFirstBox = !showFirstBox"
        >
          <div>标签分类</div>
        </div>
        <ul class="market-ul" v-if="showFirstBox">
          <li
            :class="{ active: item.check == true }"
            v-for="(item, index) in all_list"
            :key="index"
            @click="getList(item, index)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
	  <template v-if="showClassify">
		  <div class="is-menu" v-for="(item, index) in list" :key="index">
		    <div
		      :class="[item.check == true ? 't-active' : '', 'market-tag-title']"
		      @click="openBox(index)"
		      v-if="item.childrens.length != 0"
		    >
		      <div>{{ item.name }}</div>
		    </div>
		    <ul class="market-ul" v-if="item.check">
		      <li
		        :class="{ active: tagitem.check == true }"
		        v-for="(tagitem, tagindex) in item.childrens"
		        :key="tagindex"
		        @click="checkListItem(tagitem, tagindex, index)"
		      >
		        {{ tagitem.name }}
		      </li>
		    </ul>
		  </div>
	  </template>
    </div>
<!--    <div v-if="!showClassify" class="shopping-class-off">
      <div @click="showClassify = true"></div>
    </div> -->

    <div class="tag-m-class" v-if="M_showClassify">
      <div>
        <div
          :class="[showFirstBox == true ? 't-active' : '', 'market-tag-title']"
        >
          标签分类
          <div @click.stop="M_showClassify = false" class="m-close"></div>
        </div>
        <ul class="market-ul">
          <li
            :class="{ active: item.check == true }"
            v-for="(item, index) in all_list"
            :key="index"
            @click="getList(item, index)"
          >
            {{ item.name }}
          </li>
        </ul>
        <div class="m-class-btn">
          <div class="reset btn-disabled" @click="closeMclass()">重置</div>
          <div class="enter btn-primary" @click="M_showClassify = false">确定筛选</div>
        </div>
      </div>

      <div v-for="(item, index) in list" :key="index">
        <div
          :class="[item.check == true ? 't-active' : '', 'market-tag-title']"
          v-if="item.childrens.length != 0"
        >
          {{ item.name }}
        </div>
        <ul class="market-ul">
          <li
            :class="{ active: tagitem.check == true }"
            v-for="(tagitem, tagindex) in item.childrens"
            :key="tagindex"
            @click="checkListItem(tagitem, tagindex, index)"
          >
            {{ tagitem.name }}
          </li>
        </ul>
      </div>
    </div>

    <div class="main-content">
      <div :class="['market-crumb', showClassify ? '' : 'market-crumb-active']">
        <div class="crumb-tag">
          <div class="btn-primary" v-for="(item, index) in list" :key="index">
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="crumb-filter">
          <el-select v-model="filter_value" placeholder="请选择">
            <el-option
              v-for="item in filter"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="goods-list-wrap">
        <div class="goods-wrap" v-for="(item, idx) in goodList" :key="idx">
          <goods :goodsInfo="item"></goods>
        </div>
      </div>
      <p class="c-sub shopping-s-main ui-center mt16" v-if="loading">
        加载中...
      </p>
      <p
        class="c-sub shopping-s-main ui-center mt40"
        v-if="noMore && goodList.length > 0"
      >
        没有更多了
      </p>
      <empty page="market" v-if="goodList.length == 0 && !loading" />
    </div>
  </div>
</template>

<script>
import empty from "@/components/page/empty.vue";
import utils from "../utils/utils.js";
export default {
  components: { empty },
  data() {
    return {
      loading: false,
      noMore: false,
      form: {
        pageCount: 1,
        pageSize: 20,
        commodityCategoryId: "",
        commodityCategoryIdList: [],
        commodityId: "",
        sort: {
          field: 1,
          upOrDown: 2,
        },
      },
      list: [],
      all_list: [],
      goodList: [],
      filter_value: "1,2",
      filter: [
        {
          value: "1,2",
          label: "按时间降序",
        },
        {
          value: "1,1",
          label: "按时间升序",
        },
        {
          value: "2,2",
          label: "价格从高到低",
        },
        {
          value: "2,1",
          label: "价格从低到高",
        },
      ],
      checkName: "",
      showFirstBox: true,
      showClassify: true,
      M_showClassify: false,
      m_showClass: false,
      timeSort: false,
      priceSort: false,
    };
  },
  watch: {
    $route: function (to, from) {
      if (to.query.commodityId) {
        this.init();
        this.form.commodityId = to.query.commodityId;
        this.list = [];
        for (let i in this.all_list) {
          this.all_list[i].check = false;
        }
      }
      this.getGoodList();
    },
    filter_value: {
      handler: function (newVal) {
        this.changeSort(newVal.split(",")[0], newVal.split(",")[1]);
      },
      deep: true,
    },
    M_showClassify: {
      handler: function (newVal) {
        this.$store.commit("setHideHeader", newVal);
      },
      deep: true,
    },
  },
  created() {},
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.getList();
    console.dir(this.$route.query);
    if (this.$route.query.commodityId) {
      this.init();
      this.form.commodityId = this.$route.query.commodityId;
    }
    this.getGoodList();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    async getGoodList() {
      this.loading = true;
      const self = this;

      const res = await this.$api.getGoodList(this.form);

      console.log("获得结果--------------");
      console.log(res);
      if (res) {
        if (res.data.code == 200) {
          this.loading = false;
          if (res.data.data.records.length < 10) {
            this.noMore = true;
          }
          this.form.pageCount++;
          let arr = this.goodList.concat(res.data.data.records);
          this.goodList = utils.uniqueAry(arr, "id");
        } else {
          self.$message({
            message: res.data.message,
            type: "error",
          });
        }
      }
    },
    async getList(item, index) {
      const self = this;
      this.init();
      let params = {
        fid: "",
      };

      if (item) {
        //第一个分类的子项点击
        params.fid = item.id;
        for (let i = 0; i < this.all_list.length; i++) {
          this.all_list[i].check = false;
        }
        this.all_list[index].check = true;
        this.$router.push("/market");
      }

      const res = await this.$api.getCategoryList(params);

      console.log("获得结果--------------");
      console.log(res);
      if (res) {
        if (res.data.code == 200) {
          if (item) {
            //第一个分类的子项点击
            this.list = res.data.data;
            this.list[0].check = true;
            this.form.commodityCategoryIdList = [];
            this.getIdArr(this.list[0].childrens);
            this.getGoodList();
          } else {
            this.all_list = res.data.data;
          }
        } else {
          self.$message({
            message: res.data.message,
            type: "error",
          });
        }
      }
    },
    getIdArr(arr) {
      for (let i = 0; i < arr.length; i++) {
        this.form.commodityCategoryIdList.push(arr[i].id);
        if (arr[i].childrens.length > 0) {
          this.getIdArr(arr[i].childrens);
        }
      }
    },
    openBox(index) {
      this.list[index].check = !this.list[index].check;
      this.list = JSON.parse(JSON.stringify(this.list));
    },
    checkListItem(item, tagindex, index) {
      this.init();
      if (item.childrens.length == 0) {
        this.form.commodityCategoryId = item.id;
      }
      this.getIdArr(item.childrens);
      this.getGoodList();
      for (let i = 0; i < this.list[index].childrens.length; i++) {
        this.list[index].childrens[i].check = false;
      }
      this.list[index].childrens[tagindex].check = true;

      let if_add = false;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].level == item.level) {
          if_add = true;
        }
      }
      if (if_add) {
        this.list.length = item.level - 1;
      }
      this.list.push(item);
      this.list = JSON.parse(JSON.stringify(this.list));
    },
    goDetails(item) {
      let crumb = [];
      for (let i in this.all_list) {
        if (this.all_list[i].check == true) {
          crumb.push(this.all_list[i].name);
        }
      }
      for (let i in this.list) {
        if (this.list[i].check == true) {
          crumb.push(this.list[i].name);
        }
      }
      let routeData = this.$router.resolve({
        path: "/goods_detail/" + item.id,
        query: {
          crumb,
        },
      });
      window.open(routeData.href, "_blank");
    },
    init() {
      this.form.commodityId = "";
      this.form.commodityCategoryId = "";
      this.form.commodityCategoryIdList = [];
      this.goodList = [];
      this.form.pageCount = 1;
    },
    handleScroll() {
      let scrollDom = document.getElementsByClassName("main-content");
      scrollDom = scrollDom && scrollDom[0];
      let scrollTop = scrollDom.scrollTop;
      let windowHeight = scrollDom.clientHeight;
      let scrollHeight = scrollDom.scrollHeight;
      if (
        scrollHeight - scrollTop - windowHeight < 100 &&
        !this.noMore &&
        !this.loading
      ) {
        this.getGoodList(); //也可以使用setTimeout定时器延时追加内容
      }
    },
    changeSort(field, upOrDown) {
      this.form.sort.field = field;
      this.form.sort.upOrDown = upOrDown;
      this.goodList = [];
      this.form.pageCount = 1;
      this.getGoodList();
    },
    closeMclass(type) {
      this.list = [];
      for (let i in this.all_list) {
        this.all_list[i].check = false;
      }
      this.init();
      this.getGoodList();
    },
  },
};
</script>

<style lang='scss' scoped>
.shop-page-market {
  display: flex;
  position: absolute;
  top: 0.8rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  .m-option {
    display: none;
  }
  @media screen and (max-width: 540px) {
    top: auto;
    flex-direction: column;
    background-color: $white;
    width: 100%;
    height: 100%;
    .shopping-class-on {
      display: none;
    }
    .m-option {
      display: flex;
      position: fixed;
      z-index: 2;
      width: 100%;
      background-color: $white;
      top: 0.44rem;
      color: $fc-sub;
      font-size: .12rem;
	  line-height: .17rem;
      padding: 0.16rem;
      .m-option-filter {
        background-image: url(../assets/images/market/market-filter.png);
        background-size: contain;
        background-repeat: no-repeat;
        background-size: .15rem .15rem;
        background-position: 0 0;
        margin-left: auto;
        width: .5rem;
        text-align: right;
      }
      .m-option-item {
        background-image: url(../assets/images/market/market-sort-no.png);
        background-repeat: no-repeat;
        background-size: .12rem .2rem;
        background-position: .35rem -2px;
        margin-right: .32rem;
        width: .6rem;
      }
      .sort-active-up {
        background-image: url(../assets/images/market/market-sort-down.png);
      }
      .sort-active-down {
        background-image: url(../assets/images/market/market-sort-up.png);
      }
    }
  }
  .tag-class{
	transition: all .3s ease-in;
	margin-left: 0;
	position: relative;
	z-index: 10;
  	.shopping-class-on {
		div {
		  background-image: url(../assets/images/market/market-box-left.png);
		}
  	}
  }
  .tag-class-transform{
	transition: all .3s ease-in;
	margin-left: -220px;
	position: relative;
	 z-index: 10;
	.shopping-class-on {
		div {
			background-image: url(../assets/images/market/market-box-right.png);
		}
	}
  }
  .tag-class,
  .tag-m-class {
    border-right: 1px solid $color-border;
    height: 100%;
    width: 280px;
    overflow: overlay;
    flex-shrink: 0;
    .m-class-btn {
      display: flex;
      width: 100%;
      position: fixed;
      bottom: 0;
      z-index: 1;
      div {
        height: 0.46rem;
        line-height: 0.46rem;
        text-align: center;
        font-size: 0.14rem;
      }
      .reset {
        flex: 1;
        background: $color-secondary;
      }
      .enter {
        flex: 2;
      }
    }
    li {
      width: 100%;
      cursor: pointer;
      padding: .1rem 0.16rem;
      position: relative;
      img {
        width: 0.2rem;
        height: 0.2rem;
        position: absolute;
        right: 0.1rem;
        top: 0.08rem;
      }
    }
    .market-ul {
      background: $color-ul;
      display: flex;
      flex-wrap: wrap;
      padding: 8px;
      li {
        background: $white;
        border: 1px solid $bc-cli;
        width: 123px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 4px;
        font-size: 0.12rem;
        color: $fc-title;
        &.active {
          background: linear-gradient(149deg, #FF7A64 0%, $color-btn 100%);
          color: $fc-mask;
        }
      }
    }
    .market-tag-title {
      font-size: 0.14rem;
      padding: 0.16rem;
      position: relative;
      font-weight: 500;
      color: $fc-title;
      border-top: 1px solid $bc-pli;
      border-bottom: 1px solid $bc-pli;
      div {
        background-image: url(../assets/images/market/market-box-top.png);
        background-repeat: no-repeat;
        background-size: .18rem .18rem;
        background-position: right;
      }
    }
    .shopping-class-on {
      font-size: 0.14rem;
      padding: 0.3rem 0.16rem;
      font-weight: 500;
      color: $fc-title;
      div {
        background-repeat: no-repeat;
        background-size: 18px 18px;
        background-position: right;
      }
    }
    .t-active {
      div {
        background-image: url(../assets/images/market/market-box-bottom.png);
      }
    }
    @media screen and (max-width: 540px) {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1000;
      padding-bottom: 0.4rem;
      // transform:translateZ(1px);
      background: $white;
      .shopping-class-on {
        display: none;
      }
      .market-tag-title {
        font-size: 0.14rem;
        padding: 0.19rem;
        background-image: none;
      }
      .t-active {
        background-image: none;
      }
      .m-close {
        background-image: url(../assets/images/mobile-close.png);
        width: 0.4rem;
        height: 100%;
        position: absolute;
        top: 0.02rem;
        right: 0.2rem;
        background-size: contain;
        background-repeat: no-repeat;
        background-size: 0.24rem 0.24rem;
        background-position: 0.19rem 0.12rem;
      }
      .market-ul {
        padding: 0.08rem;
        li {
          background: $white;
          border-radius: 4px;
          border: 1px solid $bc-cli;
          width: 46.6%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0.04rem 0.06rem;
          font-size: 0.14rem;
          &.active {
          }
        }
      }
	  .t-active {
	    div {
	      background-image: url(../assets/icon/icon-close.png);
	    }
	  }
    }
  }
  .tag-m-class {
    border-right: 0;
    .market-tag-title {
      border: 0;
    }
  }
  @media screen and (max-width: 540px) {
    .tag-class {
      display: none;
    }
  }
  @media screen and (min-width: 540px) {
    .tag-m-class {
      display: none;
    }
  }
  .shopping-class-off {
	  transition: all .3s ease-in;
    @media screen and (max-width: 540px) {
      display: none;
    }
    height: 100%;
    width: 58px;
    border: 1px solid $bc-pli;
    div {
      height: 58px;
      background-image: url(../assets/images/market/market-box-right.png);
      background-size: contain;
      background-repeat: no-repeat;
      background-size: 18px 18px;
      background-position: 20px 16px;
    }
  }

  .main-content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
	padding: 0 .08rem;
    -webkit-overflow-scrolling: touch;
    .mt16 {
      margin-bottom: 0.16rem;
      font-size: 0.14rem;
      text-align: center;
    }
    .base-empty-my {
      position: absolute;
      left: 50%;
      transform: translateX(-50%, -50%);
      font-size: 0.12rem;
    }
    @media screen and (max-width: 540px) {
      .base-empty-my {
        left: 1.3rem;
        top: 3rem;
      }
      .market-crumb {
        display: none;
      }
    }
  }
  .market-crumb {
    display: flex;
	justify-content: space-between;
    margin-bottom: 0.07rem;
    color: $fc-mask;
    padding-top: 0.16rem;
	padding-left: .3rem;
	position: fixed;
	z-index: 9;
	background: #ffffff;
	width: 100%;
	left: 0;
	padding-left: 3rem;
	transition: all .3s ease-in;
    .crumb-tag {
      display: flex;
	  flex: 1;
	  overflow-x: auto;
	  margin-right: 0.1rem;
      div {
        margin: 0 0.08rem 0.08rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        min-width: 1rem;
        height: 36px;
        font-size: 0.14rem;
		padding: 0 .1rem;
        span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .crumb-filter {
      margin-top: -3px;
      min-width: 130px;
	  margin-right: 0.5rem;
      .el-input__inner {
        border: 0;
        text-align: right;
      }
    }
  }
	.market-crumb-active{
		padding-left: .8rem;
		transition: all .3s ease-in;
	}
  .shopitem-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    @media screen and (max-width: 540px) {
      margin-top: 1rem;
      width: auto;
    }
  }
  .goods-list-wrap {
    display: flex;
    flex-wrap: wrap;
	padding-top: .8rem;
    .goods-wrap {
      width: 25%;
      padding: 0.08rem 0.08rem;
    }
    @media screen and (min-width: 1800px) {
      .goods-wrap {
        width: 16.66%;
      }
    }
	@media screen and (min-width: 1620px) and (max-width: 1800px) {
	  .goods-wrap {
		width: 20%;
	  }
	}
    @media screen and (min-width: 900px) and (max-width: 1200px) {
      .goods-wrap {
        width: 33%;
      }
    }
    @media screen and (min-width: 700px) and (max-width: 900px) {
      .goods-wrap {
        width: 50%;
      }
    }
    @media screen and (min-width: 540px) and (max-width: 700px) {
      .goods-wrap {
        width: 100%;
      }
    }
    @media screen and (max-width: 540px) {
      padding: 0;
      margin-top: 1rem;
      .goods-wrap {
        width: 50%;
      }
    }
  }
}
/* 整个滚动条 */
.crumb-tag::-webkit-scrollbar {
  height: 3px;
}

/* 滚动条上的滚动滑块 */
.crumb-tag::-webkit-scrollbar-thumb {
  background-color: #f9f9f9;
  border-radius: 1px;
}

/* 滚动条轨道 */
.crumb-tag::-webkit-scrollbar-track {
  background-color: #ffffff;
}
</style>
