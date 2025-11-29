<template>
	<view class="">
		<view  :style="{'background-color':background}"  
			style="position: fixed;z-index: 20;width: 100%;top: 0; ">
			<view class=""  style="height: var(--status-bar-height);width: 100%;"></view>
			
		 
			
			<view class="headerbox"  :style="{top:'var(--status-bar-height)'}" >
				 
				
				<view class="vcenter">
					<view class="vcenter header_left_icon1 " >
						<view class="" @click="toBack()" v-if="back">
							<image width="85rpx" mode="widthFix" src="/static/tabbar/back.png"></image>
						</view>
						
						 
					</view>
					<view class="header_title pl30" :style="{'color':color ,'fontSize':fontSize}">{{getLg(title)}}</view>
					 
					<view class="vcenter header_right_icon" @click="toLog()" v-if="showRightBtn">
						
						<slot style=" padding:1rpx 25rpx;border-radius: 32rpx;background-color: #4d7fd6 display: flex;
						 	flex-flow: row nowrap;
						justify-content: center;
						color:white;
						align-items: center;
						   text-align: center;">
								 		 
						</slot>
						
						<view class="cny" v-if="rightTxt=='cny'">
							<image src="/static/coin/cny.png"></image>
							<text class="vfm">CNY</text>
						</view>
						<view style="width: 200rpx;text-align: right;font-size: 28rpx;" v-if="rightTxt=='add'">
							添加
						</view>
						
						<view style="width: 200rpx;text-align: right;font-size: 28rpx;" v-if="rightTxt=='addbank'">
							添加
						</view>
						<view style="width: 250rpx;text-align: right;font-size: 24rpx;color:#fff;" v-if="rightTxt=='dtjl'">
							定投记录
						</view>
						<image :src="img" mode="widthFix" v-if="rightTxt=='icon'" @click="notice"
							style="width: 35rpx;height: 35rpx;"></image>
						<view style="width: 200rpx;text-align: right;font-size: 24rpx;color: #fff;" v-if="rightTxt=='qd'">
							打卡记录
						</view>
					</view>
					<view class="vcenter header_right_icon" v-else></view>
				</view>
				
			
			</view>
			
			 
			
			
			
			<!-- <view style="height: 100rpx;width: 100%;"></view> -->
		</view>
		<!-- <view style="height: 100rpx;width: 100%;"></view> -->
	</view>
</template>

<script>
	export default {
		props: {
			background: {
				type: String,
				default: "#55aaff"
			},
			title: {
				type: String,
				default: ""
			},
			showRightBtn: {
				type: Boolean,
				default: false
			},
			backgroudcolor: {
				type: String,
				default: "#1c4dbf"
			},
			rightTxt: {
				type: String,
				default: "log"
			},
			color: {
				type: String,
				default: "#fff"
			},
			back: {
				type: Boolean,
				default: true
			},
			fontSize:{
				type:String,
				default:"36rpx"
			},
			img: {
				type: String,
				default: ""
			},
		},
		data() {
			return {
				topmenulogo:'https://vp09029.oss-cn-hongkong.aliyuncs.com/vgui/topmenulogo.png',
				topmenuguoqi:'',
				topmenuchaidan:'https://vp09029.oss-cn-hongkong.aliyuncs.com/vgui/caidan.png',
				vnlang:'https://vp09029.oss-cn-hongkong.aliyuncs.com/vgui/lang1.png',
				enlang:'https://vp09029.oss-cn-hongkong.aliyuncs.com/vgui/lang2.png',
				cnlang:'https://vp09029.oss-cn-hongkong.aliyuncs.com/vgui/lang3.png',
				dropdownbgImg:'https://vp09029.oss-cn-hongkong.aliyuncs.com/vgui/language1.png',
				showlang:false,
				
			}
		},
		created() {
			this.statusBarHeight = uni.getStorageSync('statusBarHeight')
			console.log("top created");
			
			this.topmenuguoqi=this.vnlang;
			
			uni.$on("toplang",d=>{
				 console.log("监听",d);
				if(d=='vi')
				{
					this.getchangeLang(1)
				}
				if(d=='en')
				{
					this.getchangeLang(2)
				}
				if(d=='zh')
				{
					this.getchangeLang(3)
				}
			});
			var that=this;
			
			var lang=uni.getStorageSync('locale')
		 
					  if(lang=='vi')
					  {
						  this.changeLang(1);
					  }else if(lang=='en')
					  {
						  this.changeLang(2);
					  }else if(lang=='zh')
					  {
						  this.changeLang(3);
					  }
			// uni.getStorageSync({
			// 		key: 'locale',
			// 		success: function (res) {
			// 		console.log(res.data); // 输出存储的数据
			// 		  if(res.data=='vi')
			// 		  {
			// 			  that.changeLang(1);
			// 		  }else if(res.data=='en')
			// 		  {
			// 			  that.changeLang(2);
			// 		  }else if(res.data=='zh')
			// 		  {
			// 			  that.changeLang(3);
			// 		  }
					 	
			// 		}
			// });
		 
			 
			
			
		},
		onUnload() {
		  
		},
		methods: {
			toBack() {
				this.$emit("back")
			},
			toLog() {
				if (this.rightTxt == 'add') {
					this.$emit("rightClick")
					console.log('银行卡添加');
					return
				}
				if (this.rightTxt == 'dtjl') {
					this.$emit("dtjl")
					return
				}
				if (this.rightTxt != 'cny') {
					this.$emit("log")
				}

			},
			notice() {
				if (this.img == '/static/home/jn/xjn.png' || this.img == '/static/tabbar/explain.png') {
					this.$emit("click")
				} else {
					uni.navigateTo({
						url: '/pages/me/notice'
					})
				}

			},
			
			
			
			
			
			
			openLang(){
				this.showlang=!this.showlang;	
			},
			async goHome()
			{
				console.log("home");
				// uni.redirectTo({
				// 	url: '/pages/home/menu'
				// })
				uni.reLaunch({
					url: '/pages/home/menu'
				});
				 
				//uni.$emit("goHome",1);
			},
			changeLang(n)
			{
			 
				this.showlang=false;
				if(n==1)
					this.topmenuguoqi=this.vnlang;
				else if(n==2)
					this.topmenuguoqi=this.enlang;
				else if(n==3)
					this.topmenuguoqi=this.cnlang;
					
				 uni.$emit("lang",n);
					
			},
			getchangeLang(n)
			{
			 
				this.showlang=false;
				if(n==1)
					this.topmenuguoqi=this.vnlang;
				else if(n==2)
				{ 
					this.topmenuguoqi=this.enlang;
						 
				}
					
				else if(n==3)
					this.topmenuguoqi=this.cnlang;
					
			    
					
			},
			 handleGlobalClick(event) {
			      //console.log('全局点击事件', event)
			      // 处理点击逻辑
			 }
		}
	}
</script>

<style lang="scss" scoped>
	
	.topmenu{
		width: 100%;
		margin-top:20rpx;
		// margin-left: 55rpx;
		// background-color: #ff0000;
		  
		  // position: absolute;
		  display: flex;
		 // position:fixed;
		 
		  
		  justify-content: space-between;
		  align-items: center;
	}
	
	.m1{
		 margin-left: 45rpx;
	 
		width:20%;
		// background-color: #ff0000;
	}
	.m0{
		 width:60%;
		    align-items: center;
			display: flex;
			flex-flow: column nowrap;
		   m-left: 20rpx;;
		background-color: #aaff00;
	}
	.m2{
		width:20%;
		 margin-right: 45rpx;
		// flex:1;
		// margin-right: 55rpx;
		 
		// background-color: #ff0000;
		 display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.dropdown{
		position: absolute;
		 background-repeat: no-repeat;
		 			background-size: 100% 100%;  
		 			background-position: center;
		top:123rpx;
		right:103rpx;
		z-index: 3;  
		width: 95rpx;
		height:140rpx;
		
		 display: flex;
		align-items: center;
		
		flex-direction:column ;
		justify-content: space-between;
		padding-top:20rpx;
		padding-bottom:20rpx;
		// background-color: #5555ff;
	}
	
	
	.headerbox {
		// height: 100rpx;
		// line-height: 100rpx;
		// position: fixed;
		// top: var(--status-bar-height);
		// z-index: 9999999;
		// background: #0E0E15;
		width: 100%;

		.header_left_icon1 {
			width: 100rpx;
			height: 50rpx;
			margin-left: 20rpx;
			margin-top: 20rpx;

			image {
				width: 25rpx;
				 
			}
		}

		.header_title {
			margin-left: 80rpx;
			// background-color: red;
			width: calc(100% - 260rpx);
			text-align: center;
			font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
			font-weight: 400;
			font-size: 35rpx;
			// color: #FFFFFF;
		}

		.header_right_icon {
			width: 280rpx;
			// background-color: #2FF8EA;
			margin-right: 10rpx;

			image {
				width: 48rpx;
				height: 48rpx;
			}

			.cny {
				display: flex;
				align-items: center;
				border-radius: 71rpx 71rpx 71rpx 71rpx;
				border: 1rpx solid rgba(83, 159, 235, 1);
				padding: 8rpx 20rpx;
				margin-left: -60rpx;

				image {
					width: 32rpx;
					height: 32rpx;
				}

				text {
					margin-left: 5rpx;
					font-weight: 500;
					font-size: 24rpx;
					color: #2FF8EA;
					line-height: 36rpx;
					text-align: center;
				}
			}
		}
	}
</style>