<template>
	<view class="content">
		<scroll-view scroll-y="true" class="box" :style="{'height':windowHeight+'px'}">
			<narBar title="" @back="toBack()" background="transparent"></narBar>
			<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/17454008818066071143896366302671.jpg"
				mode="widthFix" style="width: 100%;min-height: 100vh;position: absolute;top: 0;"></image>
			<view class="pb100" style="position: absolute;z-index: 9;width: 100%;">
				<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744900376890组 4@3x.png" mode="widthFix"
					style="width: 80%;margin: 50rpx 10% 0;"></image>
				<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1745416416923图层 2.png" mode="widthFix"
					style="width: 100%;" @click="shakeImage" :style="imageStyle"></image>
				<view class="w100 text-align-c" style="margin-top: -15vh;position: absolute;z-index: 9;">
					<view class="" style="color: #423975;">已有 {{people}} 人参与</view>
					<view class="mt50" style="color: #423975;">您今天还有 {{user.lotteryFrequency}} 次砸蛋机会</view>
				</view>

				<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1745401112146zi.png" mode="widthFix"
					style="width: 60%;margin: 50rpx 20% 0; "></image>
				<view class="tiao br10">
					<view class="pd20 mt30" v-for="(item,index) in list" :key="index"
						style="position: relative; background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744900574770tiao.png') no-repeat;background-size: 100% 100%;">
						<view class="fz22 color-fff" style="position: absolute;right: 70rpx;top: 8rpx;">
							砸蛋次数+{{item.taskReward}}</view>
						<view class="flex-between-start">
							<view class="flex-start-center">
								<image :src="item.taskImge" mode="widthFix" style="width: 120rpx;height: 120rpx;">
								</image>
								<view class="ml20">
									<view class="fw700 mb10 fz36">{{item.taskName}}</view>
									<view class="color-999 fz28">{{item.taskContent}}</view>
								</view>
							</view>
							<view class="br60 color-fff mt50 fz22" style="background: #A390FD;padding: 8rpx 20rpx;"
								@click="toPage(item.taskUrl,item.receiveType,item.id)">
								{{item.receiveType==1?'领取':item.receiveType==2?'已领取':item.receiveType==3?'去完成':''}}
							</view>
						</view>
					</view>
				</view>
			</view>


		</scroll-view>
		<uni-popup ref="popWin">
			<view style="width: 80vw; margin: 0 10vw; height: auto;border-radius: 20rpx;background-color: #fff;
			background: #fff;">
				<image
					src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/17446445089418b06ff1a53b0fde9471867508df9d45bedfedcf2bfbb4-9AuSqg@3x.png"
					mode="widthFix" style="width: 90%;margin: -150rpx 5% 0;"></image>
				<view class="">
					<view class="text-align-c fw700 fz40">
						恭喜中奖
					</view>
					<view class="vcenter" style="color: #FF280F;font-size: 26rpx;line-height: 100rpx;">
						{{prize.smashEggsLevel}}{{prize.smashEggsName}}
					</view>
					<view class="color-33CC33 text-align-c lh100" @tap="close1" style="border-top: 1px dashed #ccc;">
						关闭
					</view>

				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import narBar from 'pages/public/narBar.vue'
	export default {
		components: {
			narBar,
		},
		data() {
			return {
				windowHeight: uni.getStorageSync('statusBarHeight'),
				imageStyle: {},
				list: [],
				user: {},
				prize: {},
				people:0
			}
		},
		onShow() {
			this.taskList()
			this.participateQuantity()
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
			participateQuantity() {
				this.$request.get({
					url: "/app/smashEggsInfo/participateQuantity",
					success: rsp => {
						this.people = rsp.data
					}
				})
			},
			
			taskList() {
				this.$request.get({
					url: "/app/taskInfo/List",
					success: rsp => {
						this.list = rsp.data
					}
				})
			},
			zadan() {
				this.$request.get({
					url: "/app/smashEggsInfo/smashEggs",
					success: rsp => {
						this.getUser()
						if (rsp.code == 200) {
							this.prize = rsp.data
							this.$refs.popWin.open('center')
						} else {
							uni.showToast({
								title: rsp.message,
								icon: 'none'
							})
						}
					}
				})
			},
			shakeImage() {
				// let start = 0
				// const duration = 500 // 动画持续时间(ms)
				// const amplitude = 5 // 抖动幅度(px)

				// const animate = (timestamp) => {
				// 	if (!start) start = timestamp
				// 	const progress = timestamp - start

				// 	// 计算当前偏移量
				// 	const offset = amplitude * Math.sin(progress * 0.05) *
				// 		Math.max(0, 1 - progress / duration)

				// 	this.imageStyle = {
				// 		transform: `translateX(${offset}px)`,
				// 		transition: 'transform 0.1s ease-out'
				// 	}

				// 	if (progress < duration) {
				// 		requestAnimationFrame(animate)
				// 	} else {
				// 		this.imageStyle = {
				// 			transform: 'translateX(0)'
				// 		}
				// 	}
				// }

				// requestAnimationFrame(animate)

				this.zadan()
			},
			toBack() {
				uni.navigateBack()
			},
			toPage(path, receiveType, id) {
				if (receiveType == 3) {
					uni.navigateTo({
						url: path
					})
				}
				if (receiveType == 1) {
					this.$request.get({
						url: "/app/taskUserInfo/taskReceive",
						data: {
							id: id,
						},
						success: rsp => {
							uni.showToast({
								title: rsp.message,
								icon: 'none'
							})
							this.taskList()
							this.getUser()
						}
					})

				}
			},
			close1() {
				this.$refs.popWin.close()
			},
		}
	}
</script>
<style>
	page {
		background: #878BFB;
	}
</style>
<style scoped lang="scss">
	.box {
		position: relative;
		min-height: 100vh;
	}

	.tiao {
		width: 90%;
		margin: 50rpx 2.5% 0;
		padding: 2.5%;
		background: #EEE8FE;
	}
</style>