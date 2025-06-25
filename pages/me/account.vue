<template>
	<view class="content">
		<view class="top">
			<narBar :title="getLg('账号设置')" @back="toBack()" background="transparent"></narBar>
			<view style="width: 90%;margin:var(--status-bar-height) 2.5% 0;padding: 2.5%;">
				<view class=" br10" style="background: #fff;padding: 20rpx;margin-top: 100rpx;">
					<view style="position: relative;" class="flex-column-around-center">
						<image :src="list.handlUrl" mode="aspectFill"  @click="upload()"
							style="width: 150rpx;height: 150rpx;border-radius: 50%;" class="vmr30">
						</image>
						<view>
							<view class="fz40 lh60"  style="min-height: 60rpx;min-width: 200rpx;" @click="editName" >
								<!-- <text v-if="list.trueName">{{list.trueName|testuserName}}</text> -->
								<view>{{list.nickName}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="vcenter" style="width:90%;margin:150rpx 5% 0;">
			<view class="color-fff"
				style="width:95%;padding:0 2.5%;box-shadow: 6px 0px 22px 0px #E0EAFF;border-radius: 12rpx;margin-top: 20rpx;background-color: #33CC33;">
				<view @click="toPage('me/editPassword')" class="border-bottom"
					style="width:100%;height:100rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="vcenter-left" style="width:50%;height:50rpx;">
						<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744212061498suo.png" mode=""
							style="width: 40rpx;height: 40rpx;margin-right: 10rpx;"></image>
						<font class="fz26 lh100">修改登录密码</font>
					</view>
					<view class="vcenter">
						<uni-icons type="right" color="#B8BABD"></uni-icons>
					</view>
				</view>
				<view class="border-bottom" @click="toPage('me/changePwd')"
					style="width:100%;height:100rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="vcenter-left" style="width:50%;height:50rpx;">
						<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744212098148jymm.png" mode=""
							style="width: 40rpx;height: 40rpx;margin-right: 10rpx;"></image>
						<font class="fz26 lh100">修改交易密码</font>
					</view>
					<view class="vcenter">
						<uni-icons type="right" color="#B8BABD"></uni-icons>
					</view>
				</view>
				<!-- <view class="border-bottom" @click="toPage('bankList')"
					style="width:100%;height:80rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="vcenter-left" style="width:50%;height:50rpx;">
						<font style="font-size:26rpx;">支付宝</font>
					</view>
					<view class="vcenter">
						<uni-icons type="right" color="#B8BABD"></uni-icons>
					</view>
				</view>
				<view class="border-bottom" @click="toPage('yhkDetail')"
					style="width:100%;height:80rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="vcenter-left" style="width:50%;height:50rpx;">
						<font style="font-size:26rpx;">银行卡</font>
					</view>
					<view class="vcenter">
						<uni-icons type="right" color="#B8BABD"></uni-icons>
					</view>
				</view> -->
				<!-- <view class="border-bottom" @click="toPage('usdtDetail')"
					style="width:100%;height:80rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="vcenter-left" style="width:50%;height:50rpx;">
						<image src="/static/me/icon/addAddress.png" mode=""
							style="width: 40rpx;height: 40rpx;margin-right: 10rpx;"></image>
						<font style="font-size:26rpx;">添加钱包地址</font>
					</view>
					<view class="vcenter">
						<uni-icons type="right" color="#B8BABD"></uni-icons>
					</view>
				</view>
				<view class="border-bottom" @click="toPage('choujiang')"
					style="width:100%;height:80rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="vcenter-left" style="width:50%;height:50rpx;">
						<image src="/static/me/icon/shopAddress.png" mode="widthFix"
							style="width: 40rpx;height: 40rpx;margin-right: 10rpx;"></image>
						<font style="font-size:26rpx;">抽奖兑换订单</font>
					</view>
					<view class="vcenter">
						<uni-icons type="right" color="#B8BABD"></uni-icons>
					</view>
				</view>
				<view class="border-bottom" @click="toPage('jifen')"
					style="width:100%;height:80rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="vcenter-left" style="width:50%;height:50rpx;">
						<image src="/static/me/icon/shopAddress.png" mode="widthFix"
							style="width: 40rpx;height: 40rpx;margin-right: 10rpx;"></image>
						<font style="font-size:26rpx;">积分兑换订单</font>
					</view>
					<view class="vcenter">
						<uni-icons type="right" color="#B8BABD"></uni-icons>
					</view>
				</view>
				<view class="border-bottom" @click="toPage('suipian',1)"
					style="width:100%;height:80rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="vcenter-left" style="width:50%;height:50rpx;">
						<image src="/static/me/icon/shopAddress.png" mode="widthFix"
							style="width: 40rpx;height: 40rpx;margin-right: 10rpx;"></image>
						<font style="font-size:26rpx;">白银碎片兑换订单</font>
					</view>
					<view class="vcenter">
						<uni-icons type="right" color="#B8BABD"></uni-icons>
					</view>
				</view>
				<view class="border-bottom" @click="toPage('suipian',2)"
					style="width:100%;height:80rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="vcenter-left" style="width:50%;height:50rpx;">
						<image src="/static/me/icon/shopAddress.png" mode="widthFix"
							style="width: 40rpx;height: 40rpx;margin-right: 10rpx;"></image>
						<font style="font-size:26rpx;">黄金碎片兑换订单</font>
					</view>
					<view class="vcenter">
						<uni-icons type="right" color="#B8BABD"></uni-icons>
					</view>
				</view>
				<view class="border-bottom" @click="toPage('suipian',3)"
					style="width:100%;height:80rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="vcenter-left" style="width:50%;height:50rpx;">
						<image src="/static/me/icon/shopAddress.png" mode="widthFix"
							style="width: 40rpx;height: 40rpx;margin-right: 10rpx;"></image>
						<font style="font-size:26rpx;">白金碎片兑换订单</font>
					</view>
					<view class="vcenter">
						<uni-icons type="right" color="#B8BABD"></uni-icons>
					</view>
				</view> -->
				<view class="border-bottom" @click="toPage('me/dizhi')"
					style="width:100%;height:100rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="vcenter-left" style="width:50%;height:100rpx;">
						<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744212150398dz.png" mode="widthFix"
							style="width: 40rpx;height: 40rpx;margin-right: 10rpx;"></image>
						<font class="fz26 lh100">添加收货地址</font>
					</view>
					<view class="vcenter">
						<uni-icons type="right" color="#B8BABD"></uni-icons>
					</view>
				</view>
				<view class="border-bottom" @click="toPage('home/about')"
					style="width:100%;height:100rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="vcenter-left" style="width:50%;height:100rpx;">
						<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744476036079r.png" mode="widthFix"
							style="width: 40rpx;height: 40rpx;margin-right: 10rpx;"></image>
						<font class="fz26 lh100">关于UBI</font>
					</view>
					<view class="vcenter">
						<uni-icons type="right" color="#B8BABD"></uni-icons>
					</view>
				</view>
				<view class="border-bottom"  @click="toPage('login/sbgl')"
					style="width:100%;height:100rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="vcenter-left" style="width:50%;height:100rpx;">
						<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744212199267sbgl.png" mode=""
							style="width: 40rpx;height: 40rpx;margin-right: 10rpx;"></image>
						<font class="fz26 lh100">设备管理</font>
					</view>
					<view class="vcenter">
						<uni-icons type="right" color="#B8BABD"></uni-icons>
					</view>
				</view>
				<!-- <view class="border-bottom" @click="toPage('qiandao')"
					style="width:100%;height:80rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="vcenter-left" style="width:50%;height:50rpx;">
						<image src="/static/me/icon/qd.png" mode=""
							style="width: 40rpx;height: 40rpx;margin-right: 10rpx;"></image>
						<font style="font-size:26rpx;">签到</font>
					</view>
					<view class="vcenter">
						<uni-icons type="right" color="#B8BABD"></uni-icons>
					</view>
				</view> -->
				<!-- <view class="border-bottom" @click="toUserCard"
					style="width:100%;height:80rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="vcenter-left" style="width:50%;height:50rpx;">
						<image src="/static/me/icon/sm.png" mode=""
							style="width: 40rpx;height: 40rpx;margin-right: 10rpx;"></image>
						<font style="font-size:26rpx;">实名认证</font>
					</view>
					<view class="vcenter">
						<view style="color: #807F7F;font-size: 30rpx;">
							{{list.isDelete==2?'未认证':list.isDelete==1?'已认证':''}}
						</view>
						<uni-icons type="right" color="#B8BABD"></uni-icons>
					</view>
				</view> -->
			</view>
		</view>
		<!-- <view class="vcenter" style="width:90%;margin-left: 5%;">
			<view
				style="width:95%;padding:0 2.5%;box-shadow: 6px 0px 22px 0px #E0EAFF;border-radius: 12rpx;margin-top: 20rpx;background-color: #fff;">
				<view class="border-bottom" @click="circuit"
					style="width:100%;height:80rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="vcenter-left" style="width:50%;height:50rpx;">
						<font style="font-size:26rpx;">切换线路</font>
					</view>
					<view class="vcenter">
						<input type="text" style="height: 100%;text-align: right;" />
						<uni-icons type="right" color="#B8BABD"></uni-icons>
					</view>
				</view>
				<view class="border-bottom"
					style="width:100%;height:80rpx;display: flex;justify-content: space-between;align-items: center;">
					<view class="vcenter-left" style="width:50%;height:50rpx;">
						<font style="font-size:26rpx;">当前版本</font>
					</view>
					<view style="color: #807F7F;font-size: 30rpx;">
						v.23
					</view>
				</view>
			</view>
		</view> -->
		<view class="vcenter" style="width:100%;margin-top:20px;position: fixed;bottom: 100rpx;">
			<view class="" style="width:95%;height:100%;">
				<view @click="logOut()" class="flex-center-center" style="width:100%;height:100%;">
					<view class="text-align-c" style="width:80%;height:100rpx;line-height: 100rpx;background:url('/static/login/login-dlbtn.png') no-repeat;
						background-size: 100% 100%;border-radius:10px;">
						<font style="color:#fff;font-size:35rpx;">安全退出</font>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import narBar from 'pages/public/narBar.vue'
	export default {
		components: {
			narBar
		},
		data() {
			return {
				list: {}
			}
		},
		onShow() {
			this.getList()
		},
		methods: {
			getList() {
				this.$request.get({
					url: "/app/dreamUserInfo/getUser",
					success: rsp => {
						this.list = rsp.data
						uni.setStorageSync('getUser', rsp.data)
					},
				})
			},
			editName() {
				uni.navigateTo({
					url: '/pages/me/editName'
				})
			},
			upload() {
				let url = uni.getStorageSync('url')
				uni.chooseImage({
					count: 1,
					success: chooseImageRes => {
						console.log('成功', chooseImageRes);
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.showLoading({
							title: '上传头像中···',
							mask: true
						})
						uni.uploadFile({
							url: url + '/Ali/upload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								token: uni.getStorageSync('token'),
							},
							success: res => {
								let data = JSON.parse(res.data);
								console.log(data);
								if (data.code == 200) {
									this.list.handlUrl = data.data;
									this.edit(this.list.handlUrl)
									uni.hideLoading()
								}
								// 失败报错
								if (data.code == 500 || data.status == 500) {
									uni.showToast({
										title: '上传失败',
										icon: 'none'
									})
									uni.hideLoading()
								}
							},
							fail: rsp => {
								uni.hideLoading()
							}
						});
					},
					fail: err => {
						uni.hideLoading()
					}
				});

			},
			edit(url) {
				this.$request.get({
					url: '/app/dreamUserInfo/updateUserInformation',
					data: {
						nickName: '',
						handlUrl: this.list.handlUrl,
					},
					success: rsp => {
						uni.showToast({
							title: rsp.message,
							icon: 'none'
						})
						return
						if (rsp.code == 200) {
							this.getList();
						}
					}
				})
			},
			circuit() {
				uni.navigateTo({
					url: '/pages/login/circuit'
				})
			},
			toChangePwd() {
				uni.navigateTo({
					url: '/pages/my/changePwd'
				})
			},
			toChangePwd2() {
				uni.navigateTo({
					url: '/pages/login/editPassword'
				})
			},
			toUserCard() {
				// if (this.list.isDelete == 2) {
				uni.navigateTo({
					url: '/pages/me/verified'
				})
				// } else {
				// 	uni.showToast({
				// 		title: '已经实名过了',
				// 		icon: 'none'
				// 	})
				// }
			},
			toPage(path, type) {
				// if (path == 'jifen' || path == 'choujiang') {
				// 	uni.navigateTo({
				// 		url: './dingdan?name=' + path
				// 	})
				// 	return
				// }
				// if (path == 'suipian') {
				// 	uni.navigateTo({
				// 		url: '/pages/home/dhjl?type=' + type
				// 	})
				// 	return
				// }
				uni.navigateTo({
					url: '/pages/' + path
				})
			},
			// bankList() {
			// 	uni.navigateTo({
			// 		url: './bankList'
			// 	})
			// },
			// yhList() {
			// 	uni.navigateTo({
			// 		url: './yhkDetail'
			// 	})
			// },
			toBack() {
				this.goBack();
			},
			logOut() {
				uni.setStorageSync('token', -1);
				uni.setStorageSync('bottomId', "1");
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},
		}
	}
</script>
<style>
	page {
		background: #F1F1F1;
	}
</style>
<style lang="scss" scoped>
	.top {
		width: 100%;
		height: 400rpx;
		background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174409903861872@3x.png') no-repeat;
		background-size: 100% 100%;
	}

	.content {
		// background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		// background-size: 100% 50%;
		height: 100vh;
	}

	.border-bottom {
		border-bottom: 1px solid #eee;
	}
</style>