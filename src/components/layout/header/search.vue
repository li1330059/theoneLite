<template>
  <div class="shop-com-search">
    <div class="search-wrap" :class="{ 'fixed-mode': isShowMobileSearch }">
      <div class="input-wrap">
        <div class="search-cont">
          <span class="bg-img icon-search" @click="onToggle"></span>
        </div>
        <el-input
          class="search-input"
          v-model="searchStr"
          :placeholder="$webConfig.searchText"
          @input="onSearch"
          @blur="onBlur"
          @focus="onFocus"
        ></el-input>
      </div>

      <div class="infinite-list" v-if="isShowSearchResult">
        <div
          class="goods-list-wrap"
          v-infinite-scroll="load"
          infinite-scroll-disabled="loadDisabled"
          infinite-scroll-immediate="false"
        >
          <div
            class="search-result-bar hand hidden-txt-1"
            v-for="(item, idx) in goodsList"
            :key="idx"
            @click="onHandle(item)"
          >
            {{ item.name }}
          </div>
          <div class="message" v-if="loading">加载中……</div>
          <div class="message" v-else-if="isEmpty">
            {{ goodsList.length > 0 ? "没有更多了" : "无数据" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isShowMobileSearch: false,
      isShowSearchResult: false,
      searchStr: "",
      goodsList: [],
      loading: false,
      listParams: {
        name: "",
        pageCount: 1,
        pageSize: 20,
      },
      isEmpty: false,
    };
  },
  computed: {
    loadDisabled() {
      return this.loading || this.isEmpty;
    },
  },
  created() {},
  methods: {
    onToggle() {
      this.isShowMobileSearch = !this.isShowMobileSearch;
    },
    onSearch(str) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.listParams.pageCount = 1;
        this.goodsList = [];
        this.isShowSearchResult = true;
        this.search();
      }, 500);
    },

    load() {
      this.listParams.pageCount++;
      this.search();
    },
    onFocus() {
      if (this.searchStr) {
        this.listParams.pageCount = 1;
        this.goodsList = [];
        this.isShowSearchResult = true;
        this.search();
      }
    },
    async search() {
      this.loading = true;
      const res = await this.$api.commoditySearch({
        ...this.listParams,
        name: this.searchStr,
      });
      this.loading = false;
      if (res.data.code == 200 && res.data.data.records.length > 0) {
        this.isEmpty = this.listParams.pageSize > res.data.data.records.length;
        this.goodsList = [...this.goodsList, ...res.data.data.records];
      } else {
        this.isEmpty = true;
      }
    },
    onBlur() {
      setTimeout(() => {
        this.isShowSearchResult = false;
        this.listParams.pageCount = 1;
        this.goodsList = [];
      }, 260);
    },
    onHandle(item) {
      const url = `/market?commodityId=${item.id}&name=${item.name}`;
      if (this.$route.path == "/market") {
        this.$router.push(url);
      } else {
        window.open(url);
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.icon-search {
  width: 0.22rem;
  height: 0.22rem;
  display: inline-block;
  background-image: url("~@/assets/icon/icon-search.png");
	@media screen and (max-width: 800px) {
		background-image: url("~@/assets/icon/icon-search-w.png");
	}
}
.shop-com-search {
  .search-wrap {
    margin-right: 0.2rem;
    position: relative;
    top: 0;
    left: 0;
    .infinite-list {
      position: absolute;
      z-index: 9999;
      top: 0.4rem;
      left: 0;
      width: 100%;
      box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.06);
    }
  }
  .infinite-list {
    padding: 0.16rem 0.16rem 0.32rem;
    background-color: #fff;
    .goods-list-wrap {
      height: 1.8rem;
      overflow-y: auto;
    }
  }
  .search-result-bar {
    padding: 0.08rem;
    color: $color;
    font-size: 0.14rem;
  }
  .input-wrap {
    display: flex;
    align-items: center;
    border-radius: $radius;
	.search-cont{
		position: absolute;
		left: .1rem;
	}
    ::v-deep .el-input__inner {
		padding-left: .4rem;
		height: .38rem;
		background:none;
    }
  }
  .message {
    color: #717171;
    text-align: center;
    padding-top: 0.1rem;
  }
  @media screen and (max-width: 540px) {
    .search-wrap {
      margin-right: 0;
      flex: initial;
    }
    .input-wrap {
      border: none;
      padding-top: 0.12rem;
      padding-bottom: 0.1rem;
	  .search-cont{
	  	position: relative;
		left: 0;
	  }
	  .search-input{
		  padding: 0 .16rem;
	  }
	  ::v-deep .el-input__inner {
		padding-left: .16rem;
		height: .38rem;
		background:none;
	  }
    }
    .search-input {
      display: none;
    }
    .fixed-mode {
      position: absolute;
      padding: 0;
      top: 0;
      left: 0;
      width: 100%;
      background-color: $fc-mask;
      .icon-search {
        background-image: url("~@/assets/icon/icon-left.png");
      }
      .search-input {
        display: block;
      }
      .infinite-list {
        top: 0.7rem;
        height: 64vh;
        background-color: #fff;
        .goods-list-wrap {
          height: 60vh;
        }
      }
      .input-wrap {
        box-shadow: 0rem 0.03rem 0.04rem 0rem rgba(182, 182, 182, 0.2);
      }
    }
  }
}
</style>

