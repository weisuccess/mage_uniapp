<template>
	<view class="content">
		<narBar :title="''" @back="toBack()" background="transparent"></narBar>
		<scroll-view scroll-y>
			<view class="" style="padding: 0 30rpx;">
				<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744277363162logo.png" mode="widthFix"
					style="width: 30%;height: 200rpx;margin: 0 35%;"></image>
				<view class="color-33CC33 fw700 fz60 text-align-c lh100 mt30">邀请好友</view>
				<view class="color-33CC33 fw700 fz60 text-align-c">领取UBI体验</view>
				<view class="color-fff text-align-c mt30" style="">
					这是您的专属邀请码，复制邀请链接或者保存二维码通过QQ、微信或微博等方式发送给好友
				</view>
				<view class="box">
					<view style="border-radius: 20rpx;width: 400rpx;height: 400rpx;
						margin-left: calc(50% - 200rpx);">
						<image :src="list.inviteQr" mode="widthFix"
							style="width: 400rpx;height: 400rpx;margin: 10rpx;border-radius: 20rpx;">
						</image>
					</view>
					<view class="flex-center-center mt100 color-fff"
						style="line-height: 100rpx;text-align: center;background: #33CC33;border-radius: 10rpx;">
						<text class="fw700 ml10">{{list.inviteCode}}</text>
						<view class="color-33CC33 br10" @click="copy(list.inviteCode)"
							style="width: 200rpx;height: 60rpx; line-height: 60rpx;margin: 20rpx 0 20rpx 20rpx; background-color: #fff;">
							复制邀请码
						</view>
					</view>
					<view class="flex-between-center color-33CC33 pb30 mt60">
						<view class="">
							IOS下载：
						</view>
						<view style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 60%; ">
							{{list.anzhuoDownload}}</view>
						<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744285610410copy.png"
							mode="widthFix" class="ml10" style="width: 30rpx;height: 30rpx;"
							@click="copy(list.anzhuoDownload)"></image>
					</view>
					<view class="flex-between-center color-33CC33">
						<view class="">
							安卓下载：
						</view>
						<view style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 60%; ">
							{{list.iosDownload}}</view>
						<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744285610410copy.png"
							mode="widthFix" class="ml10" style="width: 30rpx;height: 30rpx;"
							@click="copy(list.iosDownload)"></image>
					</view>
					<!-- <view class="icon">
						<view class="color-fff" @click="submit">
							<image src="/static/me/friend/xz.png" mode="widthFix"></image>
							<view class="">保存图片</view>
						</view>
						<view class="color-fff" @click="copy(getsys[0].configValue)">
							<image src="/static/me/friend/link.png" mode="widthFix"></image>
							<view class="">复制链接</view>
						</view>
					</view> -->
				</view>
			</view>
		</scroll-view>
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
				list: [],
				getsys: {}
			}
		},
		onLoad(opt) {
			this.getInviteCode()
			// this.getSysConfig()
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
			// 			console.log(rsp.data);
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
	}
</script>
<style>
	page {
		background-color: #F3F3F3;
	}
</style>
<style scoped lang="scss">
	.content {
		background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744277196584invite.png') no-repeat;
		background-size: 100% 100%;
		height: 100vh;
		color: #ffffff;
	}

	.title {
		line-height: 80rpx;
	}

	.balance {
		font-size: 60rpx;
		font-weight: 600;
	}

	.box {
		width: 90%;
		padding: 2.5%;
		margin: 100rpx 2.5% 0;
		// background-color: #FFFFFF;
		// border-radius: 20rpx;
		color: #000;
		// background: url('/static/me/friend/bg.png') no-repeat;
		// background-size: 100% 100%;
	}

	.minus {
		background-color: #999999;
		color: #fff;
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
		line-height: 38rpx;
		text-align: center;
	}

	.add {
		background-color: #999999;
		color: #fff;
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
		line-height: 38rpx;
		text-align: center;
	}

	input {
		width: 100rpx;
		background-color: #EFEFEF;
		border-radius: 10rpx;
		text-align: center;
		margin: 0 20rpx;
	}

	.kefu {
		position: fixed;
		width: 100rpx;
		bottom: 50vh;
		right: 0;
		height: 120rpx;
		line-height: 120rpx;
		border-top: 1rpx solid #eee;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: space-around;
		text-align: center;
		padding: 30px 0;

		image {
			width: 50rpx;
			height: 50rpx;
		}
	}
</style>