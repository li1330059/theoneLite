<template>
  <div class="shopping-mine">
    <div class="shopping-mine-content bg-card">
      <!-- 用户信息 -->
      <mine-user></mine-user>
      <div class="mine-section">
        <!-- 个人中心二级导航 -->
        <mine-slider :menu="menu" @linkTo="linkTo"></mine-slider>
        <!-- 右侧主体内容 -->
        <div class="shopping-mine-main">
          <router-view />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import mineSlider from "./components/mineSlider.vue";
import mineUser from "./components/mineUser.vue";
export default {
  name: "my",
  components:{ mineSlider, mineUser },
  data() {
    return {
      menu: [
        {
          name: "",
          key: "1",
          leve: 1,
          children: [
            {
              name: "我的藏品",
              key: "11",
              path: "collection",
              leve: 2,
			  marketType:1,
            },
          ],
        },
        {
          name: "",
          key: "2",
          leve: 1,
          children: [
            {
              name: "我买到的",
              key: "21",
              path: "buy",
              leve: 2,
			  marketType:1,
            },
            {
              name: "我发布的",
              key: "22",
              path: "publish",
              leve: 2,
            },
            {
              name: "我卖出的",
              key: "23",
              path: "sell",
              leve: 2,
            },
          ],
        },
        {
          name: "",
          key: "3",
          leve: 1,
          children: [
            {
              name: "账户管理",
              key: "31",
              path: "accountmanagement",
              leve: 2,
            },
            {
              name: "支付总览",
              key: "32",
              path: "payment",
              leve: 2,
            },
            {
              name: "银行卡绑定",
              key: "33",
              path: "bindcard",
              leve: 2,
            },
			{
			  name: "个人设置",
			  key: "34",
			  path: "userset",
			  leve: 2,
				marketType:1,
			},
						
          ],
        },
      ],
      getPoundageResult: {
        rate: "7.5",
      },
    };
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    linkTo(path) {
      this.$router.push(`/mine/${path}`);
    },
    logOut() {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("authorization");
      localStorage.removeItem("THEONE_USER");
      this.$router.push("/login");
    },
  },
};
</script>



<style lang='scss' scoped>
.shopping-mine {
  position: absolute;
  top: .8rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .shopping-mine-content {
    margin: 0;
	min-height: 100%;
	display: flex;
	flex-direction: column;
  }

  // 容器
  .mine-section {
	flex: 1;
    display: flex;
    background-color: $color-card;
	max-width: 14.4rem;
	margin: 0 auto;
	width: 100%;
	padding-top: .41rem;
    .shopping-mine-main {
      flex: auto;
      height: 100%;
      padding: 0 .04rem 0 .19rem;
    }
  }
}

@media screen and (max-width: 540px) {
  .shopping-mine {
    top: 0.44rem;
    .group {
      margin-top: 0;
    }
    // 容器
    .mine-section {
      flex: auto;
      display: block;
      width: 100%;
      padding: 0;
      .shopping-mine-main {
        flex: auto;
        height: 100%;
        padding: 0.16rem;
      }
    }
  }
}
</style>
