<template>
	<view class="">
		<view class="content">
			<narBar :title="getLg('')" @back="toBack()" background="transparent"></narBar>
			<scroll-view scroll-y="true" class="" :style="{height:windowHeight+'px'}" @scrolltolower="reachBottom">
				<view style="width: 95%;margin: var(--status-bar-height) 2.5% 0;">
					<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744988827442logo.png" mode="widthFix"
						class="pt30" style="width: 40%;">
					</image>
					<view class="mt20 lh100" style="color: #097F09;">人人可用的专业配置服务，升级啦></view>
					<!-- <view class="" @click="toPage('home/zxxt/text',4)">u资产体验说明</view>
					<view class="" @click="toPage('me/tyj/record')">体验记录</view>
					<view class="" @click="toPage('me/tyj/lq')">领取体验金</view>
					<view class="" @click="toPage('me/tyj/tyfwsy')">体验服务收益</view> -->
					<view class="">
						<view class="flex-between-center">
							<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/17450813006964.png"
								mode="widthFix" style="width: 35%;height: 100rpx;" @click="toPage('me/tyj/lq')"></image>
							<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/17450813323892.png"
								mode="widthFix" style="width: 35%;height: 100rpx;" @click="toPage('home/zxxt/text',4)">
							</image>
						</view>
						<image
							src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1745081226301b1888f943968d6c98c6eb79d28144bb787de016a1da58-fHfGDN@2x.png"
							mode="widthFix" style="width: 40%;height: 100rpx;margin: 0 30%;"></image>
						<view class="flex-between-center">
							<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/17450813499993.png"
								mode="widthFix" style="width: 35%;height: 100rpx;"
								@click="toPage('me/tyj/tyfwsy','服务收益')">
							</image>
							<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/17450813597161.png"
								mode="widthFix" style="width: 35%;height: 100rpx;"
								@click="toPage('me/tyj/record','体验记录')">
							</image>
						</view>
					</view>
					<!-- <image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744988979448jqr.png" mode="widthFix"
						class="mt20" style="width: 100%;max-height: 400rpx;"></image> -->
					<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744989088485jt.png" mode="widthFix"
						class="mt20" style="width: 100%;max-height: 100rpx;"></image>
					<view class="fw700 text-align-c lh80">
						HI~您有一笔U资产体验 <text style="color: #097F09;">1000USDT</text> 待领取~
					</view>
					<view class="color-999 text-align-c">U管理与您一起做好规划 从容面对人生</view>
					<view class="fw700 br16 lh100 flex-between-center px20 fz22 mt40"
						style="border: 1px solid #B6E5B7;">
						<view class="flex-start-center">
							U资产体验余额：<text style="color: #097F09;">{{user.trialBonus}}(USDT)</text>
						</view>
						<view class="flex-start-center">
							体验收益：<text style="color: #097F09;">{{user.trialBonusEarnings}}(USDT)</text>
						</view>
					</view>
					<view class="ts-btn text-align-c color-fff" @click="WithdrawToBalance"
					 style="width: 90%;margin: 50rpx 5% 20rpx;">
						提现到UBI资产
					</view>
					<view class="color-999 text-align-c">U资产已在为您产生收益中</view>

					<view style="width: 95%;border-radius: 20rpx;margin: 60rpx 2.5% 0;">
						<view class="top">
							<view class="w20">体验金（USDT)</view>
							<view class="w20">体验天数（天)</view>
							<view class="w20"></view>
						</view>
						<scroll-view scroll-y style="max-height: 400rpx;">
							<view class="box" v-for="(item,index) in warehouse" :key="index">
								<view class="w20 color-33CC33" style="word-wrap: break-word;">
									{{item.positionPrice}}
								</view>
								<view class="w20">{{item.holdTime}}</view>
								<view class="w20 lh60 color-33CC33" @click="hetong(item.id)"
									style="width: 20%;margin: 0 2.5%;border-radius: 10rpx;">
									查看
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</scroll-view>
		</view>
		<uni-popup ref="popup">
			<view class="" style="width: 90%;height: 65vh;border-radius: 20rpx;background-color: #fff;margin: 0 5%;">
				<view class="flex-center-center my30" style="margin-top: -25rpx;" @click="close">
					<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737122869089close-red.png"
						mode="widthFix" style="width: 70rpx;height: 70rpx;margin-top: -35rpx;"></image>
				</view>
				<view class="fz40 fw700 pb30 text-align-c " style="color: #D40000;border-bottom: 1px dashed #ccc;">
					体验金规则说明</view>
				<scroll-view scroll-y="" style="height: 60vh;text-align: start;overflow: hidden;">
					<view
						style="font-size: 22rpx;color: #727272;max-width: 95%;margin: 30rpx 2.5% 0;line-height: 1.5rem;">
						<view class="color-fff fw700"
							style="padding: 0 10rpx;width: 150rpx; line-height: 60rpx; background: linear-gradient(to top right, #D55038, #B81A15);border-radius: 15rpx;">
							体验金说明</view>

						<view class="">
							BOB体验金是BOB资产管理平台内设的虚拟资金交易模块设定，作用于让BOB用户模拟BOB资产处置交易的真实收益情况，新用户注册实名后，获得一次免费领取的机会，进行深度的交易体会，并产生收益奖励，存在于体验金账户的体验金收益余额中。
						</view><br />

						<view class="color-fff fw700"
							style="padding: 0 10rpx;width: 150rpx; line-height: 60rpx; background: linear-gradient(to top right, #D55038, #B81A15);border-radius: 15rpx;">
							体验金规则</view>
						BOB体验金并非真实资金，不能用于消费、提现及转赠，只能享受体验金购买的体验资产产生的收益。这部分的体验金收益，由资产管理用户个人自由支取使用，也可用于购买BOB特殊资产处置项目或者提现。<br />

						<view class="color-fff fw700 mt20"
							style="padding: 0 10rpx;width: 150rpx; line-height: 60rpx; background: linear-gradient(to top right, #D55038, #B81A15);border-radius: 15rpx;">
							体验金收益</view>
						BOB体验金收益由北银国际特殊资产处置项目的部分盈利资金，以及加拿大丰业银行助力完善。作用为BOB资产处置管理平台的市场结构，降低用户参与的门槛，为初次参与BOB资产处置管理平台的用户提供投资运作便利。<br />

						<view class="" style="height: 100rpx;">

						</view>
					</view>
				</scroll-view>
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 100,
				isActive: 1,
				page: 1,
				size: 10,
				total: '',
				warehouse: [],
				list: [{
						flexibleCode: 'efdrsgwr',
						amount: '3'
					}, {
						flexibleCode: 'efdrsgwr',
						amount: '3'
					},
					{
						flexibleCode: 'efdrsgwr',
						amount: '3'
					},
					{
						flexibleCode: 'efdrsgwr',
						amount: '3'
					}, {
						flexibleCode: 'efdrsgwr',
						amount: '3'
					}
				],
				search: '',
				user: {}
			}
		},
		onReachBottom() {
			//判断 如果页码*页容量大于等于总条数，提示该页数据加载完毕
			if (this.page * this.size >= this.total) {
				// uni.showToast({
				// 	title: '已加载全部',
				// 	icon: 'none'
				// })
				return
			}
			//并且让页码+1,调用获取数据的方法获取第二页数据
			this.page++
			//此处调用自己获取数据列表的方法
			this.getList()
		},
		onLoad() {
			this.page = 1
			this.getList()
			this.getUserPosition()
		},
		onShow() {
			this.getUser()
		},
		methods: {
			WithdrawToBalance() {
				this.$request.get({
					url: "/app/trialBonusRecordingInfo/WithdrawToBalance",
					success: rsp => {
						uni.showToast({
							title:rsp.message,
							icon:'none'
						})
						this.page = 1
						this.getUser()
					}
				})
			},
			toPage(path, index) {
				if (index==4) {
					uni.navigateTo({
						url: '/pages/' + path + '?index=' + index
					})
				}else if (index=='服务收益'||index=='体验记录') {
					uni.navigateTo({
						url: '/pages/' + path + '?name=' + index
					})
				} else {
					uni.navigateTo({
						url: '/pages/' + path
					})
				}
			},
			open() {
				console.log('点击you');
				this.$refs.popup.open('center')
			},
			close() {
				this.$refs.popup.close()
			},
			getUser() {
				this.$request.get({
					url: "/app/dreamUserInfo/getUser",
					success: rsp => {
						this.user = rsp.data
					}
				})
			},
			hetong(id) {
				uni.navigateTo({
					url: '/pages/me/hetong?id=' + id
				})
			},

			searchvalue(e) {
				// this.search = e.detail.value
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.page = 1
					this.list = []
					this.getList()
				}, 500); // 500毫秒后执行
			},
			reachBottom() {
				if (this.page * this.size >= this.total) {
					// uni.showToast({
					// 	title: '已加载全部',
					// 	icon: 'none'
					// })
					return
				}
				//并且让页码+1,调用获取数据的方法获取第二页数据
				this.page++
				//此处调用自己获取数据列表的方法
				this.getUserPosition()
			},
			check(e) {
				this.page = 1
				this.isActive = e
				this.getList()
			},
			toBack() {
				uni.navigateBack(1)
			},
			receiveTrialBonus() {
				this.$request.get({
					url: "/app/trialBonusRecording/receiveTrialBonus",
					success: rsp => {
						this.getUser()
						uni.showToast({
							title: rsp.message,
							icon: 'none'
						})
					}
				})
			},
			getUserPosition() {
				this.$request.get({
					url: "/app/positionUser/getUserPosition",
					data: {
						pageNum: this.page,
						pageSize: this.size,
						positionType: 6,
						goodsType: 1
					},
					success: rsp => {
						if (this.page != 1) {
							this.warehouse = this.warehouse.concat(rsp.records)
						} else {
							this.warehouse = rsp.records
						}
						//将获取的总条数赋值
						this.total = rsp.total
						if (this.page * this.size >= this.total && this.total > this.size) {
							uni.showToast({
								title: '已加载全部',
								icon: 'none'
							})
						}
					}
				})
			},

			getList() {
				// this.$request.get({
				// 	url: "/app/positionUser/getUserPosition",
				// 	data: {
				// 		pageNum: this.page,
				// 		pageSize: this.size,
				// 		keywords: this.isActive
				// 	},
				// 	success: rsp => {
				// 		console.log(rsp, this.page);
				// 		// if (this.page != 1) {
				// 		// 	this.list = this.list.concat(rsp.records)
				// 		// } else {
				// 		// 	this.list = rsp.records
				// 		// }
				// 		// //将获取的总条数赋值
				// 		// this.total = rsp.total
				// 		// if (this.page * this.size >= this.total && this.total > this.size) {
				// 		// 	uni.showToast({
				// 		// 		title: '已加载全部',
				// 		// 		icon: 'none'
				// 		// 	})
				// 		// }
				// 	}
				// })
			},
		}
	}
</script>
<style scoped lang="scss">
	.content {
		background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744988684512bg.png') no-repeat;
		background-size: 100% 100%;
		height: 100vh;
	}


	.title {
		font-size: 40rpx;
		color: #000;
		line-height: 100rpx;
		width: 90%;
		margin: 0 5%;
		text-align: center;
		/* 定义容器宽度 */
		white-space: nowrap;
		/* 保证文本在一行内显示 */
		overflow: hidden;
		/* 隐藏超出容器的文本 */
		text-overflow: ellipsis;
		/* 超出部分显示省略号 */
	}

	.takeEffect {
		text-align: center;
		color: #D43C31;
		background-color: #F1E6E0;
		// width: 120rpx;
		font-size: 26rpx;
		padding: 5rpx 15rpx;
		margin-left: 10rpx;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-around;
		// color: #fff;
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 1px solid #b8b8b8;
		font-size: 24rpx;
		// background: url('/static/me/sc-bg-top.png') no-repeat;
		border-radius: 20rpx 20rpx 0 0;
		background-size: 100% 100%;
		// background: url('/static/me/sczc-bg.png') no-repeat;
	}

	.w20 {
		width: 33.3%;
		font-size: 26rpx;
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
		font-size: 26rpx;
	}
</style>