
<template>
  <div class="shop-com-goodspic">
    <div class="img-wrap">
      <div
        class="cover-img-wrap bg-img"
        :style="`background-image:url(${img})`"
      ></div>
      <!-- <img :src="img" :large="lg" preview="1" class="img-preview hand" /> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    size: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: "",
    },
    lg: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang='scss' scoped>
.shop-com-goodspic {
  height: 100%;
  width: 100%;
  .img-preview {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
  .cover-img-wrap {
    width: 100%;
	height: 100%;
  }
  .img-wrap {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
	  height: 100%;
    .frame {
      position: absolute;
    }
    .top {
      top: 0;
      left: 0;
      width: 100%;
      height: 0.32rem;
    }
    .bottom {
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.32rem;
    }
    .left {
      width: 0.32rem;
      height: 100%;
      left: 0;
      top: 0;
    }
    .right {
      right: 0;
      top: 0;
      width: 0.32rem;
      height: 100%;
    }
  }
  @media screen and (max-width: 540px) {
    .img-wrap {
		padding: 0.26rem;
      .frame {
      }
      .top {
        height: 0.26rem;
      }
      .bottom {
        height: 0.26rem;
      }
      .left {
        width: 0.26rem;
      }
      .right {
        width: 0.26rem;
      }
    }
  }
}
</style>