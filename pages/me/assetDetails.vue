<template>
	<view class="content">
		<narBar :title="getLg('交易记录')" @back="toBack()"></narBar>
		<view class="" style="height: var(--status-bar-height);"></view>
		<view class="" style="background-color: #F1F1F1;">
			<view class="flex-center-center fz28 pd20">
				<view class="">创建日期：</view>
				<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" />
				<view class="color-fff br10 ml10" style="padding: 5rpx 20rpx;background: #33CC33;" @click="search">搜索
				</view>
			</view>
			<view class="box">
				<scroll-view scroll-y="true" @scrolltolower="reachBottom" :style="{'height':windowHeight+'px'}">
					<view>
						<view style="padding: 20rpx;" v-for="(item,index) in list" :key="index">
							<view class="flex-between-center ">
								<view class=""  style="width: 50%;">
									<view class="textMax">
										{{item.tradeTitle}}
									</view>
									<view class="color-999 mt10">{{item.createTime | dateFormat}} </view>
								</view>
								<view class="text-align-r" :style="{'color':item.tradeDirection=='in'?'#00A00B':'#D21112'}">
									{{item.tradeDirection=='in'?'+':'-'}}
									{{item.tradeValue}} <br> USDT
								</view>
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
		components: {
			narBar
		},
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 230,
				page: 1,
				size: 10,
				startTime: '',
				total: '',
				list: [],
				range: ['', ''],
			}
		},
		created() {
			const today = new Date();
			const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
			const year = firstDay.getFullYear();
			const month = String(firstDay.getMonth() + 1).padStart(2, '0');
			const day = String(firstDay.getDate()).padStart(2, '0');

			const year1 = today.getFullYear();
			const month1 = String(today.getMonth() + 1).padStart(2, '0');
			const day1 = String(today.getDate()).padStart(2, '0');

			this.range[0] = `${year}-${month}-${day}`;
			this.range[1] = `${year1}-${month1}-${day1}`;
			this.getList()
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

		},
		methods: {
			reachBottom() {
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
			search() {
				this.page = 1
				this.list = []
				this.getList()
			},
			maskClick(e) {
				console.log('maskClick事件:', e);
			},
			reject(item) {
				if (item.tradeStatus == 3) {
					uni.showModal({
						title: '驳回原因',
						content: item.refuseReason || '无',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}

			},
			toBack() {
				uni.navigateBack()
			},
			getList() {
				this.$request.get({
					url: "/app/userAccountTradeRecord/list",
					data: {
						pageNum: this.page,
						pageSize: this.size,
						startTime: new Date(this.range[0] + ' 00:00:00').getTime(),
						endTime: new Date(this.range[1] + ' 23:59:59').getTime()
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
		background: #F6FFF6;
	}
</style>
<style scoped lang="scss">
	.content {
		height: 100vh;
	}

	.title {
		line-height: 80rpx;
	}

	.balance {
		font-size: 60rpx;
		font-weight: 600;
	}

	.box {
		width: 95%;
		padding: 2.5%;
		background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744214068681bg.png') no-repeat;
		background-size: 100% 100%;
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

	.line {
		position: fixed;
		width: 100%;
		bottom: 100rpx;
		text-align: center;
		color: darkslategray;
		font-size: 26rpx;
	}
</style>