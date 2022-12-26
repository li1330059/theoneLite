<template>
  <div class="shopping-upload-idcard">
    <mine-nav :navList="navList"></mine-nav>
    <div class="" v-if="step == 1">
      <div class="idcard-title shopping-s-title shopping-c-main mb16">
        提示：请上传清晰的身份证正反面照片来完成认证
      </div>
      <div class="idcard-content">
        <div class="idcard-wrap">
          <div class="idcard-front">
            <base-upload @uploadSucess="uploadSucess" />
          </div>
          <div class="idcard-tips-text shopping-s-title shopping-c-main">
            点击上传身份证照片头像面
          </div>
        </div>
        <div class="idcard-wrap mt56-m">
          <div class="idcard-back">
            <base-upload @uploadSucess="uploadback" />
          </div>
          <div class="idcard-tips-text shopping-s-title shopping-c-main">
            点击上传身份证照片国徽面
          </div>
        </div>
      </div>
	  <div class="btn-group">
		  <div v-if="form.idCardFront&&form.idCardBack" class="btn btn-primary" @click="next()">确定</div>
		  <div v-else class="btn btn-disabled">确定</div>
	  </div>
    </div>
    <div class="write-info" v-if="step == 2">
      <div class="shopping-s-title c-title write-info--idname">
        <label class="name" for="">姓名：{{ userInfo.realname }}</label>
        <span></span>
        <label for="" class="ml64">身份证：{{ userInfo.idNumber }}</label>
        <span></span>
      </div>
      <div class="complete-info">
        <div class="inlne-prvice">
          <!-- 省市区三级联动 -->
          <mine-city @handlerDistrictCode="handlerDistrictCode"></mine-city>
        </div>
        <div class="inlne-prvice">
          <div class="shopping-s-title shopping-c-main mb16 bank-label">银行卡</div>
          <div class="row-between-center bank-input">
            <el-select
              size="medium"
              v-model="form.bankCardNo"
              placeholder="请选择银行卡"
              @change="handlerIdCardChange"
            >
              <el-option
                v-for="item in cardList"
                :key="item.uuid"
                :label="item.bankAccont"
                :value="item.uuid"
              >
              </el-option>
            </el-select>
            <span
              class="shopping-c-primary shopping-s-title ml12 pointer"
              @click="showBindCard"
              >添加银行卡</span
            >
          </div>
        </div>
      </div>
      <div v-if="form.districtCode&&form.bankCardNo" class="btn btn-primary bank-btn" @click="save()">确定</div>
	  <div v-else class="btn btn-disabled bank-btn">确定</div>
    </div>
    <dialog-bindcard
      v-if="isShowBindCard"
      ref="bankSubmit"
      @bindSucess="listenBankSubmit"
    ></dialog-bindcard>
    <dialog-bindcard-new
      v-if="isShowBindCardNew"
      ref="bankSubmitNew"
      :userInfo="userInfo"
      @bindSucess="listenBankSubmit"
    ></dialog-bindcard-new>
  </div>
</template>

<script>
import { openAccount, bankList } from "../../api/my";
import mineCity from "./account/mineCity.vue";
import mineNav from "./components/mineNav.vue";
export default {
  components: { mineCity, mineNav },
  data() {
    return {
      form: {
        accountType: 0,
        bankCardNo: "",
        districtCode: "",
        email: "",
        extendInfo: {},
        idCardBack: "",
        idCardFront: "",
        payChannel: "yb",
        phone: "",
      },
      uuid: "",
      isShowBindCard: false,
      isShowBindCardNew: false,
      step: 1,
      cardList: [],
      addressList: [],
      provinceCode: "",
      cityCode: "",
      districtCode: "",
      province: [],
      city: [],
      district: [],
      navList: [
        { name: "账户管理", path: "accountmanagement" },
        { name: "身份证信息", path: "" },
      ],
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userStore.userInfo;
    },
  },
  created() {
    this.getBankCardList();
    this.queryUserInfo();
  },
  methods: {
    queryUserInfo() {
      this.$store.dispatch("getUserInfo");
    },
    getBankCardList() {
      bankList({
        pageCount: 1,
        pageSize: 10,
      }).then((res) => {
        if (res.data.code == 200) {
          this.loading = false;
          this.cardList = this.cardList.concat(res.data.data);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    handlerDistrictCode(res) {
      this.form.districtCode = res;
    },
    handlerIdCardChange(item) {
      this.form.phone = item.phone;
    },
    uploadSucess(res) {
      this.form.idCardFront = res.id;
    },
    uploadback(res) {
      this.form.idCardBack = res.id;
    },
    next() {
      if (!this.form.idCardFront) {
        this.$message.error("请上传身份证头像面照片");
        return;
      }
      if (!this.form.idCardBack) {
        this.$message.error("请上传身份证国徽面照片");
        return;
      }
      this.step = 2;
      this.navList[1].name = "完善资料";
    },
    showBindCard() {
      if (this.userInfo && this.userInfo.statusVerified == 1) {
        this.isShowBindCardNew = true;
        this.$nextTick(() => {
          this.$refs.bankSubmitNew.init();
        });
      } else {
        this.isShowBindCard = true;
        this.$nextTick(() => {
          this.$refs.bankSubmit.init();
        });
      }
    },
    listenBankSubmit(res) {
      this.isShowBindCard = false;
      this.isShowBindCardNew = true;
      this.getBankCardList();
    },
    save() {
      if (!this.form.districtCode) {
        this.$message.error("请选择身份证所在省市区/县");
        return;
      }
      if (!this.form.bankCardNo) {
        this.$message.error("请选择银行卡");
        return;
      }
      openAccount(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$router.push("accountmanagement");
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.shopping-upload-idcard {
  padding: 0;
  .idcard-title {
    margin: .32rem 0 .24rem 0;
  }
  .idcard-content {
    display: flex;
    justify-content: flex-start;
	padding-left: .45rem;
  }
  .idcard-front,.idcard-back {
    width: 27.2vw;
    height: 15.7vw;
	max-width: 3.92rem;
	max-height: 2.26rem;
    background-image: url("../../assets/images/mine/bg-idcard-front.png");
	background-size: 100% 100%;
  }
  .idcard-back {
    background-image: url("../../assets/images/mine/bg-idcard-back.png");
  }
  .idcard-wrap {
    width: 27.2vw;
    height: 15.7vw;
    max-width: 3.92rem;
    max-height: 2.26rem;
    &:first-child {
      margin-right: 4vw;
    }
  }
  .idcard-tips-text {
    text-align: center;
    margin-top: .16rem;
  }
  .btn-group{
	  width: 58.4vw;
	  max-width: 8.6rem;
	  margin-left: 0.45rem;
	  .btn {
	    margin: 1.24rem auto 0;
		width: 4.24rem;
		height: .48rem;
		line-height: .48rem;
	  }
  }
  // 开户完善资料
  .write-info {
	  max-width: 9.79rem;
    .write-info--idname {
      padding: .16rem 0;
      border-bottom: 1px solid $bc-bottom;
      margin: .16rem 0 .08rem;
	  font-size: .14rem;
	  color: $fc-title;
	  line-height: .18rem;
    }
	.bank-btn{
		margin-top: .56rem;
		height: .48rem;
		line-height: .48rem;
		width: 4.24rem;
	}
    .inlne-prvice {
      flex: none;
	  margin-left: .08rem;
	  margin-top: .16rem;
	  .bank-label{
		  color: $fc-label;
	  }
    }

    .complete-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
	  flex-wrap: wrap;
    }

    .el-select {
      flex: auto;
	  width: 3.37rem;
	  height: .48rem;
	  ::v-deep .el-input--medium{
		  width: 3.37rem;
		  height: .48rem;
		  .el-input__inner{
			  width: 3.37rem;
			  height: .48rem;
		  }
	  }
    }

    .ml64 {
      margin-left: 164px;
    }

    .mb16 {
      margin-bottom: 16px;
    }
  }
}
@media screen and (max-width: 800px) {
  .shopping-upload-idcard {
    .idcard-title {
      margin: 0.16rem 0 0.16rem 0;
    }
    .idcard-content {
      display: block;
	  padding: 0;
    }
    .idcard-front,.idcard-back {
		width: 3.92rem;
		height: 2.26rem;
		background-image: url("../../assets/images/mine/bg-idcard-front.png");
		background-size: 100% 100%;
    }
    .idcard-wrap {
      width: 3.92rem;
      height: 2.26rem;
      &:first-child {
        margin-right: 0;
      }
    }
    .idcard-tips-text {
      text-align: center;
      margin-top: .16rem;
    }
    .btn-group{
    	  width: 3.92rem;
    	  max-width: 8.6rem;
    	  margin-left: 0;
		  margin-left: 0;
    	  .btn {
    	    margin: .68rem auto 0;
    		width: 3.92rem;
    		height: .48rem;
    		line-height: .48rem;
    	  }
    }
    .idcard-tips-text {
      text-align: center;
      margin-top: 0.16rem;
    }
    .mt56-m {
      margin-top: 0.56rem;
    }
  }
}
@media screen and (max-width: 680px) {
  .shopping-upload-idcard {

    .write-info {
      .write-info--idname {
        padding: 0 0 0.16rem 0;
        border-bottom: 1px solid $color-border;
        margin: 0.16rem 0;
		.name{
			width: 1.13rem;
		}
      }
      .inlne-prvice {
        width: 100%;
        margin-bottom: 0.16rem;
		margin-left: 0;
      }
      .complete-info {
        display: block;
      }
      ::v-deep .el-select {
		flex: auto;
        width: .98rem;
		height: .4rem;
		.el-input--medium{
		  width: .98rem;
		  height: .4rem;
		  .el-input__inner{
			  width: .98rem;
			  height: .4rem;
			  padding: 0 .12rem;
		  }
		}
		&:last-child {
			width: 1.2rem;
			.el-input--medium{
			  width: 1.2rem;
			  .el-input__inner{
				  width: 1.2rem;
			  }
			}
		}
      }
	  .bank-input{
		  ::v-deep .el-select {
		    width: 2.69rem;
			.el-input--medium{
			  width: 2.69rem;
			  .el-input__inner{
				  width: 2.69rem;
			  }
			}
		  }
		  .pointer{
			  font-size: .12rem;
		  }
	  }
      .ml64 {
        margin-left: 0;
      }
      .mb16 {
        margin-bottom: 16px;
      }
    }
  }
}
@media screen and (max-width: 540px) {
  .shopping-upload-idcard {
    .idcard-title {
      margin: 0.16rem 0 0.16rem 0;
    }
    .idcard-content {
      display: block;
	  padding: 0;
    }
    .idcard-front,.idcard-back {
		width: 3.43rem;
		height: 1.98rem;
		background-image: url("../../assets/images/mine/bg-idcard-front.png");
		background-size: 100% 100%;
    }
    .idcard-wrap {
      width: 3.43rem;
      height: 1.98rem;
      &:first-child {
        margin-right: 0;
      }
    }
    .idcard-tips-text {
      text-align: center;
      margin-top: .16rem;
    }
    .btn-group{
    	  width: 3.43rem;
    	  max-width: 8.6rem;
    	  margin-left: 0;
		  margin-left: 0;
    	  .btn {
    	    margin: .68rem auto 0;
    		width: 3.43rem;
    		height: .48rem;
    		line-height: .48rem;
    	  }
    }
    .idcard-tips-text {
      text-align: center;
      margin-top: 0.16rem;
    }
    .mt56-m {
      margin-top: 0.56rem;
    }
  }
}
</style>
