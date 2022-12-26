 <template>
  <div class="shopping-previewimg">
    <div class="ui-preview-wrap">
    <div class="preview-img" :style="`background-image:url(${coverImg})`" ></div>

      <div
        class="icon-preview-wrap"
        @click.stop="onPlayVideo"
        v-if="info.commodity && info.commodity.typeFile == 3"
      >
        <div class="icon-play icon" />
      </div>
      <div v-else>
        <div
          class="icon-preview-wrap"
          @click.stop="onStop"
          v-if="isShowPreview"
        >
          <img
            class="img"
            v-lazy="coverImg"
            :large="picture ? picture : coverImg"
            preview="1"
            preview-text="缩略图与大图模式"
          />
          <div class="icon-preview icon" />
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: "PreviewImg",
  components: {},
  data() {
    return {};
  },
  props: {
    cover: String,
    picture: String,
    go: Function,
    isShowPreview: {
      type: Boolean,
      default: true,
    },
    info: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    coverImg() {
      return this.cover;
    },
  },
  mounted() {
    console.log(this.isShowPreview);
  },

  methods: {
    onStop(e) {
      return false;
    },
    onPlayVideo() {
      if (this.info.commodity && this.info.commodity.actualPicture) {
        this.$store.commit("setGoodsVideoInfo", {
          isShow: true,
          src: this.info.commodity.actualPicture,
        });
      } else {
        this.$message.warning("暂无视频");
      }
    },
  },
};
</script> 
  
<style lang='scss' scoped>
.shopping-previewimg {
  .video-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999999;
  }
  .ui-preview-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    padding-bottom: 100%;
    .preview-img {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .icon-preview-wrap {
    position: absolute;
    bottom: 0.1rem;
    right: 0.1rem;
    width: 25px;
    height: 25px;
    .icon {
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }

    .icon-preview {
      background-image: url("~@/assets/icon/icon-img-preview.png");
    }
    .img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      opacity: 0;
    }
  }
}
</style>