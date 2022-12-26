<template>
  <div class="shopping-page-pay-fail">
    <div class="page-pay-icon bg-img"></div>
    <div class="btn-wrap">
      <div class="btn btn-disabled" @click="seeOrder">取消</div>
      <div class="btn btn-primary" @click="seeOrder">重新支付</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    userInfo() {
      return this.$store.state.userStore.userInfo;
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {},
    seeOrder() {
      this.$router.push("/mine/buy");
    },
    goMarket() {
      this.$router.push("/market");
    },
  },
};
</script>

<style lang='scss' scoped>
.shopping-page-pay-fail {
  .page-pay-icon {
    width: 2rem;
    height: 2rem;
    margin: 16vh auto 0;
    background-image: url("../../assets/images/mine/bg-bind-success.png");
  }
  .btn-wrap {
    display: flex;
    justify-content: center;
    margin-top: 0.2rem;
    .btn {
      margin: 0.08rem;
      min-width: 1.6rem;
    }
  }
}
</style>
