<template>
	<view class="content">
		<narBar :title="getLg('转账记录')" @back="toBack()"></narBar>
		<view class="" style="height: var(--status-bar-height);"></view>
		<view class="" style="background-color: #F1F1F1;">
			<view class="flex-center-center fz28 pd20">
				<view class="">创建日期：</view>
				<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" />
				<view class="color-fff br10 ml10" style="padding: 5rpx 20rpx;background: #33CC33;" @click="search">搜索
				</view>
			</view>
			<view class="box">
				<view class="flex-around-center lh100 text-align-c">
					<view class="" style="width: 20%;">状态</view>
					<view class="" style="width: 20%;">时间</view>
					<view class="" style="width: 30%;">转账给</view>
					<view class="" style="width: 30%;">金额(USDT)</view>
				</view>
				<scroll-view scroll-y="true" @scrolltolower="reachBottom" :style="{'height':windowHeight+'px'}">
					<view>
						<view style="padding: 40rpx 0;" v-for="(item,index) in list" :key="index">
							<view class="flex-around-center text-align-c">
								<view style="width: 20%;"
									:style="{'color':item.tradeStatus==2?'#00A00B':item.tradeStatus==3?'#D21112':''}">
									{{item.tradeStatus==1?'进行中':item.tradeStatus==2?'成功':item.tradeStatus==3?'驳回':''}}
								</view>
								<view style="width: 20%;" class="fz24 flex-column-around-center color-666">
									<view class="">{{item.createTime | convertTimestampToDate}} </view>
									<view class="">{{item.createTime | getHMS}} </view>
								</view>
								<view style="width: 30%;" class="">{{item.transferAccount}}</view>
								<view style="width: 30%;color: #D21112;">
									-{{item.transferMoeny}}
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
				range: ['2021-02-1', '2021-3-28'],
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
					url: "/app/transferAuditInfo/getUserTransfer",
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