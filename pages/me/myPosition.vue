<template>
	<view class="">
		<view class="content">
			<view class=""
				style="background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744210203337top-bg.png') no-repeat;background-size: 100% 100%;height: 400rpx;">
				<view style="height: var(--status-bar-height);width: 100%;position: fixed;z-index: 999999;"></view>
				<narBar :title="'投资明细'" @back="toBack()" background="transparent"></narBar>
			</view>
			<view class="vcenter" style="width:100%;height:30rpx;margin-top: var(--status-bar-height);"></view>
			<view class="text-align-c"
				style="width: 90%;background: rgba(255,255,255,.8);margin-right: 2.5%;margin-left: 2.5%;margin-top: -250rpx;padding:30rpx 2.5%;border-radius: 20rpx;box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.2);">
				<view class="">累计投资（USDT）</view>
				<view class="fw700 lh100 fz40">{{incomeDetail.investmentAmount}}</view>
				<view class="flex-around-center">
					<view class="">
						<view class="">最新收益（USDT）</view>
						<view class="fw700 lh100 fz40">{{incomeDetail.today}}</view>
					</view>
					<view class="">
						<view class="">累计收益（USDT）</view>
						<view class="fw700 lh100 fz40">{{incomeDetail.earnings}}</view>
					</view>
				</view>
				<view class="br60 lh80 flex-center-center"
					style="background-color: #E9E9E9;width: 90%;margin: 30rpx 5% ;">
					持仓待收益（USDT）<text class="fw700 fz40"> {{incomeDetail.toBeCollected}}</text>
				</view>
			</view>
			<view style="width: 90%;border-radius: 30rpx 30rpx 0 0;margin: var(--status-bar-height) 5% 0;">
				<view class="ml30 text-align-c pb20 mt20 flex-around-center">
					<view class="mx20 " :class="isActive==1?'active':'sel'" @click="check(1)">进行中</view>
					<view class="mx20 " :class="isActive==2?'active':'sel'" @click="check(2)">已完成</view>
				</view>
				<scroll-view scroll-y="true" class="box" :style="{height:windowHeight+'px'}"
					@scrolltolower="reachBottom">
					<!-- <uni-easyinput placeholder="请搜索输入关键词" prefixIcon="search" style="margin: 0 2.5%;width: 95%;"
					v-model="search" @input="searchvalue"></uni-easyinput> -->
					<view class="k" style="" v-for="(item,index) in list" :key="index">
						<view class="fz28 fw700 lh100" style="width: 90%;margin: 0 5%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
							color: #606060;">
							{{item.positionName}}
						</view>
						<view class="flex-between-center" style="margin: 0 5%;">
							<swiper circular autoplay style="height: 150rpx;width: 250rpx;position: relative;">
								<swiper-item v-for="(item1,index1) in item.imgUrl" :key="index1">
									<image :src="item1" mode="aspectFill" @click="previewImage(item.imgUrl,index1)"
										style="width: 100%;height: 100%;border-radius: 15rpx;">
									</image>
									<view class="lh40 text-align-c fz22 color-fff" style="position: absolute;z-index: 99;top: 0;
									left: 0;background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744286028509jiaobiao.png') no-repeat ;
									background-size: 100% 100%;width: 120rpx;height: 40rpx;">
										{{item.positionLabel}}
									</view>
								</swiper-item>
							</swiper>
							<view class="">
								<view class="flex-end-center fz22">
									<view class="">
										资产利率：<text class="color-33CC33">{{item.positionEarnings}}%</text>
									</view>
									<view class="ml30">
										资产周期：<text class="color-33CC33">{{item.holdTime}}天</text>
									</view>
								</view>
								<view class="mt20 fz30 fw700 text-align-r">适合长期配置</view>
								<view class="mt10 fz22 text-align-r">{{item.monovalent}}起投 |
									{{item.earningsType==1?'按日':'到期'}}
								</view>
							</view>
						</view>
						<view class="py10" style="width: 90%;margin: 30rpx 5% 0;background-color: #EDEDED;">
							<view class="flex-end-center py10">
								<!-- <view class="ml10 fz24" style="color: #A98D71;">热销中 </view>
								<view class="fz24" style="">资产进度：</view>
								<view class="" style="width: 200rpx;">
									<progress :percent="item.progress" stroke-width="10" border-radius="60"
										backgroundColor="#999999" activeColor="#E49E80" />
								</view> -->
								<view class="mr10 text-align-c fz22" style="color: #C40D0D;" @click="hetong(item.id)">
									查看合同 &gt;
								</view>
							</view>
							<!-- 	<view class="text-align-c" style="font-size: 22rpx;color: #6D6D6D;">
								{{item.progress}}%
							</view> -->
						</view>

					</view>
				</scroll-view>
				<!-- <view style="height: 200rpx;"></view> -->
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 500,
				isActive: 1,
				page: 1,
				size: 10,
				total: '',
				list: [],
				search: '',
				incomeDetail: {}
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
			this.incomeDetails()
		},
		methods: {
			incomeDetails() {
				//我的持有    投资金额investmentAmount  今日收益today 累计收益earnings 待收收益toBeCollected 
				this.$request.get({
					url: "/app/positionUser/incomeDetails",
					success: rsp => {
						this.incomeDetail = rsp.data
						this.incomeDetail.investmentAmount = this.incomeDetail.investmentAmount.toFixed(2)
						this.incomeDetail.today = this.incomeDetail.today.toFixed(2)
						this.incomeDetail.earnings = this.incomeDetail.earnings.toFixed(2)
						this.incomeDetail.toBeCollected = this.incomeDetail.toBeCollected.toFixed(2)
					}
				})
			},

			hetong(id) {
				uni.navigateTo({
					url: '/pages/me/hetong?id=' + id
				})
			},

			// pdfPreview(url) {
			// 	var title = '预览'
			// 	uni.showLoading({
			// 		title: '加载中',
			// 		mask: true
			// 	})
			// 	//由于android 下webview无法直接打开pdf，需要先下载
			// 	uni.getSystemInfo({
			// 		success: res => {
			// 			console.log(res.platform);
			// 			// if (res.platform === 'android') {
			// 			wx.downloadFile({
			// 				url: url,
			// 				// filePath: wx.env.USER_DATA_PATH  + "/我的协议.pdf",
			// 				success: function(res) {
			// 					const filePath = res.tempFilePath;
			// 					uni.showLoading({
			// 						title: '正在打开',
			// 						mask: true
			// 					})
			// 					wx.openDocument({
			// 						filePath: filePath,
			// 						showMenu: true, // 显示右上角菜单
			// 						fileType: "pdf",
			// 						success: function(res) {
			// 							uni.hideLoading()
			// 							console.log('打开文档成功');
			// 						},
			// 						fail: function(err) {
			// 							uni.hideLoading()
			// 							console.log('fail:' + JSON.stringify(err));
			// 						}
			// 					});
			// 				}
			// 			});
			// 			// } else {
			// 			// 	this.$tab.navigateTo(`/pagesA/common/webview/index?title=${title}&url=${url}`)
			// 			// }
			// 		}
			// 	});
			// },
			// gethetong(id) {
			// 	uni.showLoading({
			// 		title: '加载中',
			// 		mask: true
			// 	})
			// 	this.$request.get({
			// 		url: "/app/contractInfo/query?id=" + id,
			// 		success: rsp => {
			// 			this.list = rsp.data
			// 			if (rsp.code != 200) {
			// 				uni.showToast({
			// 					title: rsp.message,
			// 					icon: 'none',
			// 					duration: 1000
			// 				});
			// 			}
			// 			this.pdfPreview(this.list)
			// 		}
			// 	})
			// },
			searchvalue(e) {
				// this.search = e.detail.value
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.page = 1
					this.list = []
					this.getList()
				}, 500); // 500毫秒后执行
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
					url: "/app/positionUser/getUserPosition",
					data: {
						pageNum: this.page,
						pageSize: this.size,
						goodsType: this.isActive,
						positionType: 0
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
						// 				100))
						// 			.toFixed(2)
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
						for (var i = 0; i < this.list.length; i++) {
							if (this.list[i].imgUrl.includes(',') == true) {
								this.list[i].imgUrl = this.list[i].imgUrl.split(',')
							} else {
								this.list[i].imgUrl = [this.list[i].imgUrl]
							}
						}
					}
				})
			},
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
		font-size: 40rpx;
		color: #000;
		line-height: 100rpx;
		width: 90%;
		margin: 0 5%;
		text-align: center;
		/* 定义容器宽度 */
		white-space: nowrap;
		/* 保证文本在一行内显示 */
		overflow: hidden;
		/* 隐藏超出容器的文本 */
		text-overflow: ellipsis;
		/* 超出部分显示省略号 */
	}

	.takeEffect {
		text-align: center;
		color: #D43C31;
		background-color: #F1E6E0;
		// width: 120rpx;
		font-size: 26rpx;
		padding: 5rpx 15rpx;
		margin-left: 10rpx;
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
		top: 200rpx;
		color: #fff;
		line-height: 80rpx;
	}

	.active {
		background-color: #33CC33;
		color: #fff;
		padding: 20rpx 70rpx;
		border-radius: 60rpx;
	}

	.content-text {
		width: 90%;
		margin-left: 5%;
		height: 405rpx;
	}


	.box {
		width: 100%;
		color: #3A3A3A;
	}

	.sel {
		border: #33CC33 1px solid;
		color: #33CC33;
		padding: 20rpx 70rpx;
		border-radius: 60rpx;
	}

	.k {
		background: #fff;
		background-size: 100% 100%;
		width: 100%;
		border-radius: 20rpx;
		// height: 500rpx;
		color: #3A3A3A;
		padding-bottom: 30rpx;
		margin-bottom: 30rpx;
	}
</style>