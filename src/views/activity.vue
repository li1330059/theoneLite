<template>
  <div class="activity flex-page">
    <div class="flex-wrapper">
      <div class="banner"></div>
      <div class="activity-title max-width">
        <span class="name">发售日历</span>
      </div>
      <div v-if="loading" class="loading">加载中...</div>
      <div class="good-list max-width">
        <div class="goods-wrap" v-for="(item, idx) in list" :key="idx">
          <goods
            :goodsInfo="item"
            goodsClass="goods-activity-box"
            goodsTye="activity"
            path="activity"
            :isShowPreview="false"
          >
            <div class="header" slot="header">
              <span v-if="item.activityStatus" :class="`progress progress`+item.activityStatus">{{ progress[item.activityStatus] }}</span>
              <span v-if="item.userCalendarStatus" :class="`status status`+item.userCalendarStatus">{{ status[item.userCalendarStatus] }}</span>
            </div>
          </goods>
        </div>
      </div>
      <!-- 分页 -->
      <pagination :curentPage="form.pageIndex"   :total="total" @handlerPre="handlerPre" @handerNext="handerNext" />
      <!-- 空 -->
      <empty v-if="list.length == 0 && !loading" page="activity"  />
    </div>
    <g-footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      progress: [
        "",
        "等待抽签",
        "抽签中",
        "等待购买",
        "正式购买中",
        "等待开启盲盒",
        "盲盒已开启",
        "无",
      ],
      status: [
        "",
        "未报名",
        "已报名",
        "已中签",
        "未中签",
        "未开签",
        "无",
      ],
      total:0,
      loading: false,
      form: {
        pageIndex: 1,
        pageSize: 20,
      },
    };
  },
  filters:{
    time: function(val){
      if(val){
        return  val.replace(/\-/g,'.')
      }else {
        return '-'
      }    
    }
  },
  async created() {
     this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      const res = await this.$api.activityList(this.form);
      this.loading = false
      if (res.data.code == 200) {
        res.data.data.records.forEach(element => {
          element.styleJson = JSON.parse(element.styleJson)
        });
        this.list = res.data.data.records;
        this.total = res.data.data.total
      }
    },
     handlerPre() {
      if( this.form.pageIndex < 2){
        return
      }
      this.form.pageIndex--
      this.this.getList()
    },
    handerNext() {
      if(this.list.length < this.form.pageSize ){
        return
      }
      this.form.pageIndex++
      this.getList()
    }
  },
};
</script>

<style lang="scss">
.activity {
	padding-top: .8rem;
  .max-width {
    max-width: 1200px;
    margin: 0 auto;
	padding: 0 .1rem;
  }
  .banner {
    background: url(../assets/images/nft/activity-banner.png) no-repeat center;
    background-size: auto 100%;
    height: 16.7vw;
  }
  .activity-title {
    margin: 0.3rem auto;
    .name {
      color: $color-theme;
      font-size: 0.14rem;
      padding-bottom: 0.08rem;
      position: relative;
	  margin-left: .1rem;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 13px;
        width: 30px;
        height: 2px;
        background: $color-theme;
        border-radius: 2px;
      }
    }
  }
  .loading{
    padding-top: 1rem;
    text-align: center;
    color: #999;
  }
  .good-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: .41rem;
    .goods-wrap {
      width: 33.3%;
      flex: none;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.1rem;
        .progress {
          color: #2fba8e;
          padding: 0.08rem 0.28rem 0.08rem 0.1rem;
        }
        .progress1,.progress3,.progress5 {
          background: url(../assets/images/nft/activity-tag-y.png) no-repeat center;
		  background-size: 100% 100%;
        }
        .progress2,.progress4,.progress6{
		  background: url(../assets/images/nft/activity-tag-n.png) no-repeat center;
		  background-size: 100% 100%;
        }
        .status {
          width: 55px;
          height: 20px;
          line-height: 20px;
          color: #fff;
          text-align: center;
          background: #bbbbbb;
          border-radius: 0.12rem 0 0.12rem 0;
        }
        .status1,.status2,.status5 {
          background: #ff952f;
        }
        .status4 {
          background: #bbbbbb;
        }
        .status3 {
          background: #2fba8e;
        }
      }
    }
  }
  .shop-com-goods{
	  padding: 0;
	  margin: .12rem;
	  &:hover {
	    box-shadow: none;
	    border: none;
	  }
  }
}
@media screen and (max-width: 800px) and (min-width: 541px) {
	.goods-wrap {
		width: 49%!important;
	}
}
@media screen and (max-width: 540px) {
  .activity {
    padding: 0.44rem 0;
    .max-width {
      max-width: 100%;
      padding: 0;
    }
    .banner {
      height: 1.3rem;
      background: url(../assets/images/nft/activity-banner-m.png) no-repeat
        center;
      background-size: cover;
    }
    .activity-title {
      margin: 0.2rem 0.15rem;
      .name {
		display: none;
      }
    }
    .good-list {
      display: block;
      padding: 0 0.16rem;
      .goods-wrap {
        width: 100%;
        margin-right: 0;
        margin-top: 0.24rem;
        padding: 0;
        flex: none;
        :nth-child(3n) {
          margin-right: 0;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.1rem;
          .progress {
          }
          .status {
            width: 55px;
            height: 20px;
            line-height: 20px;
            color: #fff;
            text-align: center;
            background: #bbbbbb;
            border-radius: 0.1rem 0 0.12rem 0;
          }
          .status1,.status2,.status5 {
            background: #ff952f;
          }
          .status4 {
            background: #bbbbbb;
          }
          .status3 {
            background: #2fba8e;
          }
        }
      }
    }
	.shop-com-goods{
		  padding: 0;
		  margin: 0;
		  &:hover {
		    box-shadow: none;
		    border: none;
		  }
	}
  }
}
</style>
