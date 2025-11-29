<template>
	<view>
		<view class="vcenter" style="width:100%;position: fixed;top:400rpx;">
			<view class="vcenter" style="width:200rpx;height:200rpx;border-radius: 15rpx">
				<!-- <image src="../../static/logo.gif" style="width:200rpx;height:200rpx;"></image> -->
			</view>
		</view>
		<!-- <view class="vcenter" style="width:100%;position: fixed;top:15vh;">
			<view class="vcenter" style="width:80%;height:60rpx;border-radius: 15rpx;">
				<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737128673094logo.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="vcenter" style="width:100%;position: fixed;bottom: 150rpx;">
			<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737128655396BOB.png" mode="widthFix"></image>
		</view> -->
		<view style="width:100%;position: absolute;z-index: 998;">
			<view class="vcenter"
				style="width:90rpx;height:50rpx;position: absolute;;margin-top:100rpx;right:30rpx;border-radius: 15rpx;border: 1rpx solid #fff;">
				<font style="color:#fff">{{s}}</font>
			</view>
		</view>
		<view class="">
			<!-- <image src="../../static/logo.gif" style="width:200rpx;height:200rpx;"></image> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				s: 3,
				t: ""
			}
		},
		onShow() {
			console.log('aaaaaaaaaaaaaaa');
			 
			console.log(!uni.getStorageSync('url'));
			console.log(uni.getStorageSync('url')=='');
			
			
			 
			
			if (!uni.getStorageSync('url') ||uni.getStorageSync('url')=='') {
			 
					uni.reLaunch({
						url: '/pages/login/newlogin'
					})
					return;
		    }
			if (!uni.getStorageSync('token')) {
				console.log(111);
				uni.reLaunch({
					url: '/pages/login/newlogin'
				})
					return;
			} else {
				uni.reLaunch({
					url: '/pages/home/newindex'
				})
					return;
			}
			
			return;
			this.t = setInterval(() => {
				// this.autoT()
				this.s = this.s - 1;
			}, 1000)
		},
		onHide() {
			clearInterval(this.t);
		},
		watch: {
			s(newValue, oldValue) {
				console.log(this.s);
				console.log(newValue, oldValue);
				if (this.s == 0) {
					this.s = "";
					clearInterval(this.t);
					let url = uni.getStorageSync('url')
					// plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
					// 	console.log(widgetInfo);
					// 	uni.request({
					// 		url: url + '/app/versionHistory/query', //仅为示例，并非真实接口地址。
					// 		success: (res) => {
					// 			console.log(res);
					// 			console.log(res.data.data.version, '版本号', widgetInfo.version);
					// 			if (res.data.data.version != widgetInfo.version) {
					// 				console.log('版本号不同', res.data.data);
					// 				uni.request({
					// 					url: url +
					// 						'/app/versionHistory/getSysConfig', //仅为示例，并非真实接口地址。
					// 					success: (res1) => {
					// 						console.log(res1, 'getSysConfig');
					// 						let arr = res1.data.data
					// 						console.log(arr);
					// 						uni.navigateTo({
					// 							url: '/pages/webview/webview3?url=' +
					// 								arr[0].configValue
					// 						})
					// 						return
					// 					}
					// 				});
					// 			}
					// 		}
					// 	});
					// });
					
					console.log('aaaaaaaaa');
					if (!uni.getStorageSync('token')) {
						uni.reLaunch({
							url: '/pages/login/newlogin'
						})
					} else {
						uni.reLaunch({
							url: '/pages/home/newindex'
						})
					}

				}
			}
		},
		methods: {
			getHotUpdate() {
				 
				 
				this.$request.get({
					url: "/app/sys-config/getHotUpdate",
					success: rsp => {
						console.log("***aa*******");
						console.log(rsp.data);
						var arr=rsp.data;
						 
						 if(arr.length==2)
						 {
							 arr.forEach(item=> {
								 if(item.configKey=='androidHotUpdate')
								 {
									 this.androidHotUrl=item.configValue;	
									  this.androidVersion=item.version;
								 }
								else if(item.configKey=='iosHotUpdate')
								{
									this.iosHotUrl=item.configValue;
									 this.iosVersion=item.version; 
								}
							 });
							 
							 this.checkHotUp()
						 }
						 
						 //console.log(androidVersion+" aa///  "+androidHotUrl);
						// console.log(iosVersion+" bb///  "+iosHotUrl);
						  
						  
					}
				})
				
			},
			checkHotUp()
			{  
				 
				var version='1.0.0'
				plus.runtime.getProperty(plus.runtime.appid,(inf) => {
				 	version = inf.version;
			
					
					console.log('aaaathis.version >>>',version);
					console.log('androidVersion',this.androidVersion);
					
					var canupdate= this.version_compare(this.androidVersion,version)
				  
					if(canupdate>0)
					{
						console.log('我可以更新');
						 
						const obj = {
							edition_force: 0,
							 edition_url:this.androidHotUrl,
							 package_type:1,
							 edition_name:this.androidVersion,
						};
						const params = JSON.stringify(obj);
						console.log('=========');
						console.log(params);
						uni.navigateTo({
						    url: '/components/os-uni-update/os-uni-update?obj='+params
						});
					}
					
				 })
				
				// var aa= this.version_compare('1.2.2','1.1.55')
				// console.log('比较',aa);
			},
			version_compare(v1, v2) {
			    //将两个版本号拆成数组
			    var arr1 = v1.split('.'),
			        arr2 = v2.split('.');
			    var minLength=Math.min(arr1.length,arr2.length);
			    //依次比较版本号每一位大小
			    for (var i = 0; i < minLength; i++) {
			        if (parseInt(arr1[i]) != parseInt(arr2[i])) {
			            return (parseInt(arr1[i]) > parseInt(arr2[i])) ? 1 : -1;
			        }
			    }
			    // 若前几位分隔相同，则按分隔数比较。
			    if (arr1.length == arr2.length) {
			        return 0;
			    } else {
			        return (arr1.length > arr2.length) ? 1 : -1;
			    }
			},
					 
			toL() {
				clearInterval(this.t);
				if (!uni.getStorageSync('token')) {
					uni.redirectTo({
						url: '../login/login'
					})
				} else {
					uni.reLaunch({
						url: '/pages/home/index'
					})
				}
			},
			// autoT() {
			// 	console.log(this.s);
			// 	if (this.s == 0) {
			// 		this.s = "";
			// 		clearInterval(this.t);
			// 		let url = uni.getStorageSync('url')
			// 		plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
			// 			console.log(widgetInfo);
			// 			uni.request({
			// 				url: url + '/app/versionHistory/query', //仅为示例，并非真实接口地址。
			// 				success: (res) => {
			// 					console.log(res);
			// 					console.log(res.data.data.version, '版本号', widgetInfo.version);
			// 					if (res.data.data.version != widgetInfo.version) {
			// 						console.log('版本号不同', res.data.data);
			// 						uni.request({
			// 							url: url +
			// 								'/app/versionHistory/getSysConfig', //仅为示例，并非真实接口地址。
			// 							success: (res1) => {
			// 								console.log(res1, 'getSysConfig');
			// 								let arr = res1.data.data
			// 								console.log(arr);
			// 								uni.navigateTo({
			// 									url: '/pages/webview/webview3?url=' +
			// 										arr[0].configValue
			// 								})
			// 								return
			// 							}
			// 						});
			// 					}
			// 				}
			// 			});
			// 		});
			// 		if (!uni.getStorageSync('token')) {
			// 			uni.reLaunch({
			// 				url: '/pages/login/login'
			// 			})
			// 		} else {
			// 			uni.reLaunch({
			// 				url: '/pages/home/index'
			// 			})
			// 		}

			// 	} else {
			// 		this.s = this.s - 1;
			// 	}
			// }
		}
	}
</script>

<style>
	page {
 
		background-size: 100% 100%
	}
</style>