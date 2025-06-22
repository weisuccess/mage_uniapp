<template>
	<view class="content">
		<narBar :title="'申购详情'" @back="toBack()"></narBar>
		<view style="height: var(--status-bar-height);width: 100%;"></view>
		<view class="k">
			<scroll-view scroll-y="true" class="mt60" :style="{height:windowHeight+'px'}" style="width: 100%;">
				<view class="title vcenter fw700" style="padding-top: 50rpx;">{{arr.title}}</view>
				<view style="text-indent: 2ch;width: 90%;margin: 0 5%;color: #606060;font-size: 22rpx;">
					<rich-text :nodes="arr.content"></rich-text>
				</view>

				<view class="flex-start-center">
					<view class="ml20" style="width: 230rpx;height: 230rpx;" v-if="arr.titleImage">
						<!-- <swiper-item v-for="(item1,index1) in arr.titleImage" :key="index1"
							style="width: 230rpx;height: 230rpx;">
							<image :src="item1" mode="aspectFill"
								style="width: 230rpx;height: 230rpx;margin: 0 3% 0 5%;border-radius: 30rpx;">
							</image>
						</swiper-item> -->
						<image :src="arr.titleImage[0]" mode="aspectFill"
							style="width: 230rpx;margin: 0 3% 0 5%;height: 230rpx;border-radius: 30rpx;">
						</image>
					</view>


					<view style="width: calc(92% - 200rpx);margin-left: 70rpx;">
						<view class="tit">资产总金额：<view class="mon" style="color: #606060;">{{arr.circulation}}$</view>
						</view>
						<view class="tit">资产利率：<view class="mon">{{arr.interestRate}}%</view>
						</view>
						<view class="tit">认购金额：<view class="mon">{{arr.monovalent}}$</view>
						</view>
						<view class="tit">资产周期：<view class="mon">{{arr.holdTime}}天</view>
						</view>
					</view>
				</view>
				<view style="width: 90%;margin: 30rpx 5%;">
					<progress :percent="arr.progress" stroke-width="10" border-radius="60" activeColor="#33CC33" />
				</view>
				<view class="center"
					style="width: 90%;margin: 30rpx 5%;font-size: 29rpx;color: #6D6D6D;text-align: center;">
					资产进度：{{arr.progress}}%
				</view>
				<view v-if="arr.opportunityType==6" class="ts-btn" style="width: 90%;margin: 0 5%;height: 80rpx;color: #fff;
					line-height: 80rpx;text-align: center;margin-top: 40rpx;border-radius: 5rpx;">
					我的体验金余额： <text class="fw700">{{user.trialBonus}}USDT</text>
				</view>
				<view
					style="font-size:29rpx;line-height:70rpx;display: flex;justify-content: space-between;align-items: center;color:#524E4E;padding: 0 30rpx;">
					<view class="">
						购买数量
					</view>
					<view style="display: flex;align-items: center;">
						<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744787105754jia.png"
							mode="widthFix" style="width: 30rpx;height: 30rpx;" @click="num(2)">
						</image>
						<view
							style="min-width: 40rpx;text-align: center;padding: 0 10rpx;font-size: 29rpx;color: #403F3F;">
							{{outData.quantity}}
						</view>
						<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744787123486jian.png"
							mode="widthFix" style="width: 30rpx;height: 30rpx;" @click="num(1)">
						</image>
					</view>
				</view>
				<view style="font-size:29rpx;color:#524E4E;padding: 0 30rpx;" v-if="arr.opportunityType!=6">
					<view class="flex-between-center line-height:70rpx;">
						<view class="">
							优惠券
						</view>
						<view class="vcenter">
							<view class="vcenter" @click="outData.select=1">
								<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744787055762gou.png"
									mode="widthFix" v-if="outData.select==1"
									style="width: 30rpx;height: 30rpx;margin: 0 20rpx;"></image>
								<image src="/static/products/noSelect.png" mode="widthFix" v-if="outData.select==2"
									style="width: 30rpx;height: 30rpx;margin: 0 20rpx;"></image>
								<view class="">现金券</view>
							</view>
							<view class="vcenter" @click="outData.select=2">
								<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744787055762gou.png"
									mode="widthFix" v-if="outData.select==2"
									style="width: 30rpx;height: 30rpx;margin: 0 20rpx;"></image>
								<image src="/static/products/noSelect.png" mode="widthFix" v-if="outData.select==1"
									style="width: 30rpx;height: 30rpx;margin: 0 20rpx;"></image>
								<view class="">加息券</view>
							</view>
						</view>

					</view>
					<view class="" style="width: 98%;margin: 30rpx 1%;">
						<!-- <view class="flex-between-center" style="border-bottom: 1px solid #ccc;"
							@click="selcoupons(item.id)" v-for="(item,index) in coupons" :key="index">
							<view class="lh50">
								<view class="color-000">{{item.title}}</view>
								<view class="fz22 color-999">满{{item.rulesOfUse}} - {{item.couponsMoney}}</view>
							</view>
							<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744787055762gou.png"
								mode="widthFix" v-if="outData.couponsId==item.id"
								style="width: 30rpx;height: 30rpx;margin: 0 20rpx;"></image>
							<image src="/static/products/noSelect.png" mode="widthFix" v-if="outData.couponsId!=item.id"
								style="width: 30rpx;height: 30rpx;margin: 0 20rpx;"></image>
						</view> -->
						<scroll-view scroll-y="true" style="max-height: 400rpx;">
							<view class="flex-center-center" style="background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744736617359kq.png') no-repeat;background-size: 100% 100%;
									padding: 50rpx 0 60rpx;position: relative;" v-for="(item,index) in coupons" :key="index"
								v-if="item.couponsType==outData.select" @click="selcoupons(item.id)">
								<view class="color-33CC33 fz22" style="position: absolute;top: 0;left: 20rpx;">全品类通用
								</view>
								<view class="color-33CC33" style="width: 25%;text-align: center;">
									<view class="fw700 mr30 flex-center-center">
										<view class="fz30"> {{item.couponsType==1?'现金券':item.couponsType==2?'加息券':''}}
										</view>
									</view>
									<view class="fz14 flex-start-center mt20" v-if="item.couponsType==1">
										抵扣金额{{item.couponsMoney}}USDT</view>
									<view class="fz14 flex-start-center mt20" v-if="item.couponsType==2">
										加息{{item.couponsMoney}}%</view>
								</view>

								<view class="flex-between-center ml30" style="width: 60%;">
									<view class="">
										<view class="fw700 fz32">{{item.title}}</view>
										<view class="color-777 fz26 mt20">
											有效期至{{item.effectiveTime | convertTimestampToDate}}
										</view>
									</view>
									<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744787055762gou.png"
										mode="widthFix" v-if="outData.couponsId==item.id"
										style="width: 30rpx;height: 30rpx;margin: 0 20rpx;"></image>
									<image src="/static/products/noSelect.png" mode="widthFix"
										v-if="outData.couponsId!=item.id"
										style="width: 30rpx;height: 30rpx;margin: 0 20rpx;"></image>
									<!-- <view class="color-fff fz24" @click="sy(item)" v-if="item.effectiveTime>=new Date().getTime()"
										style="background: #33CC33;border-radius: 60rpx;padding: 5rpx 20rpx;">
										去使用</view>
									<view class="color-fff fz24" v-if="item.effectiveTime<new Date().getTime()"
										style="background: #ccc;border-radius: 60rpx;padding: 5rpx 20rpx;">
										已过期</view> -->
								</view>
							</view>
						</scroll-view>
					</view>
					<!-- <textarea cols="30" rows="10" disabled=""
						style="background-color: #33CC33;width: 95%;margin: 0 2.5%;border-radius: 30rpx;"></textarea> -->
				</view>
				<view class="vcenter-left fw700" style="margin: 30rpx;">
					<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744786927392mima.png" mode="widthFix"
						style="width: 50rpx;height: 50rpx;">
					</image>
					<view style="font-size: 35rpx;color: #000;margin-left: 10rpx;">交易密码</view>
				</view>
				<view class="vinput"
					style="width:90%;display: flex;border: none;background-color: #fff;margin: 0 5%;border-radius: 30rpx;background: #33CC33;border-radius: 10rpx;">
					<view style="width:88%;height:100%;">
						<input :type="showPassword ? 'text' : 'password'" v-model="outData.payPassword" maxlength="6"
							placeholder="请输入您的交易密码" placeholder-style="color:#fff"
							style="border: none;height: 100%;font-size: 28rpx;color: #fff;background: none;width: 70%;text-align: left;" />
					</view>
					<view class="eye-icon" @click="togglePasswordVisibility">
						<uni-icons type="eye" size="20" color="#666" v-if="!showPassword"></uni-icons>
						<uni-icons type="eye-filled" size="20" color="#666" v-else></uni-icons>
					</view>
				</view>
				<view class="flex-around-center ts-btn color-fff lh100" style="margin: 60rpx 5% 0;
					border-top: 1rpx solid #eee;width: 90%;">
					<view
						style="width: 50%;text-align: center;border-right: 1rpx solid #eee;border-bottom-left-radius: 30rpx;"
						@click="close">{{money}}$</view>
					<view style="width: 50%;text-align: center;border-bottom-right-radius: 30rpx;"
						@click.stop="$noMultipleClicks(submit,'valiForm')">确认申购</view>
				</view>
			</scroll-view>
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 170,
				id: 0,
				arr: {},
				outData: {
					quantity: 1,
					payPassword: '',
					id: '',
					select: 1,
					couponsId: ''
				},
				noClick: true,
				showPassword: false,
				money: 0,
				user: {},
				coupons: [],
				purchaseQuantity: 0
			}
		},
		onLoad(opt) {
			this.id = opt.id
			this.outData.id = opt.id
			this.getArr()
			this.getUser()
			this.getNum()
			this.chooseCoupons()
		},
		methods: {
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
			selcoupons(id) {
				if (this.outData.couponsId == id) {
					this.outData.couponsId = ''
					return
				}
				this.outData.couponsId = id
			},
			chooseCoupons() {
				this.$request.get({
					url: "/app/couponsInfo/chooseCoupons",
					success: rsp => {
						this.coupons = rsp.data
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
			togglePasswordVisibility() {
				this.showPassword = !this.showPassword
			},
			getArr() {
				this.$request.get({
					url: "/app/opportunityInfo/getDetails",
					data: {
						id: this.id,
					},
					success: rsp => {
						this.arr = rsp.data
						this.money = this.outData.quantity * this.arr.monovalent
						if (this.arr.titleImage.includes(',') == true) {
							this.arr.titleImage = this.arr.titleImage.split(',')
						} else {
							this.arr.titleImage = [this.arr.titleImage]
						}
					}
				})
			},
			num(e) {
				if (e == 1) {
					if (this.outData.quantity <= 1) {
						uni.showToast({
							title: '数量不能小于1',
							icon: 'none'
						})
						return
					}
					this.outData.quantity -= 1
				}
				if (e == 2) {
					if (this.outData.quantity >= this.purchaseQuantity) {
						uni.showToast({
							title: '数量不能大于' + this.purchaseQuantity,
							icon: 'none'
						})
						return
					}
					this.outData.quantity += 1
				}
				this.money = this.outData.quantity * this.arr.monovalent
			},
			submit() {
				var testmoney = /(^[1-9]([0-9]+)?([0-9])?$)|(^(0){1}$)|(^[0-9][0-9](0-9)?$)/;
				if (!testmoney.test(this.outData.quantity)) {
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
				if (!this.outData.payPassword) {
					uni.showToast({
						title: "请输入密码",
						icon: 'none',
						duration: 1500
					});
					return false;
				}
				// if (!this.outData.couponsId && this.arr.opportunityType != 6) {
				// 	uni.showToast({
				// 		title: "请选择优惠券",
				// 		icon: 'none',
				// 		duration: 1500
				// 	});
				// 	return false;
				// }
				let url = ''
				if (this.arr.opportunityType == 6) {
					url = '/app/opportunityInfo/experienceProducts'
				} else {
					url = '/app/opportunityInfo/products'
				}
				this.$request.get({
					url: url,
					data: this.outData,
					success: rsp => {
						uni.showToast({
							title: rsp.message,
							icon: 'none'
						})
						if (rsp.code == 200) {
							setTimeout(() => {
								// uni.navigateBack()
								if (this.arr.opportunityType == 6) {
									uni.navigateTo({
										url: '/pages/me/tyj/index'
									})
								} else {
									uni.navigateTo({
										url: '/pages/me/myPosition'
									})
								}
							}, 1500)
						}
					}
				})
			},
			toBack() {
				uni.navigateBack()
			}
		}
	}
</script>
<style scoped lang="scss">
	.content {
		background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/174410046676033CC33-bg.png') no-repeat;
		background-size: 100% 100%;
		height: 100vh;
	}

	.k {
		background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744290610523bg.png') no-repeat;
		background-size: 100% 100%;
		width: 95%;
		padding-bottom: 60rpx;
		margin: 60rpx 2.5%;

	}

	.tit {
		color: #403D3C;
		font-size: 24rpx;
		line-height: 60rpx;
		display: flex;
		align-items: center;
	}

	.mon {
		color: #9B1B1A;
		font-size: 24rpx;
		height: 60rpx;
	}

	.title {
		padding: 20rpx;
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