<template>
  <div class="shop-com-goods">
    <div
      class="goods-frame-box hand"
      :class="goodsClass"
      v-if="goodsInfo"
      @click.stop="onCoverClick"
    >
      <a :href="`/${path}/${goodsInfo.id || goodsInfo.uuid}`" target="_blank">
        <div
          class="frame-box"
          :class="{
            'ui-ban':
              goodsInfo.commodity && goodsInfo.commodity.typeMarket == 1,
            'ui-yan':
              goodsInfo.commodity && goodsInfo.commodity.typeMarket == 2,
          }"
        > 
          <slot name="header" />
          <div class="frame-content" v-if="$slots.content">
            <slot name="content"></slot>
          </div>
          <!-- 发售日历图片盒子 -->
          <div v-if="goodsTye == 'activity'" class="img-box">
            <preview-img
              class="cover-wrap"
              :cover="goodsInfo.styleJson.collection_img_pc"
              :picture="goodsInfo.styleJson.collection_img_pc"
              :info="goodsInfo"
              :isShowPreview="isShowPreview"
            ></preview-img>
          </div>
          <!-- 通用图片盒子 -->
          <div v-else class="img-box">
            <div class="v1-artist-bar mini">
              <img class="avatar" :src="goodsInfo.author.cover" />
              {{ goodsInfo.author.nickname || goodsInfo.author.name }}
            </div>
<!--            <div class="number" v-if="goodsInfo.commoditySku">
              {{ goodsInfo.commoditySku.number }}
            </div> -->
            <preview-img
              class="cover-wrap"
              :cover="
                (goodsInfo.commodity && goodsInfo.commodity.cover) ||
                goodsInfo.cover
              "
              :picture="
                (goodsInfo.commodity && goodsInfo.commodity.actualPicture) ||
                goodsInfo.actualPicture
              "
              :info="goodsInfo"
              :isShowPreview="isShowPreview"
            ></preview-img>
          </div>
          
          <goods-activity-attr v-if="goodsTye == 'activity'" :goods="goodsInfo"/>
          <goods-attr  v-else :goods="goodsInfo" :path="path"></goods-attr>
        </div>

        <slot name="footer"></slot>
        <div v-if="!$slots.footer"></div>
      </a>
    </div>
  </div>
</template>
<script>
import goodsAttr from "./goodsAttr.vue";
export default {
  components: { goodsAttr },
  data() {
    return {};
  },
  props: {
    isCheckPaying: {
      type: Boolean,
      default: false,
    },
    goodsInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    isShowTotal: {
      type: Boolean,
      default: false,
    },
    isShowLike: {
      type: Boolean,
      default: true,
    },
    isShowPrice: {
      type: Boolean,
      default: true,
    },
    isShowPreview: {
      type: Boolean,
      default: true,
    },
    index: {
      type: Number,
      default: 0,
    },
    isShowGoodsName: {
      type: Boolean,
      default: true,
    },
    isShowNumber: {
      type: Boolean,
      default: true,
    },
    params: {
      type: Object,
      default: () => {
        return {};
      },
    },
    goodsClass: {
      type: String,
      default: () => {
        return '';
      },
    },
    goodsTye:{
      type: String,
      default: () => {
        return '';
      },
    },
    path:{
      type: String,
      default: () => {
        return 'goods_detail';
      },
    }
  },
  computed: {},
  created() {
    console.log(this.$slots.footer);
  },
  methods: {
    goNextPage(event) {
      if (!event.target.src) {
        this.$common.goPage(`/goods/${this.goodsInfo.id}`, "_blank");
      }
    },
    onCoverClick(e) {
      this.$emit("listenCoverClick", this.goodsInfo, e);
    },
    onToggleLike() {
      this.$emit("listenLike", {
        ...this.goodsInfo,
        index: this.index,
        ...this.params,
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.shop-com-goods {
	padding: .12rem;
	&:hover {
	  box-shadow: 0px 2px 42px 0px rgba(67,39,39,0.0600);
	  border-radius: $radius;
	  transition: all .3s ease-in;
	}
  .frame-content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 3;
    width: 100%;
    height: 100%;
    border-radius: $radius;
    overflow: hidden;
    display: none;
  }
  .goods-frame-box {
	overflow: hidden;
    background: $white;
    border-radius: $radius;
    transition: all .75s;
    // 发售日历盒子
    &.goods-activity-box{
       border: none;
       padding: .16rem;
      //  background: linear-gradient(180deg, #FDFDFF 0%, #C3DAF1 100%);
       box-shadow: 0px 6px 30px 0px rgba(204,204,204,0.4400), inset 0px -6px 15px 0px #FFFFFF, inset 0px -3px 8px 0px rgba(255,255,255,0.8200);
       border-radius: $radius;
    }
/*    &:hover{
      transition: all .75s;
      box-shadow: 0px 2px 16px 0px rgba(0,0,0,0.1000);
    } */
    :hover {
      .frame-content {
        display: block;
      }
    }
    .frame-box {
      position: relative;

      .type-market {
        width: 25px;
        height: 19px;
        position: absolute;
        bottom: 0;
        right: 0;
      }

      .img-box {
        position: relative;
        top: 0;
        left: 0;
        .v1-artist-bar {
          display: none;
        }
        .cover-wrap {
          .ui-preview-wrap {
            position: absolute;
          }
        }
        .number{
          position: absolute;
          right: .1rem;
          top: .1rem;
          z-index: 9;
        }
      }
    }
    .ui-yan {
      box-shadow: 0px 0px 4px 0px rgba(237, 230, 248, 0.5),
        inset 0px 0px 14px 2px rgba(237, 230, 248, 0.5);
      background-color: #fcfaff;
    }
  }
  .like-box {
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    border-radius: $radius;
    padding: 5px 8px;
    .ui-icon {
      width: 18px;
      height: 18px;
    }
    .num {
      font-size: 12px;
      font-weight: 400;
      color: $white;
      padding-left: 4px;
    }
  }
  .commodity-num-box {
    margin-top: 4px;
    height: 20px;
    .m-num-wrap {
      padding: 0;
    }
  }
  .line-group {
    display: flex;
    align-items: center;
    margin-top: 8px;
    .key {
      font-size: 12px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
    }
    .info {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      overflow: hidden;
      padding-left: 10px;

      .artist {
        padding-left: 7px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.7);
      }
    }
  }
  .sum-total-box {
    position: absolute;
    top: 11px;
    right: 0px;
    height: 38px;
    font-size: 12px;
    color: $fc-main;
    line-height: 38px;
    z-index: 2;
    padding: 0 10px 0 8px;
    background-image: url("//static.theone.art/pc/active/compose/bar-ctx.png");
    background-size: auto 100%;
    padding-top: 1px;
    .left-img {
      position: absolute;
      left: -8px;
      height: 100%;
      bottom: 0;
    }
    .right-img {
      display: block;
      height: 100%;
      position: absolute;
      bottom: 0px;
      right: -13px;
    }
  }
}
@media screen and(max-width:540px) {
	.shop-com-goods{
		padding: 0;
		&:hover {
		  box-shadow: none;
		  border: none;
		}
	}
}
</style>
