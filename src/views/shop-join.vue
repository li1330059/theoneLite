<template>
	<div class="shopping-shopjoin">
		<div class="top-wrap">
			<div class="top-card">
				 <el-popover
				    :placement="$common._isMobile()?'bottom':'right'"
				    title=""
					popper-class="shopjoin-pop"
				    trigger="click">
					<img src="../assets/images/shopjoin/qr-code.png" alt="">
				    <div slot="reference" class="btn btn-primary">我要入驻</div>	
				  </el-popover>
			</div>
			<div class="top-img"></div>
		</div>
		<div class="msg-wrap">
			<div class="msg-icon"></div>
			<div class="msg-text">平台提供各类专业管家服务，协助您开通店铺、运营店铺、组织营销活动及分析运营数据，悉心为您解答各类疑问，引导您按相关规则展开运营；我们将竭尽全力，为您的店铺保驾护航</div>
		</div>
		<div class="title-img"></div>
		<div class="cont-img"></div>
		<g-footer />
	</div>
</template>

<script>
</script>

<style lang='scss'>
.shopping-shopjoin{
	padding-top: .8rem;
	.top-wrap{
		width: 100%;
		height: 440px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(275deg, #FDF7F7 0%, #FDF7F7 49%, #FDFDFE 100%);
		.top-card{
			width: 520px;
			height: 320px;
			background: url("../assets/images/shopjoin/top-card.png") no-repeat center;
			background-size: 100%;
			position: relative;
			margin-right: 105px;
			.btn{
				position: absolute;
				width: 160px;
				line-height: 40px;
				bottom: 72px;
				left: 52px;
			}
		}
		.top-img{
			background: url("../assets/images/shopjoin/top-img.png") no-repeat center;
			background-size: 100%;
			width: 520px;
			height: 362px;
		}
	}
	.msg-wrap{
		width: 100%;
		padding: 8px 0;
		background: rgba(245,249,255,0.66);
		box-shadow: inset 0px 1px 0px 0px #FFFFFF;
		color: #333333;
		line-height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		.msg-icon{
			width: 36px;
			height: 36px;
			background: url("../assets/images/shopjoin/msg-icon.png") no-repeat center;
			background-size: 100%;
			margin-right: 14px;
		}
	}
	.title-img{
		width: 1200px;
		height: 80px;
		margin: 60px auto 32px;
		background: url("../assets/images/shopjoin/title.png") no-repeat center;
		background-size: cover;
	}
	.cont-img{
		width: 1012px;
		height: 226px;
		margin: 0 auto;
		background: url("../assets/images/shopjoin/content.png") no-repeat center;
		background-size: 100%;
		margin-bottom: .8rem;
	}
}
.shopjoin-pop{
	padding: 0;
}
@media screen and(max-width: 540px) {
	.shopping-shopjoin{
		padding-top: .44rem;
		.top-wrap{
			width: 3.63rem;
			height: 2.24rem;
			display: flex;
			justify-content: center;
			align-items: center;
			background: none;
			margin: 0 auto;
			.top-card{
				width: 100%;
				height: 100%;
				background: url("../assets/images/shopjoin/top-m.png") no-repeat center;
				background-size: 100%;
				position: relative;
				margin-right: 0;
				display: flex;
				align-items: flex-end;
				justify-content: center;
				.btn{
					position: inherit;
					width: 3.11rem;
					line-height: .46rem;
					margin-bottom: .28rem;
				}
			}
			.top-img{
				display: none;
			}
		}
		.msg-wrap{
			width: 100%;
			padding: .16rem;
			background: rgba(245,249,255,0.66);
			box-shadow: inset 0px 1px 0px 0px #FFFFFF;
			color: #333333;
			line-height: .17rem;
			font-size: .12rem;
			display: flex;
			align-items: flex-start;
			justify-content: center;
			.msg-icon{
				width: .28rem;
				height: .28rem;
				background: url("../assets/images/shopjoin/msg-icon.png") no-repeat center;
				background-size: 100%;
				margin-right: .06rem;
			}
			.msg-text{
				flex: 1;
			}
		}
		.title-img{
			width: 3.43rem;
			height: .48rem;
			margin: .32rem auto .1rem;
			background: url("../assets/images/shopjoin/title.png") no-repeat center;
			background-size:cover;
		}
		.cont-img{
			width: 3.75rem;
			height: 1.06rem;
			margin: 0 auto;
			background: url("../assets/images/shopjoin/content-m.png") no-repeat center;
			background-size: 100%;
			margin-bottom: .5rem;
		}
	}
}
</style>
