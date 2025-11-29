<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'实名认证'"    @back="toBack()">
	     	    		 		 	
	     </narBarAndTop>
		<!-- <view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view> -->
		<view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view>
 
		
		
	
			<view style=" font-family: 'YaHei';background-image:  url('/static/null/fundindextop.png'); 
					  background-repeat: no-repeat; 
					  background-size:cover;
					background-size: 100% 100%;
					width:100vw;
					height:200rpx				
					">  
					 
					
			 </view>
		<view class="flex-column-center  mx40" style="margin-top: -70rpx; letter-spacing: 2px;"> 
		      
			 	<view class="mt20" style="padding:20rpx 20rpx;width:calc(100% - 10px);background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff);border-radius: 8rpx;">
					 
					 <view v-if="user.isDelete!=2" class="text-align-c">
						  <image src="/static/null/shiping.png"  style="width: 400rpx;" mode="widthFix" />
						  <view class="fz28 fw600" style="color: #da916c">实名认证成功</view>
					 </view>
					 <view v-if="user.isDelete!=2" class="fw600" style="margin-left: 40rpx;margin-top: 80rpx;;line-height: 50rpx;">
						 <view class="fz26">身份信息</view>
						 <view class="fz22">您的名字:{{trueName}}</view>
						  <view class="fz22">您的身份证号:{{idCard}}</view>
						  <view @click="toBack" style="margin: 60rpx 0rpx;color: #fff;padding: 10rpx 200rpx;border-radius: 10rpx;background-color: #d10808;" class=" fz28 text-align-c mt20">确认</view> 
					 </view>
					
				<view v-if="user.isDelete==2" class="ml20 mt20 fw400">请上传身份证正反面</view>	
				
				
				<view v-if="user.isDelete==2" class="flex-center-center " style="margin: 30rpx 40rpx 40rpx 20rpx;">
				<upload-img :width="580" :height="300"  :bgsrc="cardFront"  @chooseimg="upload($event,1)">
				</upload-img>
				</view>
			 
				<view v-if="user.isDelete==2" class="flex-center-center " style="margin: 30rpx 40rpx 40rpx 20rpx;">
				<upload-img :width="580" :height="300"  :bgsrc="cardSide"  @chooseimg="upload($event,2)">
				</upload-img>
				</view>
				  <!-- <view class="flex-between-start mx40 " style="margin-top: 40rpx;background-color: #f4f4f4;">
					  <view class="fz24 mt30 pl20">
						  <view class="fw600">头像面</view>
						  <view class="mt30 fz20" style="color: #919191;">上传您的身份证头像面</view>
					  </view>
					  
					  
						<!-- <image src="/static/null/verified1.png"  style="width:300rpx;margin: 30rpx 10rpx;" mode="widthFix" /> -->
				
						
				  
				  
				 
				<!-- <view class="flex-between-start mx40 " style="margin-top: 40rpx;background-color: #f4f4f4;">
				 					  <view class="fz24 mt30 pl20">
				 						  <view class="fw600">国徽面</view>
				 						  <view class="mt30 fz20" style="color: #919191;">上传您的身份证国徽面</view>
				 					  </view>
				 						<image src="/static/null/verified2.png"  style="width:300rpx;margin: 30rpx 10rpx;" mode="widthFix" />
				 </view> -->
				 
				 
				 <view v-if="user.isDelete==2" class="ml20 mt40 fw400">
					 请完善个人信息
				 </view>
				 
				 <view  v-if="user.isDelete==2"  class="ml40 mt40 fw400 flex-start-center">
				 	 <image src="/static/null/verified3.png"  style="width: 35rpx;" mode="widthFix" /><text class="ml20">姓名</text>
				 </view>
				<view v-if="user.isDelete==2" class="ml40 mt10 fw400">
					 <input class="vinput" :disabled="user.isDelete==1" v-model="trueName"  style="width:90%;padding-left:0rpx;font-size: 28rpx;color: #000;" type="text" placeholder-style="color:#a1a1a1"  
									 maxlength="15" placeholder="请输入真实姓名" />
				</view>	 
				
				
				<view v-if="user.isDelete==2" class="ml40 mt50 fw400 flex-start-center">
				 	 <image src="/static/null/verified4.png"  style="width: 50rpx;" mode="widthFix" /><text class="ml20">证件号</text>
				 </view>
				<view v-if="user.isDelete==2" class="ml40 mt10 fw400 ">
					 <input :disabled="user.isDelete==1" v-model="idCard" class="vinput" style="width:90%;padding-left:0rpx;font-size: 28rpx;color: #000;" type="text" placeholder-style="color:#a1a1a1"  
									 maxlength="18" placeholder="请输入证件号" />
				</view>
				<view v-if="user.isDelete==2" class="ml20 mt40 fw400">
									请签名:
				</view>
				 
				<view v-if="user.isDelete==2" class="flex-column-center" style="margin: 50rpx 40rpx; height: 400rpx;background-color: #ffffff; ">
						 <l-signature disableScroll  ref="signatureRef" :penColor="penColor" :penSize="penSize" :openSmooth="openSmooth" ></l-signature>
						 
						 <view class="flex-between-center  " style="margin: 0rpx 40rpx;width: 100%;">
						 			 <view style="padding: 10rpx 20rpx;background-color: #858585;color: #ffffff;" @click="clear()">清空</view>
									  
						 									    <!-- <view style="padding: 10rpx 20rpx;background-color: #858585;color: #ffffff;" @click="onClick('undo')">撤消</view> -->
						 
						  </view>
				</view>
				
				 <view v-if="user.isDelete==2" class="flex-center-center mt40" style="">
				 					   
				 	 <view @click="submit" style="color: #fff;padding: 25rpx 240rpx;border-radius: 10rpx;background-color: #ad0907;" class=" fz28 text-align-c mt20">确认</view> 
				 </view>
				<view style="height: 30rpx;"></view>
					 
					 
				</view>
				
				
			   
		</view>
		
	
		
		<view class="mt50"></view>
	</view>
	 
</template>

<script>
	import narBarAndTop from 'pages/public/narBarAndTop.vue' 
	import uploadImg from '@/components/amazarashi-uploadimg/uploadImg.vue'
	import {
		filters
	} from '../../utils/formatWeek.js'
	export default {
		components: {
			narBarAndTop, uploadImg
		},
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 90,
				noClick: true,
				kong:'&ensp;',
				showup: 2,
				trueName: '',
				idCard: '',
				cardFront: '/static/null/face.png',
				cardSide: '/static/null/back.png',
				user: {},
				penColor: '#000',
				penSize: 5,
				url2: '',
				openSmooth: true,
				signature:'',
				productParam:{},
			};
		},
		onLoad() {
				this.getUser()
		},
		onUnload(){
			//uni.$off("lang");
		},
		onShow() {
			this.pageNum = 1
			//this.getList()
		},
		methods: {
			clear(){
			            this.$refs.signatureRef.clear()
			        },
		 onClick(type) {
		             if(type == 'openSmooth') {
		                 this.openSmooth = !this.openSmooth
		                 return
		             }
		            if (type == 'save') {
		                this.$refs.signatureRef.canvasToTempFilePath({
		                    success: (res) => {
		                        // 是否为空画板 无签名
		                        console.log(res.isEmpty)
		 											if(res.isEmpty)
		 											{
		 												uni.showToast({
		 													title: '请先签名！',
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
		 													 
		 														this.buy();
		 														
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
		                    }
		                })
		                return
		            }
		            if (this.$refs.signatureRef)
		                this.$refs.signatureRef[type]()
		        },
		 							
			 
			getUser() {
							this.$request.get({
								url: "/app/dreamUserInfo/getUser",
								success: rsp => {
									this.user = rsp.data
									console.log(this.user);
									if (this.user.isDelete == 1) {
										this.trueName = filters.formattedName(this.user.trueName)
										this.idCard = filters.hideCardCenter(this.user.idCard)
									}
									// this.user.isDelete = 2
								}
							})
						},
						toBack() {
							uni.navigateBack()
						},
						upload(e, type) {
							this.showup = 1
							console.log(e);
							
							let url = uni.getStorageSync('url')
							
							console.log('url',url);
							uni.uploadFile({
								url: url + '/Ali/upload',
								filePath: e.src,
								name: 'file',
								header: {
									token: uni.getStorageSync('token'),
								},
								success: res => {
									let data = JSON.parse(res.data);
									console.log(data);
									if (data.code == 200) {
										if (type == 1) {
											this.cardFront = data.data;
										}
										if (type == 2) {
											this.cardSide = data.data;
										}
										// if (type == 3) {
										// 	this.cardHandheld = data.data;
										// }
									}
									// 失败报错
									if (data.code == 500) {
										uni.showToast({
											title: '上传失败',
											icon: 'none'
										})
									}
									this.showup = 2
								}
							});
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
							if (this.cardFront ==
								'/static/null/face.png' ||
								this.cardSide == '/static/null/back.png'
								) {
								uni.showToast({
									title: '请检查身份证照片',
									icon: 'none'
								})
								return
							}
							if(this.trueName==null ||this.trueName=='')
							{
								uni.showToast({
									title: '请输入真实姓名',
									icon: 'none'
								})
								
								return;
							}
							 
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
				tijiao()
				{
				 
				 
					this.$request.post({
						url: "/app/userRealName/getIdCard",
						data: {
							trueName: this.trueName,
							idCard: this.idCard,
							cardFront: this.cardFront,
							cardSide: this.cardSide,
							signature:this.signature
						},
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