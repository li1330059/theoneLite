<template>
  <div class="shop-com-header" v-if="!isHideIosHeader">
    <div class="logo" @click="gohome"></div>
    <div class="menu">
      <ul>
        <li
          v-for="(item, index) in $webConfig.menu"
          :key="index"
          :class="{ active: activePath == item.path }"
        >
          <a :href="item.path" v-if="item.target == 1">{{ item.name }}</a>
          <router-link :to="item.path" v-else-if="item.target == 2">{{
            item.name
          }}</router-link>
        </li>
      </ul>
    </div>
    <div class="login">
      <div class="search-wrap" v-if="userInfo.avatar"><search></search></div>
      <router-link to="/login" v-if="!userInfo.avatar">
        <div class="avatar-border">
          <img
            class="loginimg"
            src="@/assets/images/header-avatar-default.png"
            alt=""
          />
        </div>
      </router-link>
      <div class="mine-face" v-else>
        <el-dropdown @command="routeFun">
          <span class="el-dropdown-link">
            <router-link to="/mine">
              <div class="avatar-border">
                <img class="loginimg" :src="userInfo.avatar" alt="" />
              </div>
            </router-link>
          </span>
          <el-dropdown-menu slot="dropdown">
			<template v-for="(item, index) in menulist">
			<el-dropdown-item
				v-if="$webConfig.marketType==2||item.marketType==1"
				:key="index"
				:command="item.path"
				>{{ item.name }}</el-dropdown-item>
			  </template>
			  <el-dropdown-item divided :command="-1">退出登录</el-dropdown-item>
			</el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <img
      class="mobile-menu"
      @click="openMenu()"
      src="@/assets/images/mobile_menu.png"
    />
    <div class="m-modal" v-if="showModal">
      <div class="m-menu">
        <div class="mobile-menu__close"> 
          <img
            @click="showModal = false"
            src="@/assets/images/mobile-close.png"
          />
        </div>
		<div class="menulogo"></div>
        <ul class="shopping-s-title c-main">
          <li
            v-for="(item, index) in $webConfig.menu"
            :key="index"
            :class="{ active: activePath == item.path }"
          >
            <a :href="item.path" v-if="item.target == 1">{{ item.name }}</a>
            <a @click="routeFun(item.path)" v-else-if="item.target == 2">{{
              item.name
            }}</a>
          </li>
          <li
            :class="{ active: activePath.indexOf('/mine') != -1 }"
            @click="routeFun('/mine/mindex')"
          >
            个人中心
          </li>
        </ul>
		<div class="login-m-btngroup">
		  <router-link to="/login" v-if="!userInfo.avatar">
		    <div class="login-m-btn" @click="showModal = false">登录</div>
		  </router-link>
		  <div class="login-m-btn" v-if="userInfo.avatar" @click="logout()">
		    退出登录
		  </div>
		</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activePath: "",
      showModal: false,
      menulist: [
        {
          name: "我的藏品",
          path: "/mine/collection",
		  marketType:1,
        },
        {
          name: "我买到的",
          path: "/mine/buy",
		  marketType:1,
        },
        {
          name: "我发布的",
          path: "/mine/publish",
        },
        {
          name: "我卖出的",
          path: "/mine/sell",
        },
        {
          name: "账户管理",
          path: "/mine/accountmanagement",
        },
        {
          name: "支付总览",
          path: "/mine/payment",
        },
		{
		  name: "个人设置",
		  path: "/mine/userset",
		  marketType:1,
		},
      ],
    };
  },
  watch: {
    $route: function (to, from) {
      console.log(`to`, to);
      this.activePath = to.path;
    },
  },
  computed: {
    userInfo() {
      console.dir(this.$store.state.userStore.userInfo);
      return this.$store.state.userStore.userInfo;
    },
    isHideIosHeader() {
      return this.$store.state.isHideIosHeader;
    },
  },
  created() {},
  methods: {
	gohome() {
      this.$router.push({
        path: "/home",
      });
    },
    openMenu() {
      this.showModal = true;
    },
    routeFun(command) {
      if (command == -1) {
        this.logout();
        return;
      }
      this.$router.push({
        path: command,
      });
      this.showModal = false;
    },
    logout() {
      this.$confirm("确定退出登录吗？", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true,
      }).then(async () => {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("authorization");
        localStorage.removeItem("THEONE_USER");
        this.showModal = false;
        this.$store.dispatch("getUserInfo");
        this.$router.push({
          path: "/login",
        });
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.shop-com-header {
  display: flex;
  align-items: center;
  height: 0.8rem;
  padding: 0 0.26rem 0 0.4rem;
  background: rgba(245,252,255,0.4500);
  box-shadow: 0px 0px 4px 0px rgba(204,204,204,0.44), inset 0px -1px 0px 0px rgba(255,255,255,1);
  backdrop-filter: blur(5px);
  position: fixed;
  width: 100%;
  z-index: 999;
  top: 0;
  .logo {
    margin-right: 0.58rem;
    width: 2.22rem;
    height: 0.6rem;
    background-image: url(~@/assets/images/logo-nft.png);
    background-size: 100% 100%;
  }
  .menulogo{
	  width: 204px;
	  height: 55px;
	  background-image: url(~@/assets/images/logo-menu.png);
	  background-size: 100% 100%;
  }
  .menu {
    ul {
      display: flex;
      li {
        height: 0.8rem;
        line-height: 0.8rem;
        margin-right: 0.32rem;
        font-size: 0.14rem;
        &.active {
          a {
            color: $color-theme;
          }
        }
        a {
			color: rgba($color: $fc-label, $alpha: 0.7);
			&:hover {
				color: rgba($color: $color-theme, $alpha: 0.7);
			}
        }
      }
    }
  }
  .mine-face {
	    .loginimg {
	      width: 0.4rem!important;
	      height: 0.4rem!important;
		  box-shadow: 0px 2px 7px 0px rgba(0,0,0,0.1900);
		  border: 4px solid #FFFFFF;
	    }
	}
  .mobile-menu {
    display: none;
  }
  .m-modal {
    display: none;
  }
  @media screen and (max-width: 800px) {
	  background: rgba(245,252,255,1);
	  backdrop-filter:none;
	  max-height: 80px;
	  padding: 0 .16rem;
    .menu {
      display: none;
    }
	.mine-face {
	  display: none;
	}
	.avatar-border{
		display: none;
	}
    .mobile-menu {
      display: block;
      width: .22rem;
      height: .22rem;
    }	
    .m-modal {
      width: 100%;
      height: 100%;
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99999;
      font-size: 14px;
	  background: rgba(51,51,51,0.4000);
	  backdrop-filter: blur(5.1px);
      .login-m-btngroup {
        width: 252px;
        padding-bottom:121px;
        position: absolute;
        bottom: 0;
        .login-m-btn {
          width: 100%;
          height: 42px;
          line-height: 42px;
          border-radius: $radius;
          border: 1px solid $color-theme;
          color: $fc-active;
          font-size: 14px;
          text-align: center;
        }
      }
      .m-menu {
        width: 300px;
        height: 100vh;
        position: absolute;
        right: 0;
		background: url(~@/assets/images/menu-bg.png) no-repeat bottom right / 257px, linear-gradient(135deg, #FFF7F7 0%, #FDFDFF 100%);
/* 		background-size:2.57rem 2.89rem; */
        box-shadow: inset 0px -1px 0px 0px rgba(255,255,255,1);
        padding-left: 32px;
        .mobile-menu__close {
          display: flex;
          justify-content: flex-end;
          padding: 19px 16px;
          font-size: 16px;
          font-weight: 500;
          align-items: center;
          img {
            width: 24px;
            height: 24px;
          }
        }
        ul {
          display: block;
          li {
            margin-top: 32px;
			margin-left: 63px;
            height: 36px;
            line-height: 36px;
            padding-left: 8px;
            color: $fc-title;
			font-size: 14px;
            &.active {
              background: linear-gradient(90deg, #FF7A64 0%, #E61F1A 100%);
              color: $white;
              a {
                color: $white;
              }
            }
            a {
              color: $fc-title;
              display: block;
              
            }
          }
        }
      }
    }
  }
  .login {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    .search-wrap {
      flex: 1;
      max-width: 4rem;
    }
    .loginimg {
      width: 0.56rem;
      height: 0.56rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
    }
  }
  @media screen and (max-width: 540px) {
	  height: .44rem;
	  .logo {
	    max-width: 1.11rem;
	    max-height: .3rem;
		background-image: url(~@/assets/images/logo-m.png);
		background-size: 100% 100%;
	  }
    .search-wrap {
      max-width: initial !important;
      flex: initial !important;
    }
    .login {
      margin-right: 0.1rem;
      .loginimg {
        display: none;
      }
    }
  }
  .shop-com-header {
    position: fixed;
    z-index: 999;
    width: 100%;
    top: 0;
    box-shadow: none;
    padding: 0 0.14rem;
    background: #fff;
  }
}
.el-dropdown-menu {
  font-size: 14px;
  color: $fc-main;
  background: linear-gradient(180deg, #F9FBFF 0%, #F0F3F9 0%, #FDFDFE 100%);
  box-shadow: 0px 2px 18px 0px rgba(67,39,39,0.1200);
  border-radius: $radius;
  border: 2px solid #FFFFFF;
  border-left: 3px solid #FFFFFF;
  border-right: 3px solid #FFFFFF;
  padding: 0;
  .el-dropdown-menu__item {
    width: 2.22rem;
    border-radius: $radius;
	border-top: 2px solid rgba(255,255,255,0);
	border-bottom: 2px solid rgba(255,255,255,0);
    &:hover {
      background: linear-gradient(180deg, #F9FBFF 0%, #F0F3F9 0%, #FDFDFE 100%);
      border-radius: $radius;
      border-top: 2px solid #FFFFFF;
	  border-bottom: 2px solid #FFFFFF;
	  color: $fc-main;
    }
  }
  ::v-deep .popper__arrow{
	  display: none;
  }
  ::v-deep .el-dropdown-menu__item--divided:before{
	  background: none;
  }
}
</style>
