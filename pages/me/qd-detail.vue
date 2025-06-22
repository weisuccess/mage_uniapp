<template>
	<view class="content">
		<narBar :title="getLg('签到记录')" @back="toBack()"></narBar>
		<view class="" style="padding: 0 20rpx;margin-top:var(--status-bar-height);">
			<scroll-view scroll-y="true" class="box" @scrolltolower="reachBottom" :style="{'height':windowHeight+'px'}">
				<uni-steps :options="list" direction="column" :active="list.length-1"></uni-steps>
			</scroll-view>
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
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 140,
				page: 1,
				size: 10,
				total: '',
				list: [],
				jf: '',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				status: 'more'
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
			reachBottom() {
				if (this.page * this.size >= this.total) {
					// uni.showToast({
					// 	title: '已加载全部',
					// 	icon: 'none'
					// })
					return
				}
				//并且让页码+1,调用获取数据的方法获取第二页数据
				this.page++
				//此处调用自己获取数据列表的方法
				this.getList()
			},
			detail(id) {
				uni.navigateTo({
					url: './activeDetail?id=' + id
				})
			},
			toBack() {
				uni.navigateBack()
			},
			getList() {
				this.$request.get({
					url: "/app/userCheckInStats/signInList",
					success: rsp => {
						this.list = rsp.data
						for (var i = 0; i < this.list.length; i++) {
							this.list[i].title = '已签到'
							this.list[i].desc = this.list[i].dateStr
						}
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
		background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744373034458bg.png') no-repeat;
		background-size: 100% 100%;
		height: 100vh;
		// color: #ffffff;
	}

	.title {
		font-size: 40rpx;
		padding: 60rpx;
		text-shadow: 2px 3px 1px #ccc;
		color: #000;
	}

	.box {
		width: 90%;
		padding: 2.5%;
		margin: 30rpx 2.5%;
		// padding-top: 100rpx;
		// background-color: #FFFFFF;
		// border-radius: 15rpx;
		// box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.2);
		// border-radius: 20rpx;
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