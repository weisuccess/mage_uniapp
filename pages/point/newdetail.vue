<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'详情'"    @back="toBack()">
	     	    		 		 	
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
		        
			 	<view class="mt20" style="width: 100%;">
					 
					<image :src="arr.commodityImage"  style="width: 100%;height: 460rpx;border-radius:20rpx;" mode="scaleToFill" />
				</view>
				<view class="mt20 px40" style="padding: 20rpx 40rpx;width:calc(100% - 26px); background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff); border-radius:8rpx;">
					<view class="fz30 fw600">
					 	 <view>{{arr.commodityName}}</view>
					 									 
					</view>
					 <view class="flex-row-between-center mt30 fz28 fw600">
					 	 <view>库存</view>
					 	 <view style="color: #c61d13;">{{arr.exchangeFrequency}}</view>								 
					</view>
					<view class="flex-row-between-center mt20 fz28 fw600">
					 	 <view>所需积分</view>
					 	 <view style="color: #c61d13;">{{arr.commodityIntegral}}</view>								 
					</view>
					<view class="fz28 py30">
						<text  style="">
							{{arr.useExplanation}}
						</text>
					</view>
					
					 
					
					 
				 
						
				</view>
				<view @click.stop="$noMultipleClicks(submit,'')"  style="color: #fff;padding: 25rpx 240rpx;border-radius: 10rpx;background-color: #ad0907;" class=" fz28 text-align-c mt40">确认</view>
				
				<view  style="height: 50rpx;">
										 
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
			 
				id: 0,
				arr: {},
				outData: {
					tradeValue: 1
				},
				noClick: true,
				type: ''
			};
		},
		onLoad(opt) {
			this.id = opt.id
			this.outData.tradeValue = Number(opt.num)
			if (opt.type) {
				this.type = opt.type
			}
			this.getArr()
		},
		methods: {
			getArr() {
				// let url = ''
				// if (this.type == 'cbg') {
				// 	url = '/app/splinterRedemptionInfo/query'
				// } else {
				// 	url = '/app/pointsRedemption/query'
				// }
				this.$request.get({
					url: '/app/integralMallInfo/getIntegralMall',
					data: {
						id: this.id,
					},
					success: rsp => {
						this.arr = rsp.data
						console.log(this.arr);
					}
				})
			},
			num(e) {
				if (e == 1) {
					if (this.outData.tradeValue <= 0) {
						uni.showToast({
							title: '不能再减啦！',
							icon: 'none'
						})
						return
					}
					this.outData.tradeValue -= 1
				}
				if (e == 2) {
					this.outData.tradeValue += 1
				}
			},
			submit() {
				uni.navigateTo({
					url: './neworderGoods?id=' + this.arr.id + '&num=' + this.outData.tradeValue
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