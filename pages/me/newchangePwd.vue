<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'重置交易密码'"    @back="toBack()">
	     	    		 		 	
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
					        
						 	<view class="mt20" style="width: 100%;background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff); border-radius: 16rpx;">
							 
								
								<view class="mt50 px30" style="width:calc(100vw - 148rpx)">
									<view class="flex-between-center"> 
										  <text class="ml20 fw500 fz30">当前交易密码</text> 
									</view>
									<view class="flex-between-center mt10">
										
										<input class="" style="width:600rpx;padding:30rpx 20rpx;font-size: 28rpx;color: #000;" type="text" placeholder-style="color:#a1a1a1" v-model="params.payPassword"
												 maxlength="6" placeholder="请输入当前交易密码" />
												 
									   <!-- <image src="/static/null/eye1.png"  style="width: 40rpx;" mode="widthFix" /> -->
									</view>
									<view class="flex-between-center mt20">
										  <text class="ml20 fw500 fz30">新交易密码</text> 
									</view>
									<view class="flex-between-center mt10">
										
										<input class="" style="width:600rpx;padding:30rpx 20rpx;font-size: 26rpx;color: #000;" type="text" placeholder-style="color:#a1a1a1" v-model="params.newPayPassword"
												 maxlength="6" placeholder="设置6位数字密码" />
												 
									   <!-- <image src="/static/null/eye1.png"  style="width: 40rpx;" mode="widthFix" /> -->
									</view>
									 
									<view class="flex-between-center mt20">
																  <text class="ml20 fw500 fz30">确认新交易密码</text> 
															</view>
															<view class="flex-between-center mt10">
																
																<input class="" style="width:600rpx;padding:30rpx 20rpx;font-size: 26rpx;color: #000;" type="text" placeholder-style="color:#a1a1a1" v-model="params.confirmNewPayPassword"
																		 maxlength="6" placeholder="请再次输入新交易密码" />
																		 
															  <!-- <image src="/static/null/eye1.png"  style="width: 40rpx;" mode="widthFix" /> -->
															</view> 
								</view>
								<view class="color-fff  flex-center-center" style=" margin-top: 140rpx;">
									
									<view @click.stop="$noMultipleClicks(edit,'')" style="background-color: #fb4034;padding: 20rpx 210rpx;border-radius: 8rpx;">确认</view>
								</view>  
							 
								<view class="mt100"></view>
							</view>
					</view>
					
				
					
					
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
									confirmNewPayPassword: '',
									newPayPassword: '',
									payPassword: ''
								},
								rules: {
									// 对name字段进行必填验证
									name: {
										rules: [{
												required: true,
												errorMessage: '请输入用户名',
											},
											{
												minLength: 3,
												maxLength: 5,
												errorMessage: '姓名长度在3 到 5 个字符',
											}
										]
									},
								}
				 
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
		 edit() {
			 if (this.params.newPayPassword=='' |  this.params.confirmNewPayPassword=='' | this.params.newPayPassword=='') {
			 	uni.showToast({
			 		title: '密码不能为空',
			 		icon: 'none'
			 	})
			 	return
			 }
		 				if (this.params.newPayPassword != this.params.confirmNewPayPassword) {
		 					uni.showToast({
		 						title: '两次输入新密码不一样',
		 						icon: 'none'
		 					})
		 					return
		 				}
		 				uni.showLoading({
		 					title: '提交中···',
		 					mask: true
		 				})
		 				this.$request.get({
		 					url: '/app/dreamUserInfo/updatePayPassword',
		 					data: this.params,
		 					success: rsp => {
		 						uni.showToast({
		 							title: rsp.message,
		 							icon: 'none'
		 						})
		 						if (rsp.code == 200) {
		 							setTimeout(() => {
		 								uni.navigateBack()
		 								uni.hideLoading()
		 							}, 1000)
		 						}
		 					},
		 					fail: rsp => {
		 						uni.hideLoading()
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