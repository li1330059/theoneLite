<template>
  <div class="shop-mine-mobile">
    <div class="shopping-mine-content bg-card">
      <!-- 用户信息 -->
      <mine-user></mine-user>
      <div class="mobile-mine-enter">
        <div
          :class="`line${index1}`"
          v-for="(item, index1) in menu"
          :key="index1"
        >
			<template v-for="(con, index2) in item">
				<div
				  class="mobile-mine-enter-item"
				  :key="index2"
				  v-if="$webConfig.marketType==2||con.marketType==1||index1==0"
				>
				  <router-link :to="con.path" v-if="$webConfig.marketType==2||con.marketType==1">
				    <div :class="`icon icon-${con.path}`"></div>
				    <div class="name">{{ con.name }}</div>
				  </router-link>
				</div>
			</template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mineUser from "./components/mineUser.vue";
export default {
  components: { mineUser },
  data() {
    return {
      menu: [
        [
          {
            name: "我的藏品",
            path: "collection",
			marketType:1,
          },
          {
            name: "我买到的",
            path: "buy",
			marketType:1,
          },
          {
            name: "我发布的",
            path: "publish",
          },
          {
            name: "我卖出的",
            path: "sell",
          },
        ],
        [
          {
            name: "账户管理",
            path: "accountmanagement",
          },
          {
            name: "支付总览",
            path: "payment",
          },
          {
            name: "银行卡绑定",
            path: "bindcard",
          },
			{
			  name: "个人设置",
			  path: "userset",
				marketType:1,
			},
        ],
      ],
      getPoundageResult: {
        rate: "7.5",
      },
    };
  },
  watch: {},
  mounted() {
    this.$store.dispatch("getUserInfo");
  },
  methods: {
    linkTo(path) {
      this.$router.push(`/mine/${path}`);
    },
  },
};
</script>

<style lang='scss' scoped>
.shop-mine-mobile {
  width: 100%;
  bottom: 0px;
  position: absolute;
  top: .8rem;
  @media screen and (max-width: 540px) {
	  top: .44rem;
  }
  background: #f7f7f7;
  .mobile-mine-enter {
    > div {
      display: flex;
      justify-content: space-around;
      align-content: center;
      background: #fff;
    }
    .line0 {
      padding: .29rem 0 .32rem;
      margin-bottom: 0.16rem;
      .icon {
        width: 0.24rem;
        height: 0.24rem;
        background-size: 100% 100%;
      }
    }
    .line1 {
	  flex-direction: column;
      .icon {
       display: none;
      }
	  .mobile-mine-enter-item{
		  text-align: left;
		  padding: .16rem .24rem;
		  line-height: .17rem;
		  background-image: url(~@/assets/icon/mindex-right.png);
		  background-repeat: no-repeat;
		  background-position:right .23rem bottom .19rem;
		  background-size: .12rem .12rem;
		  border-bottom: 1px solid $color-border;
		  &:last-child {
		     border-bottom: none;
		  }
	  }
    }
    .mobile-mine-enter-item {
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .icon {
        margin: 0 auto 0.12rem;
      }
	  .icon-collection{
		  background-image: url(~@/assets/icon/mindex-icon-collection.png);
	  }
	  .icon-buy{
		  background-image: url(~@/assets/icon/mindex-icon-buy.png);
		}
	  .icon-publish{
		  background-image: url(~@/assets/icon/mindex-icon-publish.png);
	  }
	  .icon-sell{
		  background-image: url(~@/assets/icon/mindex-icon-sell.png);
	  }
      .name {
        color: #333;
      }
    }
  }
}
</style>
