<template>
  <div>
    <div class="shopping-id-card">
      <div class="row-between-center">
        <span class="shopping-s-title shopping-c-main row-between-center"
          >实名认证<span
            class="shopping-c-warning row-between-center"
            v-if="userInfo.statusVerified == 1"
          >
            <i class="icon-idcard"></i>
            <span class="ml4 shopping-s-main">已认证 </span></span
          ></span
        >
        <span
          class="shopping-s-mian shopping-c-primary pointer"
          v-if="userInfo.statusVerified == 0"
          @click="showBindCard"
          >认证</span
        >
        <span
          class="shopping-s-main shopping-c-main"
          v-if="userInfo.statusVerified == 1"
          >{{ userInfo.realname }}</span
        >
        <span
          class="shopping-s-mian shopping-c-primary pointer"
          v-if="userInfo.statusVerified == 2"
          @click="showBindCard"
          >认证未通过</span
        >
      </div>
    </div>
<!--     <div class="shopping-id-card">
      <div class="row-between-center">
        <span class="shopping-s-title shopping-c-main row-between-center"
          >设置安全锁密码<span
            class="shopping-c-warning row-between-center"
            v-if="userInfo.statusVerified == 1"
          >
          </span
        ></span>
        <span
          class="link-btn"
          v-if="userInfo.isPayPwd == 1"
          @click="modifyPaypwd"
          >修改</span
        >
        <span class="link-btn" v-else @click="setPaypwd"> 设置</span>
      </div>
    </div> -->
    <modify-pay-password
      ref="modifyPayPasswordRef"
      @listen="listenModifySuccess"
    ></modify-pay-password>
    <set-pay-password
      ref="setPayPasswordRef"
      @listen="setPasswordSuccess"
    ></set-pay-password>
    <dialog-idcard
      ref="bankSubmit"
      v-if="showIdCard"
      @bindSucess="bindSucess"
    />
  </div>
</template>

<script>
export default {
  components: {},
  name: "idcard",
  data() {
    return {
      showIdCard: false,
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userStore.userInfo;
    },
  },
  created() {},
  methods: {
    setPaypwd() {
      this.$refs.setPayPasswordRef.init();
    },
    setPasswordSuccess() {
      this.$store.dispatch("getUserInfo");
    },
    listenModifySuccess() {},
    modifyPaypwd() {
      this.$store.modifyPayPasswordRef;
      this.$refs.modifyPayPasswordRef.init();
    },
    showBindCard() {
      this.showIdCard = true;
      this.$nextTick(() => {
        console.log(this.$refs.bankSubmit);
        this.$refs.bankSubmit.init();
      });
    },
    bindSucess() {
      this.showIdCard = false;
      this.$store.dispatch("getUserInfo");
    },
  },
};
</script>

<style lang='scss' scoped>
.shopping-id-card {
  padding: 16px 0;
  border-bottom: 1px solid $color-border;
  .icon-idcard {
    width: 16px;
    height: 16px;
    margin-left: 12px;
    background-size: 100% 100%;
    margin-right: 4px;
    background-image: url("../../assets/icon/icon-authentication.png");
  }
}
@media screen and (max-width: 540px) {
  .shopping-id-card {
    padding: 0.16rem 0;
    border-bottom: 0.01rem solid $color-border;
    .icon-idcard {
      width: 0.16rem;
      height: 0.16rem;
      margin-left: 0.12rem;
      background-size: 100% 100%;
    }
  }
}
</style>