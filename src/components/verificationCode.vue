<template>
  <div class="code-wrap">
    <span
      class="post-code"
      v-show="!verification_code_disabled"
      @click="onPostCode"
      >发送验证码</span
    >
    <span class="post-code disabled" v-show="verification_code_disabled"
      >{{ code_down_count }}s后重新发送</span
    >
  </div>
</template>
<script>
import countDown from "../utils/countDown";
import utils from "../utils/utils";
const CD_TIME = 60; //倒计时默认60s
export default {
  name: "GVerificationCode",
  props: {
    phone: {},
    isCheck: {
      //是否检查手机号
      type: Boolean,
      default: true,
    },
    getCode: Function,
  },
  data() {
    return {
      verification_code_disabled: false,
      code_down_count: CD_TIME,
    };
  },
  beforeDestroy() {
    if (this.countDown) {
      this.countDown.stop();
    }
  },
  methods: {
    downStart() {
      const self = this;

      self.verification_code_disabled = true;
      const config = {
        cdTime: CD_TIME,
        tickCall: (obj) => {
          self.code_down_count = obj.cdTime;
        },
        endCall: () => {
          self.verification_code_disabled = false;
        },
      };
      if (self.countDown) {
        self.countDown.start(config);
      } else {
        self.countDown = new countDown(config);
      }
    },
    async onPostCode() {
      const self = this;

      if ((self.phone && utils.checkPhoneNumber(self.phone)) || !self.isCheck) {
        //operation_authCode
        //login_getAuthCode
        if (this.getCode && typeof this.getCode == "function") {
          const res = await this.getCode();
          console.log(res);
          if (res) {
            if (res.data.code == 200) {
              self.$message({
                message: "已发送",
                type: "success",
              });

              self.downStart();
            } else {
              self.$message({
                message: res.data.message,
                type: "warning",
              });
            }
          } else {
            self.$message({
              message: "未授权",
              type: "error",
            });
          }
        }
        return;
      } else {
        self.$message({
          message: "请填写正确的国内手机号",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>

</style>