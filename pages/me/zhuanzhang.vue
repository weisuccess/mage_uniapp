<template>
	<view class="content">
		<view class=""
			style="background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744210203337top-bg.png') no-repeat;background-size: 100% 100%;height: 400rpx;">
			<view style="height: var(--status-bar-height);width: 100%;position: fixed;z-index: 999999;"></view>
			<narBar :title="'转账'" @back="toBack()" background="transparent"></narBar>
			<view class="vcenter" style="width:100%;height:30rpx;margin-top: var(--status-bar-height);"></view>

		</view>
		<view class="fz40" style="width: 90%;background: rgba(255,255,255,.8);margin-top: -200rpx;
			margin-left: 2.5%;margin-right: 2.5%;padding: 2.5%;border-radius: 20rpx;">
			<view class="flex-between-center">
				<view class="flex-start-center" style="line-height: 80rpx;font-weight: bold;">
					账户余额
				</view>
				<view class="text-align-c fz28 color-fff"
					style="background-color: #33CC33;width: 200rpx;margin-top: 30rpx;height: 60rpx;line-height: 60rpx;border-radius: 60rpx;"
					@tap="txjl">转账记录 <uni-icons type="right" color="#fff"></uni-icons> </view>
			</view>

			<view> <text class="fw700 mr20"> {{money}}</text> USDT(TRC-20)</view>
		</view>
		<view class="box" style="background-color: #33CC33;color: #fff;">
			<view style="line-height: 80rpx;font-weight: bold;font-size: 40rpx;">转账金额</view>
			<view class="flex-between-center" style="padding: 10rpx 0;border-bottom: 1px solid #ccc;">
				<view>
					<input type="number" placeholder="请输入转账金额" v-model="outData.transferMoeny"
						style="height: 60rpx;line-height: 60rpx;" placeholder-style="color:#fff" @input="checkInput" />
				</view>
				<view style="width: 300rpx;text-align: right;color: #fff;font-weight: bold;">USDT(TRC-20)</view>
			</view>
		</view>
		<!-- <view class="box">
			<view style="line-height: 80rpx;">转账金额 (USDT)
			</view>
			<view class="flex-between-center"
				style="background-color: rgba(210, 45, 1, 0.22);border-radius: 60rpx;padding: 10rpx 20rpx;">
				<view style="font-size: 60rpx;font-weight: bold;display: flex;align-items: center;">
					<input type="number" v-model="outData.transferMoeny" maxlength="20"
						style="font-size: 60rpx;color: #D22D01;" @input="checkInput"
						placeholder-style="color:#D22D01" />
				</view>
				<view style="width: 300rpx;text-align: right;color: #D22D01;font-weight: bold;">USDT(TRC-20)</view>
			</view>
		</view> -->
		<view class="box">
			<view style="line-height: 80rpx;font-weight: bold;font-size: 40rpx;">收款账户</view>
			<view class="flex-between-center" style="padding: 10rpx 0;border-bottom: 1px solid #ccc;">
				<view>
					<input type="number" placeholder="请填写收款账户" v-model="outData.transferAccount"
						style="height: 60rpx;line-height: 60rpx;" placeholder-style="color:#aaa" />
				</view>
			</view>
		</view>
		<view class="box">
			<view style="line-height: 80rpx;font-weight: bold;font-size: 40rpx;">交易密码</view>
			<view class="flex-between-center" style="padding: 10rpx 0;border-bottom: 1px solid #ccc;">
				<view>
					<input type="number" placeholder="请输入交易密码" v-model="outData.payPassword" maxlength="6"
						style="height: 60rpx;line-height: 60rpx;" placeholder-style="color:#aaa" />
				</view>
			</view>
		</view>
		<button class="ts-btn" style="width: 80%;color: #fff;margin-top: 60rpx;" @click.stop="$noMultipleClicks(submit,'')">确定转账</button>
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
				noClick: true,
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				index: 0,
				money: '',
				outData: {
					transferAccount: '',
					transferMoeny: 0,
					payPassword: ''
					// newPassword: ''
				},
				tradeValue: 0, //转入余额弹窗里输入框
				select: {}, //已选择提现方式具体卡号
				timer: null,
				batpremium: {}
			}
		},
		onLoad(opt) {
			this.getList()
		},
		methods: {
			txjl() {
				uni.navigateTo({
					url: '/pages/me/zzjl'
				})
			},
			allm() {
				this.tradeValue = this.money
			},
			closezujian() {
				this.show = false
				this.popshow = false
			},
			checkInput(e) {
				console.log(e, this.money);
				this.$nextTick(() => {
					let value = e.detail.value;
					if (Number(value) > this.money) {
						value = this.money;
					}
					this.outData.transferMoeny = value;
				})
				console.log(this.outData.transferMoeny);
				clearTimeout(this.timer);

				this.timer = setTimeout(() => {}, 500);
			},

			all() {
				this.outData.transferMoeny = this.money
				// this.checkInput()
			},
			getList() {
				this.$request.get({
					url: '/app/dreamUserInfo/getUser',
					success: rsp => {
						this.money = rsp.data.balance
					}
				})
			},
			submit(e) {
				if (!this.outData.transferMoeny || Number(this.outData.transferMoeny) < 100) {
					uni.showToast({
						title: "最低金额100USDT",
						icon: 'none',
						duration: 1500
					});
					return false;
				}
				if (!this.outData.transferAccount) {
					uni.showToast({
						title: "请设置收款账户",
						icon: 'none',
						duration: 1500
					});
					return false;
				}
				this.$request.post({
					url: '/app/transferAuditInfo/getTransfer',
					data: this.outData,
					success: rsp => {
						if (rsp.code == 200) {
							this.getList()
							this.outData.payPassword=''
						}
						uni.showToast({
							title: rsp.message,
							icon: 'none'
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
<style>
	page {
		background-color: #F3F3F3;
	}
</style>
<style>
	.content {
		/* background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		background-size: 100% 70%;
		height: 100vh;
		color: #3A3A3A; */
	}

	.box {
		width: 90%;
		margin: 2.5%;
		padding: 5% 2.5%;
		background-color: #fff;
		border-radius: 10rpx;
		box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.2);
	}

	.pop-input {
		width: 65%;
		height: 100rpx;
		box-shadow: 3rpx 0px 6rpx 0px #004AC9;
		border-radius: 12rpx;
		border: 2rpx solid #347FFE;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
	}
</style>