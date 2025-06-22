<template>
	<view class="address-list-container">
		<view class="vcenter header_left_icon">
			<view class="" @click="toBack()">
				<image mode="widthFix" src="/static/tabbar/back.png"></image>
			</view>
		</view>
		<scroll-view scroll-y class="w100" :style="{'height':windowHeight+'px'}">
			<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737112913719team.jpg" mode="widthFix" class="w100"></image>
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
					url: "/app/vipGradeInfo/teamConstructionList",
					success: rsp => {
						this.list = rsp.data
					}
				})
			},
			lq(id) {
				this.$request.get({
					url: "/app/vipGradeInfo/TeamConstructionUserReceive",
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
			toBack() {
				uni.navigateBack()
			},
		}
	};
</script>

<style lang="scss" scoped>
	.w20 {
		width: 25%;
		font-size: 26rpx;
		text-align: center;
	}

	.box {
		width: 100%;
		font-size: 20rpx;
		border-bottom: 1px solid #b8b8b8;
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
		color: #fff;
		padding: 15rpx 0;
		border-bottom: 1px solid #b8b8b8;
		font-size: 24rpx;
		background: url('/static/me/sczc-bg.png') no-repeat;
		background-size: 100% 100%;
	}
</style>