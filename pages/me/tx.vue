<template>
	<view class="content">
		<view class=""
			style="background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744210203337top-bg.png') no-repeat;background-size: 100% 100%;height: 400rpx;">
			<view style="height: var(--status-bar-height);width: 100%;position: fixed;z-index: 999999;"></view>
			<narBar :title="'提现'" @back="toBack()" background="transparent"></narBar>
			<view class="vcenter" style="width:100%;height:30rpx;margin-top: var(--status-bar-height);"></view>

		</view>
		<view class="fz40" style="width: 90%;background: rgba(255,255,255,.8);margin-top: -200rpx;
			margin-left: 2.5%;margin-right: 2.5%;padding: 2.5%;border-radius: 20rpx;">
			<view class="flex-between-center">
				<view class="flex-start-center" style="line-height: 80rpx;font-weight: bold;">
					资产余额（USDT）
				</view>
				<view class="text-align-c fz28 color-fff"
					style="background-color: #33CC33;width: 200rpx;margin-top: 30rpx;height: 60rpx;line-height: 60rpx;border-radius: 60rpx;"
					@tap="txjl">提现记录 <uni-icons type="right" color="#fff"></uni-icons> </view>
			</view>

			<view style="font-weight: bold;">{{money}}</view>
		</view>
		<view class="box">
			<view class="flex-between-center lh100 " style="border-bottom: 1px solid #aaa;">
				<view class="fz35 fw700" style="">取款货币 </view>
				<view class="fz35">USDT(TRC-20) </view>
			</view>
			<view class=" flex-between-center">
				<view class="fw700 fz35 lh120">收款地址</view>
				<view class="flex-end-center" style="width: 70%;">
					<!-- <view class="ellipsis" style="width: 300rpx;">
						{{select.usdtPacksAddress}}
					</view> -->
					<view class="flex-end-center" style="text-align: right;width: 100%;word-break: break-word;" @click="change">
						{{select.usdtPacksAddress||'去绑定收款地址'}}
						<uni-icons type="right" color="#ccc"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<view class="box" style="background-color: #33CC33;color: #fff;">
			<view style="line-height: 80rpx;font-weight: bold;font-size: 40rpx;">取款金额</view>
			<view class="flex-between-center" style="padding: 10rpx 0;border-bottom: 1px solid #ccc;">
				<view>
					<input type="number" placeholder="请输入取款金额" v-model="outData.usdtMoeny" maxlength="6"
						style="height: 60rpx;line-height: 60rpx;" placeholder-style="color:#fff" @input="checkInput" />
				</view>
			</view>
		</view>
		<view class="box">
			<view style="line-height: 80rpx;font-weight: bold;font-size: 40rpx;">取款密码</view>
			<view class="flex-between-center" style="padding: 10rpx 0;border-bottom: 1px solid #ccc;">
				<view>
					<input type="number" placeholder="请输入支付密码" v-model="outData.payPassword" maxlength="6"
						style="height: 60rpx;line-height: 60rpx;" placeholder-style="color:#000" />
				</view>
			</view>
		</view>
		<button style="width: 80%;color: #fff;margin-top: 60rpx;background: url('/static/login/login-dlbtn.png') no-repeat;
			background-size: 100% 100%;height: 100rpx;line-height: 100rpx;"
			@click.stop="$noMultipleClicks(submit,'valiForm')">确认提交</button>
		<view class="pd40">
			请仔细核对取款信息是否正确，确认提交后请耐心等待款项到账，如24小时内未收到款项，请联系在线客服咨询。
		</view>
		<!-- <passkeyborad :show="show" :money="outData.usdtMoeny" @close="closezujian" @password="submit"
			@showPop="closezujian"></passkeyborad>
		<passkeyborad :show="popshow" :money="tradeValue" @close="closezujian" @password="zhuan" @showPop="closezujian">
		</passkeyborad> -->
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
				popshow: false,
				data: {},
				list: [{
					cardPacksRemarks: '去选择提现方式'
				}, {
					cardPacksRemarks: 'USDT提现'
				}],
				index: 0,
				money: '',
				outData: {
					bankId: '',
					usdtMoeny: 0,
					bankType: 1,
					// otherMoeny: 0,
					payPassword: ''
					// newPassword: ''
				},
				noClick: true,
				tradeValue: 0, //转入余额弹窗里输入框
				select: {
					usdtPacksAddress: ''
				}, //已选择提现方式具体卡号
				timer: null,
			}
		},
		onShow() {
			uni.$on('bank', (data) => {
				console.log('Received data:', data);
				this.select = JSON.parse(data.select)
				this.outData.bankId = this.select.id
			});
		},

		onLoad(opt) {
			this.getList()
			this.getUsdtAddressInfo()
		},
		methods: {
			getUsdtAddressInfo() {
				this.$request.get({
					url: "/app/usdtAddressInfo/list",
					success: rsp => {
						console.log(rsp);
						if(rsp.data[0]){
							this.select.usdtPacksAddress = rsp.data[0].usdtPacksAddress
							this.outData.bankId = rsp.data[0].id
						}
					}
				})
			},
			txjl() {
				uni.navigateTo({
					url: '/pages/me/tixian'
				})
			},
			allm() {
				this.tradeValue = this.money
			},
			closezujian() {
				this.show = false
				this.popshow = false
			},
			checkInput(e) {
				console.log(e, this.money);
				this.$nextTick(() => {
					let value = e.detail.value;
					// if (/^0*$/.test(value)) {
					// 	value = 0
					// }
					if (Number(value) > this.money) {
						value = this.money;
					}
					this.outData.usdtMoeny = value;
				})
				console.log(this.outData.usdtMoeny);
				clearTimeout(this.timer);

				this.timer = setTimeout(() => {}, 500);
			},

			open() {
				this.$refs.popup.open('bottom')
			},
			close() {
				this.$refs.popup.close()
			},
			all() {
				this.outData.usdtMoeny = this.money
				// this.checkInput()
			},
			// change: function(e) {
			// 	this.index = e.detail.value
			// 	console.log(e);
			// 	if (this.index == 1) {
			// 		this.outData.bankType = 1
			// 		this.select = {}
			// 		this.outData.bankId = ''
			// 		uni.navigateTo({
			// 			url: '/pages/me/usdtDetail'
			// 		})
			// 	}
			// 	// this.outData.bankId = this.list[this.index].id
			// },
			change() {
				this.outData.bankType = 1
				if (!this.select.usdtPacksAddress) {
					this.select = {}
					this.outData.bankId = ''
					uni.navigateTo({
						url: '/pages/me/usdtDetail'
					})
				}
			},
			upload() {
				let url = uni.getStorageSync('url')
				uni.showLoading({
					title: '上传中···',
					mask: true
				})
				let that = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择,或者使用相机
					success: function(chooseImageRes) {
						const tempFilePaths = chooseImageRes.tempFilePaths
						console.log(tempFilePaths[0])
						uni.uploadFile({
							url: url + '/Ali/upload',
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								'token': uni.getStorageSync('token')
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data, that.outData)
								that.outData.newPassword = JSON.parse(uploadFileRes.data).data
								uni.hideLoading()
							}
						})
					},
					fail() {
						uni.hideLoading()
					}
				})
			},
			getList() {
				this.$request.get({
					url: '/app/dreamUserInfo/getUser',
					success: rsp => {
						this.money = rsp.data.balance
					}
				})
			},
			submit(e) {
				// this.outData.payPassword = e
				// if (uni.getStorageSync('getUser').isDelete == 1) {
				// 	uni.showToast({
				// 		title: '实名过后再进行操作',
				// 		icon: 'none'
				// 	})
				// 	this.show = false
				// 	this.getList()
				// 	return
				// }
				if (Number(this.outData.usdtMoeny) < 100 || !this.outData.usdtMoeny) {
					uni.showToast({
						title: "最低提现金额100USDT",
						icon: 'none',
						duration: 1500
					});
					return false;
				}
				if (!this.outData.bankId) {
					uni.showToast({
						title: "请选择收款地址",
						icon: 'none',
						duration: 1500
					});
					return false;
				}
				if (Number(this.outData.usdtMoeny) > this.money) {
					uni.showToast({
						title: "提现金额不能大于可提余额",
						icon: 'none',
						duration: 1500
					});
					return false;
				}
				// var testmoney = /(^[1-9]([0-9]+)?([0-9])?$)|(^(0){1}$)|(^[0-9][0-9](0-9)?$)/;
				// if (!testmoney.test(this.outData.tradeValue)) {
				// 	uni.showToast({
				// 		title: "请输入正确的金额,且不包含小数位。",
				// 		icon: 'none',
				// 		duration: 1500
				// 	});
				// 	return false;
				// }

				// if (!this.list[0]) {
				// 	uni.showToast({
				// 		title: '没有银行卡不能提现，先去卡包新增银行卡吧！',
				// 		icon: 'none'
				// 	})
				// 	return
				// }
				// if (this.outData.bankType == 0) {
				// 	uni.showToast({
				// 		title: '请选择提现方式',
				// 		icon: 'none'
				// 	})
				// 	return
				// }

				// if (this.outData.bankId) {
				// 	uni.showToast({
				// 		title: "请选择银行卡",
				// 		icon: 'none',
				// 		duration: 1500
				// 	});
				// 	return false;
				// }
				this.$request.post({
					url: '/app/payoutsAuditInfo/submitPayouts',
					data: this.outData,
					success: rsp => {
						if (rsp.code == 200) {
							this.show = false
							this.getList()
						}
						uni.showToast({
							title: rsp.message,
							icon: 'none'
						})
					}
				})
			},
			zhuan(e) {
				this.payPassword = e
				// if (uni.getStorageSync('getUser').isDelete == 1) {
				// 	uni.showToast({
				// 		title: '实名过后再进行操作',
				// 		icon: 'none'
				// 	})
				// 	this.popshow = false
				// 	this.getList()
				// 	return
				// }
				if (Number(this.tradeValue) > this.money) {
					uni.showToast({
						title: "提现金额不能大于当前余额",
						icon: 'none',
						duration: 1500
					});
					return false;
				}
				var testmoney = /(^[1-9]([0-9]+)?([0-9])?$)|(^(0){1}$)|(^[0-9][0-9](0-9)?$)/;
				if (!testmoney.test(this.tradeValue)) {
					uni.showToast({
						title: "请输入正确的金额,且不包含小数位。",
						icon: 'none',
						duration: 1500
					});
					return false;
				}
				this.$request.post({
					url: '/app/dreamUserInfo/turnBalance',
					data: {
						tradeValue: this.tradeValue,
						payPassword: this.payPassword
					},
					success: rsp => {
						uni.showToast({
							title: rsp.message,
							icon: 'none'
						})
						if (rsp.code == 200) {
							this.popshow = false
							this.$refs.popup.close()
							this.getList()
						}
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
		background-size: 100% 70%;
		height: 100vh;
		color: #3A3A3A; */
	}

	.box {
		width: 90%;
		margin: 2.5%;
		padding: 5% 2.5%;
		background-color: #fff;
		border-radius: 10rpx;
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