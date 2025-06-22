<template>
	<view class="content">
		<narBar :title="'我的订单'" @back="toBack()" background="transparent"></narBar>
		<view class="" style="padding: 0 30rpx;">
			<view class="box">
				<view class="">
					<view class=" vmt30" style="padding: 20rpx;" v-for="(item,index) in list" :key="index">
						<view class="vcenter-top-left">
							<!-- @click="detail" -->
							<image :src="item.exchangeImage" style="width: 200rpx;height: 200rpx;margin-right: 20rpx;">
							</image>
							<view style="width: 65%;color: #000;">
								<view style="position: relative;z-index: 9;">{{item.exchangeName}}</view>
								<view style="color: #7b7b7b;margin-top: 10rpx;">
									<rich-text :nodes="item.exchangeIntroduce"></rich-text>
								</view>
								<view style="margin-top: 10rpx;color: #7b7b7b;display: flex;align-items: center;">
									手续费：${{item.exchangePremium}}</view>

								<view class="vbetween" style="line-height: 80rpx;">
									<view class="money">
										<text style="color: #DD322A;font-size: 35rpx;margin-right: 10rpx;
										font-weight: bold;">{{item.exchangeIntegral}}</text>积分
									</view>
									<view style="color: #7b7b7b;display: flex;align-items: center;">
										<view class="">x{{item.exchangeQuantity}}</view>
									</view>
								</view>
							</view>
						</view>

						<view style="color: #7b7b7b;">
							<view class="green" v-if="item.ordersType==1">
								待发货
							</view>
							<view  v-if="item.ordersType==2" style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
								<view class="green">已发货</view>
								<view class="" style="display: flex;">
									<button class="delete-btn" @tap="submit(item)">确认收货</button>
									<button class="delete-btn" @tap="look(item)">查看物流</button>
								</view>
							</view>
							<view v-if="item.ordersType==3"
								style="display: flex;align-items: center;justify-content: space-between;">
								<view class="green">已签收</view>
								<button class="delete-btn" @tap="look(item)">查看物流</button>
							</view>
						</view>
					</view>
				</view>
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
				outData: {
					tradeValue: 0,
				},
				list: [],
				pageNum: 1,
				pageSize: 10,
				total: 0
			}
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
			this.getUser()
		},
		onShow() {
			this.pageNum = 1
			this.getList()
		},
		methods: {
			look(item){
				uni.showModal({
				    title: '物流信息',
				    content: '物流公司：'+item.courierTerrace+'\n物流单号：'+item.courierCode,
					showCancel:false,
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			submit(item){
				this.$request.get({
					url: "/app/exchangeInfo/confirmReceipt",
					data: {
						id:item.id
					},
					success: rsp => {
						uni.showToast({
							title:rsp.message,
							icon:'none'
						})
						this.getList()
					}
				})
			},
			//获取列表
			getList() {
				this.$request.get({
					url: "/app/exchangeInfo/list",
					data: {
						pageNum: this.pageNum,
						pageSize: this.pageSize
					},
					success: rsp => {
						if (this.pageNum != 1) {
							this.list = this.list.concat(rsp.records)
						} else {
							this.list = rsp.records
						}
						//将获取的总条数赋值
						this.total = rsp.total
						if (this.pageNum * this.pageSize >= this.total&& this.total > this.pageSize) {
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
		background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		background-size: 100% 60%;
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
		width: 90%;
		padding: 2.5%;
		height: calc(100vh - 300rpx);
		margin: 100rpx 2.5%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		color: #000;
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
		height: 60rpx;
		line-height: 55rpx;
		width: 100rpx;
		font-size: 26rpx;
		padding: 5rpx 10rpx;
		margin-left: 10rpx;
		border: none;
		border-radius: 10rpx;
		cursor: pointer;
		background: #FF5722;
		color: #fff;
		width: 150rpx;
		margin-right: 0;
	}
	.green{
		color: #4CAF50;
	}
</style>