<template>
  <div class="shopping-load">
    <!-- 渲染主体列表 -->
    <div class="">
      <slot></slot>
    </div>
    <div class="shopping-c-sub shopping-s-main ui-center mt16 load" v-if="loading">
      加载中...
    </div>
    <div
      class="shopping-c-sub shopping-s-main ui-center mt40 mb16 load nomore"
      v-if="noMore && list.length > 0"
    >
      没有更多了
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
    noMore: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
  },
  data() {
    return {};
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    handleScroll() {
      let scrollDom = document.getElementsByClassName("shopping-mine");
      scrollDom = scrollDom && scrollDom[0];
      let scrollTop = scrollDom.scrollTop;
      let windowHeight = scrollDom.clientHeight;
      let scrollHeight = scrollDom.scrollHeight;
      if (
        scrollHeight - scrollTop - windowHeight < 100 &&
        !this.noMore &&
        !this.loading
      ) {
        this.$emit("handlerLoad");
      }
    },
  },
};
</script>

<style>
</style>