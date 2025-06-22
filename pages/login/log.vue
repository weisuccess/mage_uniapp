<template>
	<view class="content">
		<narBar :title="'登录日志查询'" @back="toBack()"></narBar>
		<view class="" style="height: var(--status-bar-height);"></view>
		<scroll-view scroll-y="true" :style="{height:windowHeight+'px'}">
			<view class="flex-start-center pd30 mt30">
				<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737137556296laba.png"
					style="width: 100rpx;height: 100rpx;margin: 0 10rpx;" mode="widthFix">
				</image>
				<view class="">
					温馨提示：地点信息仅供参考
				</view>
			</view>
			<view class="">
				<view class="flex-between-center br10"  v-for="(item,index) in arr" :key="index"
				 style="width: 90%;margin:30rpx 2.5% 0;padding: 2.5%;border: 1px solid #33CC33;">
					<view class="">
						<view class="fz35 fw700 color-33CC33 mb20">{{item.loginEquipment}}</view>
						<view class="fz26 color-666">{{item.loginIp}}</view>
					</view>
					<view class="">
						<view class="fz30 color-666 mb20">{{item.loginManner}}</view>
						<view class="fz26 color-666">{{item.createTime | dateFormat}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import narBar from 'pages/public/narBar.vue'
	export default {
		components: {
			narBar
		},
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 180,
				arr:[]
			}
		},
		onLoad(opt) {
			this.getArr()
		},
		methods: {
			getArr() {
				this.$request.get({
					url: "/app/loginLogs/list",
					success: rsp => {
						this.arr = rsp.data
					}
				})
			},
			toBack() {
				uni.navigateBack()
			}
		}
	}
</script>
<style scoped lang="scss">
	.content {
	}

	.k {
		width: 90%;
		background: #fff;
		box-shadow: 0 0 30rpx rgba(0, 0, 0, .2);
		// height: 500rpx;
		padding-bottom: 60rpx;
		margin: 5%;
		border-radius: 10rpx;
	}

	.tit {
		color: #3A3A3A;
		font-size: 30rpx;
		line-height: 70rpx;
	}

	.mon {
		color: #9B1B1A;
		font-size: 30rpx;
		height: 60rpx;
	}

	.title {
		padding: 20rpx;
		color: #3A3A3A;
	}

	.balance {
		font-size: 60rpx;
		font-weight: 600;
	}

	.box {
		width: 90%;
		padding: 2.5%;
		height: calc(100vh - 300rpx);
		margin: 100rpx 2.5%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		color: #000;
	}

	.color-000 {
		color: #000;
	}

	.minus {
		background-color: #999999;
		color: #fff;
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
		line-height: 38rpx;
		text-align: center;
	}

	.add {
		background-color: #999999;
		color: #fff;
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
		line-height: 38rpx;
		text-align: center;
	}

	input {
		width: 100rpx;
		background-color: #EFEFEF;
		border-radius: 10rpx;
		text-align: center;
		margin: 0 20rpx;
	}

	.bottom {
		position: fixed;
		width: 82%;
		bottom: 0;
		background-color: #fff;
		height: 120rpx;
		line-height: 120rpx;
		border-top: 1rpx solid #eee;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>