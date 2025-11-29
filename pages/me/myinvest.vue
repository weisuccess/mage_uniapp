<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'我的投资'"    @back="toBack()">
	     	    		 		 	
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
				<view   class="mt20 fw400 fz26 flex-between-center" style="line-height: 40rpx; padding:40rpx 30rpx;width:calc(100% - 36px);background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff); border-radius: 16rpx;">
					 <!-- <view class="text-align-c" style="flex:1">
						 <view class="fw600" style="color: #ba0000;">{{incomeDetail.earningsAddinvestmentAmount}}</view>
						 <view style="color: #919191;">已收本息</view>
					 </view> -->
					 <view class="text-align-c" style="flex:1">
							<view class="fw600 fz40" style="color: #ba0000;">{{incomeDetail.toBeCollectedAddinvestmentAmount}}</view>
							<view style="color: #919191;" class="mt10">待收本息</view>
					 </view>
				 </view>
				 
				 <view class="mt20" style="min-height: 500rpx;line-height: 40rpx;padding:20rpx 30rpx;width:calc(100% - 36px);background-color: #ffffff; border-radius: 16rpx;">
					 <view v-for="(item,index) in list"  class="mt20 py20"  :class="['xhx', { 'last-item': index === 10 - 1 }]"    >
						 
						<view class="fz28 fz22 fw600 flex-between-center pd10">
								<view class="ml20 textMax2" style="width: 420rpx;">{{item.positionName}}</view>
				 <view @click="hetong(item.id)" class=" mt10 color-fff fz22  fw400" style="background-color: #dd3b3d;padding: 1rpx 20rpx;border-radius: 40rpx;">查看合同</view>
								 <!-- <view class="fz24 fw400 " @click="hetong(item.id)" >查看合同</view> -->
						</view>
						<view class=" fz22 flex-between-center">
							<view class="text-align-c" style="flex:1">
													 <view style="color: #919191;">金额</view>
													 <view class="fw600"  >{{item.positionPrice}}</view>
							</view>
							<view class="text-align-c" style="flex:1">
													 <view style="color: #919191;">今日收益</view>
													 <view class="fw600" style="color: #e9393c;">+{{item.todayEarnings|tonull}}</view>
							</view>
							<view class="text-align-c" style="flex:1">
														 <view style="color: #919191;">累计收益</view>
														 <view class="fw600" style="color: #e9393c;">+{{item.obtainEarnings}}</view>
							</view>
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
				 user:{},
				list:[
				  {name:"dsfsdfa500",price:"6885.25",growrate:"-0.55"},
				 {name:"dsfsdfa500",price:"6885.25",growrate:"-0.55"},
				 {name:"dsfsdfa500",price:"6885.25",growrate:"-0.55"}
					
				],
				
				isActive: 1,
				page: 1,
				size: 10,
				total: '',
				list: [],
				search: '',
				incomeDetail: {}
				 
			};
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
		 			this.page = 1
					// this.getUser()
		 		  	this.getList()
		 			 this.incomeDetails()
		 		},
		 		methods: {
					getUser() {
						this.$request.get({
							url: "/app/dreamUserInfo/getUser",
							success: rsp => {
								this.user = rsp.data
								console.log(this.user);
								}
								})},
		 			incomeDetails() {
		 				this.$request.get({
		 					url: "/app/positionUser/incomeDetails",
		 					success: rsp => {
		 						this.incomeDetail = rsp.data
								
								console.log('incomeDetails》》》》',rsp.data);
							 
		 						this.incomeDetail.investmentAmount = this.incomeDetail.investmentAmount.toFixed(2)
		 						this.incomeDetail.today = this.incomeDetail.today.toFixed(2)
		 						this.incomeDetail.earnings = this.incomeDetail.earnings.toFixed(2)
		 						this.incomeDetail.toBeCollected = this.incomeDetail.toBeCollected.toFixed(2)
						 
								  const v1=parseFloat(rsp.data.investmentAmount)
								const v2=parseFloat(rsp.data.earnings)
								this.incomeDetail.earningsAddinvestmentAmount=(v1+v2).toFixed(2)
								
								const v3=parseFloat(rsp.data.investmentAmount)
								const v4=parseFloat(rsp.data.toBeCollected)
								this.incomeDetail.toBeCollectedAddinvestmentAmount=(v3+v4).toFixed(2)
		 					}
		 				})
		 			},
		 
		 			hetong(id) {
		 				uni.navigateTo({
		 					url: '/pages/me/newhetong?id=' + id
		 				})
		 			},
		 
		 			// pdfPreview(url) {
		 			// 	var title = '预览'
		 			// 	uni.showLoading({
		 			// 		title: '加载中',
		 			// 		mask: true
		 			// 	})
		 			// 	//由于android 下webview无法直接打开pdf，需要先下载
		 			// 	uni.getSystemInfo({
		 			// 		success: res => {
		 			// 			console.log(res.platform);
		 			// 			// if (res.platform === 'android') {
		 			// 			wx.downloadFile({
		 			// 				url: url,
		 			// 				// filePath: wx.env.USER_DATA_PATH  + "/我的协议.pdf",
		 			// 				success: function(res) {
		 			// 					const filePath = res.tempFilePath;
		 			// 					uni.showLoading({
		 			// 						title: '正在打开',
		 			// 						mask: true
		 			// 					})
		 			// 					wx.openDocument({
		 			// 						filePath: filePath,
		 			// 						showMenu: true, // 显示右上角菜单
		 			// 						fileType: "pdf",
		 			// 						success: function(res) {
		 			// 							uni.hideLoading()
		 			// 							console.log('打开文档成功');
		 			// 						},
		 			// 						fail: function(err) {
		 			// 							uni.hideLoading()
		 			// 							console.log('fail:' + JSON.stringify(err));
		 			// 						}
		 			// 					});
		 			// 				}
		 			// 			});
		 			// 			// } else {
		 			// 			// 	this.$tab.navigateTo(`/pagesA/common/webview/index?title=${title}&url=${url}`)
		 			// 			// }
		 			// 		}
		 			// 	});
		 			// },
		 			// gethetong(id) {
		 			// 	uni.showLoading({
		 			// 		title: '加载中',
		 			// 		mask: true
		 			// 	})
		 			// 	this.$request.get({
		 			// 		url: "/app/contractInfo/query?id=" + id,
		 			// 		success: rsp => {
		 			// 			this.list = rsp.data
		 			// 			if (rsp.code != 200) {
		 			// 				uni.showToast({
		 			// 					title: rsp.message,
		 			// 					icon: 'none',
		 			// 					duration: 1000
		 			// 				});
		 			// 			}
		 			// 			this.pdfPreview(this.list)
		 			// 		}
		 			// 	})
		 			// },
		 			searchvalue(e) {
		 				// this.search = e.detail.value
		 				clearTimeout(this.timer);
		 				this.timer = setTimeout(() => {
		 					this.page = 1
		 					this.list = []
		 					this.getList()
		 				}, 500); // 500毫秒后执行
		 			},
		 			reachBottom() {
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
		 			check(e) {
		 				this.page = 1
		 				this.isActive = e
		 				this.getList()
		 			},
		 			toBack() {
		 				uni.navigateBack(1)
		 			},
		 			getList() {
						console.log("成功");
		 				this.$request.get({
		 					url: "/app/positionUser/getUserPosition",
		 					data: {
		 						pageNum: this.page,
		 						pageSize: this.size,
		 						goodsType: 1,
		 						positionType:0
		 					},
		 					success: rsp => {
		 						// console.log(rsp, this.page);
		 						if (this.page != 1) {
		 							this.list = this.list.concat(rsp.records)
		 						} else {
		 							this.list = rsp.records
		 						}
								console.log('list',this.list);
					 
		 						// if (this.list[0]) {
		 						// 	for (var i = 0; i < this.list.length; i++) {
		 						// 		this.list[i].sy = (this.list[i].monovalent * (this.list[i].positionEarnings /
		 						// 				100))
		 						// 			.toFixed(2)
		 						// 	}
		 						// }
		 						//将获取的总条数赋值
		 						this.total = rsp.total
		 						if (this.page * this.size >= this.total && this.total > this.size) {
		 							uni.showToast({
		 								title: '已加载全部',
		 								icon: 'none'
		 							})
		 						}
		 						for (var i = 0; i < this.list.length; i++) {
		 							if (this.list[i].imgUrl.includes(',') == true) {
		 								this.list[i].imgUrl = this.list[i].imgUrl.split(',')
		 							} else {
		 								this.list[i].imgUrl = [this.list[i].imgUrl]
		 							}
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
		
		 
		 
		 .xhx{
		 		
		 		border-bottom: 1rpx solid #c5c5c5;
		 	} 
		 	.last-item {
		 	  border-bottom: none !important;
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