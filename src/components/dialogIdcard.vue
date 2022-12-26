<template>
  <el-dialog
    class="page-bandCard"
    :visible.sync="dialogVisible"
    append-to-body
    :width="isMobile ? '90%' : '480px'"
    title="实名认证"
    @closed="closed"
  >
    <div class="dialog-content">
      <el-form :model="submitForm" :rules="rules" ref="ruleForm">
        <div class="dialog-form">
          <div class="form-line">
            <h4 class="c-sub shopping-s-title mt0 input-title">真实姓名</h4>
            <div class="input-line">
              <el-form-item prop="realname">
                <el-input
                  v-model="submitForm.realname"
                  placeholder="请输入真实姓名"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="form-line">
            <h4 class="c-sub shopping-s-title input-title">身份证号</h4>
            <div class="input-line">
              <el-form-item prop="idNumber">
                <el-input
                  v-model="submitForm.idNumber"
                  placeholder="请输入身份证号"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <h4 class="mt16 shopping-c-main shopping-s-main">
            应国家法律法规要求，购买前请完成实名认证。实名认证完成后，您的提现账户将与实名信息进行绑定，请知晓！
          </h4>
          <h4 class="mt16 shopping-c-active shopping-s-main">
            实名认证一经审核通过，非平台认可的法定事由不得修改
          </h4>
          <div class="btn btn-primary" @click="submit()">确定</div>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import utils from "../utils/utils";
import { verifiedIdcard } from "../api/my";
export default {
  data() {
    return {
      dialogVisible: false,
      isMobile: utils._isMobile(),
      submitForm: {
        idNumber: "",
        phoneCode: "666666",
        realname: "",
      },
      rules: {
        idNumber: [
          { required: true, message: "请填写身份证号", trigger: "blur" },
        ],
        realname: [
          { required: true, message: "请填写真实姓名", trigger: "blur" },
        ],
      },
      userInfo: {},
    };
  },
  methods: {
    init() {
      this.dialogVisible = true;
    },
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          verifiedIdcard(this.submitForm).then((res) => {
            if (res.data.code == 200&&res.data.data) {
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
    closed() {
      this.submitForm = {
        idNumber: "",
        phoneCode: "666666",
        realname: "",
      };
    },
  },
};
</script>
<style lang='scss' scoped>
</style>
