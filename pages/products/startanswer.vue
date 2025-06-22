<template>
	<view class="content">
		<view class="vbetween header_left_icon" style="width: 92%;">
			<view class="" @click="toBack()">
				<image mode="widthFix" src="/static/tabbar/back.png"></image>
			</view>
		</view>
		<view class="">
			<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737128421110dtyjf.png" mode="widthFix" style="width: 70%;margin: 150rpx 15% 0 ;"></image>
			<view class="color-fff lh90 text-align-c fw700" style="background: url('/static/login/login-dlbtn.png') no-repeat;background-size: 100% 100%;
			height: 120rpx;width: 70%;margin: 0 15%;position: fixed;bottom: 100rpx;" @click="toPage">开始答题</view>
		</view>
	</view>
</template>

<script>
	import narBar from 'pages/public/narBar.vue'
	export default {
		components: {
			narBar
		},
		methods: {
			toPage(){
				uni.redirectTo({
					url:'/pages/products/answer'
				})
			},
			toBack() {
				uni.navigateBack()
			},

		}
	}
</script>
<style scoped lang="scss">
	.content {
		background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737128549383pro-bg.jpg') no-repeat;
		width: 100vw;
		height: 100vh;
		background-size: 100% 100%;
	}

	.header_left_icon {
		width: 100rpx;
		height: 50rpx;
		margin-left: 30rpx;
		margin-top: var(--status-bar-height);
		position: fixed;
		top: 20rpx;
		z-index: 99;

		image {
			width: 58rpx;
			height: 58rpx;
		}
	}

	.box {
		width: 100%;
		font-size: 20rpx;
		border-bottom: 1px solid #b8b8b8;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 20rpx 0;
		color: #5E5959;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-around;
		color: #fff;
		padding: 10rpx 0;
		border-bottom: 1px solid #b8b8b8;
		font-size: 24rpx;

		background-size: 100% 100%;
	}
</style>