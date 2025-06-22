<template>
	<view class="container">
		<cover-view class="bai" @click="back">
			返回
		</cover-view>
		<web-view :src="urls"></web-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				urls: '',
				width: 0,
			};
		},
		onLoad(opt) {
			this.urls = opt.url
			let that=this
			uni.getSystemInfo({
				success: function (res) {
					that.width = res.windowWidth;   // 窗口宽度
					console.log(that.width);
					
				}
			});
			console.log(opt,this.width);
		},
		onHide() {
			clearInterval(this.t);
		},
		methods: {
			back() {
				console.log('fanhui');
				uni.navigateBack()
			}
		}
	};
</script>
<style>
	.bai {
		z-index: 999999;
		height: 100rpx;
		position: fixed;
		top: 30rpx;
		right: 30rpx;
		width: 200rpx;
		text-align: right;
		line-height: 100rpx;
		margin-left: 300rpx;
	}
</style>