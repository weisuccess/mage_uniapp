<template>
	<view class="content">
		<narBar :title="'登录日志查询'" @back="toBack()"></narBar>
		<view class="" style="height: var(--status-bar-height);"></view>
		<scroll-view scroll-y="true" :style="{height:windowHeight+'px'}">
			<view class="ml50 mt60 fw700">
				请绑定账号唯一设备登录
			</view>
			<view class="ml50 mt20 fw700">
				检测常用设备
			</view>
			<view class=" br10" style="width: 80%;margin:30rpx 5% 0;padding: 3% 5%;border: 1px solid #33CC33;">
				<text class="color-33CC33 fw700 mr20">{{deviceModel}}</text>序列号 {{deviceId}}
			</view>
			<view class="ts-btn color-fff text-align-c fz40" @click="bd"
			 style="width: 80%;margin:100rpx 5% 30rpx;padding: 0 5%;">
				立即绑定为固定登录设备
			</view>
			<view class="ts-btn color-fff text-align-c fz40"  @click="hd"
			style="width: 80%;margin:60rpx 5% 30rpx;padding: 0 5%;">
				点击修改登录设备
			</view>
			<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1745343810243gl.png" mode="widthFix"
				style="width: 350rpx;height: 100rpx;margin:60rpx 10% 0;"></image>
			<view class="" style="width: 80%;margin:0 5% 0;padding: 3% 5%;line-height: 1.5rem;">
				1、常用设备为当前登录设备<br>
				2、为了您的账户安全，请绑定个人登录设备，其他设备不可换登<br>
				3、绑定登录设备后，如需换绑设备登录，可点击修改登录设备，联系在线客服，提供您本人账户身份材料（身份证正反面，手持身份证），确认本人操作后，可进行新设备换绑。
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 80,
				arr: [],
				deviceId: '',
				deviceBrand: '',
				deviceModel: '',
				osName: ''
			}
		},
		onLoad(opt) {
			let that = this
			uni.getSystemInfo({
				success: function(res) {
					that.deviceId = res.deviceId;
					that.deviceBrand = res.deviceBrand;
					that.deviceModel = res.deviceModel;
					that.osName = res.osName;
				}
			});
		},
		methods: {
			bd(){
				this.$request.get({
					url: "/app/dreamUserInfo/fixedDeviceStr",
					success: rsp => {
						uni.showToast({
							title:rsp.message,
							icon:'none'
						})
					}
				})
			},
			hd(){
				this.$request.get({
					url: "/app/dreamUserInfo/updateByDeviceStr",
					success: rsp => {
						uni.showToast({
							title:rsp.message,
							icon:'none'
						})
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
	.content {}

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