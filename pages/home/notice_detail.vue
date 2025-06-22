<template>
	<view class="content">
		<narBar :title="getLg('详情')" @back="toBack()"></narBar>
		<view class="" style="margin-top: 100rpx;">
			<!-- <view class="box"> -->
			<scroll-view scroll-y="true" class="box" bindscrolltolower="onReachBottom">
				<view class="fz24" style="">
					<view style="line-height: 1.5rem;border-bottom: 10rpx solid #33CC33;padding: 20rpx;">
						<view style="color: #0B0B0B;font-size: 38rpx;font-weight: bold;padding: 20rpx 0;">
							{{list.title}}
						</view>
						<view class="flex-between-center">
							<view style="font-size: 22rpx;color: #8D8D8D;">
								时间：{{list.createTime|dateFormat}}
							</view>
						</view>
					</view>
					<MyVideo v-if="list.video" :src="list.video"
						style="width: 100%;height: 400rpx;margin-top: 50rpx;border-radius: 10rpx;"></MyVideo>
					<view class="" style="padding: 20rpx;">
						<image :src="list.titleImg" mode="widthFix" style="width: 100%;border-radius: 10rpx;">
							<u-parse :content="list.content" style="color: #515050;"></u-parse>
					</view>
				</view>
			</scroll-view>
			<!-- </view> -->
		</view>
	</view>
</template>

<script>
	import narBar from 'pages/public/narBar.vue'
	import MyVideo from './video.vue'
	export default {
		components: {
			narBar,MyVideo
		},
		data() {
			return {
				list: {},
				id: 0,
				type: ''
			}
		},
		onLoad(opt) {
			this.id = opt.id
			this.type = opt.type
			this.getList()
		},
		methods: {
			toBack() {
				uni.navigateBack()
			},
			getList() {
				let url = ''
				if (this.type==1) {
					url = '/app/ubiOperateVideoInfo/query'
				}
				if (this.type==2) {
					url = '/app/industryDynamicsInfo/query'
				}
				if (this.type==3) {
					url = '/app/perspectivesInfo/query'
				}
				this.$request.get({
					url: url,
					data: {
						id: this.id
					},
					success: rsp => {
						this.list = rsp.data
					}
				})
			},
		}
	}
</script>
<style>
	page {
		background-color: #fff;
	}
</style>
<style scoped lang="scss">
	.content {
		background: url('/static/page-bg.png') no-repeat;
		background-size: 100% 60%;
		height: 100vh;
		color: #ffffff;
	}

	.title {
		line-height: 80rpx;
	}

	.balance {
		font-size: 60rpx;
		font-weight: 600;
	}

	.box {
		width: 100%;
		height: 77vh;
		// padding-top: 50rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		color: #000;
	}

	.color-000 {
		color: #000;
	}

	.money {
		font-size: 40rpx;
		font-weight: bold;
		color: #DD322A;
	}

	.commission {
		color: #999;
		font-size: 24rpx;
	}

	.model {
		font-size: 24rpx;
		color: #999;
		line-height: 60rpx;
	}
</style>