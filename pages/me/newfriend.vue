<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb403400'"  :title="'邀请好友'"    @back="toBack()">
	     	    		 		 	
	     </narBarAndTop>
		<!-- <view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view> -->
		<view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view>
	 
		
		 
	
			<view style=" background-image:  url('/sta'); 
					  background-repeat: no-repeat; 
					  background-size:cover;
					background-size: 100% 100%;
					width:100vw;
					height:200rpx				
					">  
					 
					
			 </view>
		<view class="flex-column-center  mx40" style="margin-top:0rpx; "> 
		        
			 	<view class="mt20 flex-column-start-center " style="width: 98%;			 
				 
				 border-radius: 16rpx;">
				 <view class="flex-column-start-center" style=" padding: 0rpx 200rpx;height: 200rpx;background-color: #fbcd89;border-radius: 20rpx;">
					 <view style="color: #eb6f41;" class="mt20 fw600 fz28">专属邀请码</view>
					 <view style="padding-top: 20rpx;font-size: 50rpx;color: #fff;" class="fw600">
					  {{list.inviteCode}}					 	
					 </view>
				 </view>
				 
				 <view @click="copy(list.inviteCode)" class="flex-column-start-center fz30" style=" margin-top: -20rpx;padding: 10rpx 60rpx;background-color: #fb2713;border-radius: 50rpx;color: #fff;">
				 					 复制
				 </view>
				<view class="flex-between-center fz30  " style=" margin-top: 30rpx;width:60%;">
					<image src="/static/home/friend4.png" @click="copy(list.anzhuoDownload)"  style="width: 160rpx;" mode="widthFix" />
					<image src="/static/home/friend3.png" @click="copy(list.iosDownload)"  style="width: 160rpx;" mode="widthFix" />
				</view>
				
				
				
			
			
					
					<!-- <view class="  flex-column-start-center color-fff" style="line-height: 50rpx; margin-top: 70rpx;;width: 48%;
					 background-image:  url('/static/null/yaoqing2.png'); 
					 					  background-repeat: no-repeat; 
					 					  background-size:cover;
					 					background-size: 100% 100%; 
					 					height:300rpx
					 
					 border-radius: 16rpx;">
				 
							<image src="/static/null/xiazaidizhi.png" mode="widthFix"
								style="width: 160rpx; border-radius: 20rpx;margin-top: 30rpx;">
							</image>
							<view>邀请码</view>
							<view>{{list.inviteCode}}</view>
					 </view> -->
					<!-- <view style="margin-top: 80rpx;width:550rpx;font-size: 26rpx;">
						成功邀请好友使用邀请码{{list.inviteCode}}注册并进行有效投资可享推荐奖励分成，
						
					</view>
					<view style="margin-top: 30rpx;width:550rpx;font-size: 20rpx;">
											下载链接:{{list.iosDownload}}
					 </view> -->
					
					 
				</view>
		</view>
		<view class="" style="width: 100vw;">
			 <image src="/static/home/friend2.png" class="mt40"  style="width: 100vw;" mode="widthFix" /> 
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
				 
					list: [],
								getsys: {}
			};
		},
		onLoad(opt) {
					this.getInviteCode()
				 
				},
				methods: {
					kefu() {
						uni.navigateTo({
							url: '/pages/webview/webview2?url=' + this.qlList.officialImage
						})
					},
					copy(name) {
						uni.setClipboardData({
							data: name,
							success: function() {
								console.log('success');
								uni.showToast({
									title: '复制成功！',
									icon: 'none'
								})
							}
						});
					},
					getInviteCode() {
						this.$request.get({
							url: "/app/dreamUserInfo/getInviteCode",
							success: rsp => {
								console.log(rsp.data);
								this.list = rsp.data
							}
						})
					},
					// getSysConfig() {
					// 	this.$request.get({
					// 		url: "/app/versionHistory/getSysConfig",
					// 		success: rsp => {
					// 			console.log('===',rsp.data);
					// 			this.getsys = rsp.data
					// 		}
					// 	})
					// },
		
					submit() {
						// 首先下载图片
						uni.downloadFile({
							url: this.list.inviteQr,
							success: downloadResult => {
								console.log(downloadResult);
								if (downloadResult.statusCode === 200) {
									// 下载成功，保存图片到系统相册
									uni.saveImageToPhotosAlbum({
										filePath: downloadResult.tempFilePath,
										success: () => {
											uni.showToast({
												title: '图片保存成功'
											});
										},
										fail: () => {
											uni.showToast({
												title: '图片保存失败',
												icon: 'none'
											});
										}
									});
								} else {
									uni.showToast({
										title: '图片下载失败',
										icon: 'none'
									});
								}
							},
							fail: () => {
								uni.showToast({
									title: '图片下载失败',
									icon: 'none'
								});
							}
						});
					},
					toBack() {
						uni.navigateBack()
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
	    background-image:  url('/static/home/friend1.png'); 
	    					  background-repeat: no-repeat; 
	    					  background-size:cover;
	    					background-size: 100% 100%;
	    					width:100vw;
		 
		    top: 0;
		  left:0;
		  //  z-index:0;
		   position: absolute;
		  width: 100vw;
		  height: 100vh;
		 
		  
	 
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