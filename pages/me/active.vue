<template>
	<view class="content">
		<narBar :title="getLg('活动')" @back="toBack()" background="transparent"></narBar>
		<view class="" style="padding: 0 30rpx;margin-top: 100rpx;">
			<!-- <view class="title vmt60 vcenter">积分余额</view> -->
			<!-- <view class="vcenter balance">{{jf}}</view> -->
			<view style="position: relative;height: 100rpx;margin-left: 10rpx;">
				<!-- <image src="../../static/home/top-line.png" mode="widthFix" class="vmt60"
					style="position: absolute;height: 100rpx;width: 98%;"></image>
				<image src="../../static/home/line.png" mode="widthFix" class="vmt60"
					style="position: absolute;width: 150rpx;top:20rpx;left: 35rpx;"></image> -->
			</view>
			<scroll-view scroll-y="true" class="box" @scrolltolower="reachBottom">
				<view style="position: relative;width: 90%;margin: 20rpx 5%;" v-for="(item,index) in list" :key="index"
					@click="detail(item.id)" class="content-text">
					<image :src="item.titleImg" mode="aspectFill"
						style="width: 100rpx;height: 100rpx;border-radius: 10rpx;position: absolute;width: 100%;height: 100%;z-index: 1;">
					</image>
					<view style="position: absolute;z-index: 99;">
						<view class="title">{{item.title}}</view>
						<view class="look">点击查看</view>
					</view>
				</view>
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
			this.jifen()
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
			jifen() {
				this.$request.get({
					url: "/app/dreamUserInfo/getUser",
					success: rsp => {
						this.jf = rsp.data.integral
					}
				})
			},
			getList() {
				this.$request.get({
					url: "/app/activityInfo/list",
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
<style>
	page {
		background-color: #F3F3F3;
	}
</style>
<style scoped lang="scss">
	.content-text {
		width: 90%;
		margin-left: 5%;
		height: 335rpx;
	}

	.content {
		background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		background-size: 100% 60%;
		height: 100vh;
		color: #ffffff;
	}

	.title {
		font-size: 40rpx;
		padding: 60rpx;
		text-shadow: 2px 3px 1px #ccc;
		color: #000;
	}

	.look {
		background-color: #FFDD33;
		width: 200rpx;
		margin: 0 60rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #DD322A;
		font-weight: bold;
		text-align: center;
		border-radius: 60rpx;
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