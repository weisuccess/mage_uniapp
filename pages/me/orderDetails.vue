<template>
	<view class="content">
		<narBar :title="getLg('查看物流')" @back="toBack()"></narBar>
		<!-- <view class="" style="padding: 0 30rpx;"> -->
		<!-- <view class="box"> -->
		<view class="" style="height: var(--status-bar-height);"></view>
		<view class="navTab">
			<view :class="isActive==1?'active':''" @click="check(1)">待签收</view>
			<view :class="isActive==2?'active':''" @click="check(2)">已签收</view>
		</view>
		<scroll-view scroll-y="true" class="box" :style="{height:windowHeight1+'px'}" bindscrolltolower="onReachBottom">
			<view class="">
				<view class="mt30" style="padding: 20rpx;width: calc(100% - 40rpx);	background-color: #FFFFFF;"
					v-for="(item,index) in list" :key="index">
					<view class=" br10">
						<view class="flex-between-center ">
							<image :src="item.goodsImge" class="br10"
								style="width: 200rpx;height:200rpx;margin-right: 20rpx;">
							</image>
							<view style="width: 60%;color: #000;">
								<view class="flex-start-start ">
									<view class="fw700" style="width: calc(100% - 110rpx);">{{item.goodsName}}
									</view>
								</view>
								<view class="fz26 mt10" style="color:#606060;">
									联系电话：
									<text v-if="item.harvestAddressInfoVo">{{item.harvestAddressInfoVo.phone}}</text>
								</view>
							</view>
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
				windowHeight1: uni.getSystemInfoSync().windowHeight - 220,
				outData: {
					tradeValue: 0,
				},
				list: [],
				pageNum: 1,
				pageSize: 10,
				total: 0,
				name: '',
				isActive: 1
			}
		},
		onLoad(opt) {
			console.log(opt);
			this.getUser()
			this.getList()
		},
		onShow() {},
		methods: {
			check(e) {
				this.page = 1
				this.isActive = e
				this.getList()
			},
			copy() {
				uni.setClipboardData({
					data: this.list.courierCode,
					success: function() {
						console.log('success');
						uni.showToast({
							title: '复制成功！',
							icon: 'none'
						})
					}
				});
			},
			getList() {
				this.$request.post({
					url: '/app/drawRecordsInfo/viewLogistics',
					data: {
						ordersType: this.isActive,
					},
					success: rsp => {
						this.list = rsp.data
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
	.navTab {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		background-color: #fff;
		line-height: 80rpx;
		margin-top: 70rpx;
	}

	.active {
		border-bottom: 5rpx solid #33CC33;
		color: #33CC33;
		font-size: 35rpx;
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
		margin: 50rpx 2.5% 0;
		padding: 2.5%;
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

	.green {
		color: #4CAF50;
	}
</style>