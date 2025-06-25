<template>
	<view class="content">
		<narBar :title="getLg('幸运福利记录')" @back="toBack()"></narBar>
		<!-- <view class="" style="padding: 0 30rpx;"> -->
		<!-- <view class="box"> -->
		<view class="" style="height: var(--status-bar-height);"></view>
		<uni-popup ref="popupCP">
			<view class=""
				style="width: 90vw;height:500rpx;margin:0 5vw;border-radius: 20rpx;background-color: #fff;position: relative;">
				<!-- <view style="padding: 20rpx;position: absolute;right: 0rpx;" @click="close">
					<image src="/static/home/close.png" mode="widthFix" style="width: 60rpx;height: 60rpx;"></image>
				</view> -->
				<view style="font-size: 50rpx;text-align: center;color: #000;width: 100%;line-height: 120rpx;">
					选择收货地址
				</view>
				<view style="width: 90%;margin:0 5%;color: #000;">
					<view style="display: flex;align-items: center;justify-content: space-between;
					padding: 20rpx 0;border-bottom: 1rpx solid #eee;" @click="checkAddress">
						<view class="vcenter-left">
							<image src="/static/point/dingwei.png" mode="widthFix"
								style="width: 40rpx;height: 40rpx;margin-right: 20rpx;">
							</image>
							<view class="address-item" v-if="address.harvestPeople">
								<view class="item-header">
									<view style="display: flex;align-items: center;width: 100%;">
										<view class="item-name">{{ address.harvestPeople }}</view>
										<view class="item-phone">{{ address.phone }}</view>
									</view>
								</view>
								<view class="item-body">
									<view>{{ address.fullAddress }}</view>
								</view>
							</view>
							<view class="" v-else>新增地址</view>
						</view>
						<uni-icons type="right"></uni-icons>
					</view>

					<button style="background-color: #9B1B1A;width: 80%;color: #fff;bottom: 70rpx;
					position: absolute;border-radius: 60rpx;font-weight: bold;margin:0 5%;"
						@click.stop="$noMultipleClicks(queren,'valiForm')">确认</button>
				</view>
			</view>
		</uni-popup>
		<scroll-view scroll-y="true" class="box" :style="{height:windowHeight+'px'}" @scrolltolower="reachBottom"
			bindscrolltolower="onReachBottom">
			<view class="">
				<view class="mt30" style="padding: 20rpx;width: calc(100% - 40rpx);" v-for="(item,index) in list"
					:key="index">
					<view class="mt30 br10" style="padding:50rpx 50rpx 70rpx;"
						:class="index % 2 === 0 ?'bg-fff':'bg-green'" v-for="(item,index) in list" :key="index">
						<view class="flex-between-center ">
							<image :src="item.rewardImge" class="br10"
								style="width: 200rpx;height:200rpx;margin-right: 20rpx;">
							</image>
							<view style="width: 60%;color: #000;">
								<view class="flex-start-start ">
									<view style="width: 100rpx;text-align: center;"
										:class="index % 2 === 0 ?'bor-fff':'bor-green'">
										{{item.rewardLevel}}
									</view>
									<view class="fw700 ml10" style="width: calc(100% - 110rpx);">{{item.exchangeName}}
									</view>
								</view>
								<view class="fz26 mt10" style="color:#606060;">中奖时间：{{item.createTime | dateFormat}}
								</view>
								<view class="br10 flex-start-center" style="">
									<view class="delete-btn mt10" @tap="look(item,'sp')" v-if="item.rewardType==1">查询物流
										&gt;</view>
									<view class="delete-btn mt10" @tap="open(item.id)" v-if="item.rewardType==1&&!item.addressId">填写地址
										&gt;</view>
								</view>
							</view>

						</view>

					</view>
				</view>
				<uni-popup ref="popupCP" :isMaskClick="false" :maskClick="false">
					<view class=""
						style="width: 90vw;height:500rpx;margin:0 5vw;border-radius: 20rpx;background-color: #fff;position: relative;">
						<!-- <view style="padding: 20rpx;position: absolute;right: 0rpx;" @click="close">
							<image src="/static/home/close.png" mode="widthFix" style="width: 60rpx;height: 60rpx;"></image>
						</view> -->
						<view style="font-size: 50rpx;text-align: center;color: #000;width: 100%;line-height: 120rpx;">
							选择收货地址
						</view>
						<view style="width: 90%;margin:0 5%;color: #000;">
							<view style="display: flex;align-items: center;justify-content: space-between;
							padding: 20rpx 0;border-bottom: 1rpx solid #eee;" @click="checkAddress">
								<view class="vcenter-left">
									<image src="/static/point/dingwei.png" mode="widthFix"
										style="width: 40rpx;height: 40rpx;margin-right: 20rpx;">
									</image>
									<view class="address-item" v-if="address.harvestPeople">
										<view class="item-header">
											<view style="display: flex;align-items: center;width: 100%;">
												<view class="item-name">{{ address.harvestPeople }}</view>
												<view class="item-phone">{{ address.phone }}</view>
											</view>
										</view>
										<view class="item-body">
											<view>{{ address.fullAddress }}</view>
										</view>
									</view>
									<view class="" v-else>新增地址</view>
								</view>
								<uni-icons type="right"></uni-icons>
							</view>
				
							<button style="background-color: #9B1B1A;width: 80%;color: #fff;bottom: 70rpx;
							position: absolute;border-radius: 60rpx;font-weight: bold;margin:0 5%;"
								@click.stop="$noMultipleClicks(queren,'valiForm')">确认</button>
						</view>
					</view>
				</uni-popup>
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 100,
				outData: {
					tradeValue: 0,
				},
				list: [],
				pageNum: 1,
				pageSize: 10,
				total: 0,
				name: '',
				url: "",
				title: '',
				address: {},
				lottery: {},
				noClick: true,
				address: {},
				selId:''
			}
		},
		// onReachBottom() {
		// 	//判断 如果页码*页容量大于等于总条数，提示该页数据加载完毕
		// 	if (this.pageNum * this.pageSize >= this.total) {
		// 		// uni.showToast({
		// 		// 	title: '已加载全部',
		// 		// 	icon: 'none'
		// 		// })
		// 		return
		// 	}
		// 	//并且让页码+1,调用获取数据的方法获取第二页数据
		// 	this.pageNum++
		// 	//此处调用自己获取数据列表的方法
		// 	this.getList()

		// },
		onLoad(opt) {
			this.getUser()
			this.getArr()
			uni.$on('address', (data) => {
				console.log('Received data:', data);
				this.address = JSON.parse(data.select)
			});
		},
		onShow() {
			this.pageNum = 1
			this.getList()
		},
		methods: {
			open(id){
				this.selId=id
				this.$refs.popupCP.open('center')
			},
			bangding(item) {
				this.lottery = item
				this.$refs.popupCP.open('center')
			},
			//获取地址
			getArr() {
				this.$request.get({
					url: "/app/harvestAddressInfo/list",
					success: rsp => {
						if (rsp.data[0]) {
							var aaa = rsp.data.filter((item) => {
								console.log(item.whetherDefault);
								return item.whetherDefault == 1
							})
							if (aaa[0]) {
								this.address = aaa[0]
							} else {
								this.address = rsp.data[0]
							}
							console.log(aaa);
						} else {
							this.address = {}
						}
					}
				})
			},
			close() {
				this.$refs.popupCP.close()
				this.getList()
			},
			queren() {
				if (!this.address.id) {
					uni.showToast({
						title: '请选择地址',
						icon: 'none'
					})
					return
				}
				this.$request.get({
					url: '/app/drawRecordsInfo/receive',
					data: {
						addressId: this.address.id,
						id: this.selId,
					},
					success: rsp => {
						this.close()
						uni.showToast({
							title: rsp.message,
							icon: 'none'
						})
				
					}
				})
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
			look(item) {
				uni.navigateTo({
					url: './orderDetails?item=' + JSON.stringify(item) + '&type=' + this.name
				})
			},
			submit(item) {
				this.$request.get({
					url: "/app/lotteryRecordingInfo/confirmReceipt",
					data: {
						id: item.id
					},
					success: rsp => {
						uni.showToast({
							title: rsp.message,
							icon: 'none'
						})
						this.getList()
					}
				})
			},
			//获取列表
			getList() {
				this.$request.get({
					url: '/app/drawRecordsInfo/list',
					success: rsp => {
						this.list = rsp.data
						// if (this.pageNum != 1) {
						// 	this.list = this.list.concat(rsp.records)
						// } else {
						// 	this.list = rsp.records
						// }
						// //将获取的总条数赋值
						// this.total = rsp.total
						// if (this.pageNum * this.pageSize >= this.total && this.total > this.pageSize) {
						// 	uni.showToast({
						// 		title: '已加载全部',
						// 		icon: 'none'
						// 	})
						// }
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
			num(e) {
				if (e == 1) {
					this.outData.tradeValue -= 1
				}
				if (e == 2) {
					this.outData.tradeValue += 1
				}
			},

			toBack() {
				uni.navigateBack()
			}
		}
	}
</script>
<style scoped lang="scss">
	.content {
		background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744788064811bg.png') no-repeat;
		background-size: 100% 100%;
		height: 100vh;
		color: #ffffff;
	}

	.title {
		line-height: 80rpx;
	}

	.balance {
		font-size: 60rpx;
		font-weight: 600;
	}

	.box {
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
		width: 150rpx;
		line-height: 1rem;
		font-size: 26rpx;
		padding: 10rpx 0;
		margin-left: 10rpx;
		border: none;
		margin-right: 0;
		text-align: center;
		background: #F1FF5A;
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