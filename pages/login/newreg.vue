<template>
	
	<view class="content">
		 <!-- <narBar :background="'#092d9b'" title="aaa"  @back="toBack()"></narBar> -->
		<view style="height: var(--status-bar-height);width: 100%;"></view>
		 
 
		<view class="k">
			 
			
				 
				<view class="flex-column-start-center" style="width:100vw;margin-top: 150rpx;" >
					<view class="" style="width:calc(100vw - 76px)">
						
						
						<view class="flex-row-around-center">
							  <text class="fw600 fz26">欢迎注册</text>
							<image src="/static/null/hand.png"	style="margin-left:10rpx;width: 50rpx;" mode="widthFix" />
				            
						</view>
						<view class="fw600 fz26 mt20" style=" ">注册登录账号即可查看更多精彩资讯</view>
						
						<view class="flex-center-center mt40" style="">
							<view @click="toEmailReg()" class="flex-center-center fz26" style="background-color:#f0f0f0 ;border-radius:50rpx;">
								<view style="padding: 15rpx 60rpx;color:#000;" class="py30">邮箱注册</view>
								<view style="  background-color:#bf1609 ;color:#fff;padding: 15rpx 60rpx;border-radius: 50rpx; ">手机注册</view>
							</view>
						</view>
						<view class="flex-row-around-center mt30"><image src="/static/null/user.png"	style="width: 30rpx;" mode="widthFix" />
										              <text class="ml20 fw600 fz26">姓名</text>
												</view>
						<view>
							
							<input class="vinput" style="width:90%;padding-left:0rpx;font-size: 26rpx;color: #000;" type="text" placeholder-style="color:#a1a1a1" v-model="regInfo.nickName"
									 maxlength="15" placeholder="请输入用户名" />
						</view>
						
						<view class="mt30 flex-row-around-center"><image src="/static/null/phone.png"	style="width: 30rpx;" mode="widthFix" />
						      <text class="ml20 fw600 fz26">手机号</text>
						</view>
						<view class="flex-between-center">
						 
							<input class="vinput" style="width:80%;padding-left:0rpx;font-size: 26rpx;color: #000;" type="number" placeholder-style="color:#a1a1a1" v-model="regInfo.telPhone"
									 maxlength="11" placeholder="请输入手机号" />
							 
							 
						</view>
						
						
						<view class="mt30 flex-row-around-center"><image src="/static/null/yao.png"	style="width: 24rpx;" mode="widthFix" />
						      <text class="ml20 fw600 fz26">验证码</text>
						</view>
					 
						<view class="flex-between-center">
						 
							<input class="vinput" style="width:80%;padding-left:0rpx;font-size: 26rpx;color: #000;" type="text" placeholder-style="color:#a1a1a1" v-model="code"
									 maxlength="4" placeholder="请输入验证码" />
							<view @click="updateImageCode">
								<canvas style="width:220rpx;height:86rpx;" canvas-id="canvas" ></canvas>
							</view>
							 
							<!-- <image src="/static/null/eye.png"	style="width: 36rpx;margin-right:30rpx" mode="widthFix" /> -->
						</view>
						
						
						<view class="flex-row-around-center mt30"><image src="/static/null/lock.png"	style="width: 30rpx;" mode="widthFix" />
										              <text class="ml20 fw600 fz26">输入密码</text>
												</view> 
						<view class="flex-between-center">
							<input v-if="showPassword" class="vinput" style="width:80%;padding-left:0rpx;font-size: 26rpx;color: #000;"  type='password' placeholder-style="color:#a1a1a1" v-model="regInfo.passWord"
									 maxlength="20" placeholder="请输入密码" />
							<input v-else class="vinput" style="width:80%;padding-left:0rpx;font-size: 26rpx;color: #000;"  type='text' placeholder-style="color:#a1a1a1" v-model="regInfo.passWord"
									 maxlength="20" placeholder="请输入密码" />							 
							<view @click="togglePasswordVisibility">
								<image v-if="showPassword" src="/static/null/eye2.png"	style="width: 36rpx;margin-right:30rpx" mode="widthFix" />
								<image v-else src="/static/null/eye1.png"	style="width: 36rpx;margin-right:30rpx" mode="widthFix" />
							</view>		 
							
						</view>
						
						<view class="flex-row-around-center mt30"><image src="/static/null/lock.png"	style="width: 30rpx;" mode="widthFix" />
										              <text class="ml20 fw600 fz26">输入交易密码</text>
												</view> 
						<view class="flex-between-center">
							<input v-if="showPassword" class="vinput" style="width:80%;padding-left:0rpx;font-size: 26rpx;color: #000;"  type='password' placeholder-style="color:#a1a1a1" v-model="regInfo.payPassword"
									 maxlength="20" placeholder="请输入交易密码" />
							<input v-else class="vinput" style="width:80%;padding-left:0rpx;font-size: 26rpx;color: #000;"  type='text' placeholder-style="color:#a1a1a1" v-model="regInfo.payPassword"
									 maxlength="20" placeholder="请输入交易密码" />							 
							<view @click="togglePasswordVisibility">
								<image v-if="showPassword" src="/static/null/eye2.png"	style="width: 36rpx;margin-right:30rpx" mode="widthFix" />
								<image v-else src="/static/null/eye1.png"	style="width: 36rpx;margin-right:30rpx" mode="widthFix" />
							</view>		 
							
						</view>
						<view class="flex-row-around-center mt30"><image src="/static/null/yaoqing.png"	style="width: 30rpx;" mode="widthFix" />
										              <text class="ml20 fw600 fz26">输入邀请码</text>
												</view>
						<view>
							
							<input class="vinput" style="width:90%;padding-left:0rpx;font-size: 26rpx;color: #000;" type="text" placeholder-style="color:#a1a1a1" v-model="regInfo.acceptInviteCode"
									 maxlength="6" placeholder="请输入邀请码" />
						</view>
					</view>
					<view class="fz26" @click="reg()" style="background-color: #cb2f2f;color:#fff;border-radius: 50rpx;padding: 20rpx 240rpx;margin-top: 80rpx;">
						注册
					</view>
					 <view @click="loginBack()" class="fz26 " style="background-color:#adacac;color:#fff;;border-radius: 50rpx;padding: 20rpx 170rpx;margin-top: 40rpx;">
					 	已有帐号？<text class="fw600" style="color: #d72b2b;">登录</text>
					 </view> 
					 
					 
					<view class="mt30"></view>
					 
					 
					 
					  </view>
				</view>
		</view>
	</view>
	 
</template>

<script>
	import narBar from 'pages/public/narBar.vue' 
	import { Mcaptcha } from '@/utils/mcaptcha.js'
	export default {
		components: {
			narBar, 
		},
		data() {
			return {
				mcaptcha:null,
				graphicVerifyCode:'',
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 90,
				noClick: true,
				phindex: 0,
				code:'',
				regInfo: {
					acceptInviteCode: "",
					mpPassword: "",
					nickName: "",
					passWord: "",
					payPassword: "",
					telPhone: ""
				},
				showPassword: true,
				showPassword2: false,
				btnSet: {
					loading: false,
					disabled: false,
					btntxt: "立即注册"
				},
				qlList: {},
				isck: true,
			};
		},
		onReady(){
			this.mcaptcha = new Mcaptcha({
			el: 'canvas',
			width: 80,
			height: 35,
			createCodeImg:''
			});
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
			updateImageCode(){
				this.mcaptcha = new Mcaptcha({
				el: 'canvas',
				width: 80,
				height: 35,
				createCodeImg:''
				});
				
			 
			},
			 toEmailReg()
			 {
				 console.log(1122);
				uni.redirectTo({
					url: '../login/newemailreg',
					animationType: 'pop-in',
						animationDuration: 200
				})
			 },
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
							console.log(this.showPassword);
						},
						togglePasswordVisibility2() {
							this.showPassword2 = !this.showPassword2
						},
						toBack() {
							uni.navigateBack()
						},
						reg() {
							
							if (this.regInfo.nickName == null || this.regInfo.nickName=='') {
								uni.showToast({
									title: this.getLg("请输入姓名"),
									icon: 'none',
									duration: 2000
								});
								return false;
							}	
							
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
							
							if(!this.mcaptcha.validate(this.code))
							{
								uni.showToast({
									title: this.getLg("请输入正确的验证码"),
									icon: 'none',
									duration: 2000
								});
								return false;
							}
			
							// if (this.regInfo.passWord != this.regInfo.mpPassword) {
							// 	uni.showToast({
							// 		title: this.getLg("两次输入密码不同"),
							// 		icon: 'none',
							// 		duration: 2000
							// 	});
							// 	return false;
							// }
							
							console.log('注册');
			
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
							
							 
							
							// this.btnSet = {
							// 	loading: true,
							// 	disabled: true,
							// 	btntxt: "处理中..."
							// };
							this.$request.post({
								url: "/app/dreamUserInfo/enroll",
								data: this.regInfo,
								success: rsp => {
									if (rsp.code == 200) {
										uni.showToast({
											title: '注册成功',
											icon: 'none'
										})
										uni.setStorageSync('loginMode','phone')
										
										uni.setStorageSync('phone',this.regInfo.telPhone)
										uni.setStorageSync('password',this.regInfo.passWord)
										setTimeout(() => {
											uni.redirectTo({
												url: '../login/newlogin'
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
								url: '../login/newlogin?s=1'
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
	};
</script>
 
<style lang="scss" scoped>
	
	page {
			background-color: #ffffff;
			 height: 100vh;
			  overflow: auto;
		}
		 
	.content {
		background-image:  url('/static/null/login0.png') ;
	   
		  background-repeat: no-repeat;
		// background-size:cover;
	 
		background-size: 100% auto;
		background-color: #ffffff;
		width:100vw;
				height: 100vh;
		  // height: 120vh;
		// top: 0;
		// left:0;
		  // z-index:0;
		  // position: absolute;
		  
		 
		  
	 
	}
	.k {
		 
		// background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744290610523bg.png') no-repeat;
		
		 
		 
		width: 100%;
		 
		background-size: 100% auto;
		// background-color: #f1f1f1;
		  display: flex;
		  flex-direction: column;
		// padding-bottom: 60rpx;
		// margin: 60rpx 2.5%;k
	
	}
	.topbg{
	 
		background-image:  url('/static/null/regt1.png') ;
	   
	   width: 600rpx; /* 容器的宽度 */
	    height: 300rpx; /* 容器的高度 */
	  
	    // background-size: cover; /* 背景图片覆盖整个容器 */
	    // background-position: right top; /* 图片在容器的右侧和垂直居中 */
		background-size: 100% auto;
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