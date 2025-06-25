<template>
	<view class="content">
		<view style="height: var(--status-bar-height);width: 100%;position: fixed;z-index: 999999;"></view>
		<view class="flex-between-center header_left_icon" style="width: 92%;">
			<view class="flex-column-around-center" @click="toBack()">
				<image mode="widthFix" src="/static/tabbar/back.png"></image>
			</view>
			<view class="">
				市场资产管理团队
			</view>
			<view class="">
				<!-- <image mode="widthFix" src="/static/tabbar/explain.png" style="width: 40rpx;height: 40rpx;"></image> -->
			</view>
		</view>
		<view class="top">
			<view style="">
				<view class=""
					style="padding: 50rpx;display: flex;justify-content: space-between;width:calc(100% - 100rpx);">
					<view style="position: relative;margin-top: 100rpx;" class="vcenter-left">
						<!-- <image :src="user.handlUrl" mode="aspectFill"
							style="width: 150rpx;height: 150rpx;border-radius: 50%;" class="vmr30">
						</image> -->
						<view class="">
							<view class="flex-between-center w100">
								<view style="font-size: 37rpx;color: #F7EBC9;line-height: 80rpx;">
									{{user.telPhone | hidePhone}}
								</view>
								<view class="color-000 text-align-c lh50 fz28"
									style="background-color: #F5DA6A;width: 180rpx;border-radius: 30rpx 0 0 30rpx;margin-right: -80rpx;">
									<text
										v-if="list.TeamConstructionInfo">{{list.TeamConstructionInfo.teamGrade}}</text>
								</view>
							</view>
							<view style="font-size: 22rpx;color: #F7EBC9;">
								<view class="">团队总人数：{{list.marketNumber}}</view>
								<view class="mt10">创建时间：{{user.createTime | dateFormat}}</view>
								<view class="mt10" v-if="list.marketAssetManageInfo.id!=0">
									<view class="flex-start-center" v-if="list.marketAssetManageInfo">
										<view class="mr10" v-if="index!=0">
											<image
												src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1745570401342x.png"
												mode="widthFix" style="width: 30rpx;height: 30rpx;"
												v-for="key in index-1"></image>
										</view>
										<view class="">{{list.marketAssetManageInfo.marketGrade}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" :style="{'height':windowHeight+'px'}" style="margin-top: -50rpx;">
			<view class="br10" style="background-color: #fff;width: 95%;margin: 0 2.5%;margin: 0 2.5%;">
				<view class="box" @click="active(0)">
					<view class="flex-around-center fz26 text-align-c pt30" style="border-bottom: 1rpx solid #ccc;">
						<view class="pt30 " style="border-right: 1rpx solid #ccc;width: 33.3%;">
							<view class="vmt10" style="font-size: 30rpx;color: #626262;line-height: 60rpx;">团队总充值</view>
							<view class="fz36 pb30 fw700">{{list.marketRecharge}}</view>
						</view>
						<view class="pt30 " style="border-right: 1rpx solid #ccc;width: 33.3%;">
							<view class="vmt10" style="font-size: 30rpx;color: #626262;line-height: 60rpx;">团队总提现</view>
							<view class="fz36 pb30 fw700">{{list.marketPayouts}}</view>
						</view>
						<view class="pt30 " style="width: 33.3%;">
							<view class="vmt10" style="font-size: 30rpx;color: #626262;line-height: 60rpx;">团队总投资</view>
							<view class="fz36 pb30 fw700">
								{{list.marketInvestment}}
							</view>
						</view>
					</view>
				</view>
				<view class="box"
					style="margin-top: 20rpx;border-radius: 20rpx;box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.2);background-color: #fff;">
					<view style="margin: 20rpx 0;background: #EAFAEA;">
						<scroll-view scroll-x="true" show-scrollbar="false" class="100">
							<view class="flex-around-center">
								<view style="padding: 30rpx 20rpx;" @click="active(index)" v-for="(item,index) in sel"
									:key="index">
									<view style="font-size: 30rpx;color: #626262;line-height: 60rpx;"
										:style="[{'height':isActive==index?'55rpx':'60rpx'}]"
										:class="isActive==index?'active':''">
										{{item}}
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="pb40" style="font-size: 30rpx;line-height: 60rpx;">
						<view class="flex-around-center text-align-c" style="color: #949494;">
							<view style="">
								<view class="fz20">总人数</view>
								<view class="fz34 fw700" style="color: #454343;">{{list.levelVoList[isActive].number}}
								</view>
							</view>
							<view style="">
								<view class="fz20">总投资</view>
								<view class="fz34 fw700" style="color: #454343;">
									{{list.levelVoList[isActive].totalInvestment}}
								</view>
							</view>
						</view>
						<view class="flex-around-center text-align-c" style="color: #949494;">
							<view style="">
								<view class="vmt10 fz20">累计充值</view>
								<view class="fz34 fw700" style="color: #454343;">
									{{list.levelVoList[isActive].totalRecharge}}
								</view>
							</view>
							<view style="">
								<view class="vmt10 fz20">累计提现</view>
								<view class="fz34 fw700" style="color: #454343;">
									{{list.levelVoList[isActive].totalPayouts}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view
				style="width: 95%;margin: 0 2.5%;border-radius: 20rpx;box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.2);background-color: #fff;">
				<view class="top-name" style="background: #EAFAEA;border-radius: 20rpx 20rpx 0 0;">
					<view class="w20">姓名</view>
					<view class="w20">累计充值</view>
					<view class="w20">投资金额</view>
				</view>
				<scroll-view scroll-y="true" style="width: 100%;height: 500rpx;">
					<view class="box1" v-for="(item,index) in list.userInfoVoList" :key="index">
						<view class="w20" v-if="item.trueName">
							{{item.trueName | testuserName }}
						</view>
						<view class="w20" v-else>{{item.telPhone | hidePhone}}</view>
						<view class="w20">{{item.rechargeAmount}}</view>
						<view class="w20">{{item.investmentAmount}}</view>
					</view>
				</scroll-view>
				<view style="height: 30rpx;"></view>
			</view>
			<view style="height: 150rpx;width: 100%;"></view>
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
				user: {},
				list: [],
				arr: [],
				page: 1,
				size: 10,
				total: 0,
				activeIndex: 0,
				isActive: 0,
				sel: ['一级', '二级', '三级', '四级', '五级', '更多'],
				level: [],
				LevelPayouts: '',
				LevelRecharge: '',
				LevelSize: '',
				LevelInvestment: '',
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 250,
				index: 0
			}
		},
		// onReachBottom() {
		// 	//判断 如果页码*页容量大于等于总条数，提示该页数据加载完毕
		// 	if (this.page * this.size >= this.total) {
		// 		uni.showToast({
		// 			title: '已加载全部',
		// 			icon: 'none'
		// 		})
		// 		return
		// 	}
		// 	//并且让页码+1,调用获取数据的方法获取第二页数据
		// 	this.page++
		// 	//此处调用自己获取数据列表的方法
		// 	this.getList()
		// },
		onLoad() {
			this.getList()
			this.getUser()
		},
		methods: {
			active(e) {
				this.isActive = e
				console.log(e);
			},
			getUser() {
				this.$request.get({
					url: "/app/dreamUserInfo/getUser",
					success: rsp => {
						this.user = rsp.data
					}
				})
			},
			marketList() {
				this.$request.get({
					url: "/app/marketAssetManageInfo/List",
					success: rsp => {
						for (var i = 0; i < rsp.data.length; i++) {
							if (rsp.data[i].id == this.list.marketAssetManageInfo.id) {
								this.index = i + 1
							}

						}
						console.log(this.index);
					}
				})
			},

			toChinese(num) {
				const chineseNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
				return chineseNums[num] || num;
			},
			getList() {
				this.$request.get({
					url: "/app/marketAssetManageInfo/getUserMarket",
					success: rsp => {
						this.list = rsp.data
						this.sel = []
						if (!this.list.levelVoList[0]) {
							this.sel = ['一级']
							this.list.levelVoList = [{
								level: 0,
								number: 0,
								totalInvestment: 0,
								totalPayouts: 0,
								totalRecharge: 0,
							}]
						} else {
							if (this.list.levelVoList.length <= 5) {
								for (var i = 0; i < this.list.levelVoList.length; i++) {
									let title = this.toChinese(i + 1)
									this.sel.push(title + '级')
								}
							}
							if (this.list.levelVoList.length > 5) {
								this.sel = ['一级', '二级', '三级', '四级', '五级', '更多']
								let level = 0
								let number = 0
								let totalInvestment = 0
								let totalPayouts = 0
								let totalRecharge = 0
								let changeList = []
								for (var i = 0; i < this.list.levelVoList.length; i++) {
									if (i <= 4) {
										changeList.push(this.list.levelVoList[i])
									}
									if (i > 4) {
										level += this.list.levelVoList[i].level
										number += this.list.levelVoList[i].number
										totalInvestment += this.list.levelVoList[i].totalInvestment
										totalPayouts += this.list.levelVoList[i].totalPayouts
										totalRecharge += this.list.levelVoList[i].totalRecharge
										changeList[5] = {
											level: level,
											number: number,
											totalInvestment: totalInvestment,
											totalPayouts: totalPayouts,
											totalRecharge: totalRecharge,
										}
									}
								}
								this.list.levelVoList = [...changeList]
								console.log(this.list.levelVoList, changeList);
							}
						}
						console.log(this.sel);
						this.marketList()
					}
				})
			},

			toBack() {
				uni.navigateBack()
			},
			toPage(url) {
				url = "/pages/" + url
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #f1f1f1;
	}
</style>
<style scoped lang="scss">
	.top {
		background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744536578948bg.png') no-repeat;
		background-size: 100% 100%;
		height: 450rpx;
		padding-top: var(--status-bar-height);
	}

	.header_left_icon {
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		margin-left: 30rpx;
		margin-top: var(--status-bar-height);
		position: fixed;
		top: 0;
		z-index: 99;

		image {
			width: 58rpx;
			height: 58rpx;
		}
	}

	.w20 {
		width: 33.3%;
		font-size: 26rpx;
		text-align: center;
	}

	.top-name {
		display: flex;
		align-items: center;
		justify-content: space-around;
		color: #616161;
		padding: 35rpx 0;
		// border-bottom: 1px solid #b8b8b8;
		font-size: 24rpx;
		background: url('/static/me/sczc-bg.png') no-repeat;
		background-size: 100% 100%;
	}

	.box1 {
		width: 100%;
		// border-bottom: 1px solid #b8b8b8;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 20rpx 0;
		color: #5E5959;
		font-size: 26rpx;
		color: #434040;
	}

	.content {
		// background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		background-size: 100% 60%;
		height: 100vh;
		color: #ffffff;
	}

	.active {
		border-bottom: 5rpx solid #33CC33;
		font-size: 36rpx;
		font-weight: bold;
	}

	.title {
		line-height: 80rpx;
	}

	.balance {
		font-size: 60rpx;
		font-weight: 600;
	}

	.box {
		width: 100%;
		margin: 0 0 30rpx 0;
		background-size: 100% 100%;
		color: #000;
	}

	.color-000 {
		color: #000;
	}

	.money {
		font-size: 40rpx;
		font-weight: bold;
		color: #DD322A;
	}

	.commission {
		color: #999;
		font-size: 24rpx;
	}

	.model {
		font-size: 24rpx;
		color: #999;
		line-height: 60rpx;
	}

	.menu_item {
		width: 25%;
		flex-direction: column;

		image {
			width: 88rpx;
			height: 88rpx;
		}

		text {
			font-family: SourceHanSansCN, SourceHanSansCN;
			font-weight: 400;
			font-size: 24rpx;
			color: #272727;
			text-align: center;
		}
	}

	.line {
		width: 90%;
		margin: 30rpx 2.5%;
		padding: 2.5%;
		font-size: 22rpx;
		text-align: center;
		background: #FFFFFF;
		// box-shadow: 12px 0px 20px 0px #395DAC;
		border-radius: 31px 31px 31px 31px;
	}

	.color-DD322A {
		color: #DD322A;
	}

	.name {
		width: 100%;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.summarize {
		padding: 0 30rpx;
		color: #555;
		line-height: 60rpx;
	}
</style>