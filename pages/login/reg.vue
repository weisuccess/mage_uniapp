<template>
	<view>
		<view class="top1">
			<narBar :title="getLg('')" @back="toBack()" background="transparent"></narBar>
			<scroll-view style="height: 62vh;margin-top: 20vh;" scroll-y="">
				<view class="vcenter" style="width:80%;
					background-size: 100% 100%; margin: 0 5% 0;border-radius: 30rpx;padding: 0 5%;">
					<view class="vform w100">
						<view class="vformitem">
							<view class="vformtitle" style="padding: 0 40rpx;">
								<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1745854666257phone.png" style="width: 40rpx;height: 40rpx;"></image>
								<picker mode="selector" :range="ph" :value="phindex" @change="changePh">
									<view class="flex-start-center">
										<view>{{ph[phindex]}}</view>
										<uni-icons type="down"></uni-icons>
									</view>

								</picker>
								<input class="vinput" style="border: none;" type="text" v-model="regInfo.telPhone"
									maxlength="11" :placeholder="getLg('请输入手机号')" />
							</view>
						</view>
						<view class="vformitem">
							<view class="vformtitle" style="padding: 0 40rpx;">
								<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1745854625568password.png" style="width: 40rpx;height: 40rpx;"></image>
								<view class="vcenter vinput" style="width:100%;display: flex;border: none;">
									<view style="width:88%;height:100%">
										<input :type="showPassword ? 'text' : 'password'" v-model="regInfo.passWord"
											placeholder="设置登录密码"
											style="border: none;height: 100%;text-transform: none;font-size: 28rpx;letter-spacing: 5rpx;color:#0B0B0B;background: none;" />
									</view>
									<view class="eye-icon" @click="togglePasswordVisibility">
										<uni-icons type="eye" size="20" color="#666" v-if="!showPassword"></uni-icons>
										<uni-icons type="eye-filled" size="20" color="#666" v-else></uni-icons>
									</view>
								</view>
							</view>
						</view>
						<view class="vformitem">
							<view class="vformtitle" style="padding: 0 40rpx;">
								<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1745854625568password.png" style="width: 40rpx;height: 40rpx;"></image>
								<view class="vcenter vinput" style="width:100%;display: flex;border: none;">
									<view style="width:88%;height:100%">
										<input :type="showPassword ? 'text' : 'password'" v-model="regInfo.mpPassword"
											placeholder="确认登陆密码"
											style="border: none;height: 100%;text-transform: none;font-size: 28rpx;letter-spacing: 5rpx;color:#0B0B0B;background: none;" />
									</view>
									<view class="eye-icon" @click="togglePasswordVisibility">
										<uni-icons type="eye" size="20" color="#666" v-if="!showPassword"></uni-icons>
										<uni-icons type="eye-filled" size="20" color="#666" v-else></uni-icons>
									</view>
								</view>
							</view>
						</view>
						<view class="vformitem">
							<view class="vformtitle" style="padding: 0 40rpx;">
								<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1745854625568password.png" style="width: 40rpx;height: 40rpx;"></image>
								<input class="vinput" style="border: none;" type="number" v-model="regInfo.payPassword"
									maxlength="6" :placeholder="getLg('设置交易密码')" />
							</view>
						</view>
						<view class="vformitem">
							<view class="vformtitle" style="padding: 0 40rpx;">
								<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1745854529154yqm.png" style="width: 40rpx;height: 40rpx;"></image>
								<input class="vinput" style="border: none;" type="text"
									v-model="regInfo.acceptInviteCode" :placeholder="getLg('请输入邀请码')" />
							</view>
						</view>
						<view class="vformbutton lh100" style="width:95%;margin:50rpx 2.5%;">
							<button @click="reg()" :loading="btnSet.loading" :disabled="btnSet.disabled" style="background: url('/static/login/login-dlbtn.png') no-repeat;background-size: 100% 100%;
								font-weight: bold;font-size: 32rpx;color: #fff;">{{btnSet.btntxt}}</button>
						</view>
						<view class="line">已有账号？<text class="border-bottom" @click="loginBack()">去登录</text></view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="" style="position: fixed;bottom: 100rpx;width: 100%;">
			<view class="vcenter fz26" style="width:100%;">
				<view class="vcenter checkbox">
					<view class="vcenter">
						<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737137067700check.png"
							mode="aspectFit" style="width:36rpx;height: 36rpx;" v-if="!isck" @click="checkboxChange">
						</image>
						<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1745854089500sel.png"
							mode="aspectFit" style="width:36rpx;height: 36rpx;" v-if="isck" @click="checkboxChange">
						</image>
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
</template>

<script>
	import narBar from 'pages/public/narBar.vue'
	export default {
		components: {
			narBar
		},
		data() {
			return {
				ph: ['+86', '+852', '+853'],
				phindex: 0,
				regInfo: {
					acceptInviteCode: "",
					mpPassword: "",
					nickName: "",
					passWord: "",
					payPassword: "",
					telPhone: ""
				},
				showPassword: false,
				showPassword2: false,
				btnSet: {
					loading: false,
					disabled: false,
					btntxt: "立即注册"
				},
				qlList: {},
				isck: true,
			}
		},
		onReady() {

		},
		onLoad() {

		},
		methods: {
			changePh(e) {
				this.phindex = e.detail.value
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
			kefu() {
				this.$request.get({
					url: "/app/officialGroup/query",
					success: rsp => {
						this.qlList = rsp.data
						uni.navigateTo({
							url: '/pages/webview/webview2?url=' + this.qlList.officialImage
						})
						console.log(this.qlList);
					}
				})
			},
			togglePasswordVisibility() {
				this.showPassword = !this.showPassword
			},
			togglePasswordVisibility2() {
				this.showPassword2 = !this.showPassword2
			},
			toBack() {
				uni.navigateBack()
			},
			reg() {
				let regCheck = ''
				if (this.phindex == 0) {
					regCheck = /^1\d{10}$/;
				}
				if (this.phindex == 1) {
					regCheck = /^(?:\+?852[-\s]?)?[569]\d{3}[-\s]?\d{4}$/;
				}
				if (this.phindex == 2) {
					regCheck = /^(?:\+?853[-\s]?)?6\d{7}$/;
				}
				if (!regCheck.test(this.regInfo.telPhone)) {
					uni.showToast({
						title: this.getLg("请输入正确的手机号码"),
						icon: 'none',
						duration: 2000
					});
					return false;
				}

				if (this.regInfo.passWord != this.regInfo.mpPassword) {
					uni.showToast({
						title: this.getLg("两次输入密码不同"),
						icon: 'none',
						duration: 2000
					});
					return false;
				}

				if (this.regInfo.passWord.length < 6) {
					uni.showToast({
						title: '密码至少6位',
						icon: 'none'
					})
					return
				}
				const payPwdCheck = /^[0-9]{6}$/;
				if (!payPwdCheck.test(this.regInfo.payPassword)) {
					uni.showToast({
						title: this.getLg("请输入6位纯数字交易密码"),
						icon: 'none',
						duration: 2000
					});
					return false;
				}


				if (this.regInfo.acceptInviteCode == null) {
					uni.showToast({
						title: this.getLg("请检查邀请码"),
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				this.btnSet = {
					loading: true,
					disabled: true,
					btntxt: "处理中..."
				};
				this.$request.post({
					url: "/app/dreamUserInfo/enroll",
					data: this.regInfo,
					success: rsp => {
						if (rsp.code == 200) {
							uni.showToast({
								title: '注册成功',
								icon: 'none'
							})
							setTimeout(() => {
								uni.redirectTo({
									url: '../login/login'
								})
							}, 1000)
						} else {
							uni.showToast({
								title: rsp.message,
								icon: 'none'
							})
							this.btnSet = {
								loading: false,
								disabled: false,
								btntxt: "立即注册"
							};
						}
					}
				})
			},
			loginBack() {
				uni.redirectTo({
					url: '../login/login?s=1'
				})
			},
			reSet() {
				this.allCode = "";
				this.drawPic();
			},
			canvasIdErrorCallback: function(e) {
				console.error(e.detail.errMsg)
			},
			randomNum(min, max) {
				return Math.floor(Math.random() * (max - min) + min);
			},
			randomColor(min, max) {
				var r = this.randomNum(min, max);
				var g = this.randomNum(min, max);
				var b = this.randomNum(min, max);
				return "rgb(" + r + "," + g + "," + b + ")";
			},
			drawPic() {
				var width = 180;
				var height = 42;
				var context = uni.createCanvasContext('firstCanvas')
				/**绘制背景色**/
				context.setFillStyle(this.randomColor(180, 240));
				context.fillRect(0, 0, width, height);
				context.stroke();
				/**绘制文字**/
				var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
				for (var i = 0; i < 4; i++) {
					var txt = str[this.randomNum(0, str.length)];
					this.allCode = this.allCode + txt;
					context.setFillStyle(this.randomColor(50, 160)); //随机生成字体颜色
					context.font = this.randomNum(25, 35) + 'px SimHei'; //随机生成字体大小
					var x = 10 + i * 25;
					var y = this.randomNum(25, 45);
					var deg = this.randomNum(-30, 30);
					//修改坐标原点和旋转角度
					context.translate(x, y);
					context.rotate(deg * Math.PI / 180);
					context.fillText(txt, 0, 0);
					//恢复坐标原点和旋转角度
					context.rotate(-deg * Math.PI / 180);
					context.translate(-x, -y);
				}
				/**绘制干扰线**/
				for (var i = 0; i < 3; i++) {
					context.setStrokeStyle(this.randomColor(40, 180));
					context.beginPath();
					context.moveTo(this.randomNum(0, width), this.randomNum(0, height));
					context.lineTo(this.randomNum(0, width), this.randomNum(0, height));
					context.stroke();
				}
				/**绘制干扰点**/
				for (var i = 0; i < 30; i++) {
					context.setFillStyle(this.randomColor(0, 255));
					context.beginPath();
					context.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 2 * Math.PI);
					context.fill();
				}

				context.draw();
			}
		}
	}
</script>

<style>
	.top1 {
		min-height: 100vh;
		background: url('/static/bg.png') no-repeat;
		/* background: linear-gradient(to bottom, #9B1B1A 25%, #F3F3F3 55%); */
		background-size: 100% 100%;
	}

	.vformitem {
		background: url('/static/box.png') no-repeat;
		background-size: 100% 100%;
		margin-top: 40rpx;
		border-radius: 15rpx;
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

	.formItemTitle {
		line-height: 80rpx;
	}

	.title {
		font-size: 50rpx;
		line-height: 100rpx;
	}

	.line {
		text-align: center;
		font-weight: 400;
		font-size: 26rpx;
		color: #460A0B;
		margin-bottom: 50rpx;
	}

	.border-bottom {
		color: #71D571;
		/* border-bottom: 1px solid #460A0B; */
	}
</style>