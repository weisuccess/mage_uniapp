<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'产品认购'"    @back="toBack()">
	     	    		 		 	
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
		        
			 	<view class="mt20 px20" style="width: 95%;background-color: #fff;;border: 2px solid #ffffff; border-radius: 14rpx;">
					<view  class="flex-start-center  px10 my30" style="">
						<view class="flex-start-center fz22">
							<view class="textMax2 fw600 " style="font-family: SourceHanSansSC-Bold-2 !important;font-size: 34rpx;">{{arr.title}}</view>
							<view v-if="this.arr.earningsType<5" class="fz20 ml20" style="white-space: nowrap;color: #ec5d53;background-color: #fee8e7; border-radius: 38rpx;border: 1px solid #fbb8b6;;padding: 3rpx 10rpx;">每{{arr.dymtype}}付息到期还本</view>
							<view v-else-if="this.arr.earningsType==5" class=" fz20  ml20" style="white-space: nowrap;color: #ec5d53;background-color: #fee8e7; border-radius: 38rpx;border: 1px solid #fbb8b6;;padding: 3rpx 10rpx;">到期返本返息</view>
						</view> 
						
						
					</view>
					<!-- <view  class="flex-start-center  px10 my30" style="">
						<view style="" class="fw600"><text style="color:#df332a;font-size: 36rpx;margin-right: 10rpx;">{{arr.monovalent}}</text><text class="fz20">USDT/份</text></view> 
					</view>
					 -->
					<view  class="flex-between-center   px10 my30"  style="padding: 30rpx 30rpx;border: 1px solid #ffffff;background-color: #f8f8f8;">
						 <view>金额</view>
						 <input class="text-align-r" style="width:40%;padding-left:0rpx;font-size: 26rpx;color: #000;" type="number" placeholder-style="color:#a1a1a1" v-model="money"
						 		 maxlength="15" placeholder="请输入认购金额" />
						<!-- <view class="flex-between-center " style="width: 140rpx;">
						 							   <text @click="num(1)" style="padding: 4rpx 15rpx;color: #fff;background-color: #da3e2f;">-</text><view class="text-align-c" style="width: 80rpx;color: #000;">{{outData.quantity}}</view> <text class="" @click="num(2)" style="padding: 4rpx 15rpx;color: #fff;background-color: #da3e2f;">+</text>
						 </view> -->
					</view>	
					 
					<!-- <view  class="flex-between-center   px10 my30"  style="padding: 30rpx 30rpx;border: 1px solid #ffffff;background-color: #f8f8f8;">
						 <view>持有份数</view>
						 <view class="flex-between-center " style="width: 140rpx;">
						 							   <text @click="num(1)" style="padding: 4rpx 15rpx;color: #fff;background-color: #da3e2f;">-</text><view class="text-align-c" style="width: 80rpx;color: #000;">{{outData.quantity}}</view> <text class="" @click="num(2)" style="padding: 4rpx 15rpx;color: #fff;background-color: #da3e2f;">+</text>
						 </view>
					</view>	 -->	
				</view> 
				<view class="mt20 " style="width: 100%;background:  #ffffff;border: 2px solid #ffffff; border-radius: 14rpx;">
					<view class="fz28" style="margin: 30rpx 30rpx;">产品概要</view>
					<view class="flex-start-center"  style="width: 640rpx;margin-left: 20rpx;;background-color: #f0f0f0;border-radius: 10rpx;">
						 <view class="px20 ">
							 <view class="flex-between-center py20" style="width: 600rpx;border-bottom:2rpx solid #ebebeb;">
							 	<view style="flex:1">资产规模</br>(USDT)</view> 
								<view style="flex:1">{{arr.circulation}}</view> 
							 </view>
							 <view class="flex-between-center py20" style="width: 600rpx;border-bottom:2rpx solid #ebebeb;">
							 	<view style="flex:1">协议天</view> 
							 								<view style="flex:1">{{arr.holdTime}}</view> 
							 </view>
							 <view class="flex-between-center py20" style="width: 600rpx;border-bottom:2rpx solid #ebebeb;">
							 	<view style="flex:1">限购(份)</view> 
							 								<view style="flex:1"> {{arr.purchasingFrequency}}</view> 
							 </view>
							 <view class="flex-between-center py20" style="width: 600rpx;border-bottom:2rpx solid #ebebeb;">
							 	<view style="flex:1">预期收益率(%)</view> 
							 								<view style="flex:1">{{arr.interestRate}}%</view> 
							 </view>

							
							 <view class="flex-between-center py20" style="width: 600rpx;border-bottom:2rpx solid #ebebeb;">
									<view style="flex:1">VIP率</view> 
																<view style="flex:1">{{levelRate}}%</view> 
							 </view>
							 <view class="flex-between-center py20" style="width: 600rpx;border-bottom:2rpx solid #ebebeb;">
							 									<view style="flex:1">投资日期</view> 
							 																<view style="flex:1">{{day1}}</view> 
							 </view>
							 <view class="flex-between-center py20" style="width: 600rpx;">
							 									<view style="flex:1">到期日期</view> 
							 		 <view style="flex:1">{{day2}}</view> 
							 </view>
							 
						 </view>
						 
					</view>
					 
					<view style="height: 10rpx;"></view>
					 
				 
				</view>
				
		</view>
		
		<view  @click="detail()" class="lineargradient text-align-c " style="margin:30rpx  80rpx;padding: 15rpx 0;color: #fff;border-radius: 10rpx;">确定</view>
		<!-- <view class="fz22 flex-between-center ml30">单笔最低{{this.arr.monovalent}},最高{{this.arr.monovalent*arr.purchasingFrequency}},可投次数{{arr.purchasingFrequency}}</view>
		 -->
	
			<view class="fz22  ml60">
				单笔最低<text style="color: #df332a;">{{this.minmoney}}</text>,
				最高<text style="color: #df332a;">{{this.maxmoney}}</text>
			 ,可投次数<text style="color: #df332a;">{{this.arr.purchasingFrequency}}</text>次</view>	
		
		
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
				money:'',
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
					couponsId: '',
					
				},
				minmoney:0,
				maxmoney:0,
				day1:'',
				day2:'',
				user:'',
				levelRate:0
			};
		},
		onLoad(opt) {
					this.id = opt.id 
					this.outData.id = opt.id
					this.getArr()
					this.getNum()
					this.getUser()
				},
		onUnload(){
			//uni.$off("lang");
		},
		onShow() {
			this.pageNum = 1
			//this.getList()
			
			
			 
		},
		methods: {
		 addDaysToCurrentDate(days) {
		   const currentDate = new Date();
		   currentDate.setDate(currentDate.getDate()  + days);
		   
		   // 格式化日期为"YYYY-MM-DD HH:MM:SS"
		   const year = currentDate.getFullYear(); 
		   const month = String(currentDate.getMonth()  + 1).padStart(2, '0');
		   const day = String(currentDate.getDate()).padStart(2,  '0');
		   const hours = String(currentDate.getHours()).padStart(2,  '0');
		   const minutes = String(currentDate.getMinutes()).padStart(2,  '0');
		   const seconds = String(currentDate.getSeconds()).padStart(2,  '0');
		   
		   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		 },
		 getUser() {
		 	this.$request.get({
		 		url: "/app/dreamUserInfo/getUser",
		 		success: rsp => {
		 			this.user = rsp.data
		 			console.log(this.user);
					console.log(this.user.vipGradeInfo.vipInterest);
					this.levelRate=this.user.vipGradeInfo.vipInterest 
					
					// this.levelRate=Math.round(this.levelRate*10000)/10000
										 
					console.log("等级加成",this.levelRate);
		 			
		 		// 	this.vip_nexexperience=this.user.nextvipGradeInfo.vipExperience;
		 			
		 		// 	this.vip_remainnexexperience=this.user.nextvipGradeInfo.vipExperience-this.user.investmentAmount;
		 		
		 		// 	this.vip_progress=1-(this.vip_remainnexexperience/this.user.nextvipGradeInfo.vipExperience);
		 		// 	this.myLevel=this.user.vipGradeInfo.id;
		 		
		 		// if(this.myLevel>=1)
		 		//   this.rate=this.zilist[this.myLevel-1].rate						 
		 	  }
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
				 console.log('====',this.arr.monovalent);
				 
				 
				 if(this.money>this.maxmoney)
				 {
				 					 	uni.showToast({
				 					 		title: '可投金额超出',
				 					 		icon: 'none'
				 					 	})
				 						return;
				 }
				 if(this.money<this.minmoney)
				 {
					 	uni.showToast({
					 		title: '可投金额不足',
					 		icon: 'none'
					 	})
						return;
				 }
				 
				 
				 this.outData.quantity=1
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
						console.log('====arr',this.arr);
						this.maxmoney=this.arr.maxmoney
						this.minmoney=this.arr.minmoney
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
						this.money=this.arr.monovalent;
						
						
						this.day1=this.addDaysToCurrentDate(0)
						 this.day2=this.addDaysToCurrentDate(this.arr.holdTime)
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
								
								this.outData.investmentmoney=this.money;
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
				 												 uni.navigateBack({ delta: 2 });
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