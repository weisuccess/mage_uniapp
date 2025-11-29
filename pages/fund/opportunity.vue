<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="title"    @back="toBack()">
	     	    		 		 	
	     </narBarAndTop>
		<!-- <view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view> -->
		<view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view>
		<view style="height: 100rpx;width: 100%;background-color: #fb4034;" class=""></view>
		
		
	
			<view style=" background-image:  url('/static/null/fundindextop.png'); 
					  background-repeat: no-repeat; 
					  background-size:cover;
					background-size: 100% 100%;
					width:100vw;
					height:200rpx				
					">  
					 
					
			 </view>
			 
			 
			  
			 
			
		<view class="flex-column-center  mx40" style="margin-top: -90rpx; "> 
		        <scroll-view scroll-y="true" :style="{height:windowHeight +'px'}" style="width: 100%;"
		        	@scrolltolower="reachBottom">
				 <view v-if="list.length==0" class="mt20 flex-center-center" style="color: #d2d2d2;height: 200rpx;width: 100%;background-color: #ffffff; border-radius: 10rpx;">
				 	无数据
				 </view>
				
			 	<view v-for="(item,index) in list" @click="detail(item.id)" class="mt20 flex-start-center" style="width: 100%;background-color: #ffffff; border-radius: 10rpx;">
					 
					<!-- <view style="width: 100rpx;color:#ffffff;height:100rpx;background-color: #d270ed; border-radius: 10rpx 0 0 10rpx;" class="fz24 text-align-c py60"> -->
						 
					 <image v-if="item.titleImage!=null" :src="item.titleImage[0]"  style="width:180rpx;height: 200rpx;border-radius: 10rpx;" mode="scaleToFill" />
					<!-- </view> -->
				
					<view class="px20" style="width: 490rpx;">
						 <view class="flex-between-center ">
							 <view class="ellipsis fz26" style="width: 250rpx;">{{item.title}}</view>
							 <view v-if="id==1" class="text-align-c fz22 fw400" style="color: #e674d0;background-color: #f6c2ee; border-radius: 38rpx;border: 2px solid #f2a1e5;padding: 3rpx 7rpx;">每日付息到期还本</view>
						
							 <view v-else-if="id==2" class="text-align-c fz22 fw400" style="color: #e9be4c;background-color: #faf1d0; border-radius: 38rpx;border: 1px solid #e9be4c;padding: 3rpx 7rpx;">每日付息到期还本</view>
							 <view v-else-if="id==3" class="text-align-c fz22 fw400" style="color:#e827bf;background-color: #f8c3ed; border-radius: 38rpx;border: 1px solid #e827bf;padding: 3rpx 7rpx;" >每日付息到期还本</view>
							 <view v-else-if="id==4" class="text-align-c fz22 fw400" style="color:#367fe1;background-color: #a6c3fe; border-radius: 38rpx;border: 1px solid #367fe1;padding: 3rpx 7rpx;">每日付息到期还本</view>
						
							<view v-else-if="id==5" class="text-align-c fz22 fw400" style="color:#ed2952;background-color: #f79cad; border-radius: 38rpx;border: 1px solid #ed2952;padding: 3rpx 7rpx;">每日付息到期还本</view>
						 
						 
						 </view>
						 
						 <view class="flex-between-center">
							<view class="mt10 flex-column-center" style="padding: 5rpx 0; width:160rpx;border-radius: 8rpx;background-color: #f8f8f8;">
												<view class="fz22">单价</view>
												<view class="fw600 fz20">{{item.monovalent}} USDT/份</view>
											</view>
							 <view class="mt10 flex-column-center" style="padding: 5rpx 0; width:210rpx;border-radius: 8rpx;background-color: #f8f8f8;">
												<view class="fz22">项目规模</view>
												<view class="fw600 fz20">{{item.circulation}} USDT</view>
							 </view>
							 <view class="mt10 flex-column-center" style="padding: 5rpx 0; width:80rpx; ">
												<view class="fz22 fw600" :style="{ color: textColor}">{{item.interestRate}}%</view>
												<view class="fw600 fz20" :style="{ color: textColor}">日利率</view>
							 </view>
							 
						 </view>
						 <view class="mt20 flex-start-center fz20 fw600" style="width: 400rpx;">
						 	<view style="border-radius: 38rpx;border: 1px solid #b8b8b8; padding: 2rpx 14rpx;">周期:3天</view>
						 	<view class="ml20" style="border-radius: 38rpx;border: 1px solid #b8b8b8; padding: 2rpx 14rpx;">限购:1份</view>
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
				title:'',
				id:0,
				textColor: 'blue',
				list:[
				  {name:"dsfsdfa500",price:"6885.25",growrate:"-0.55"},
				 {name:"dsfsdfa500",price:"6885.25",growrate:"-0.55"},
				 {name:"dsfsdfa500",price:"6885.25",growrate:"-0.55"}
					
				],
				user:{},
				totalPage: 0,
				isActive: null,
				opportunityType: null,
				noClick: true,
				page: 1,
				size: 10,
				total: '',
			 
			};
		},
		onLoad(opt) {
			console.log(opt);
			this.title=opt.name
			this.id=opt.id
			if(this.id==1)
			{
				this.textColor='#e674d0'
			}else if(this.id==2)
			{
				this.textColor='#e9be4c'
			}else if(this.id==3)
			{
				this.textColor='#e827bf'
			}else if(this.id==4)
			{
				this.textColor='#367fe1'
			}else if(this.id==5)
			{
				this.textColor='#ed2952'
			} 
			
		},
		onUnload(){
			//uni.$off("lang");
		},
		onShow() {
			this.page = 1
			 this.getList()
		},
		methods: {
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
			detail(id) {
				uni.navigateTo({
					url: '/pages/fund/newdetail?id=' + id
				})
			},
			
			getList() {
				
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
										if (this.list[i].titleImage.includes(',') == true) {
											this.list[i].titleImage = this.list[i].titleImage.split(',')
										} else {
											this.list[i].titleImage = [this.list[i].titleImage]
										}
									}
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