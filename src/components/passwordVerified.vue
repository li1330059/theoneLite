<template>
  <!-- 安全锁密码验证 -->
  <div class="shopping-passwordVerified">
	  <el-dialog
	    class=""
	    :visible.sync="dialogVisible"
	    append-to-body
	    :width="$common._isMobile()?'90%':'460px'"
	    
	    :title="title ? title : `安全锁密码验证`"
	  >
	    <div class="dialog-content">
	      <div class="dialog-form">
	        <div class="form-line">
	          <div class="title">输入安全锁密码</div>
	          <count-letters ref="payNum" class="count-letters" />
	        </div>
	        <div class="des" v-if="pay_count !== -1">
	          剩余 {{ pay_count }} 次机会
	        </div>
	        <div class="des" v-else>剩余机会读取中</div>
	        <div v-if="warningTxt" class="warning-txt">{{ warningTxt }}</div>
	  
	        <div class="btn btn-primary" @click="submit()">确定</div>
	      </div>
	    </div>
	  </el-dialog>
  </div>
</template>
<script>
const KEY = "PAY-PASSWORD";
import CryptoJS from "crypto-js";
import Encryption from "../utils/encryption";
export default {
  components: {},
  props: {
    userInfo: {
      type: Object,
      default: function () {
        return {};
      },
    },
    title: String,
    warningTxt: String,
  },
  data() {
    return {
      select: false,
      dialogVisible: false,
      phoneCode: null,
      pay_count: -1, //剩余次数
    };
  },
  methods: {
    async init(cb) {
      this.select = false;
      this.dialogVisible = false;
      this.pay_count = -1;
      await this.getPayCount();

      if (cb && typeof cb == "function") {
        this.cb = cb;
      }
      this.initPassword();
      //this.checkLocal();
    },
    checkLocal() {
      const info = localStorage.getItem(KEY);
      if (info) {
        const bytes = CryptoJS.AES.decrypt(info, "secret key 123");
        const _info = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        const nowTime = this.$common.formatDate(new Date(), "yyyyMMdd");
        const oldTIme = this.$common.formatDate(
          new Date(_info.time),
          "yyyyMMdd"
        );
        if (nowTime == oldTIme) {
          this.dialogVisible = false;
          if (this.cb && typeof this.cb == "function") {
            this.cb(_info.password);
          }
        } else {
          this.initPassword();
        }
      } else {
        this.initPassword();
        this.select = false;
      }
    },
    initPassword() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.payNum.init();
      });
    },
    async getPayCount() {
      const res = await this.$api.userAttributeGetPwdPayCount();
      if (res && res.data.code == 200) {
        this.pay_count = res.data.data;
      } else {
        this.$message.warning(res.data.message);
      }
    },
    handleSelect() {
      this.select = !this.select;
    },
    async submit() {
      let password = this.$refs.payNum.getLetters().join("");
      if (password.length != 6) {
        this.$message.error("请输入6位密码");
        return;
      }
      //支付密码校验
      const resPassword = await Encryption.getPassword(password);
      if (!resPassword) {
        this.$message.warning("密码加密错误");
        return;
      }
      const res = await this.$api.operationVerifiedPayPw({
        password: resPassword,
        type: 1,
      });
      await this.getPayCount();
      if (res && res.data.code == 200 && res.data.data) {
        if (this.select) {
          const passwordInfo = {
            password,
            time: new Date().getTime(),
          };
          const ciphertext = CryptoJS.AES.encrypt(
            JSON.stringify(passwordInfo),
            "secret key 123"
          ).toString();
          localStorage.setItem(KEY, ciphertext);
        }

        this.dialogVisible = false;
        if (this.cb && typeof this.cb == "function") {
          this.cb(password);
        }
      } else {
        this.$message.warning(res.data.message);
      }
    },
  },
};
</script>
<style lang='scss' scoped>
	.shopping-passwordVerified{
		.title {
		  font-size: 0.14rem;
		  font-weight: 400;
		  color: $fc-sub;
		  margin-bottom: 0.12rem;
		}
		.des {
		  font-size: 0.12rem;
		  font-weight: 400;
		  color: $fc-sub;
		  text-align: right;
		  margin-top:.1rem;
		}
		.btn {
		  margin-top: 0.2rem;
		}
	}
</style>