<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'更新签名'"    @back="toBack()">
	     	    		 		 	
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
					<view style="padding: 30rpx;">
						<view class="ml30 fz26 fw600">证件号:</view>
						<view  class="flex-center-center fz28   fw400">
							 <input class="vinput" style="width:90%;padding-left:0rpx;font-size: 22rpx;color: #000;" type="text" placeholder-style="color:#a1a1a1" v-model="idCard"
							 			 maxlength="18" placeholder="请输入证件号码" />
						</view>
						
						<view class="ml30 fz26 fw600 mt30">支付密码:</view>
						<view  class="flex-center-center fz28   fw400">
							 <input class="vinput" style="width:90%;padding-left:0rpx;font-size: 22rpx;color: #000;" type="number" placeholder-style="color:#a1a1a1" v-model="payPassword"
							 			 maxlength="6" placeholder="请输入支付密码" />
						</view>
						
						<view class="ml30 fz26 fw600 mt30">我的签名：</view> 
						<view  class="flex-column-center fz28 mt20 fw400" >
							
							<!-- <view  v-if="startSig==false" @click="startsign2()"  class="flex-column-center" style="border-radius: 8rpx;border: 2rpx solid #c5c5c5;margin: 30rpx 40rpx;width:100%; height: 400rpx;  ">
																 
								 <image :src="user.signature"  style="width: 100%;" mode="widthFix" />
								
						   </view> -->
															
						  <view    class="flex-column-center" style="margin: 0rpx 40rpx;width:100%; height: 400rpx; border-radius: 8rpx;border: 2rpx solid #c5c5c5;margin: 30rpx 40rpx;width:86%; height: 300rpx;  ">
								 <l-signature disableScroll  ref="signatureRef"   :penColor="penColor" :penSize="penSize" :openSmooth="openSmooth" ></l-signature>
									 
									
							</view> 
							<view   class="flex-between-center fz22 " style="margin: 0rpx 40rpx;width: 60%;">
								 <view style="padding: 8rpx 20rpx;border-radius:5rpx;border: 2rpx solid #c5c5c5;;color: #5c5c5c;" @click="clear()">清除画板</view>
																			  
								 <view v-if="showBtn==true" style="padding: 8rpx 20rpx;border-radius:5rpx;background-color: #c30003;color: #ffffff;" @click="startqian()">确认签名</view>								  
							 <view v-if="showBtn==false" style="padding: 8rpx 20rpx;border-radius:5rpx;background-color: #8e8e8e;color: #ffffff;"  >确认签名</view>								  
							 </view>
							  <view @click.stop="$noMultipleClicks(submit,'')"  style="color: #fff;padding: 25rpx 240rpx;border-radius: 10rpx;background-color: #d00808;" class=" fz28 text-align-c mt20">提交</view> 
								 
								
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
				idCard:'',
				payPassword:'',
				 	signature:'', 
					user:'',
					startSig:false,
					penColor: '#000',
									penSize: 5,
									url2: '',
									openSmooth: true,
									signature:'',
									productParam:{}, 
									showBtn:true,
			};
		},
		onLoad() {
		 this.getUser();
		},
		onUnload(){
			//uni.$off("lang");
		},
		onShow() {
			this.pageNum = 1
			//this.getList()
		},
		methods: {
			startqian()
			{
				if(this.startSig==true)
				{
					
					 
				}
				 
				this.$refs.signatureRef.canvasToTempFilePath({
				    success: (res) => {
				        // 是否为空画板 无签名
				        console.log(res.isEmpty)
											if(res.isEmpty)
											{
												uni.showToast({
													title: '请签名',
													icon: 'none'
												})
												
												return;
											}
								// 生成图片的临时路径
								// H5 生成的是base64
								this.url2 = res.tempFilePath
													console.log(this.url2);
													
													let url = uni.getStorageSync('url')
													
													console.log('url',url);
													uni.uploadFile({
														url: url + '/Ali/upload',
														filePath: this.url2,
														name: 'file',
														header: {
															token: uni.getStorageSync('token'),
														},
														success: res => {
															let data = JSON.parse(res.data);
															console.log(data);
															if (data.code == 200) {
																this.startSig=true;
																 
																// if (type == 3) {
																// 	this.cardHandheld = data.data;
																// }
																 this.signature=data.data;
															 this.showBtn=false;
																	
																uni.showToast({
																	title: '签名成功',
																	icon: 'none'
																})
															}
															// 失败报错
															if (data.code == 500) {
																uni.showToast({
																	title: '上传失败',
																	icon: 'none'
																})
															}
														 
														}
													});			
								
							
											
					}});
			},
			submit() {
				let p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
				if (!p.test(this.idCard)) {
					uni.showToast({
						title: '身份证格式输入不正确',
						icon: 'none'
					})
					return
				}
			 
				 
				if(this.idCard==null ||this.idCard=='')
				{
					uni.showToast({
						title: '请输入证件号',
						icon: 'none'
					})
					
					return;
				}
				if(this.payPassword==null ||this.payPassword=='')
				{
					uni.showToast({
						title: '请输入支付密码',
						icon: 'none'
					})
					
					return;
				}
				
				
				 
			 this.tijiao();
					
					return;
						
				
			},	
			tijiao(){
				var params={}
				params.idCard=this.idCard
				params.signature=this.signature
				params.payPassword=this.payPassword
				 this.$request.get({
				 	url: '/app/dreamUserInfo/updateSignature',
				 	data: params,
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
			 
			
			getUser() {
							this.$request.get({
								url: "/app/dreamUserInfo/getUser",
								success: rsp => {
									this.user = rsp.data
									console.log(this.user);
									this.telphone=this.user.telPhone;
								}
							})
			 },
			clear(){
				this.showBtn=true;
			            this.$refs.signatureRef.clear()
			        },
		 updateSign()
		 {
			if(this.idCard==null ||this.idCard=='')
			{
				uni.showToast({
					title: '请输入证件号',
					icon: 'none'
				})
				
				return;
			}
			this.$refs.signatureRef.canvasToTempFilePath({
				    success: (res) => {
				        // 是否为空画板 无签名
				        console.log(res.isEmpty)
											if(res.isEmpty)
											{
												uni.showToast({
													title: '请签名',
													icon: 'none'
												})
												
												return;
											}
								// 生成图片的临时路径
								// H5 生成的是base64
								this.url2 = res.tempFilePath
													console.log(this.url2);
													
													let url = uni.getStorageSync('url')
													
													console.log('url',url);
													uni.uploadFile({
														url: url + '/Ali/upload',
														filePath: this.url2,
														name: 'file',
														header: {
															token: uni.getStorageSync('token'),
														},
														success: res => {
															let data = JSON.parse(res.data);
															console.log(data);
															if (data.code == 200) {
																 
																// if (type == 3) {
																// 	this.cardHandheld = data.data;
																// }
																 this.signature=data.data;
															 
																	this.tijiao();
																
															}
															// 失败报错
															if (data.code == 500) {
																uni.showToast({
																	title: '上传失败',
																	icon: 'none'
																})
															}
														 
														}
													});			
								
							
											
					}});
					console.log('ddddd');
					
					return;
						
			 
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