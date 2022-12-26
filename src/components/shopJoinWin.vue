<template>
  <div>
    <div class="shop-join-m" @click="goShopJoin"></div>
    <div class="shop-join">
    	<div class="btn btn-primary"><router-link to="/shop_join">申请商家入驻</router-link></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    goShopJoin() {
      this.$router.push('/shop_join');
    },
  },
};
</script>
<style lang="scss" scoped>
.shop-join{
	position: fixed;
	right: 80px;
	bottom: 120px;
	width: 258px;
	height: 313px;
	background: url("../assets/images/shopjoin/shopjoin.png") no-repeat center;
	background-size: 100%;
	padding-bottom: 45px;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	z-index: 9999;
	.btn{
		width: 160px;
		line-height: 40px;
		a{
			color: #fff;
		}
	}
}
.shop-join-m{
		display: none;
	}
@media screen and(max-width: 540px) {
	.shop-join-m{
		display: block;
		position: fixed;
		right: .11rem;
		bottom: .16rem;
		width: 1.29rem;
		height: 1.29rem;
		background: url("../assets/images/shopjoin/shopjoin-m.png") no-repeat center;
		background-size: 100%;
		padding-bottom: 0;
		z-index: 9999;
	}
	.shop-join{
		display: none;
	}
}
</style>
