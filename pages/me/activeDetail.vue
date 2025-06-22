<template>
	<view class="content">
		<narBar :title="getLg('活动详情')" @back="toBack()" background="transparent"></narBar>
		<view class="" style="padding: 0 30rpx;margin-top: 100rpx;">
			<view style="position: relative;height: 100rpx;margin-left: 10rpx;">
				<!-- <image src="../../static/home/top-line.png" mode="widthFix" class="vmt60"
					style="position: absolute;height: 100rpx;width: 98%;"></image>
				<image src="../../static/home/zixuntext.png" mode="widthFix" class="vmt60"
					style="position: absolute;width: 150rpx;top:20rpx;left: 35rpx;"></image> -->
			</view>
			<view class="">
				<scroll-view scroll-y="true" class="box" bindscrolltolower="onReachBottom">
					<view class="" style="padding: 20rpx;">
						<view style="border-bottom: 1rpx solid #F2F2F2;line-height: 100rpx;font-weight: bold;">
							<view class="">
								{{list.title}}
							</view>
						</view>
						<view class="" style="padding: 20rpx 0;">
							<view style="font-size: 22rpx;color: #333;line-height: 80rpx;">{{list.createUserName}}
								{{list.createTime|dateFormat}}
							</view>
							<image :src="list.titleImg" mode="widthFix" style="width: 100%;border-radius: 10rpx;">
							</image>
							<rich-text :nodes="list.content"></rich-text>
						</view>
					</view>
				</scroll-view>
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
				list: {},
				id: 0
			}
		},
		onLoad(opt) {
			this.id = opt.id
			this.getList()
		},
		methods: {
			toBack() {
				uni.navigateBack()
			},
			getList() {
				this.$request.get({
					url: "/app/activityInfo/query",
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
		background-color: #F3F3F3;
	}
</style>
<style scoped lang="scss">
	.content {
		background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
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
		width: 95%;
		height: 75vh;
		margin: 0 2.5%;
		// padding-top: 100rpx;
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