<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'签到'"    @back="toBack()">
	     	    		 		 	
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
					 <view class="flex-between-center" style="margin-top: 70rpx;">
					 	<view class="flex-start-center ml40" style="width: 500rpx;">	
										 
					 		<image :src="this.user.handlUrl"	style="width: 100rpx;height: 100rpx;border-radius: 50%;" mode="aspectFill" /> 
							
							<view class=" flex-column-start ml20 " style="line-height: 40rpx">
								 <view class="fw400 fz26 color-fff">累计签到</view>
								 <view class="color-fff fz26" style="">
									 {{sign.continuousDays}}天
								  </view>
							 </view>
					 	</view>
					 	 
						 <view  class="" style=" ">
							  <image src="/static/null/qiandao1.png"	style="width: 130rpx; bottom:-3px;right:40px;" mode="widthFix" /> 
						 </view>
					 </view>
					 
			 </view>
			<view class="flex-column-center  mx40" style=" margin-top: -70rpx;letter-spacing: 2px;"> 
			   <view class="mt20 fz26" style="padding:20rpx 20rpx;width:calc(100% - 10px);background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff); border-radius: 16rpx;">
				   <view class="ml20 fw600">每日签到</view> 
			 
				   <view class="mt40 mx20 fz22 flex-between-center " style="line-height: 45rpx;letter-spacing: 0px; ">
					   <view  class="flex-column-center ">						   
						   <view v-if="sel>=0" class="flex-column-center-center" style=" background-image:  url('/static/null/qiandaobtn1.png');
						   		  background-repeat: no-repeat; 
						   		  background-size:cover;
						   		background-size: 100% 100%;
						   		width:130rpx;
						   		height:130rpx				
						   		">  
								<image src="/static/null/qiandao3.png"	style="width: 90rpx;margin-top: 15rpx;" mode="widthFix" />
								<view style="margin-top: -25rpx;color: #fff;font-size: 18rpx;">已签</view>
						   </view>
						   <view v-else class="flex-column-center-center" style=" background-image:  url('/static/null/qiandaobtn2.png');
									  background-repeat: no-repeat; 
									  background-size:cover;
									background-size: 100% 100%;
									width:130rpx;
									height:130rpx				
									">  
									<image src="/static/null/qiandao3.png"	style="width: 90rpx;margin-top: 15rpx;" mode="widthFix" />
									<view  style="margin-top: -25rpx;color: #fff; font-size: 18rpx;">+{{user.vipGradeInfo.signInReward}}USDT</view>
							</view>
						   
						   <view class="fw600">第一天</view>
					   </view>
					   <view class="flex-column-center">
					   						   <view v-if="sel>=1" class="flex-column-center-center" style=" background-image:  url('/static/null/qiandaobtn1.png');
					   						   						   		  background-repeat: no-repeat; 
					   						   						   		  background-size:cover;
					   						   						   		background-size: 100% 100%;
					   						   						   		width:130rpx;
					   						   						   		height:130rpx				
					   						   						   		">  
					   						   								<image src="/static/null/qiandao3.png"	style="width: 90rpx;margin-top: 15rpx;" mode="widthFix" />
					   						   								<view style="margin-top: -25rpx;color: #fff;font-size: 18rpx;">已签</view>
					   						   						   </view>
											   <view v-else class="flex-column-center-center" style=" background-image:  url('/static/null/qiandaobtn2.png');
														  background-repeat: no-repeat; 
														  background-size:cover;
														background-size: 100% 100%;
														width:130rpx;
														height:130rpx				
														">  
														<image src="/static/null/qiandao3.png"	style="width: 90rpx;margin-top: 15rpx;" mode="widthFix" />
														<view style="margin-top: -25rpx;color: #fff; font-size: 18rpx;">+{{user.vipGradeInfo.signInReward}}USDT</view>
												</view>
					   						   
					   						   <view class="fw600">第二天</view>
					   </view>
					   <view class="flex-column-center ">						   
					   						   <view v-if="sel>=2" class="flex-column-center-center" style=" background-image:  url('/static/null/qiandaobtn1.png');
					   						   					   						   						   		  background-repeat: no-repeat; 
					   						   					   						   						   		  background-size:cover;
					   						   					   						   						   		background-size: 100% 100%;
					   						   					   						   						   		width:130rpx;
					   						   					   						   						   		height:130rpx				
					   						   					   						   						   		">  
					   						   					   						   								<image src="/static/null/qiandao3.png"	style="width: 90rpx;margin-top: 15rpx;" mode="widthFix" />
					   						   					   						   								<view style="margin-top: -25rpx;color: #fff;font-size: 18rpx;">已签</view>
					   						   					   						   						   </view>
												   <view v-else class="flex-column-center-center" style=" background-image:  url('/static/null/qiandaobtn2.png');
															  background-repeat: no-repeat; 
															  background-size:cover;
															background-size: 100% 100%;
															width:130rpx;
															height:130rpx				
															">  
															<image src="/static/null/qiandao3.png"	style="width: 90rpx;margin-top: 15rpx;" mode="widthFix" />
															<view style="margin-top: -25rpx;color: #fff; font-size: 18rpx;">+{{user.vipGradeInfo.signInReward}}USDT</view>
													</view>
					   						   
					   						   <view class="fw600">第三天</view>
					   					   </view>
					   <view class="flex-column-center">						   
					   						   <view v-if="sel>=3" class="flex-column-center-center" style=" background-image:  url('/static/null/qiandaobtn1.png');
					   						   					   						   						   		  background-repeat: no-repeat; 
					   						   					   						   						   		  background-size:cover;
					   						   					   						   						   		background-size: 100% 100%;
					   						   					   						   						   		width:130rpx;
					   						   					   						   						   		height:130rpx				
					   						   					   						   						   		">  
					   						   					   						   								<image src="/static/null/qiandao3.png"	style="width: 90rpx;margin-top: 15rpx;" mode="widthFix" />
					   						   					   						   								<view style="margin-top: -25rpx;color: #fff;font-size: 18rpx;">已签</view>
					   						   					   						   						   </view>
					   						   											   <view v-else class="flex-column-center-center" style=" background-image:  url('/static/null/qiandaobtn2.png');
					   						   														  background-repeat: no-repeat; 
					   						   														  background-size:cover;
					   						   														background-size: 100% 100%;
					   						   														width:130rpx;
					   						   														height:130rpx				
					   						   														">  
					   						   														<image src="/static/null/qiandao3.png"	style="width: 90rpx;margin-top: 15rpx;" mode="widthFix" />
					   						   														<view style="margin-top: -25rpx;color: #fff; font-size: 18rpx;">+{{user.vipGradeInfo.signInReward}}USDT</view>
					   						   												</view>
					   						   
					   						   <view class="fw600">第四天</view>
					   					   </view>
					   
				   </view>
				   <view class="mx20 fz22 flex-start-center" style="margin-top: 18rpx;line-height: 45rpx;letter-spacing: 1px; ">
				   					   <view class="flex-column-center">
				   						   <view v-if="sel>=4" class="flex-column-center-center" style=" background-image:  url('/static/null/qiandaobtn1.png');
														  background-repeat: no-repeat; 
														  background-size:cover;
														background-size: 100% 100%;
														width:130rpx;
														height:130rpx				
														">  
														<image src="/static/null/qiandao3.png"	style="width: 90rpx;margin-top: 15rpx;" mode="widthFix" />
														<view style="margin-top: -25rpx;color: #fff;font-size: 18rpx;">已签</view>
												   </view>
													   <view v-else class="flex-column-center-center" style=" background-image:  url('/static/null/qiandaobtn2.png');
																  background-repeat: no-repeat; 
																  background-size:cover;
																background-size: 100% 100%;
																width:130rpx;
																height:130rpx				
																">  
																<image src="/static/null/qiandao3.png"	style="width: 90rpx;margin-top: 15rpx;" mode="widthFix" />
																<view style="margin-top: -25rpx;color: #fff; font-size: 18rpx;">+{{user.vipGradeInfo.signInReward}}USDT</view>
														</view>
				   						   <view class="fw600">第五天</view>
				   					   </view>
				   					   <view class="flex-column-center" style="margin-left: 35rpx;">
												   <view v-if="sel>=5" class="flex-column-center-center" style=" background-image:  url('/static/null/qiandaobtn1.png');
												   					   						   						   		  background-repeat: no-repeat; 
												   					   						   						   		  background-size:cover;
												   					   						   						   		background-size: 100% 100%;
												   					   						   						   		width:130rpx;
												   					   						   						   		height:130rpx				
												   					   						   						   		">  
												   					   						   								<image src="/static/null/qiandao3.png"	style="width: 90rpx;margin-top: 15rpx;" mode="widthFix" />
												   					   						   								<view style="margin-top: -25rpx;color: #fff;font-size: 18rpx;">已签</view>
												   					   						   						   </view>
												   											   <view v-else class="flex-column-center-center" style=" background-image:  url('/static/null/qiandaobtn2.png');
												   														  background-repeat: no-repeat; 
												   														  background-size:cover;
												   														background-size: 100% 100%;
												   														width:130rpx;
												   														height:130rpx				
												   														">  
												   														<image src="/static/null/qiandao3.png"	style="width: 90rpx;margin-top: 15rpx;" mode="widthFix" />
												   														<view style="margin-top: -25rpx;color: #fff; font-size: 18rpx;">+{{user.vipGradeInfo.signInReward}}USDT</view>
												   												</view>
												   <view class="fw600">第六天</view>
				   					   </view>
				   					  
				   					   <view class="flex-column-center" style="margin-left: 35rpx;">
				   					   												   <view v-if="sel>=6" class="flex-column-center-center" style=" background-image:  url('/static/null/qiandaobtn1.png');
				   					   												   					   						   						   		  background-repeat: no-repeat; 
				   					   												   					   						   						   		  background-size:cover;
				   					   												   					   						   						   		background-size: 100% 100%;
				   					   												   					   						   						   		width:130rpx;
				   					   												   					   						   						   		height:130rpx				
				   					   												   					   						   						   		">  
				   					   												   					   						   								<image src="/static/null/qiandao3.png"	style="width: 90rpx;margin-top: 15rpx;" mode="widthFix" />
				   					   												   					   						   								<view style="margin-top: -25rpx;color: #fff;font-size: 18rpx;">已签</view>
				   					   												   					   						   						   </view>
				   					   												   											   <view   v-else class="flex-column-center-center" style=" background-image:  url('/static/null/qiandaobtn2.png');
				   					   												   														  background-repeat: no-repeat; 
				   					   												   														  background-size:cover;
				   					   												   														background-size: 100% 100%;
				   					   												   														width:130rpx;
				   					   												   														height:130rpx				
				   					   												   														">  
				   					   												   														<image src="/static/null/qiandao3.png"	style="width: 90rpx;margin-top: 15rpx;" mode="widthFix" />
				   					   												   														<view style="margin-top: -25rpx;color: #fff; font-size: 18rpx;">+8USDT</view>
				   					   												   												</view>
				   					   												   <view class="fw600">第七天</view>
				   					   </view>
				   					   
				   					   
				   </view>
				   <view class="flex-center-center" style="">
				 
					   <view @click.stop="$noMultipleClicks(submit,'')" style="color: #fff;padding: 25rpx 220rpx;border-radius: 10rpx;background-color: #dd322a;" class=" fz28 text-align-c mt20">{{signIn?'已签到':'立即签到'}}</view> 
				   </view>
				   <view class="px20 mt30 fz22" style="color: #626262; letter-spacing: 1px;">签到规则，每日签到可领取0.5U，连续签到7天，可领取8U，中途断签则作废，需等下星期重新计算。</view>
			   </view>
			  
			</view>
		<view class="flex-column-center  mx40" style="margin-top: 20rpx; letter-spacing: 2px;"> 
		        
			 	<view class="mt20" style="padding:20rpx 20rpx;width:calc(100% - 10px);background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff); border-radius: 16rpx;">
					 
					 
				 <view class="fz26 fw600 ml10">签到明细</view>
					 
					 
					 
					 
					 <view v-for="(item,index) in recorderlist" class="flex-between-center py10" style="
			 font-size: 24rpx; font-weight: bold;margin-left: 10rpx;margin-top: 10rpx;">
						<view>
						 
							<view>{{item.title}}</view>
							<view>{{item.createTime|dateFormat}}</view>
						</view>
						
						<view class="flex-center-center"> 
							<text style="color: #aa0f1c;margin-top: -8rpx;font-size: 26rpx;">+{{item.signInReward}}</text> <image src="/static/null/qiandao3.png"	style="width: 60rpx;" mode="widthFix" /> 
						</view>
					 		 <!-- #c69e1a -->
					 		 <!-- #e51526 -->
					 		 <!-- #32bc84 -->
					 		 
					 	 
					 	
					 	 
					 	
					 </view>
					 
				</view>
				
				
			   
		</view>
		
		<uni-popup ref="popup">
						   <view class="lh80  fw600 "
										style="width: 90vw; margin: 0 5vw; border-radius: 20rpx;padding:100rpx 0;background-color: #fff;position: relative;border:4rpx solid #da3e2f;">
										 
										 
										<view class="flex-column-center-center ">
											<view class="fz40 text-align-c" style="width: 600rpx;">请输入交易密码:</view>
											<view class="ml20 mt60">
												<!-- <u-code-input v-model="outData.payPassword" :maxlength="6" :space="0" size="44"></u-code-input> -->
											</view>
											<!-- <input type="number" maxlength="6" v-model="payPassword"
												style="border-bottom: 1px solid #ccc;width: 200rpx;" /> -->
										</view>
										<view class="flex-center-center px40 mt80">
											<view @click="close" class=" fz32 text-align-c " style="flex:1;background-color: #ffffff;
									border-radius: 40rpx;border: 1rpx solid #c5c5c5;color:#df332a;">取消</view>
											<view  @click.stop="$noMultipleClicks(submit,'')"  class=" fz32 ml30 text-align-c color-fff" style="flex:1;background-color: #df332a;
											border-radius: 40rpx;border: 1rpx solid #c5c5c5;">确认</view>
										</view>
										 
									</view>
						  
		 </uni-popup>	
		
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
				kong:'&ensp;',
				list: [{}],
				allDay: [],
				user: {
					 vipGradeInfo:0
				},
				sign: {},
				sel: null,
				num: 10,
				noClick: true,
				showup: 2,
				trueName: '',
				idCard: '',
				maxDay: 0,
				year: 0,
				month: 0,
				day: 0,
				week: '',
				nowDay: '',
				selectDay: '',
				everyDay: [],
				weekDates: [],
				signIn: false,
				signMonth: [],
				signInReward: '',
				today: '',
				recorderlist:[]
				
			};
		},
		onLoad() {
			var date = new Date(); 
						var year = date.getFullYear();
						var month = ("0" + (date.getMonth() + 1)).slice(-2);
						var sdate = ("0" + date.getDate()).slice(-2);
						this.today = year + "/" + month + "/" + sdate
						this.today=this.today.toString()
					 
			 this.getList()
			this.getUser()
			this.getRecorderList();
		},
		onUnload(){
			
		},
		 
		methods: {
		 
			 
			toPage(path) {
							uni.navigateTo({
								url: '/pages' + path
							})
						},
						signInStatistics(data) {
							let list = data
							this.$request.get({
								url: "/app/userCheckInStats/signInStatistics",
								success: rsp => {
									this.sign = rsp.data
									if (this.sign.continuousDays < 10) {
										this.num = this.sign.continuousDays
									} else if (this.sign.continuousDays >= 10) {
										this.num = this.sign.continuousDays % 10
									}
									this.list = []
									if (this.sign.continuousDays < 7) {
										this.sel = this.sign.continuousDays - 1
										for (let i = 0; i < 7; i++) {
											if (i < this.sign.continuousDays) {
												this.list.push({
													title: '已签'
												})
											} else if (i >= this.sign.continuousDays) {
												this.list.push({
													title: i + 1 + '天'
												})
											}
										}
										console.log(this.list);
									} else if (this.sign.continuousDays >= 7) {
										this.sel = 6
										for (let i = 0; i < 6; i++) {
											this.list.push({
												title: '已签'
											})
										}
										this.list.push({
											title: this.sign.continuousDays + 1 + '天'
										})
									}
								}
							})
						},
						getUser() {
							this.$request.get({
								url: "/app/dreamUserInfo/getUser",
								success: rsp => {
									this.user = rsp.data
									console.log(this.user);
							
								}
							})
						},
						rightClick() {
							uni.navigateTo({
								url: '/pages/me/qd-detail'
							})
						},
						getList() {
							this.$request.get({
								url: "/app/userCheckInStats/signInList",
								success: rsp => {
									if (rsp.code == 200) {
										if(rsp.data[0]){
											if (this.today == rsp.data[0].dateStr) {
												this.signIn = true
											}
										}
										// this.list = rsp.data
										this.signInStatistics(rsp.data)
									} else {
										uni.showToast({
											title: rsp.message,
											icon: 'none'
										})
									}
								}
							})
						},
						getRecorderList() {
							this.$request.get({
								url: "/app/userCheckInStats/signInList",
								success: rsp => {
									this.recorderlist = rsp.data
									for (var i = 0; i < this.recorderlist.length; i++) {
										this.recorderlist[i].title = '已签到'
										this.recorderlist[i].desc = this.recorderlist[i].dateStr
									}
									
									console.log("============");
									console.log(this.recorderlist);
								}
							})
						},
						toBack() {
							uni.navigateBack()
						},
						submit() {
							// if (this.signIn) {
							// 	uni.showToast({
							// 		title: '已经签到过了',
							// 		icon: 'none'
							// 	})
							// 	return
							// }
							
							
							this.$request.get({
								url: "/app/userCheckInStats/signIn",
								success: rsp => {
									if (rsp.code == 200) {
										// this.$refs.popup.open()
										this.getList()
										this.getUser()
										this.signInStatistics()
										this.getRecorderList();
										
										 uni.showToast({
												title: '签到成功',
												icon: 'none'
										 	})
			
									} else {
										uni.showToast({
											title: rsp.message,
											icon: 'none'
										})
									}
								}
							})
						},
						close() {
							this.$refs.popup.close()
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