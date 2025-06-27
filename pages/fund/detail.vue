<template>
	<view class="content">
		<narBar :title="'资产详情'" @back="toBack()"></narBar>
		<view class="" style="height: var(--status-bar-height);"></view>
		<scroll-view scroll-y="true" :style="{height:windowHeight+'px'}">
			<view class="k mt30">
				<swiper circular autoplay style="height: 400rpx;">
					<swiper-item v-for="(item1,index1) in arr.titleImage" :key="index1">
						<image :src="item1" mode="aspectFill" @click="previewImage(index1)"
							style="width: 90%;height: 100%; margin: 20rpx 5%;border-radius: 20rpx;">
						</image>
					</swiper-item>
				</swiper>
				<!--{{show}}{{day}}{{hour}}{{minute}}{{second}}  -->
				<view v-if="arr&&arr.opportunityType==7">
					<view class="my30 flex-center-center" v-if="show">
						预售倒计时：
						<uni-countdown :filterShow="{}" :font-size="20" :day="day" :hour="hour" :minute="minute"
							:second="second" color="#000" @timeup="timeup" />
					</view>
				</view>


				<!-- <view style="display: flex;justify-content: space-between;align-items: center;padding: 20rpx 30rpx;">
					<view
						style="background-color: #880807;color: #fff;font-size: 21rpx;width: 100rpx;border-radius: 60rpx;text-align: center;">
						{{arr.monovalent}}$
					</view>
					<view style="color: #880807;font-size: 22rpx;">
						{{arr.repeatPurchases==1?'可复投':arr.repeatPurchases==2?'不可复投':''}} <text
							v-if="arr.repeatPurchases==1">{{arr.repeatPurchasesQuantity}}次</text>
					</view>
				</view> -->
				<view class="title vcenter fw700">{{arr.title}}</view>
				<!-- <view
					style="text-indent: 2ch;width: 90%;margin: 0 5%;padding-bottom: 20rpx;border-bottom: 7rpx dashed #ccc;color: #606060;font-size: 22rpx;">
					<rich-text :nodes="arr.content"></rich-text>
				</view> -->
				<!-- <view style="width: 96%;margin: 0 2%;height: 80rpx;background: linear-gradient(#D65039,#B71914);color: #fff;
					line-height: 80rpx;text-align: center;margin-top: 40rpx;">
					收益方式： {{arr.earningsType==1?'按天收益，到期返本':arr.earningsType==2?'到期结算，返本返息':''}}
				</view> -->
				<view style="border: 1px solid #ccc; height: 200rpx;width: 90%;margin: 0 5%;">
					<view class="flex-around-center lh50 text-align-c">
						<view style="border-bottom: 1px solid #ccc;border-right: 1px solid #ccc;width: 33%;">
							<view class="">周期</view>
							<view class="color-33CC33">{{arr.holdTime}}天</view>
						</view>
						<view style="border-bottom: 1px solid #ccc;border-right: 1px solid #ccc;width: 33%;">
							<view class="">每日收益</view>
							<view class="color-33CC33">{{(arr.monovalent * (arr.interestRate/100)).toFixed(2)}}U</view>
						</view>
						<view style="border-bottom: 1px solid #ccc;width: 33%;">
							<view class="">起购资金</view>
							<view class="color-33CC33">{{arr.monovalent}}U</view>
						</view>
					</view>
					<view class="flex-around-center lh50 text-align-c">
						<view style="border-right: 1px solid #ccc;width: 33%;">
							<view class="">预期收益率</view>
							<view class="color-33CC33">{{arr.interestRate}}%</view>
						</view>
						<view style="border-right: 1px solid #ccc;width: 33%;">
							<view class="">资产规模</view>
							<view class="color-33CC33">{{arr.circulation}}U</view>
						</view>
						<view style="width: 33%;" class="fw700">
							<view class="color-33CC33">{{arr.earningsType==1?'按天收益':arr.earningsType==2?'到期结算':''}}
							</view>
							<view class="color-33CC33">{{arr.earningsType==1?'到期返本':arr.earningsType==2?'返本返息':''}}
							</view>
						</view>
					</view>
				</view>

				<view style="width: 90%;margin: 30rpx 5% 0;">
					<progress :percent="arr.progress" stroke-width="10" border-radius="60" backgroundColor="#999999"
						activeColor="#E49E80" />
				</view>
				<view class="center"
					style="line-height: 120rpx;width: 90%;margin: 0 5%;font-size: 29rpx;color: #6D6D6D;text-align: center;">
					资产进度：{{arr.progress}}%
				</view>
			</view>
			<view class="" style="background-color: #fff;">
				<view style="display: inline-block" class="mx30 py20 lh80" @click="active(index)"
					v-for="(item,index) in titlist" :key="index">
					<view :class="isActive==index?'active fz40 fw700 color-33CC33':'noactive'">
						{{item}}
					</view>
				</view>

				<view class="text-align-r" v-if="isActive==0">
					<view class="flex-between-start pd20 " style="border-bottom: 1px solid #D5D5D5;">
						<view class="fz28 fw500" style="padding:0 20rpx;">资产名称</view>
						<view style="font-size: 24rpx;color: #2F2B2B;max-width: 70%;text-align: start;">{{arr.title}}</view>
					</view>
					<view class="flex-between-start pd20 " style="border-bottom: 1px solid #D5D5D5;">
						<view class="fz28 fw500" style="padding:0 20rpx;">资产规模</view>
						<view style="font-size: 24rpx;color: #2F2B2B;">{{arr.circulation}}U</view>
					</view>
					<view class="flex-between-start pd20 " style="border-bottom: 1px solid #D5D5D5;">
						<view class="fz28 fw500" style="padding:10rpx 20rpx;">每日收益</view>
						<view style="font-size: 24rpx;color: #2F2B2B;line-height: 50rpx;">
							按每日基础收益率{{arr.interestRate}}%保本保息
						</view>
					</view>
					<view class="flex-between-start pd20 " style="border-bottom: 1px solid #D5D5D5;">
						<view class="fz28 fw500" style="padding:0 20rpx;">起购资金</view>
						<view style="font-size: 24rpx;color: #2F2B2B;">最低起投 {{arr.monovalent}}U <text
								v-if="arr.whetherPurchasingRules==1">(限购{{arr.numberOfPurchases}}份)</text>
						</view>
					</view>
					<view class="flex-between-start pd20 " style="border-bottom: 1px solid #D5D5D5;">
						<view class="fz28 fw500 text-align-c" style="padding:0 20rpx;">收益计算 <br>(本息) </view>
						<view style="font-size: 24rpx;color: #2F2B2B;">
							{{arr.monovalent}}U*{{arr.interestRate}}%*{{arr.holdTime}}天<br>
							=
							总收益{{((arr.monovalent * (arr.interestRate/100))*arr.holdTime).toFixed(2)}}U+本金{{arr.monovalent}}U
						</view>
					</view>
					<view class="flex-between-start pd20 " style="border-bottom: 1px solid #D5D5D5;">
						<view class="fz28 fw500" style="padding:0 20rpx;">还款方式</view>
						<view style="font-size: 24rpx;color: #2F2B2B;">
							{{arr.earningsType==1?'按天收益，到期返本':arr.earningsType==2?'到期结算，返本返息':''}}，节假日照常收益
						</view>
					</view>
					<view class="flex-between-start pd20 " style="border-bottom: 1px solid #D5D5D5;">
						<view class="fz28 fw500 text-align-c" style="padding:0 20rpx;">资产运营<br>佣金</view>
						<view style="font-size: 24rpx;color: #2F2B2B;max-width: 70%;text-align: start;"
							v-if="arr.rebatesRulesInfo&&arr.whetherRebates==1">
							推荐下级会员参与本项目，可获得得资产运营佣金奖励为：
							第一层下级会员得{{arr.rebatesRulesInfo.rebatesLevelOne}}%，
							第二级会员的{{arr.rebatesRulesInfo.rebatesLevelTwo}}%
						</view>
						<view style="font-size: 24rpx;color: #2F2B2B;max-width: 70%;text-align: start;"
							v-if="arr.whetherRebates==2">
							不享受佣金返还
						</view>
					</view>
					<view class="flex-between-start pd20" style="border-bottom: 1px solid #D5D5D5;">
						<view class="fz28 fw500" style="padding:0 20rpx;">结算时间</view>
						<view style="font-size: 24rpx;color: #2F2B2B;max-width: 70%;text-align: start;">
							当日{{new Date().getTime() | getHM}}申购，系统自动计算每日收益及到期结算本金(例如:在{{new Date().getTime() | getHM}}申购，则在第二日{{new Date().getTime() | getHM}}起到周期结束每日产生收益，到期系统将本金如期返还到您的会员账户中。）
						</view>
					</view>
					<view class="flex-between-start pd20" style="border-bottom: 1px solid #D5D5D5;">
						<view class="fz28 fw500" style="padding:0 20rpx;">可投金额</view>
						<view style="font-size: 24rpx;color: #2F2B2B;">
							<text>{{arr.monovalent*purchaseQuantity}}U</text>
						</view>
					</view>
					<view class="flex-between-start pd20" style="border-bottom: 1px solid #D5D5D5;">
						<view class="fz28 fw500" style="padding:0 20rpx;">资金安全</view>
						<view style="font-size: 24rpx;color: #2F2B2B;max-width: 70%;text-align: start;">
							{{arr.fundSafe}}
						</view>
					</view>
				</view>
				<view class="pd20 fz28" v-if="isActive==1" style=" text-indent: 2em;">
					<rich-text :nodes="arr.content"></rich-text>
				</view>
			</view>
			<view class="ts-btn text-align-c color-fff" style="width: 80%;margin: 60rpx 10%;" @click="detail()">
				资产申购
			</view>
			<!-- <view style="display: flex;align-items: center;width:80%;margin: 0 10%;" @click="detail()">
				<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737122680815sg.png" mode="widthFix"
					style="width: 100%;"></image>
			</view> -->
			<view style="height: 200rpx;">
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
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 80,
				id: 0,
				arr: {},
				outData: {
					tradeValue: 1
				},
				noClick: true,
				day: 0,
				hour: 0,
				minute: 0,
				second: 0,
				titlist: ['资产详情', '资产说明'],
				isActive: 0,
				purchaseQuantity: 0,
				show: false
			}
		},
		onLoad(opt) {
			this.id = opt.id
			this.getArr()
			this.getNum()
		},
		methods: {
			timeup(e) {
				console.log(e);
				this.show = false
				// setTimeout(() => {
				// 	if (this.day == 0 && this.hour == 0 && this.minute == 0&&this.second==0) {
				// 		this.show = false
				// 		return
				// 	}
				// 	if (this.day != 0 || this.hour != 0 || this.minute != 0||this.second!=0) {
				// 		this.show = true
				// 	} else {
				// 		this.show = false
				// 	}
				// })
			},
			active(index) {
				this.isActive = index
			},
			detail() {
				if (this.purchaseQuantity == 0) {
					uni.showToast({
						title: '可投金额不足',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/fund/subscription?id=' + this.id
				})
			},
			previewImage(index) {
				uni.previewImage({
					urls: this.arr.titleImage,
					current: index
				});
			},
			getNum() {
				this.$request.get({
					url: "/app/opportunityInfo/purchaseQuantity",
					data: {
						id: this.id,
					},
					success: rsp => {
						console.log(rsp);
						this.purchaseQuantity = rsp.data
					}
				})
			},
			getArr() {
				this.$request.get({
					url: "/app/opportunityInfo/getDetails",
					data: {
						id: this.id,
					},
					success: rsp => {
						this.arr = rsp.data
						if (this.arr.titleImage.includes(',') == true) {
							this.arr.titleImage = this.arr.titleImage.split(',')
						} else {
							this.arr.titleImage = [this.arr.titleImage]
						}
						const currentTimestamp = Date.now();
						let countdownTime = this.arr.preSaleTime - currentTimestamp;
						const remainingTime = countdownTime / 1000; // 将毫秒转换为秒
						console.log(remainingTime);
						if (remainingTime > 0) {
							this.show = true
						} else {
							this.show = false
						}
						if (currentTimestamp > this.arr.preSaleTime) {
							return
						}

						this.day = Math.floor(remainingTime / 86400); // 计算剩余天数
						this.hour = Math.floor((remainingTime % 86400) / 3600); // 计算剩余小时
						this.minute = Math.floor((remainingTime % 3600) / 60); // 计算剩余分钟
						this.second = Math.floor(remainingTime % 60); // 计算剩余分钟
						console.log(this.day, this.hour, this.minute, this.second, '时间');
					}
				})
			},
			num(e) {
				if (e == 1) {
					this.outData.tradeValue -= 1
				}
				if (e == 2) {
					this.outData.tradeValue += 1
				}
			},
			submit() {
				var testmoney = /(^[1-9]([0-9]+)?([0-9])?$)|(^(0){1}$)|(^[0-9][0-9](0-9)?$)/;
				if (!testmoney.test(this.outData.tradeValue)) {
					uni.showToast({
						title: "请输入正确的金额,且不包含小数位。",
						icon: 'none',
						duration: 1500
					});
					return false;
				}
				// if (this.outData.tradeValue == null || this.outData.tradeValue.length < 1) {
				// 	uni.showToast({
				// 		title: "请选择银行卡",
				// 		icon: 'none',
				// 		duration: 1500
				// 	});
				// 	return false;
				// }
				uni.navigateTo({
					url: './orderGoods?id=' + this.arr.id + '&num=' + this.outData.tradeValue
				})
				// this.$request.get({
				// 	url: '/app/dreamUserInfo/getPayouts',
				// 	data: this.outData,
				// 	success: rsp => {
				// 		uni.showToast({
				// 			title: rsp.message,
				// 			icon: 'none'
				// 		})
				// 		return
				// 		if (rsp.code == 200) {
				// 			uni.navigateBack()
				// 		}
				// 	}
				// })
			},
			toBack() {
				uni.navigateBack()
			}
		}
	}
</script>
<style>
	page {
		background-color: #F6FFF6;
	}
</style>
<style scoped lang="scss">
	.content {
		background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174410046676033CC33-bg.png') no-repeat;
		background-size: 100% 100%;
		color: #3A3A3A;
		// color: #ffffff;
	}

	.k {
		// width: 90%;
		background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744290610523bg.png') no-repeat;
		background-size: 100% 100%;
		// box-shadow: 0 0 30rpx rgba(0, 0, 0, .2);
		// height: 500rpx;
		padding-bottom: 60rpx;
		// margin: 5%;
		// border-radius: 10rpx;
	}

	.active {
		border-bottom: 6rpx solid #33CC33;
	}

	.tit {
		color: #3A3A3A;
		font-size: 30rpx;
		line-height: 70rpx;
	}

	.mon {
		color: #9B1B1A;
		font-size: 30rpx;
		padding: 20rpx;
	}

	.title {
		padding: 20rpx;
		color: #3A3A3A;
	}

	.balance {
		font-size: 60rpx;
		font-weight: 600;
	}

	.box {
		width: 90%;
		padding: 2.5%;
		height: calc(100vh - 300rpx);
		margin: 100rpx 2.5%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		color: #000;
	}

	.color-000 {
		color: #000;
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

	.bottom {
		position: fixed;
		width: 82%;
		bottom: 0;
		background-color: #fff;
		height: 120rpx;
		line-height: 120rpx;
		border-top: 1rpx solid #eee;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>