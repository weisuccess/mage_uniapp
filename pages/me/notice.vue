<template>
	<view class="content">
		<narBar :title="getLg('最新公告')" @back="toBack()"></narBar>
		<!-- var(--status-bar-height) -->
		<view style="height: var(--status-bar-height);width: 100%;"></view>
		<scroll-view scroll-y="true" :style="{height:windowHeight+'px'}" class="box" style="margin-top: 50rpx;"
			@scrolltolower="reachBottom">
			<uni-collapse-item :border="false" v-for="(item,index) in list" :key="index">
				<template v-slot:title>
					<view class="vcenter-left pd20">
						<image :src="item.titleImage" mode="aspectFill" style="width: 150rpx;height: 100rpx;"></image>
						<view class="lh50 ml10" style="max-width: calc(100% - 180rpx);">
							<view class="color-000 fz26 fw700 ">{{item.title}}</view>
							<view class="fz22">{{item.createTime | dateFormat}}</view>
						</view>
					</view>
				</template>
				<view style="margin: 10rpx;padding: 10rpx;">
					<scroll-view scroll-y="true" :style="{maxHeight:windowHeight-250+'px'}">
						<view class="">
							<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744106935085logo-000.png"
								mode="widthFix" style="width: 120rpx;
							height: 50rpx;"></image>
						</view>
						<view class="mb20">
							UBI {{item.createTime | dateFormat}}
						</view>
						<rich-text :nodes="item.content"></rich-text>
					</scroll-view>
				</view>
			</uni-collapse-item>
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 200,
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
			toBack() {
				uni.navigateBack()
			},
			getList() {
				this.$request.get({
					url: "/app/latestAnnouncements/list",
					data: {
						pageNum: this.page,
						pageSize: this.size,
					},
					success: rsp => {
						if (this.page != 1) {
							this.list = this.list.concat(rsp.records)
						} else {
							this.list = rsp.records
						}
						//将获取的总条数赋值
						this.total = rsp.total
						if (this.page * this.size >= this.total && this.total > this.size) {
							uni.showToast({
								title: '已加载全部',
								icon: 'none'
							})
						}
					}
				})
			},
		}
	}
</script>
<style scoped lang="scss">
	.content {
		background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174410046676033CC33-bg.png') no-repeat;
		background-size: 100% 100%;
		height: 100vh;
		// color: #ffffff;
	}

	.title {
		line-height: 80rpx;
	}

	.balance {
		font-size: 60rpx;
		font-weight: 600;
	}

	.box {
		background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744209428353notice-bg.png') no-repeat;
		background-size: 100% 100%;
		width: 85%;
		margin: 0 5%;
		padding: 50rpx 2.5%;
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

	.ver-left {
		background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737138168260serialNumber.png') no-repeat;
		background-size: 100% 100%;
		height: 40rpx;
		margin: 0 20rpx;
		font-size: 24rpx;
		width: 50rpx;
		text-align: center;
		line-height: 35rpx;
		color: #fff;
	}
</style>