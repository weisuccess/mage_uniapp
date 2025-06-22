<template>
	<view class="">
		<view :style="{'background':background,'backgroundSize':'100% 100%'}"
			style="position: fixed;z-index: 999999;width: 100%;top: 0;">
			<view style="height: var(--status-bar-height);width: 100%;"></view>
			<!-- <view :style="{'height':statusBarHeight+'px','background':background}"
			style="width: 100%;position: fixed;z-index: 999999;"></view> -->
			<!-- <view :style="{'height':statusBarHeight+'px'}"
			style="width: 100%;position: fixed;top: 0;left: 0;z-index: 999;background:#333333"></view> -->
			<!-- <view style="height: var(--status-bar-height);width: 100%;" :style="{'background':background}"></view> -->
			<view class="vcenter headerbox" :style="{top:'var(--status-bar-height)'}">
				<view class="vcenter header_left_icon1">
					<view class="" @click="toBack()" v-if="back">
						<image mode="widthFix" src="/static/tabbar/back.png"></image>
					</view>
				</view>
				<view class="header_title" :style="{'color':color}">{{getLg(title)}}</view>
				<view class="vcenter header_right_icon" @click="toLog()" v-if="showRightBtn">
					<view class="cny" v-if="rightTxt=='cny'">
						<image src="/static/coin/cny.png"></image>
						<text class="vfm">CNY</text>
					</view>
					<view style="width: 200rpx;text-align: right;font-size: 28rpx;" v-if="rightTxt=='add'">
						添加
					</view>
					<view style="width: 250rpx;text-align: right;font-size: 24rpx;color:#fff;" v-if="rightTxt=='dtjl'">
						定投记录
					</view>
					<image :src="img" mode="widthFix" v-if="rightTxt=='icon'" @click="notice"
						style="width: 35rpx;height: 35rpx;"></image>
					<view style="width: 200rpx;text-align: right;font-size: 24rpx;color: #fff;" v-if="rightTxt=='qd'">
						打卡记录
					</view>
				</view>
				<view class="vcenter header_right_icon" v-else></view>
			</view>
			<view style="height: 100rpx;width: 100%;"></view>
		</view>
		<view style="height: 100rpx;width: 100%;"></view>
	</view>
</template>

<script>
	export default {
		props: {
			background: {
				type: String,
				default: "url('/static/top-bg.png') no-repeat"
			},
			title: {
				type: String,
				default: ""
			},
			showRightBtn: {
				type: Boolean,
				default: false
			},
			rightTxt: {
				type: String,
				default: "log"
			},
			color: {
				type: String,
				default: "#fff"
			},
			back: {
				type: Boolean,
				default: true
			},
			img: {
				type: String,
				default: ""
			},
		},
		data() {
			return {}
		},
		created() {
			this.statusBarHeight = uni.getStorageSync('statusBarHeight')
			console.log(this.img, this.rightTxt, this.statusBarHeight);
		},
		methods: {
			toBack() {
				this.$emit("back")
			},
			toLog() {
				if (this.rightTxt == 'add') {
					this.$emit("rightClick")
					console.log('银行卡添加');
					return
				}
				if (this.rightTxt == 'dtjl') {
					this.$emit("dtjl")
					return
				}
				if (this.rightTxt != 'cny') {
					this.$emit("log")
				}

			},
			notice() {
				if (this.img == '/static/home/jn/xjn.png' || this.img == '/static/tabbar/explain.png') {
					this.$emit("click")
				} else {
					uni.navigateTo({
						url: '/pages/me/notice'
					})
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.headerbox {
		height: 100rpx;
		line-height: 100rpx;
		position: fixed;
		// top: var(--status-bar-height);
		z-index: 9999999;
		// background: #0E0E15;
		width: 100%;

		.header_left_icon1 {
			width: 100rpx;
			height: 50rpx;
			margin-left: 30rpx;
			margin-top: 20rpx;

			image {
				width: 48rpx;
				height: 48rpx;
			}
		}

		.header_title {
			width: calc(100% - 160rpx);
			text-align: center;
			font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
			font-weight: 400;
			font-size: 35rpx;
			// color: #FFFFFF;
		}

		.header_right_icon {
			width: 100rpx;
			margin-right: 30rpx;

			image {
				width: 48rpx;
				height: 48rpx;
			}

			.cny {
				display: flex;
				align-items: center;
				border-radius: 71rpx 71rpx 71rpx 71rpx;
				border: 1rpx solid rgba(83, 159, 235, 1);
				padding: 8rpx 20rpx;
				margin-left: -60rpx;

				image {
					width: 32rpx;
					height: 32rpx;
				}

				text {
					margin-left: 5rpx;
					font-weight: 500;
					font-size: 24rpx;
					color: #2FF8EA;
					line-height: 36rpx;
					text-align: center;
				}
			}
		}
	}
</style>