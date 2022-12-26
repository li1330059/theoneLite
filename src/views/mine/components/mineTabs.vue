

<template>
  <!-- 个人中心tab组件 -->
  <div
    class="shopping-mine-tabs shopping-mine-tabs-bottoomBorder"
  >
    <span
      class="shopping-mine-tabs-item"
      :class="[index == curentIndex ? 'shopping-mine-tabs-itemActive' : '']"
      v-for="(item, index) in tabsData"
      :key="index"
      @click="handlerChange(item, index)"
      >{{ item.name }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    tabsData: {
      type: Array,
      default: function () {
        return [];
      },
    }
  },
  data() {
    return {
      curentIndex: 0,
      clientWidth: window.innerWidth
    };
  },
  computed: {
    // tabWidth() {
    //   if (this.clientWidth < 750) {
    //     return "100%";
    //   } else {
    //     return `${85 * this.tabsData.length}px`;
    //   }
    // },
  },
  methods: {
    handlerChange(item, index) {
      this.curentIndex = index;
      this.$emit("handlerChange", item);
    },
  },
};
</script>

<style lang='scss' scoped>
	
.shopping-mine-tabs {
  font-size: .14rem;
  margin-bottom: .32rem;
  padding-bottom: .11rem;
  display: flex;
  width: calc(100% - .62rem);
  border-bottom: 1px solid $color-border;
  line-height: .2rem;
  .shopping-mine-tabs-item {
    cursor: pointer;
    color: $fc-label;
    text-align: center;
	width: .74rem;
	border-right: 1px solid $color-border;
	&:first-child {
	   width: .44rem;
	   text-align: left;
	}
	&:last-child {
	   border-right: none;
	}
  }
  .shopping-mine-tabs-itemActive {
    color: $fc-title;
  }
}
@media screen and (max-width: 540px) {
  .shopping-mine-tabs {
    width: 100%;
    display: flex;
    .shopping-mine-tabs-item {
      width: 25%;
      flex: none;
      padding: 0;
      text-align: center;
      font-size: 0.14rem;
    }
  }
	.shopping-mine-tabs {
		padding: 2px;
		border: none;
	  font-size: .12rem;
	  margin-bottom: .12rem;
	  background-color: #f4f4f4;
	  display: flex;
	  width: 100%;
	  .shopping-mine-tabs-item {
	    flex: auto;
	    line-height: .28rem;
	    height: .28rem;
	    cursor: pointer;
	    color: $fc-label;
	    text-align: center;
		border: none;
		&:first-child {
		   width: .74rem;
		   text-align: center;
		}
	  }
	  .shopping-mine-tabs-itemActive {
	    background-color: #fff;
	    color: $fc-active;
	  }

	}
}
</style>