
<template>
  <div class="shop-com-goods-detail-attr">
    <div class="v1-panel goods-attr">
      <div class="panel-title">商品属性</div>
      <div class="panel-content">
        <div class="line">
          <label for="">合约地址</label>
          <div class="value">{{ goods.contractAddress||'上链确认中' }}</div>
        </div>
        <div class="line">
          <label for="">认证标识</label>
          <div class="value">{{ goods.nftId||'上链确认中' }}</div>
        </div>
        <div class="line">
          <label for="">认证标准</label>
          <div class="value">{{ goods.chainContract||'上链确认中' }}</div>
        </div>
        <div class="line">
          <label for="">认证网络</label>
          <div class="value">{{ goods.chainName||'上链确认中' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {},
  data() {
    return { goods: {} };
  },
  methods: {
    init(goods) {
      console.log(goods);
      this.goods = goods;
    },
  },
};
</script>

<style lang='scss' scoped>
.shop-com-goods-detail-attr {
  .goods-attr {
    .line {
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.16rem;
      line-height: 0.19rem;
      font-size: 0.14rem;
      label {
        color: #999999;
      }
      .value {
        color: #333333;
      }
    }
    padding: 0.16rem 0;
    border-bottom: 0.01rem dashed $bc-dashed;
  }
}
</style>