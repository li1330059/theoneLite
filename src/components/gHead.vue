<template>
	<div class="shopping-ghead">
		<div>
		  <div class="head-body">
		    <div class="left">
		      <div class="logo bg-img"></div>
		      <div class="pc-nav">
		        <div class="nav-content">
		          <router-link
		            :to="item.path"
		            v-for="(item, idx) in navList"
		            :key="idx"
		          >
		            <div class="nav" :class="{ active: item.path == currentPath }">
		              {{ item.name }}
		            </div>
		          </router-link>
		        </div>
		      </div>
		    </div>
		    <div class="right">
		      <div class="nav-icon" @click="onToggleNav">
		        <g-hamburger></g-hamburger>
		      </div>
		
		      <div class="nav-list-wrap">
		        <div class="phone-nav">
		          <transition name="fade">
		            <div class="mask" @click="onToggleNav" v-if="isShowNav"></div>
		          </transition>
		          <transition name="list">
		            <div class="nav-content" v-show="isShowNav">
		              <router-link
		                :to="item.path"
		                v-for="(item, idx) in navList"
		                :key="idx"
		              >
		                <div
		                  class="nav"
		                  :class="{ active: item.path == currentPath }"
		                >
		                  {{ item.name }}
		                </div>
		              </router-link>
		            </div>
		          </transition>
		        </div>
		      </div>
		    </div>
		  </div>
		  <div class="placehalder"></div>
		</div>
	</div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      currentPath: "",
      navList: [
        {
          name: "首页",
          path: "/home",
        },
        {
          name: "市场",
          path: "/market",
        },
      ],
    };
  },
  computed: {
    isShowPhoneNav() {
      return this.$store.state.isShowPhoneNav;
    },
    isShowNav() {
      return this.$store.state.isShowPhoneNav;
    },
  },
  watch: {
    $route(newRoute) {
      this.checkRoute(newRoute);
    },
  },
  created() {
    this.checkRoute(this.$route);
  },
  methods: {
    checkRoute(route) {
      this.currentPath = route.path;
      if (this.$common._isMobile()) {
        if (this.$store.state.isShowPhoneNav) {
          this.$store.commit("setPhoneNav", false);
        }
      } else {
      }
    },
    onToggleNav() {
      this.$store.commit("setPhoneNav", !this.$store.state.isShowPhoneNav);
    },
  },
};
</script>

<style lang='scss' scoped>
	.shopping-ghead{
		.pc-nav {
		  display: block;
		}
		.phone-nav {
		  display: none;
		}
		.list-enter-active,
		.list-leave-active {
		  transition: all 0.36s ease-out;
		}
		
		.list-enter-from,
		.list-leave-to {
		  opacity: 0;
		  transform: translateX(100%);
		}
		.fade-enter-active,
		.fade-leave-active {
		  transition: opacity 0.36s ease;
		}
		
		.fade-enter-from,
		.fade-leave-to {
		  opacity: 0;
		}
		.placehalder {
		  height: 0.8rem;
		}
		.head-body {
		  position: fixed;
		  z-index: 100;
		  top: 0;
		  left: 0;
		  width: 100%;
		  display: flex;
		  justify-content: space-between;
		  height: 0.8rem;
		  align-items: center;
		  background-color: $white;
		  /*   theme(background $head-bg); */
		
		  backdrop-filter: blur(10px);
		  padding: 0 0.3rem;
		  .left {
		    display: flex;
		    align-items: center;
		    flex: 2;
		    .logo {
		      background-image: url(../assets/images/logo-nft.png);
		      width: 2.34rem;
		      height: 0.36rem;
		      margin-right: 0.28rem;
		
		      img {
		        display: block;
		        width: 2rem;
		      }
		    }
		  }
		  .right {
		    flex: 1;
		    .nav-icon {
		      display: none;
		    }
		    .nav-list-wrap {
		    }
		  }
		  .nav-content {
		    display: flex;
		    justify-content: flex-end;
		    align-items: center;
		  }
		  .nav {
		    line-height: 0.28rem;
		    font-size: 0.12rem;
		    font-weight: 400;
		    color: $color;
		    border-radius: $radius;
		    padding: 0 0.15rem;
		    transition: all ease-in 0.16s;
		    margin-left: 0.01rem;
		    &:hover {
		      background: #f7f7f8;
		    }
		    &.active {
		      background: #f7f7f8;
		    }
		  }
		  @media screen and(max-width:540px) {
		    .pc-nav {
		      display: none;
		    }
		    .phone-nav {
		      display: block;
		    }
		    .search-box {
		      display: none;
		    }
		    .right {
		      flex: 1;
		      .nav-icon {
		        display: flex;
		        justify-content: flex-end;
		        align-items: center;
		        position: relative;
		        top: 0;
		        left: 0;
		        z-index: 4;
		      }
		      .nav-list-wrap {
		        display: block;
		
		        .mask {
		          position: fixed;
		          z-index: 2;
		          top: 0;
		          right: 0;
		          width: 100vw;
		          height: 100vh;
		          display: block;
		          background-color: rgba(48, 48, 48, 0.3);
		        }
		        .nav-content {
		          position: fixed;
		          top: 0;
		          right: 0;
		          width: 80vw;
		          height: 100vh;
		          display: block;
		          background: $white;
		          z-index: 3;
		          padding: 0.68rem 0.16rem 0;
		        }
		        .nav {
		          font-size: 0.16rem;
		          font-weight: 400;
		          line-height: 0.38rem;
		          color: $fc-main;
		          padding: 0 0.26rem;
		          transition: all ease-in 0.16s;
		          margin-bottom: 0.02rem;
		          &:hover {
		            background: #f7f7f8;
		          }
		          &.active {
		            background: #f7f7f8;
		          }
		        }
		      }
		    }
		  }
		}
	}
</style>