<template>
  <div class="lite-notice flex-page">
    <div class="flex-wrapper">
      <!-- banner -->
      <div class="banner"></div>
      <div class="max-width">
        <!-- 切换tab -->
        <van-tabs  v-model="active" @change="tabChange">
          <van-tab
            :title="item.name"
            v-for="(item, index) in tabData"
            :key="index"
          >
          </van-tab>
        </van-tabs>
        <div v-if="loading" class="loading">加载中...</div>
        <!-- 列表 -->
        <div class="notice-wrap">
          <notice-item
            v-for="(subItem, subInd) in list"
            :key="subInd"
            :detail="subItem"
          />
        </div>
        <!-- 分页 -->
        <pagination :curentPage="form.pageCount"   :total="total" @handlerPre="handlerPre" @handerNext="handerNext" />
        <!-- 空 -->
        <empty v-if="list.length == 0 && !loading" page="notice" />
      </div>
    </div>
    <g-footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabList: [],
      list: {},
      loading: false,
      tabData: [
        {
          name: "新闻动态",
          api: "",
        },
        {
          name: "平台通知",
          api: "",
        },
      ],
      form:{
        pageCount: 1,
        pageSize: 16,
      },
      active: 0,
      curentPage:1,
      total:10,
    };
  },
  filters:{
    time: function(val){
      if(val){
        return  val.replace(/\//g,'.')
      }else {
        return '-'
      }    
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    getCategoryList () {
      this.$api.categoryList({}).then(res => {
        this.tabData = res.data.data.filter((item) => {
          return item.hidden == 0
        })
        this.getList()
      })
    },
    getList () {
      this.list = []
      this.loading = true
      this.form.categoryId = this.tabData[this.active].id
      this.$api.newsList(this.form).then(res => {
        this.loading = false
        this.list = res.data.data.records
        this.total = res.data.data.total
      })
    },
    tabChange (i) {
      console.log(i)
      this.form.categoryId = this.tabData[i].id
      this.getList()
    },
    handlerPre() {
      if( this.form.pageCount < 2){
        return
      }
      this.form.pageCount--
      this.this.getList()
    },
    handerNext() {
      if(this.list.length < this.form.pageSize ){
        return
      }
      this.form.pageCount++
      this.getList()
    }
  }
}
</script>

<style lang="scss">
.lite-notice {
  padding-top: .8rem;
  .banner {
    background: url("../assets/images/nft/notice-banner.png") no-repeat center;
    background-size: auto 100%;
    height: 16.7vw;
  }
  .loading{
    text-align: center;
    padding-top: 1rem;
    color: #999;
  }
  .van-tabs{
    margin: .15rem 0;
    .van-tabs__nav{
      justify-content: center;
      .van-tab{
        flex: none;
        font-size: .16rem;
        color: $fc-label;
        line-height: .22rem;
        padding: 0 .88rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
      }
      .van-tabs__line{
        height: 2px;
        background-color: $color-theme;
      }
    }
  }
}
@media screen and(max-width:800px) {

}
@media screen and (max-width: 540px) {
  .lite-notice {
    padding-top: .44rem;
    .banner {
      width: 100%;
      height: 1.1rem;
    }
    .van-tabs{
      margin: .05rem 0 0 0;
      .van-tabs__nav{
        justify-content: center;
        .van-tab{
          flex: none;
          font-size: .12rem;
          color: $fc-label;
          line-height: .17rem;
          padding: 0 .28rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
        }
        .van-tabs__line{
          height: 2px;
          background-color: $color-theme;
        }
      }
    }
  }
}
</style>
