<template>
  <div class="pagination" v-if="total > 20">
    <span class="pre" :class="{ active: curentPage > 1 }" @click="handlerPre"
      ><i class="icon"></i>上一页</span
    >
    <span class="current"> {{ curentPage }}</span>
    <span
      class="next"
      :class="{ active: curentPage < total }"
      @click="handlerNext"
      >下一页<i class="icon"></i></span
    >
  </div>
</template>

<script>
export default {
  props: {
    curentPage: {
      type: Number,
      default: function () {
        return 1;
      },
    },
    total: {
      type: Number,
      default: function () {
        return 21;
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    handlerPre() {
      this.$emit("handlerPre");
    },
    handlerNext() {
      this.$emit("handlerNext");
    },
  },
};
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.4rem 0;
  font-size: .14rem;
  .pre {
    width: 0.8rem;
    height: 0.32rem;
    background: #ffffff;
    border-radius: 0.02rem;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.14rem;
    cursor: pointer;
	padding-right: .1rem;
    .icon {
      width: 0.21rem;
      height: 0.21rem;
      background: url("../assets/icon/icon-l-n.png") no-repeat center;
      background-size: contain;
    }
    &.active {
      border: 0.01rem solid rgba(57, 127, 231, .1);
      color: rgba(57, 127, 231, 1);
      .icon {
        background: url("../assets/icon/icon-l-y.png") no-repeat center;
        background-size: contain;
      }
    }
  }
  .current {
    font-size: 14px;
    color: $fc-title;
    margin: 0 0.24rem;
  }
  .next {
    width: 0.8rem;
    height: 0.32rem;
    background: #ffffff;
    border-radius: 0.02rem;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
	padding-left: .1rem;
    .icon {
      width: 0.21rem;
      height: 0.21rem;
      background: url("../assets/icon/icon-r-n.png") no-repeat center;
      background-size: contain;
    }
    &.active {
      background: #FFFFFF;
      border-radius: 2px;
      border: 1px solid $color-btn;
	  color: $color-btn;
      .icon {
        background: url("../assets/icon/icon-r-y.png") no-repeat center;
        background-size: contain;
      }
    }
  }
}
</style>