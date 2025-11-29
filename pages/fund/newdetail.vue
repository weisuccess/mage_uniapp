<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'产品详情'"    @back="toBack()">
	     	    		 		 	
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
		<view class="flex-column-center  mx40" style="margin-top: -70rpx; "> 
		        
			 	<view class="mt20" style="width: 100%;background-color: #fff;;border: 2px solid #ffffff; border-radius: 14rpx;">
					<view  class="flex-between-center  px10 " style="margin: 30rpx 10rpx;">
						<view class="flex-start-center fz22">
							<view class="textMax2 fw600" style="width:280rpx;font-family: SourceHanSansSC-Bold-2 !important;font-size: 30rpx;">{{arr.title}}</view>
							<view v-if="this.arr.earningsType<5" class="text-align-c fz20 " style="color: #ec5d53;background-color: #fee8e7; border-radius: 38rpx;border: 1px solid #fbb8b6;;padding: 3rpx 7rpx;">每{{arr.dymtype}}付息到期还本</view>
							<view v-if="this.arr.earningsType==5" class="text-align-c fz20 " style="color: #ec5d53;background-color: #fee8e7; border-radius: 38rpx;border: 1px solid #fbb8b6;;padding: 3rpx 7rpx;">到期返本返息</view>
						</view>
						 
						<view class="flex-start-center fz22">
													<view class="fw400 color-zhi">{{arr.interestRate}}%</view>
													<view class="ml10">{{arr.dymtype}}利率</view>
												</view>
					</view>
					<view  class="flex-between-center  px10 " style="margin: 30rpx 10rpx;">
						 
						 <view  class="flex-column-center fz24 bac py10" style="border: 1px solid #ffffff;;width: 31%;background-color: #f8f8f8;">
							 <view class="fw600" style="color: #898989;">份额</view>
			 
							 <view style="" class="fw600">{{arr.monovalent}}USDT/份</view>
						 </view>
						  <view  class="flex-column-center fz24 bac py10" style="border: 1px solid #ffffff;;width: 31%;background-color: #f8f8f8;">
						  							 <view class="fw600" style="color: #898989;">周期</view>
						  			 
						  							 <view style="" class="fw600">{{arr.holdTime}}天</view>
						  </view> 
						  <view  class="flex-column-center fz24 bac py10" style="border: 1px solid #ffffff;;width: 31%;background-color: #f8f8f8;">
						  							 <view class="fw600" style="color: #898989;">限购</view>
						  			 
						  							 <view style="" class="fw600">{{arr.purchasingFrequency}}份</view>
						  </view> 
					</view>
					<view class=" px20   fz26" style="margin: 30rpx 0rpx;">
					 	 <progress :percent="arr.progress" stroke-width="10" border-radius="60" activeColor="#2989ef" />
					 </view>
				 
					<view class=" px10  flex-between-center fz26" style="margin: 30rpx 20rpx;">
						 <view style="color: #898989;">投资进度: <text class="color-zhi">{{arr.progress}}%</text></view>
						 <view style="color: #898989;;">项目规模:<text class="color-zhi" decode>{{kong}}{{arr.circulation}}</text> USDT</view>			
					</view>
					 
				<!-- 	 <view class=" px20 flex-between-center ">
						 <view class="fz26">购买数量</view>
						  <view class="flex-between-center " style="width: 140rpx;">
							  <text class="" @click="num(2)" style="padding: 4rpx 15rpx;color: #fff;background-color: #da3e2f;">+</text> <view class="text-align-c" style="width: 80rpx;color: #000;">{{outData.quantity}}</view> <text @click="num(1)" style="padding: 4rpx 15rpx;color: #fff;background-color: #da3e2f;">-</text>
						  </view>
					 </view> -->
					
					
					<view class="mt40"></view>
					 
				</view>
				
				<view class="mt20" style="width: 100%;background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff);;border: 2px solid #ffffff; border-radius: 14rpx;">
					<view class=" " style="margin: 30rpx 30rpx;">推荐奖励分成</view>
					<view class="fz26" style="margin: 30rpx 40rpx;">· 一级下线投资金额3%</view>
					<view class="fz26" style="margin: 30rpx 40rpx;">· 二级下线投资金额2%</view>
					<view class="fz26" style="margin: 30rpx 40rpx;">· 三级下线投资金额1%</view>
					
					<view class="fz26" style="margin: 30rpx 30rpx;">项目概况</view>
					<view class="fz22" style="margin: 30rpx 30rpx;line-height: 35rpx;"> <text decode>{{kong}}{{kong}}{{kong}}</text>   {{arr.content}}</view>
					<view style="height: 10rpx;"></view>
				</view>
				
		</view>
		
		<view  @click="toDetailE()" class="lineargradient text-align-c " style="margin:30rpx  80rpx;padding: 15rpx 0;color: #fff;border-radius: 10rpx;">立即持有</view>
	
		
		<view class="mt50"></view>
		
		<uni-popup ref="popZR">
								   <view class="fw500 "
												style="width: 68vw; margin: 0 5vw; border-radius: 16rpx;padding:50rpx 0;background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff);position: relative;border:4rpx solid #da3e2f;">
												 
												 
												<view class="flex-column-center-center ">
									<view class="fz30 text-align-c" style="width: 600rpx;">请输入交易密码:</view>
									<view class=" mt40">
										<u-code-input v-model="outData.payPassword" :maxlength="6" :space="2" size="35"></u-code-input>
									</view>
									<!-- <input type="number" maxlength="6" v-model="payPassword"
										style="border-bottom: 1px solid #ccc;width: 200rpx;" /> -->
								</view>
				<view class="flex-center-center px40 mt60">
					<view  @click="close"  style="margin-right: 20rpx;padding: 7rpx 40rpx;background-color: #e9e9e9;
														border-radius: 40rpx;color:#df332a;">取消</view>
					<view @click.stop="$noMultipleClicks(submit,'')"  style="margin-left: 30rpx;padding: 7rpx 40rpx;background-color: #df332a;
														border-radius: 40rpx;color:#fff;">确定</view>
				</view>
								 
							</view>
				  
				  
				  
				  
				  
				  
				  
				  
			</uni-popup>
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
				kong:'&ensp;',
				id: 0,
				arr: {},
			 
				noClick: true,
				day: 0,
				hour: 0,
				minute: 0,
				second: 0,
				titlist: ['资产详情', '资产说明'],
				isActive: 0,
				purchaseQuantity: 0,
				show: false,
				outData: {
					tradeValue: 1,
					quantity: 1,
					payPassword: '',
					id: '',
					select: 1,
					couponsId: ''
				},
			};
		},
		onLoad(opt) {
					this.id = opt.id 
					this.outData.id = opt.id
					this.getArr()
					this.getNum()
				},
		onUnload(){
			//uni.$off("lang");
		},
		onShow() {
			this.pageNum = 1
			//this.getList()
		},
		methods: {
		 
			 toDetailE(){
				 uni.navigateTo({
				 	url: '/pages/fund/newdetailE?id=' + this.id
				 })
			 },
			 active(index) {
			 	this.isActive = index
			 },
			 close() {
			 				this.$refs.popZR.close()
			 },
			 num(e) {
			 
			 	if (e == 1) {
			 		if (this.outData.quantity <= 1) {
			 			uni.showToast({
			 				title: '数量不能小于1',
			 				icon: 'none'
			 			})
			 			return
			 		}
			 		this.outData.quantity -= 1
			 	}
			 	if (e == 2) {
			 		if (this.outData.quantity >= this.purchaseQuantity) {
			 			uni.showToast({
			 				title: '数量不能大于' + this.purchaseQuantity,
			 				icon: 'none'
			 			})
			 			return
			 		}
			 		this.outData.quantity += 1
			 	}
			 	this.money = this.outData.quantity * this.arr.monovalent
			 },
			 detail() {
				 
			 	// if (this.purchaseQuantity == 0) {
			 	// 	uni.showToast({
			 	// 		title: '可投金额不足',
			 	// 		icon: 'none'
			 	// 	})
			 	// 	return
			 	// }
			 	// uni.navigateTo({
			 	// 	url: '/pages/fund/subscription?id=' + this.id
			 	// })
				
				this.outData.payPassword=''
				this.$refs.popZR.open('center')
			 },
			 previewImage(index) {
			 	uni.previewImage({
			 		urls: this.arr.titleImage,
			 		current: index
			 	});
			 },
			 getNum() {
			 	this.$request.get({
			 		url: "/app/opportunityInfo/purchaseQuantity",
			 		data: {
			 			id: this.id,
			 		},
			 		success: rsp => {
			 			console.log(rsp);
			 			this.purchaseQuantity = rsp.data
			 		}
			 	})
			 },
			 getArr() {
			 	this.$request.get({
			 		url: "/app/opportunityInfo/getDetails",
			 		data: {
			 			id: this.id,
			 		},
			 		success: rsp => {
			 			this.arr = rsp.data
						var temp=['日','周','月','年']
						this.arr.dymtype=temp[this.arr.earningsType-1];
						console.log(this.arr);
			 			if (this.arr.titleImage.includes(',') == true) {
			 				this.arr.titleImage = this.arr.titleImage.split(',')
			 			} else {
			 				this.arr.titleImage = [this.arr.titleImage]
			 			}
			 			const currentTimestamp = Date.now();
			 			let countdownTime = this.arr.preSaleTime - currentTimestamp;
			 			const remainingTime = countdownTime / 1000; // 将毫秒转换为秒
			 			console.log(remainingTime);
			 			if (remainingTime > 0) {
			 				this.show = true
			 			} else {
			 				this.show = false
			 			}
			 			if (currentTimestamp > this.arr.preSaleTime) {
			 				return
			 			}
			 
			 			this.day = Math.floor(remainingTime / 86400); // 计算剩余天数
			 			this.hour = Math.floor((remainingTime % 86400) / 3600); // 计算剩余小时
			 			this.minute = Math.floor((remainingTime % 3600) / 60); // 计算剩余分钟
			 			this.second = Math.floor(remainingTime % 60); // 计算剩余分钟
			 			console.log(this.day, this.hour, this.minute, this.second, '时间');
			 		}
			 	})
			 },
			 // num(e) {
			 // 	if (e == 1) {
			 // 		this.outData.tradeValue -= 1
			 // 	}
			 // 	if (e == 2) {
			 // 		this.outData.tradeValue += 1
			 // 	}
			 // },
			 submit() {
				 console.log('htong');
			
				
				
				var testmoney = /(^[1-9]([0-9]+)?([0-9])?$)|(^(0){1}$)|(^[0-9][0-9](0-9)?$)/;
								if (!testmoney.test(this.outData.quantity)) {
									uni.showToast({
										title:this.$i18n.t('请输入正确的金额,且不包含小数位'),
										icon: 'none',
										duration: 1500
									});
									return false;
								}
								// if (this.outData.tradeValue == null || this.outData.tradeValue.length < 1) {
								// 	uni.showToast({
								// 		title: "请选择银行卡",
								// 		icon: 'none',
								// 		duration: 1500
								// 	});
								// 	return false;
								// }
								if (!this.outData.payPassword) {
									uni.showToast({
										title: this.$i18n.t('请输入密码'),
										icon: 'none',
										duration: 1500
									});
									return false;
								}
								 
							  this.buy();
				
				
				
				return;
			 	
			 },
			 buy()
			 {
				 var testmoney = /(^[1-9]([0-9]+)?([0-9])?$)|(^(0){1}$)|(^[0-9][0-9](0-9)?$)/;
				 				if (!testmoney.test(this.outData.quantity)) {
				 					uni.showToast({
				 						title:this.$i18n.t('请输入正确的金额,且不包含小数位'),
				 						icon: 'none',
				 						duration: 1500
				 					});
				 					return false;
				 				}
				 				// if (this.outData.tradeValue == null || this.outData.tradeValue.length < 1) {
				 				// 	uni.showToast({
				 				// 		title: "请选择银行卡",
				 				// 		icon: 'none',
				 				// 		duration: 1500
				 				// 	});
				 				// 	return false;
				 				// }
				 				if (!this.outData.payPassword) {
				 					uni.showToast({
				 						title: this.$i18n.t('请输入密码'),
				 						icon: 'none',
				 						duration: 1500
				 					});
				 					return false;
				 				}
				 								let url = '/app/opportunityInfo/products'
				 								this.$request.get({
				 									url: url,
				 									data: this.outData,
				 									success: rsp => {
				 										uni.showToast({
				 											title:rsp.message ,
				 											icon: 'none'
				 										})
				 										if (rsp.code == 200) {
				 											setTimeout(() => {
				 												  uni.navigateBack()
				 												// if (this.arr.opportunityType == 6) {
				 												// 	uni.navigateTo({
				 												// 		url: '/pages/me/tyj/index'
				 												// 	})
				 												// } else {
				 												// 	uni.navigateTo({
				 												// 		url: '/pages/me/myPosition'
				 												// 	})
				 												// }
				 											}, 1500)
				 										}
				 										this.$refs.popZR.close()
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
	@import url('https://vp09029.oss-cn-hongkong.aliyuncs.com/wang.css');
	page {
			background-color: #e7e9e9;
			 height: 100vh;
			  overflow: auto;
		}
		   ::v-deep .uni-progress-bar {
				// 这主要是加上deep才能改变它原来的样式 
				border-radius: 10px !important;
				overflow: hidden;
			}
			
			::v-deep .uni-progress-inner-bar {  
			    // 这主要是加上deep才能改变它原来的样式
			    border-radius: 10px !important;
			    overflow: hidden;
				background:linear-gradient(to right,#c93024, #f37c7c,#c93024);
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