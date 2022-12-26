<template>
  <div
    class="activity-detail"
  >
    <div class="max-width">
      <div class="pic">
        <img :src="detail.styleJson.sale_img_pc" alt="" />
      </div>
      <div class="detail-info">
        <h4 class="title">{{ detail.name }}</h4>
        <div class="header" slot="header">
          <!-- <span v-if="detail.userCalendarStatus" :class="`status status`+detail.userCalendarStatus">{{ status[detail.userCalendarStatus] }}</span> -->
          <span v-if="!detail.userCalendarStatus" :class="`status status2`">{{ status[2] }}</span>
        </div>
        <div class="name">
          <label for="" class="lable">首发方：</label><span>{{detail.commodity && detail.commodity.authorName}}</span>
        </div>
        <div class="price-wrap">
          <strong class="price"> {{ $common.formatMoney(detail.commodity&&detail.commodity.price)}} </strong>
          <strong class="amount"></strong>限量{{detail.amount}}份
        </div>
        <div class="times">
          <div class="info-cont">
            <div>
              <strong class="lable">抽签报名时间：</strong>
              <span>{{ detail.signStartTime | time }}-{{ detail.signEndTime | time }}</span>
            </div>
            <div class="mt">
              <strong class="lable">优先购买时间：</strong>
              <span
                >{{ detail.startPriorityTime | time }}-{{
                  detail.endPriorityTime | time
                }}</span
              >
            </div>
          </div>
          <div v-if="_sign == 1" class="btn btn-disabled">已报名</div>
          <div v-if="_sign == 3" class="btn btn-disabled">报名</div>
          <div v-if="_sign == 4" class="btn btn-primary" @click="onSign">
            报名
          </div>
          <div class="line"></div>
          <div class="">
            <div>
              <strong class="lable">正式购买时间：</strong>
              <span class="text"
                >{{ detail.startBuyTime | time }}-{{ detail.endBuyTime | time }}</span
              >
            </div>
            <div class="mt">
              <strong class="lable">盲盒开启时间：</strong>
              <span>{{ detail.blindBoxOpenTime | time }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div v-if="$common._isMobile()" class="mobile">
          <img
            v-for="(item, index) in detail.styleJson.saleImgPcList"
            :key="index"
            :src="item.value"
            alt=""
            srcset=""
          />
        </div>
        <div v-else>
          <img
            v-for="(item, index) in detail.styleJson.saleImgPcList"
            :key="index"
            :src="item.value"
            alt=""
            srcset=""
          />
        </div>
      </div>
    </div>
    <g-footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {
        styleJson: {},
        signStatus: false,
        actKey: "",
        qqPath: "",
        signed: false,
      },
      status: [
        "",
        "未报名",
        "已报名",
        "已中签",
        "未中签",
        "未开签",
        "无",
      ],
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
  computed: {
    isShowBuyTime() {
      return this.detail.startPriorityTime && this.detail.endPriorityTime;
    },
    userInfo() {
      return this.$store.state.user_info;
    },
    buyStatus() {
      if (this.detail.endBuyTime) {
        const startTime = new Date(
          this.detail.startBuyTime.replace(/-/gi, "/")
        ).getTime();
        const endTime = new Date(
          this.detail.endBuyTime.replace(/-/gi, "/")
        ).getTime();
        const nowTime = new Date().getTime();
        if (nowTime < endTime && nowTime > startTime) {
          if (this.detail.commodity && this.detail.commodity.saleRecordUuid) {
            return true;
          } else {
            return false;
          }
        } else {
          //过时
          return false;
        }
      } else {
        //不能购买
        return false;
      }
    },
    _sign() {
      if (this.signStatus) {
        return 1;
      }
      if (this.signed) {
        //报名了
        return 1;
      } else {
        //没报名
        if (this.detail.signEndTime) {
          const startTime = new Date(
            this.detail.signStartTime.replace(/-/gi, "/")
          ).getTime();
          const endTime = new Date(
            this.detail.signEndTime.replace(/-/gi, "/")
          ).getTime();
          const nowTime = new Date().getTime();
          if (nowTime < endTime && nowTime > startTime) {
            //可报名
            return 4;
          } else {
            //过时
            return 3;
          }
        } else {
          //没报名&&过时
          return 3;
        }
      }
    },
  },

  created() {
    this.getDetail();
  },
  methods: {
    goBuy() {
      this.$router.push(
        `/goods_detail/${this.detail.commodity.saleRecordUuid}`
      );
    },
    getDetail() {
      this.$api
        .activityDetail({
          uuid: this.$route.params.id,
        })
        .then((res) => {
          if (res.data.code == 200) {
            res.data.data.styleJson = JSON.parse(res.data.data.styleJson);
            this.detail = res.data.data;
            this.actKey = this.detail.activityConfigKey;
            if (this.actKey) {
              this.getUserSignStatus();
              this.getActivityDetail();
            }
          } else {
            this.$message(res.data.message);
          }
        });
    },
    // 查看是否已报名
    getUserSignStatus() {
      if (this.userInfo.userUuid) {
        this.$api.activity_getResult({ actKey: this.actKey }).then((res) => {
          if (res.data.code == 200 && res.data.data) {
            this.signStatus = res.data.data;
          }
        });
      }
    },
    // 报名
    onSign() {
      if (this.signStatus) {
        this.$message.warning("您已报名！");
        return;
      }
      this.sign();
    },
    sign() {
      this.$api.activity_signUp({ actKey: this.actKey }).then((res) => {
        if (res.data.code == 200 && res.data.data) {
          this.getUserSignStatus();
          this.$message.success("报名成功");
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 校验是否为活动有效期
    activityValid() {
      // 活动是否有效
      this.$api.activity_valid({ actKey: this.actKey }).then((res) => {
        if (res.data.data.status == 1) {
          // 有效
        } else if (res.data.data.status == 2) {
          // 活动未开始
          this.$message.error("活动未开始，请耐心等待！");
        } else if (res.data.data.status == 3) {
          // 活动已结束
          this.$message.error("活动已结束！");
        }
      });
    },
    // 获取活动详情
    getActivityDetail() {
      const res = this.$api.activity_getResultV2({
        actKey: this.actKey,
      });
      if (res.data.code == 200 && res.data.data) {
        this.signed = res.data.data;
      } else {
        console.log("抽签活动已停用！");
      }
    },
  },
};
</script>

<style lang="scss">
.activity-detail {
  background-color: #f3f3f3;
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  padding-top: .8rem;
	.max-width{
		max-width: 1066px;
		padding: 0;
	}
  .pic {
    img {
      width: 100%;
    }
  }
  .detail-info {
    background: #ffffff;
    box-shadow: 0px 2px 8px 0px rgba(204, 204, 204, 0.44),
      inset 0px -1px 2px 0px rgba(255, 255, 255, 0.82);
    border-radius: 4px;
    backdrop-filter: blur(7px);
    padding: 0.3rem;
    margin-top: 0.6rem;
    .name {
      font-size: 0.12rem;
      margin-top: 0.15rem;
      .lable {
        color: $fc-label;
      }
    }
    .title {
      font-size: 0.18rem;
    }
    .btn {
      width: 1.43rem;
      flex: none;
    }
    .price-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.2rem;
      border-bottom: 1px dashed $color-border;
      padding-bottom: 0.24rem;
      .times {
        font-size: 0.14rem;
      }
      .price {
        font-size: 0.2rem;
        color: $color-sub4;
      }
      .amount {
        font-size: 0.12rem;
        color: $fc-label;
      }
    }
    .times {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .13rem 0 0 0;
      line-height: .19rem;
      > .info-cont:nth-child(1) {
        padding: .15rem .28rem .12rem 0;
        margin-right: .28rem;
        border-right: 1px dashed $color-border;
      }
      .info-cont{
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .lable{
        font-size: .12rem;
        span{
            color: $fc-title;
        }
      }
      .mt {
        margin-top: 0.12rem;
      }
    }
    .header {
      display: none;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.1rem;
      .status {
        width: 55px;
        height: 20px;
        line-height: 20px;
        color: #fff;
        text-align: center;
        background: #bbbbbb;
        border-radius: 0.12rem 0 0.12rem 0;
        margin-top: .08rem;
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
  .content {
    margin-bottom: 1.99rem;
    img {
      width: 100%;
      display: block;
      margin-top: 0.6rem;
    }
  }
  .line {
    height: 100%;
    border-right: 0.01rem solid $color-border;
    margin: 0 0.28rem;
  }
  @media screen and(max-width:800px) {
    .detail-info{
      margin-top: .3rem;
      margin: .3rem .16rem 0;
      background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
      box-shadow: 0px 1px 21px 0px rgba(67,39,39,0.06);
      border-radius: 2px;
	  padding: .16rem;
      .times{
        display: block;
        > .info-cont:nth-child(1) {
          padding: 0;
          margin-right: 0;
          border-right: 0;
          border-bottom: 1px dashed $color-border;
          margin-bottom: .16rem;
        }
        .info-cont{
          width: 100%;
          display: block;
        }
        .btn{
          width: 100%;
          margin: .15rem 0;
        }
      }
      .header {
        display: flex;
      }
    }
    .content {
      margin-bottom: .6rem;
      img {
        width: 100%;
        display: block;
        margin-top: .3rem;
      }
    }
  }
  @media screen and(max-width:540px) {
    padding-top: .44rem;
  }
}
</style>
