<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'添加USDT地址'"    @back="toBack()">
	     	    		 		 	
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
		        
			 	<view class="mt20 fz28" style="width: 100%;border-radius: 16rpx;">
				   <image src="/static/null/usdtdetail1.png"  style="width: 100%;" mode="widthFix" />
					
					<view class="flex-between-center px30 mt20" >
								<view class="fw600">USDT地址</view>			 
								<input class="vinput ml10" style="width:75%;padding-left:0rpx;font-size: 26rpx;color: #000;" type="text" placeholder-style="color:#a1a1a1" v-model="params.usdtPacksAddress"
										 maxlength="40" placeholder="请输入USDT地址" />
												 
												
					 </view>
					 <view class="flex-between-center px30 mt20" >
					 			<view class="fw600">支付密码</view>			 
					 			<input class="vinput ml10" style="width:75%;padding-left:0rpx;font-size: 26rpx;color: #000;" type="number" placeholder-style="color:#a1a1a1" v-model="params.payPassword"
					 					 maxlength="6" placeholder="请输入支付密码" />
					 							 
					 							
					  </view>
					  <view class="flex-between-center px30 mt20" >
					  			<view class="fw600">备注</view>			 
					  			<input class="vinput ml10" style="width:75%;padding-left:0rpx;font-size: 26rpx;color: #000;" type="text" placeholder-style="color:#a1a1a1" v-model="params.usdtPacksRemarks"
					  					 maxlength="15" placeholder="请输入备注" />
					  							 
					  							
					   </view>
					<view class="mt20" style="width: 100%; border-radius: 8rpx;">
						<view @click="submit" class="fz24 mt10 lineargradient text-align-c mx40 py20" style="border-radius: 8rpx;color: #ffffff;">提交</view>
						 
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
				 
			 
				params: {
									usdtPacksRemarks: "",
									usdtPacksType: "TRC20",
									usdtPacksAddress: "",
									payPassword: '',
									
								},
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
		 
			 submit() {
				 
			 				if (this.params.usdtPacksRemarks == '' || !this.params.usdtPacksType || !this.params.usdtPacksAddress || !this
			 					.params.payPassword) {
			 					uni.showToast({
			 						title: '请检查填写项',
			 						icon: 'none'
			 					})
			 					return;
			 				}
			 
			 				this.$request.post({
			 					url: "/app/usdtAddressInfo/add",
			 					data: this.params,
			 					success: rsp => {
			 						uni.showToast({
			 							title: rsp.message,
			 							icon: 'none'
			 						})
			 						if (rsp.code == 200) {
			 							setTimeout(() => {
			 								uni.navigateBack()
			 							}, 1000)
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