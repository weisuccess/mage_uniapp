<template>
	<view class="content">
		<view class=""
			style="background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744210203337top-bg.png') no-repeat;background-size: 100% 100%;height: 400rpx;">
			<view style="height: var(--status-bar-height);width: 100%;position: fixed;z-index: 999999;"></view>
			<narBar :title="'添加钱包地址'" @back="toBack()" background="transparent"></narBar>
			<view class="vcenter" style="width:100%;height:30rpx;margin-top: var(--status-bar-height);"></view>

		</view>
		<view class="fz40" style="width: 90%;background: rgba(255,255,255,.8);margin-top: -200rpx;
			margin-left: 2.5%;margin-right: 2.5%;padding: 40rpx 2.5%;border-radius: 20rpx;">
			<view class="flex-between-center color-000 lh80">
				<view class="flex-start-center fw700" >
					货币类型
				</view>
				<view class="text-align-c fz28 ">USDT (TRC-20) <!-- <uni-icons type="right" color="#33CC33"></uni-icons> -->
				</view>
			</view>

		</view>
		<view class="" >
			<view class="">
				<!-- <view class="vcenter-left" style="line-height: 100rpx;">
					<view class="color-000 fw700 fz40" style="margin: 0 20rpx">类型</view>
				</view>
				<picker mode="selector" :range="arr" :value="index" @change="change">
					<view
						style="margin: 0 20rpx;padding: 20rpx 10rpx;border-radius: 60rpx;background-color: rgba(210, 45, 1, 0.22);"
						class="color-000 flex-between-center">
						<view style="color: #D22D01;">{{params.usdtPacksType||'请选择'}}</view>
						<uni-icons type="down" color="#D22D01"></uni-icons>
					</view>
				</picker> -->
				<view class="box" style="background-color: #33CC33;color: #fff;">
					<view style="line-height: 80rpx;font-weight: bold;font-size: 40rpx;">钱包地址</view>
					<view class="flex-between-center" style="padding: 10rpx 0;border-bottom: 1px solid #ccc;">
						<view class="w100">
							<input type="text" placeholder="请输入钱包地址" v-model="params.usdtPacksAddress" maxlength="40"
								style="height: 60rpx;line-height: 60rpx;width: 100%;" placeholder-style="color:#fff" />
						</view>
					</view>
				</view>
				<view class="box" style="color: #000;">
					<view class="color-000" style="line-height: 80rpx;font-weight: bold;font-size: 40rpx;">钱包备注</view>
					<view class="flex-between-center" style="padding: 10rpx 0;border-bottom: 1px solid #ccc;">
						<view>
							<input type="text" placeholder="请输入钱包备注" v-model="params.usdtPacksRemarks" maxlength="30"
								style="height: 60rpx;line-height: 60rpx;" placeholder-style="color:#000" />
						</view>
					</view>
				</view>
				<view class="box" style="background-color: #33CC33;color: #fff;">
					<view style="line-height: 80rpx;font-weight: bold;font-size: 40rpx;">交易密码</view>
					<view class="flex-between-center" style="padding: 10rpx 0;border-bottom: 1px solid #ccc;">
						<view>
							<input type="number" placeholder="请输入交易密码" v-model="params.payPassword" maxlength="6"
								style="height: 60rpx;line-height: 60rpx;" placeholder-style="color:#fff"/>
						</view>
					</view>
				</view>
				<!-- <view class="vcenter-left" style="line-height: 100rpx;">
					<view class="color-000" style="margin: 0 20rpx">交易密码</view>
				</view>
				<input type="number" placeholder="请输入交易密码" v-model="params.payPassword" maxlength="6"
					placeholder-style="color:#D22D01"
					style="border-radius: 60rpx;background-color: rgba(210, 45, 1, 0.22);padding: 0 10rpx;color: #D22D01;" />

				<view class="vcenter-left" style="line-height: 100rpx;">
					<view class="color-000" style="margin: 0 20rpx">钱包地址</view>
				</view>
				<input type="text" placeholder="请输入地址" v-model="params.usdtPacksAddress" maxlength="35"
					placeholder-style="color:#D22D01"
					style="border-radius: 60rpx;background-color: rgba(210, 45, 1, 0.22);padding: 0 10rpx;color: #D22D01;" />

				<view class="vcenter-left" style="line-height: 100rpx;">
					<view class="color-000" style="margin: 0 20rpx">卡包备注</view>
				</view>
				<input type="text" placeholder="请输入备注" v-model="params.usdtPacksRemarks"
					placeholder-style="color:#D22D01"
					style="border-radius: 60rpx;background-color: rgba(210, 45, 1, 0.22);padding: 0 10rpx;color: #D22D01;" /> -->

				<view style="height: 500rpx;"></view>
			</view>
		</view>

		<view class="bottom">
			<view class="authentication" @click="submit">
				立即添加
			</view>
		</view>
	</view>
</template>

<script>
	import narBar from 'pages/public/narBar.vue'
	import uploadImg from '@/components/amazarashi-uploadimg/uploadImg.vue'
	export default {
		components: {
			narBar,
			uploadImg
		},
		data() {
			return {
				bgi: 'https://lanhu-oss.lanhuapp.com/2ad3e2d35d61dd25947dc2431634f62f',
				noClick: true,
				params: {
					usdtPacksRemarks: "",
					usdtPacksType: "TRC20",
					usdtPacksAddress: "",
					payPassword: '',
					
				},
				index: 0,
				arr: ['TRC20']
			}
		},
		methods: {
			change(e) {
				this.index = e.detail.value
				this.params.usdtPacksType = this.arr[this.index]
				console.log(this.index, this.params.usdtPacksType);
			},
			toBack() {
				uni.navigateBack()
			},
			submit() {
				if (this.params.usdtPacksRemarks == '' || !this.params.usdtPacksType || !this.params.usdtPacksAddress || !this
					.params.payPassword) {
					uni.showToast({
						title: '请检查填写项',
						icon: 'none'
					})
					return;
				}

				this.$request.post({
					url: "/app/usdtAddressInfo/add",
					data: this.params,
					success: rsp => {
						uni.showToast({
							title: rsp.message,
							icon: 'none'
						})
						if (rsp.code == 200) {
							setTimeout(() => {
								uni.navigateBack()
							}, 1000)
						}
					}
				})
			},
		}
	}
</script>
<style>
	page{
		background-color: #f1f1f1;
	}
</style>
<style scoped lang="scss">
	.content {
		height: 100vh;
		color: #ffffff;
	}

	.title {
		font-size: 50rpx;
		line-height: 100rpx;
	}

	.box {
		width: 90%;
		margin:30rpx 2.5% 0;
		padding: 5% 2.5%;
		background-color: #fff;
		border-radius: 10rpx;
		box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.2);

		// input {
		// 	border-bottom: 1rpx solid #F2F2F2;
		// 	height: 80rpx;
		// 	line-height: 80rpx;
		// 	margin: 0 20rpx;
		// 	color: #000;
		// }
	}

	.color-000 {
		color: #000;
	}



	.bottom {
		position: fixed;
		bottom: 100rpx;
		width: 100%;

	}

	.line {
		color: #B6B6B6;
		text-align: center;
		font-size: 22rpx;
		margin-top: 50rpx;
	}

	.authentication {
		width: 80%;
		margin: 0 10%;
		// background-color: #DD322A;
		background: url('/static/login/login-dlbtn.png') no-repeat;
		background-size: 100% 100%;
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		color: #fff;
		border-radius: 10rpx;
	}
</style>