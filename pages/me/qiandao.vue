<template>
	<view class="content">
		<narBar :title="getLg('签到')" @back="toBack()" @log="rightClick" rightTxt="qd" showRightBtn
			background="transparent"></narBar>
		<view class="" style="padding: 0 30rpx;">
			<view class="color-fff  ml30 mt60" style="">
				<view class="fw700 lh100 fz40">{{user.balance}}</view>
				<view class="" @click="toPage('/me/assetDetails')">我的USDT > </view>
			</view>
			<view class="mt130 br10 px30" style="background-color: #fff;">
				<view class="pt50 lh100 fz40">已连续签到 <text class="color-33CC33 ml10 mr10"> {{sign.continuousDays}}
					</text> 天</view>
				<view class="flex-around-center-wrap" v-if="user.vipGradeInfo"> 
				 
					<view class="text-align-c py20 fz20 mt10 br10" v-for="(item,index) in 10" :key="index"
						v-if="index<num" style="width: 18%;background-color: #33CC33;border: 1px solid #aaa;">
						<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744534391322usdt.png"
							mode="widthFix" style="width: 40rpx;height: 40rpx;"></image>
						<view class="color-fff">+{{user.vipGradeInfo.signInReward}}USDT</view>
					</view>
					<view class="text-align-c py20 fz20 mt10 br10" v-for="(item,index) in 10" :key="index"
						v-if="index>num-1" style="width: 18%;background-color: #eee;border: 1px solid #aaa;">
						<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744534391322usdt.png"
							mode="widthFix" style="width: 40rpx;height: 40rpx;"></image>
						<view class="">+{{user.vipGradeInfo.signInReward}}USDT</view>
					</view>

				</view>
				<view class="mt30 mb30">
					<view class="">
						<uni-steps :options="list" :active="sel" deactiveColor="#ccc"></uni-steps>
					</view>
				</view>
				<view class="bottom pb30">
					<!--  :style="[{'color':signIn?'#555':'#fff'},{'backgroundColor':signIn?'#ccc':'#9B1B1A'}]" -->
					<view class="authentication ts-btn color-fff" @click.stop="$noMultipleClicks(submit,'')">
						{{signIn?'已签到':'立即签到'}}
					</view>
				</view>
			</view>

			<view style="height: 200rpx;"></view>
		</view>

	   {{signIn}}

		<uni-popup ref="popup">
			<view style="width: 80vw; margin: 0 10vw; height: 40vh;border-radius: 20rpx;background-color: #fff;">
				<view class="text-align-c  ml30">
					<image
						src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174487653877919ff456762cf0243b4426cc7bc8ddf61deca1b9d36116-rvB4r0@3x.png"
						mode="widthFix" style="width: 100%; height: 400rpx;margin-top: -250rpx;"></image>
					<view class="text-align-c fw700 fz40">签到成功</view>
					<view class="vcenter fz28" style="line-height: 80rpx;color: #D91C0C;" v-if="user.vipGradeInfo">
						恭喜您，获得 +{{user.vipGradeInfo.signInReward}} USDT~
					</view>
				</view>
				<view class=" text-align-c lh120 color-33CC33 fz40 fw700"
					style="position: absolute;bottom: 0;width: 80vw;border-top: 1px dashed #ccc;"
					@click.stop="$noMultipleClicks(close,'')">
					确定
				</view>
			</view>

		</uni-popup>
	</view>
</template>

<script>
	import narBar from 'pages/public/narBar.vue'
	import Calendar from '@/components/yi-calendar/main.vue'


	export default {
		components: {
			narBar,
			Calendar
		},
		data() {
			return {
				list: [{}],
				allDay: [],
				user: {},
				sign: {},
				sel: null,
				num: 10,
				noClick: true,
				showup: 2,
				trueName: '',
				idCard: '',
				maxDay: 0,
				year: 0,
				month: 0,
				day: 0,
				week: '',
				nowDay: '',
				selectDay: '',
				everyDay: [],
				weekDates: [],
				signIn: false,
				signMonth: [],
				signInReward: '',
				today: ''
			}
		},
		onLoad() {
			var date = new Date(); 
			var year = date.getFullYear();
			var month = ("0" + (date.getMonth() + 1)).slice(-2);
			var sdate = ("0" + date.getDate()).slice(-2);
			this.today = year + "/" + month + "/" + sdate
			this.today=this.today.toString()
			this.getList()
			this.getUser()
		},
		methods: {
			toPage(path) {
				uni.navigateTo({
					url: '/pages' + path
				})
			},
			signInStatistics(data) {
				let list = data
				this.$request.get({
					url: "/app/userCheckInStats/signInStatistics",
					success: rsp => {
						this.sign = rsp.data
						if (this.sign.continuousDays < 10) {
							this.num = this.sign.continuousDays
						} else if (this.sign.continuousDays >= 10) {
							this.num = this.sign.continuousDays % 10
						}
						this.list = []
						if (this.sign.continuousDays < 7) {
							this.sel = this.sign.continuousDays - 1
							 
							for (let i = 0; i < 7; i++) {
								if (i < this.sign.continuousDays) {
									this.list.push({
										title: '已签'
									})
								} else if (i >= this.sign.continuousDays) {
									this.list.push({
										title: i + 1 + '天'
									})
								}
							}
							console.log(this.list);
						} else if (this.sign.continuousDays >= 7) {
							this.sel = 5
							for (let i = 0; i < 6; i++) {
								this.list.push({
									title: '已签'
								})
							}
							this.list.push({
								title: this.sign.continuousDays + 1 + '天'
							})
						}
					}
				})
			},
			getUser() {
				this.$request.get({
					url: "/app/dreamUserInfo/getUser",
					success: rsp => {
						this.user = rsp.data
					}
				})
			},
			rightClick() {
				uni.navigateTo({
					url: '/pages/me/qd-detail'
				})
			},
			getList() {
				this.$request.get({
					url: "/app/userCheckInStats/signInList",
					success: rsp => {
						if (rsp.code == 200) {
							if(rsp.data[0]){
								if (this.today == rsp.data[0].dateStr) {
									this.signIn = true
								}
							}
							// this.list = rsp.data
							this.signInStatistics(rsp.data)
						} else {
							uni.showToast({
								title: rsp.message,
								icon: 'none'
							})
						}
					}
				})
			},
			toBack() {
				uni.navigateBack()
			},
			submit() {
				// if (this.signIn) {
				// 	uni.showToast({
				// 		title: '已经签到过了',
				// 		icon: 'none'
				// 	})
				// 	return
				// }
				this.$request.get({
					url: "/app/userCheckInStats/signIn",
					success: rsp => {
						if (rsp.code == 200) {
							this.$refs.popup.open()
							this.getList()
							this.getUser()
							this.signInStatistics()

						} else {
							uni.showToast({
								title: rsp.message,
								icon: 'none'
							})
						}
					}
				})
			},
			close() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744534069895bg.png') no-repeat;
		background-size: 100% 100%;
		height: 100vh;
		// color: #ffffff;
	}

	.title {
		font-size: 50rpx;
		line-height: 100rpx;
	}

	.box {
		background: url('/static/me/qd-bg.png') no-repeat;
		background-size: 100% 100%;
		width: calc(100% - 60rpx);
		// height: 700rpx;
		margin: 70rpx 10rpx;
		padding: 40rpx 20rpx 60rpx;
	}

	.qiandao {
		position: absolute;
		width: 100%;
		height: 150rpx;
		text-align: center;

	}

	.biao {
		position: absolute;
		width: 70rpx;
		height: 70rpx;
		margin-left: calc(50% - 30rpx);
		margin-top: 20rpx;
	}

	.bottom {
		width: 100%;
	}

	.authentication {
		width: 80%;
		margin: 0 10%;
		// background-color: #DD322A;
		text-align: center;
		// height: 80rpx;
		// line-height: 80rpx;
		color: #fff;
		border-radius: 10rpx;
	}

	.calendar-bottom {
		display: flex;
		flex-wrap: wrap;
		// width: 697rpx;
		height: auto;
		// background: linear-gradient(180deg, #FFFFFF 0%, #F9F4E9 100%);
		border-radius: 20rpx;
		position: relative;
		overflow: hidden;
		padding-left: 10rpx;

		.week-item {
			width: 14%;
			text-align: center;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;
		}



		.day-box {
			width: 14%;
			// height: 200rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;

			.day-item {
				font-size: 29rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #777777;

				// .day-point {
				// 	width: 5rpx;
				// 	height: 5rpx;
				// 	background: #FF3615;
				// 	border-radius: 50%;
				// 	margin: 5rpx auto 0;
				// }
			}

			.selBox {
				background-color: #D22D01;
				width: 50rpx !important;
				height: 50rpx !important;
				line-height: 50rpx;
				border-radius: 50%;
				color: #fff;
			}

			.day-item1 {
				font-size: 29rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #E75C20;
			}

			.daySelect {
				width: 80rpx;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				background: #45CFF5;
				font-size: 29rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				border-radius: 50%;
			}
		}

		.grayDate {
			.day-item {
				color: #999999;

				.day-point {
					background: #CCCCCC;
				}
			}
		}

		.iconfont {
			color: rgba(136, 136, 136, 1);
			font-size: 28rpx;
			position: absolute;
			left: 50%;
			right: 0;
			margin-left: 10rpx 0 0 -14rpx;
			bottom: 36rpx;
		}
	}
</style>