
<template>
  <div class="shop-com-goodsattr" v-if="goods">
    <div class="goods-info-wrap">
      <div class="goods-name hidden-txt-1">
        {{ goods.commodity && goods.commodity.name }}
      </div>

      <div class="goods-author hidden-txt-1">
        <div class="artist hidden-1">
          <!-- <img class="avatar" :src="goods.author.cover" /> -->
          首发方：{{ goods.author && goods.author.nickname }}
        </div>
      </div>
      <div class="price">
        {{ $common.formatMoney(goods.price) }}
      </div>
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
    return {};
  },
  methods: {},
};
</script>

<style lang='scss' scoped>
.shop-com-goodsattr {
  .goods-info-wrap {
    .goods-name {
      font-size: 0.14rem;
      font-weight: 400;
      color: $fc-title;
      line-height: 0.25rem;
      margin-top: 0.16rem;
    }
    .goods-author {
      font-size: 0.13rem;
      font-weight: 400;
      align-items: center;
      color: $fc-label;
      margin-top: 0.08rem;
      .artist {
        display: flex;
      }
    }
    .price {
      font-size: .14rem;
	  line-height: .28rem;
      font-weight: 500;
      color: $color-btn;
      margin-top: .08rem;
    }
    .btn-buy {
      display: none;
    }
  }
  @media screen and (max-width: 540px) {
  	.goods-info-wrap {
  	  .goods-name {
  	    font-size: 0.13rem;
  	    line-height: 0.19rem;
  	    margin-top: 0.06rem;
  	  }
  	  .goods-author {
  	    font-size: 0.11rem;
  	    margin-top: 0.04rem;
		line-height: 0.15rem;
  	    .artist {
  	      display: flex;
  	    }
  	  }
  	  .price {
  	    font-size: .14rem;
		line-height: .2rem;
  	    font-weight: 500;
  	    margin-top: .08rem;
  	  }
  	}
  }
}
</style>