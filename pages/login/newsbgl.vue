<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'登录日志查询'"    @back="toBack()">
	     	    		 		 	
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
		        
			 	<view class="mt20" style="width: 100%;background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff); border-radius: 16rpx;">
					 <view >
					 			<view class="ml50 mt60 fw700">
					 				请绑定账号唯一设备登录
					 			</view>
					 			<view class="ml50 mt10 fw700">
					 				检测常用设备
					 			</view>
					 			<view class=" br10" style="width: 80%;margin:30rpx 5% 0;padding: 3% 5%;border: 1px solid #ea564d;">
					 				<text class="fw600 mr20" style="color: #ea564d;">{{deviceModel}}</text>序列号 {{deviceId}}
					 			</view>
					 			<view class="fw600 color-fff text-align-c fz24 py30" @click="bd"
					 			 style="width: 90%;margin:100rpx 5% 30rpx; border-radius: 15rpx;;padding: 40 5%;background: linear-gradient(to right, #b80003,  #f42727, #b80003);">
					 				立即绑定为固定登录设备
					 			</view>
					 			<view class="fw600 color-fff text-align-c fz24 py30"  @click="hd"
					 		style="width: 90%;margin:80rpx 5% 30rpx;color:#ea564d; border-radius: 15rpx;;padding: 40 5%; border: 1px solid #ea564d;">
					 				点击修改登录设备
					 			</view>
					 		 
							    <view class="mt80 fw600 fz28" style="width: 80%;;padding: 10rpx 8%;line-height: 0.5rem;">设备管理说明</view>
					 			<view class="fw600 fz20" style="width: 80%;margin:10rpx 10% 0;padding: 3% 0%;line-height: 40rpx; ">
					 				1、常用设备为当前登录设备<br>
					 				2、为了您的账户安全，请绑定个人登录设备，其他设备不可换登<br>
					 				3、绑定登录设备后，如需换绑设备登录，可点击修改登录设备，联系在线客服，提供您本人账户身份材料（身份证正反面，手持身份证），确认本人操作后，可进行新设备换绑。
					 			</view>
					 		</view>
					<!-- #ea564d -->
					<!-- #32bf68 -->
				 
					
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
				arr: [],
								deviceId: '',
								deviceBrand: '',
								deviceModel: '',
								osName: ''
			};
		},
		 onLoad(opt) {
		 			let that = this
		 			uni.getSystemInfo({
		 				success: function(res) {
		 					that.deviceId = res.deviceId;
		 					that.deviceBrand = res.deviceBrand;
		 					that.deviceModel = res.deviceModel;
		 					that.osName = res.osName;
		 				}
		 			});
		 		},
		 		methods: {
		 			bd(){
		 				this.$request.get({
		 					url: "/app/dreamUserInfo/fixedDeviceStr",
		 					success: rsp => {
		 						uni.showToast({
		 							title:rsp.message,
		 							icon:'none'
		 						})
		 					}
		 				})
		 			},
		 			hd(){
						uni.showToast({
							title:"更改账户绑定设备，请联系官方客服进行变更!",
							icon:'none'
						})
						
						return;
		 				this.$request.get({
		 					url: "/app/dreamUserInfo/updateByDeviceStr",
		 					success: rsp => {
		 						uni.showToast({
		 							title:rsp.message,
		 							icon:'none'
		 						})
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
		background-image:  url('http://47.242.222.144/null/menub1.png') ;
		background-repeat: no-repeat;
		  background-size:cover;
		background-size: 100% 100%;
	}
	.bg2{
		background-image:  url('http://47.242.222.144/null/menub2.png') ;
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