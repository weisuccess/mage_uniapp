<template>
	<view class="content">
		<narBar :title="getLg('卡券记录')" @back="toBack()"></narBar>
		<view class="" style="height: var(--status-bar-height);"></view>
		<view class="navTab">
			<view :class="isActive==1?'active':''" @click="check(1)">未使用</view>
			<view :class="isActive==2?'active':''" @click="check(2)">已使用</view>
		</view>
		<scroll-view scroll-y="true" class="box" :style="{height:windowHeight+'px'}" @scrolltolower="reachBottom">
			<view class="flex-center-center" style="background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744736617359kq.png') no-repeat;background-size: 100% 100%;
					padding: 50rpx 0 60rpx;position: relative;" v-for="(item,index) in list" :key="index">
				<view class="color-33CC33 fz26 mt5" style="position: absolute;top: 0;left: 30rpx;">全品类通用</view>
				<view class="color-33CC33" style="width: 25%;text-align: center;">
					<view class="fw700 mr30 flex-center-center">
						<view class="fz30"> {{item.couponsType==1?'现金券':item.couponsType==2?'加息券':''}}
						</view>
					</view>
					<view class="fz14 flex-start-center mt20" v-if="item.couponsType==1">抵扣金额{{item.couponsMoney}}USDT</view>
					<view class="fz14 flex-start-center mt20" v-if="item.couponsType==2">加息{{item.couponsMoney}}%</view>
				</view>

				<view class="flex-between-center ml30" style="width: 60%;">
					<view class="">
						<view class="fw700 fz32">{{item.title}}</view>
						<view class="color-777 fz26 mt20">
							有效期至{{item.effectiveTime | convertTimestampToDate}}
						</view>
					</view>
					<view class="color-fff fz24" @click="sy(item)" v-if="item.effectiveTime>=new Date().getTime()&&isActive==1"
						style="background: #33CC33;border-radius: 60rpx;padding: 5rpx 20rpx;">
						去使用</view>
					<view class="color-fff fz24" v-if="item.effectiveTime<new Date().getTime()&&isActive==1"
						style="background: #ccc;border-radius: 60rpx;padding: 5rpx 20rpx;">
						已过期</view>
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 200,
				isActive: 1,
				page: 1,
				size: 10,
				total: '',
				list: [],
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				status: 'more',
				type: ''
			}
		},
		onReachBottom() {
			//判断 如果页码*页容量大于等于总条数，提示该页数据加载完毕
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
		onLoad() {
			this.page = 1
			this.getList()
		},
		methods: {
			sy(){
				uni.switchTab({
					url:'/pages/fund/index'
				})
			},
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
			check(e) {
				this.page = 1
				this.isActive = e
				this.getList()
			},
			toBack() {
				uni.navigateBack(1)
			},
			getList() {
				this.$request.get({
					url: "/app/couponsInfo/list",
					data: {
						pageNum: this.page,
						pageSize: this.size,
						stateType: this.isActive
					},
					success: rsp => {
						console.log(rsp, this.page);
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
							return
						}
					}
				})
			},
		}
	}
</script>
<style>
	page {
		background-color: #F6FFF6;
	}
</style>
<style scoped lang="scss">
	.content {
		min-height: 100vh;
	}


	.title {
		font-size: 40rpx;
		color: #000;
		line-height: 100rpx;
	}

	.takeEffect {
		text-align: center;
		color: #D43C31;
		background-color: #F1E6E0;
		width: 120rpx;
		font-size: 26rpx;
		padding: 5rpx;
	}

	.color-D40000 {
		color: #D40000;
	}

	.bold {
		font-weight: bold;
	}

	.num1 {
		text-align: center;
		color: #FD7E06;
		font-size: 45rpx;
	}

	.num2 {
		text-align: center;
		color: #DB312C;
		font-size: 45rpx;
	}

	.flex-around {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.buy {
		width: 80%;
		margin: 0 10%;
		height: 80rpx;
		line-height: 80rpx;
		color: #BFC0BF;
		text-align: center;
		border-radius: 60rpx;
		margin-top: 30rpx;
	}

	.navTab {
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: absolute;
		width: 100%;
		top: var(--status-bar-height);
		line-height: 80rpx;
		margin-top: 150rpx;
	}

	.active {
		border-bottom: 5rpx solid #33CC33;
		color: #33CC33;
		font-size: 35rpx;
	}

	.content-text {
		width: 90%;
		margin-left: 5%;
		height: 405rpx;
	}


	.box {
		padding: 0 20rpx;
		width: calc(100% - 40rpx);
		margin: 200rpx 0 0;
		color: #3a3a3a;
		border-radius: 30rpx 30rpx 0 0;
	}
</style>