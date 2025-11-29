<template>
	<view class="container">
		
		<web-view :src="urls" class="webview "></web-view>
 
		<cover-view class="bai" @click="back()"   >
			返回
		</cover-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				urls: 'http://www.baidu.com',
				width: 0,
			};
		},
		onLoad(opt) {
			
			console.log(decodeURIComponent (opt.url));
			 
			this.urls = decodeURIComponent (opt.url)
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
				console.log('fanhddui');
				uni.navigateBack()
			}
		}
	};
</script>
<style>
	.container {
	  display: flex;
	  flex-direction: column;
	  width: 100%;
	  height: 100%;
	  margin-top: 50rpx;
	}
	.webview {
	  flex-grow: 1; /* 让web-view填充剩余空间 */
	 
	}
	.button-container {
	  display: flex;
	  justify-content: flex-end; /* 右对齐 */
	  padding: 10px; /* 根据需要调整 */
	}
	.bai {
		z-index: 90;
		/* height: 100rpx; */
		position: fixed;
		top: 70rpx;
		right: 30rpx;
		/* width: 200rpx; */
		text-align: center;
		height: 40rpx;
		
		width: 100rpx;
		background-color: #fff;
		border-radius: 40rpx;
		/* line-height: 100rpx; */
		/* margin-left: 300rpx; */
	}
</style>