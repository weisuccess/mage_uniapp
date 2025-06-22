<template>
	<view class="content">
		<narBar :title="getLg('帮助中心')" @back="toBack()" background="transparent"></narBar>
		<scroll-view scroll-y="true" :style="{height:windowHeight+'px'}" style="background-color: #fff;width: 95%;margin: 2.5%;padding: 2.5% 0;border-radius: 20rpx; 
			margin-top: var(--status-bar-height);color: #3A3A3A;box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);">
			<view style="">
				<!-- <view style="padding: 20rpx;" v-for="(item,index) in list" :key="index">
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						{{item.title}}
					</view>
					<view class="fz26" style="color: #616161;">
						{{item.detail}}
					</view>
				</view> -->
				<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1738765244333常见问题解答.png" mode="widthFix"
					style="width: 100%;border-radius: 20rpx;"></image>
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
				list: [],
			}
		},
		onLoad(opt) {
			this.getList()
		},
		methods: {
			getList() {
				this.$request.get({
					url: "/app/helpCenter/list",
					success: rsp => {
						this.list = rsp.data
						if (rsp.code != 200) {
							uni.showToast({
								title: rsp.message,
								icon: 'none',
								duration: 1000
							});
						}
					}
				})
			},
			toBack() {
				uni.navigateBack()
			},
		}
	}
</script>

<style>
	.content {
		background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		background-size: 100% 100%;
		height: 100vh;
		/* position: relative; */
	}

	.box {
		position: absolute;
		top: 0;
		z-index: 999;
		background-color: #ffffff;
		border-radius: 15rpx;
		/* margin-top: var(--status-bar-height); */
		color: #3A3A3A;
	}
</style>