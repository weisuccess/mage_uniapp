<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'充值'"    @back="toBack()">
	     	    	<view   class="flex-end-center" style="width:150rpx;height: 100rpx;color: #ffffff;;">
						 
	     	    			  
	     	    	 </view>	 		  
	     </narBarAndTop>
		<!-- <view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view> -->
		<view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view>
	 
		
		<!-- background-image:  url('/static/null/chongzhi1.png'); -->
	
			<view class="" style="
			background-image:  url('/static/null/chongzhi1.png');
			display: flex;
			    flex-flow: row nowrap;
			    justify-content: flex-start;
			    align-items: flex-end;
					  background-repeat: no-repeat; 
					  background-size:cover;
					background-size: 100% auto;
					width:100vw;
					height: 400rpx;
					top:0;
				 	left:0;
			 
					">  
				 
				<view class="mb70 ml70"  style="line-height: 50rpx; ">
					<view>USDT余额</view>
					<view class="fw600" style="color: #333333;">{{money}}</view>
				</view>	 
					 
			 </view>
		<view class="flex-column-center  mx40" style="margin-top: 20rpx; "> 
		        
			 	<view class="mt20" style="width: 100%;background-color: #ffffff; border-radius: 8rpx;">
				 
					<view  class="fz28 fw400  flex-start-center py20" style="margin: 30rpx 25rpx;border-bottom: 2rpx solid #c5c5c5;">
						 <text class="">充值金额 </text>

						 <input class="" style="margin-left: 20rpx;width:200rpx;font-size: 28rpx;color: #000;" type="number" placeholder-style="color:#a1a1a1" v-model="outData.usdtMoeny"
									 maxlength="15" @input="checkInput" placeholder="请输入充值金额" />
					</view>
					
					 <view  class="fz28 fw400  py10" style="margin: 0rpx 25rpx;">
					 	 <view class="">充值方式 </view>
					 	  
					 </view>
					<view @click="changepay(index)" v-for="(item,index) in plist" class="fz28 fw400  flex-between-center py10" style="margin: 0rpx 25rpx  0rpx 25rpx;">
					 
						<view  class="flex-center-center ">
							<image :src="item.icon1"  style="width: 45rpx;" mode="widthFix" />
							<text class="ml20">{{item.name}}</text>
						</view>
						 
						  
						  <view>
							  <image v-if="payindex==index" :src="onicon"  style="width: 40rpx;" mode="widthFix" />
							  <image v-else :src="officon"  style="width: 40rpx;" mode="widthFix" />
						  </view>
					</view>
					<view style="height: 20rpx;"></view>
				</view>
				
				<view class="mt20" style="width: 100%;background-color: #ffffff; border-radius: 8rpx;">
					<view  class="fz28 fw400  flex-start-center py10" style="margin: 30rpx 25rpx;">
											 <text class="">备注 </text>
											 <input class="" style="margin-left: 20rpx;width:200rpx;font-size: 28rpx;color: #000;" type="text" placeholder-style="color:#a1a1a1" v-model="outData.message"
														 maxlength="15" placeholder="请输入备注" />
					 </view>
				</view>
				
				<view class="" @click="upload" style="width: 100%; border-radius: 8rpx;">
					<view  class="fz28 fw400  flex-start-center py10" style="margin: 30rpx 25rpx;">
					 充值凭证 					 
					 </view>
					 <view class="flex-column-center-center mx40" style="background-color: #e5e5e5;height: 300rpx;">
						 <!-- :src="outData.tradeIcon" -->
						 
						 <image v-if="outData.tradeIcon" :src="outData.tradeIcon" style="width: 100%;height: 100%;" ></image>
						 
						 <view v-else class="flex-column-center-center">
							<image src="/static/null/chongzhi5.png"  style="width: 60rpx;" mode="widthFix" />
							<view  class="mt10">点击此处，上传凭证</view>  
						 </view>
							
						 
						 
						 
					 </view>
					 
				</view>
				<view class="fz24 mt30" style="color: #b9332c;">
					温馨提示:每次充值前请联系在线客服获取最新入款账户，谢谢
				</view>
				<view class="mt20" style="width: 100%; border-radius: 8rpx;">
					<view @click="submit" class="fz24 mt10 lineargradient text-align-c mx40 py20" style="border-radius: 8rpx;color: #ffffff;">确定</view>
					<view @click="kefu()" class="fz24 mt10 text-align-c mx40 py20" style="margin-top: 20rpx;border-radius: 8rpx;color: #b9332c;border: 1px solid #b9332c;">联系客服</view>
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
				show: false,
								data: {},
								list: [{
									title: '请选择充值方式'
								}, {
									title: '银行卡'
								}],
								index: 0,
								money: '',
								beizhu:'',
								outData: {
									usdtMoeny: '',
									tradeIcon: '',
									message:'',
									paytype:'微信'
								},
								codearr: {},
								user: {},
								select: {}, //已选择提现方式具体卡号
								collection: {},
								onicon:'/static/pay/on1.png',
								officon:'/static/pay/off1.png',
								payindex:0,
								plist:[
								 
									
								],
								sel:-1,
								paylist:[],
								orgin:[
									{icon1:'/static/pay/cz1.png',name:'USDT',icon2:'',index:0},
									{icon1:'/static/pay/cz2.png',name:'银行卡',icon2:'',index:1},
									{icon1:'/static/pay/cz3.png',name:'微信',icon2:'',index:2},
									{icon1:'/static/pay/cz4.png',name:'支付宝',icon2:'',index:3},]
			};
		},
		onLoad() {
			this.getUser()
			this.getpaylist()
			this. reset();
		},
		onUnload(){
			//uni.$off("lang");
		},
		onShow() {
			this.pageNum = 1
			//this.getList()
		},
		methods: {
		 changepay(index){
			 this.payindex=index;
			 this. reset();
		 },
		 getpaylist(){
			 
			 	this.$request.get({
			 		url: "/app/payonInfo/getList",
			 		success: rsp => {
			 			this.paylist = rsp
						 
					 var index=0;
					 this.plist=[]
						for (var i = 0; i < this.paylist.length; i++) {
							//this.paylist[i]
							console.log(this.paylist[i]);
							var item=this.paylist[i]
							var temp={}
							
							if(item.swtichtype==1)
							{
								 
								 temp.icon1=this.orgin[i].icon1
								temp.name=item.name
								temp.icon2=this.officon
								temp.index=temp.id;
								this.plist.push(temp)
								 
							}
						}
						this.$forceUpdate();
			 			 
			 		}
			 	})
			 
		 },
		 reset(){
			this.plist.forEach((item)=>{
							if(this.payindex==item.index)
							{
								item.icon2=this.onicon
							}else item.icon2=this.officon
							
						})
						console.log(this.plist);
						this.$forceUpdate();	
		 },
			copy() {
							uni.setClipboardData({
								data: this.user.youdunRechargeAddress,
								success: function() {
									console.log('success');
									uni.showToast({
										title: '复制成功！',
										icon: 'none'
									})
								}
							});
						},
						czjl() {
							uni.navigateTo({
								url: '/pages/me/moneyDetails'
							})
						},
						getUser() {
							this.$request.get({
								url: '/app/dreamUserInfo/getUser',
								success: rsp => {
									this.user = rsp.data
									this.money = rsp.data.balance
								}
							})
						},
						closezujian() {
							this.show = false
						},
						checkInput(type) {
							clearTimeout(this.timer);
							this.timer = setTimeout(() => {
			
							}, 500);
						},
						kefu() {
										this.$request.get({
											url: "/app/customerInfo/getCustomerList",
											success: rsp => {
											 
											 
												uni.navigateTo({
													url: '/pages/webview/webview2?url=' + rsp.data[0].customerUrl
												})
												console.log(this.qlList);
											}
										})
									},
						upload() {
							let url = uni.getStorageSync('url')
			
							let that = this
							uni.chooseImage({
								count: 1,
								sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['album'], //从相册选择,或者使用相机
								success: function(chooseImageRes) {
									const tempFilePaths = chooseImageRes.tempFilePaths
									console.log(tempFilePaths[0])
									uni.showLoading({
										title: '上传中···',
										mask: true
									})
									uni.uploadFile({
										url: url + '/Ali/upload',
										filePath: tempFilePaths[0],
										name: 'file',
										header: {
											'token': uni.getStorageSync('token')
										},
										success: (uploadFileRes) => {
											console.log(uploadFileRes.data, that.outData)
											that.outData.tradeIcon = JSON.parse(uploadFileRes.data).data
											uni.hideLoading()
										},
										fail() {
											uni.hideLoading()
										}
									})
								},
								fail() {
									uni.hideLoading()
								}
							})
						},
						all() {
							this.outData.usdtMoeny = this.money
						},
						// bank() {
						// 	this.$request.get({
						// 		url: '/app/bankInfo/list',
						// 		data: {
						// 			pageNum: 1,
						// 			pageSize: 10,
						// 		},
						// 		success: rsp => {
						// 			this.codearr = rsp.data
						// 		}
						// 	})
						// },
						// usdtList() {
						// 	this.$request.get({
						// 		url: '/app/bankCardsInfo/list',
						// 		data: {
						// 			pageNum: 1,
						// 			pageSize: 10,
						// 		},
						// 		success: rsp => {
						// 			if(!rsp.data[0]){
			
						// 			}
						// 		}
						// 	})
						// },
						change: function(e) {
							this.index = e.detail.value
							console.log(e);
							// this.outData.bankType = this.index
							if (this.index == 2) {
								this.outData.bankType = 2
								// this.bank()
								// uni.navigateTo({
								// 	url: '/pages/my/bankList'
								// })
							}
							if (this.index == 1) {
								this.outData.bankType = 1
								// this.usdtList()
								// uni.navigateTo({
								// 	url: '/pages/my/yhList'
								// })
							}
							// this.getList()
							// this.kefu()
						},
						// getList() {
						// 	this.$request.get({
						// 		url: '/app/dreamUserInfo/getRechargeManner',
						// 		data: {
						// 			id: this.index + 1
						// 		},
						// 		success: rsp => {
						// 			this.codearr = rsp.data
						// 		}
						// 	})
						// },
						submit() {
							// this.outData.payPassword = e
							// if (uni.getStorageSync('getUser').isDelete == 1) {
							// 	uni.showToast({
							// 		title: '实名过后再进行操作',
							// 		icon: 'none'
							// 	})
							// 	this.show = false
							// 	this.getUser()
							// 	return
							// }
							if (Number(this.outData.usdtMoeny) < 100 || !this.outData.usdtMoeny) {
								uni.showToast({
									title: "最低充值金额为100U",
									icon: 'none',
									duration: 1500
								});
								return false;
							}
							// var testmoney = /(^[1-9]([0-9]+)?([0-9])?$)|(^(0){1}$)|(^[0-9][0-9](0-9)?$)/;
							// if (!testmoney.test(this.outData.usdtMoeny)) {
							// 	uni.showToast({
							// 		title: "请输入正确的金额,且不包含小数位。",
							// 		icon: 'none',
							// 		duration: 1500
							// 	});
							// 	return false;
							// }
							if (this.outData.tradeIcon == '') {
								uni.showToast({
									title: "请上传充值凭证",
									icon: 'none',
									duration: 1500
								});
								return false;
							}
						 
						 
							this.outData.paytype=this.plist[this.payindex].name;
							
						 
							 
							this.$request.post({
								url: '/app/rechargeAuditInfo/submitRecharge',
								data: this.outData,
								success: rsp => {
									if (rsp.code == 200) {
										this.show = false
										this.getUser()
										this.toBack();
									}
									this.outData= {
										usdtMoeny: '',
										tradeIcon: '',
									}
									// uni.showToast({
									// 	title: rsp.message,
									// 	icon: 'none'
									// })
									uni.showModal({
										title: '提示',
										content: rsp.message,
										showCancel:false,
										success: function (res) {
											if (res.confirm) {
												console.log('用户点击确定');
											} 
										}
									});
								}
							})
						},
						toBack() {
							uni.navigateBack()
						}
		}
	};
</script>
 
<style lang="scss" scoped>
	
	page {
			background-color: #f3f3f3;
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