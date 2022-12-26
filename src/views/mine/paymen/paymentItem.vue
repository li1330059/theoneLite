<template>
  <!-- 账单组件 -->
  <div class="shopping-account-item">
    <div class="account-item" v-for="(item, index) in list" :key="index">
      <div class="account-item-children">
        <div>
          <label for="" class="shopping-c-sub">单据编号：</label
          ><span>{{ item.dataNo }}</span>
        </div>
        <span class="c-mian">¥ {{ item.amount }}</span>
      </div>
      <div class="account-item-children">
        <div>
          <label for="" class="shopping-c-sub account-item-children-label">申请时间：</label
          ><span>{{ item.createTime }}</span>
        </div>
        <span class="c-main">{{ item.systemDesc }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
};
</script>

<style lang='scss' scoped>
.shopping-account-item {
  .account-item {
    border-bottom: 1px solid $color-border;
    padding-top: 16px;
  }
  .account-tile {
    margin: 24px 0 0 0;
    line-height: 20px;
  }
  .account-item-children {
    display: flex;
    line-height: 20px;
    margin-bottom: 12px;
    justify-content: space-between;
    .account-item-children-label {
      margin-right: 2px;
    }
	label{
		color: $fc-label;
	}
	span{
		color: $fc-title;
	}
  }
}
// 移动端样式
@media screen and (max-width: 540px) {
  .account-item {
    border-bottom: 0.01rem solid $color-border;
    padding-top: 0.16rem;
  }

  .account-tile {
    margin: 0.24rem 0 0 0;
    line-height: 0.2rem;
  }

  .account-item-children {
    display: flex;
    line-height: 0.2rem;
    margin-bottom: 0.12rem;
    justify-content: space-between;
  }
}
</style>