<template>
  <div class="shop-page-goods-detail">
    <div class="shopping-goods-detail" v-loading="loading">
      <div class="goods-detail-content">
        <section class="block goods-frame">
          <goods-pic
            :img="goodsDetail.commodity.cover"
            :lg="goodsDetail.commodity.actualPicture"
          ></goods-pic>
          <goods-detail-desc
            class="goods-detail-location-pic"
            ref="goodsDetailDesc2"
          ></goods-detail-desc>
        </section>
        <section class="block goods-info-wrap">
          <div class="goods-info-block">
            <div class="title hidden-txt-1">
              {{ goodsDetail.commodity.name }}
            </div>
            <div class="author-wrap">
			  <img class="avatar" :src="goodsDetail.author.cover" />
              <div class="v1-artist-bar mini">
				  <div class="label">发售方</div>
				  <div class="name">{{ goodsDetail.author.nickname || goodsDetail.author.name }}</div>
              </div>
            </div>

            <goodsDetailAttr ref="goodsDetailAttr"></goodsDetailAttr>

            <div class="v1-panel goods-buy">
              <div class="panel-content panel-price">
                <div class="buy-wrap">
                  <div class="price-wrap">
                    <div class="panel-title price-label">
						<div class="price">
						  {{ $common.formatMoney(goodsDetail.price) }}
						</div>
					</div>
                  </div>
                  <div class="btn-wrap">
                    <div
                      class="btn btn-lg btn-primary"
                      :class="{ 'btn-disabled': buyDisabled }"
                      @click="confirmOrder()"
                    >
                      {{ statusSale }}
                    </div>
                  </div>
                </div>
                <div
                  class="message-wrap"
                  v-if="
                    goodsDetail.statusSale == 1 &&
                    goodsDetail.amountAvailable == 0 &&
                    goodsDetail.amountLock > 0
                  "
                >
                  <div class="ui-message">当前有人正在支付</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <goods-detail-desc
        class="goods-detail-location-same"
        ref="goodsDetailDesc"
      ></goods-detail-desc>
      <div
        class="v1-panel s2 goods-recommend"
        v-if="recommendList && recommendList.length > 0"
      >
        <div class="panel-title">同系列推荐</div>
		<goods-more :goodsList="recommendList"></goods-more>
      </div>
    </div>
  </div>
</template>

<script>
import goodsMore from "../components/model/goods/goodsMore.vue";
import goodsPic from "../components/model/goods/goodsPic.vue";
import goodsDetailAttr from "../components/model/goods/goodsDetailAttr.vue";
import GoodsDetailDesc from "../components/model/goods/goodsDetailDesc.vue";
export default {
  components: { goodsPic, goodsDetailAttr, GoodsDetailDesc,goodsMore },
  data() {
    return {
      recommendList: [],
      checkClassName: "",
      checkClassSecondName: "",
      goodsDetail: { commodity: {}, author: {} },
      buyDisabled: false,
      loading: true,
      goodsListParam: {
        authorId: "",
        chainContract: "",
        commodityCategoryId: "",
        commodityId: "",
        highPrice: "",
        lowPrice: "",
        like: "",
        pageCount: 1,
        pageSize: 4,
        seriesWorks: "",
        seriesWorksId: "",
        sort: {
          field: 1,
          upOrDown: 2,
        },
        statusSell: "",
        topicId: "",
        typeMarket: "",
      },
    };
  },
  computed: {
    statusSale() {
      switch (Number(this.goodsDetail.statusSale)) {
        case 0:
          return "待处理";
        case 1:
          return "立即购买";
        case 2:
          return "已售罄";
        case 3:
          return "已下架";
        case 4:
          return "审核不通过";
        case 5:
          return "已锁定";
        default:
          return "立即购买";
      }
    },
  },
  created() {
    this.crumb = this.$route.query.crumb;
    this.saleRecordId = this.$route.params.saleRecordId;

    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.getDetail();
    },
    goDetails(item) {
      if (this.$common._isMobile()) {
        window.location.href = `/goods_detail/${item.id}`;
      } else {
        window.open(`/goods_detail/${item.id}`);
      }
    },
    async getDetail() {
      const res = await this.$api.saleRecordDetail({
        id: this.saleRecordId,
      });
      this.loading = false;
      if (res.data.code == 200) {
        this.goodsDetail = res.data.data;
        this.$refs.goodsDetailAttr.init(this.goodsDetail);
        this.$refs.goodsDetailDesc.init(this.goodsDetail);
        this.$refs.goodsDetailDesc2.init(this.goodsDetail);
        const statusSale = this.goodsDetail.statusSale;
        if (this.goodsDetail.amountAvailable <= 0 || statusSale != 1) {
          this.buyDisabled = true;
        }
        this.goodsList();
      } else {
        this.$message.error(res.data.message);
      }
    },
    confirmOrder() {
      if (this.buyDisabled) {
        return;
      }
      this.$router.push({
        path: `/goods_buy?saleRecordId=${this.saleRecordId}`,
      });
    },
    async goodsList() {
      this.goodsListParam.commodityId = this.goodsDetail.commodity.id;
      let result = await this.$api.getGoodList(this.goodsListParam);
      if (result && result.data.data) {
        this.recommendList = result.data.data.records;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.shop-page-goods-detail {
  .shopping-goods-detail {
    display: flex;
    flex-direction: column;
    max-width: 11.9rem;
    margin: 0 auto;
    min-height: 80vh;
	padding: .3rem .3rem .2rem;
	}
  .goods-detail-location-pic {
    display: none;
  }
  .author-wrap {
    display: flex;
	padding-bottom: .26rem;
    border-bottom: 1px dashed $bc-dashed;
  }
  .goods-desc {
    margin-top: 0.32rem;
    .panel-content {
      color: $fc-main;
      line-height: 0 24rem;
      font-size: 0.14rem;
    }
  }
  .goods-recommend {
    margin-top: 0.26rem;
	box-shadow: none;
	.panel-title{
		margin-left: .1rem;
	}
  }
  ::v-deep .max-width{
	  width: auto;
	  padding: 0;
	  .shop-com-goods{
		  padding: .15rem;
	  }
  }
  ::v-deep .section-h5{
  	.list-cont{
  		.list-item{
  			width: 100%;
  		}
  	}
  }
/*  .recommend-list-wrap {
    display: flex;
    flex-wrap: wrap;
    margin: -0.08rem;
    .goods-wrap {
      width: 25%;
      padding: 0.08rem;
    }
    @media screen and (max-width: 800px) {
      .goods-wrap {
        width: 100%;
        padding: 0.08rem;
      }
    }
  } */
  .message-wrap {
    margin: 0.16rem 0 0.26rem;
    color: $fc-active;
  }
  .goods-frame {
    display: block;
    position: relative;
	flex: 3;
    top: 0;
    left: 0;
	background: #FFFFFF;
	box-shadow: 0px 2px 13px 0px rgba(0,0,0,0.1100), inset 0px 0px 20px 0px rgba(0,0,0,0.0900);
	border: 6px solid #FFFFFF;
    .img-wrap {
      padding: 0.38rem;
    }
    .img-view {
      height: 100%;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
  }

  .goods-detail-content {
    display: flex;
    padding-top: 0.8rem;
  }
  .goods-info-wrap {
    padding-left: 0.32rem;
	flex: 4;
    .goods-info-block {
      background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
      box-shadow: 0px 2px 42px 0px rgba(67,39,39,0.0600);
      border: 3px solid #FFFFFF;
      border-radius: $radius;
      padding: 0.32rem;
    }
    .title {
      font-size: 0.24rem;
	  line-height: .3rem;
      font-weight: 500;
      color: $fc-title;
      margin-bottom: 0.24rem;
    }
    .num {
      font-size: 0.13rem;
      font-weight: 400;
      color: $fc-sub;
    }
    .price {
      font-size: .24rem;
      font-weight: bold;
      color: $fc-active;
	  line-height: .28rem;
    }
	.panel-price{
	  padding: 0;
	  .price-label{
		padding: 0 .2rem;
	  }
	}
    .buy-wrap {
      display: flex;
      justify-content: space-between;
	  margin-top: .31rem;
	  align-items: center;
      .btn-wrap {
        width: 50%;
      }
    }
  }
  @media screen and (max-width: 800px) {
    .shopping-goods-detail {
      padding: 0.32rem 0.16rem;
      .goods-detail-content {
        display: block;
      }
      .goods-frame {
        margin-bottom: 0.16rem;
      }
	  .goods-recommend {
	  	box-shadow: 0px 2px 16px 0px rgba(182,182,182,0.16);
		.panel-title{
			margin-left: 0;
		}
	  }
      .goods-info-wrap {
        padding: 0;
        .buy-wrap {
          display: block;
          .btn-wrap {
            width: 100%;
          }
        }
		.goods-info-block {
		  background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
		  box-shadow: 0px 1px 21px 0px rgba(67,39,39,0.06);
		  border: 2px solid #FFFFFF;
		  border-radius: $radius;
		  padding: .16rem;
		}
		.title {
			font-size: .2rem;
			font-weight: 400;
		}
		.buy-wrap{
			margin-top: .24rem;
		}
		.btn-wrap{
			margin-top: .24rem;
		}
      }
    }
  }
  @media screen and (max-width: 540px) {
		.shopping-goods-detail {
		  .goods-detail-content {
			padding-top: .3rem;
		  }
		}
	}
}
</style>
