<template>
	<view class="address-list-container">
		<narBar :title="getLg('U资产会员等级')" @back="toBack()"></narBar>
		<!-- :style="{marginTop:statusBarHeight+'px'}" -->
		<view class="" style="height: var(--status-bar-height);"></view>
		<scroll-view scroll-y class="w100" :style="{'height':windowHeight+'px'}">
			<view class="" v-for="(item,index) in list" :key="index">
				<view class="color-33CC33 text-align-c lh100">{{item.vipGrade}}</view>
				<view class="py40 text-align-c" :class="index % 2 === 0 ?'bg-fff':'bg-green'">
					<view class="flex-around-center " style="color: #919191;">
						<view style="width: 33%;">个人累计投资</view>
						<view style="width: 33%;">额外加息</view>
						<view style="width: 33%;">每日签到</view>
					</view>
					<view class="flex-around-center mt30 mb30" :class="index % 2 === 0 ?' color-33CC33':'color-fff'">
						<view style="width: 33%;">{{item.vipExperience}}$</view>
						<view style="width: 33%;">{{item.vipInterest}}%</view>
						<view style="width: 33%;">{{item.signInReward}}$</view>
					</view>
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 90,
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
					url: "/app/vipGradeInfo/List",
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
<style>
	page {
		background: #f1f1f1;
	}
</style>
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

	.bg-fff {
		background: url("https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744713194215bg1.png");
		background-size: 100% 100%;
	}

	.bg-green {
		background: url("https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744713201037bg2.png");
		background-size: 100% 100%;
	}
</style>