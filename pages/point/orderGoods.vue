<template>
	<view class="content">
		<narBar :title="'确认订单'" @back="toBack()"></narBar>
		<view class="" style="">
			<view class="box">
				<view style="display: flex;align-items: center;justify-content: space-between;
				padding: 20rpx 0;border-bottom: 1rpx solid #eee;" @click="checkAddress">
					<view class="vcenter-left">
						<image src="../../static/point/dingwei.png" mode="widthFix"
							style="width: 40rpx;height: 40rpx;margin-right: 20rpx;">
						</image>
						<view class="address-item" v-if="arr.harvestPeople">
							<view class="item-header">
								<view style="display: flex;align-items: center;width: 100%;">
									<view class="item-name">{{ arr.harvestPeople }}</view>
									<view class="item-phone">{{ arr.phone }}</view>
								</view>
							</view>
							<view class="item-body">
								<view>{{ arr.fullAddress }}</view>
							</view>
						</view>
						<view class="" v-else>新增地址</view>
					</view>
					<uni-icons type="right"></uni-icons>
				</view>
				<view class="">
					<view class="vcenter-top-left vmt30" style="padding: 20rpx;">
						<image :src="list.commodityImage" class="mr20 br10" style="width: 200rpx;height: 170rpx;">
						</image>
						<view style="width: 65%;color: #000;">
							<view style="position: relative;z-index: 9;">{{list.commodityName}}</view>
							<view style="color: #7b7b7b;min-height: 70rpx;font-size: 28rpx;margin-top: 10rpx;"
								class="ellipsis-multiline">
								<rich-text :nodes="list.commodityIntroduce"></rich-text>
							</view>
							<view class="vbetween" style="line-height: 80rpx;">
								<view class="money">
									<text style="color: #DD322A;font-size: 35rpx;margin-right: 10rpx;
									font-weight: bold;">{{list.commodityIntegral}}</text>积分
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		<view class="bottom">
			<!-- @click.stop="$noMultipleClicks(duihuan,'')" -->
			<button class="ts-btn" style="width: 80%;color: #fff;border-radius: 60rpx;" @click="duihuan" >兑换</button>
		</view>

		<passkeyborad :show="show" :money="totalSXF" @close="closezujian" @password="submit" @showPop="closezujian">
		</passkeyborad>
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
				noClick: true,
				outData: {
					tradeValue: 0,
				},
				arr: {},
				list: {},
				totalJF: 0,
				totalSXF: 0,
				number: 1,
				id: 0,
				show: false
			}
		},
		onLoad(opt) {
			this.number = opt.num
			this.id = opt.id
			this.getUser()
			this.getList()
			this.getArr()

			uni.$on('address', (data) => {
				console.log('Received data:', data);
				this.arr = JSON.parse(data.select)
			});
		},
		methods: {
			closezujian() {
				this.show = false
			},
			getArr() {
				this.$request.get({
					url: "/app/integralMallInfo/getIntegralMall",
					data: {
						id: this.id,
					},
					success: rsp => {
						this.list = rsp.data
					}
				})
			},
			//获取地址
			getList() {
				this.$request.get({
					url: "/app/harvestAddressInfo/list",
					success: rsp => {
						console.log(rsp);
						if (rsp.data[0]) {
							var aaa = rsp.data.filter((item) => {
								console.log(item.whetherDefault);
								return item.whetherDefault == 1
							})
							if (aaa[0]) {
								this.arr = aaa[0]
							} else {
								this.arr = rsp.data[0]
							}
							console.log(aaa);
						} else {
							this.arr = {}
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
			duihuan() {
				if (!this.arr.id) {
					uni.showToast({
						title: '请选择地址',
						icon: 'none'
					})
					return
				}
				// this.show = true
				this.submit()
			},
			submit(e) {
				this.$request.get({
					url: '/app/integralMallInfo/exchange',
					data: {
						addressId: this.arr.id,
						id: this.id,
						// payPassword: e
					},
					success: rsp => {
						this.show = false
						uni.showToast({
							title: rsp.message,
							icon: 'none'
						})
						if (rsp.code == 200) {
							setTimeout(() => {
								uni.navigateBack()
							}, 1500)
						}

						return

					}
				})
			},
			toBack() {
				uni.navigateBack()
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

	.ellipsis-multiline {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
		max-height: 3.0em;
		/* 设置为行高的两倍 */
		line-height: 1.5em;
		/* 这里的行高应与后面p标签中的行高一致 */
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
		padding: 100rpx 2.5% 2.5%;
		height: calc(100vh - 200rpx);
		margin: 50rpx 0;
		background-color: #DEFFDE;
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
		width: 95%;
		padding: 0 2.5%;
		bottom: 100rpx;
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
</style>