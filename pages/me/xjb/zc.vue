<template>
	<view class="address-list-container">
		<narBar :title="getLg('转出列表')" @back="toBack()"></narBar>
		<view class="" style="height: 20rpx;"></view>
		<view style="margin: var(--status-bar-height) 0 20rpx"></view>
		<view class="flex-center-center fz28 pd20">
			<view class="">创建日期：</view>
			<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" />
			<view class="color-fff br10 ml10" style="padding: 5rpx 20rpx;background: #33CC33;" @click="search">搜索
			</view>
		</view>
		<view style="background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744214068681bg.png') no-repeat;
			background-size: 100% 100%;padding: 2.5%;">
			<view class="top">
				<view class="w20">订单号</view>
				<view class="w20">金额</view>
				<view class="w20">时间</view>
				<view class="w20">操作</view>
			</view>
			<scroll-view scroll-y :style="{height:windowHeight+'px'}" @scrolltolower="reachBottom">
				<view class="box" v-for="(item,index) in list" :key="index">
					<view class="w20" style="word-wrap: break-word;" @click="copy(item.flexibleCode)">
						{{item.flexibleCode}}
					</view>
					<view class="w20">{{item.amount}}</view>
					<view class="w20">
						{{item.createTime | convertTimestampToDate}} <br>{{item.createTime | getHMS}}
					</view>
					<view class="w20" style="color:#9B1B1A" v-if="item.type!=1">
						{{item.type==2?'已转出':item.type==3?'结算奖励':''}}
					</view>
					<view class="w20 lh60" v-else @click="sh(item)"
						style="background-color: #505050;color: #fff;width: 20%;margin: 0 2.5%;border-radius: 60rpx;">
						转出
					</view>
				</view>
			</scroll-view>
		</view>
		<passkeyborad :show="show" :money="selArr.amount" @close="closezujian" @password="submit"
			@showPop="closezujian"></passkeyborad>
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
				statusBarHeight: uni.getStorageSync('statusBarHeight') - 10,
				windowHeight: uni.getSystemInfoSync().windowHeight - 270,
				noClick: true,
				list: [],
				pageNum: 1,
				pageSize: 15,
				total: 0,
				titlist: [{
					title: '订单'
				}, {
					title: '奖励'
				}],
				isActive: 0,
				selArr: {},
				show: false,
				range: ['', ''],
				type: 0
			};
		},
		onReachBottom() {
			//判断 如果页码*页容量大于等于总条数，提示该页数据加载完毕
			if (this.pageNum * this.pageSize >= this.total) {
				// uni.showToast({
				// 	title: '已加载全部',
				// 	icon: 'none'
				// })
				return
			}
			//并且让页码+1,调用获取数据的方法获取第二页数据
			this.pageNum++
			//此处调用自己获取数据列表的方法
			this.getList()

		},
		onLoad(opt) {
			this.type = opt.index
		},
		onShow() {
			this.pageNum = 1
			this.list = []
			this.getList()
		},
		methods: {
			reachBottom() {
				if (this.pageNum * this.pageSize >= this.total) {
					// uni.showToast({
					// 	title: '已加载全部',
					// 	icon: 'none'
					// })
					return
				}
				//并且让页码+1,调用获取数据的方法获取第二页数据
				this.pageNum++
				//此处调用自己获取数据列表的方法
				this.getList()
			},
			copy(code) {
				uni.setClipboardData({
					data: code,
					success: function() {
						console.log('success');
						uni.showToast({
							title: '复制成功！',
							icon: 'none'
						})
					}
				});
			},
			sh(item) {
				this.selArr = item
				this.show = true
			},
			closezujian() {
				this.show = false
			},
			search() {
				this.page = 1
				this.list = []
				this.getList()
			},
			submit(e) {
				console.log(this.selArr);
				console.log(e);
				this.$request.get({
					url: '/app/cashTreasureTradeRecordingInfo/getRollOut',
					data: {
						payPassword: e,
						id: this.selArr.id
					},
					success: rsp => {
						uni.showToast({
							title: rsp.message,
							icon: 'none'
						})
						if (rsp.code == 200) {
							this.closezujian()
							this.pageNum = 1
							this.list = []
							this.getList()
						}
					}
				})
			},
			active(index) {
				this.isActive = index
				this.pageNum = 1
				this.list = []
				this.getList()
			},
			getList() {
				this.$request.get({
					url: "/app/cashTreasureTradeRecordingInfo/list",
					data: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						type: this.type,
						startTime: new Date(this.range[0] + ' 00:00:00').getTime() || '',
						endTime: new Date(this.range[1] + ' 23:59:59').getTime() || ''
					},
					success: rsp => {
						if (this.pageNum != 1) {
							this.list = this.list.concat(rsp.records)
						} else {
							this.list = rsp.records
						}
						//将获取的总条数赋值
						this.total = rsp.total
						if (this.pageNum * this.pageSize >= this.total && this.total > this.pageSize) {
							uni.showToast({
								title: '已加载全部',
								icon: 'none'
							})
						}
					}
				})
			},
			toBack() {
				uni.navigateBack()
			},
			maskClick(e) {
				console.log('maskClick事件:', e);
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
	.address-list-container {
		min-height: 100vh;
	}

	.w20 {
		width: 25%;
		font-size: 26rpx;
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
		font-size: 26rpx;
		color: #434040;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 100rpx;
		line-height: 100rpx;
		// border-bottom: 1px solid #b8b8b8;
		font-size: 24rpx;
		// background: url('/static/me/sczc-bg.png') no-repeat;
	}

	.active {
		border-bottom: 5rpx solid #fff;
		font-weight: bold;
	}
</style>