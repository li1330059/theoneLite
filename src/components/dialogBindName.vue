<template>
  <el-dialog
    class="page-bandCard"
    :visible.sync="dialogVisible"
    append-to-body
    :width="isMobile ? '90%' : '500px'"
    title="设定支行名称"
    @closed="closed"
  >
    <div class="dialog-content">
      <el-form :model="submitForm" :rules="rules" ref="ruleForm">
        <div class=""></div>
        <div class="dialog-form">
          <div class="form-line">
            <h4 class="c-sub shopping-s-title input-title">银行卡号：</h4>
            <div class="input-line">
              <el-form-item>
                <div>{{ submitForm.bankAccont }}</div>
              </el-form-item>
            </div>
          </div>
          <div class="form-line">
            <h4 class="c-sub shopping-s-title input-title">银行</h4>
            <div class="input-line">
              <el-form-item prop="bankShortName">
                <el-input
                  v-model="submitForm.bankShortName"
                  placeholder="请输入银行"
                  @input="handlerDebounce(getShortBanList, 2000)"
                ></el-input>
              </el-form-item>
              <ul class="banklist" v-if="showShortBankList">
                <li
                  class="shopping-c-main shopping-s-title"
                  v-for="(item, index) in shorBankkList"
                  :key="index"
                  @click="setShortBank(item)"
                >
                  {{ item.bankShortName }}
                </li>
                <li
                  v-if="shorBankkList.length == 0"
                  class="shopping-c-main shopping-s-title"
                >
                  未能查询到此银行相关信息
                </li>
              </ul>
            </div>
          </div>
          <div class="form-line">
            <h4 class="c-sub shopping-s-title input-title">开户行</h4>
            <div class="input-line">
              <el-form-item prop="bankDetailName">
                <el-input
                  :disabled="!submitForm.bankShortName"
                  v-model="submitForm.bankDetailName"
                  placeholder="请输入开户行"
                  @input="handlerDebounce(getBankList, 2000)"
                ></el-input>
              </el-form-item>
              <ul class="banklist" v-if="showBankList">
                <li
                  class="shopping-c-main shopping-s-title"
                  v-for="(item, index) in bankList"
                  :key="index"
                  @click="setBank(item)"
                >
                  {{ item.bankDetailName }}
                </li>
                <li
                  v-if="bankList.length == 0"
                  class="shopping-c-main shopping-s-title"
                >
                  未能查询到此银行相关信息
                </li>
              </ul>
            </div>
          </div>
          <div class="btn btn-primary" @click="submit()">确定</div>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import utils from "../utils/utils";
import { updateBnakInfo, bankListShortName, bankListName } from "../api/my";
export default {
  props: {
    detail: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      isMobile: utils._isMobile(),
      submitForm: {
        bankName: "",
        bankcard: "",
        idcard: "",
        name: "",
        phoneCode: "666666",
        phone: "",
      },
      bankShortName: "",
      bankName: "",
      shorBankkList: [],
      bankList: [],
      showShortBankList: false,
      showBankList: false,
      rules: {
        bankShortName: [
          { required: true, message: "请选择银行", trigger: "change" },
        ],
        bankDetailName: [
          { required: true, message: "请选择开户行", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    async init() {
      this.dialogVisible = true;
      this.submitForm = JSON.parse(JSON.stringify(this.detail));
    },
    handlerDebounce(fn, time) {
      utils.throttle(fn(), 3000);
    },
    getShortBanList() {
      if (!this.submitForm.bankShortName) {
        return;
      }
      this.showShortBankList = true;
      this.submitForm.bankDetailName = "";
      this.submitForm.bankUuid = "";
      bankListShortName({
        bankShortName: this.submitForm.bankShortName,
        pageCount: 1,
        pageSize: 5,
      }).then((res) => {
        if (res.data.code == 200) {
          this.shorBankkList = res.data.data.records;
        }else{
          this.$message.error(res.data.message)
        }
      });
    },
    getBankList() {
      if (!this.submitForm.bankDetailName) {
        return;
      }
      this.showBankList = true;
      this.submitForm.bankUuid = "";
      bankListName({
        bankDetailName: this.submitForm.bankDetailName,
        bankShortName: this.submitForm.bankShortName,
        pageCount: 1,
        pageSize: 5,
      }).then((res) => {
        if (res.data.code == 200) {
          this.bankList = res.data.data.records;
        }else{
          this.$message.error(res.data.message)
        }
      });
    },
    setShortBank(item) {
      this.submitForm.bankShortName = item.bankShortName;
      this.showShortBankList = false;
    },
    setBank(item) {
      this.submitForm.bankDetailName = item.bankDetailName;
      this.submitForm.bankUuid = item.uuid;
      this.showBankList = false;
    },
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.submitForm.bankUuid && this.submitForm.bankDetailName) {
            this.dialogVisible = false;
            updateBnakInfo(this.submitForm).then((res) => {
              if(res.data.code == 200){
                this.dialogVisible = false;
                this.closed();
                this.$emit("bindSucess");
              }else{
                this.$message.error(res.data.message)
              }
            });
          } else {
            // 未改变数据
            if( this.submitForm.bankDetailName == this.detail.bankDetailName){
              this.dialogVisible = false
              return
            }
            this.$message.error("请通过搜索选择开户行");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    hideList() {
      if (this.bankList.length == 0) {
        this.showBankList = false;
      }
      if (this.shorBankkList.length == 0) {
        this.showShortBankList = false;
      }
    },
    closed() {
      this.submitForm = {
        bankName: "",
        bankcard: "",
        idcard: "",
        name: "",
        phoneCode: "666666",
        phone: "",
      };
    },
  },
};
</script>
<style lang="scss" scoped></style>
