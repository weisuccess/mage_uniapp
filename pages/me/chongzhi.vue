<template>
	<view class="content">
		<scroll-view scroll-y="">
			<view class="" style="background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744210203337top-bg.png') no-repeat;background-size: 100% 100%;height: 400rpx;">
				<view style="height: var(--status-bar-height);width: 100%;position: fixed;z-index: 999999;"></view>
				<narBar :title="'充值'" @back="toBack()" background="transparent"></narBar>
			</view>
			<view class="vcenter" style="width:100%;height:30rpx;margin-top: var(--status-bar-height);"></view>
			<view class=" flex-between-center"
				style="width: 90%;background: rgba(255,255,255,.8);margin-right: 2.5%;margin-left: 2.5%;margin-top: -250rpx;padding:30rpx 2.5%;border-radius: 20rpx;box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.2);">
				<view class="text-align-c fz40  fw700" @tap="czjl">{{user.telPhone| hidePhone}} </view>
				<view class="flex-start-end fz35" style="flex-direction: column;">
					<view class="flex-start-center " style="line-height: 80rpx;font-weight: bold;">
						余额
					</view>
					<view style="font-weight: bold;">{{money}} (USDT)</view>
				</view>
			</view>
			<view class="box color-fff mt40" style="background-color: #33CC33;">
				<view class="flex-between-center">
					<view class="fw700 mb30">充值金额</view>
					<view class="mb30 ">USDT (TRC-20)</view>
				</view>
				<text style="color: #fff;font-size: 26rpx;"
					v-if="outData.usdtMoeny&&outData.usdtMoeny<100">最低充值金额为100USDT</text>
				<view style="display: flex;justify-content: space-between;align-items: center;
				border-bottom: 1px solid #ccc;">
					<view style="font-size: 60rpx;font-weight: bold;display: flex;align-items: center;">
						<input type="number" placeholder="请输入充值金额" placeholder-class="fz30 fw400"
							placeholder-style="color:#fff" v-model="outData.usdtMoeny" maxlength="20"
							style="font-size: 60rpx;color: #fff;" @input="checkInput" />
					</view>
					<!-- <view style="width: 300rpx;text-align: right;color: #ccc;font-weight: bold;">USDT</view> -->
				</view>
			</view>
			<!-- <view class="box color-fff mt40" style="background-color: #33CC33;">
				<view class="fw700 mb30">密码</view>
				<view style="display: flex;justify-content: space-between;align-items: center;
				border-radius: 60rpx;padding: 0 20rpx;border: 1px solid #fff;">
					<view style="display: flex;align-items: center;line-height: 80rpx;height: 80rpx;">
						<input type="number" placeholder="请输入密码" placeholder-class=" fw400"
							placeholder-style="color:#fff" v-model="outData.payPassword" maxlength="6"
							style="color: #fff;"/>
					</view>
				</view>
			</view> -->
			
			<view class="box" style="margin-top: 40rpx;">
				<view class="text-align-c">
					上传充值凭证
				</view>
				<button @click="upload" class="mt60 text-align-c" style="border: 1px solid #ccc;width: 400rpx;height: 300rpx;line-height: 300rpx;padding: 0;">
					<image :src="outData.tradeIcon" style="width: 100%;height: 100%;" v-if="outData.tradeIcon"></image>
					<view style="font-size: 80rpx;" v-else>+</view>
				</button>
			</view>
			
			<view class="text-align-c mt30" style="color: #5E5E5E;">
				充值前请联系在线客服，获取最新充值地址
			</view>
			<button class="ts-btn mb60"
				style="width: 80%;color: #fff;margin-top: 60rpx;height: 100rpx;line-height: 100rpx;"
				@tap="submit">确认</button>
			<!-- <passkeyborad :show="show" :money="outData.usdtMoeny" @close="closezujian" @password="submit"
				@showPop="closezujian"></passkeyborad> -->
		</scroll-view>
		
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
				show: false,
				data: {},
				list: [{
					title: '请选择充值方式'
				}, {
					title: '银行卡'
				}],
				index: 0,
				money: '',
				outData: {
					usdtMoeny: '',
					tradeIcon: '',
					payPassword: '',
				},
				codearr: {},
				user: {},
				select: {}, //已选择提现方式具体卡号
				collection: {}
			}
		},
		onShow() {
			// uni.$on('bank', (data) => {
			// 	console.log('Received data:', data);
			// 	this.select = JSON.parse(data.select)
			// 	this.outData.bankId = this.select.id
			// });
		},
		onLoad(opt) {
			this.getUser()
		},
		methods: {
			copy() {
				uni.setClipboardData({
					data: this.user.youdunRechargeAddress,
					success: function() {
						console.log('success');
						uni.showToast({
							title: '复制成功！',
							icon: 'none'
						})
					}
				});
			},
			czjl() {
				uni.navigateTo({
					url: '/pages/me/moneyDetails'
				})
			},
			getUser() {
				this.$request.get({
					url: '/app/dreamUserInfo/getUser',
					success: rsp => {
						this.user = rsp.data
						this.money = rsp.data.balance
					}
				})
			},
			closezujian() {
				this.show = false
			},
			checkInput(type) {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {

				}, 500);
			},
			kefu() {
				// uni.navigateTo({
				// 	url: '/pages/my/kefu'
				// })
				this.$request.get({
					url: "/app/dreamUserInfo/getCustomer?customerId=1",
					success: rsp => {
						uni.navigateTo({
							url: '/pages/webview/webview2?url=' + rsp.data.imageUrl
						})
						uni.showToast({
							title: rsp.message,
							icon: 'none',
							duration: 1000
						});
					}
				})
			},
			upload() {
				let url = uni.getStorageSync('url')

				let that = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择,或者使用相机
					success: function(chooseImageRes) {
						const tempFilePaths = chooseImageRes.tempFilePaths
						console.log(tempFilePaths[0])
						uni.showLoading({
							title: '上传中···',
							mask: true
						})
						uni.uploadFile({
							url: url + '/Ali/upload',
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								'token': uni.getStorageSync('token')
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data, that.outData)
								that.outData.tradeIcon = JSON.parse(uploadFileRes.data).data
								uni.hideLoading()
							},
							fail() {
								uni.hideLoading()
							}
						})
					},
					fail() {
						uni.hideLoading()
					}
				})
			},
			all() {
				this.outData.usdtMoeny = this.money
			},
			// bank() {
			// 	this.$request.get({
			// 		url: '/app/bankInfo/list',
			// 		data: {
			// 			pageNum: 1,
			// 			pageSize: 10,
			// 		},
			// 		success: rsp => {
			// 			this.codearr = rsp.data
			// 		}
			// 	})
			// },
			// usdtList() {
			// 	this.$request.get({
			// 		url: '/app/bankCardsInfo/list',
			// 		data: {
			// 			pageNum: 1,
			// 			pageSize: 10,
			// 		},
			// 		success: rsp => {
			// 			if(!rsp.data[0]){

			// 			}
			// 		}
			// 	})
			// },
			change: function(e) {
				this.index = e.detail.value
				console.log(e);
				// this.outData.bankType = this.index
				if (this.index == 2) {
					this.outData.bankType = 2
					// this.bank()
					// uni.navigateTo({
					// 	url: '/pages/my/bankList'
					// })
				}
				if (this.index == 1) {
					this.outData.bankType = 1
					// this.usdtList()
					// uni.navigateTo({
					// 	url: '/pages/my/yhList'
					// })
				}
				// this.getList()
				// this.kefu()
			},
			// getList() {
			// 	this.$request.get({
			// 		url: '/app/dreamUserInfo/getRechargeManner',
			// 		data: {
			// 			id: this.index + 1
			// 		},
			// 		success: rsp => {
			// 			this.codearr = rsp.data
			// 		}
			// 	})
			// },
			submit() {
				// this.outData.payPassword = e
				// if (uni.getStorageSync('getUser').isDelete == 1) {
				// 	uni.showToast({
				// 		title: '实名过后再进行操作',
				// 		icon: 'none'
				// 	})
				// 	this.show = false
				// 	this.getUser()
				// 	return
				// }
				if (Number(this.outData.usdtMoeny) < 100 || !this.outData.usdtMoeny) {
					uni.showToast({
						title: "最低充值金额为100U",
						icon: 'none',
						duration: 1500
					});
					return false;
				}
				// var testmoney = /(^[1-9]([0-9]+)?([0-9])?$)|(^(0){1}$)|(^[0-9][0-9](0-9)?$)/;
				// if (!testmoney.test(this.outData.usdtMoeny)) {
				// 	uni.showToast({
				// 		title: "请输入正确的金额,且不包含小数位。",
				// 		icon: 'none',
				// 		duration: 1500
				// 	});
				// 	return false;
				// }
				if (this.outData.tradeIcon == '') {
					uni.showToast({
						title: "请上传支付凭证",
						icon: 'none',
						duration: 1500
					});
					return false;
				}
				console.log(this.outData);
				this.$request.post({
					url: '/app/rechargeAuditInfo/submitRecharge',
					data: this.outData,
					success: rsp => {
						if (rsp.code == 200) {
							this.show = false
							this.getUser()
						}
						this.outData= {
							usdtMoeny: '',
							tradeIcon: '',
							payPassword: '',
						}
						// uni.showToast({
						// 	title: rsp.message,
						// 	icon: 'none'
						// })
						uni.showModal({
							title: '提示',
							content: rsp.message,
							showCancel:false,
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} 
							}
						});
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
		background-color: #F3F3F3;
	}
</style>
<style>
	.content {
		/* background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		background-size: 100% 100%;
		min-height: 100vh;
		color: #3A3A3A; */
	}

	.box {
		width: 90%;
		margin-left: 2.5%;
		margin-right: 2.5%;
		padding: 5% 2.5%;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.2);
	}

	.pop-input {
		width: 65%;
		height: 100rpx;
		box-shadow: 3rpx 0px 6rpx 0px #004AC9;
		border-radius: 12rpx;
		border: 2rpx solid #347FFE;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
	}
</style>