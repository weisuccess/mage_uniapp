<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'设置'"    @back="toBack()">
	     	    		 		 	
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
		<view class="flex-column-center  mx40" style="margin-top: -70rpx; letter-spacing: 2px;"> 
		        
			 	<view class="mt20" style="padding:20rpx 20rpx;width:calc(100% - 10px);background-color: #fff;border-radius: 8rpx;">
					 
					 <view class="flex-between-center fz22 px20" style="margin-top: 10rpx;border-bottom: 1px solid #bfbfbf; padding-bottom: 20rpx;">
					 	<view >头像</view>
					 	<view class="flex-center-center"> 
						 <image @click="upload()" :src="list.handlUrl"  style="width: 70rpx;height: 70rpx; border-radius: 45rpx;" mode="aspectFill" />
						  <uni-icons class="ml10" type="right" size="15"></uni-icons>
						</view>
					 </view>
					 
					 <view class="flex-between-center fz24 px20" style="margin-top: 40rpx;border-bottom: 1px solid #bfbfbf; padding-bottom: 20rpx;">
					 	<view>呢称</view>
					 	<view class="flex-center-center">{{list.nickName}}  <uni-icons class="ml10" type="right" size="15"></uni-icons></view>
					 </view>
					<view class="flex-between-center fz24 px20" style="margin-top: 40rpx;border-bottom: 1px solid #bfbfbf; padding-bottom: 20rpx;">
						<view>手机号</view>
						<view class="flex-center-center">{{list.telPhone}}   <uni-icons class="ml10" type="right" size="15"></uni-icons></view>
					</view>
					<view class="flex-between-center fz24 px20" style="margin-top: 40rpx;border-bottom: 1px solid #bfbfbf; padding-bottom: 20rpx;">
						<view>登录邮箱</view>
						<view class="flex-center-center">{{list.email}}   <uni-icons class="ml10" type="right" size="15"></uni-icons></view>
					</view>
					
					<view class="flex-between-center fz24 px20" style="margin-top: 40rpx;border-bottom: 1px solid #bfbfbf; padding-bottom: 20rpx;">
						<view>身份信息</view>
						<view class="flex-center-center" v-if="list.isDelete!=null">{{list.isDelete==1?'已实名认证':'未实名认证'}}  <uni-icons class="ml10" type="right" size="15"></uni-icons></view>
					</view>
					
					 
				 
				 <view @click="toPage('me/neweditPassword')" class="flex-between-center fz24 px20" style="margin-top: 40rpx;border-bottom: 1px solid #bfbfbf; padding-bottom: 20rpx;">
				 	<view  >重置登录密码</view>
				 	<view class="flex-center-center"><uni-icons class="ml10" type="right" size="15"></uni-icons></view>
				 </view>
				 
				 <view @click="toPage('me/newchangePwd')" class="flex-between-center fz24 px20" style="margin-top: 40rpx;border-bottom: 1px solid #bfbfbf; padding-bottom: 20rpx;">
				 	<view>重置交易密码</view>
				 	<view class="flex-center-center"><uni-icons class="ml10" type="right" size="15"></uni-icons></view>
				 </view>
				 <view @click="toPage('login/newsbgl')" class="flex-between-center fz24 px20" style="margin-top: 40rpx;border-bottom: 1px solid #bfbfbf; padding-bottom: 20rpx;">
				 	<view>设备管理</view>
				 	<view class="flex-center-center"><uni-icons class="ml10" type="right" size="15"></uni-icons></view>
				 </view>
				 
				 <view  class="flex-between-center fz24 px20" style="margin-top: 40rpx;border-bottom: 1px solid #bfbfbf; padding-bottom: 20rpx;">
				 	<view>当前版本</view>
				 	<view class="flex-center-center">
						v{{version}}
						<uni-icons class="ml10" type="right" size="15"></uni-icons></view>
				 </view>
				 <view class="flex-center-center mt40" style="">
				 					   
				 	 <view @click="logOut()" style="color: #fff;padding: 25rpx 220rpx;border-radius: 10rpx;background-color: #ad0907;" class=" fz28 text-align-c mt20">退出登录</view> 
				 </view>
				 <view style="margin-top: 160rpx;"></view>
					 
					 
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
				kong:'&ensp;',
				piclist: [
					 
				],
				zilist:[
					
				],
				loginInfo:{},
				pageNum: 1,
				pageSize: 10,
				total: 0,
				myLevel:0,
				list:[
				  {name:"dsfsdfa500",price:"6885.25",growrate:"-0.55"},
				 {name:"dsfsdfa500",price:"6885.25",growrate:"-0.55"},
				 {name:"dsfsdfa500",price:"6885.25",growrate:"-0.55"}
					
				],
				user:{},
				version:'1.0.0',
			};
		},
		onLoad() {
			 //this.getUser();
			 // #ifdef APP
			  this.checkVer();
			 // #endif
		},
		onUnload(){
			//uni.$off("lang");
		},
		onShow() {
			this.getList()
		},
		methods: {
			
			upload() {
				let url = uni.getStorageSync('url')
				uni.chooseImage({
					count: 1,
					success: chooseImageRes => {
						console.log('成功', chooseImageRes);
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.showLoading({
							title: '上传头像中···',
							mask: true
						})
						uni.uploadFile({
							url: url + '/Ali/upload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								token: uni.getStorageSync('token'),
							},
							success: res => {
								let data = JSON.parse(res.data);
								console.log(data);
								if (data.code == 200) {
									this.list.handlUrl = data.data;
									this.edit(this.list.handlUrl)
									uni.hideLoading()
								}
								// 失败报错
								if (data.code == 500 || data.status == 500) {
									uni.showToast({
										title: '上传失败',
										icon: 'none'
									})
									uni.hideLoading()
								}
							},
							fail: rsp => {
								uni.hideLoading()
							}
						});
					},
					fail: err => {
						uni.hideLoading()
					}
				});
			
			},
			
			
		 checkVer()
		 {
		 	plus.runtime.getProperty(plus.runtime.appid,(inf) => {
		 	 	this.version = inf.version;
		 	 });		
		 		 
		 },
			getList() {
							this.$request.get({
								url: "/app/dreamUserInfo/getUser",
								success: rsp => {
									this.list = rsp.data
									console.log(this.list);
									uni.setStorageSync('getUser', rsp.data)
								},
							})
						},
						editName() {
							uni.navigateTo({
								url: '/pages/me/editName'
							})
						},
						upload() {
							let url = uni.getStorageSync('url')
							uni.chooseImage({
								count: 1,
								success: chooseImageRes => {
									console.log('成功', chooseImageRes);
									const tempFilePaths = chooseImageRes.tempFilePaths;
									uni.showLoading({
										title: '上传头像中···',
										mask: true
									})
									uni.uploadFile({
										url: url + '/Ali/upload', //仅为示例，非真实的接口地址
										filePath: tempFilePaths[0],
										name: 'file',
										header: {
											token: uni.getStorageSync('token'),
										},
										success: res => {
											let data = JSON.parse(res.data);
											console.log(data);
											if (data.code == 200) {
												this.list.handlUrl = data.data;
												this.edit(this.list.handlUrl)
												uni.hideLoading()
											}
											// 失败报错
											if (data.code == 500 || data.status == 500) {
												uni.showToast({
													title: '上传失败',
													icon: 'none'
												})
												uni.hideLoading()
											}
										},
										fail: rsp => {
											uni.hideLoading()
										}
									});
								},
								fail: err => {
									uni.hideLoading()
								}
							});
			
						},
						edit(url) {
							this.$request.get({
								url: '/app/dreamUserInfo/updateUserInformation',
								data: {
									nickName: '',
									handlUrl: this.list.handlUrl,
								},
								success: rsp => {
									uni.showToast({
										title: rsp.message,
										icon: 'none'
									})
									return
									if (rsp.code == 200) {
										this.getList();
									}
								}
							})
						},
						circuit() {
							uni.navigateTo({
								url: '/pages/login/circuit'
							})
						},
						toChangePwd() {
							uni.navigateTo({
								url: '/pages/my/changePwd'
							})
						},
						toChangePwd2() {
							uni.navigateTo({
								url: '/pages/login/editPassword'
							})
						},
						toUserCard() {
							// if (this.list.isDelete == 2) {
							uni.navigateTo({
								url: '/pages/me/verified'
							})
							// } else {
							// 	uni.showToast({
							// 		title: '已经实名过了',
							// 		icon: 'none'
							// 	})
							// }
						},
						toPage(path, type) {
							// if (path == 'jifen' || path == 'choujiang') {
							// 	uni.navigateTo({
							// 		url: './dingdan?name=' + path
							// 	})
							// 	return
							// }
							// if (path == 'suipian') {
							// 	uni.navigateTo({
							// 		url: '/pages/home/dhjl?type=' + type
							// 	})
							// 	return
							// }
							uni.navigateTo({
								url: '/pages/' + path
							})
						},
						// bankList() {
						// 	uni.navigateTo({
						// 		url: './bankList'
						// 	})
						// },
						// yhList() {
						// 	uni.navigateTo({
						// 		url: './yhkDetail'
						// 	})
						// },
						toBack() {
							this.goBack();
						},
						logOut() {
								 
								
							uni.setStorageSync('token', -1);
							uni.setStorageSync('bottomId', "1");
							
							const loginmode=uni.getStorageSync('loginMode')
							
							
							var path='/pages/login/newlogin';
						 
							 
							if(loginmode=='email')
								path='/pages/login/newemaillogin';
							else if(loginmode=='phone')
								path='/pages/login/newlogin';
							 
						 
							uni.reLaunch({
								url: path
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