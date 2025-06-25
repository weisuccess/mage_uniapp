<template>
	<view class="content">
		<narBar :title="getLg('体验记录')" @back="toBack()"></narBar>
		<view class="" style="height: var(--status-bar-height);"></view>
		<view class="">
			<view class="flex-center-center fz28 pd20">
				<view class="">创建日期：</view>
				<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" />
				<view class="color-fff br10 ml10" style="padding: 5rpx 20rpx;background: #33CC33;" @click="search">搜索
				</view>
			</view>
			<view style="width: 100%;background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744214068681bg.png') no-repeat;
			background-size: 100% 100%;">
				<scroll-view scroll-y="true" class="box" @scrolltolower="reachBottom"
					:style="{height:windowHeight+'px'}">
					<view class="" style="">
						<view class="" style="padding: 20rpx;display: flex;align-items: center;justify-content: space-between;
							border-bottom: 1rpx solid #eee;line-height: 1.8rem;" v-for="(item,index) in list" :key="index">
							<view class="">
								<view class="fw700"
									style="width:350rpx;white-space: nowrap;overflow: hidden; text-overflow: ellipsis;">
									{{item.tradeTitle}}
								</view>
								<view class="fz26" style="color: #838383;">{{item.createTime|dateFormat}}</view>
							</view>
							<view style="color: #000;width: 200rpx;text-align: right;">
								<view class="fw700" :style="{'color':item.tradeDirection=='in'?'#33CC33':'#ED0000'}">
									{{item.tradeDirection=='in'?'+':'-'}}{{item.tradeValue}}
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
		components: {
			narBar
		},
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 180,
				isActive: 0,
				page: 1,
				size: 10,
				total: '',
				list: [],
				user: {},
				title:'',
				startTime: '',
				range: ['2021-02-1', '2021-3-28'],
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
			this.page = 1
			this.getList()
		},
		onLoad(opt) {
			if (opt.index) {
				this.isActive = opt.index
			}
			if (opt.name) {
				this.title = opt.name
			}
			
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
			search() {
				this.page = 1
				this.list = []
				this.getList()
			},
			maskClick(e) {
				console.log('maskClick事件:', e);
			},
			getList() {
				this.$request.get({
					url: '/app/trialBonusRecordingInfo/list',
					data: {
						pageNum: this.page,
						pageSize: this.size,
						tradeTitle:this.title,
						startTime: new Date(this.range[0] + ' 00:00:00').getTime(),
						endTime: new Date(this.range[1] + ' 23:59:59').getTime()
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