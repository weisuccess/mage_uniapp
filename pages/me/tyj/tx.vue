<template>
	<view class="">
		<view class="content">
			<narBar :title="getLg('体验金收益提现')" color="#000" @back="toBack()" background="transparent"></narBar>
			<view style="width: 90%;border-radius: 30rpx;margin: var(--status-bar-height) 5% 0;">
				<!-- <scroll-view scroll-y="true" class="box" :style="{height:windowHeight+'px'}"> -->
				<view class="" style="width: 90%;margin: 50rpx 5% 0;">
					<view class="flex-center-center lh100"
						style="background: linear-gradient(to right, #FFEBC5, #FCEFDF);border-radius: 20rpx 20rpx 0 0;">
						<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737128128154mon.png" mode="widthFix" style="width: 50rpx;height: 50rpx;">
						</image>
						<view class="ml10 fz46" style="color: #E12F00;">体验金收益</view>
					</view>
					<view class="flex-center-center lh100"
						style="background: linear-gradient(to right, #D22D01, #EB4502);border-radius: 0 0 20rpx 20rpx;">
						<view class="ml10 fz56 fw700" style="color: #F7D9BD;">{{user.trialBonusEarnings}} USDT</view>
					</view>
					<view class="flex-column-around-center mt30">
						<view class="fz56 fw700" style="color: #D22D01;">提现到</view>
						<view class="mt20">
							<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737128161334jiantou.png" mode="widthFix" style="width: 80rpx;height: 80rpx;">
							</image>
						</view>
					</view>
					<view class="flex-center-center lh120 mt30"
						style="box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.2);background: linear-gradient(to right, #FFEBC5, #FFF2D9);border-radius: 20rpx;">
						<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737128128154mon.png" mode="widthFix" style="width: 50rpx;height: 50rpx;">
						</image>
						<view class="ml10 fz46" style="color: #E12F00;">账户可用余额</view>
					</view>
				</view>
				<!-- </scroll-view> -->
				<view class="ts-btn text-align-c color-fff" style="position: fixed;bottom: 100rpx;width: 90%;"
					@click="WithdrawToBalance">
					一键提现
				</view>
			</view>
		</view>
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 100,
				user: {}
			}
		},

		onLoad() {
			this.getUser()
		},
		methods: {
			getUser() {
				this.$request.get({
					url: "/app/dreamUserInfo/getUser",
					success: rsp => {
						this.user = rsp.data
					}
				})
			},
			WithdrawToBalance() {
				let that = this
				uni.showModal({
					title: '请输入支付密码',
					editable: true,
					placeholderText: '请输入支付密码',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定', res);
							if(!res.content){
								uni.showToast({
									title:'请输入密码',
									icon:'none'
								})
							}
							if (res.content) {
								that.$request.post({
									url: "/app/trialBonusRecording/WithdrawToBalance",
									data: {
										payPassword: res.content,
										payoutsAmount: that.user.trialBonusEarnings
									},
									success: rsp => {
										uni.showToast({
											title: rsp.message,
											icon: 'none'
										})
										that.getUser()
									}
								})
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},

			toBack() {
				uni.navigateBack(1)
			},
		}
	}
</script>
<style scoped lang="scss">
	.content {
		background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737127969063tx-bg.png') no-repeat;
		background-size: 100% 100%;
		height: 100vh;
	}
</style>