<template>
	<view class="content">
		<narBar :title="getLg('礼品详情')" background="#27AE50" @back="toBack()"></narBar>
		<view class="top">
			<view style="width: 90%;margin:100rpx 2.5% 0;padding: 2.5%;border-radius: 20rpx;">
				<image :src="arr.commodityImage" style="width: 100%;height: 350rpx;border-radius: 20rpx;"></image>
			</view>
		</view>

		<view class="br20 " style="background-color: #33CC33;width: 90%;margin:200rpx 2.5% 0;padding: 2.5%;">
			<view class="color-fff fw700 py10 fz40">{{arr.commodityName}}</view>
			<!-- <view class="color-fff">月兑 111</view> -->
		</view>
		<view class="br20 " style="background-color: #fff;width: 90%;margin:30rpx 2.5% 0;padding: 2.5%;">
			<view class=" fw700 py10 fz40 lh80">礼品介绍</view>
			<rich-text :nodes="arr.commodityIntroduce"></rich-text>
		</view>
		<view class="br20 fz28" style="background-color: #fff;width: 90%;margin:30rpx 2.5% 0;padding: 2.5%;">
			<view class=" fw700 fz40 lh80">兑换条件</view>
			<view class="flex-start-start py10">
				<view style="width: 150rpx;">兑换次数</view>
				<view class="">同一用户、身份证号、手机号、终端终身 限兑{{arr.exchangeFrequency}}次</view>
			</view>
			<view class="flex-start-start py10">
				<view style="width: 150rpx;">兑后须知</view>
				<view class="">{{arr.redemptionNotice}}</view>
			</view>
		</view>
		<view class="br20 fz28" style="background-color: #fff;width: 90%;margin:30rpx 2.5% 0;padding: 2.5%;">
			<view class=" fw700 fz40 lh80">产品说明</view>
			<view class="">
				{{arr.useExplanation}}
			</view>
		</view>

		<view class="py50">
			<view class="text-align-c color-fff ts-btn" style="width: 90%;margin: 0 5%;"
				@click.stop="$noMultipleClicks(submit,'')">
				立即兑换
			</view>
		</view>


		<!-- <view class="bottom">
			<view class="">
				<text style="color: #DD322A;font-size: 40rpx;font-weight: bold;margin:0 10rpx;">
					{{arr.requiredIntegral*outData.tradeValue}} 积分</text>
			</view>

			<view class="">
				<button style="background-color: #DD322A;width: 200rpx;color: #fff;border-radius: 60rpx;"
					@click.stop="$noMultipleClicks(submit,'')">兑换</button>
			</view>
		</view> -->
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
				id: 0,
				arr: {},
				outData: {
					tradeValue: 1
				},
				noClick: true,
				type: ''
			}
		},
		onLoad(opt) {
			this.id = opt.id
			this.outData.tradeValue = Number(opt.num)
			if (opt.type) {
				this.type = opt.type
			}
			this.getArr()
		},
		methods: {
			getArr() {
				// let url = ''
				// if (this.type == 'cbg') {
				// 	url = '/app/splinterRedemptionInfo/query'
				// } else {
				// 	url = '/app/pointsRedemption/query'
				// }
				this.$request.get({
					url: '/app/integralMallInfo/getIntegralMall',
					data: {
						id: this.id,
					},
					success: rsp => {
						this.arr = rsp.data
					}
				})
			},
			num(e) {
				if (e == 1) {
					if (this.outData.tradeValue <= 0) {
						uni.showToast({
							title: '不能再减啦！',
							icon: 'none'
						})
						return
					}
					this.outData.tradeValue -= 1
				}
				if (e == 2) {
					this.outData.tradeValue += 1
				}
			},
			submit() {
				uni.navigateTo({
					url: './orderGoods?id=' + this.arr.id + '&num=' + this.outData.tradeValue
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
		background: #f1f1f1;
	}
</style>
<style scoped lang="scss">
	.content {
		// background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		// background-size: 100% 60%;
		height: 100vh;
		// color: #ffffff;
	}

	.top {
		width: 100%;
		height: 200rpx;
		background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174409903861872@3x.png') no-repeat;
		background-size: 100% 100%;
		margin-top: -10rpx;
	}


	.title {
		line-height: 80rpx;
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
		width: 90%;
		padding: 0 5%;
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