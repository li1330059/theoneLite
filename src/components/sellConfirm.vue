<template>
  <div class="shop-com-sellconfirm" v-if="isShow">
    <div class="mask" @click="close"></div>
    <div class="content">
      <div class="head">
        <div>寄售</div>
        <div class="bg-img icon-close hand" @click="close"></div>
      </div>
      <div class="txt-wrap" v-html="txt"></div>
      <div class="btn-group btn-group-end">
        <div class="btn btn-primary" @click="submit">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      txt: "",
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
    init({ txt, sure }) {
      this.sure = sure;
      this.txt = txt;
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    },
    submit() {
      if (this.sure && typeof this.sure == "function") {
        this.sure();
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.shop-com-sellconfirm {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(51, 51, 51, 0.3);
    backdrop-filter: blur(1px);
  }
  .icon-close {
    background-image: url("../assets/images/sell-close.png");
    width: 0.24rem;
    height: 0.24rem;
  }
  .txt-wrap {
    font-size: 0.14rem;
    font-weight: 400;
    color: $fc-main;
    span {
      color: rgba(238, 66, 66, 1);
    }
  }
  .head {
    font-size: .18rem;
    color: $fc-title;
    line-height: .25rem;
    margin-bottom: 0.46rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content {
    width: 90%;
    max-width: 4.8rem;
    padding: .16rem .19rem .33rem .31rem;
    border-radius: $radius;
    max-width: 4.8rem;
    background: $white;
    position: relative;
    top: 0;
    left: 0;
    z-index: 9;
    .txt-wrap {
      font-size: 0.14rem;
      color: $fc-title;
      line-height: 0.2rem;
      span {
        color: rgba(238, 66, 66, 1);
      }
    }
    .btn-group {
      margin-top: 0.48rem;
      .btn {
		width: 1.2rem;
		height: .4rem;
		margin: initial;
      }
    }
  }
  @media screen and (max-width: 540px) {
	  .icon-close {
	    background-image: url("../assets/images/sell-close.png");
	    width: 0.14rem;
	    height: 0.14rem;
	  }
	  .txt-wrap {
	    font-size: 0.14rem;
	    font-weight: 400;
	    color: $fc-main;
	    span {
	      color: rgba(238, 66, 66, 1);
	    }
	  }
	  .head {
	    font-size: .2rem;
		line-height: .28rem;
	    color: $fc-title;
	    line-height: .25rem;
	    margin-bottom: 0.33rem;
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	  }
	  .content {
	    width: 100%;
	    max-width: 4.8rem;
		margin: 0 .32rem;
	    padding: .16rem;
	    border-radius: $radius;
	    max-width: 4.8rem;
	    background: $white;
	    position: relative;
	    top: 0;
	    left: 0;
	    z-index: 9;
	    .txt-wrap {
	      color: $fc-title;
	      line-height: .24rem;
	      font-size: .12rem
	      span {
	        color: rgba(238, 66, 66, 1);
	      }
	    }
	    .btn-group {
	      margin-top: 0.35rem;
	      .btn {
	  		width: 100%;
	  		height: .36rem;
	  		margin: initial;
	      }
	    }
	  }
  }
}
</style>
