<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'财务明细'"    @back="toBack()">
	     	    		 		 	
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
		        <!-- <view   class="mt20 fw400 fz26 flex-between-center" style="line-height: 40rpx; padding:40rpx 30rpx;width:calc(100% - 36px);background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff); border-radius: 16rpx;">
		        	 <view class=" " style="flex:1">
		        		 <view class="fw600" style="color: #ba0000;">{{user.balance}} <text style="color: #2a2a2a;" class="ml10">USDT</text> </view>
		        		 <view style="color: #919191;">账户余额</view>
		        	 </view>
		        	 <view class="flex-end-center" style="flex:1">
		        			<view class="text-align-r mr20" >
		        				<view style="color: #ba0000;">{{user.earnings}}</view>
		        				<view>已收本息</view>
		        			</view>
		        			<view class="text-align-r mr20" >
		        				<view style="color: #ba0000;">{{user.toBeCollected+user.investmentAmount}}</view>
		        				<view>待收本息</view>
		        			</view>
		        	 </view>
		         </view> -->
			 	 <view  class="flex-column-center  mx40" style="margin-top: 20rpx; "> 
			 	 		       <scroll-view scroll-y="true" class=""  @scrolltolower="reachBottom" :style="{'height':windowHeight+'px'}">  
			 	 			 	<view v-for="(item,index) in list" class="mt20" style="
			 	 				width:calc(100vw - 46px);
			 	 				background-image:  url('/static/null/txjl1.png');
			 	 						  background-repeat: no-repeat; 
			 	 						  background-size:cover;
			 	 						background-size: 100% 100%
			 	 				       border-radius: 8rpx;">
			 	 					<view  class="flex-column-start fz24  fw400 py20 " style="margin: 0rpx 20rpx;">
			 	 						 <view class="flex-between-center" style="width: 630rpx;line-height: 40rpx;">
			 	 							  
			 	 							 <view class="textMax2" style="width: 380rpx;"><text class="fw600 fz22" style="color: #000000;" decode>{{item.tradeTitle}}{{kong}}</text></view>
			 	 							<view class="fw400 fw600   " style="color:#c69e1a ;" :style="{'color':item.tradeDirection=='in'?'#00A00B':'#D21112'}">
			 	 							{{item.tradeDirection=='in'?'+':'-'}}
			 	 							{{item.tradeValue}} <text class="ml10">USDT</text>
			 	 								 </view>
			 	 						 </view>
			 	 						
			 	 						  <view class="fz24 fw400" style="color: #bbbbbb;" >{{item.createTime | dateFormat}}</view>
			 	 						 			 	 						 			 	 						 
			 	 						 			 	 						 
			 	 						 			 	 						 <!-- #c69e1a -->
			 	 						 			 	 						 <!-- #e51526 -->
			 	 						 			 	 						 <!-- #32bc84 -->
			 	 					</view>
			 	 					
			 	 					 
			 	 					
			 	 				</view>
			 	 				</scroll-view>
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 140,
				noClick: true,
				kong:'&ensp;',
				page: 1,
								size: 10,
								startTime: '',
								total: '',
								list: [],
								user:{},
								range: ['', ''],
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
				onReachBottom() {
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
				onLoad() {
					this.getUser()
				},
				methods: {
					
					getUser() {
						this.$request.get({
							url: "/app/dreamUserInfo/getUser",
							success: rsp => {
								this.user = rsp.data
								console.log(this.user);
								
							 }
						})
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
					search() {
						this.page = 1
						this.list = []
						this.getList()
					},
					maskClick(e) {
						console.log('maskClick事件:', e);
					},
					reject(item) {
						if (item.tradeStatus == 3) {
							uni.showModal({
								title: '驳回原因',
								content: item.refuseReason || '无',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						}
		
					},
					toBack() {
						uni.navigateBack()
					},
					getList() {
						this.$request.get({
							url: "/app/userAccountTradeRecord/list",
							data: {
								pageNum: this.page,
								pageSize: this.size,
								 
							},
							success: rsp => {
								if (this.page != 1) {
									this.list = this.list.concat(rsp.records)
								} else {
									this.list = rsp.records
								}
								console.log(this.list);
								//将获取的总条数赋值
								this.total = rsp.total
								if (this.page * this.size >= this.total && this.total > this.size) {
									uni.showToast({
										title: '已加载全部',
										icon: 'none'
									})
								}
							}
						})
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