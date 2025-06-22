<template>
	<view class="address-list-container">
		<!-- <narBar :title="getLg('')" @back="toBack()" background="#9B1B1A"></narBar> -->
		<view class="vcenter header_left_icon">
			<view class="" @click="toBack()">
				<image mode="widthFix" src="/static/tabbar/back.png"></image>
			</view>
		</view>
		<!-- :style="{marginTop:statusBarHeight+'px'}" -->
		<scroll-view scroll-y class="w100" :style="{'height':windowHeight+'px'}">
			<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737300308784图层 27@3x.png" mode="widthFix"
				class="w100"></image>
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
				windowHeight: uni.getSystemInfoSync().windowHeight,
				noClick: true,
				list: [],
				pageNum: 1,
				pageSize: 10,
				total: 0
			};
		},
		onLoad() {

		},
		onShow() {
			this.pageNum = 1
			this.getList()
		},
		methods: {
			getList() {
				this.$request.get({
					url: "/app/vipGradeInfo/userVipList",
					success: rsp => {
						this.list = rsp.data
					}
				})
			},
			toBack() {
				uni.navigateBack()
			},
		}
	};
</script>

<style lang="scss" scoped>
	.w20 {
		width: 25%;
		text-align: center;
	}

	.box {
		width: 100%;
		border-bottom: 1px solid #b8b8b8;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 20rpx 0;
		color: #5E5959;
		font-size: 20rpx;
		color: #434040;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-around;
		color: #fff;
		padding: 15rpx 0;
		border-bottom: 1px solid #b8b8b8;
		font-size: 24rpx;
		background: url('/static/me/sczc-bg.png') no-repeat;
		background-size: 100% 100%;
	}
</style>