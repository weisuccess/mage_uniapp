<template>
	<view class="content">
		<view class=""
			style="background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744210203337top-bg.png') no-repeat;background-size: 100% 100%;height: 400rpx;">
			<view style="height: var(--status-bar-height);width: 100%;position: fixed;z-index: 999999;"></view>
			<narBar :title="'现金宝'" @back="toBack()" background="transparent"></narBar>
			<view class="vcenter" style="width:100%;height:30rpx;margin-top: var(--status-bar-height);"></view>
		</view>
		<view class="fz40" style="width: 90%;background: rgba(255,255,255,.8);margin-top: -200rpx;box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.2);
			margin-left: 2.5%;margin-right: 2.5%;padding: 2.5%;border-radius: 20rpx;">
			<view class="flex-around-center text-align-c">
				<view class="text-align-c" @click="del(1)">
					<view class="fz26">总资产（USDT）</view>
					<view class="fw700 fz45 lh100 flex-center-center">{{list.theTotalAmount}}<uni-icons
							type="right"></uni-icons>
					</view>
				</view>
				<view class="">
					<view class="fz26">利率</view>
					<view class="color-33CC33 fw700 fz40 lh100 flex-start-center">0.25%</view>
				</view>
			</view>
			<view class="flex-around-center text-align-c">
				<view class="text-align-c">
					<view class="fz26">最新收益（USDT）</view>
					<view class="fw700 fz40 lh100">{{list.recentEarnings}}</view>
				</view>
				<view class="text-align-c">
					<view class="fz26">累计收益（USDT）</view>
					<view class="fw700 fz40 lh100">{{list.cumulativeEarnings}}</view>
				</view>
			</view>
			<!-- <view style="font-weight: bold;">{{money}}</view> -->
		</view>
		<view class="color-33CC33 flex-around-center fz36 lh100 mt30">
			<view class="" @click="del(3)">收益明细 <uni-icons type="right" color="#33CC33"></uni-icons></view>
			<view class="" @click="del(2)">交易记录 <uni-icons type="right" color="#33CC33"></uni-icons></view>
		</view>
		<view class="flex-between-center lh60 br16" @click="open"
			style="background: rgba(255,255,255,.8);width: 90%;margin: 2.5%;padding: 2.5%;box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.2);">
			<view class="fw700">现金宝说明</view>
			<uni-icons type="right"></uni-icons>
		</view>
		<view class="flex-around-center color-fff br16"
			style="background-color: #33CC33;width: 90%;margin:60rpx 2.5%;padding:50rpx 2.5%;box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.2);">
			<view class="flex-column-around-center" @click="openZR">
				<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744976239552zr.png" mode="widthFix"
					style="width: 50rpx;height: 50rpx;"></image>
				<view class="mt20">转入</view>
			</view>
			<view class="flex-column-around-center" @click="toPage('me/dingtou/index')">
				<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744976298517dt.png" mode="widthFix"
					style="width: 50rpx;height: 50rpx;"></image>
				<view class="mt20">定投</view>
			</view>
			<view class="flex-column-around-center" @click="xjbZc(1)">
				<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744976311547zc.png" mode="widthFix"
					style="width: 50rpx;height: 50rpx;"></image>
				<view class="mt20">转出</view>
			</view>
		</view>
		<uni-popup ref="popLine">
			<view class=""
				style="width: 90vw; margin: 0 5vw; height: 33vh;border-radius: 20rpx;background-color: #fff;position: relative;">
				<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744479312310x.png" mode="widthFix"
					style="width: 10%;margin: 500rpx 45% 0;position: absolute;" @click="close"></image>
				<view class="fw700 fz40 color-33CC33 text-align-c lh100">现金宝说明</view>
				<image src="https://lanhu-oss.lanhuapp.com/6000230a07d8914039c9c9123477f04b" mode="widthFix"
					style="width: 95%;margin: 0 2.5%;"></image>
				<view class="fw700" style="width: 90%;margin: 0 5%;">
					<view class="color-33CC33 mt50">
						·现金宝是什么？
					</view>
					<view class="mt60">
						现金宝是本平台为个人UBI用户提供的活钱管理工具，资金转入现金宝即向UBI资产公司申购特定理财管理工具。
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popZR">
			<view class="lh80 fw700"
				style="width: 90vw; margin: 0 5vw; height: 30vh;border-radius: 20rpx;background-color: #fff;position: relative;">
				<view class="flex-start-center ml50 pt30">
					<view>资产余额:</view>
					<view class="ml20">{{user.balance}}USDT</view>
				</view>
				<view class="flex-start-center ml50">
					<view>转入金额:</view>
					<view class="ml20">
						<input type="number" maxlength="6" v-model="money"
							style="border-bottom: 1px solid #ccc;width: 200rpx;" />
					</view>

				</view>
				<view class="flex-start-center ml50">
					<view>交易密码:</view>
					<view class="ml20">
						<u-code-input v-model="payPassword" :maxlength="6" size="25"></u-code-input>
					</view>
					<!-- <input type="number" maxlength="6" v-model="payPassword"
						style="border-bottom: 1px solid #ccc;width: 200rpx;" /> -->
				</view>
				<view class="lh100 w100 text-align-c flex-around-center"
					style="position: absolute;bottom: 0;border-top: 1px solid #ccc;">
					<view class="color-999" style="width: 49%;border-right: 1px solid #ccc;" @click="close">取消</view>
					<view class="color-33CC33" style="width: 49%;" @click.stop="$noMultipleClicks(zr,'')">确认转入</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popZC">
			<view class="lh80 fw700"
				style="width: 90vw; margin: 0 5vw; height: 30vh;border-radius: 20rpx;background-color: #fff;position: relative;">
				<view class="text-align-c fz40 lh100">
					转出交易请确认金额
				</view>
				<view class="color-33CC33 text-align-c lh100">${{list.theTotalAmount}}</view>
				<view class="flex-center-center mt30">
					<!-- <view style="width: 200rpx;">交易密码:</view>
					<input type="number" maxlength="6" v-model="payPassword"
						style="border-bottom: 1px solid #ccc;width: 200rpx;" /> -->
					<u-code-input v-model="payPassword" :maxlength="6"></u-code-input>
				</view>
				<view class="lh100 w100 text-align-c flex-around-center"
					style="position: absolute;bottom: 0;border-top: 1px solid #ccc;">
					<view class="color-999" style="width: 49%;border-right: 1px solid #ccc;" @click="close">取消</view>
					<view class="color-33CC33" style="width: 49%;" @click.stop="$noMultipleClicks(zc,'')">确认转出</view>
				</view>
			</view>
		</uni-popup>
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
				list: {},
				noClick: true,
				money: 0,
				payPassword: '',
				user:{}
			}
		},
		onShow() {
			this.myCashTreasure()
		},
		onLoad(opt) {
			this.getUser()
		},
		methods: {
			getUser() {
				this.$request.get({
					url: "/app/dreamUserInfo/getUser",
					success: rsp => {
						this.user = rsp.data
					}
				})
			},
			xjbZc(index) {
				uni.navigateTo({
					url: '/pages/me/xjb/zc?index=' + index
				})
			},
			myCashTreasure() {
				this.$request.get({
					url: "/app/userCashTreasureInfo/myCashTreasure",
					success: rsp => {
						this.list = rsp.data
					},
				})
			},
			toPage(path) {
				uni.navigateTo({
					url: '/pages/' + path
				})
			},
			del(index) {
				uni.navigateTo({
					url: '/pages/me/xjb/xjbmx?index=' + index
				})
			},
			open() {
				this.$refs.popLine.open('center')
			},
			close() {
				this.$refs.popLine.close()
				this.$refs.popZR.close()
				this.$refs.popZC.close()
			},
			openZR() {
				this.money = 0
				this.payPassword = ''
				this.$refs.popZR.open('center')
			},
			openZC() {
				this.payPassword = ''
				this.$refs.popZC.open('center')
			},
			zc() {
				this.$request.get({
					url: "/app/userCashTreasureInfo/getRollOut",
					data: {
						payPassword: this.payPassword,
						tradeValue: this.list.theTotalAmount
					},
					success: rsp => {
						uni.showToast({
							title: rsp.message,
							icon: 'none'
						})
						this.myCashTreasure()
						this.close()
					},
				})
			},
			zr() {
				this.$request.get({
					url: "/app/userCashTreasureInfo/getInto",
					data: {
						payPassword: this.payPassword,
						tradeValue: this.money
					},
					success: rsp => {
						uni.showToast({
							title: rsp.message,
							icon: 'none'
						})
						this.myCashTreasure()
						this.close()
					},
				})
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
<style>

</style>