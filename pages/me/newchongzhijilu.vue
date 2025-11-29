<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'充值记录'"    @back="toBack()">
	     	    		 		 	
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
		    <scroll-view scroll-y="true"   @scrolltolower="reachBottom" :style="{'height':windowHeight+'px'}">
			 	<view class="" style="width: 100%;background-color: #ffffff; border-radius: 16rpx;">
					<view  class="flex-center-center fz28 pt30  fw400">
						<view class=" text-align-c" style="flex:1">充值时间</view>
						<view class=" text-align-c" style="flex:1">充值金额</view>
						<view class=" text-align-c" style="flex:1">状态</view>
					</view>
					
					<view  v-for="(item,index) in list"  class="flex-center-center  fz24 fw400 " style="padding: 25rpx 0;border-bottom: 1rpx solid #c5c5c5;">
					 
							 
					<view class="  text-align-c fz22" style="flex:1;color:#a6a6a6">{{item.createTime | dateFormat}}</view>
					<view class="  text-align-c" style="flex:1;color:#696969">{{item.usdtMoeny}}</view>
					<!-- #ea564d -->
					 <!-- #32bf68 -->
					<view class=" fw600 text-align-c " style="flex:1;color:#c69e1a ;" :style="{'color':item.tradeStatus==2?'#32bc84':item.tradeStatus==3?'#e51526':''}">
									{{item.tradeStatus==1?'进行中':item.tradeStatus==2?'成功':item.tradeStatus==3?'驳回':''}}
						
						
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 120,
				noClick: true,
				page: 1,
				size: 10,
				startTime: '',
				total: '',
				list: [],
				range: ['2021-02-1', '2021-3-28'],
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
			//this.getList()
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
							url: "/app/rechargeAuditInfo/getUserRecharge",
							data: {
								pageNum: this.page,
								pageSize: this.size,
								startTime: new Date(this.range[0] + ' 00:00:00').getTime(),
								endTime: new Date(this.range[1] + ' 23:59:59').getTime()
							},
							success: rsp => {
								if (this.page != 1) {
									this.list = this.list.concat(rsp.records)
								} else {
									this.list = rsp.records
								}
								
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