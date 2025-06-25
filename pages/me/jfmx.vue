<template>
	<view class="content">
		<narBar :title="getLg('积分明细')" @back="toBack()"></narBar>
		<view class="">
			<view class="color-33CC33 mt100 pd30">
				<text class="fw700 fz50 mr10">{{user.integral | toInt}} </text> 积分
			</view>
			<view style="width: 100%;background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744214068681bg.png') no-repeat;
			background-size: 100% 100%;">
				<view class="navTab">
					<view :class="isActive==0?'active':''" @click="check(0)">积分明细</view>
					<view :class="isActive==1?'active':''" @click="check(1)">积分兑换记录</view>
				</view>
				<scroll-view scroll-y="true" class="box" @scrolltolower="reachBottom"
					:style="{height:windowHeight+'px'}">
					<view class="" style="" v-if="isActive==0">
						<view class="" style="padding: 20rpx;display: flex;align-items: center;justify-content: space-between;
							border-bottom: 1rpx solid #eee;line-height: 1.8rem;" v-for="(item,index) in list" :key="index">
							<view class="">
								<view class="fw700 ellipsis"
									style="width: 350rpx;">
									{{item.integralTitle}}
								</view>
								<view class="fz26 ellipsis" style="color: #838383;width: 350rpx;">{{item.integralDescription}}</view>
							</view>
							<view style="color: #000;width: 300rpx;text-align: right;">
								<view class="fw700" :style="{'color':item.integralType=='in'?'#33CC33':'#ED0000'}">
									{{item.integralType=='in'?'+':'-'}}{{item.integralQuantity | toInt}}
								</view>
								<view class="fz26" style="color: #838383;">{{item.createTime|dateFormat}}</view>
							</view>
						</view>
					</view>
					<view class="" style="" v-if="isActive==1">
						<view class="" style="padding: 20rpx;display: flex;align-items: center;justify-content: space-between;
							border-bottom: 1rpx solid #eee;line-height: 1.8rem;" v-for="(item,index) in list" :key="index">
							<view class="">
								<view class="fw700 ellipsis"
									style="width:350rpx;">
									{{item.exchangeName}}
								</view>
								<view class="fz26" style="color: #838383;">{{item.createTime|dateFormat}}</view>
							</view>
							<view style="color: #000;width: 200rpx;text-align: right;">
								<view class="fw700" style="color: #ED0000;">
									-{{item.exchangeIntegral}}
								</view>
								<!-- <view style="color: #7b7b7b;">{{item.changes==1?'增加':'减少'}}</view> -->
							</view>
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
		filters: {
		    toInt(value) {
		      return Math.floor(value); // 或 parseInt(value) / Math.round(value)
		    }
		  },
		components: {
			narBar
		},
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 250,
				isActive: 0,
				page: 1,
				size: 10,
				total: '',
				list: [],
				user: {}
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
		onLoad(opt) {
			if (opt.index) {
				this.isActive = opt.index
			}
			this.page = 1
			this.getList()
			this.getUser()
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
			check(e) {
				this.page = 1
				this.list = []
				this.isActive = e
				this.getList()
			},
			toBack() {
				uni.navigateBack(1)
			},
			getUser() {
				this.$request.get({
					url: "/app/dreamUserInfo/getUser",
					success: rsp => {
						this.user = rsp.data
					}
				})
			},
			getList() {
				let index = this.isActive
				let url = ''
				if (index == 0) {
					url = '/app/integralRecordingInfo/integralRecordingInfoList'
				}
				if (index == 1) {
					url = '/app/integralExchangeInfo/integralExchangeInfoList'
				}

				this.$request.get({
					url: url,
					data: {
						pageNum: this.page,
						pageSize: this.size,
					},
					success: rsp => {
						console.log(rsp, this.page);
						if (this.page != 1) {
							this.list = this.list.concat(rsp.records)
						} else {
							this.list = rsp.records
						}
						// if (this.list[0]) {
						// 	for (var i = 0; i < this.list.length; i++) {
						// 		this.list[i].sy = (this.list[i].monovalent * (this.list[i].positionEarnings /
						// 			100)).toFixed(2)
						// 	}
						// }
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
		background: #f1f1f1;
	}
</style>
<style scoped lang="scss">
	.content {
		height: 100vh;
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
		// position: absolute;
		width: 100%;
		line-height: 80rpx;
		border-bottom: 1px solid #ccc;
	}

	.active {
		border-bottom: 5rpx solid #33CC33;
		color: #33CC33;
	}

	.content-text {
		width: 90%;
		margin-left: 5%;
		height: 405rpx;
	}

	// .box {
	// 	line-height: 60rpx;
	// }

	.box {
		padding: 0 30rpx;
		// position: absolute;
		// margin-top: 350rpx;
		// height: 70vh;
		width: calc(100% - 40rpx);
		color: #3A3A3A;
	}
</style>