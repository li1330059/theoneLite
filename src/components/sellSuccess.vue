<template>
  <el-dialog
    class="v1-dialog-mycenter shopping-sellsuccess"
    :visible.sync="isShow"
    append-to-body
    :width="`${agreewidth}`"
    title="寄售"
  >
    <div class="content">
      <div class="bg-img success-img"></div>
      <div class="message">恭喜您寄售成功</div>

      <div class="btn-group">
        <div class="btn btn-primary" @click="submit">确定</div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      agreewidth: `4.6rem`,
      isShow: false,
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userStore.userInfo;
    },
  },
  beforeDestroy() {},
  created() {},
  mounted() {},
  methods: {
    init() {
      this.isShow = true;
    },
    submit() {
      this.isShow = false;
      this.$emit("listen");
    },
  },
};
</script>

<style lang='scss' scoped>
	.shopping-sellsuccess{
		.success-img {
		  background-image: url("../assets/images/sell-success-img.png");
		  width: 2.46rem;
		  height: 1.82rem;
		  margin: 0 auto 0.24rem;
		}
		.message {
		  font-size: 0.14rem;
		  font-weight: 400;
		  color: $fc-main;
		  text-align: center;
		  margin-bottom: 0.32rem;
		}
		.btn-group{
		  .btn{
		    width:100%;
		  }
		}
	}
</style>
