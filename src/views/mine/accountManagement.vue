<template>
  <div class="shopping-account-management shopping-s-main shopping-c-main">
    <div class="shopping-account--header">
      <span>账户</span>
      <span
        >{{ account.statusPay | statusPay }}/{{
          account.statusWithdrawal | statusWithdrawal
        }}</span
      >
    </div>
    <div class="account-content">
      <div class="account-content-item">
        <label for="" class="shopping-c-sub">银行卡信息：</label
        ><span v-if="account.bankName">{{ account.bankName }}</span>
        <span v-else>{{ account.statusBankCard | statusBankCard }}</span>
      </div>
      <div class="account-content-item" v-if="account.bankAccount">
        <label for="" class="shopping-c-sub">银行卡号：</label
        ><span v-if="account.bankAccount">{{ account.bankAccount }}</span>
        <span v-else>银行卡暂未绑定</span>
        <span class="shopping-c-primary ml12" @click="showBindCard"
          >绑定新卡</span
        >
      </div>
      <div class="account-content-item">
        <label for="" class="shopping-c-sub">身份证照片：</label
        ><span>{{ account.statusRealName | statusRealName }}</span>
        <router-link
          v-if="account.statusRealName == 1"
          to="viewcard"
          class="shopping-c-primary ml12"
          >查看</router-link
        >
      </div>
      <div class="account-content-item">
        <label for="" class="shopping-c-sub">账户认证：</label
        ><span
          :class="[
            account.status == 1 ? 'shopping-c-succress' : 'shopping-c-sub',
          ]"
          >{{ account.status | status }}</span
        >
      </div>
	  
      <div class="account-status">
        <i
          :class="[account.statusRealName == 1 ? 'icon-success' : 'icon-dark']"
        ></i>
        <span class="account-status-text"> 上传身份证照片并绑定银行卡</span>
		<span class="line"></span>
        <i :class="[account.status == 1 ? 'icon-success' : 'icon-dark']"></i>
        <span class="account-status-text">{{ account.status | status }}</span>
      </div>
      <div v-if="account.status == 0" class="account-tip pointer">
        <span class="shopping-c-primary" @click="showIdCard"
          >去上传身份证照片并绑定银行卡</span
        >
      </div>
    </div>
    <dialog-bindcard
      v-if="isShowBindCard"
      ref="bankSubmit"
      :userInfo="userAttrResult"
      @listen="listenBankSubmit"
    ></dialog-bindcard>
    <dialog-success
      :successInfo="successInfo"
      ref="success"
      v-if="isShowSccess"
      @handlerClose="handlerClose"
    />
  </div>
</template>

<script>
import { accountInfo } from "../../api/my";
export default {
  data() {
    return {
      isShowBindCard: false,
      successInfo: {
        url: require("../../assets/images/mine/bg-bind-success.png"),
        text: "恭喜您认证成功",
      },
      userAttrResult: {},
      account: {},
      cardList: [{ id: 1 }],
      isShowSccess: false,
    };
  },
  filters: {
    status(value) {
      var arr = ["未开户", "已开户", "审核中"];
      return arr[value];
    },
    statusRealName(value) {
      var arr = ["未上传", "已上传", "验证中"];
      return arr[value];
    },
    statusWithdrawal(value) {
      var arr = ["不可提现", "可提现"];
      return arr[value];
    },
    statusPay(value) {
      var arr = ["不可支付", "可支付"];
      return arr[value];
    },
    statusBankCard(value) {
      var arr = ["未绑定", "", "审核中"];
      return arr[value];
    },
  },
  created() {
    this.getAccountInfo();
  },
  methods: {
    getAccountInfo() {
      accountInfo({ payChannel: "yb" }).then((res) => {
        if(res.data.code == 200) {
          this.account = res.data.data;
        }
      });
    },
    showBindCard() {
      this.$router.push("changecard");
    },
    listenBankSubmit() {
      this.isShowBindCard = false;
      this.isShowSccess = true;
      this.$nextTick(() => {
        this.$refs.success.init();
      });
    },
    showIdCard() {
      this.$router.push("uploadcard");
    },
    handlerClose() {
      console.log(this.isShowSccess);
      this.isShowSccess = false;
    },
  },
};
</script>

<style lang='scss' scoped>
.shopping-account-management {
  border-radius: $radius;
  overflow: hidden;
  max-width: 9.79rem;
  background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
  box-shadow: 0px 2px 42px 0px rgba(67,39,39,0.0600);
  .account-content {
    padding: .16rem .24rem;
    .account-content-item {
      display: flex;
      line-height: .20rem;
      margin-bottom: .16rem;

      label {
        width: 1rem;
		color: $fc-label;
      }
	  span{
		  color: $fc-title;
	  }
    }
    .account-status {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
	  padding-top: .08rem;
	  font-size: .12rem;
	  color: $fc-title;
      .account-status-text {
        line-height: .17rem;
        word-break: keep-all;
      }
	  .line{
		  width: 1rem;
		  margin: 0 .24rem;
		  border: 1px solid rgba(151, 151, 151, .2);
	  }
    }
    .icon-success {
      width: .22rem;
      height: .22rem;
      background-image: url("../../assets/icon/icon-success.png");
      margin-right: .06rem;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .icon-dark {
      width: .22rem;
      height: .22rem;
      background-image: url("../../assets/icon/icon-dark.png");
      margin-right: .06rem;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
  .account-tip {
    margin-left: .29rem;
  }
}
@media screen and (max-width: 650px) {
	.line{
	  width: .30rem!important;
	  margin: 0 .06rem!important;
	}
}
@media screen and (max-width: 540px) {
  .shopping-account-management {
    margin: 0;
    .account-content {
      padding: 0.16rem;
      .account-content-item {
        display: flex;
        line-height: 0.2rem;
        margin-bottom: 0.16rem;
        font-size: 0.12rem;
        label {
          width: 1rem;
        }
      }
      .account-status {
        display: flex;
        align-items: center;
        .account-status-text {
          line-height: 0.22rem;
          margin-right: 0;
        }
      }
      .icon-success {
        width: 0.22rem;
        height: 0.22rem;
        background-image: url("../../assets/icon/icon-success.png");
        margin-right: 0.06rem;
      }
      .icon-dark {
        width: 0.22rem;
        height: 0.22rem;
        background-image: url("../../assets/icon/icon-dark.png");
        margin-right: 0.06rem;
      }
    }
    .account-tip {
      margin-left: 0.29rem;
    }
  }
}
</style>