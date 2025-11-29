<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'提交订单'"    @back="toBack()">
	     	    		 		 	
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
		<view class="flex-column-center  px40" style="margin-top: -90rpx; "> 
		        
			 	<view class="mt20" style="width: 100%;background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff);border-radius: 16rpx;">
					 
					 <view class="flex-column-center pd30">
						 <view class="flex-between-center py30 fz26" style="width: 100%;">
							 <view @click="checkAddress" class="flex-between-center" style="width:100% ;">
								 <view>收货地址:</view>
								 <view class=" fw600 " style="width: 300rpx;" v-if="arr.harvestPeople">
								 		<view class="flex-start-center">
								 			<view style="" class="flex-start-center">
								 				<view class="">{{ arr.harvestPeople }}aa</view>
								 				<view class="">{{ arr.phone }}</view>
								 			</view>
								 		</view>
								 		<view class="item-body">
								 			<view>{{ arr.fullAddress }}</view>
								 		</view>
								 	 
								 </view>
								 
							 </view>
						 						
							 <view><uni-icons type="right" size="30"></uni-icons></view>
						 </view>
						 
					 </view>
					
					 
						  
					<view class="line mx20"></view>					
					
					<view class="flex-between-center mt50">
						 <text class="ml20 fw600 fz32">商品详情</text> 
					 </view>
					 <view class="flex-start-start mt20  px40">
					 	 <view class="" style="width: 240rpx;height: 240rpx;border-radius: 10rpx;">
							 <image :src="list.commodityImage" class="mr20 br10" style="width: 240rpx;height: 240rpx;">
							 
						 </view>
						 <view class="ml20 fz24 fw600" style="width: 100%;line-height: 40rpx;">
							 <view>{{list.commodityName}}</view>
							 <view class="flex-between-center">
								  
							 </view>
							 <view class="flex-between-center mt40">
								 <view class="fw600 fz30">所需积分</view>
								 <view class="fw600 fz30" style="color: #ab0000;"> 
								 {{list.commodityIntegral}}
								 </view>
							 </view>
						 </view>
					  </view>
					  <view class="color-fff  flex-center-center" style=" margin-top: 140rpx;">
					  	
					  	<view @click="duihuan" style="background-color: #fb4034;padding: 20rpx 210rpx;border-radius: 8rpx;">提交</view>
					  </view>  
					  
					  <passkeyborad :show="show" :money="totalSXF" @close="closezujian" @password="submit" @showPop="closezujian">
					  </passkeyborad>
					  <view class="mt100"></view>
				</view>
		</view>
		
	
		 
	</view>
	 
</template>

<script>
	import narBarAndTop from 'pages/public/narBarAndTop.vue' 
	import cityPicker from '@/uni_modules/piaoyi-cityPicker/components/piaoyi-cityPicker/piaoyi-cityPicker'
	export default {
		components: {
			narBarAndTop, 
			cityPicker
		},
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 90,
				noClick: true,
				outData: {
					tradeValue: 0,
				},
				arr: {},
								list: {},
								totalJF: 0,
								totalSXF: 0,
								number: 1,
								id: 0,
								show: false
			};
		},
		onLoad(opt) {
			this.number = opt.num
						this.id = opt.id
						this.getUser()
						this.getList()
						this.getArr()
			
						uni.$on('address', (data) => {
							console.log('Received data:', data);
							this.arr = JSON.parse(data.select)
						});
		},
		onUnload(){
			//uni.$off("lang");
		},
		onShow() {
			this.pageNum = 1
			//this.getList()
		},
		methods: {
			 closezujian() {
			 				this.show = false
			 			},
			 			getArr() {
			 				this.$request.get({
			 					url: "/app/integralMallInfo/getIntegralMall",
			 					data: {
			 						id: this.id,
			 					},
			 					success: rsp => {
			 						this.list = rsp.data
			 					}
			 				})
			 			},
			 			//获取地址
			 			getList() {
			 				this.$request.get({
			 					url: "/app/harvestAddressInfo/list",
			 					success: rsp => {
			 						console.log(rsp);
			 						if (rsp.data[0]) {
			 							var aaa = rsp.data.filter((item) => {
			 								console.log(item.whetherDefault);
			 								return item.whetherDefault == 1
			 							})
			 							if (aaa[0]) {
			 								this.arr = aaa[0]
			 							} else {
			 								this.arr = rsp.data[0]
			 							}
			 							console.log(aaa);
			 						} else {
			 							this.arr = {}
			 						}
			 					}
			 				})
			 			},
			 			checkAddress() {
			 				uni.navigateTo({
			 					url: '/pages/point/newdizhi'
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
			 			num(e) {
			 				if (e == 1) {
			 					this.outData.tradeValue -= 1
			 				}
			 				if (e == 2) {
			 					this.outData.tradeValue += 1
			 				}
			 			},
			 			duihuan() {
			 				if (!this.arr.id) {
			 					uni.showToast({
			 						title: '请选择地址',
			 						icon: 'none'
			 					})
			 					return
			 				}
			 				// this.show = true
			 				this.submit()
			 			},
			 			submit(e) {
			 				this.$request.get({
			 					url: '/app/integralMallInfo/exchange',
			 					data: {
			 						addressId: this.arr.id,
			 						id: this.id,
			 						// payPassword: e
			 					},
			 					success: rsp => {
			 						this.show = false
			 						uni.showToast({
			 							title: rsp.message,
			 							icon: 'none'
			 						})
			 						if (rsp.code == 200) {
			 							setTimeout(() => {
			 								uni.navigateBack()
			 							}, 1500)
			 						}
			 
			 						return
			 
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
	.line {
	height: 1px;
	background-color: #b8b8b8;
	transform: scaleY(0.3);
	transform-origin: 0 0;
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