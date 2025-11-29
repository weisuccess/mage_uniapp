<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'详情'"    @back="toBack()">
	     	    		 		 	
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
		<view class="flex-column-center  mx40" style="margin-top: -90rpx; "> 
		        
			 	<view class="mt20" style="width: 100%;background-color: #fff;;border: 2px solid #ffffff; border-radius: 14rpx;">
					<view  class="flex-center-center  px10 " style="margin: 30rpx 0rpx;">
						<view class="flex-center-center fz22">
							<view class="fw500 fz32 ml30">印度1年期国债</view>
							<view class="text-align-c fz22 ml10" style="color: #ec5d53;background-color: #fee8e7; border-radius: 38rpx;border: 1px solid #fbb8b6;;padding: 3rpx 7rpx;">每日付息到期还本</view>
						</view>
						 
						 
					</view>
					<view  class="flex-center-center  px10 " style="margin: 30rpx 10rpx;color: #898989;">
						 <text class=" " style="color: #e33226;" decode>0.45%</text> 日利率
					</view>
					<view  class="flex-center-center  px10 " style="margin: 30rpx 10rpx;color: #898989;">
						<view style="color: #898989;;">项目规模:<text class="color-zhi" decode>{{kong}}6.6百万</text> USDT</view>
					</view> 
				 
					 
					 
					
					
					<view class="mt40"></view>
					 
				</view>
				
				<view class="mt20" style="width: 100%;background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff);;border: 2px solid #ffffff; border-radius: 14rpx;">
					 
					
					<view class=" " style="margin: 30rpx 30rpx;">为什么要全球配置</view>
					<view class=" fz26" style="margin: 20rpx 30rpx;"> <text decode>{{kong}}{{kong}}{{kong}}</text>     全世界各地都发生着大量经济活动，积极参与全球投资不仅可以提高收 益，也是我们有效分散单一市场风险的重要手段。    </view>
				
					<view class="text-align-c">
						<image src="/static/null/qqdetail.png"
										style="width: 500rpx;" mode="widthFix">
										</image>
					</view>
				</view>
				
		</view>
		
		<view class="lineargradient text-align-c " style="margin:30rpx  80rpx;padding: 15rpx 0;color: #fff;border-radius: 10rpx;">立即持有</view>
	
		
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