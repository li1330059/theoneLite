<template>
  <div
    class="base-upload"
    v-loading="loading"
    element-loading-text="上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <el-image
      :src="picUrl"
      v-if="picUrl"
      class="preview-image"
      fit="contain"
    ></el-image>
    <input
      accept="image/jpg,image/jpeg,image/png"
      type="file"
      ref="refFile"
      @change="onFileChange"
    />
    <slot></slot>
  </div>
</template>

<script>
import { uploadCert } from "../api/base";
import EXIF from "exif-js";
import imageCompress from "@/utils/image-compress";
export default {
  data() {
    return {
      picUrl: "",
      roate: 90,
      loading: false
    };
  },
  methods: {
    onFileChange() {
      let file = this.$refs.refFile.files;
       if (file[0] && file[0].size > 1024 * 1024 * 6) {
        this.$message.warning("图片体积大于6M，请压缩后上传");
        return;
      }
      this.getExif(file[0]).then((res) => {
        let obj = {
          0: 0,
          8: -90,
          3: 180,
          6: 90,
        };
        this.roate = obj[res];
      });
      try {
        imageCompress(file[0], { size: 2 * 1024 * 1024 }).then(async (blob) => {
          this.up(blob, `${Date.now()}.jpg`);
        });
      } catch (e) {
        this.up(file[0]);
      }
    },

    up(file, imgType) {
      let data = new FormData();
      imgType ? data.append("file", file) : data.append("type", "IdCard");
      data.append("type", "IdCard");
      if (file && file.size > 1024 * 1024 * 2) {
        this.$message.warning("图片体积大于2M，请压缩后上传");
        return;
      }
      this.loading = true
      uploadCert(data).then((res) => {
        if (res.data.code == 200) {
          this.picUrl = res.data.data.uri;
          this.$emit("uploadSucess", res.data.data);
        } else {
          this.$message.error(res.data.message);
        }
        this.loading = false
      });
    },
    getExif(imgFile) {
      return new Promise((resolve, reject) => {
        EXIF.getData(imgFile, function () {
          let exifTags = EXIF.getAllTags(this);
          // 8 表示 顺时针转了90
          // 3 表示 转了 180
          // 6 表示 逆时针转了90
          if (exifTags && exifTags.Orientation) {
            resolve(exifTags.Orientation);
          } else {
            resolve(0);
          }
        });
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.base-upload {
  width: 100%;
  height: 100%;
  position: relative;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 2;
  }
  .preview-image {
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: #fff;
  }
}
</style>
