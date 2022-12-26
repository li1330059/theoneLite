<template>
  <div class="shopping-home">
    <!-- banner -->
    <div class="banner swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide slide1" v-for="(item,index) in bannerData" :key="index">
			<div class="slide-bg" v-lazy:background-image="item.cover"></div>
			<div class="slide-cont">
				<div class="sub">
				  <div class="text name">{{ item.name }}</div>
				  <div class="text" v-html="item.describe"></div>
				  <a :href="item.returnUrl" target="_blank">
				    <div class="btn btn-primary">
				  	{{ item.buttonText || "立即购买" }}
				    </div>
				  </a>
				</div>
				<img :src="item.cover" alt="" srcset="" />
			</div>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <!-- 快捷导航 -->
    <div class="nav max-width">
      <div class="nav-item nav-bg">
        <h6 class="title">活动日历</h6>
        <div class="text">{{activityItem&&activityItem.name}}</div>
		<div class="time">{{activityItem&&activityItem.activityDate}}</div>
        <div class="info">
		  <span class="btn btn-primary"><router-link to="/activity">查看更多</router-link></span>
        </div>
      </div>
      <div class="nav-item">
        <h6 class="title">新闻公告</h6>
        <div class="text">
          {{newsItem&&newsItem.name}}
        </div>
		<div class="time" v-if="newsItem&&newsItem.releaseTime">{{dateFormat(newsItem.releaseTime)}}</div>
        <div class="info">
		  <span class="btn btn-primary"><router-link to="/notice">查看更多</router-link></span>
        </div>
      </div>
    </div>
	<div class="section-title"></div>
	<goods-more :goodsList="histyList"></goods-more>
	<shop-join/>
    <g-footer />
  </div>
</template>

<script>
import "swiper/dist/js/swiper";
import "swiper/dist/css/swiper.css";
import utils from "@utils/utils";
import Swiper from "swiper";
import goodsMore from "../components/model/goods/goodsMore.vue";
import shopJoin from "../components/shopJoinWin.vue";
export default {
  components: { goodsMore,shopJoin },
  data() {
    return {
      histyList: [],
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
	  bannerData:[],
	  activityItem:{},
	  newsItem:{},
	  dateFormat: utils.dateFormat,
    };
  },
  watch: {
    bannerData: {
      handler(val, oldVal) {
		  if(val.length>1){
			  this.$nextTick(() => {
			  	this.initSwiper()
			  })
		  }
      },
    },
  },
  mounted() {
    
  },
  created() {
	this.getBanner();
	this.getActivity();
	this.getNews();
    this.getHistry();
  },
  methods: {
	  initSwiper(){
		  // banner轮播
		  new Swiper(".banner", {
		    //direction: 'vertical', // 垂直切换选项
		    //mousewheel: true, //滚轮
		    autoplay: {
		      //自动开始
		      delay: 25000, //时间间隔
		      disableOnInteraction: false, //*手动操作轮播图后不会暂停*
		    },
		    loop: true, // 循环模式选项
		  
		    // 如果需要分页器
		    pagination: {
		      el: ".swiper-pagination",
		      clickable: true, // 分页器可以点击
		    },
		  
		  
		    // 如果需要滚动条
		    scrollbar: {
		      el: ".swiper-scrollbar",
		    },
		  });
	  },
	  async getBanner() {
	    const res = await this.$api.bannerList({pageCount: 1,pageSize: 10,type: 1});
	    if (res.data.code == 200) {
	  		this.bannerData= res.data.data.records
	    }
	  },
	  async getActivity() {
	    const res = await this.$api.activityList({pageIndex: 1,pageSize: 1,});
	    if (res.data.code == 200) {
			this.activityItem = res.data.data.records[0]
	    }
	  },
	  async getNews() {
	    const res = await this.$api.topList({pageCount: 1,pageSize: 1,});
	    if (res.data.code == 200) {
	  		this.newsItem = res.data.data[0]
	    }
	  },
    async getHistry() {
      const res = await this.$api.getGoodList(this.form);
      if (res.data.code == 200) {
        this.histyList = res.data.data.records;
      }
    },
  },
};
</script>

<style lang="scss">
.shopping-home {
  .banner {
    height: 520px;
    .slide1 {
		.slide-bg{
			width: 100%;
			height: 100%;
			background-size: cover;
			background-position: center center;
			background-color: white;
			opacity: 0.3;
			filter: blur(8px);
			-webkit-mask: linear-gradient(white, transparent);
			position: absolute;
			z-index: -1;
		}
	  .slide-cont{
		  width: 1190px;
		  display: flex;
		  align-items: center;
		  justify-content: space-between;
		  margin: 1.35rem auto 0;
		  img {
		  		width: 5.44rem;
		  		height: 3.04rem;
		  		border-radius: .08rem;
		  }
		  .sub{
		  		  width: 588px;
		  		  font-size: .18rem;
		  		  color: $fc-main;
		  		  .text{
		  			  margin-bottom: .24rem;
					  font-size: .16rem;
					  color: #999999;
					  line-height: .22rem;
					  display: -webkit-box;
					  overflow: hidden;
					  -webkit-line-clamp: 2;
					  -webkit-box-orient: vertical;
		  		  }
				  .name{
					  font-size: .32rem;
					  font-weight: 500;
					  color: #333333;
					  line-height: .45rem;
				  }
		  		  .btn{
		  			  width: 2rem;
		  		  }
		  }
	  }
    }
    .swiper-pagination-bullet {
      background-color: #DEDEDE;
      opacity: 1;
      width: 40px;
      height: 4px;
	  border-radius: 0;
    }
    .swiper-pagination-bullet-active {
      transition: width 0.25s;
      width: 40px;
	  height: 4px;
      background-color: $color-theme;
    }
  }
  .max-width {
    max-width: 1230px;
    padding: 0;
    margin: .6rem auto 1.1rem;
	.shop-com-goods{
		padding: .2rem;
	}
  }
  .nav {
    display: flex;
    justify-content: space-between;
	padding: 0 15px;
    .nav-item {
      padding: 22px 25px;
	  background: url(../assets/images/home/home-nav-bg.png) no-repeat center;
	  background-size: 100% 100%;
	  border-radius: 8px;
      width: 49%;
	  display: flex;
	  flex-direction: column;
	  border: 3px solid rgba(0, 0, 0, 0);
	  box-shadow: 0px 2px 42px 0px rgba(67,39,39,0.0400);
	  transition: all .3s ease-in;
	  .btn{
		  width: 112px;
		  line-height: .34rem;
		  a{
			  color: #ffffff;
		  }
	  }
      .title {
        color: $fc-title;
        font-size: .18rem;
		line-height: .2rem;
        font-weight: 600;
      }
      .text {
        font-size:.16rem;
        color: $fc-title;
        margin-top: 16px;
		line-height: .2rem;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		-webkit-line-clamp:2;
      }
      .info {
        display: flex;
        justify-content: flex-end;
		margin-top: auto;
      }
      .time {
        font-size: 12px;
        color: #999;
		line-height:.2rem;
		margin-top: 8px;
      }
	  &:hover {
		box-shadow: 0px 2px 42px 0px rgba(67,39,39,0.090);
		border-radius: 8px;
		border: 3px solid #FFFFFF;
		transition: all .3s ease-in;
	  }
    }
		.nav-bg{
			background: url(../assets/images/home/home-nav-bg.png) no-repeat center;
			background-size: 100% 100%;
		}
  }
  .section-title {
    height: 80px;
    background: url("../assets/images/home/home-title.png") no-repeat center;
    background-size: auto 100%;
    margin-bottom: .04rem;
  }
  .slider-good {
		padding-bottom: .5rem;
  }

	@media screen and (min-width: 800px) and (max-width: 1200px) {
		.banner {
			height: 4rem;
			.slide1 {
				.slide-cont{
				  width: 90%;
				  display: flex;
				  align-items: center;
				  justify-content: center;
				  margin: 1rem auto 0;
				  img {
					width: 4.6rem;
					height: 2.63rem;
					border-radius: .08rem;
				  }
				  .sub{
					  width: 1100px;
					  margin:0 auto;
					  font-size: .18rem;
					  color: $fc-main;
					  .text{
						  margin-bottom: .24rem;
					  }
					  .btn{
						  width: 2rem;
					  }
				  }
				}
			}
		}
	}
	@media screen and(max-width:800px) {
		.banner {
			margin-top: .72rem;
			height: 3.53rem;
		  .slide1 {
			  .slide-bg{
			  	opacity: 0.5;
			  }
			  background-size: cover;
			  background-position: center;
			  background-repeat: no-repeat;
			  .slide-cont{
			    width: 90%;
			    display: flex;
				flex-direction: column;
			    align-items: center;
			    justify-content: center;
			    margin: 0.16rem auto 0;
			    img {
					width: 3.43rem;
					height: 1.92rem;
					order: 1;
					border-radius: 0;
			    }
			    .sub{
			      width: 100%;
			      margin: 0 auto;
			      font-size: .16rem;
			      padding: .08rem 0;
			      text-align: center;
				  order: 2;
			      .text{
					  margin-bottom: .08rem;
					  line-height: .17rem;
					  font-size: .12rem
			      }
			      .name{
					  font-size: .2rem;
					  line-height: .28rem;
					  display: -webkit-box;
					  -webkit-line-clamp: 1;
					  -webkit-box-orient: vertical;
					  -webkit-line-clamp:1;
			      }
			      .btn{
			    	  width: 1.1rem;
			    	  height: .3rem;
			    	  line-height: .3rem;
			    	  margin: 0 auto;
			      }
			    }
			  }
		  }
		}
		.max-width {
		  max-width: 100%;
		  padding: 0;
		  margin: auto;
		}
		.nav {
			display: block;
			padding: 0 0.18rem 0.18rem;
		  .nav-item {
		    width: 100%;
			padding: 0.18rem;
			margin-top: 0.18rem;
			box-shadow: 0px 2px 42px 0px rgba(67,39,39,0.0600);
			border-radius: 4px;
			border: 3px solid #FFFFFF;
		  }
		}
	}
	@media screen and(max-width: 540px) {
		.banner {
			margin-top: .44rem;
		}
		.nav {
			padding: 0 0.16rem 0.16rem;
		  .nav-item {
			padding: 0.16rem;
			margin-top: 0.21rem;
			.btn{
			  line-height: .3rem;
			}
			.title {
			  font-size: .14rem;	
			}
			.text {
			  font-size:.12rem;
			  margin-top: .1rem;
			  line-height: .2rem;
			}
			.info {
				.btn{
					font-size: .12rem;
				}
			}
			.time {
				font-size: .12rem;
				line-height:.2rem;
			}
		  }
		}
		.section-title {
			height: .48rem;
			background: url("../assets/images/home/home-title-m.png") no-repeat center;
			background-size: auto 100%;
		}
	}
}
</style>
