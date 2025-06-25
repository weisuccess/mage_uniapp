<template>
	<view>
		<view class="top1" style="width:100%;height: 100vh;overflow-x:hidden;overflow-y:auto;">
			<image src="/static/check.png" mode="widthFix" @click="again"
				style="width: 100rpx;height: 100rpx;position: fixed;top: 100rpx;right: 50rpx;z-index: 99;"></image>
			<view class="vcenter" style="margin-top: 23vh;">
				<!-- <image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737112502817LOGO1.png" mode="widthFix"
					style="width: 200rpx;height: 200rpx;"></image> -->
			</view>
			<view class="loginbox">
				<view class="vcenter" style="width:100%;">
					<view style="width: calc( 100% - 50rpx );margin:0px auto;">
						<view class="vformitem">
							<view class="vformtitle" style="padding: 0 40rpx;">
								<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1745854666257phone.png" style="width: 40rpx;height: 40rpx;"></image>
								<input class="vinput" style="border: none;" type="text" v-model="loginInfo.telPhone"
									maxlength="11" :placeholder="getLg('请输入UBI账户')" />
							</view>
						</view>
						<view class="vsplit"></view>
						<view class="vformitem">
							<view class="vformtitle" style="padding: 0 40rpx;">
								<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1745854625568password.png" style="width: 30rpx;height: 30rpx;"></image>
								<view class="vcenter vinput" style="width:100%;display: flex;border: none;">
									<view style="width:88%;height:100%;">
										<input :type="showPassword ? 'text' : 'password'" v-model="loginInfo.password"
											placeholder="请输入密码"
											style="border: none;height: 100%;text-transform: none;font-size: 28rpx;letter-spacing: 5rpx;color:#0B0B0B;background: none;" />
									</view>
									<view class="eye-icon" @click="togglePasswordVisibility">
										<uni-icons type="eye" size="20" color="#666" v-if="!showPassword"></uni-icons>
										<uni-icons type="eye-filled" size="20" color="#666" v-else></uni-icons>
									</view>
								</view>
							</view>
						</view>
						<view class="flex-between-center lh100 px20">
							<view class="" @click="kefu">联系我们</view>
							<view class="" @click="find">忘记密码?</view>
						</view>
						<view class="vsplit"></view>
						
					</view>
				</view>
				<!-- <view class="vcenter" style="width:100%;color: #460A0B;font-size: 25rpx;">
					<view style="padding: 20rpx" @click="kefu">联系我们</view>
					<view>|</view>
					<view style="padding: 20rpx" @click="kefu">忘记密码？</view>
				</view> -->
				
			</view>
			<view class="" style="position: fixed;bottom: 100rpx;width: 100%;">
				<view class="vformbutton" style="width: 90%;margin:0 5%;position: relative;">
					<button @click.stop="$noMultipleClicks(login,'valiForm')" :loading="btnSet.loading"
						:disabled="btnSet.disabled" class="lh100 color-fff" style="background: url('/static/login/login-dlbtn.png') no-repeat;background-size: 100% 100%;
						font-weight: bold;font-size: 32rpx;">{{btnSet.logintxt}}</button>
				</view>
				
				<view class="vformbutton " style="width: 90%;margin:20rpx 5%;">
					<button @click="toReg()" class="fw700 color-000 fz32 lh100" style="background: #ddd;border-radius: 20rpx;">立即注册</button>
				</view>
				<view class="vcenter" style="width:100%;">
					<view class="vcenter checkbox">
						<view class="vcenter">
							<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737137067700check.png"
								mode="aspectFit" style="width:36rpx;height: 36rpx;" v-if="!isck"
								@click="checkboxChange"></image>
							<image
								src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1745854089500sel.png"
								mode="aspectFit" style="width:36rpx;height: 36rpx;" v-if="isck"
								@click="checkboxChange"></image>
						</view>
						<view class="vcenter" style="margin-left: 10rpx;">
							<text @click="checkboxChange">{{getLg("我已阅读并同意")}}</text>
							<text class="color-33CC33" @click="toXieyi()">《{{getLg("用户协议")}}》</text>
							<text>和</text>
							<text class="color-33CC33" @click="toYinsi()">《{{getLg("隐私协议")}}》</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view style="position: fixed;top: 50rpx;right: 30rpx;display: flex;align-items: center;color: #fff;"
			@click="kefu">
			<image src="/static/login/kefu.png" style="width: 40rpx;height: 40rpx;margin: 0 10rpx;"></image>
			专属客服
		</view> -->
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	import APPUpdate, {
		getCurrentNo
	} from '@/uni_modules/zhouWei-APPUpdate/js_sdk/appUpdate';
	import request from '../../utils/request1.js';
	// #endif

	function getRandomElement(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}
	export default {
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				noClick: true,
				fDiv: 0,
				logo: "/static/login/logo.png",
				logo2: "",
				loginInfo: {
					password: "",
					telPhone: ""
				},
				qlList: {},
				code: '',
				yz: '',
				showPassword: false,
				btnSet: {
					loading: false,
					disabled: false,
					logintxt: "立即登录"
				},
				isck: true,
				checked_: false,
				cc: "cc",
				checked__: true,
				cc2: "cc2",
				versiontop: "",
				versioncode: "",
				versionurl: "",
				oldVersioncode: "",
				nArr: "",
				oArr: "",
				autoLogin: 2,
				timer: null,
				cCount: 0,
				cCount2: 0,
				loginLock: 2,
				timer10: "",
				timer11: "",
				cCount3: 0,
				errT: 0,
				errOk: 0,
				get_code_time: 60,
				get_code_text: "获取验证码",
				get_code_status: false
			}
		},
		onLoad(option) {
			this.generate()
		},
		onShow() {},
		methods: {
			again() {
				if (!uni.getStorageSync('index')) {
					uni.setStorage({
						key: 'index',
						data: 0
					})
				}
				let url1 = ''
				let indexUrl = uni.getStorageSync('index')
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
										console.log("arr!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
											arr)
										let urls = ''
										for (var i = index; i < arr.length; i++) {
											console.log(arr[i]);
											urls = arr[i]
										}
										console.log("urls!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
											urls)
										url1 = urls.trim()
										console.log("url1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
											url1)
										uni.hideLoading()
										// 初始化请求配置
										request.setConfig({
											url: url1,
										});

										uni.setStorage({
											key: 'url',
											data: url1
										})
										plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
											console.log(widgetInfo);
											uni.request({
												url: url1 + '/app/versionHistory/query', //仅为示例，并非真实接口地址。
												success: (res) => {
													console.log(res);
													console.log(res.data.data.version, '版本号', widgetInfo.version);
													if (res.data.data.version != widgetInfo.version) {
														console.log('版本号不同', res.data.data);
														uni.request({
															url: url1 +
																'/app/versionHistory/getSysConfig', //仅为示例，并非真实接口地址。
															success: (res1) => {
																console.log(res1, 'getSysConfig');
																let arr = res1.data.data
																console.log(arr);
																uni.navigateTo({
																	url: '/pages/webview/webview3?url=' +
																		arr[0].configValue
																})
															}
														});
													}
												}
											});
										});

										console.log(url1,
											'1111111111111111111111111111111');
									}
								});
							}, function(e) {
								console.log("Resolve file URL failed: " + e.message);
							});
						}
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
			toReg() {
				if (this.isck == false) {
					uni.showToast({
						title: this.getLg("请阅读并同意《用户协议》和《隐私政策》"),
						icon: 'none',
						duration: 2000,
						mask: true
					});
				} else {
					uni.navigateTo({
						url: './reg'
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
			login() {
				if (!this.loginInfo.telPhone) {
					uni.showToast({
						title: "请输入手机号码",
						icon: 'none',
						mask: true
					});
					return;
				}

				// const regCheck = /^1\d{10}$/;
				// if (!regCheck.test(this.loginInfo.telPhone)) {
				// 	uni.showToast({
				// 		title: "请输入正确的手机号码",
				// 		icon: 'none',
				// 		mask: true
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

				// if (this.yz != this.code) {
				// 	uni.showToast({
				// 		title: "验证码输入不正确",
				// 		icon: 'none',
				// 		mask: true
				// 	});
				// 	return;
				// }

				if (this.isck == false) {
					uni.showToast({
						title: "请阅读并同意《用户协议》和《隐私政策》",
						icon: 'none',
						mask: true
					});
					return;
				}
				this.btnSet = {
					loading: true,
					disabled: true,
					logintxt: "登录中..."
				};

				this.$request.get({
					url: "/app/dreamUserInfo/login",
					data: this.loginInfo,
					success: rsp => {
						console.log(rsp);

						this.$forceUpdate()
						if (rsp.code == 200) {
							uni.setStorageSync('token', rsp.data.token)
							uni.showToast({
								title: "登录成功",
								icon: 'none',
								mask: true
							});
							setTimeout(() => {
								uni.reLaunch({
									url: '../home/index'
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
		}
	}
</script>

<style>
	.top1 {
		background: url('/static/bg.png') no-repeat;
		background-size: 100% 100%
	}

	page {
		background-color: #FFFFFF;
	}

	.loginbox {
		margin: 0rpx 30rpx;
		/* margin-top: 80rpx; */
		border-radius: 30rpx;
		padding-top: 60rpx;
	}

	.vformitem {
		background: url('/static/box.png') no-repeat;
		background-size: 100% 100%;
		border-radius: 15rpx;
		/* padding: 0 40rpx; */
	}

	.box_12 {
		margin-top: 72rpx;
		margin-bottom: 120rpx;
	}

	.text-wrapper_1 {
		overflow-wrap: break-word;
		font-size: 0;
		font-family: HarmonyOS Sans SC-Regular;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
	}

	.text_1 {
		overflow-wrap: break-word;
		color: rgba(47, 248, 234, 1);
		font-size: 48rpx;
		letter-spacing: 55rpx;
		font-family: HarmonyOS Sans SC-Regular;
		font-weight: normal;
		text-align: left;
		white-space: nowrap;
	}

	.text_2 {
		overflow-wrap: break-word;
		color: rgba(47, 248, 234, 1);
		font-size: 32rpx;
		letter-spacing: 55rpx;
		font-family: HarmonyOS Sans SC-Regular;
		font-weight: normal;
		text-align: left;
	}

	.text_3 {
		overflow-wrap: break-word;
		color: rgba(47, 248, 234, 1);
		font-size: 32rpx;
		font-family: HarmonyOS Sans SC-Regular;
		text-decoration: underline;
		font-weight: normal;
		text-align: left;
	}


	.smscode {
		line-height: 108rpx;
		background-color: transparent !important;
		font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
		font-weight: 300;
		font-size: 28rpx;
		color: #51FAFC;
		text-decoration-line: underline;
		white-space: nowrap;
	}

	.smscode[disabled='true'] {
		background: transparent !important;
		color: grey !important;
	}

	.select-country-zone {
		display: inline-block;
		float: left;
		font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
		font-weight: 500;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 108rpx;
		text-align: center;
		font-style: normal;
		text-transform: none;
		width: 100rpx;
	}

	.checkbox {
		margin-top: 20rpx;
		width: 100%;
		font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
		font-weight: 300;
		font-size: 24rpx;
		color: #000;
		line-height: 36rpx;
		text-align: left;
		font-style: normal;
		text-transform: none;
	}

	button:after {
		border: none;
	}
</style>