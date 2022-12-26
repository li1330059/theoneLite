<template>
  <!-- 个人中心二级导航 -->
  <div class="mine-menu-wrap">
    <ul class="mine-slider" v-if="clintWidth > 540">
      <li
        v-for="(item, index) in menu"
        :key="index"
        class="mine-slider-item group shopping-c-slider translatex"
      >
        <a href="" v-if="item.name">{{ item.name }}</a>
        <ul class="mine-slider-children" v-if="item.children">
					<template v-for="subItem in item.children">
						<li
						v-if="$webConfig.marketType==2||subItem.marketType==1"
						  @click="linkTo(subItem.path)"
						  :key="subItem.path"
						  class="mine-slider-subItem shopping-c-slider"
						  :class="[path.search(subItem.path) > -1 ? 'active' : '']"
						>
						  {{ subItem.name }}
						</li>
					</template>
        </ul>
      </li>
    </ul>
    <!-- mobile menu  增加黏性包裹 -->
    <ul class="mine-slider" v-else>
      <li v-for="(item, index) in menu" :key="index" class="mine-slider-item">
        <a href="" v-if="item.name">{{ item.name }}</a>
        <ul class="mine-slider-children" v-if="item.children">
			<template v-for="subItem in item.children">
				<li
				  v-if="path.search(subItem.path) > -1"
				  :key="subItem.path"
				  class="mine-slider-subItem active"
				>
				  {{ subItem.name }}
				</li>
			</template>
        </ul>
      </li>
      <div class="silde-line"></div>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      path: this.$route.name,
      clintWidth: window.innerWidth,
    };
  },
  watch: {
    $route(v) {
      this.path = v.name;
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.clintWidth = window.innerWidth;
    });
  },
  methods: {
    linkTo(path) {
      this.$emit("linkTo", path);
    },
  },
};
</script>

<style lang='scss' scoped>
.mine-menu-wrap {
  border-right: 1px solid $color-border;
}
.mine-slider {
	width: 20vw;
	max-width: 2.62rem;
	min-width: 1.6rem;
	flex: none;
	position: relative;
  .translatex {
    transform: translateX(1px);
  }
  .mine-slider-subItem {	
    margin-bottom: .27rem;
    border-right-width: 1px;
    cursor: pointer;
    padding-left: .62rem;
    font-size: .14rem;
	line-height: .21rem;
    position: relative;
    z-index: 2;
    transition: all 0.25s;
    transform: translateY(0.01rem);
    z-index: 2;
    &.active {
      border-right: 2px solid $fc-active;
      color: $fc-active;
    }
  }
  .group {
    margin-bottom: .43rem;
  }
}
@media screen and (max-width: 540px) {
  // 二级侧边栏
  .mine-slider {
    flex: none;
    display: flex;
    position: relative;
    border-right: none;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    width: 100%;
	max-width: none;
	min-width: none;
    background-color: $color-card;
    padding: 0 0.04rem;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 0;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 0;
      scrollbar-arrow-color: #e5e5e5;
    }

    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 0;
      background: none;
      scrollbar-arrow-color: #e5e5e5;
    }

    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      border-radius: 0;
      background: rgba(0, 0, 0, 0);
    }
    &::after {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 0.01rem;
      background-color: $color-border;
    }
    .mine-slider-item {
      display: flex;
      flex: none;
    }
    .mine-slider-children {
      flex: none;
      display: flex;
    }
    .mine-slider-subItem {
      line-height: .17rem;
      cursor: pointer;
      padding: 0 0 0.1rem 0;
      margin: .2rem 0 0 .16rem;
      font-size: 14px;
      z-index: 2;
      transition: all 0.25s;
      flex: none;
      margin-bottom: 0;
      border-bottom: 0 solid transparent;
      &.active {
        border-right: none;
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 0.01rem;
          background-color: $fc-active;
          border-bottom: 0.02rem solid $fc-active;
        }
        color: $fc-active;
      }
    }
  }
  .silde-line {
    position: absolute;
    left: 0;
    bottom: 0;
    right: -1.74rem;
    height: 1px;
    background-color: $color-secondary;
  }
}
</style>