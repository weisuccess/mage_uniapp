<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'查看物流'"    @back="toBack()">
	     	    		 		 	
	     </narBarAndTop>
		<!-- <view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view> -->
		<view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view>
		<!-- <view style="height: 100rpx;width: 100%;background-color: #fb4034;" class=""></view> -->
		
		
	
			<view style=" background-image:  url('http://47.242.222.144/null/fundindextop.png'); 
					  background-repeat: no-repeat; 
					  background-size:cover;
					background-size: 100% 100%;
					width:100vw;
					height:200rpx				
					">  
					 
					
			 </view>
		<view class="flex-column-center  mx40" style="margin-top: -90rpx; "> 
		        
			 	<view class="mt20" style="width: 100%;background-color: #ffffff; border-radius: 16rpx;">
					<view class="navTab">
						<view :class="isActive==1?'active':''" @click="check(1)">待签收</view>
						<view :class="isActive==2?'active':''" @click="check(2)">已签收</view>
					</view>
					 <scroll-view scroll-y="true" class="box" :style="{height:windowHeight1+'px'}" bindscrolltolower="onReachBottom">
					 			<view class="">
					 				<view class="mt30 bac" style="padding: 20rpx;width: calc(100% - 40rpx);	background-color: #ffffff;"
					 					v-for="(item,index) in list" :key="index">
										
										<view class="flex-between-center px20" style="flex:1;color:#000000;line-height: 35rpx;">
											<view class="ml20">
											  <image :src="item.goodsImge" class="br10"
												style="width: 200rpx;height:150rpx;margin-right: 20rpx;">
											  </image>
											</view>
											<view class="mx20 line-height: 40rpx; ">
											 
											
												<view class="fw600 textMax3 fz28">{{item.goodsName}}</view>
													<view class="fz22 my10" style="color:#606060;">联系电话:{{item.harvestAddressInfoVo.phone}}</view>
											</view>
										 
										</view>
										
					 					<!-- <view class=" br10">
					 						<view class="flex-between-center ">
					 							<image :src="item.goodsImge" class="br10"
					 								style="width: 200rpx;height:200rpx;margin-right: 20rpx;">
					 							</image>
					 							<view style="width: 60%;color: #000;">
					 								<view class="flex-start-start ">
					 									<view class="fw700" style="width: calc(100% - 110rpx);">{{item.goodsName}}
					 									</view>
					 								</view>
					 								<view class="fz26 mt10" style="color:#606060;">
					 									联系电话：
					 									<text v-if="item.harvestAddressInfoVo">{{item.harvestAddressInfoVo.phone}}</text>
					 								</view>
					 							</view>
					 						</view>
					 
					 					</view> -->
					 				</view>
					 			</view>
					 		</scroll-view>
					
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
					windowHeight1: uni.getSystemInfoSync().windowHeight - 190,
				noClick: true,
				 	outData: {
				 					tradeValue: 0,
				 				},
				 				list: [],
				 				pageNum: 1,
				 				pageSize: 10,
				 				total: 0,
				 				name: '',
				 				isActive: 1
			};
		},
		 onLoad(opt) {
		 			console.log(opt);
		 			this.getUser()
		 			this.getList()
		 		},
		 		onShow() {},
		 		methods: {
		 			check(e) {
		 				this.page = 1
		 				this.isActive = e
		 				this.getList()
		 			},
		 			copy() {
		 				uni.setClipboardData({
		 					data: this.list.courierCode,
		 					success: function() {
		 						console.log('success');
		 						uni.showToast({
		 							title: '复制成功！',
		 							icon: 'none'
		 						})
		 					}
		 				});
		 			},
		 			getList() {
		 				this.$request.post({
		 					url: '/app/drawRecordsInfo/viewLogistics',
		 					data: {
		 						ordersType: this.isActive,
		 					},
		 					success: rsp => {
		 						this.list = rsp.data
		 					}
		 				})
		 			},
		 
		 			checkAddress() {
		 				uni.navigateTo({
		 					url: '/pages/me/dizhi'
		 				})
		 			},
		 			getUser() {
		 				this.$request.get({
		 					url: "/app/dreamUserInfo/getUser",
		 					success: rsp => {
		 						this.money = rsp.data.balance
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
	.active {
		border-bottom: 5rpx solid #cc0000;
		color: #cc0000;
		font-size: 30rpx;
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
.navTab {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		background-color: #fff;
		line-height:40rpx;
		margin-top: 30rpx;
		font-size: 30rpx;
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