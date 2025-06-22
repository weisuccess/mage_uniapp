<template>
	<view class="content">
		<narBar :title="'确认订单'" @back="toBack()" background="transparent"></narBar>
		<view class="" style="padding: 0 30rpx;">
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
						<!-- v-for="(item,index) in value" :key="index" @click="detail" -->

						<image :src="list.titleImage" style="width: 200rpx;height: 170rpx;margin-right: 20rpx;">
						</image>
						<view style="width: 65%;color: #000;">
							<view style="position: relative;z-index: 9;">{{list.title}}</view>
							<view style="color: #7b7b7b;min-height: 70rpx;font-size: 28rpx;margin-top: 10rpx;">
								<rich-text :nodes="list.introduce"></rich-text>
							</view>
							<view class="vbetween" style="line-height: 80rpx;">
								<view class="money">
									<text style="color: #DD322A;font-size: 35rpx;margin-right: 10rpx;
									font-weight: bold;">{{list.splinterQuantity}}</text>碎片
								</view>
								<view style="color: #7b7b7b;display: flex;align-items: center;">
									<view class="minus" @click="num(1)">-</view>
									<input type="digit" v-model="number" />
									<view class="add" @click="num(2)">+</view>
								</view>
								<!-- <view class="">x{{number}}</view> -->
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		<view class="bottom">
			<view style="display: flex;align-items: center;">
				<text style="color: #7b7b7b;">合计：</text>
				<text style="color: #DD322A;font-size: 40rpx;font-weight: bold;margin-right: 10rpx;">
					{{totalJF}}</text>碎片 +$<text>{{totalSXF}}</text>
			</view>
			<view class="">
				<button style="background-color: #DD322A;width: 200rpx;color: #fff;border-radius: 60rpx;"
					@tap="duihuan">兑换</button>
			</view>
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
				outData: {
					tradeValue: 0,
				},
				arr: {},
				list: {},
				totalJF: 0,
				totalSXF: 1,
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
					url: "/app/splinterRedemptionInfo/query",
					data: {
						id: this.id,
					},
					success: rsp => {
						this.list = rsp.data
						this.totalJF = this.number * this.list.splinterQuantity
						// this.totalSXF = this.list.premium * this.number
						console.log(this.totalJF);
					}
				})
			},
			//获取地址
			getList() {
				this.$request.get({
					url: "/app/harvestAddress/list",
					data: {
						pageNum: 1,
						pageSize: 100
					},
					success: rsp => {
						if (rsp.records[0]) {
							var aaa = rsp.records.filter((item) => {
								console.log(item.whetherDefault);
								return item.whetherDefault == 1
							})
							if (aaa[0]) {
								this.arr = aaa[0]
							} else {
								this.arr = rsp.records[0]
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
				this.number = Number(this.number)
				
				if (e == 1) {
					if(this.number==1){
						return
					}
					this.number -= 1
				}
				if (e == 2) {
					this.number += 1
				}
				this.totalJF = this.number * this.list.splinterQuantity
			},
			duihuan() {
				if (!this.arr.id) {
					uni.showToast({
						title: '请选择地址',
						icon: 'none'
					})
					return
				}
				this.show = true
			},
			submit(e) {
				this.$request.get({
					url: '/app/splinterRedemptionInfo/exchangeSplinter',
					data: {
						addressId: this.arr.id,
						id: this.id,
						quantity: this.number,
						payPassword: e
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
<style scoped lang="scss">
	.content {
		background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		background-size: 100% 60%;
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
		width: 95%;
		margin: 0 2.5%;
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
</style>