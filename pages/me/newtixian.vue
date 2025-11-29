<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'提现'"    @back="toBack()">
	     	    		 		 	
	     </narBarAndTop>
		<!-- <view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view> -->
		<view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view>
	 
		
		
	
			<view style=" background-image:  url('/static/null/fundindextop.png'); 
					  background-repeat: no-repeat; 
					  background-size:cover;
					background-size: 100% 100%;
					width:100vw;
					height:200rpx				
					">  
			 
					
			 </view>
		<view class="flex-column-center  mx40" style="margin-top: -90rpx; "> 
		        
			 	<view class="mt20 " style="width: 100%;background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff); border-radius: 16rpx;">
					 <view class=" " style="margin:30rpx;">
						 <view class="flex-start-center"  style="line-height: 50rpx; ">
						 	<view>USDT余额:</view>
						 	<text class="fw600 ml20 fz34" style="color: #b9332c;">{{money}}</text>
						 </view>	 
						 <view class="mt20">提现地址：</view>
						 <view class="mt20 fz26 flex-between-center" style="border-radius: 8rpx;padding: 20rpx;background-color: #f4efee;">
							 <view>{{select.usdtPacksAddress}}</view>
							 <text @click="change" v-if='!select.usdtPacksAddress' class="mr20 fw500 fz28" style="color: #de4b46;">去绑定收款地址</text>
						</view>
						 
						 <view class="mt20 fz24 flex-start-center" >
							 <image src="/static/null/tanhao.png"  style="width: 30rpx;padr" mode="widthFix" />
							 <text class="ml10">如需要修改地址，请联系客服进行修改</text></view>
						 
						 <view class="mt30">提现金额：</view>
						  
						 <view>
						 <view class="mt20 fz26 flex-between-center" style="border-radius: 8rpx;padding: 0rpx;background-color: #f4efee;">
							 
							 <input class="vinput2" style="width:70%;padding-left:10rpx;font-size: 26rpx;color: #000;" type="number" placeholder-style="color:#a1a1a1" v-model="outData.usdtMoeny"
							 						 			 maxlength="10" placeholder="提现金额不可低于100" />
							<text @click="alltixian()" class="mr20 fw500 fz28" style="color: #de4b46;">全部提现</text>
						 </view>	
						 <view class="mt20 fz24 flex-start-center" >
						 							
						 							
													 
													 </view>
						<view class="mt30">交易密码：</view>
						
						<view class="mt20 fz26" style="border-radius: 8rpx;padding: 0rpx;background-color: #f4efee;">
													 
													 <input class="vinput2" style="width:70%;padding-left:10rpx;font-size: 26rpx;color: #000;" type="number" placeholder-style="color:#a1a1a1" v-model="outData.payPassword"
													 						 			 maxlength="10" placeholder="请输入交易密码" />
													 
						</view>	
						
						<view class="mt20 fz26" style="letter-spacing: 1px; ">1.提现时间：北京时间（CST）9:00—21:00塞浦路斯东二区3:00—15:00，到账时间受区块链网络影响，通常为30分钟内到账，最迟不会超过24小时。若超时未到账，请及时联系在线客服为您查明原因</view>
						
						<view class="mt20 fz26" style="letter-spacing: 1px; ">2.提现金额:提现金额不得低于100USDT，每日每个账户可提现1次。</view>
						
						<view class="mt20 fz26" style="letter-spacing: 1px; ">3.注意事项:本平台由USDT-TRC20波场链进行提款，由于区块链 交易的不可逆性提现时请仔细核对您的提现地址，确认无误后再提交申请。</view>
						 
						 
						 
						 <view @click.stop="$noMultipleClicks(submit,'valiForm')" class=" text-align-c mt30" style="background: linear-gradient(to bottom, #ea311f,  #f97978, #ea311f);border-radius: 10rpx;color: #fff;padding: 20rpx 0;">提交审核</view>
						 
						 
						 <view class=" text-align-c mt30" style=" border: 2rpx solid #ea311f;;border-radius: 10rpx;color: #000;padding: 20rpx 0;">联系客服</view>
						 </view>
						 
						 
					 </view>
					 
					 
					
				</view>
		</view>
		
	
		
		<view class="mt50"></view>
	</view>
	 
</template>

<script>
	import narBarAndTop from 'pages/public/narBarAndTop.vue' 
	export default {
		components: {
			narBarAndTop, 
		},
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 90,
				noClick: true,
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
									usdtMoeny: '',
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
			};
		},
		onLoad(opt) {
					
				},
		onShow() {
			this.getList()
			this.getUsdtAddressInfo()
			
			
		},
				methods: {
					alltixian(){
						 this.outData.usdtMoeny=this.money
					},
					getUsdtAddressInfo() {
						this.$request.get({
							url: "/app/usdtAddressInfo/list",
							success: rsp => {
								console.log(rsp);
								if(rsp.data[0]){
									this.select.usdtPacksAddress = rsp.data[0].usdtPacksAddress
									this.outData.bankId = rsp.data[0].id
									this.$forceUpdate();
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
		
						this.timer = setTimeout(() => {
							
						}, 1000);
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
								url: '/pages/me/newusdtDetail'
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
	};
</script>
 
<style lang="scss" scoped>
	
	page {
			background-color: #e7e9e9;
			 height: 100vh;
			  overflow: auto;
		}
		 
	.content {
	    
		  
		    top: 0;
		  left:0;
		  //  z-index:0;
		   position: absolute;
		  width: 100vw;
		 
		  
	 
	}
	.k {
		 
		// background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744290610523bg.png') no-repeat;
		
		 
		 
		width: 100%;
		background-color: #ffffff;
		background-size: 100% auto;
		// background-color: #f1f1f1;
		  display: flex;
		  flex-direction: column;
		// padding-bottom: 60rpx;
		// margin: 60rpx 2.5%;k
	
	}
	.topbg{
	 
	
	    
	  
	 //    background-size: cover; /* 背景图片覆盖整个容器 */
	 //    // background-position: right top; /* 图片在容器的右侧和垂直居中 */
		// background-size: 100% 100%;
	 //   // z-index:0;
		// background-size: 100% 100%;
		// background-size:cover;
		// // height: 100rpx;
		// margin-top: 160rpx;
		// padding: 0;
		  
	}
	.bg1{
		background-image:  url('/static/null/menub1.png') ;
		background-repeat: no-repeat;
		  background-size:cover;
		background-size: 100% 100%;
	}
	.bg2{
		background-image:  url('/static/null/menub2.png') ;
		background-repeat: no-repeat;
		background-size:cover;
		background-size: 100% 100%;
	}
	.xht1 {
		background-image:  url('https://vp09029.oss-cn-hongkong.aliyuncs.com/vgui/vipbg2.png') ;
	 
		  background-repeat: no-repeat;
		// background-size:cover;
		background-size: 100% 100%;
		width:calc(100% - 26px);
		 
		}
	.quan{
			border-bottom: 2rpx solid #c5c5c5;
			margin:30rpx;
			
			background-color: #ffffff;
			border-radius: 22rpx;
		}
	.w20 {
		width: 25%;
		text-align: center;
	}

	.box {
		width: 100%;
		border-bottom: 1px solid #b8b8b8;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 20rpx 0;
		color: #5E5959;
		font-size: 20rpx;
		color: #434040;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-around;
		color: #fff;
		padding: 15rpx 0;
		border-bottom: 1px solid #b8b8b8;
		font-size: 24rpx;
		background: url('/static/me/sczc-bg.png') no-repeat;
		background-size: 100% 100%;
	}

	.bg-fff {
		background: url("https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744713194215bg1.png");
		background-size: 100% 100%;
	}

	.bg-green {
		background: url("https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744713201037bg2.png");
		background-size: 100% 100%;
	}
</style>