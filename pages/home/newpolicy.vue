<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'会员等级'"    @back="toBack()">
	     	    		 		 	
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
		        
			 	<view class="mt20" style="width: 100%;background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff);border-radius: 16rpx;">
					 
					
					<view  v-for="(item,index) in list"  class="flex-center-center  fz24 fw400 " style="padding-bottom:20rpx; ">
					 <!-- <image src="/static/null/vip1.png"  style="width: 600rpx;" mode="widthFix" /> -->
					<view class="flex-between-end"
					  :style="{ backgroundImage: 'url(' + item.bgimg + ')' }"
					  style=" 
							  background-repeat: no-repeat; 
							  background-size:cover;
							background-size: 100% 100%;
							width:600rpx;
							height:300rpx				
							">  
						<view class="flex-column-center-start" style="width: 230rpx;height: 220rpx;margin-top: 180rpx;margin-left:50rpx;line-height: 50rpx; ">
							<view :class="item.color" class="fw600 fz34">VIP{{index+1}}</view>
							<view :class="item.color" class="fw400 fz24">投资金额:{{item.vipExperience}}</view>
							<view :class="item.color" class="fw400 fz24">利率:{{item.vipInterest}}%</view>
						 
						</view>	 
						<view @click="toLiChai()" style="margin:0 50rpx 30rpx 20rpx;color: #fff;padding: 8rpx 25rpx;border-radius: 10rpx;" :class="item.bgcolor">点击理财</view>
							
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
				list: [],
				pageNum: 1,
				pageSize: 10,
				total: 0
			};
		},
		onLoad() {
		
		},
		onShow() {
			this.pageNum = 1
			this.getList()
		},
		methods: {
			toLiChai()
			{
				uni.reLaunch({
					url: '../fund/newindex'
				})	
			},
			getList() {
				this.$request.get({
					url: "/app/vipGradeInfo/List",
					success: rsp => {
						this.list = rsp.data
						
					 
						// :style="{ backgroundImage: 'url(' + dynamicBgImage + ')' }
						
						var i=0;
						this.list.forEach(obj => {
						  obj.color = 'color'+(i);
						  obj.bgcolor ='bgcolor'+(i);
						  const temp=(i);
						  obj.bgimg= `/static/null/vip${temp}.png `
							 i++;
						})
						this.list.shift()
						console.log(this.list);
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
	.color1{
		color:#2875ab;
	}
	.bgcolor1{
		background-color:#2875ab;
	}
	.color2{
		color:#3d65ce;
	}
	.bgcolor2{
		background-color:#3d65ce;
	}
	.color3{
		color:#632dc1;
	}
	.bgcolor3{
		background-color:#632dc1;
	}
	.color4{
		color:#94008d;
	}
	.bgcolor4{
		background-color:#94008d;
	}
	.color5{
		color:#248b80;
	}
	.bgcolor5{
		background-color:#248b80;
	}
	.color6{
		color:#43ab00;
	}
	.bgcolor6{
		background-color:#43ab00;
	}
	.color7{
		color:#ae9900;
	}
	.bgcolor7{
		background-color:#ae9900;
	}
	.color8{
		color:#c1511c;
	}
	.bgcolor8{
		background-color:#c1511c;
	}
	.color9{
		color:#a78edb;
	}
	.bgcolor9{
		background-color:#a78edb;
	}
	.color10{
		color:#aaf1ef;
	}
	.bgcolor10{
		background-color:#aaf1ef;
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