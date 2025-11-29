<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'活期宝'"    @back="toBack()">
	     	    		 		 	
	     </narBarAndTop>
		<!-- <view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view> -->
		<view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view>
		<!-- <view style="height: 100rpx;width: 100%;background-color: #fb4034;" class=""></view> -->
		
		
	
			<view style=" background-image:  url('/static/null/fundindextop.png'); 
					  background-repeat: no-repeat; 
					  background-size:cover;
					background-size: 100% 100%;
					width:100vw;
					height:200rpx				
					">  
					 
					
			 </view>
			 
		<view class="flex-column-center  mx40" style="margin-top: -90rpx; "> 
		        
			 	<view class="mt20" style="width: 100%;background-color: #ffffff; border-radius: 16rpx;">
					
					<view class="flex-column-center" style=" background-image:  url('/static/null/huoqibao1.png');
							  background-repeat: no-repeat; 
							  background-size:cover;
							background-size: 100% 100%;
							width: 100%; 	
										 
							">  
							<view class="flex-center-center " style="line-height: 45rpx; width: 90%;margin: 30rpx;padding-bottom: 20rpx;border-bottom: 1rpx solid #f6f6f6;">
								<view class="flex-center-center">
									<view class="flex-column-center" style="margin-left: 160rpx" >
										<view class="fz28 fw600">活期宝余额(USDT)</view>
										<view class="text-align-c px30 fw600 fz38" style="">{{list.theTotalAmount}}</view>
									</view>
									
									<view @click="openZR" class=" fz2 fw400 pl20 text-align-c" style="margin: 40rpx 0 0 10rpx;width: 100rpx;background-color: #bf1e11;color: #ffffff;border-radius: 30rpx;">
										买入
									</view>
								</view> 
								
							</view>
							 <view class="flex-around-center" style="padding-bottom:20rpx;width: 80%;line-height: 40rpx; ">
								 <!-- <view class="text-align-c " style="flex:1;border-right: 1rpx solid #f6f6f6;">
									 <view>待领本息</view>
									 <view style="color: #964935;">{{list.recentEarnings}}</view>
								 </view> -->
							 	<view class="text-align-c " style="flex:1;border-right: 1rpx solid #f6f6f6;">
							 										 <view>万份收益</view>
							 										 <view style="color: #964935;">1500</view>
							 	 </view>
							 	 <view class="text-align-c  " style="flex:1;border-right: 1rpx solid #f6f6f6;">
							 	 									 <view>日利率</view>
							 	 									 <view style="color: #964935;">0.15%</view>
							 	  </view>
								   <view class="text-align-c  " style="flex:1; ">
								  									 <view>累计收益</view>
								  									 <view style="color: #964935;">{{list.cumulativeEarnings}}</view>
								   </view>
							 </view>
							
					 </view>
					 
					<view   class=" pd30 fz28 mt20 fw600 flex-start-center" >
						<view @click="swtichyuebao(1)">
							<view v-if="sel==1" style="border-bottom: 2rpx solid #000000;padding: 10rpx 0;">我的订单</view>
							<view v-else style="border-bottom: 2rpx solid #00000000;padding: 10rpx 0;">我的订单</view> 
						</view>
						  
						<view @click="swtichyuebao(3)">
							<view v-if="sel==3" class="ml50" style="border-bottom: 2rpx solid #000000;padding: 10rpx 0;">收益明细</view>
							<view v-else class="ml50" style="border-bottom: 2rpx solid #00000000;padding: 10rpx 0;">收益明细</view>
						</view>
						
						
					</view>
					 
					<scroll-view class="" scroll-y="true" @scrolltolower="reachBottom" :style="{'height':windowHeight+'px'}">
					<view  v-for="(item,index) in xjblist"  class="flex-center-center  fz24 fw400 " style="width:calc(100% - 20px);;margin-left: 20rpx;;line-height: 45rpx; padding: 20rpx 0;border-bottom: 1rpx solid #c5c5c5;">
					 
							 
					<view class="  text-align-l ml50" style="flex:4;color:#000000;line-height: 40rpx;">
						<view class="fw600 fz20">订单编号{{item.flexibleCode}}</view>
						<view class="fz22" style="color: #aeaeae;">{{item.createTime|dateFormat}}</view>
					</view>
				 
					<!-- #ea564d -->
					<!-- #32bf68 -->
					<view class="flex-column-center-center"  style="width: 220rpx;">
						<view  class=" fw600 mr30 fz22" style="color: #ea564d;">{{item.amount}} USDT</view>
						<view  class="fz20"  style=" width:110rpx;">
						 
							<text v-if="item.type==1" @click="openZC(item.id)"  style="background-color: #bf1e11;color: #ffffff;border-radius: 40rpx; padding: 3rpx 22rpx;">转出</text>
							<text v-else-if="item.type==2"    style="background-color: #b3b3b3;color: #ffffff;border-radius: 40rpx; padding: 3rpx 14rpx;">已转出</text>
							<text v-else-if="item.type==3"  style=" color: #000000;border-radius: 40rpx;font-size: 22rpx; padding: 3rpx 22rpx;">收益</text>
						</view>
					</view>
					
					  
					</view>
					</scroll-view>
					
				</view>
		</view>
		
	
		
		<view class="mt50"></view>
		<uni-popup ref="popZR">
			
			
								   <view class="fw500 "
												style="width: 80vw; margin: 0 5vw; border-radius: 16rpx;padding:50rpx 0;background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff);position: relative;border:4rpx solid #da3e2f;">
												 
												 
												<view class="flex-column-center-center mt20">													
													<view class="flex-start-center fz26" style="width: 80%;">
														<view>转入金额:</view>
														<view class="ml20">
															<input type="number" maxlength="6" v-model="money"
																style="border-bottom: 1px solid #ccc;width: 200rpx;" />
														</view>												
								
													</view>
													
													<view class="flex-start-center mt30 fz26" style="width: 80%;">
														<view>交易密码:</view>
														<view class="ml20">
															<u-code-input v-model="payPassword" :maxlength="6" :space="1" size="25"></u-code-input>
														</view>												
																					
													</view>
												
								
									 
									<!-- <input type="number" maxlength="6" v-model="payPassword"
										style="border-bottom: 1px solid #ccc;width: 200rpx;" /> -->
								</view>
				<view class="flex-center-center px40 mt60">
					<view  @click="close"  style="margin-right: 20rpx;padding: 7rpx 40rpx;background-color: #e9e9e9;
														border-radius: 40rpx;color:#df332a;">取消</view>
					<view @click.stop="$noMultipleClicks(zr,'')"  style="margin-left: 30rpx;padding: 7rpx 40rpx;background-color: #df332a;
														border-radius: 40rpx;color:#fff;">确定</view>
				</view>
								 
							</view>
				  
				  
				  
				  
				  
				  
				  
				  
			</uni-popup>
			
			<uni-popup ref="popZC">
				
				
									   <view class="fw500 "
													style="width: 80vw; margin: 0 5vw; border-radius: 16rpx;padding:50rpx 0;background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff);position: relative;border:4rpx solid #da3e2f;">
													 
													 
													<view class="flex-column-center-center mt20">													
														 
														
														<view class="flex-start-center mt30 fz26" style="width: 80%;">
															<view>交易密码:</view>
															<view class="ml20">
																<u-code-input v-model="payPassword" :maxlength="6" :space="1" size="25"></u-code-input>
															</view>												
																						
														</view>
													
									
										 
										<!-- <input type="number" maxlength="6" v-model="payPassword"
											style="border-bottom: 1px solid #ccc;width: 200rpx;" /> -->
									</view>
					<view class="flex-center-center px40 mt60">
						<view  @click="closeZC()"  style="margin-right: 20rpx;padding: 7rpx 40rpx;background-color: #e9e9e9;
															border-radius: 40rpx;color:#df332a;">取消</view>
						<view @click.stop="$noMultipleClicks(zcsubmit,'')"  style="margin-left: 30rpx;padding: 7rpx 40rpx;background-color: #df332a;
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 290,
				noClick: true,
				 
				list:[
				  {name:"ada500",price:"6885.25",growrate:"-0.55"},
				 {name:"ada500",price:"6885.25",growrate:"-0.55"},
				 {name:"ada500",price:"6885.25",growrate:"-0.55"}
					
				],
				sel:1,
				noClick: true,
				money: 0,
				payPassword: '',
				user:{},
				xjblist: [],
				range: ['', ''],
				pageNum: 1,
				pageSize: 15,
				zcid:'',
			};
		},
		onShow() {
					 
				},
				onLoad(opt) {
					this.reset();
				},
				methods: {
					swtichyuebao(index){
							this.sel=index
								this.xjblist = [];
								this.pageNum=1;
							this.getXJBList();
					},
					reachBottom() {
						//判断 如果页码*页容量大于等于总条数，提示该页数据加载完毕
						if (this.page * this.size >= this.total) {
							// uni.showToast({
							// 	title: '已加载全部',
							// 	icon: 'none'
							// })
							return
						}
						//并且让页码+1,调用获取数据的方法获取第二页数据
						this.pageNum++
						//此处调用自己获取数据列表的方法
						this.getXJBList()
					},
					zcsubmit() {
									 console.log('转出');
									 this.closeZC()
								 console.log(this.zcid);
								 
									this.$request.get({
										url: '/app/cashTreasureTradeRecordingInfo/getRollOut',
										data: {
											 payPassword: this.payPassword,
											 id: this.zcid
										},
										success: rsp => {
											uni.showToast({
												title: rsp.message,
												icon: 'none'
											})
											if (rsp.code == 200) {
												this.reset()
												// this.closezujian()
												// this.pageNum = 1
												// this.list = []
												// this.getList()
											}
										}
									})
								},
					reset()
					{
						this.xjblist =[]
						this.pageNum=1;
						console.log('reset');
						this.myCashTreasure();
						// this.getUser()
						this.getXJBList()
					},
					getXJBList() {
						console.log('=================');
						
						this.$request.get({
							url: "/app/cashTreasureTradeRecordingInfo/list",
							data: {
								pageNum: this.pageNum,
								pageSize: this.pageSize,
								type:this.sel,
								startTime: new Date(this.range[0] + ' 00:00:00').getTime() || '',
								endTime: new Date(this.range[1] + ' 23:59:59').getTime() || ''
							},
							success: rsp => {
								if (this.pageNum != 1) {
									this.xjblist = this.xjblist.concat(rsp.records)
								} else {
									this.xjblist = rsp.records
								}
								console.log('现金宝列表',this.xjblist);
								//将获取的总条数赋值
								this.total = rsp.total
								if (this.pageNum * this.pageSize >= this.total && this.total > this.pageSize) {
									uni.showToast({
										title: '已加载全部',
										icon: 'none'
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
							}
						})
					},
					 
					myCashTreasure() {
						this.$request.get({
							url: "/app/userCashTreasureInfo/myCashTreasure",
							success: rsp => {
								this.list = rsp.data
								console.log(this.list);
							},
						})
					},
					toPage(path) {
						uni.navigateTo({
							url: '/pages/' + path
						})
					},
					del(index) {
						uni.navigateTo({
							url: '/pages/me/xjb/xjbmx?index=' + index
						})
					},
					open() {
						this.$refs.popLine.open('center')
					},
					close() {
						
						//this.$refs.popLine.close()
						this.$refs.popZR.close()
						//this.$refs.popZC.close()
					},
					closeZC() {
						
						//this.$refs.popLine.close()
						this.$refs.popZC.close()
						//this.$refs.popZC.close()
					},
					openZR() {
						this.money = ''
						this.payPassword = ''
						this.$refs.popZR.open('center')
					},
					openZC(index) {
						this.zcid=index;
						console.log(index);
						this.payPassword = ''
						this.$refs.popZC.open('center')
					},
					zc() {
						
						console.log(this.list.theTotalAmount);
						return;
						this.$request.get({
							url: "/app/userCashTreasureInfo/getRollOut",
							data: {
								payPassword: this.payPassword,
								tradeValue: this.list.theTotalAmount
							},
							success: rsp => {
								uni.showToast({
									title: rsp.message,
									icon: 'none'
								})
								
								this.close()
							},
						})
					},
					zr() {
						if(this.money=='')
						{
							 uni.showToast({
							 	title: "请输入买入金额",
							 	icon: 'none'
							 })
							 return;
						}
						
						if(this.payPassword=='')
						{
							 uni.showToast({
							 	title: "请输入交易密码",
							 	icon: 'none'
							 })
							 return;
						}
						if(this.money<1)
						{
							 uni.showToast({
							 	title: "买入金额最低1",
							 	icon: 'none'
							 })
							 return;
						}
						this.$request.get({
							url: "/app/userCashTreasureInfo/getInto",
							data: {
								payPassword: this.payPassword,
								tradeValue: this.money
							},
							success: rsp => {
								uni.showToast({
									title: rsp.message,
									icon: 'none'
								})
								console.log('成功了');
								this.reset();
								this.$forceUpdate()
								setTimeout(()=>{
									
									
								},500)
								
								this.close()
							},
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