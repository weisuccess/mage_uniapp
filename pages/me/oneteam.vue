<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'团队成员'"    @back="toBack()">
	     	    		 		 	
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
		        
			<scroll-view scroll-x="true" show-scrollbar="false" class="100">
				<view   class="mt20 fz26 flex-between-center" style="line-height: 40rpx; padding:40rpx 30rpx;width:calc(100% - 36px);background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff); border-radius: 16rpx;">
					 <view class="text-align-c" style="flex:1">
						 <view>团队总人数</view>
						 <view>{{list.marketNumber}}</view>
					 </view>
					 <view class="text-align-c" style="flex:1">
							 <view>个人建仓/团队建仓</view>
							 <view>{{user.investmentAmount}}/{{list.marketInvestment}}</view>
					 </view>
				 </view>
				
				<view   class="mt20 fz26 flex-between-center" style="line-height: 40rpx;padding:40rpx 30rpx;width:calc(100% - 36px);background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff); border-radius: 16rpx;">
					 <view class="text-align-c" style="flex:1">
						 <view>累计充值USDT</view>
						 <view>	{{list.marketRecharge}}</view>
					 </view>
					 <view class="text-align-c" style="flex:1">
							 <view>累计提现USDT</view>
							 <view>{{list.marketPayouts}}</view>
					 </view>
				 </view>
				 <view   class="mt20 fz26 flex-center-center" style="line-height: 40rpx;padding:40rpx 30rpx;width:calc(100% - 36px);background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff); border-radius: 16rpx;">
				 	 
				  
							 
							用户：
							<view class="" v-if="user.trueName">
								{{user.trueName | testuserName }}
							</view>
							<view class="" v-else>{{user.telPhone | hidePhone}}</view>
					 
				  </view>
				 			 
			 
				 <view @click="openOneteam(item)" v-for="(item,index) in list.userInfoVoList"  class="mt20"   style="line-height: 40rpx;padding:20rpx 30rpx;width:calc(100% - 36px);background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff); border-radius: 16rpx;">
				  
					<view class="fz28 fz22 flex-between-center pd10">
			             	<view>{{item.vipGradeInfo.vipGrade}}</view>
							用户：
							<view class="" v-if="item.trueName">
								{{item.trueName | testuserName }}
							</view>
							<view class="" v-else>{{item.telPhone | hidePhone}}</view>
					</view>
					<view class=" fz22 flex-between-center">
						<view class="text-align-c" style="flex:1">
										 		 <view style="color: #919191;">投资</view>
										 		 <view class="fw600">{{item.investmentAmount}}</view>
						</view>
						<view class="text-align-c" style="flex:1">
										 		 <view style="color: #919191;">充值USDT</view>
										 		 <view class="fw600">{{item.rechargeAmount}}</view>
						</view>
						<view class="text-align-c" style="flex:1">
										 			 <view style="color: #919191;">提现USDT</view>
										 			 <view class="fw600">{{item.payoutsAmount}}</view>
						</view>
					</view>
					 
				  </view>
			
			 	 
			   </scroll-view>
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
				 
				user: {},
								list: [],
								arr: [],
								page: 1,
								size: 10,
								total: 0,
								activeIndex: 0,
								isActive: 0,
								sel: ['一级', '二级', '三级', '四级', '五级', '更多'],
								level: [],
								LevelPayouts: '',
								LevelRecharge: '',
								LevelSize: '',
								LevelInvestment: '',
								statusBarHeight: uni.getStorageSync('statusBarHeight'),
								windowHeight: uni.getSystemInfoSync().windowHeight - 250,
								index: 0,
								user:{},
				 
			};
		},
		 onLoad(opt) {
			 
			 console.log(opt);
			 this.user= JSON.parse(decodeURIComponent(opt.obj.replace(/%/g, '%25')));
			 
			 
		 			 this.getList(this.user.id)
		 			// this.getUser()
		 		},
		 		methods: {
					openOneteam(item)
					{
						 console.log(item);
						 const params = JSON.stringify(item);
						 uni.navigateTo({
						 	url: 'oneteam?obj='+encodeURIComponent(params)
						 })
					},
		 			active(e) {
		 							this.isActive = e
		 							console.log(e);
		 						},
		 						getUser() {
		 							this.$request.get({
		 								url: "/app/dreamUserInfo/getUser",
		 								success: rsp => {
		 									this.user = rsp.data
											console.log(this.user);
		 								}
		 							})
		 						},
		 						marketList() {
		 							this.$request.get({
		 								url: "/app/marketAssetManageInfo/List",
		 								success: rsp => {
											console.log('list',rsp);
		 									for (var i = 0; i < rsp.data.length; i++) {
		 										if (rsp.data[i].id == this.list.marketAssetManageInfo.id) {
		 											this.index = i + 1
		 										}
		 			
		 									}
		 		 
		 								}
		 							})
		 						},
		 			
		 						toChinese(num) {
		 							const chineseNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
		 							return chineseNums[num] || num;
		 						},
		 						getList(id) {
		 							this.$request.get({
		 								url: "/app/marketAssetManageInfo/getUserMarketByLevelByUserId",
										data:{
											userId:id
										},
		 								success: rsp => {
		 									this.list = rsp.data
											console.log('getUserMarket********',this.list);
		 									this.sel = []
		 									if (!this.list.levelVoList[0]) {
		 										this.sel = ['一级']
		 										this.list.levelVoList = [{
		 											level: 0,
		 											number: 0,
		 											totalInvestment: 0,
		 											totalPayouts: 0,
		 											totalRecharge: 0,
		 										}]
		 									} else {
		 										if (this.list.levelVoList.length <= 5) {
		 											for (var i = 0; i < this.list.levelVoList.length; i++) {
		 												let title = this.toChinese(i + 1)
		 												this.sel.push(title + '级')
		 											}
		 										}
		 										if (this.list.levelVoList.length > 5) {
		 											this.sel = ['一级', '二级', '三级', '四级', '五级', '更多']
		 											let level = 0
		 											let number = 0
		 											let totalInvestment = 0
		 											let totalPayouts = 0
		 											let totalRecharge = 0
		 											let changeList = []
		 											for (var i = 0; i < this.list.levelVoList.length; i++) {
		 												if (i <= 4) {
		 													changeList.push(this.list.levelVoList[i])
		 												}
		 												if (i > 4) {
		 													level += this.list.levelVoList[i].level
		 													number += this.list.levelVoList[i].number
		 													totalInvestment += this.list.levelVoList[i].totalInvestment
		 													totalPayouts += this.list.levelVoList[i].totalPayouts
		 													totalRecharge += this.list.levelVoList[i].totalRecharge
		 													changeList[5] = {
		 														level: level,
		 														number: number,
		 														totalInvestment: totalInvestment,
		 														totalPayouts: totalPayouts,
		 														totalRecharge: totalRecharge,
		 													}
		 												}
		 											}
		 											this.list.levelVoList = [...changeList]
		 											console.log(this.list.levelVoList, changeList);
		 										}
		 									}
		 									console.log(this.sel);
		 									this.marketList()
		 								}
		 							})
		 						},
		 			
		 						toBack() {
		 							uni.navigateBack()
		 						},
		 						toPage(url) {
		 							url = "/pages/" + url
		 							uni.navigateTo({
		 								url
		 							})
		 						}
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