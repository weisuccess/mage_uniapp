<template>
	
	<view class="content">
	     
		<!-- <view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view> -->
		<view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view>
		<!-- <view style="height: 100rpx;width: 100%;background-color: #fb4034;" class=""></view> -->
	
			<view style=" background-image:  url('/static/null/fundindextop.png'); 
					  background-repeat: no-repeat; 
					  background-size:cover;
					background-size: 100% 100%;
					width:100vw;
					height:340rpx				
					">  
				 
				
					<view class="flex-between-center px40" style="padding:80rpx 30rpx">
						<view class="flex-center-center" style="width: 120rpx;">							
							<image :src="user.handlUrl"	style="width: 100rpx;height: 100rpx;border-radius: 50%;" mode="aspectFill" /> 
						</view>
						 <view class="flex-between-center  ml10" style="width:98%">
							 <view class=" flex-start-center " style="margin-left:0rpx;">
								 <view class="fw400  color-fff fz30">{{user.nickName}}</view>
								 <view @click='totx("/pages/home/newpolicy")' class="flex-start-center ml20" style="background-color: #fbcbc8;padding: 4rpx 15rpx;border-radius: 60rpx;">
									  <image src="/static/null/my_dio.png"	style="width: 30rpx; " mode="widthFix" /> 
									 <text v-if="user.vipGradeInfo!=null" style=" margin-left: 10rpx;color: #000000; " class="fz24">VIP{{user.vipGradeInfo.id-1}}</text>
								  </view>
								   
							 </view>
							 <view style="margin-top:-40rpx; height: 234rpx; " class="" >
									 <view class=" flex-end-center ">
										 <image @click="kefu()" src="/static/null/my_kefu.png"	style="width: 50rpx;" mode="widthFix" /> 
										 <image @click="openSet()" src="/static/null/my_set.png"	style="width: 43rpx;margin-left: 40rpx;" mode="widthFix" /> 
									 </view>
								 <view class="mt20 flex-end-center fz22 mt100" style="border-radius: 60rpx;background-color: #ffffff;padding: 5rpx 15rpx;margin-right: -15rpx;">
									 <image src="/static/null/my_money.png"	style="width: 30rpx;" mode="widthFix" /> <text class="mx10 fw400" style="color: #f27b39;">积分 {{user.integral}}</text>
									 
								</view>
							 </view>
						 </view>
						 
					</view>
					
			 </view>
		<view class="flex-column-center  mx40" style="font-family: 'YaHei';margin-top: -80rpx; ">
			 <view  style="background-image:  url('/static/null/my_t2.png');
		   background-repeat: no-repeat; 
		   background-size:cover;
		 background-size: 100% 100%;
		 width:100%;	
			  
		 ">
				 <!-- <view class="flex-center-center" style="margin: 30rpx 50rpx 30rpx 50rpx;">				 
					  <view class="ml30 fz28 fw500">总资产(USDT)</view>
				 </view>
				 <view class="text-align-c fz50 " style="width: 100%;color: #000;">{{user.balance}}</view> -->
				  <view class="mt20 pd20" style="width:calc(100vw - 67px); ">
					   
					 
					 <view class="fz34 fw400 flex-start-center ml10" style="">
						 <image src="/static/null/my_bag.png"  style="width: 60rpx;" mode="widthFix" />
						<view class="ml20 fw600">总资产(<text style="letter-spacing: 0px;">USDT</text>)</view>
					 </view>  
					 
					 <view class=" flex-center-center mt10" style=" font-family: 'NotoSansHans-Bold';;color: #d5312b;font-size: 70rpx;">
						{{(investmentAmount+user.balance)|toFixed2}}
					 </view>
					    <view class="flex-between-center my20 fw600" style="line-height: 40rpx; width: 100%;"> 
							<view class=" flex-column-center ">
								<view class="fz24">账户余额(<text style="letter-spacing: 0px;">USDT</text>)</view>
								<view class="fz26" style="color: #d5312b;font-family: 'OPPOSans';">{{user.balance}}</view>
							</view>
							<view class=" flex-column-center ">
								<view class="fz24">待收本金(<text style="letter-spacing: 0px;">USDT</text>)</view>
								<view class="fz26" style="color: #d5312b;font-family: 'OPPOSans';">{{investmentAmount}}</view>
							</view>
							
							<view class=" flex-column-center ">
								 <!-- <view>{{user.investmentAmount}}</view> -->
								<view class="fz24">待收收益(<text style="letter-spacing: 0px;">USDT</text>)</view>								
								<view class="fz26" style="color: #d5312b;font-family: 'OPPOSans';">{{toBeCollectedAddinvestmentAmount}}</view>
							</view>
							
						</view>
					
					</view>
				  
				 
			 </view>
			 <view class="flex-between-center mt20" style="width: 100%;">
				 <view @click="totx('newchongzhi')" class="flex-start-center pl50 color-fff fw400 fz30 zoom-animation"  style="background-image:  url('/static/null/my11.png');
				   background-repeat: no-repeat; 
				   background-size:cover;
				 background-size: 100% 100%;
				 border-radius: 8rpx;
				 width:280rpx;height: 130rpx;
							
				 ">		充值 </view>
				 
				 
				<view @click="totx('newtixian')" class="flex-start-center pl50 color-fff fw400 fz30 zoom-animation" style="background-image:  url('/static/null/my22.png');
				  background-repeat: no-repeat; 
				  background-size:cover;
				   border-radius: 8rpx;
				background-size: 100% 100%;
				width:280rpx;	height: 130rpx;			  
				">	提现 	 </view> 
			 </view>
			 	<view class="mt20" style="width: 100%;background-color: #ffffff;border-radius: 8rpx;">
					<view @click="toPage(index,item.path)" v-for="(item,index) in menus" :class="['xhx', { 'last-item': index === menus.length - 1 }]"  class="flex-between-center mx30 " style="padding: 25rpx 0rpx;">
						<view class="flex-start-center">
							<image :src="item.pic"	style="width: 35rpx;" mode="widthFix" />
							<view class="ml20 fz28">{{item.name}}</view>
						</view>
						<view><uni-icons type="right" size="20"></uni-icons></view>
					</view>
					
				</view>
		</view>
		
	
		
		<view class=" " style="height: 100rpx;"></view>
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
				 
			 
				pageNum: 1,
				pageSize: 10,
				total: 0,
				myLevel:0,
				user: {},
				menus:[
					  {pic:"/static/null/my_a3.png",name:"更新签名",path:"/pages/me/mysignature"},
				  {pic:"/static/null/my_a1.png",name:"充值记录",path:"../me/newchongzhijilu"},
				 {pic:"/static/null/my_a2.png",name:"提现记录",path:"newtxjilu"},
				  {pic:"/static/null/my_a3.png",name:"安全保障",path:"/pages/home/newsafe"},
			   {pic:"/static/null/my_a4.png",name:"财务明细",path:"newsyjl"},
			   {pic:"/static/null/my_a7.png",name:"我的投资",path:"/pages/me/myinvest"},
				{pic:"/static/null/my_a5.png",name:"我的团队",path:"newmyteam"}, 
				 {pic:"/static/null/my_a6.png",name:"团队奖励",path:"newteamreward"},
				 {pic:"/static/null/my_a5.png",name:"实名认证",path:"newverified"},
				  {pic:"/static/null/my_a7.png",name:"积分商城",path:"../products/newindex"},
				
				   {pic:"/static/null/my_a8.png",name:"邀请好友",path:"newfriend"},
				    {pic:"/static/null/my_a7.png",name:"专属优惠",path:"/pages/home/zhushuyouhui"},
					
					{pic:"/static/null/my_a5.png",name:"常见问题",path:"/pages/home/zxxt/question"},
					 {pic:"/static/null/my_a5.png",name:"公司简介",path:"/pages/home/zxxt/company"},
					// {pic:"/static/null/my_a3.png",name:"VIP等级",path:"../home/newpolicy"} ,
					// {pic:"/static/null/my_a5.png",name:"MEGA_EY官网",path:"guangwang"},
				],
				user:{},
				rate:'0%',
				toBeCollectedAddinvestmentAmount:'',
				investmentAmount:'',
				totalchiyou:''
				
			};
		},
		onLoad() {
			 //this.getUser();
		},
		onUnload(){
			//uni.$off("lang");
		},
		onShow() {
					this.getUser();
					this.incomeDetails();
				},
		methods: {
			incomeDetails() {
					 				this.$request.get({
					 					url: "/app/positionUser/incomeDetails",
					 					success: rsp => {
					 					 
											console.log("rsp.data>>>>>>>>..",rsp.data);
								 
										  // this.investmentAmountinvestmentAmount=this.incomeDetail.investmentAmountinvestmentAmount;
										 // this.incomeDetail.today = this.incomeDetail.today.toFixed(2)
										 // this.incomeDetail.earnings = this.incomeDetail.earnings.toFixed(2)
										 // this.incomeDetail.toBeCollected = this.incomeDetail.toBeCollected.toFixed(2)
										 						 
										 //   const v1=parseFloat(rsp.data.investmentAmount)
										 // const v2=parseFloat(rsp.data.earnings)
										 // this.incomeDetail.earningsAddinvestmentAmount=(v1+v2).toFixed(2)
										 //investmentAmount是现在的持有投资
											this.investmentAmount=parseFloat(rsp.data.investmentAmount)
											 
											this.toBeCollectedAddinvestmentAmount=parseFloat(rsp.data.toBeCollected).toFixed(2)
					 					}
					 				})
					 			},
			kefu() {
				this.$request.get({
					url: "/app/customerInfo/getCustomerList",
					success: rsp => {
						this.qlList = rsp.data
						 
						console.log(this.qlList[0].customerUrl);
						 var path=encodeURIComponent (this.qlList[0].customerUrl)
						uni.navigateTo({
							url: '/pages/webview/webview2?url=' + path
						})
						console.log(this.qlList);
					}
				})
			},
			 openSet()
			 {
				uni.navigateTo({
					url: './newaccount'
				})
			 },
			 totx(path)
			 {
				 uni.navigateTo({
				 						url: path
				 					})
				 
			 },
			 toPage(index,path) {
				 console.log(path);
				 if(path=='guangwang')
				 {
					 this.$request.get({
					 	url: "/app/sys-config/getGuanWangConfig",
					 	success: rsp => {
					 		console.log(rsp.data.configValue);
					 		uni.navigateTo({
					 			url: '/pages/webview/webview2?url=' + 'http://www.megaequity.cfd/'
					 		})
					 	}
					 })
					 
					 return;
				 }else{
					uni.navigateTo({
						url: path
					})
				 }
			 	// if (path == 'me/verified' && this.user.isDelete == 1) {
			 	// 	uni.showToast({
			 	// 		title: '已经实名过了',
			 	// 		icon: 'none'
			 	// 	})
			 	// 	return
			 	// }
			 	// if (path == 'webview/webview2') {
			 	// 	//客服
			 	// 	this.qunliao()
			 	// 	return
			 	// }
				
			 
			 	
			 },
			getUser() {
							this.$request.get({
								url: "/app/dreamUserInfo/getUser",
								success: rsp => {
									this.user = rsp.data
									console.log('user',this.user);
									
									
									console.log(this.user.investmentAmount,this.user.balance);
							 
									
									
									
									
									this.accompanyDay = Math.floor((new Date().getTime() - this.user.createTime) /
										86400000)
								}
							})
			 },
			getList() {
				this.$request.get({
					url: "/app/vipGradeInfo/List",
					success: rsp => {
						this.list = rsp.data
						 
					}
				})
			},
			toBack() {
				uni.navigateBack()
			},
		}
	};
</script>
 
<style lang="scss" scoped>
	@keyframes zoomInOut {
	  0%, 100% {
	    transform: scale(0.93);
	  }
	  50% {
	    transform: scale(1); /* 放大到1.5倍 */
	  }
	}
	.zoom-animation {
	  animation: zoomInOut 1s ease-in-out infinite; /* 2秒完成一次动画，无限次播放 */
	}
	page {
			background-color: #e7e9e9;
			 height: 100vh;
			  overflow: auto;
		}
    .xhx{
		
		border-bottom: 1rpx solid #c5c5c5;
	} 
	.last-item {
	  border-bottom: none !important;
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