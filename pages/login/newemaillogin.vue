<template>
	
	<view class="content">
		<!-- <view style="width: 100vw;display: flex; justify-content: end; align-items: flex-end; ">
			 <view class="topbg"></view>
		</view> -->
		 <!-- <narBar :background="'#092d9b'" title="aaa"  @back="toBack()"></narBar> -->
		<view style="height: var(--status-bar-height);width: 100%;"></view>
		 <!-- <view style="height:120rpx;width: 100%;"></view> -->
 
		<view class="k">
			
			<view class="flex-column-center-center " style="margin-top: 90rpx;">
				<image src="/static/null/074e2e93a28d5ea2d8c7e3856d204c3667fd395343b160-dqQaU0.png"
				style="width: 400rpx;" mode="widthFix">
				</image>
			</view>
			
				 <view class="flex-center-center mt40" style="">
				 	<view @click="toLogin()" class="flex-center-center fz26" style="background-color:#f0f0f0 ;border-radius:50rpx;">
						<view style="  color:#000;padding: 15rpx 60rpx; ">手机登录</view>
				 		<view style="padding: 15rpx 60rpx;color:#fff;background-color:#bf1609 ;border-radius: 50rpx;" class="py30">邮箱登录</view>
				 		
				 	</view>
				 </view>
				<view class="flex-column-start-center" style="font-family: 'OPPOSans';width:100vw;margin-top: 40rpx;" >
					<view class="" style="width:calc(100vw - 76px)">
						<view class="flex-row-around-center"><image src="/static/null/email.png"	style="width: 30rpx;" mode="widthFix" />
				              <text class="ml20 fw600 fz26">邮箱</text>
						</view>
						<view>
							
							<input class="vinput" style="width:90%;padding-left:0rpx;font-size: 26rpx;color: #000;" type="text" placeholder-style="color:#a1a1a1" v-model="loginInfo.email"
									 maxlength="30" placeholder="请输入邮箱号" />
						</view>
						
						<view class="mt40 flex-row-around-center"><image src="/static/null/lock.png"	style="width: 28rpx;" mode="widthFix" />
						      <text class="ml20 fw600 fz26" style="font-family: 'OPPOSans';">密码</text>
						</view>
						<view>
							
							<input class="vinput" style="width:90%;padding-left:0rpx;font-size: 26rpx;color: #000;" type="password" placeholder-style="color:#a1a1a1" v-model="loginInfo.password"
									 maxlength="15" placeholder="请输入密码" />
						</view>
					</view>
					<view class="color-fff fz26" @click="versionLogin()" style="font-family: 'OPPOSans';background-color: #dd322a;border-radius: 50rpx;padding: 20rpx 180rpx;margin-top: 140rpx;">
						登录
					</view> 
					
					<view class=" fz26 " @click="toemailReg()" style="font-family: 'OPPOSans';color:#000;background-color: #f7f1f1;border-radius: 50rpx;padding: 20rpx 180rpx;margin-top: 40rpx;">
						注册
					</view> 
					<view class="mt30"></view>
					 
					 
					 
					</view>
				</view>
		</view>
	</view>
	 
</template>

<script>
	import narBar from 'pages/public/narBar.vue' 
	import common from '@/utils/common.js'
	export default {
		components: {
			narBar, 
		},
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 90,
				noClick: true,
				piclist: [
					 
				],
				zilist:[
					
				],
				loginInfo:{},
				pageNum: 1,
				pageSize: 10,
				total: 0,
				myLevel:0,
				user:{},
				rate:'0%',
			};
		},
		onLoad(option) {
								
					console.log('>>>>>',uni.getStorageSync('password'));			
					this.loginInfo.email=uni.getStorageSync('email')
					this.loginInfo.password=uni.getStorageSync('password')
					
				 
					this.generate()
				},
				onShow() {},
				methods: {
					toLogin(){
						uni.redirectTo({
							url: '../login/newlogin'
						})
					},
					again() {
						if (!uni.getStorageSync('index')) {
							uni.setStorage({
								key: 'index',
								data: 0
							})
						}
						let url1 = ''
						let indexUrl = uni.getStorageSync('index')
						// let askIndex = uni.getStorageSync('askIndex')
						// console.log(askIndex);
						// if (askIndex >= 1) {
						// 	setTimeout(() => {
						// 		uni.setStorage({
						// 			key: 'askIndex',
						// 			data: 0
						// 		})
						// 		uni.setStorage({
						// 			key: 'askIndex',
						// 			data: 0
						// 		})
						// 		uni.removeStorageSync('askIndex')
						// 		plus.runtime.restart();
						// 	}, 1000)
						// 	return
						// }
						// askIndex += 1
						// uni.setStorage({
						// 	key: 'askIndex',
						// 	data: askIndex
						// })
						indexUrl += 1
						uni.setStorage({
							key: 'index',
							data: indexUrl
						})
						console.log('indexUrl', indexUrl);
						uni.downloadFile({
							url: 'https://ubi-addr1.oss-cn-hongkong.aliyuncs.com/ubiV1.png?s=' + Math.floor(Math
								.random() *
								10) + 1, // 替换为实际的文件下载链接
							success: function(res) {
								if (res.statusCode === 200) {
									// 下载成功，‌res.tempFilePath 包含临时文件路径
									console.log('下载成功:', res);
									plus.io.resolveLocalFileSystemURL(res.tempFilePath, function(entry) {
										entry.file(function(file) {
											var fileReader = new plus.io.FileReader();
											fileReader.readAsText(file, 'utf-8');
											fileReader.onloadend = function(evt) {
												let data = evt.target.result.split(",");
												console.log(data);
												// let urls = getRandomElement(atob(data[1]).split("|"))
												let newUrl = atob(data[1])
												let arr = newUrl.split("|")
												let index = uni.getStorageSync('index')
												console.log(index);
												if (index >= arr.length - 1) {
													uni.setStorage({
														key: 'index',
														data: 0
													})
													index = 0
												}
												let urls = ''
												for (var i = index; i < arr.length; i++) {
													console.log(arr[i]);
													urls = arr[i]
												}
												url1 = urls.trim()
												uni.hideLoading()
												// 初始化请求配置
												request.setConfig({
													url: url1,
												});
		
												uni.setStorage({
													key: 'url',
													data: url1
												})
												uni.showToast({
													title: '加载成功',
													icon: 'none'
												})
												console.log(url1,'1111111111111111111111111111111');
											}
										});
									}, function(e) {
										console.log("Resolve file URL failed: " + e.message);
									});
								}
							},
							complete: (e) => {
								if (e.statusCode != 200) {
									uni.showToast({
										title: '加载失败',
										icon: 'none'
									})
								}
								console.log(e);
							}
						})
					},
					find() {
						// uni.navigateTo({
						// 	url: '/pages/login/findPwd'
						// })
						this.$request.get({
							url: "/app/customerInfo/getCustomerList",
							success: rsp => {
								uni.navigateTo({
									url: '/pages/webview/webview2?url=' + rsp.data[0].customerUrl
								})
							}
						})
					},
					kefu() {
						// this.$request.get({
						// 	url: "/app/officialGroup/query",
						// 	success: rsp => {
						// 		this.qlList = rsp.data
						// 		uni.navigateTo({
						// 			url: '/pages/webview/webview2?url=' + this.qlList.officialImage
						// 		})
						// 		console.log(this.qlList);
						// 	}
						// })
						this.$request.get({
							url: "/app/customerInfo/getCustomerList",
							success: rsp => {
								uni.navigateTo({
									url: '/pages/webview/webview2?url=' + rsp.data[0].customerUrl
								})
							}
						})
					},
		
					togglePasswordVisibility() {
						this.showPassword = !this.showPassword
					},
					generate() {
						const min = 1000; // 最小四位数
						const max = 9999; // 最大四位数
						this.yz = Math.floor(Math.random() * (max - min + 1)) + min;
						this.code = ''
					},
					showLogin() {
						if (this.checked__ == false) {
							uni.showToast({
								title: this.getLg("请阅读并同意《用户协议》和《隐私政策》"),
								icon: 'none',
								mask: true
							});
						} else {
							this.fDiv = 0;
						}
		
					},
					// onAPPUpdate() {
					// 	// true 没有新版本的时候有提示，默认：false
					// 	APPUpdate(true);
					// },
					toXieyi() {
						uni.navigateTo({
							url: '../login/agreement?id=1'
						})
					},
					toXieyi() {
						uni.navigateTo({
							url: '/pages/home/zxxt/text?name=' + '服务协议'
						})
					},
					toYinsi() {
						uni.navigateTo({
							url: '/pages/home/zxxt/text?name=' + '隐私政策'
						})
					},
					toemailReg() {
						if (this.isck == false) {
							uni.showToast({
								title: this.getLg("请阅读并同意《用户协议》和《隐私政策》"),
								icon: 'none',
								duration: 2000,
								mask: true
							});
						} else {
							uni.navigateTo({
								url: './newemailreg',
								animationType: 'slide-in-bottom',
								 animationDuration: 500
							})
						}
					},
					checkboxChange: function() {
						if (this.isck) {
							this.isck = false;
						} else {
							this.isck = true;
						}
					},
					clearTimer() {
						this.autoLogin = 2;
						clearInterval(this.timer);
					},
					setType(v) {
						this.loginInfo.type = v;
					},
					versionLogin() {
						let url = uni.getStorageSync('url')
						console.log(url);
						let that = this
						that.login()
						return;
						plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
							console.log(widgetInfo);
							uni.request({
								url: url + '/app/versionHistory/query', //仅为示例，并非真实接口地址。
								success: (res) => {
									console.log(res);
									console.log(res.data.data.version, '版本号', widgetInfo.version);
									if (res.data.data.version != widgetInfo.version) {
										console.log('版本号不同', res.data.data);
										uni.request({
											url: url +
												'/app/versionHistory/getSysConfig', //仅为示例，并非真实接口地址。
											success: (res1) => {
												console.log(res1, 'getSysConfig');
												let arr = res1.data.data
												console.log(arr);
												uni.reLaunch({
													url: '/pages/webview/webview3?url=' +
														arr[0].configValue
												})
											}
										});
									} else {
										that.login()
									}
								},
								fail:(e)=>{
									console.log(e);
									
									uni.showModal({
										title: '提示',
										content: '网络异常',
										confirmText: '重新加载',
										success: function(res) {
											if (res.confirm) {
												console.log('用户点击确定');
												uni.setStorage({
													key: 'index',
													data: 0
												})
												uni.removeStorageSync('url')
												plus.runtime.restart();
											} else if (res.cancel) {
												console.log('用户点击取消');
											}
										}
									});
								}
							});
						});
					},
					login() {
						console.log('denglu');
						if (!this.loginInfo.email) {
							uni.showToast({
								title: "邮箱",
								icon: 'none',
								mask: true
							});
							return;
						}
						if(!common.checkEmail(this.loginInfo.email))
						{
							uni.showToast({
								title: this.getLg("请输入正确邮箱"),
								icon: 'none',
								duration: 2000
							});
							return false;
						}
						// if (!regCheck.test(this.loginInfo.telPhone)) {
						// 	uni.showToast({
						// 		title: this.getLg("请输入正确的手机号码"),
						// 		icon: 'none',
						// 		duration: 2000
						// 	});
						// 	return false;
						// }
						 
						if (!this.loginInfo.password) {
							uni.showToast({
								title: "请输入密码",
								icon: 'none',
								mask: true
							});
							return;
						}
						if (this.isck == false) {
							uni.showToast({
								title: "请阅读并同意《用户协议》和《隐私政策》",
								icon: 'none',
								mask: true
							});
							return;
						}
						// this.btnSet = {
						// 	loading: true,
						// 	disabled: true,
						// 	logintxt: "登录中..."
						// };
						
						
						this.$request.get({
							url: "/app/dreamUserInfo/emaillogin",
							data: this.loginInfo,
							success: rsp => {
								console.log(rsp);
								
							 
								this.$forceUpdate()
								if (rsp.code == 200) {
								 
									uni.setStorageSync('email', this.loginInfo.email)
									uni.setStorageSync('password', this.loginInfo.passWord )
									
									uni.setStorageSync('loginMode','email')
									 
									uni.setStorageSync('userid',rsp.data.id)
									uni.setStorageSync('nickName',rsp.data.nickName)
									uni.setStorageSync('avatar',rsp.data.handlUrl)
									uni.setStorageSync('token', rsp.data.token)
									
									
									uni.showToast({
										title: "登录成功",
										icon: 'none',
										mask: true
									});
									setTimeout(() => {
										uni.reLaunch({
											url: '../home/newindex'
										})
									}, 1500)
									// res.data = JSON.parse(this.decrypt(res.data));
								} else {
									this.btnSet = {
										loading: false,
										disabled: false,
										logintxt: "登录"
									};
		
									uni.showToast({
										title: rsp.message,
										icon: 'none',
										mask: true
									});
								}
								this.btnSet = {
									loading: false,
									disabled: false,
									logintxt: "登录"
								};
		
								// if (res.data.status == 0) {
								// 	uni.showToast({
								// 		title: this.getLg("请稍等一下,服务器正在处理!"),
								// 		icon: 'none',
								// 		duration: 2000
								// 	});
								// } else if (res.data.status == 10) {
								// 	uni.showToast({
								// 		title: this.getLg("账户已被冻结,请联系客服!"),
								// 		icon: 'none',
								// 		duration: 2000
								// 	});
								// } else if (res.data.status == 11) {
								// 	uni.showToast({
								// 		title: this.getLg("密码错误"),
								// 		icon: 'none',
								// 		duration: 2000
								// 	});
								// } else if (res.data.status == 12) {
								// 	uni.showToast({
								// 		title: this.getLg("用户名不存在!"),
								// 		icon: 'none',
								// 		duration: 2000
								// 	});
								// }
		
							}
						})
					}
				},
		 
	};
</script>
 
<style lang="scss" scoped>
	
	page {
		 font-family: 'OPPOSans';
			background-color: #ffffff;
			 height: 100vh;
			  overflow: auto;
		}
		 
	.content {
		// background-image:  url('https://vp09029.oss-cn-hongkong.aliyuncs.com/vgui/viplevelbg.png') ;
		background-image:  url('/static/null/login0.png') ;
	    background-color: #ffffff;
		  background-repeat: no-repeat;
		// background-size:cover;
	 
		background-size: 100% auto;
		width:100vw;
		height: 100vh;
		  // height: 600rpx;
		// top: 0;
		// left:0;
		  // z-index:0;
		  // position: absolute;
		  
		 
		  
	 
	}
	.k {
		 
		// background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744290610523bg.png') no-repeat;
		
		 
		 
		width: 100%;
		// background-color: #ffffff;
		background-size: 100% auto;
		// background-color: #f1f1f1;
		  display: flex;
		  flex-direction: column;
		// padding-bottom: 60rpx;
		// margin: 60rpx 2.5%;k
	
	}
	.topbg{
	 
		background-image:  url('/static/null/login0.png') ;
	   
	   width: 450rpx; /* 容器的宽度 */
	    height: 250rpx; /* 容器的高度 */
	  
	    background-size: cover; /* 背景图片覆盖整个容器 */
	    // background-position: right top; /* 图片在容器的右侧和垂直居中 */
		background-size: 100% 100%;
	 //   // z-index:0;
		// background-size: 100% 100%;
		// background-size:cover;
		// // height: 100rpx;
		// margin-top: 160rpx;
		// padding: 0;
		  
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