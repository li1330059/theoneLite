<template>
  <!-- 卡片样式 -->
  <div class="shopping-card-item">
    <div class="card-bank-name">
      <span class="shopping-c-title shopping-s-title">{{
        cardObj.bankShortName
      }}</span>
      <span
        class="card-btn shopping-c-sub shopping-s-main pointer"
        @click="handlerDeletCard(cardObj)"
        ><i class="icon-delete"></i>解绑</span
      >
    </div>
    <div class="card-info">
      <span class="card-num">{{ cardObj.bankAccont }}</span>
      <span class="card-openname shopping-c-primary pointer" @click="editCard(cardObj)"
        >设定支行</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardObj: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    editCard(cardObj) {
      this.$emit("handlerEditCard", cardObj);
    },
    handlerDeletCard(cardObj) {
      this.$emit("handlerDeletCard", cardObj);
    },
  },
};
</script>

<style lang='scss' scoped>
$card-bg: "../../../assets/images/mine/card-bg.png"; // 卡片背景
.shopping-card-item {
  width: 3.79rem;
  height: 1.96rem;
  padding: .24rem;
  background-image: url($card-bg);
  background-position: center;
  background-size: 100%;
  margin: 0 .32rem .32rem 0;
  box-shadow: 0px 2px 42px 0px rgba(67,39,39,0.0600);
  .card-bank-name {
    display: flex;
    justify-content: space-between;
    line-height: .2rem;
	font-size: .14rem;
	font-weight: 600;
    margin: 0;
	color: $fc-title;
  }
  .card-btn {
    display: flex;
    align-items: center;
    cursor: pointer;
	font-size: .13rem;
	font-weight: 400;
	color: $fc-label;
	line-height: .18rem;
  }
  .icon-delete {
    width: .16rem;
    height: .16rem;
    background-image: url("../../../assets/icon/icon-delete.png");
    margin-right: .12rem;
  }
  .card-info {
    display: flex;
    justify-content: space-between;
    font-size: .12rem;
    margin-top: 1.12rem;
	line-height: .18rem;
    .card-num {
      display: flex;
      justify-content: space-between;
      margin: 0;
	  font-size: .13rem;
	  color: $fc-title;
    }
  }
}
@media screen and (max-width: 540px) {
  .shopping-card-item {
    width: 100%;
    height: 1.96rem;
    padding: 0.24rem;
    margin: 0 0 0.16rem 0;
    background-size: cover;
    .card-bank-name {
      display: flex;
      justify-content: space-between;
      line-height: 20px;
      margin: 0;
    }
    .card-btn {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .card-info {
      font-size: 0.13rem;
      margin-top: 1.12rem;
      .card-num {
        display: flex;
        justify-content: space-between;
        margin: 0;
      }
    }
  }
}
</style>