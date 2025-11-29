<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'新增收货地址'"    @back="toBack()">
	     	    		 		 	
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
		<view class="flex-column-center  " style="margin-top: -90rpx; "> 
		        
			 	<!-- <view class="mt20" style="width: 100%;background-color: #ffffff; border-radius: 16rpx;">
				 
					
				</view> -->
				
				
			<view class="mt20 pd40" style="width:calc(100vw - 88px);background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff);border-radius: 16rpx;">
								 
					 
					  <view class="fw600 fz32">收件人</view>  
					 			
					 <input class="" style="width:600rpx;padding:30rpx 0rpx;font-size: 28rpx;color: #000;" type="text" placeholder-style="color:#a1a1a1" v-model="address.harvestPeople"
					 	 maxlength="15" placeholder="请输入收件人姓名" />
					 					 
					 	<view class="line"></view>	 
				 
					  <view class="fw600 fz32 mt20">联系电话</view> 
					 
					 	 
					 			
					 <input class="" style="width:600rpx;padding:30rpx 0rpx;font-size: 28rpx;color: #000;" type="number" placeholder-style="color:#a1a1a1" v-model="address.phone"
					 	 maxlength="15" placeholder="请输入联系电话" />
					 <view class="line"></view>
				 
					  <view class="fw600 fz32 mt20">所在地区</view> 
					   
					 <view>
					<view v-if="visible" style="fz30">
						<cityPicker  :column="column" :default-value="defaultValue" :mask-close-able="maskCloseAble"
							@confirm="confirm" @cancel="cancel" :visible="visible" />
					</view> 
					 	
					<view class=" " style="color:#b7b7b7 ;padding:30rpx 0rpx;" @tap="open" v-if="!region[0]">
						请选择所在地区
					</view>
					<view class="fz32" style="color:#000 ;padding:30rpx 0rpx;" @tap="open" v-else>
						{{ region[0] }} {{ region[1] }} {{ region[2] }}
					</view>
					 	
					 	<view class="line"></view>
					 </view>	 
					 
					   <view class=" fw600 fz32 mt20">详细地址</view> 
					  
					  	 
					  			
					  <input class="" style="width:600rpx;padding:30rpx 0rpx;font-size: 28rpx;color: #000;" type="text" placeholder-style="color:#a1a1a1" v-model="address.fullAddress"
					  	  placeholder="请输入详细地址" />
					 	  
					 <view class="line "></view>	
 
	  
			</view>
		</view>
		<view class="color-fff  flex-center-center" style=" margin-top: 50rpx;">
			
			<view  @click.stop="$noMultipleClicks(submitAddress,'')" style="background-color: #fb4034;padding: 20rpx 210rpx;border-radius: 8rpx;">保存地址</view>
		</view>  
		<view class="mt50"></view>
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
			 address: {
			 					harvestPeople: '',
			 					phone: '',
			 					fullAddress: '',
			 					location: '',
			 					whetherDefault: 2
			 				},
			 				visible: false,
			 				maskCloseAble: true,
			 				defaultValue: '',
			 				// defaultValue: ['河北省','唐山市','丰南区'],
			 				column: 3,
			 				region: [],
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
			open() {
							this.visible = true
						},
						confirm(val) {
							console.log(val)
							this.region[0] = val.provinceName
							this.region[1] = val.cityName
							this.region[2] = val.areaName
							this.address.location = val.provinceName + val.cityName + val.areaName
							this.visible = false
						},
						cancel() {
							this.visible = false
						},
						toBack() {
							uni.navigateBack()
						},
						bindRegionChange(e) {
							this.address.region = e.detail.value;
						},
						submitAddress() {
							// 处理提交地址的逻辑
							console.log('提交地址:', this.address);
							if(this.address.harvestPeople=='')
							{
								uni.showToast({
									title: '请输入收件人姓名',
									icon: 'none'
								})
								return;
								return;
							}
							console.log(this.address.phone);
							if(this.address.phone=='')
							{
								uni.showToast({
									title: '请输入联系电话',
									icon: 'none'
								})
								 
								return;
							}
							if(this.address.fullAddress=='')
							{
								uni.showToast({
									title: '请输入详细地址',
									icon: 'none'
								})
								 
								return;
							}
							
							this.$request.post({
								url: "/app/harvestAddressInfo/add",
								data: this.address,
								success: rsp => {
									if (rsp.code == 200) {
										console.log('成功');
										uni.navigateBack()
									}
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