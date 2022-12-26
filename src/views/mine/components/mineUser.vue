<template>
  <!-- 用户信息 -->
  <div class="mine-user-info">
    <div class="head-img">
      <img :src="userInfo.avatar" alt="" srcset="" />
    </div>
    <div class="user-name shopping-s-title shopping-c-main">
      {{ userInfo.nickname }}
    </div>
		<div class="user-introduce">
		  {{ userInfo.introduce }}
		</div>
  </div>
</template>

<script>
export default {
  computed: {
    userInfo() { 
      return this.$store.state.userStore.userInfo;
    },
  },
};
</script>

<style lang="scss" scoped>
.mine-user-info {
  background-image: url('../../../assets/images/mine/bg-mine-user.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: relative;
  height: 3rem;
  .head-img {
    width: 1.02rem;
    height: 1.02rem;
    border: 2px solid #ffffff;
    margin: 0 auto;
    border-radius: 50%;
    background-size: cover;
    img {
      width: 100%;
      display: block;
      border-radius: 50%;
    }
  }
  .user-name {
    margin-top: 0.12rem;
    line-height: 0.25rem;
    color: $fc-title;
	font-weight: 500;
	font-size: .18rem
  }
  .user-introduce{
  	margin-top: .08rem;
  	color: $fc-label;
	font-weight: 500;
	line-height: 0.2rem;
	font-size: .14rem
  }
}
@media screen and (max-width: 540px) {
  .mine-user-info {
    background-image: url('../../../assets/images/mine/bg-mine-user-m.png');
	background-size: cover;
	background-position: center;
	height: 1.5rem;
	padding: 0;
    .head-img {
      width: .55rem;
      height: .55rem;
      border: none;
      margin: 0 auto;
      border-radius: 100%;
      overflow: hidden;
    }
    .user-name {
      margin-top: .12rem;
      line-height: .2rem;
      font-size: .14rem;
    }
	.user-introduce{
		margin-top: .1rem;
		line-height: .17rem;
		font-size: .12rem
	}
  }
}
</style>
