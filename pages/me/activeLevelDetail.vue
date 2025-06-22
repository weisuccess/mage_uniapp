<template>
	<view class="content">
		<!-- <view :style="{'height':statusBarHeight+'px'}"
			style="width: 100%;position: fixed;top: 0;left: 0;z-index: 999;background:#B12619"></view> -->
		<view class="vcenter header_left_icon">
			<view class="" @click="toBack()">
				<image mode="widthFix" src="/static/tabbar/back.png"></image>
			</view>
		</view>
		<scroll-view scroll-y="true" class="box" :style="{'height':windowHeight+'px'}">
			<view class="top">
				<view style="">
					<view class=""
						style="padding: 50rpx;display: flex;justify-content: space-between;width:calc(100% - 100rpx);">
						<view style="position: relative;margin-top: 150rpx;" class="vcenter-left">
							<image :src="user.handlUrl" mode="aspectFill"
								style="width: 150rpx;height: 150rpx;border-radius: 50%;" class="vmr30">
							</image>
							<view class="">
								<view class="fw700" style="font-size: 40rpx;color: #fff;line-height: 60rpx;color: #F7EBC9;">
									{{user.telPhone | hidePhone}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="one">
				<view class="title">
					<text v-if="user.vipGradeInfo">{{user.vipGradeInfo.vipGrade}}</text>
				</view>
				<view class="fz22">距离下一等级还需要<text style="color: #942430;padding: 0 10rpx;">{{difference}}</text> 建仓金额
				</view>
				<view class="flex-between-center">
					<progress :percent="speed" stroke-width="10" activeColor="#A20000" backgroundColor="#7C7C7C"
						style="width: 100%;" />
					<view class="fz28">
						<!-- 升级可获更多会员权益 -->
					</view>
				</view>
				
			</view>

			<view class="" style="width: 95%;margin: 0 2.5%;">
				<image src="/static/me/level/chat2.png" mode="widthFix" style="width: 100%; "></image>
				<view class="flex-around-center">
					<view class="fz20 text-align-c" v-for="(item,index) in list" :key="index" v-if="index>0">
						{{item.vipGrade}}
					</view>
				</view>
				<view class="flex-start-center lh100">
					<image src="/static/me/level/dj.png" mode="widthFix"
						style="height: 40rpx;width: 40rpx;margin-right: 10rpx;"></image>
					<view class="fz32 fw700">权益等级</view>
				</view>
				<view class="fz22 color-626262" >
					BOB资产现金管理账户活跃等级根据每位用户在北银国际注册账户使用的实时资产管理数据的个人累计投资额（实时更新）划分出的等级，针对每一等级提供了管理工具、资产息率、幸运转转、藏宝阁、服务等五大类权益。
				</view>
				<view class="flex-start-center lh100">
					<image src="/static/me/level/sj.png" mode="widthFix"
						style="height: 40rpx;width: 40rpx;margin-right: 10rpx;"></image>
					<view class="fz32 fw700">权益升级</view>
				</view>
				<view class="fz22 color-626262">
					BOB会员，根据不同的活跃等级享有不同的特权，等级越高享有的特权和优惠越丰富。（会员等级特权内容会持续进行升级迭代）
				</view>
				<view class="flex-start-center lh100">
					<image src="/static/me/level/tj.png" mode="widthFix"
						style="height: 40rpx;width: 40rpx;margin-right: 10rpx;"></image>
					<view class="">升级途径</view>
				</view>
				<view class="flex-start-center mb20" v-for="(item,index) in list" :key="index" v-if="index>0">
					<image :src="item.vipImage" mode="widthFix" style="width: 60rpx;height: 60rpx;margin-right: 20rpx;">
					</image>
					<view class="">
						<view style="color: #942430;" class="fz28">{{item.vipGrade}}</view>
						<view class="lh50 fz22 color-626262">升级方式：个人累计资产现金管理投资额{{item.vipExperience}} USDT
							<!-- ,额外加息{{item.vipInterest}}%,抽奖0次, -->
							<!-- <text>奖励{{item.splinterType==1?'白银':item.splinterType==2?'黄金':item.splinterType==3?'白金':''}}碎片*{{item.splinterQuantity}}</text> -->
						</view>
					</view>
				</view>
				<view class="flex-start-center lh100">
					<image src="/static/me/level/bg.png" mode="widthFix"
						style="height: 40rpx;width: 40rpx;margin-right: 10rpx;"></image>
					<view class="fz32 fw700">权益变更</view>
				</view>
				<view class="fz22 color-626262">
					会员等级实时更新。在用户会员等级变更后，相关权益服务内容会自动跟随会员等级的变化而变化。
				</view>
				<view class="" style="height: 150rpx;background-color: #fff;"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniPopup from '../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue'
	import narBar from 'pages/public/narBar.vue'
	export default {
		components: {
			uniPopup,
			narBar
		},
		data() {
			return {
				user: {},
				list: [],
				teamlist: [],
				speed: 0,
				difference: '',
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight,
			}
		},
		onLoad() {
			this.getUser()
			this.getTeamList()
		},
		methods: {
			getUser() {
				this.$request.get({
					url: "/app/dreamUserInfo/getUser",
					success: rsp => {
						this.user = rsp.data
						this.getList()
					}
				})
			},
			getList() {
				this.$request.get({
					url: "/app/vipGradeInfo/userVipList",
					success: rsp => {
						this.list = rsp.data
						let index = 0
						for (var i = 0; i < rsp.data.length; i++) {
							if (rsp.data[i].vipExperience > this.user.vipGradeInfo.vipExperience) {
								index = i
								break
							}
						}
						for (var i = 0; i < rsp.data.length; i++) {
							if (rsp.data[i].vipExperience == this.user.vipGradeInfo.vipExperience) {
								index = i + 1
								break
							}
						}
						console.log(index);
						if (index == 0) {
							this.speed = 0
							this.difference = rsp.data[index].vipExperience - this.user.investmentAmount
						} else {
							if (index > rsp.data.length - 1) {
								this.difference = 0
								this.speed = 100
								return
							}
							if (this.user.investmentAmount >= rsp.data[index].vipExperience) {
								this.difference = 0
								this.speed = 100
								return
							}
							this.difference = rsp.data[index].vipExperience - this.user.investmentAmount
							let num1 = rsp.data[index].vipExperience - this.user.investmentAmount
							let num2 = rsp.data[index].vipExperience - rsp.data[index - 1].vipExperience
							this.speed = (num1 / num2) * 100
							console.log(num1, num2);
							if (this.speed == 100) {
								this.speed = 0
							}
						}

						console.log(this.speed, rsp.data[index].vipExperience, this.user.investmentAmount,
							rsp.data[index - 1].vipExperience);
					}
				})
			},
			getTeamList() {
				this.$request.get({
					url: "/app/vipGradeInfo/teamVipList",
					success: rsp => {
						this.teamlist = rsp.data
					}
				})
			},
			toBack() {
				uni.navigateBack()
			},
		}
	}
</script>

<style scoped>
	.content {
		/* background: url('/static/me/bg.png') no-repeat; */
		/* background-size: 100% 100%; */
		min-height: 100vh;
		color: #3A3A3A;
	}

	.top {
		background: url('/static/me/top-b.png') no-repeat;
		background-size: 100% 100%;
		height: 850rpx;
		color: #FFFFFF !important;
	}

	.title {
		font-weight: bold;
		font-size: 32rpx;
		/* line-height: 60rpx; */
	}

	.one {
		width: 85%;
		margin: -450rpx 2.5% 0;
		padding: 50rpx 5% 100rpx;
		background: url('/static/me/activeLevel.png') no-repeat;
		background-size: 100% 100%;
		line-height: 60rpx;
	}
	
	.color-626262{
		color: #626262;
	}
</style>