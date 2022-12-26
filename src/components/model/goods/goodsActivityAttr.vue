
<template>
  <div class="shop-com-activity-goodsattr" v-if="goods">
    <div class="goods-info-wrap">
      <div class="goods-name hidden-txt-1">
        {{ goods.name }}
      </div>

      <div class="goods-author hidden-txt-1">
        <div class="artist hidden-1">
          <label for="">首发方：</label>
          <span class="nickname">{{
            goods.commodity && goods.commodity.authorName
          }}</span>
        </div>
      </div>
      <div class="price">
        <span>{{
          $common.formatMoney(goods.commodity && goods.commodity.price)
        }}</span>
        <span class="number">限量{{ goods.amount }}份</span>
      </div>

      <div class="time">
        <van-swipe style="height: 100%" :autoplay="3000" vertical :show-indicators="false">
          <van-swipe-item>
            <div class="time-list-item hidden-txt-1">
              抽签报名时间:{{ goods.signStartTime | time }}-{{ goods.signEndTime | time }}
            </div>
          </van-swipe-item
          >
          <van-swipe-item
            ><div class="time-list-item hidden-txt-1">
              藏品开启时间:{{ goods.blindBoxOpenTime | time }}
            </div></van-swipe-item
          >
          <van-swipe-item>
            <div class="time-list-item hidden-txt-1">
              优先购时间:{{ goods.startPriorityTime | time }}-{{
                goods.endPriorityTime | time
              }}
            </div></van-swipe-item
          >
          <van-swipe-item
            ><div class="time-list-item hidden-txt-1">
              正式购买时间:{{ goods.startBuyTime | time }}-{{ goods.endPriorityTime | time }}
            </div></van-swipe-item
          >
        </van-swipe>
      </div>

      <div class="more btn-primary">查看详情></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    goods: {
      type: Object,
    },
  },
  data() {
    return {
      newGoods: {},
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
  created() {},
  methods: {},
};
</script>

<style lang='scss' scoped>
.shop-com-activity-goodsattr {
  .goods-info-wrap {
    padding: 0;
    .goods-name {
      font-size: 0.14rem;
      font-weight: 400;
      color: $fc-title;
      line-height: 0.22rem;
      margin-top: 0.08rem;
      height: 0.22rem;
    }
    .goods-author {
      font-size: 0.13rem;
      font-weight: 400;
      align-items: center;
      color: $fc-sub;
      margin-top: 0.08rem;
      .artist {
        display: flex;

        .avatar {
          width: 0.16rem;
          height: 0.16rem;
          margin-right: 0.06rem;
          border-radius: 100%;
        }
        label {
          color: $fc-label;
          font-size: 0.12rem;
        }
        .nickname {
          color: #333333;
          font-size: 0.12rem;
        }
      }
    }
    .price {
      font-size: 0.14rem;
      font-weight: bold;
      color: $color-sub4;
      margin-top: 0.27rem;
      display: flex;
      justify-content: space-between;
      .number {
        color: $fc-label;
        font-size: 0.12rem;
        font-weight: 400;
      }
    }
    .btn-buy {
      display: none;
    }
    .time {
      width: 100%;
      height: 36px;
      background: #f6f6f6;
      overflow: hidden;
      position: relative;
      margin-top: 0.16rem;
      .time-list {
        padding-left: 0.1rem;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        animation: slider 8s steps(4) infinite;
        -webkit-animation: slider steps(4) 8s infinite;
      }
      .time-list-item {
        height: 36px;
        font-weight: bold;
        font-size: 12px;
        line-height: 36px;
        color: $fc-title;
        padding-left: .1rem;
      }
    }
    .more {
      line-height: 0.36rem;
      margin-top: 0.12rem;
      font-size: 12px;	
      text-align: center;
    }
  }

  @keyframes slider {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-144px);
    }
  }
}
</style>