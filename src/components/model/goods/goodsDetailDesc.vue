
<template>
  <!-- 商品详情页 - 商品描述  -->
  <div
    class="v1-panel s2 goods-desc"
    v-if="goods && goods.commodity && goods.commodity.description"
  >
    <div class="panel-title">商品描述</div>
    <div class="panel-content">
      <div
        class="html-txt"
        v-html="goods.commodity && goods.commodity.description"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {},
  data() {
    return { goods: null };
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
  .html-txt{
    color: $fc-main;
    line-height: .24rem;
	margin-left: .1rem;
  }
  .panel-title{
	  margin-left: .1rem;
  }
  @media screen and (max-width: 800px) {
	  .html-txt{
	  	margin-left: 0;
	  }
	  .panel-title{
	  	  margin-left: 0;
	  }
  }
</style>