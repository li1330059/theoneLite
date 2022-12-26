<template>
  <div class="shop-page-login">
    <div class="login-imgcont bg-img"></div>
    <div class="login-formcont">
      <div class="login_form">
        <div class="t2"></div>
        <!-- <div class="label phone">手机号</div> -->
        <div class="form-item">
          <el-input v-model="phone" placeholder="请输入手机号"></el-input>
        </div>
        <!-- <div class="label phonecode">手机验证码</div> -->
        <div class="code-block form-item">
          <el-input v-model="code" placeholder="请输入验证码"> </el-input>
          <div class="code-wrap btn-primary" v-show="!verification_code_disabled" @click="onPostCode">
            <span
              class="post-code hand"
              >发送验证码</span
            >
          </div>
		  <div class="code-wrap btn-disabled" @click="onPostCode" v-show="verification_code_disabled">
		    <span class="post-code"
		      >{{ code_down_count }}s后重新发送</span
		    >
		  </div>
        </div>

        <div class="btn-group">
          <div class="btn btn-primary btn-lg" @click="login()">立即登录</div>
        </div>
        <div class="protocol">
          <img
            @click="checkRadio()"
            v-if="ifCheck"
            src="../assets/images/selector.png"
            class="checkBtn"
          />
          <img
            @click="checkRadio()"
            v-if="!ifCheck"
            src="../assets/images/selector-n.png"
            class="checkBtn"
          />
          <div class="c-title">
            <span class="hand" @click="checkRadio()"> 我已阅读并同意</span
            ><router-link
              target="_blank"
              :to="{ path: `/agreement/user_agreement` }"
              ><span>《用户协议》</span></router-link
            >
            和
            <router-link
              target="_blank"
              :to="{ path: '/agreement/privacy_policy' }"
              ><span>《隐私政策》</span></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countDown from "@/utils/countDown";
import utils from "../utils/utils.js";
export default {
  name: "login",
  data() {
    return {
      phone: "",
      code: "",
      ifCheck: false,
      verification_code_disabled: false,
      code_down_count: 60,
    };
  },
  watch: {},
  mounted() {},
  methods: {
    checkRadio() {
      this.ifCheck = !this.ifCheck;
    },
    beforeDestroy() {
      if (this.countDown) {
        this.countDown.stop();
      }
    },
    async onPostCode() {
      const self = this;
      if (this.disabled) {
        return;
      }
      this.disabled = true;
      setTimeout(() => {
        this.disabled = false;
      }, 500);

      if (utils.checkPhoneNumber(self.phone)) {
        this.goOn();
      } else {
        self.$message({
          message: "请填写正确的国内手机号",
          type: "warning",
        });
      }
    },
    async goOn() {
      const self = this;
      const res = await this.$api.getAuthCode({
        phone: self.phone,
        type: 1,
      });

      console.log("获得结果--------------");
      console.log(res.data);
      if (res.data) {
        if (res.data.code == 200 && res.data.data) {
          self.$message({
            message:
              "登录验证码已发送，验证码在15分钟内有效，若您没有收到验证码可1分钟后进行重新发送验证码操作。",
            type: "success",
          });

          self.verification_code_disabled = true;
          self.countDown = new countDown({
            cdTime: 60,
            tickCall: (obj) => {
              self.code_down_count = obj.cdTime;
            },
            endCall: () => {
              self.verification_code_disabled = false;
            },
          });
        } else {
          self.$message({
            message: res.data.message,
            type: "error",
          });
        }
      }
    },
    openAgreement(path) {},
    async login() {
      const self = this;

      if (!this.ifCheck) {
        this.$message({
          message: "请勾选协议",
          type: "warning",
        });
        return;
      }

      if (!this.phone || !utils.checkPhoneNumber(this.phone)) {
        this.$message({
          message: "请填写正确的国内手机号",
          type: "warning",
        });
        return;
      }

      const res = await this.$api.authCodeLogin({
        phone: self.phone,
        authCode: self.code,
        inviteCode: "",
      });

      console.log("获得结果--------------");
      console.log(res);
      if (res) {
        if (res.data.code == 200) {
          this.$message.success("登陆成功");
          localStorage.setItem("userInfo", JSON.stringify(res.data.data));
          localStorage.setItem("authorization", res.headers.authorization);

          const redirect = this.$route.query.redirect;
          if (redirect && redirect.search(/login/gi) == -1) {
            // this.$router.push(decodeURIComponent(redirect));
            location.href = redirect;
          } else {
            this.$router.push({
              path: "/home",
            });
          }
        } else {
          self.$message({
            message: res.data.message,
            type: "error",
          });
        }
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.shop-page-login {
  display: flex;
  height: 100%;
  background-image: url("../assets/images/login-back.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .login-imgcont {
    flex: 2;
    min-height: 5rem;
    background-image: url("../assets/images/bg-login-nft.png");
    background-size: cover;
	margin-top: .8rem;
  }

  .login-formcont {
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 5rem;

    .login_form {
/*      min-width: 360px; */
      .code-block {
		  display: flex;
      }
      .phonecode {
        margin-top: 24px;
      }
	  .code-block{
		  ::v-deep .el-input{
		    flex:1;
		    margin-right: 10px;
		  }
		  .code-wrap {
		    width: 120px;
		    height: 40px;
			line-height: 40px;
			text-align: center;
			cursor: pointer;
		  		.post-code {
		  		  font-size: 14px;
		  		  font-weight: 400;
		  		}
		  }
	  }
      .form-item{
        margin-bottom: 20px;
        ::v-deep .el-input__inner{
          height: 40px;
          background: #EEEEEE;
		  border-radius:0;
		  font-size: 14px!important;
        }
      }
      .t2 {
        margin-bottom: 20px;
		background-image: url(~@/assets/images/logo-nft.png);
		background-size: 100% 100%;
		width: 222px;
		height: 60px;
      }
      .protocol {
        display: flex;
        align-items: center;
        color: rgba(34, 35, 38, 1);
        margin-top: 20px;
		line-height: 20px;
		font-size: 12px;
        a {
			color: $fc-active;
          text-decoration: none;
        }
      }
      .disabled {
        color: $fc-sub;
      }
      .checkBtn {
        width: 18px;
        height: 18px;
        display: block;
        margin-right: 6px;
      }
    }
    .btn-group {
      margin-top: 30px;
      .btn {
        width: 100%;
		line-height: 40px;
		font-size: 14px
      }
    }
  }
  @media screen and (max-width: 800px) {
	background-image: url("../assets/images/login-back-m.png");
	background-repeat: no-repeat;
	background-size: 100% 100%;
    .login-imgcont {
      display: none;
    }
    .login-formcont {
      width: 100%;
      .login_form {
        padding: 0 0.16rem;
      }
	  .form-item{
	    margin-bottom: .2rem;
	    ::v-deep .el-input__inner{
	      background: #ffffff!important;
		  border: 1px solid $bc-inp;
		  border-radius:0;
	    }
	  }
	  .btn-group{
		  margin-top: 40px;
	  }
    }
  }
/*  @media screen and (max-width: 540px) {
  	background-image: url("../assets/images/login-back-m.png");
  	background-repeat: no-repeat;
  	background-size: 100% 100%;
  	height: 100%;
    .login-imgcont {
      display: none;
    }
    .login-formcont {
      width: 100%;
      .login_form {
        padding: 0 0.16rem;
      }
  	  .form-item{
  	    margin-bottom: .2rem;
  	    ::v-deep .el-input__inner{
  	      background: #ffffff!important;
  		  border: 1px solid $bc-inp;
  		  border-radius:0;
  	    }
  	  }
  	  .btn-group{
  		  margin-top: 40px;
  	  }
    }
  } */
}
</style>
