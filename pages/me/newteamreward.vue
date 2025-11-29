<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'团队奖励'"    @back="toBack()">
	     	    		 		 	
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
		<view class="flex-column-center  mx40" style="margin-top: -70rpx; letter-spacing: 2px;"> 
		        
			 	<view class="mt20" style="padding:20rpx 20rpx;width:calc(100% - 10px);background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff); border-radius: 16rpx;">
					 
					 
				 
					
					<view   class="flex-start-center  fz30 fw400  " style="padding:20rpx 0;;border-bottom: 1rpx solid #c5c5c5;">
					 <view class="flex-center-center" style="width: 160rpx;">
						 <image  :src="user.handlUrl"
						 style="width: 140rpx;height: 140rpx;margin-right: 0rpx;border-radius: 50%;" mode="aspectFill" />
					 </view>
					 
					 <view class="fz26 ml20" style="letter-spacing: 1px;line-height: 40rpx;">
						 <view class="fz28 fw600">团队奖励</view>
						 <view class="fz24 fw400" style="">团队人数:{{listTop.marketNumber}}人 </view>
						 <view class="fz24 fw400" style=""> 团队投资总额:{{listTop.marketInvestment}}</view>
					 </view>
					  
					</view>
					
					 
					 
					 
					 
				</view>
				<!-- v-if="index<list.length-1" -->
				<view @click="getAward(item)" v-for="(item,index) in list"  class="mt20 fw500" style="padding:20rpx 20rpx;width:calc(100% - 10px);background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff); border-radius: 10rpx;">
				  <view class="flex-between-center">
					  <view class="flex-center-center">
						  <image v-for="i in (index+1)" src="/static/start1.png"  style="margin-right: 5rpx;width: 30rpx;" mode="widthFix" /> 
						  
						  
						  <text class="ml20" style="color: #ef392b;">{{index|tostart}}星团队</text>
						  
						  </view>  
					  <view v-if="item.state==1"   class="fz22" style="background: linear-gradient(to bottom, #ef392b,  #e8362a, #d63226);padding: 5rpx 30rpx;background-color: #ef392b;border-radius: 40rpx;color: #fff;">已达成</view>
					   <view v-else-if="item.state==2"   class="fz22" style="background: linear-gradient(to bottom, #949494,  #949494, #949494);padding: 5rpx 30rpx;background-color: #949494;border-radius: 40rpx;color: #fff;">已领取</view>
					   <view v-else-if="item.state==3"   class="fz22" style="background: linear-gradient(to bottom, #bf9d4c,  #bf9d4c, #bf9d4c);padding: 5rpx 30rpx;background-color: #bf9d4c;border-radius: 40rpx;color: #fff;">未达成</view>
				  </view>
				  <view class="flex-around-center mt20 fz22" style="line-height: 40rpx;">
				  					  <view class="flex-column-center">
				  						 <view>团队人数</view>
										 <view>{{item.marketNumber}}</view>
				  					  </view>
									  <view class="flex-column-center">
																 <view>团队投资总额</view>
																 <view><text style="color: #e8362a;">{{item.marketInvestment}}</text>USDT</view>
															  </view>
									<view class="flex-column-center">
																 <view>队长投资额</view>
																 <view ><text style="color: #e8362a;">{{item.individualInvestment}}</text>USDT</view>
															  </view>
									<view class="flex-column-center">
																 <view>奖励金额</view>
																 <view><text style="color: #e8362a;">{{item.marketRequite}}</text>USDT</view>
															  </view>
				  </view>
				  
				 
				  
					<!-- <view  class="flex-start-center fz18 mt20 fw600 py10">
											<view class=" text-align-c" style="width:120rpx">团队星级</view>
											<view class=" text-align-c" style="width:96rpx">团队人数</view>
											<view class=" text-align-c" style="width:120rpx">团队</br>投资总额</view>
											<view class=" text-align-c" style="width:120rpx">队长</br>投资总额</view>
											<view class=" text-align-c" style="width:120rpx">奖励金额</view>
											<view class=" text-align-c" style="width:60rpx">状态</view>
										 </view> -->
				</view>
				
			   
		</view>
		
	
		
		<view class="mt50"></view>
	</view>
	 
</template>

<script>
	import narBarAndTop from 'pages/public/narBarAndTop.vue' 
	export default {
		filters: {
				    tostart(value) {
					  const zi=['一','二','三','四','五','六','七','八','九','十',]
				      return zi[value]; // 或 parseInt(value) / Math.round(value)
				    }
				  },
		components: {
			narBarAndTop, 
		},
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 90,
				noClick: true,
				kong:'&ensp;',
				piclist: [
					 
				],
				 
				loginInfo:{},
				pageNum: 1,
				pageSize: 10,
				total: 0,
				myLevel:0,
				list:[
				  
					
				],
				userMarketAssetlist:'',
				listTop:{},
				user:{},
				rate:'0%',
				marketGradeLevel:5,
				levels:[],
				canget:true,
			};
		},
		onLoad() {
			
			 // this.getUserMarketAssetList();
			 // this.getMyMarketAssetLevel();
			 
			 this.reset();
		},
		onUnload(){
			//uni.$off("lang");
		},
		onShow() {
			this.pageNum = 1
			//this.getList()
		},
		methods: {
			reset(){
				this.getUser()
				 this.getList()
				 this.getListTop();
			},
			 
			getUser() {
				this.$request.get({
					url: "/app/dreamUserInfo/getUser",
					success: rsp => {
						this.user = rsp.data
						console.log(this.user);
						
					// 	this.vip_nexexperience=this.user.nextvipGradeInfo.vipExperience;
						
					// 	this.vip_remainnexexperience=this.user.nextvipGradeInfo.vipExperience-this.user.investmentAmount;
					
					// 	this.vip_progress=1-(this.vip_remainnexexperience/this.user.nextvipGradeInfo.vipExperience);
					// 	this.myLevel=this.user.vipGradeInfo.id;
					
					// if(this.myLevel>=1)
					//   this.rate=this.zilist[this.myLevel-1].rate						 
					// 
					}
				})
			},
			getListTop() {
				this.$request.get({
					url: "/app/marketAssetManageInfo/getUserMarket",
					success: rsp => {
						this.listTop = rsp.data
						//console.log('===',this.listTop);
						this.marketGradeLevel=Number(this.listTop.marketAssetManageInfo.marketGrade)
						
						// this.marketGradeLevel=5
						console.log('===我是几级',this.marketGradeLevel);

					  
					}
				 })
			 },	
			 
			getList() {
				this.$request.get({
					url: "/app/user-market-asset-info/stateList",
					success: rsp => {
						this.list = rsp.data
						// this.list.pop();
						//  console.log("this.list",this.list);
						// this.levels=[]
						// for (var i = 0; i < this.list.length; i++) {
						// 	this.list[i].state=0;
						// 	 this.levels[i]=0;
							 
						// }
					 
						 
						// this.getListTop()
					 
					}
				})
			},
			// getMyMarketAssetLevel() {
			// 	this.$request.get({
			// 		url: "/app/user-market-asset-info/getUserMarketLevel",
			// 		success: rsp => {
					 
			// 			console.log('我是几级',rsp.data);
			// 		}
			// 	})
			// },
			getUserMarketAssetList() {
				var that=this;
				this.$request.get({
					url: "/app/user-market-asset-info/getList",
					success: rsp => {
						that.userMarketAssetlist = rsp.data
						
						console.log("***********",rsp.data);
						that.check();
					}
				})
			},
			getAward(item) {
				
				 
				if(item.state==3)
				{
					uni.showToast({
						title: "未达到奖励",
						icon: 'none', 
					});
					return;
				}
				if(item.state==2)
				{
					uni.showToast({
						title: "已领取",
						icon: 'none', 
					});
					return;
				}
				
				
				if(item.state!=1)
				{
					 return;
				}
			 
			 
			 
				this.canget=false;
				this.$request.get({
					url: "/app/user-market-asset-info/getaward",
					data: {
						id:item.id,
					},
					success: rsp => { 
						console.log('===',rsp);
						if(rsp.code=="200")
						{
							this.canget=true;
							 uni.showToast({
								title: "领取成功",
								icon: 'none', 
							 });
							this.reset();
						}else{
							uni.showToast({
								title: rsp.message,
								icon: 'none', 
							});
						}
						
					},
					fail: err => {
						 this.canget=true;
					}
				})
			},
			check()
			{
				console.log("check");
				
				console.log(this.userMarketAssetlist);
				var index=0;
				console.log(this.zilist);
				for (var i = 0; i < this.list.length; i++) {
					 index++;
					 
					 var you=false;
					  for (var k = 0; k < this.userMarketAssetlist.length; k++) {
					  	 console.log(this.userMarketAssetlist[k].id);
						if(this.list[i].id==this.userMarketAssetlist[k].marketAssetId )
						{
							console.log('领取了',this.list[i].id);
							//领过了
							 you=true;
						}
					  } 
					  if(index<=this.marketGradeLevel && you==false)
					  {
						  //没领，可以领取
						  this.list[i].state=1;
						 
					  }
					  else if(index<=this.marketGradeLevel && you==true)
					  {
						  //领过了
						  this.list[i].state=2;
						 
					  }else{
						  //没有达成
						  this.list[i].state=3;
					 
					  }
					   
				 
				}
			 
				this.$forceUpdate()
				
			},
			toBack() {
				uni.navigateBack()
			},
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