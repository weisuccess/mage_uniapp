<template>
	<view class="content">
		<view class="vbetween header_left_icon" style="width: 92%;">
			<view class="" @click="toBack()">
				<image mode="widthFix" src="/static/tabbar/back.png"></image>
			</view>
		</view>
		<!-- <view style="position: fixed;z-index: 99; top: 300rpx;right: 0;color: #DF3249;background-color: #FFFCEE;
			writing-mode: vertical-rl; text-orientation: upright;border-radius: 10rpx 0  0 10rpx;padding: 10rpx;"
			@click="explain()">
			市场资产说明
		</view> -->
		<scroll-view scroll-y="true" :style="{height:windowHeight+'px'}" style="width: 100%;">
			<view
				style="width: 100%;height: 550rpx; background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744526148932top.png') no-repeat;background-size: 100% 100%;">
				<view class="color-fff fz60 fw700"
					style="position: absolute;z-index: 9;top: 200rpx;left: 70rpx;">市场资产
					<br> 管理</view>
				<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744527384520sm.png" mode="widthFix" @click="explain()"
					style="position: absolute;z-index: 9;top: 300rpx;right: 20rpx;width: 150rpx;height: 100rpx;">
				</image>
			</view>
			<!-- <image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744526148932top.png" mode="widthFix"
				style="width: 100%;"></image> -->
			<view style="margin-top: -115rpx;position: relative;z-index: 9;">
				<view
					style="width: 95%;padding: 2.5%;margin: 2.5% 0;border-radius: 15rpx;
						padding-bottom: 40rpx;background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744526409290sc-bg.png') no-repeat;background-size: 100% 100%;"
					v-for="(item,index) in list" :key="index" v-if="index>=1">
					<view class="flex-center-center color-fff">
						<view class="" v-for="i in index">
							<image
								src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/17445267109664ff9f5e7a90ad0cd9d8ad447cbde8bea4a3057a37fbb-fwBCSO_fw1200@3x.png"
								mode="widthFix" style="width: 40rpx;height: 40rpx;"></image>
						</view>
						<view class="ml10">{{item.marketGrade}}</view>
					</view>
					<view class="top mt20 fz22 color-666 text-align-c">
						<view style="width: 20%;">团队投资人数</view>
						<view style="width: 20%;">团队累计投资</view>
						<view style="width: 20%;">个人累计投资</view>
						<view style="width: 20%;">回报</view>
						<view style="width: 20%;">每月奖励</view>
					</view>
					<view class="box text-align-c">
						<view style="width: 20%;">{{item.marketNumber}}人</view>
						<view style="width: 20%;">{{item.marketInvestment}}$</view>
						<view style="width: 20%;">{{item.individualInvestment}}$</view>
						<view class="color-33CC33" style="width: 20%;">{{item.marketRequite}}$</view>
						<view class="color-33CC33" style="width: 20%;">{{item.monthlyRewards}}$</view>
					</view>
				</view>
				<view class="" style="height: 200rpx;"></view>
			</view>
		</scroll-view>
		<uni-popup ref="popLine">
			<view class=""
				style="width: 90vw; margin: 0 5vw; height: 33vh;border-radius: 20rpx;background-color: #fff;position: relative;">
				<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744479312310x.png" mode="widthFix"
					style="width: 10%;margin: 500rpx 45% 0;position: absolute;"  @click="close"></image>
				<view class="fw700 fz40 color-33CC33 text-align-c lh100" >市场资产管理说明</view>
				<image src="https://lanhu-oss.lanhuapp.com/6000230a07d8914039c9c9123477f04b" mode="widthFix"
					style="width: 95%;margin: 0 2.5%;"></image>
				<scroll-view scroll-y="" style="max-height: 40vh;" class="mt30 fw700">
					<view style="font-size: 22rpx;color: #2F2F2F;width: 95%;margin: 0 2.5%;">
						<view style="font-size: 22rpx;width: 95%;margin: 0 2.5%;">
							<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744527875130smx.png" mode="widthFix" style="width: 100%;max-height: 400rpx;"></image>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
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
				windowHeight: uni.getSystemInfoSync().windowHeight,
				page: 1,
				size: 10,
				total: '',
				list: []
			}
		},
		// onReachBottom() {
		// 	//判断 如果页码*页容量大于等于总条数，提示该页数据加载完毕
		// 	if (this.page * this.size >= this.total) {
		// 		// uni.showToast({
		// 		// 	title: '已加载全部',
		// 		// 	icon: 'none'
		// 		// })
		// 		return
		// 	}
		// 	//并且让页码+1,调用获取数据的方法获取第二页数据
		// 	this.page++
		// 	//此处调用自己获取数据列表的方法
		// 	this.getList()
		// },
		onLoad() {
			this.getList()
		},
		methods: {
			lq(id) {
				this.$request.get({
					url: "/app/vipGradeInfo/teamReceive",
					data: {
						id: id,
					},
					success: rsp => {
						uni.showToast({
							title: rsp.message,
							icon: 'none'
						})
						this.getList()
					}
				})
			},
			explain() {
				this.$refs.popLine.open('center')
			},
			close() {
				this.$refs.popLine.close()
			},
			toBack() {
				uni.navigateBack()
			},
			getList() {
				this.$request.get({
					url: "/app/marketAssetManageInfo/List",
					success: rsp => {
						this.list = rsp.data
					}
				})
			},
		}
	}
</script>
<style scoped lang="scss">
	.header_left_icon {
		width: 100rpx;
		height: 50rpx;
		margin-left: 30rpx;
		margin-top: var(--status-bar-height);
		position: fixed;
		top: 20rpx;
		z-index: 99;

		image {
			width: 58rpx;
			height: 58rpx;
		}
	}

	.box {
		width: 100%;
		font-size: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 20rpx 0;
		color: #5E5959;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 22rpx 0;
	}
</style>