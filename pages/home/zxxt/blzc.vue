<template>
	<view class="content">
		<narBar :title="'不良资产'" @back="toBack()" background="transparent" :rightTxt="'icon'" showRightBtn
			img="/static/products/message.png"></narBar>
		<scroll-view scroll-y="true" :style="{height:windowHeight+'px',marginTop:statusBarHeight+'px'}"
			bindscrolltolower="onReachBottom">
			<view class="" style="padding: 20rpx;">
				<view style="border-bottom: 1rpx solid #F2F2F2;line-height: 100rpx;font-weight: bold;">
					<view style="color: #0B0B0B;font-size: 32rpx;">
						{{list.title}}
					</view>
				</view>
				<view class="" style="padding: 20rpx 0;">
					<view style="font-size: 22rpx;color: #8D8D8D;line-height: 80rpx;">{{list.createUserName}}
						{{list.createTime|dateFormat}}
					</view>
					<image :src="list.titleImg" mode="widthFix" style="width: 100%;border-radius: 10rpx;">
						<!-- <rich-text :nodes="list.content" style="font-size: 24rpx;color: #515050
						;"></rich-text> -->
						<u-parse :content="list.content" class="fz24"></u-parse>
				</view>
			</view>
		</scroll-view>
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 100,
				id: 0,
				list: [],
				noClick: true,
				page: 1,
				size: 10
			}
		},
		onLoad(opt) {
			this.id = opt.id
			this.getArr()
		},
		methods: {
			getArr() {
				this.$request.get({
					url: "/app/knowBobInfo/nonPerformingAssetsInfoQuery",
					data: {
						id: this.id
					},
					success: rsp => {
						this.list = rsp.data
					}
				})
			},
			// detail(id) {
			// 	uni.navigateTo({
			// 		url: '/pages/home/notice_detail?id=' + id + '&title=' + '行业动态'
			// 	})
			// },
			toBack() {
				uni.navigateBack()
			}
		}
	}
</script>
<style scoped lang="scss">
	.content {
		background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		background-size: 100% 60%;
		height: 100vh;
		// color: #ffffff;
	}
</style>