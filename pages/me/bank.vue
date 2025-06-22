<template>
	<view class="content">
		<narBar :title="getLg('支付宝绑定')" @back="toBack()" color="#fff" background="transparent"></narBar>
		<view class="" style="padding: 0 30rpx;">
			<view class="box">
				<!-- <view class="vcenter-left" style="line-height: 100rpx;">
					<view class="color-000" style="margin: 0 20rpx">支付宝类型</view>
				</view>
				<picker mode="selector" :range="list" range-key="value" @change="change">
					<view class="vcenter" style="width:95%;height:40px;border-radius: 6px;
							justify-content: space-between;margin: 0 2.5%;border-bottom: 1rpx solid #F2F2F2;">
						<view class="">{{params.cardPacksType}}</view>
						<uni-icons type="down"></uni-icons>
					</view>
				</picker> -->

				<view class="vcenter-left" style="line-height: 100rpx;">
					<view class="color-000" style="margin: 0 20rpx">姓名</view>
				</view>
				<input type="text" placeholder="请输入真实姓名" v-model="params.packsName" />

				<view class="vcenter-left" style="line-height: 100rpx;">
					<view class="color-000" style="margin: 0 20rpx">支付宝账号</view>
				</view>
				<input type="text" placeholder="请输入支付宝账号" v-model="params.purseAccount" maxlength="18" />

				<!-- <view class="vcenter-left" style="line-height: 100rpx;">
					<view class="color-000" style="margin: 0 20rpx">支付宝地址</view>
				</view>
				<input type="text" placeholder="请输入卡包地址" v-model="params.purseAddress" maxlength="35" />

				<view class="vcenter-left" style="line-height: 100rpx;">
					<view class="color-000" style="margin: 0 20rpx">卡包备注</view>
				</view>
				<input type="text" placeholder="请输入卡包备注" v-model="params.cardPacksRemarks" maxlength="19" /> -->


				<view style="height: 500rpx;"></view>
			</view>
		</view>

		<view class="bottom">
			<view class="authentication" @click="submit">
				立即绑定
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
				showup: 2,
				trueName: '',
				idCard: '',
				params: {
					packsName: '',
					purseAccount: '',
					packsType:1
				},
				list: [{
						value: "TRC20",
						text: "TRC20"
					},
					{
						value: "RMB",
						text: "RMB"
					}
				],
				index: 0,
			}
		},
		methods: {
			change: function(e) {
				this.index = e.detail.value
				this.params.cardPacksType = this.list[this.index].value
			},
			toBack() {
				uni.navigateBack()
			},
			submit() {
				// if (!this.params.purseAddress || this.params.purseAddress == '') {
				// 	uni.showToast({
				// 		title: '卡包地址不能为空',
				// 		icon: 'none'
				// 	})
				// 	return
				// }
				// if (!this.params.cardPacksRemarks || this.params.cardPacksRemarks == '') {
				// 	uni.showToast({
				// 		title: '卡包备注不能为空',
				// 		icon: 'none'
				// 	})
				// 	return
				// }
				if (!this.params.packsName || this.params.packsName == '') {
					uni.showToast({
						title: '姓名不能为空',
						icon: 'none'
					})
					return
				}
				if (!this.params.purseAccount || this.params.purseAccount == '') {
					uni.showToast({
						title: '支付宝账号不能为空',
						icon: 'none'
					})
					return
				}
 
				this.$request.post({
					url: "/app/alipayInfo/add",
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

<style scoped lang="scss">
	.content {
		background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		background-size: 100% 60%;
		height: 100vh;
	}

	.title {
		font-size: 50rpx;
		line-height: 100rpx;
	}

	.box {
		width: 95%;
		height: calc(100vh - 600rpx);
		margin: 70rpx 2.5%;
		padding: 20rpx 0;
		background-color: #FFFFFF;
		border-radius: 30rpx;

		input {
			border-bottom: 1rpx solid #F2F2F2;
			height: 80rpx;
			line-height: 80rpx;
			margin: 0 20rpx;
			color: #000;
		}
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
		background-color: #9A1B1A;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		color: #fff;
		border-radius: 60rpx;
	}
</style>