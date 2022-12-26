<template>
	<div class="shopping-404">
		<div>
			<div class="english">Oops! Page Not Found</div>
			<div class="chinese">哎呀！页面不见了～</div>
			<div class="img"></div>
		</div>
	</div>
</template>

<script>
</script>

<style lang='scss' scoped>
.shopping-404{
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	div{
		display: flex;
		flex-direction: column;
		align-items: center;
		.english{
			font-size: .5rem;
			font-weight: 600;
			color: $fc-main;
			margin-bottom: .16rem;
			text-align: center;
		}
		.chinese{
			font-size: .2rem;
			font-weight: 600;
			color: $fc-sub;
			text-align: center;
		}
		.img{
			width: 4.44rem;
			height: 2.64rem;
			background-image: url(../assets/images/404.png);
			background-repeat: no-repeat;
			background-size: 100%;
		}
	}
}
</style>
