<template>
	<view class="content">
		<narBar :title="getLg('兑换记录')" @back="toBack()"></narBar>
		<view class="" style="height: var(--status-bar-height);"></view>
		<view class="flex-center-center fz28 pd20">
			<view class="">创建日期：</view>
			<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" />
			<view class="color-fff br10 ml10" style="padding: 5rpx 20rpx;background: #33CC33;" @click="search">搜索</view>
		</view>
		<scroll-view scroll-y="true" class="box" :style="{height:windowHeight+'px'}" @scrolltolower="reachBottom"
			bindscrolltolower="onReachBottom">
			<view class="" style="padding: 0 10rpx;">
				<view class="mt30 br10" style="padding: 50rpx;" :class="index % 2 === 0 ?'bg-fff':'bg-green'"
					v-for="(item,index) in list" :key="index">
					<view class="flex-between-center ">
						<view style="width: 60%;color: #000;">
							<view class="fz26" style="color:#606060;">{{item.createTime | dateFormat}}</view>
							<view class="fz26 mb20" style="color:#606060;">{{item.exchangeIntegral}}积分</view>
							<view class="title fw700">{{item.exchangeName}}</view>
						</view>
						<image :src="item.exchangeImage" class="br10"
							style="width: 200rpx;height:150rpx;margin-right: 20rpx;">
						</image>
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view class="delete-btn mt10" :class="index % 2 === 0 ?'bor-fff':'bor-green'"
								@tap="look(item,'sp')">查询物流</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- </view> -->
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 150,
				outData: {
					tradeValue: 0,
				},
				list: [],
				pageNum: 1,
				pageSize: 10,
				total: 0,
				type: '',
				title: '',
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
		onLoad(opt) {
			this.getUser()
		},
		onShow() {
			this.pageNum = 1
		},
		methods: {
			maskClick(e) {
				console.log('maskClick事件:', e);
			},
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
			look(item, name) {
				uni.navigateTo({
					url: '/pages/me/orderDetails?item=' + JSON.stringify(item) + '&type=' + name
				})
			},
			//获取列表
			getList() {
				this.$request.get({
					url: "/app/integralExchangeInfo/integralExchangeInfoList",
					data: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						startTime: new Date(this.range[0] + ' 00:00:00').getTime(),
						endTime: new Date(this.range[1] + ' 23:59:59').getTime()
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
			checkAddress() {
				uni.navigateTo({
					url: '/pages/me/dizhi'
				})
			},
			getUser() {
				this.$request.get({
					url: "/app/dreamUserInfo/getUser",
					success: rsp => {
						this.money = rsp.data.balance
					}
				})
			},
			search() {
				this.page = 1
				this.list = []
				this.getList()
			},
			num(e) {
				if (e == 1) {
					this.outData.tradeValue -= 1
				}
				if (e == 2) {
					this.outData.tradeValue += 1
				}
			},
			toBack() {
				uni.navigateBack(1)
			}
		}
	}
</script>
<style>
	page {
		background-color: #f1f1f1;
	}
</style>
<style scoped lang="scss">
	.content {
		height: 100vh;
	}

	.title {
		// line-height: 80rpx;
		max-width: 200rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.balance {
		font-size: 60rpx;
		font-weight: 600;
	}

	.box {
		background-color: #DEFFDE;
		width: 100%;
		border-radius: 20rpx;
		color: #3A3A3A;
	}

	.color-000 {
		color: #000;
	}

	.minus {
		background-color: #999999;
		color: #fff;
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
		line-height: 38rpx;
		text-align: center;
	}

	.add {
		background-color: #999999;
		color: #fff;
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
		line-height: 38rpx;
		text-align: center;
	}

	input {
		width: 80rpx;
		background-color: #EFEFEF;
		border-radius: 10rpx;
		text-align: center;
		margin: 0 10rpx;
	}

	.bottom {
		position: fixed;
		width: 80%;
		bottom: 0;
		background-color: #fff;
		height: 120rpx;
		line-height: 120rpx;
		border-top: 1rpx solid #eee;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.item-name {
		font-weight: bold;
		color: #333;
		max-width: 200rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-right: 20rpx;
	}

	.delete-btn {
		width: 100rpx;
		line-height: 1rem;
		font-size: 26rpx;
		padding: 10rpx 0;
		margin-left: 10rpx;
		border: none;
		cursor: pointer;
		width: 50rpx;
		margin-right: 0;
		// writing-mode: vertical-rl;
		text-orientation: mixed;
		text-orientation: upright;
		text-align: center;
	}

	.green {
		color: #4CAF50;
	}

	.bg-fff {
		background: url("https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744713194215bg1.png");
		background-size: 100% 100%;
	}

	.bg-green {
		background: url("https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744713201037bg2.png");
		background-size: 100% 100%;
	}

	.bor-fff {
		border-radius: 10rpx;
		border: 1px solid #4CAF50;
		color: #4CAF50;
	}

	.bor-green {
		border-radius: 10rpx;
		border: 1px solid #fff;
		color: #fff;
	}
</style>