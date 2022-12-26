<template>
  <el-dialog
    class="page-bandCard"
    :visible.sync="dialogVisible"
    append-to-body
    :width="isMobile ? '90%' : '500px'"
    title="添加银行卡"
    @closed="closed"
  >
    <div class="dialog-content">
      <el-form :model="submitForm" :rules="rules" ref="ruleForm">
        <div class="dialog-form">
          <div class="form-line">
            <h4 class="c-sub shopping-s-title input-title">银行</h4>
            <div class="input-line">
              <el-form-item prop="bankShortName">
                <el-input
                  v-model="submitForm.bankShortName"
                  placeholder="请输入银行"
                  @blur="hideList"
                  @input="handlerDebounce(getShortBanList, 2000)"
                ></el-input>
              </el-form-item>
              <ul class="banklist" v-if="showShortBankList">
                <li
                  class="c-main shopping-s-title"
                  v-for="(item, index) in shorBankkList"
                  :key="index"
                  @click="setShortBank(item)"
                >
                  {{ item.bankShortName }}
                </li>
                <li
                  v-if="shorBankkList.length == 0"
                  class="c-main shopping-s-title"
                >
                  未能查询到此银行相关信息
                </li>
              </ul>
            </div>
          </div>
          <div class="form-line">
            <h4 class="c-sub shopping-s-title input-title">开户行</h4>
            <div class="input-line">
              <el-form-item prop="bankName">
                <el-input
                  :disabled="!submitForm.bankShortName"
                  v-model="submitForm.bankName"
                  placeholder="请输入开户行"
                  @blur="hideList"
                  @input="handlerDebounce(getBankList, 2000)"
                ></el-input>
              </el-form-item>
              <ul class="banklist" v-if="showBankList">
                <li
                  class="c-main shopping-s-title"
                  v-for="(item, index) in bankList"
                  :key="index"
                  @click="setBank(item)"
                >
                  {{ item.bankDetailName }}
                </li>
                <li v-if="bankList.length == 0" class="c-main shopping-s-title">
                  未能查询到此银行相关信息
                </li>
              </ul>
            </div>
          </div>
          <div class="form-line">
            <h4 class="c-sub shopping-s-title input-title">银行卡号</h4>
            <div class="input-line">
              <el-form-item prop="bankcard">
                <el-input
                  v-model="submitForm.bankcard"
                  placeholder="请输入银行卡号"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="form-line">
            <h4 class="c-sub shopping-s-title input-title">预留手机号</h4>
            <div class="input-line">
              <el-form-item prop="phone">
                <el-input
                  v-model="submitForm.phone"
                  placeholder="请输入预留手机号"
                ></el-input>
              </el-form-item>
            </div>
          </div>
    <!--       <h4 class="shopping-c-active shopping-s-main mt16">
            *您实名认证信息是【{{
              userInfo.realname
            }}】，请使用与实名认证相匹配的银行卡进行绑定。
          </h4> -->
          <div class="btn btn-primary" @click="submit()">确定</div>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import utils from "../utils/utils";
import { bankVerified2, bankListShortName, bankListName } from "../api/my";
export default {
  props: {
    userInfo: {
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
          { required: true, message: "请选择银行", trigger: "blur" },
        ],
        name: [{ required: true, message: "真实姓名", trigger: "blur" }],
        bankName: [
          { required: true, message: "请输入开户行", trigger: "blur" },
        ],
        bankcard: [
          { required: true, message: "请输入银行卡号", trigger: "blur" },
        ],
        idcard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入预留手机号", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (utils.checkPhoneNumber(value)) {
                callback();
              } else {
                callback(new Error("请输入正确的手机号码"));
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async init(wallet) {
      this.dialogVisible = true;
    },
    handlerDebounce(fn, time) {
      utils.throttle(fn(), 3000);
    },
    getShortBanList() {
      if (!this.submitForm.bankShortName) {
        return;
      }
      this.showShortBankList = true;
      bankListShortName({
        bankShortName: this.submitForm.bankShortName,
        pageCount: 1,
        pageSize: 5,
      }).then((res) => {
        this.shorBankkList = res.data.data.records;
        console.log(this.shorBankkList);
      });
    },
    getBankList() {
      if (!this.submitForm.bankName) {
        return;
      }
      this.showBankList = true;
      bankListName({
        bankDetailName: this.submitForm.bankName,
        bankShortName: this.submitForm.bankShortName,
        pageCount: 1,
        pageSize: 5,
      }).then((res) => {
        if (res.data.code == 200) {
          this.bankList = res.data.data.records;
        }
      });
    },
    setShortBank(item) {
      this.submitForm.bankShortName = item.bankShortName;
      this.showShortBankList = false;
    },
    setBank(item) {
      this.submitForm.bankName = item.bankDetailName;
      this.submitForm.bankUuid = item.uuid;
      this.showBankList = false;
    },
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          bankVerified2(this.submitForm).then((res) => {
            if (res.data.code == 200) {
              this.dialogVisible = false;
              this.$emit("bindSucess");
              this.closed();
            }else{
              this.$message.error(res.data.message);
            }
          });
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
<style lang='scss' scoped>
</style>
