<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'积分商城'"    @back="toBack()">
	     	    		 		 	
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
		<view class="flex-column-center  mx40" style="margin-top: -70rpx; "> 
		        
			 	<view class="mt20" style="width: 100%; border-radius:8rpx;">
					 
					<image src="/static/null/jifengtop.png"  style="width: 100%;" mode="widthFix" />
				</view>
				<view class="mt20 px40" style="width:calc(100% - 26px); background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff); border-radius:8rpx;">
					
					 <view class="flex-row-between-center mt40 fz28">
					 											 <view>我的积分</view>
					 											  <view class="fz24" style="color: #8d8888;">活动规则</view>
					</view>
					<view class="mt20 fz34 fw600" style="color: #c2271c;">{{user.integral}}</view>
					<view class="flex-row-between-center mt20 fz28">
											  <image @click="toJiLu()" src="/static/null/jifeng1.png"  style="width: 200rpx;" mode="widthFix" /> 
											 
					</view>
					<view class="flex-center-center mt50  " style="">
											 <view class="px30 text-align-c" style="background-image:  url('/static/null/jifeng4.png'); 
											  background-repeat: no-repeat; 
											  background-size:cover;
											background-size: 100% 100%;
											width:260rpx;">积分有礼</view> 
					</view>
					 
				 
						 
					<view class="flex-between-center-wrap" style="width: 100%;margin: 20rpx 0;">
						<view style="width: 47%;background-color: #fff;" @click="detail(item.id,item.num)" class="shop-box"
							v-for="(item,index) in shopList" :key="index">
							<view class="flex-center-center" style="background-color: #f3f3f3;width: 300rpx;height: 300rpx;">
								<image :src="item.commodityImage" mode="aspectFill" class="br20 "
											style="width: 200rpx;height: 200rpx;padding: 10rpx 10rpx;">
										</image>
								
							</view>
							<view class="mt10 fz24 textMax2" style="color: #000000;height: 60rpx;">{{item.commodityName}}积分</view>
							<view class="flex-row-between-center mt10 fz24" style="color: #c61d13;">
								<view>{{item.commodityIntegral}}积分</view>
								<view>{{item.exchangeFrequency}}库存</view>
							</view>
						 </view>
					 </view>
					 
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
			 
				shopList: [], 
				loginInfo:{},
				pageNum: 1,
				pageSize: 100,
				total: 0,
				myLevel:0,
				list:[
				  {name:"dsfsdfa500",price:"6885.25",growrate:"-0.55"},
				 {name:"dsfsdfa500",price:"6885.25",growrate:"-0.55"},
				 {name:"dsfsdfa500",price:"6885.25",growrate:"-0.55"}
					
				],
				user:{},
				rate:'0%',
			};
		},
		onLoad() {
			 //this.getUser();
		},
		onUnload(){
			//uni.$off("lang");
		},
		onShow() {
			this.pageNum = 1
			this.getUser()
		    this.getList()
		},
		methods: {
				
			toJiLu(){
				uni.navigateTo({
					url: '/pages/home/newdhjl'
				})
			},
			detail(id, num) {
							uni.navigateTo({
								url: '/pages/point/newdetail?id=' + id + '&num=' + num
							})
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
			getList() {
				this.$request.get({
					url: "/app/integralMallInfo/integralMallList",
					data: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
					},
					success: rsp => {
						this.shopList = rsp.records
						this.totalPage = rsp.pages
						console.log(this.shopList);
						// if (this.page != 1) {
						// 	this.shopList = this.shopList.concat(rsp.records)
						// } else {
						// 	this.shopList = rsp.records
						// }
						// this.total = rsp.total
						// if (this.page * this.size >= this.total && this.total > this.size) {
						// 	uni.showToast({
						// 		title: '已加载全部',
						// 		icon: 'none'
						// 	})
						// }
						
					 
						for (var i = 0; i < this.shopList.length; i++) {
							this.shopList[i].num = 0
						}
						// for (var i = 0; i < this.list.length; i++) {
						// 	if (this.list[i].progress != 0) {
						// 		this.list[i].jindu = this.list[i].progress
						// 	} else {
						// 		if (this.list[i].alreadySold == null || this.list[i].circulation == null) {
						// 			this.list[i].jindu = 0
						// 		} else {
						// 			this.list[i].jindu = (this.list[i].alreadySold / this.list[i]
						// 				.circulation) * 100
						// 			this.list[i].jindu = this.list[i].jindu.toFixed(2)
						// 		}
						// 	}
						// 	console.log(this.list[i].jindu);
						// }
					}
				})
			},
			toBack() {
				uni.navigateBack()
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