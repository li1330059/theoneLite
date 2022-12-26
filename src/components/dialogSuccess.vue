<template>
  <el-dialog
    class="page-bindSuccess"
    :visible.sync="dialogVisible"
    :width="isMobile ? '90%' : '480px'" 
    :title="`认证成功`"
  >
    <div class="dialog-content">
        <img :src="successInfo.url" alt="" srcset="">
        <p class="c-main shopping-s-title">{{successInfo.text}}</p>
        <div class="btn btn-primary" @click="handerClose">确定</div>
    </div>
  </el-dialog>
</template>
<script>
import utils  from '../utils/utils'
export default {
  props: {
    successInfo: {
      type: Object,
      default: function () {
        return {
          url:'../assets/images/mine/bg-bind-success.png',
          text:'恭喜您'
        };
      },
    },
  },
  data() {
    return {
      isMobile: utils._isMobile(),
      dialogVisible: true,
    };
  },
  methods: {
    init(){
      this.dialogVisible = true 
    },
    handerClose() {
      this.dialogVisible = false 
      this.$emit('handlerClose')
    }
  },
};
</script>
<style lang='scss' scoped>
</style>
