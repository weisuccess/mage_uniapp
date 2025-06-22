<template>
	<view class="content">
		<narBar :title="getLg('更多')" @back="toBack()"></narBar>
		<view class="" style="background: #fff;width: 90%;margin: 150rpx 5% 0;border-radius: 20rpx;box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.2);">
			<!-- <view style="position: relative;height: 100rpx;margin-left: 10rpx;">
				<image src="/static/home/gd/bg.png" mode="widthFix" class="vmt60"
					style="position: absolute;height: 100rpx;width: 98%;"></image>
				<image src="/static/home/gd/jcfw.png" mode="widthFix" class="vmt60"
					style="position: absolute;width: 150rpx;top:20rpx;left: 35rpx;"></image>
			</view> -->
			<view class="ml40 py40">
				<text style="border-left: 15rpx solid #33CC33;padding-left: 20rpx;">服务选择</text>
			</view>
			<view class="flex-start-center-wrap mt20">
				<view class="menu_item" v-for="(item,index) in menuList" :key="index" @click="toPage(item.path,item.txt)">
					<image :src="'https://ubi-res.oss-cn-beijing.aliyuncs.com/null/'+item.icon+'.png'" class="image_2" mode="heightFix"></image>
					<view class="text_1">{{item.txt}}</view>
				</view>
			</view>
		</view>
		<view class="" style="background: #fff;width: 90%;margin: 50rpx 5% 0;border-radius: 20rpx;box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.2);">
			<!-- <view style="position: relative;height: 100rpx;margin-left: 10rpx;">
				<image src="/static/home/gd/bg.png" mode="widthFix" class="vmt60"
					style="position: absolute;height: 100rpx;width: 98%;"></image>
				<image src="/static/home/gd/aqzx.png" mode="widthFix" class="vmt60"
					style="position: absolute;width: 150rpx;top:20rpx;left: 35rpx;"></image>
			</view> -->
			<view class="ml40 py40">
				<text style="border-left: 15rpx solid #33CC33;padding-left: 20rpx;">小工具</text>
			</view>
			<view class="flex-start-center mt60">
				<view class=" menu_item" v-for="(item,index) in menuList2" :key="index" @click="toPage(item.path,item.txt)">
					<image :src="'https://ubi-res.oss-cn-beijing.aliyuncs.com/null/'+item.icon+'.png'" class="image_2" mode="heightFix"></image>
					<view class="text_1">{{item.txt}}</view>
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
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight,
				menuList: [{
						icon: "1744100677020gd-gg",
						path: "me/notice",
						txt: "最新公告"
					},
					{
						icon: "1744100695498gd-sjjk",
						path: "me/sczc",
						txt: "资产市场管理"
					},
					{
						icon: "1744100711258gd-hydj",
						path: "home/policy",
						txt: "U资产会员等级"
					},
					{
						icon: "1744100732315gd-ksrm",
						path: "home/zxxt/text",
						txt: "UBI攻略"
					},
					{
						icon: "1744100770037gd-yqhy",
						path: "me/friend",
						txt: "邀请好友"
					},
				],
				menuList2: [{
						icon: "1744100797009gd-jsq",
						path: "home/jsq",
						txt: "计算器"
					}, {
						icon: "1744100823675gd-dlrz",
						path: "login/log",
						txt: "登录日志查询"
					},{
						icon: "1748265471796gd-bzzx",
						path: "home/zxxt/text",
						txt: "帮助中心"
					}
				]
			}
		},
		methods: {
			toBack() {
				uni.navigateBack()
			},
			toPage(path,name) {
				if (name=='UBI攻略') {
					uni.navigateTo({
						url: '/pages/home/zxxt/text?index=0'
					})
					return
				}
				if (name=='帮助中心') {
					uni.navigateTo({
						url: '/pages/home/zxxt/text?index=5'
					})
					return
				}
				// if (path == 'home/jsq') {
				// 	if (plus && plus.os.name === 'iOS') {
				// 	  plus.runtime.openURL('calculator://', function(e) {
				// 	    console.log('打开系统计算器失败: ' + e.message);
				// 	  });
				// 	} else if (plus && plus.os.name === 'Android') {
				// 	  plus.runtime.openURL('com.android.calculator2', function(e) {
				// 	    console.log('打开系统计算器失败: ' + e.message);
				// 	  });
				// 	} else {
				// 	  console.log('当前环境不支持调用系统应用');
				// 	}
				// 	return
				// }





				uni.navigateTo({
					url: '/pages/' + path
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/174410046676033CC33-bg.png') no-repeat;
		background-size: 100% 70%;
		min-height: 100vh;
	}

	.memnu_list {
		width: 100%;
	}

	.menu_item {
		width: 33.3%;
		color: #272727;
		display: flex;
		align-items: center;
		flex-direction: column;
		z-index: 99;

		image {
			width: 58rpx;
			height: 58rpx;
		}

		.text_1 {
			font-weight: 400;
			font-size: 24rpx;
			line-height: 70rpx;
		}
	}
</style>