<template>
  <div class="shop-goods-more">
			<div class="section section-histry section-pc max-width">
			  <div class="section-content swiper-container histry">
			    <div class="swiper-wrapper">
			      <div
			        class="swiper-slide slider-good"
			        v-for="(item, idx) in goodsList"
			        :key="idx"
			      >
			        <goods :goodsInfo="item"></goods>
			      </div>
			    </div>
			  </div>
			  <div class="btn-page" v-if="goodsList.length>4">
				  <div class="histry-button-prev"></div>
				  <div class="histry-button-next"></div>
			  </div>
			</div>
			
			<div class="section section-h5">
			  <div class="list-cont">
				  <template v-for="(item, idx) in goodsList">
					  <div
					    class="list-item"
					    :key="idx"
						v-if="idx<4" 
					  >
					    <goods :goodsInfo="item"></goods>
					  </div>
				  </template>
			  </div>
			</div>
  </div>
</template>
<script>
import "swiper/dist/js/swiper";
import "swiper/dist/css/swiper.css";
import Swiper from "swiper";
import goods from "../goods/goods.vue";
export default {
  components: { goods },
  data() {
    return {};
  },
  props: {
    goodsList: {
      type: Array
    },
  },
  watch: {
    goodsList: {
      handler(val, oldVal) {
		  this.$nextTick(() => {
		  	this.initSwiper()
		  })
      },
    },
  },
  computed: {},
  mounted() {
	this.$nextTick(() => {
		this.initSwiper()
	})
  },
  methods: {
    initSwiper() {
      new Swiper(".histry", {
        //direction: 'vertical', // 垂直切换选项
        //mousewheel: true, //滚轮
        slidesPerView: 4,
    	spaceBetween: 0,
        grid: {
          fill: "column",
          rows: 1,
        },
        // autoplay: {
        //   //自动开始
        //   delay: 2500, //时间间隔
        //   disableOnInteraction: false, //*手动操作轮播图后不会暂停*
        // },
        loop: true, // 循环模式选项
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".histry-button-next",
          prevEl: ".histry-button-prev",
        },
    	slidesPerGroup: 4,
      });
    },
  },
};
</script>
<style lang='scss' scoped>
	.section-histry{
		position: relative;
		.section-content{
			padding: 15px;
		}
		.btn-page{
			display: flex;
			justify-content: center;
		}
		.histry-button-prev{
			width: 46px;
			height: 46px;
			background: url('~@/assets/icon/icon-banner-left-n.png') no-repeat center;
			background-size: contain;
			cursor: pointer;
			z-index: 9;
			transition: all .2s ease-in;
			&:hover {
				transition: all .2s ease-in;
				background: url('~@/assets/icon/icon-banner-left.png') no-repeat center;
				background-size: contain;
			}
			&:focus{
				outline:none;
				-webkit-tap-highlight-color:rgba(0,0,0,0);
			}
		}
		.histry-button-next{
			width: 46px;
			height: 46px;
			background: url('~@/assets/icon/icon-banner-right-n.png') no-repeat center;
			background-size: contain;
			cursor: pointer;
			z-index: 9;
			transition: all .2s ease-in;
			margin-left: 12px;
			&:hover {
				transition: all .2s ease-in;
				background: url('~@/assets/icon/icon-banner-right.png') no-repeat center;
				background-size: contain;
			}
			&:focus{
				outline:none;
				-webkit-tap-highlight-color:rgba(0,0,0,0);
			}
		}
	
	}
	.section-pc{
		display: block;
	}
	.section-h5{
		display: none;
	}
	@media screen and(max-width:800px) {
		.section-pc{
			display: none;
		}
		.section-h5{
			display: block;
			.list-cont{
				display: flex;
				flex-wrap: wrap;
				padding: 0 .1rem .28rem;
				.list-item{
					width: 50%;
					padding: .08rem .1rem;
				}
			}
		}
	}

</style>
