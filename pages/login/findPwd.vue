<template>
	<view>
		
		<view v-if="showDiv==1"  class="vcenter" style="width:100%;height:100%;background-color: rgba(0,0,0,0.5);position: fixed;z-index: 9999;">
			<view style="width:646rpx;height:442rpx;border-radius: 30rpx;margin-top: -100rpx;background-color: #fff;">
				<view class="vcenter" style="width:100%;height:100rpx;">
					<image style="width:220rpx;height:auto;margin-top: -100rpx;" mode="widthFix" src="/static/zi/z101.png"  ></image>
				</view>
				<view class="vcenter" style="width:100%;height:200rpx;word-break: break-all; word-wrap:break-word;;text-align: center;">
					<font class="ff3" style="width:90%;font-size:30rpx;color:#000">{{showMsg}}</font>
				</view>
				<view class="vcenter-top" style="width:100%;height:130rpx;">
					<view @click="dd()" class="vcenter" style="width:424rpx;height:82rpx;background:linear-gradient(to right,#b53cc0,#663cc6);border-radius: 41rpx">
						<font style="color:#fff;font-size:30rpx;">{{getLg("确定")}}</font>
					</view>
				</view>
			</view>
		</view>
		
		<view class="top1" style="width:100%;height: 100vh">
			<view class="" style="width:100%;height:600rpx;"></view>
			<view class="vcenter" style="width:100%;">
				<view class="vform">
					<view class="vformitem">
						<view class="vbetween">
							<view class="select-country-zone" @click="gotoPickcode">+{{findPwdInfo.phoneZone}}</view>
							<view class="vcenter-left" style="width:calc( 100% - 100rpx );height:100%;">
								<input type="number" class="vinput" v-model="findPwdInfo.userName" maxlength="11" :placeholder="getLg('请输入手机号')"/>
							</view>
						</view>
					</view>
					<view class="vsplit"></view>
					<view class="vformitem">
						<view class="vbetween">
							 <input class="vinput" type="text" v-model="findPwdInfo.phoneCode" maxlength="4" style="width:300rpx" :placeholder="getLg('请输入短信验证码')"/>
							 <view class="vcenter-right">
								<view class="vline"></view>
								<button class="smscode" @click="sendSmsCode" :disabled="get_code_status">{{get_code_text}}</button>
							</view>
						</view>
					</view>
					<view class="vsplit"></view>
					<view class="vformitem">
						<view class="vcenter">
							<input class="vinput" type="password" v-model="findPwdInfo.userPass" maxlength="30" :placeholder="getLg('请设置新密码')"/>
						</view>
					</view>
					<view class="vsplit"></view>
					<view class="vformitem">
						<view class="vcenter">
							<input class="vinput" type="password" v-model="findPwdInfo.userPass2" maxlength="30" :placeholder="getLg('请确认新密码')"/>
						</view>
					</view>					
					<view class="vformbutton" style="width:100%;margin-top:50rpx">
						<button @click="resetPwd()" :loading="btnSet.loading" :disabled="btnSet.disabled" class="vbutton">{{btnSet.btntxt}}</button>
					</view>
					<view class="vcenter" style="margin-top:100rpx">
						<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737137137477back.png" mode="aspectFit" style="width:100rpx;height: 100rpx;" @click="loginBack()"></image>
					</view>
				</view>
			</view>
		</view>
		      
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showDiv:0,
				findPwdInfo:{
					phoneZone:"86",
					userName:"",
					phoneCode:"",
					userPass:"",
					userPass2:""					
				},
				get_code_time:60,
				get_code_text:"获取验证码",
				get_code_status:false,
				btnSet:{
					loading:false,
					disabled:false,
					btntxt:"确定"
				},
			}
		},
		onLoad() {
			// this.request({
			// 	url:'Home/Login/show_index',
			// 	method:'POST',
			// 	data:"",
				
			// }).then((res)=>{
			// 	res.data=JSON.parse(this.decrypt(res.data));
			// 	console.log(res.data);
			// 	if(res.data.status == 1){
			// 		this.logo=res.data.data;
					
			// 	}
				
			// })
		},
		methods: {
			gotoPickcode() {
				uni.navigateTo({
					url:'./country-code'
				})
			},
			upDataCountryCode: function(msg) {
				if(msg) {
					this.regInfo.phoneZone = msg;
				}
				this.$forceUpdate();
			},
			loadTime:function(){
				var that=this;
				var timer = setInterval(() =>{
				  if (that.get_code_time > 0) {
					that.get_code_time--;
					that.get_code_text=that.getLg("重新发送")+"("+that.get_code_time+"s)";
					that.get_code_status=true;
				  } else {
					clearInterval(timer);
					that.get_code_time=300;
					that.get_code_text=that.getLg("重新发送");
					that.get_code_status=false;
				  }
				}, 1000);
			},
			sendSmsCode: function () {
				let that = this;
				if(that.findPwdInfo.userName==null||that.findPwdInfo.userName.length<1){
					uni.showToast({title: this.getLg("请输入手机号码"),icon:'none',duration: 2000});
					return false;
				}
				const regCheck = /^1\d{10}$/;
				if(!regCheck.test(that.findPwdInfo.userName)){
					uni.showToast({title: this.getLg("请输入正确的手机号码"),icon:'none',duration: 2000});
					return false;
				}
				
				let smsInfo = {
					type:"forget",
					userTelCode:that.findPwdInfo.phoneZone,
					userTel:that.findPwdInfo.userName
				}
				that.request({
					url:'Home/Login/smsCode',
					method:'POST',
					data:that.encrypt(JSON.stringify(smsInfo)),
					
				}).then((res)=>{
					 res.data=JSON.parse(that.decrypt(res.data));
					 console.log(res.data);
					 var result=res.data;
					 if(!res.data.status){
					 	uni.showToast({
					 		title: res.data.msg,
					 		icon:'none',
					 		duration: 2000
					 	});
					 	that.get_code_time=300;
					 	that.get_code_text=this.getLg("重新发送");
					 	that.get_code_status=false;
					 }else{
					 	uni.showToast({
					 		title: this.getLg("发送成功"),
					 		icon:'none',
					 		duration: 2000
					 	});
					 	that.loadTime();
					 }
				}).catch(e=>{
					uni.showToast({
						title: this.getLg("验证码获取错误!"),
						icon:'none',
						duration: 2000
					});
					that.get_code_time=300;
					that.get_code_text=this.getLg("重新发送");
					that.get_code_status=false;
				})
			},
			resetPwd(){
				if(this.findPwdInfo.userName==null||this.findPwdInfo.userName.length<1){
					uni.showToast({title: this.getLg("请输入手机号码"),icon:'none',duration: 2000});
					return false;
				}
				const regCheck = /^1\d{10}$/;				
				if(!regCheck.test(this.findPwdInfo.userName)){
					uni.showToast({title: this.getLg("请输入正确的手机号码"),icon:'none',duration: 2000});
					return false;
				}
				if(this.findPwdInfo.phoneCode==null||this.findPwdInfo.phoneCode.length!=4){
					uni.showToast({title: this.getLg("请输入手机验证码"),icon:'none',duration: 2000});
					return false;
				}
				
				if(this.findPwdInfo.userPass==""){
					uni.showToast({title: this.getLg("请输入密码"),icon:'none',duration: 2000});
					return false;
				}
				
				const pwdCheck = /^[a-zA-Z0-9]{8,20}$/;
				if(!pwdCheck.test(this.findPwdInfo.userPass)){
					uni.showToast({title: this.getLg("密码至少8位，最多20位的数字+字母，不能设置特殊字符"),icon:'none',duration: 2000});
					return false;
				}
				if(this.findPwdInfo.userPass2==null||this.findPwdInfo.userPass2.length<1){
					uni.showToast({title: this.getLg("请输入确认密码"),icon:'none',duration: 2000});
					return false;
				}
				if(this.findPwdInfo.userPass!=this.findPwdInfo.userPass2){
					uni.showToast({title: this.getLg("两次密码不同"),icon:'none',duration: 2000});
					return false;
				}
				this.btnSet={
					loading:true,
					disabled:true,
					btntxt:"处理中..."
				};
				this.request({
					url:'Home/Login/forgetPwd',
					method:'POST',
					data:this.encrypt(JSON.stringify(this.findPwdInfo)),
					
				}).then((res)=>{
					 res.data=JSON.parse(this.decrypt(res.data));
					 if(res.data.status==1){
						uni.showToast({
							title: res.data.msg,
							icon:'none',
							duration: 2000
						});
						setTimeout(()=>{
							uni.redirectTo({
								url:'../login/login?s=1'
							})
						},2000)
					 }else{
						 uni.showToast({
						 	title: res.data.msg,
						 	icon:'none',
						 	duration: 2000
						 });
						 this.btnSet={
						 	loading:false,
						 	disabled:false,
						 	btntxt:"确定"
						 };	
					 }
				})
				
			},
			loginBack(){
				uni.redirectTo({
					url:'../login/login?s=1'
				})
			}
		}
	}
	

	
</script>

<style>

	.top1{
		background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737137041274bg.png') no-repeat;
		background-size: 100% 100%
	}
	page{
		background-color: rgba(14, 14, 21, 1);
	}
	.box_12 {
		margin-top:72rpx;
		margin-bottom:120rpx;
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
	
	
	.smscode{
		line-height: 108rpx;
		background-color: transparent !important;
		font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
		font-weight: 300;
		font-size: 28rpx;
		color: #51FAFC;
		text-decoration-line: underline;
		white-space: nowrap;
	}
	.smscode[disabled='true']{
		background:transparent!important;
		color:grey!important;
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
		width:100rpx;
	}
</style>
