<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'兑换记录'"    @back="toBack()">
	     	    		 		 	
	     </narBarAndTop>
		<!-- <view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view> -->
		<view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view>
		<!-- <view style="height: 100rpx;width: 100%;background-color: #fb4034;" class=""></view> -->
		
		
	
			<view style=" background-image:  url('/static/null/fundindextop.png'); 
					  background-repeat: no-repeat; 
					  background-size:cover;
					background-size: 100% 100%;
					width:100vw;
					height:200rpx				
					">  
					 
					
			 </view>
		<view class="flex-column-center  mx40" style="margin-top: -90rpx; "> 
		        
			 	<view class="mt20" style="width: 100%;min-height: 600rpx;">
					 
					<view  v-for="(item,index) in list" :key="index"  class="flex-center-center  fz24 fw400 " style="padding: 25rpx 0;;background-color: #ffffff; border-radius: 16rpx;">
					 
							 
					<view class="flex-between-center px20" style="flex:1;color:#000000;line-height: 35rpx;">
						<view class="ml20">
						  <image :src="item.exchangeImage" class="br10"
							style="width: 200rpx;height:150rpx;margin-right: 20rpx;">
						  </image>
						</view>
						<view class="mx20 line-height: 40rpx; ">
							<view class="fw600">{{item.createTime | dateFormat}}</view> 
							<view class="fz26 my10" style="color:#606060;">{{item.exchangeIntegral}}积分</view>
							<view class="fw600 textMax3">{{item.exchangeName}}</view>
						</view>
						<view @tap="look(item,'sp')" class="text-align-c pd2" style="color: #df332d;border: 2rpx solid #a50000;border-radius: 7rpx;">物流查询</view>
					 
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
				outData: {
					tradeValue: 0,
				},
				list: [],
				pageNum: 1,
				pageSize: 10,
				total: 0,
				type: '',
				title: '',
				range: ['2021-02-1', '2021-3-28'],
			};
		},
		created() {
					const today = new Date();
					const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
					const year = firstDay.getFullYear();
					const month = String(firstDay.getMonth() + 1).padStart(2, '0');
					const day = String(firstDay.getDate()).padStart(2, '0');
		
					const year1 = today.getFullYear();
					const month1 = String(today.getMonth() + 1).padStart(2, '0');
					const day1 = String(today.getDate()).padStart(2, '0');
		
					this.range[0] = `${year}-${month}-${day}`;
					this.range[1] = `${year1}-${month1}-${day1}`;
					this.getList()
				},
				onLoad(opt) {
					this.getUser()
				},
				onShow() {
					this.pageNum = 1
				},
				methods: {
					maskClick(e) {
						console.log('maskClick事件:', e);
					},
					reachBottom() {
						if (this.pageNum * this.pageSize >= this.total) {
							// uni.showToast({
							// 	title: '已加载全部',
							// 	icon: 'none'
							// })
							return
						}
						//并且让页码+1,调用获取数据的方法获取第二页数据
						this.pageNum++
						//此处调用自己获取数据列表的方法
						this.getList()
					},
					look(item, name) {
						uni.navigateTo({
							url: '/pages/me/neworderDetails?item=' + JSON.stringify(item) + '&type=' + name
						})
					},
					//获取列表
					getList() {
						this.$request.get({
							url: "/app/integralExchangeInfo/integralExchangeInfoList",
							data: {
								pageNum: this.pageNum,
								pageSize: this.pageSize,
								startTime: new Date(this.range[0] + ' 00:00:00').getTime(),
								endTime: new Date(this.range[1] + ' 23:59:59').getTime()
							},
							success: rsp => {
								if (this.pageNum != 1) {
									this.list = this.list.concat(rsp.records)
								} else {
									this.list = rsp.records
								}
								//将获取的总条数赋值
								this.total = rsp.total
								if (this.pageNum * this.pageSize >= this.total && this.total > this.pageSize) {
									uni.showToast({
										title: '已加载全部',
										icon: 'none'
									})
								}
							}
						})
					},
					checkAddress() {
						uni.navigateTo({
							url: '/pages/me/dizhi'
						})
					},
					getUser() {
						this.$request.get({
							url: "/app/dreamUserInfo/getUser",
							success: rsp => {
								this.money = rsp.data.balance
							}
						})
					},
					search() {
						this.page = 1
						this.list = []
						this.getList()
					},
					num(e) {
						if (e == 1) {
							this.outData.tradeValue -= 1
						}
						if (e == 2) {
							this.outData.tradeValue += 1
						}
					},
					toBack() {
						uni.navigateBack(1)
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