<template>
	<view>
		<view class="vcenter" style="width:100%;position: fixed;top:400rpx;">
			<view  class="vcenter" style="width:200rpx;height:200rpx;border-radius: 15rpx">
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
			this.t =setInterval(()=>{
				this.autoT()
			},1000)
		},
		onHide() {
			clearInterval(this.t);
		},
		methods: {
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
			autoT() {
				if (this.s == 0) {
					this.s = "";
					clearInterval(this.t);
					if (!uni.getStorageSync('token')) {
						uni.reLaunch({
							url:'/pages/login/login'
						})
					} else {
						uni.reLaunch({
							url: '/pages/home/index'
						})
					}

				} else {
					this.s = this.s - 1;
				}
			}
		}
	}
</script>

<style>
	page {
		background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744118506749start.png') no-repeat;
		background-size: 100% 100%
	}
</style>