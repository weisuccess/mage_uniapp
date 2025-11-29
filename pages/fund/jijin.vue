<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'基金'"    @back="toBack()">
	     	    		 		 	
	     </narBarAndTop>
		<!-- <view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view> -->
		<view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view>
		<view style="height: 100rpx;width: 100%;background-color: #fb4034;" class=""></view>
		
		
	
			<view style=" background-image:  url('/static/null/fundindextop.png'); 
					  background-repeat: no-repeat; 
					  background-size:cover;
					background-size: 100% 100%;
					width:100vw;
					height:200rpx				
					">  
					 
					
			 </view>
		<view class="flex-column-center  mx40" style="margin-top: -70rpx; "> 
		        
			 	<view v-for="(item,index) in list"  class="mt20 flex-start-center" style="width: 100%;background-color: #ffffff; border-radius: 10rpx 0 0 10rpx;">
					 
					<view style="width: 100rpx;color:#ffffff;height:100rpx;background-color: #d270ed; border-radius: 10rpx 0 0 10rpx;" class="fz24 text-align-c py60">
						 
						<view>0.52% </view>
						<view class="mt10">日利率</view>
					</view>
					<view style="width: 230rpx;height: 160rpx;" class="py20 ml10  flex-column-start-start">
						<view style="margin-left:  0rpx;" class="fz24 fw600">日橡胶ddd(RSS3)</view>
						<view class="mt20 flex-column-center" style="padding: 5rpx 0; width:100%;border-radius: 8rpx;background-color: #f8f8f8;">
							<view class="fz22">单价</view>
							<view class="fw600 fz22">500 USDT/份</view>
						</view>
						<view class="mt20 flex-between-center fz20 fw600" style="width: 100%;">
							<view style="border-radius: 38rpx;border: 1px solid #b8b8b8; padding: 2rpx 14rpx;">周期:3天</view>
							<view style="border-radius: 38rpx;border: 1px solid #b8b8b8; padding: 2rpx 14rpx;">限购:1份</view>
						</view>
					</view>
					<view class="py20 ml10 " style="width: 300rpx; height: 160rpx;
					display: flex;
					flex-flow: column;
					justify-content: flex-start;
					align-items: flex-end;
					
					">
						<view class="text-align-c fz22 fw400" style="color: #e674d0;background-color: #f6c2ee; border-radius: 38rpx;border: 2px solid #f2a1e5;;padding: 3rpx 7rpx;">每日付息到期还本</view>
						<view class="mt20 fz26 flex-column-center" style="padding: 5rpx 20rpx; width:200rpx; background-color: #f8f8f8;">
							<view class="fz22">项目规模</view>
							 <view class="fw600 fz22 mt">6.2百万USDT</view>
						</view>
						 
					</view>
					
					<!-- <view   class="flex-center-center  fz28 fw400 " style="padding: 25rpx 0;border-bottom: 1rpx solid #c5c5c5;">
					 
							 
						<view class="  text-align-c" style="flex:1">{{item.name}}</view>
						<view class="  text-align-c" style="flex:1">{{item.price}}</view>
						<view class="  text-align-c " style="flex:1;color: #5bac13;">{{item.growrate}}%</view>
					  
					</view> -->
					
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
				piclist: [
					 
				],
				zilist:[
					
				],
				loginInfo:{},
				pageNum: 1,
				pageSize: 10,
				total: 0,
				myLevel:0,
				list:[
				  {name:"dsfsdfa500",price:"6885.25",growrate:"-0.55"},
				 {name:"dsfsdfa500",price:"6885.25",growrate:"-0.55"},
				 {name:"dsfsdfa500",price:"6885.25",growrate:"-0.55"}
					
				],
				user:{},
				rate:'0%',
			};
		},
		onLoad() {
			 //this.getUser();
		},
		onUnload(){
			//uni.$off("lang");
		},
		onShow() {
			this.pageNum = 1
			//this.getList()
		},
		methods: {
		 
			 
			getUser() {
				this.$request.get({
					url: "/app/dreamUserInfo/getUser",
					success: rsp => {
						this.user = rsp.data
						console.log(this.user);
						
						this.vip_nexexperience=this.user.nextvipGradeInfo.vipExperience;
						
						this.vip_remainnexexperience=this.user.nextvipGradeInfo.vipExperience-this.user.investmentAmount;
					
						this.vip_progress=1-(this.vip_remainnexexperience/this.user.nextvipGradeInfo.vipExperience);
						this.myLevel=this.user.vipGradeInfo.id;
					
					if(this.myLevel>=1)
					  this.rate=this.zilist[this.myLevel-1].rate						 
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