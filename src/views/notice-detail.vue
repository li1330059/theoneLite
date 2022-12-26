<template>
  <div class="notice-detail flex-page">
    <div class="flex-wrapper">
      <div class="banner"></div>
      <div class="max-width">
        <div class="title">{{ detail.name }}</div>
        <div class="time">{{ detail.releaseTime | time  }}</div>
        <div class="content" v-html="detail.details"></div>
        <div class="share">
          <label for="">分享至</label>
          <i class="icon-wx">
            <div class="wx-share">
              <div id="qrcode"></div>
              <div class="wx-lead">
                打开微信“扫一扫”
                打开网页后点击屏幕
                右上角分享按钮
              </div>
            </div>
          </i>
          <a class="icon-qq" :href="qqShareLink" target="_blank"></a>
          <i class="icon-copy" @click="$common.copyFn(location)"></i>
        </div>
      </div>
    </div>
    <g-footer />
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      location: location.href,
      detail: {},
      qqShareConfig: {
        url: location.href,
        title: "" /*分享标题(可选)*/,
        summary: "" /*分享摘要(可选)*/,
        pics: "" /*分享图片(可选)*/,
      },
    };
  },
  computed: {
    qqShareLink() {
      var ary = [];
      for (var i in this.qqShareConfig) {
        ary.push(i + "=" + encodeURIComponent(this.qqShareConfig[i] || ""));
      }
      let href = `http://connect.qq.com/widget/shareqq/index.html?${ary.join("&")}`;
      return href;
    },
  },
  mounted() {
     new QRCode("qrcode", {
      width: 60,
      height: 60,
      text: window.location.href,
    });
  },
  filters:{
    time: function(val){
      if(val){
        return  val.replace(/\-/g,'.')
      }else {
        return '-'
      }    
    }
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$api.newsDetail({ uuid: this.$route.params.id }).then((res) => {
        if (res.data.code == 200) {
          this.detail = res.data.data;
          this.qqShareConfig.title = this.detail.name;
          (this.qqShareConfig.summary = this.detail.summarize),
            (this.qqShareConfig.pics = this.detail.cover);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.notice-detail {
  padding-top: .8rem;
  .max-width{
    max-width: 8.9rem;
    padding: 0 .3rem;
  }
  .banner {
    background: url("../assets/images/nft/notice-banner.png") no-repeat center;
    background-size: auto 100%;
    height: 16.7vw;
  }
  .title {
    color: $fc-title;
    font-weight: 600;
    font-size: 0.14rem;
    margin-top: 0.3rem;
    line-height: .2rem;
  }
  .time {
    color: $fc-title;
    font-size: 0.12rem;
    margin-top: 0.25rem;
    line-height: .17rem;
  }
  .content {
    color: $fc-main;
    font-size: 0.12rem;
    margin-top: 0.22rem;
    line-height: .3rem;
  }
  .share {
    display: flex;
    align-items: center;
    line-height: 1;
    margin-top: 0.36rem;
    margin-bottom: 0.36rem;
    .icon-wx {
      width: 0.2rem;
      height: 0.2rem;
      background: url(../assets/icon/icon-share-wx.png) no-repeat center;
      margin-left: 0.16rem;
      cursor: pointer;
      position: relative;
      &:hover{
        .wx-share{
          display:flex;
          position: absolute;
          align-items: center;
          left: 0;
          top: .3rem;
          width: 1.97rem;
        }
      }
      .wx-share{
        display:none;
        #qrcode{
         width: .6rem;
         height: .6rem;
         flex: none;
         margin-right: 0.06rem;
        }
        .wx-lead{
          color: #666;
          font-size: .12rem;
          line-height: .17rem;
          font-style: normal;
        }
      }
    }
    .icon-qq {
      width: 0.2rem;
      height: 0.2rem;
      background: url(../assets/icon/icon-share-qq.png) no-repeat center;
      margin-left: 0.16rem;
      cursor: pointer;
    }
    .icon-copy {
      width: 0.2rem;
      height: 0.2rem;
      background: url(../assets/icon/icon-share-copy.png) no-repeat center;
      margin-left: 0.16rem;
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 540px) {
  .notice-detail {
    padding-top: .44rem;
    .banner {
      display: none;
    }
    .max-width{
      padding: 0 .3rem .3rem;
      .title {
        margin-top: 0.15rem;
      }
      .time {
        color: $fc-label;
        font-size: 0.12rem;
        margin-top: 0.1rem;
        line-height: .17rem;
      }
      .content {
        color: $fc-main;
        font-size: 0.13rem;
        margin-top: 0.15rem;
        line-height: .2rem;
      }
      .share {
        margin-top: 0.17rem;
      }
    }
  }
}
</style>
