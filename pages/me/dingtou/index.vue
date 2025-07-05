<template>
	<view class="content">
		<view class=""
			style="background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744980928733dt.png') no-repeat;background-size: 100% 100%;height: 600rpx;">
			<view style="height: var(--status-bar-height);width: 100%;position: fixed;z-index: 999999;"></view>
			<narBar :title="'来定投吧'" @back="toBack()" background="transparent" :rightTxt="'dtjl'" showRightBtn
				@dtjl="dtjl"></narBar>
			<view class="vcenter" style="width:100%;height:30rpx;margin-top: var(--status-bar-height);"></view>
			<view class="ml60 mt30">
				<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744981211329ldtb.png" mode="widthFix"
					style="width: 330rpx;height: 100rpx;"></image>
				<view class="fz24">积少成多丨不惧波动丨长期增值</view>
			</view>
		</view>
		<view class="text-align-c" style="width: 90%;background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744981295746sxdt.png');
			margin-top: -200rpx;background-size: 100% 100%;margin-left: 2.5%;margin-right: 2.5%;padding:30rpx 2.5% 60rpx;">
			<view class="fz40 fw700 lh80">-省心定投-</view>
			<view class="mb30">分批买入，淡化择时，可作为长期财务规划</view>
		</view>
		<scroll-view scroll-y="true" style="height: 600rpx;">
			<view class="text-align-c" style="width: 86%;background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744981555680tiao.png');
			background-size: 100% 100%;margin-left: 2.5%;margin-right: 2.5%;padding:30rpx 4.5% 60rpx;"
				v-for="(item,index) in list" :key="index">
				<view class="flex-between-center pb30" style="border-bottom: 1px dashed #ccc;">
					<view class="flex-start-center w100" style="width: 70%;">
						<view class="" style="text-align: start;overflow-x: auto;">{{item.label}}</view>
						<!-- <text class="color-33CC33 fw700 ml10 fz36 ellipsis" style="width: 200rpx;">{{item.title}}</text> -->
					</view>
					<view class="ts-btn color-fff br60 px40" style="height: 80rpx;line-height: 80rpx;"
						@click="open(item)">去定投
					</view>
				</view>
				<view class="flex-between-center py20 fz26">
					<view class="">申赎灵活丨低风险</view>
					<view class="flex-start-center">年化率 <text
							class="color-33CC33 fw700 ml10 fz36">{{item.interestRate}}</text> </view>
					<view class="color-33CC33 fw700 fz36">T+{{item.holdTime}}</view>
				</view>
			</view>
		</scroll-view>
		<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744982658120dtys.png" mode="widthFix"
			style="width: 95%;margin: 30rpx 2.5%;height: 500rpx;"></image>
		<uni-popup ref="popLine">
			<view class="fw700"
				style="width: 90vw; margin: 0 5vw; border-radius: 20rpx;background-color: #fff;position: relative;">
				<view class="flex-start-center ml50 my20 pt30">
					<view style="width: 200rpx;">定投额度:</view>
					<view class="">{{sel.monovalent}}USDT</view>
				</view>
				<view class="flex-start-center ml50 my20">
					<view style="width: 200rpx;">年化率:</view>
					<view class="">{{sel.interestRate}}%</view>
				</view>
				<view class="flex-start-center ml50 my20">
					<view style="width: 200rpx;">周期:</view>
					<view class="">T+{{sel.holdTime}}天</view>
				</view>
				<view class="flex-start-center ml50 my20">
					<view style="width: 200rpx;">定投收益:</view>
					<view class="">{{((sel.monovalent*sel.interestRate)/100).toFixed(2)}}USDT</view>
				</view>
				<view class="flex-start-center ml50 my20">
					<view style="width: 200rpx;">交易密码:</view>
					<input type="number" maxlength="6" v-model="payPassword"
						style="border-bottom: 1px solid #ccc;width: 200rpx;" />
				</view>
				<view class="" style="height: 100rpx;width: 100%;"></view>
				<view class="lh100 w100 text-align-c flex-around-center"
					style="position: absolute;bottom: 0;border-top: 1px solid #ccc;">
					<view class="color-999" style="width: 49%;border-right: 1px solid #ccc;" @click="close">取消</view>
					<view class="color-33CC33" style="width: 49%;" @click.stop="$noMultipleClicks(go,'')">确认定投</view>
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
				windowHeight: uni.getStorageSync('statusBarHeight') - 1000,
				list: [],
				sel: {},
				payPassword: '',
				noClick: true,
			}
		},
		onShow() {},

		onLoad(opt) {
			this.cashTreasureRegularInvestmentInfo()
		},
		methods: {
			dtjl() {
				uni.navigateTo({
					url: '/pages/me/dingtou/dtjy'
				})
			},
			go() {
				this.$request.get({
					url: "/app/cashTreasureRegularInvestmentInfo/regularInvestment",
					data: {
						payPassword: this.payPassword,
						id: this.sel.id
					},
					success: rsp => {
						this.close()
						this.cashTreasureRegularInvestmentInfo()
						uni.showToast({
							title: rsp.message,
							icon: 'none'
						})
					},
				})
			},
			cashTreasureRegularInvestmentInfo() {
				this.$request.get({
					url: "/app/cashTreasureRegularInvestmentInfo/list",
					success: rsp => {
						this.list = rsp.data
					},
				})
			},
			del() {
				uni.navigateTo({
					url: '/pages/me/xjb/xjbmx'
				})
			},
			open(item) {
				this.$refs.popLine.open('center')
				this.sel = item
			},
			close() {
				this.payPassword = ''
				this.$refs.popLine.close()
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