<template>
	<view class="content">
		<narBar :title="getLg('领取体验金')" @back="toBack()"></narBar>
		<view class="" style="height: var(--status-bar-height);"></view>
		<view class="box1">
			<view class="fw700 fz46 lh100">方法一：</view>
			<view class="mb40 mt20">新用户注册实名认证免费领取 1000USDT U资产体验金</view>
			<view class="btn1" @click.stop="$noMultipleClicks(toPage,'me/verified')">
				{{whether==0?'领取 1000USDT，新用户仅限1次':'已领取'}} </view>
		</view>
		<view class="box2">
			<view class="fw700 fz46 lh100">方法二：</view>
			<view class="mb40 mt20">邀请好友助力增长U资产体验金</view>
			<view class="btn2" @click.stop="$noMultipleClicks(toPage,'me/friend')">邀请赠送 150USDT体验金，收益更丰富</view>
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
				noClick: true,
				whether: 1
			}
		},
		onLoad() {
			this.whetherReceive()
		},
		methods: {
			whetherReceive() {
				this.$request.get({
					url: "/app/trialBonusRecordingInfo/whetherReceive",
					success: rsp => {
						this.whether = rsp.data
					}
				})
			},
			toPage(path) {
				if (path == 'me/verified' && this.whether != 0) {
					uni.showToast({
						title: '已领取',
						icon: 'none'
					})
					return
				}
				if (path == 'me/verified') {
					this.$request.get({
						url: "/app/trialBonusRecordingInfo/receiveTrialBonus",
						success: rsp => {
							uni.showToast({
								title: rsp.message,
								icon: 'none'
							})
							this.whetherReceive()
						}
					})
					return
				}
				if (path != 'me/verified') {
					uni.navigateTo({
						url: '/pages/' + path
					})
				}
			},
			toBack() {
				uni.navigateBack(1)
			},
		}
	}
</script>

<style>
	page {
		background: #f1f1f1;
	}
</style>
<style lang="scss" scoped>
	.box1 {
		width: 84%;
		margin: 80rpx 2.5% 30rpx;
		padding: 5.5%;
		background-color: #33CC33;
		border-radius: 16rpx;
		color: #fff;
		box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.2);
	}

	.btn1 {
		background-color: #7EF07E;
		color: #000;
		line-height: 100rpx;
		border-radius: 10rpx;
		text-align: center;
		font-weight: bold;
		width: 100%;
	}

	.box2 {
		width: 84%;
		margin: 80rpx 2.5% 30rpx;
		padding: 5.5%;
		background-color: #fff;
		border-radius: 16rpx;
		color: #000;
		box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.2);
	}

	.btn2 {
		background-color: #33CC33;
		color: #fff;
		line-height: 100rpx;
		border-radius: 10rpx;
		text-align: center;
		font-weight: bold;
		width: 100%;
	}
</style>