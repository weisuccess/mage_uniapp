<template>
	
	<view class="content">
	    
		<view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view>
		<!-- <view style="height: 100rpx;width: 100%;background-color: #66c11f;" class="">abcdef</view> -->
 
		<view style=" font-family: 'YaHei'; background-image:  url('/static/null/fundindextop.png'); 
		  background-repeat: no-repeat; 
		  background-size:cover;
		background-size: 100% 100%;
		width:100vw;
		height:200rpx
		
		">  
		<view class="text-align-c fz32" style="color: #fff;;">理财</view>
		</view>
	 
		 
		
		<view class="flex-column-center  mx30" style="margin-top: -60rpx; ">
		 
		 
		 <view style="background-image:  url('/static/null/fundindex2.png');
		   background-repeat: no-repeat; 
		   background-size:cover;
		 background-size: 100% auto;
		 width:100%;
		 
		 ">  
		 
		<!-- <view class="flex-between-center fz28 " style="color: #ffffff;padding: 20rpx 40rpx;" >
			 <view class="flex-column-center">
				 <view>
					 总资产
				 </view>
				 <view class="mt10">
				 	 {{user.investmentAmount+user.balance}}
				 </view>
			 </view>
			   <view class="flex-column-center">
					 <view>
						 持有资产
					 </view>
					 <view class="mt10">
						 {{user.investmentAmount}}
					 </view>
			   </view>
			   <view class="flex-column-center">
					 <view>
						 昨日收益
					 </view>
					 <view class="mt10">
						 {{user.earnings}}
					 </view>
			   </view>
			 
		 </view> -->
			 
		 
		 
		  
	 </view>
		 <view class="" style="border-radius: 10rpx;background-color: #fff;width: 100%;
		  display: flex;         
		   flex-wrap: wrap; 
		   width: 100%;  
		   gap: 10px; 
		   padding: 10px;  
		   box-sizing: border-box; 
		 ">
		 
			 <view @click="toShow(index)" v-for="(item,index) in menus" style="
			 flex: 1 0 calc(25% - 10px); 
			   height: 80px;  
			 
			   display: flex; 
			     flex-flow: column nowrap;
			   align-items: center;   
			   justify-content: center;  
			   border-radius: 4px; 
			 ">
			 <view> 
				 <image :src="item.pic"	style="width: 60rpx;" class="zoom-animation" mode="widthFix" /> 
			 </view>			 
			 <view class="fw600 fz26">{{item.name}}</view>
			 </view>
			 
		 </view>
			 
			  
		
		 </view>
		 
		<scroll-view scroll-y="true" :style="{height:windowHeight +'px'}" style="width: 100%;margin-top: 20rpx; "
					@scrolltolower="reachBottom">
		<view class="flex-column-start mx30" style=" border-radius: 8rpx;background-color: #ffffff;padding: 20rpx 20rpx;margin-top: 0rpx;" >
			 <view class="flex-between-center">
				 <view class="flex-start-center">
					 <view class="fw600 fz32">热门投资</view>
					 <image src="/static/null/fundindex_c1.png"	style="width: 80rpx;margin-left: 10rpx;" mode="widthFix" />
				 </view>
				  
				 <view @click="allList()" class="fw600 fz24"style="">查看全部</view>
			 </view>
			 
			 
			 
				 <view  class="flex-between-center mt20" v-for="(item,index) in list" @click="detail(item.id)"  style="border-radius: 8rpx;background-color: #f3f3f3;  ;padding:10rpx 10rpx 10rpx 10rpx;">
				 
					 <image v-if="item.titleImage!=null" :src="item.titleImage[0]"  style="width:150rpx;height: 100rpx;" mode="scaleToFill" />
					 <view class="flex-column-start" style="font-family: 'YaHei';width: 470rpx;line-height: 30rpx;">
						 <view class="fz28 fw600 ellipsis" style="">{{item.title}}</view>
						 <view class="flex-between-center">
							 <view class=" mt10 fz24 fw400">
									利率:<text class="color-ef0304">{{item.interestRate}}%</text>						 
							  </view>
												 
							 <view class=" mt10 fz24 fw400">
									 周期:<text class="color-ef0304">{{item.holdTime}}天</text>						 
							 </view>
							 <view class=" mt10 color-fff fz22 " style="background-color: #dd3b3d;padding: 5rpx 20rpx;border-radius: 20rpx;">立即持有</view>
						 </view>
					 </view>
					 
				 </view>
				  
			  
		</view>	
		</scroll-view> 
		<!-- <view class="flex-column-center  mx40 px30" style="border: 2rpx solid #ffffff;; margin-top: 15rpx;border-radius: 10rpx; background: linear-gradient(135deg, #fcedb4, #f79369, #f8a38f);">
			 <view class="flex-between-center mt20" style="width: 100%;">
			 	<view class="fw600 color-ffff fz34" style=" font-style: italic;"><text style="color: #ef0304;">股神</text>训练营</view>
			 	<view class="fw600 color-ffff fz24">收起</view>
			 </view>
			 <view  class="flex-between-center my30" style="border-radius: 10rpx;color: #000000;width: 100%; ">
			 	<view style="height: 260rpx;border-radius: 10rpx;flex:1;margin-right: 10rpx;background-color: #fff;" class="bg1 pd20 flex-column-start">
			 		 <view class="mt20 fw600">国际行情</view>
					 
					 
			 	</view>
			 	<view style="height: 260rpx;border-radius: 10rpx;;flex:1;margin-left: 10rpx;background-color: #fff;" class="bg2 pd20 flex-column-start"> 
					<view class="mt20 fw600">热门话题</view>
					
					<view class="fz28 mt40 "><text style="color:#ef0304; ;">1.</text>中概股下挫，小马智行跌近7%</view>
					 
				</view>
			 	 
			 </view>
		 </view>
		<view class="flex-column-center  mx10 px30" style="margin-top: 15rpx;">
			<view class="flex-start-center mt20" style="width: 100%;">
				<image src="/static/null/menufire.png"	style="width: 40rpx;margin-left: 0rpx;" mode="widthFix" /> 
				<view class="fw600 fz36 ml20">热点资讯</view>
			</view>
			 
			<view class="flex-start-start mt20" style="width: 100%;">
				<view style="width: 200rpx;height: 100rpx;" class="bac">1111</view>
				<view class="bac" style="margin-left: 20rpx;">
					<view>中概股下挫，小马智行跌近7%，阿里跌超3%，加密货</view>
				</view>
			</view>
		</view> -->
		
		<!-- <view class="mt50"></view> -->
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 380,
				noClick: true,
				  
				page: 1,
				size: 10,
				total: '',
				totalPage: 0,
			 
				menus:[
				  {pic:"/static/null/fundindex_a1.png",name:"新手体验",path:"opportunity?id=1&name=新手体验"},
				 {pic:"/static/null/fundindex_a2.png",name:"稳健理财",path:"opportunity?id=2&name=稳健理财"},
				  {pic:"/static/null/fundindex_a3.png",name:"期货市场",path:"opportunity?id=3&name=期货市场"},
				   {pic:"/static/null/fundindex_a4.png",name:"基金市场",path:"opportunity?id=4&name=基金市场"},
				    {pic:"/static/null/fundindex_a5.png",name:"外汇市场",path:"opportunity?id=5&name=外汇市场"},
					 {pic:"/static/null/fundindex_a6.png",name:"债券市场",path:"opportunity?id=6&name=债券市场"},
					  {pic:"/static/null/fundindex_a7.png",name:"全球金融",path:"opportunity?id=7&name=全球金融"},
					   {pic:"/static/null/fundindex_a8.png",name:"最新活动",path:""},
					
				],
				list:[],
				id:1,
				user:{},
				 
			};
		},
		onLoad() {
			 this.getUser();
			 this.getList()
		},
		onUnload(){
			//uni.$off("lang");
		},
		onShow() {
					this.page = 1
					 this.getList()
				},
		methods: {
			detail(id) {
				uni.navigateTo({
					url: '/pages/fund/newdetail?id=' + id
				})
			},
			toShow(index)
			{
				console.log(index);
				if(index==7)
				{
					console.log(555);
					uni.navigateTo({
						url: '/pages/fund/huodong'
					})
					
					return;
				}
				
				this.page=1;
			   this.id=index+1;
			    
				this.getList()
			},
			reachBottom() {
				 
				//判断 如果页码*页容量大于等于总条数，提示该页数据加载完毕
				if (this.page * this.size >= this.total) {
					// uni.showToast({
					// 	title: '已加载全部',
					// 	icon: 'none'
					// })
					return
				}
				//并且让页码+1,调用获取数据的方法获取第二页数据
				this.page++
				//此处调用自己获取数据列表的方法
				this.getList()
			},
			toPage(path) {
							 console.log(path);
				 
					 
				uni.navigateTo({
					url: path
				})
			},
			allList(){
				this.id=null;
				this.getList();
			},
			getList() {
				console.log(this.id,this.size,this.page);
					this.opportunityType=this.id;
							this.$request.get({
								url: "/app/opportunityInfo/list",
								data: {
									pageNum: this.page,
									pageSize: this.size,
									opportunityType: this.opportunityType
								},
								success: rsp => {
									if (this.page != 1) {
										this.list = this.list.concat(rsp.records)
									} else {
										this.list = rsp.records
									}
									console.log(rsp.records);
									//将获取的总条数赋值
									this.total = rsp.total
									this.totalPage = rsp.pages
									if (this.page * this.size >= this.total && this.total > this.size) {
										uni.showToast({
											title: '已加载全部',
											icon: 'none'
										})
									}
									for (var i = 0; i < this.list.length; i++) {
										// console.log('开始',this.list[i].titleImage, this.list[i].titleImage  instanceof Array);
										var isarr=this.list[i].titleImage  instanceof Array
									 
										if (isarr) {
											// this.list[i].titleImage = this.list[i].titleImage.split(',')
										} else {
											this.list[i].titleImage = [this.list[i].titleImage]
										}
										
										 
									}
									
								}
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
			 
			toBack() {
				uni.navigateBack()
			},
		}
	};
</script>
 
<style lang="scss" scoped>
	@keyframes zoomInOut {
	  0%, 100% {
	    transform: scale(0.9);
	  }
	  50% {
	    transform: scale(1.1); /* 放大到1.5倍 */
	  }
	}
	.zoom-animation {
	  animation: zoomInOut 1s ease-in-out infinite; /* 2秒完成一次动画，无限次播放 */
	}
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
		   height: 100vh;
		  	background-color: #e7e9e9;
		 
		  
	 
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