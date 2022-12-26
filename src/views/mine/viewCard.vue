<template>
  <div class="shopping-view-idcard">
    <mine-nav :navList="navList"></mine-nav>
    <div class="idcard-title shopping-s-title shopping-c-main">
      您上传的身份证照片如下
    </div>
    <div class="idcard-content">
      <div class="idcard-wrap">
        <div
          class="idcard-front"
          :style="{ backgroundImage: `url(${cardDetail.idnumberFront})` }"
        ></div>
        <div class="idcard-tips-text shopping-s-title shopping-c-main">
          身份证照片头像面
        </div>
      </div>
      <div class="idcard-wrap mt56-m">
        <div
          class="idcard-back"
          :style="{ backgroundImage: `url(${cardDetail.idnumberBack})` }"
        ></div>
        <div class="idcard-tips-text shopping-s-title shopping-c-main">
          身份证照片国徽面
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCardImage } from "../../api/my";
import mineNav from "./components/mineNav.vue";
export default {
  components: { mineNav },
  data() {
    return {
      cardDetail: {},
      navList: [
        { name: "账户管理", path: "accountmanagement" },
        { name: "身份证信息", path: "" },
      ],
    };
  },
  created() {
    this.queryUserInfo();
  },
  methods: {
    queryUserInfo() {
      getCardImage().then((res) => {
        this.cardDetail = res.data.data;
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.shopping-view-idcard {
  .idcard-title {
    margin: 32px 0 24px 0;
  }
  .idcard-content {
    display: flex;
    justify-content: center;
  }
  .idcard-front {
    width: 392px;
    height: 226px;
    border: 1px solid $color-border;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .idcard-wrap {
    width: 392px;
    &:first-child {
      margin-right: 56px;
    }
  }
  .idcard-back {
    width: 392px;
    height: 226px;
    border: 1px solid $color-border;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .idcard-tips-text {
    text-align: center;
    margin-top: 16px;
  }
}
@media screen and (max-width: 540px) {
  .shopping-view-idcard {
    .idcard-title {
      margin: 0.16rem 0 0.16rem 0;
    }
    .idcard-content {
      display: block;
    }
    .idcard-front {
      width: 100%;
      height: 1.98rem;
    }
    .idcard-wrap {
      width: 100%;
      display: block;
      margin-right: 0;
      &:first-child {
        margin-right: 0;
      }
    }
    .idcard-back {
      width: 100%;
      height: 1.98rem;
    }
    .idcard-tips-text {
      text-align: center;
      margin-top: 0.16rem;
    }
    .mt56-m {
      margin-top: 0.56rem;
    }
  }
}
</style>