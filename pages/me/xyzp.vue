<template>
	<view class="content">
		<!-- <view :style="{'height':statusBarHeight+'px'}"
			style="width: 100%;position: fixed;top: 0;left: 0;z-index: 999;background:#333333"></view> -->
		<!-- <view class="vcenter header_left_icon" style="margin-top: var(--status-bar-height);">
			<view class="" @click="toBack()">
				<image mode="widthFix" src="/static/tabbar/back.png"></image>
			</view>
		</view> -->
		<narBar :title="getLg('幸运福利')" @back="toBack()" background="transparent"></narBar>
		<scroll-view scroll-y="true" :style="{height:windowHeight+'px'}" style="width: 100%;">
			<view class="">
				<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1745400416736xydzp.png" mode="widthFix"
					style="width: 80%;margin: 120rpx 10% 10rpx;"></image>
				<view class="flex-center-center">
					<view class="mt20 color-fff  text-align-c br10 fz30"
						style="background-color: #33CC33;padding: 10rpx 30rpx;">
						我的积分：{{jifen| toInt}}
					</view>
				</view>
				<view class="flex-column-around-center" style="position: relative;">
					<view class="mt100">
					</view>
					<l-dialer ref="dialer" :num="user.lotteryFrequency" size="350" :prizeList="prizeList"
						@click="onClick" @done="onDone" style="position: relative;z-index: 9;"
						dial-style="color: rgba(60,48,158,0.7); padding: 40rpx;background-image: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744738246262zp.png')">
					</l-dialer>
					<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1745089825088dz.png" mode="widthFix"
						style="margin-top: -27rpx;margin-left: 20rpx;z-index: 8;">
					</image>
				</view>
			</view>
		</scroll-view>
		<view class="w100" style="position: fixed;bottom: 100rpx;z-index: 99;">
			<view class="color-fff text-align-c fw700 fz40 ts-btn"
				style="width: 70%;margin: 0 15%;" @click="onClick">
				点我抽奖 <text class="fz28 fw400 ml10">200积分/次</text>
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
		<uni-popup ref="popWin">
			<view style="width: 80vw; margin: 0 10vw; height: auto;border-radius: 20rpx;background-color: #fff;
			background: #fff;">
				<image
					src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/17446445089418b06ff1a53b0fde9471867508df9d45bedfedcf2bfbb4-9AuSqg@3x.png"
					mode="widthFix" style="width: 90%;margin: -150rpx 5% 0;"></image>
				<view class="">
					<view class="text-align-c fw700 fz40" v-if="prize.rewardType!=5">
						恭喜中奖
					</view>
					<view class="vcenter" style="color: #FF280F;font-size: 26rpx;line-height: 100rpx;">
						{{prize.rewardLevel}}{{prize.rewardName}}<text
							v-if="prize.rewardQuantity>1">*{{prize.rewardQuantity}}</text>
					</view>
					<view class="" v-if="prize.rewardType==1" @tap="lq" style="background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/17446444755604227a48faa5b8a86e9a2e29784b31d1d0924eeb5534b0-aJITXz@3x.png') no-repeat;background-size: 100% 100%;
						width: 60%;height: 100rpx;margin: 0 20% 50rpx;">
						<view class="lh100 text-align-c color-fff">选择配货地址</view>
					</view>
					<view class="color-33CC33 text-align-c lh100" @tap="close1" style="border-top: 1px dashed #ccc;">
						关闭
					</view>

				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import narBar from 'pages/public/narBar.vue'
	import lDialer from 'uni_modules/lime-dialer/components/l-dialer/l-dialer.vue'
	export default {
		filters: {
		    toInt(value) {
		      return Math.floor(value); // 或 parseInt(value) / Math.round(value)
		    }
		  },
		components: {
			narBar,
			lDialer
		},
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight') - 10,
				windowHeight: uni.getSystemInfoSync().windowHeight - 100,
				user: {},
				noClick: true,
				// 奖品列表，
				prizeList: [],
				lottery: {},
				address: {},
				arr: {},
				jifen: '',
				prize: {},
				interval: 2000, // 滚动间隔
				scrollTop: 0,
				timer: null, // 定时器
			};
		},
		onLoad() {
			this.getList()
			this.getUser()
			this.getArr()
			uni.$on('address', (data) => {
				console.log('Received data:', data);
				this.address = JSON.parse(data.select)
			});
		},
		onShow() {
			// setTimeout(() => {
			// 	this.prize = this.prizeList[7]
			// 	this.$refs.popWin.open('center')
			// }, 1000)
		},
		methods: {
			lq() {
				this.$refs.popWin.close()
				if (this.prize.rewardType == 1) {
					this.$refs.popupCP.open('center')
				}
			},
			close1() {
				this.$refs.popWin.close()
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
			getList(item) {
				this.$request.get({
					url: "/app/fortunateTurntableInfo/list",
					success: rsp => {
						this.prizeList = rsp.data
						console.log(this.prizeList);
					}
				})
			},
			onDone(index) {
				this.prize = this.prizeList[index]
				if (this.prize.rewardType != 5) {
					// uni.showModal({
					// 	title: '恭喜您',
					// 	content: '获得' + prize.rewardLevel + prize.rewardName,
					// 	success: function(res) {
					// 		if (res.confirm) {
					// 			console.log('用户点击确定');
					// 			that.$refs.popupCP.open('center')
					// 		}
					// 	}
					// })
					this.close()
				} else {
					// uni.showModal({
					// 	title: prize.rewardName == '谢谢惠顾' ? '很遗憾' : '恭喜您',
					// 	content: (prize.rewardName !== '谢谢惠顾' ? `获得` : '') + prize.rewardLevel + prize.rewardName,
					// })
					this.lottery = {}
				}
				this.$refs.popWin.open('center')
			},
			getUser() {
				this.$request.get({
					url: "/app/dreamUserInfo/getUser",
					success: rsp => {
						this.user = rsp.data
						this.jifen = rsp.data.integral
					}
				})
			},
			close() {
				this.$refs.popupCP.close()
			},
			checkAddress() {
				uni.navigateTo({
					url: '/pages/me/dizhi'
				})
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
						id: this.lottery.id,
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
			onClick() {
				this.$request.get({
					url: "/app/fortunateTurntableInfo/lottery",
					success: rsp => {
						if (rsp.code != 200) {
							uni.showToast({
								title: rsp.message,
								icon: 'none'
							})
							return
						}
						this.lottery = rsp.data
						console.log(this.lottery);
						let index = this.prizeList.findIndex(num => num.rewardLevel === this.lottery
							.rewardLevel);
						console.log(index);
						// 奖品的索引
						this.$refs.dialer.run(index)
						this.getUser()
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
		width: 100%;
		min-height: 100vh;
		background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/17453418509056071143896366302672.jpg') no-repeat;
		background-size: 100% 100%;
		position: relative;
	}

	.header_left_icon {
		width: 100rpx;
		height: 50rpx;
		margin-left: 30rpx;
		margin-top: 50rpx;
		position: fixed;
		top: 20rpx;
		z-index: 99;

		image {
			width: 58rpx;
			height: 58rpx;
		}
	}

	.box {
		width: 100%;
		font-size: 20rpx;
		border-bottom: 1px solid #b8b8b8;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 20rpx 0;
		color: #5E5959;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-around;
		color: #fff;
		padding: 10rpx 0;
		border-bottom: 1px solid #b8b8b8;
		font-size: 24rpx;
		background: url('/static/me/sczc-bg.png') no-repeat;
		background-size: 100% 100%;
	}
</style>