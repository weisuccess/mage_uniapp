<template>
	<view class="content">
		<view class="top">
			<view style="width: 90%;margin:0 2.5%;padding: 2.5%;" @click="toPage('me/myTeam','')">
				<view class=" br10" style="background: #fff;padding: 20rpx;margin-top: 220rpx;">
					<view style="position: relative;" class="vcenter-left">
						<image :src="user.handlUrl" mode="aspectFill"
							style="width: 150rpx;height: 150rpx;border-radius: 50%;" class="vmr30">
						</image>
						<view style="width: calc(100% - 200rpx);">
							<view class="flex-between-center">
								<view class="">
									<view class="fz40 lh60">
										{{user.telPhone | hidePhone}}
									</view>
									<view class="fz30 color-666 lh60">
										我们已经陪伴您{{accompanyDay}}天
									</view>
								</view>

								<image :src="user.vipGradeInfo.vipImage" mode="widthFix"
									v-if="user.vipGradeInfo&&user.vipGradeInfo.id!=1"
									style="width: 100rpx;height: 100rpx;">
								</image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" :style="{height:windowHeight+'px'}" style="width: 100%;margin-top: 50rpx;">
			<view class="br10" style="background: #33CC33;width: 90%;margin:0 2.5% 30rpx;padding: 2.5%;">
				<view class="flex-around-center">
					<view class="flex-start-center" @click="toPage('me/jfmx','')">
						<image src="/static/home/zjjj.png" mode="widthFix" style="width: 50rpx;height: 50rpx;"></image>
						<view class="color-fff ml10 mr10">积分 &gt</view>
						<!-- <view class="color-fff">{{user.integral}} &gt;</view> -->
					</view>
					<view class="flex-start-center" @click="toPage('me/kq','')">
						<image src="/static/home/zjjj.png" mode="widthFix" style="width: 50rpx;height: 50rpx;"></image>
						<view class="color-fff ml10 mr10">卡券 &gt;</view>
						<!-- <view class="color-fff">1000 张 &gt;</view> -->
					</view>
				</view>
			</view>
			<view class="main" style="margin-top: 30rpx;padding: 0;">
				<view
					style="background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744210539520zc-bg.png') no-repeat;width: 100%;background-size: 100% 100%;">
					<view style="width: 96%;margin: 0 1%;padding: 40rpx 1%;" class="flex-around-center">
						<view class="ml30" style="border-right: 2px dashed #ccc;width: 50%;">
							<view class="flex-start-center">
								<view class="fz40 fw700 lh100">资产</view>
								<view class="eye-icon ml10 mr10" @click="togglePasswordVisibility">
									<uni-icons type="eye" size="20" color="#666" v-if="!showPassword"></uni-icons>
									<uni-icons type="eye-filled" size="20" color="#666" v-else></uni-icons>
								</view>
								<view class="br30 fz26 color-33CC33"
									style="border: #33CC33 1px solid;padding: 5rpx 10rpx;">
									安全保障中
								</view>
							</view>
							<view class="mt20">账户余额（USDT）</view>
							<view class="lh100 fw700 fz40" v-if="!showPassword">{{user.balance}}</view>
							<view class="lh100 fw700 fz40" v-if="showPassword">***</view>
						</view>
						<view class="fz28 ml20" style="width: 35%;line-height: 1.4rem;">
							<view class=""> <text class="color-666">今日收益：</text>{{user.today}} </view>
							<view class=""><text class="color-666">待收收益：</text>{{user.toBeCollected}}</view>
							<view class=""><text class="color-666">累计收益：</text>{{user.earnings}}</view>
							<view class=""><text class="color-666">累计投资：</text>{{user.investmentAmount}}</view>
							<view class=""><text class="color-666">进行中：</text>{{user.ongoing}}</view>
							<view class=""><text class="color-666">已完成：</text>{{user.done}}</view>
						</view>
					</view>
				</view>
				<view class="fz40 fw700 lh100 pl40 mt30">大家都在用</view>
				<!-- <image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737112984932tyj.png" mode="widthFix"
					class="w100" @click="tyj"></image> -->
				<view class="flex-around-center-wrap mt30 br16"
					style="background-color: #fff;width: 90%;margin: 2.5%;padding: 2.5%;">
					<view class="menu_item" v-for="(item,index) in menuList" :key="index"
						@click="toPage(item.path,index)">
						<image :src="'https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/'+item.icon+'.png'"
							class="image_2 mt10" mode="heightFix"></image>
						<view class="text_1">{{item.txt}}</view>
					</view>
				</view>
				<view class="fz40 fw700 lh100 pl40 mt30">热门活动</view>
				<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744211307592zcgl.png" mode="widthFix"
					style="width: 95%;margin: 0 2.5%;" @click="tyj"></image>
				<!-- <view class="vcenter" style="flex-wrap: wrap;margin-top: 30rpx;">
					<view class="vcenter menu_item" v-for="(item,index) in menuList2" :key="index"
						@click="toPage1(item.path,index)">
						<image :src="'/static/me/icon/'+item.icon+'.png'" class="image_2" mode="heightFix"></image>
						<view class="text_1">{{item.txt}}</view>
					</view>
				</view> -->
				<view class="fz40 fw700 lh100 pl40 mt30">特色服务</view>
				<view class="flex-around-center" style="width: 90%;margin:0 2.5% ;padding: 2.5%;">
					<view class="br16" style="width: 45%;background-color: #fff;padding: 10rpx;">
						<view class="fz35 fw700 lh100 pl40" style="border-bottom: 1px solid #ccc;">福利中心</view>
						<view class="color-33CC33 flex-start-center pd10 mt20 br10" @click="toPage('me/xyzp','')"
							style="border: 1px solid #F7EFEB;background-color: #FCF5F2;">
							<image src="/static/lottery-bg-.png" mode="widthFix" style="width: 40rpx;height: 40rpx;">
							</image>
							<view class="ml10 fz26" style="width: 60%;">幸运福利</view>
							<view class="ml10">&gt;</view>
						</view>
						<view class="color-33CC33 flex-start-center pd10 mt20 br10" @click="toPage('me/myTeam','')"
							style="border: 1px solid #F7EFEB;background-color: #FCF5F2;">
							<image src="/static/lottery-bg-.png" mode="widthFix" style="width: 40rpx;height: 40rpx;">
							</image>
							<view class="ml10 fz26" style="width: 60%;">资产市场管理</view>
							<view class="ml10">&gt;</view>
						</view>
						<view class="color-666 fz24 lh100 ml20">更多惊喜等你探索哦~</view>
					</view>
					<view class="br16" style="width: 45%;background-color: #fff;padding: 10rpx;">
						<view class="fz35 fw700 lh100 pl40" style="border-bottom: 1px solid #ccc;">账户服务</view>
						<view class="flex-around-center-wrap">
							<view class="zhfw" @click="toPage('me/xkzs','')">新客专属</view>
							<view class="zhfw" @click="toPage('me/verified','')">证明材料</view>
							<view class="zhfw" @click="toPage('me/sczc','')">资产市场 <br />管理说明 </view>
							<view class="zhfw" @click="toPage('me/account','')">账户设置</view>
							<view class="zhfw" @click="toPage('webview/webview2','')">联系客服</view>
							<view class="zhfw" @click="toPage('home/about','')">关于我们</view>
						</view>
					</view>
				</view>


			</view>
			<uni-popup ref="popup">
				<view class=""
					style="width: 90vw;height: 530rpx;margin:0 5vw;border-radius: 20rpx;background-color: #fff;">
					<view style="display: flex;align-items: center;justify-content: flex-end;padding: 20rpx;"
						@click="close">
						<uni-icons type="closeempty" size="25"></uni-icons>
					</view>
					<view style="font-size: 50rpx;text-align: center;color: #000;width: 100%;line-height: 120rpx;">
						转账
					</view>
					<view style="width: 90%;margin:0 5%;color: #000;">
						<view style="display: flex;align-items: center;">
							<view class="">收款账号:</view>
							<input type="text" placeholder="请输入收款账号" v-model="outData.transferAccount"
								style="border: 1rpx solid #B0B0B0;margin-left: 10rpx;border-radius: 10rpx;padding: 5rpx 10rpx;" />
						</view>
						<view style="display: flex;align-items: center;margin-top: 20rpx;">
							<view class="">转账金额:</view>
							<input type="text" placeholder="请输入转账金额" v-model="outData.transferMoeny"
								style="border: 1rpx solid #B0B0B0;margin-left: 10rpx;border-radius: 10rpx;padding: 5rpx 10rpx;" />
						</view>
						<!-- <view style="display: flex;align-items: center;margin-top: 20rpx;">
						<view class="">收款人名:</view>
						<view style="margin-left: 10rpx;padding: 5rpx 10rpx;">{{transferableUsers.nickName}}</view>
					</view> -->
						<button
							style="background-color: #9B1B1A;width: 80%;color: #fff;bottom: 70rpx;position: absolute;border-radius: 60rpx;font-weight: bold;"
							@click="queren">确认转账</button>
					</view>
				</view>
			</uni-popup>
			<view class="fz26 color-7C7C mt60 pb20">
				<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1748621167202sy-2.png" mode="widthFix"
					style="width:80%;margin: 20rpx 10%;"></image>
			</view>
			<view style="color: #000;">
				<passkeyborad :show="showZZ" :money="outData.transferMoeny" @close="closezujian" @password="submit"
					@showPop="closezujian"></passkeyborad>
			</view>

			<view style="height: 50rpx;"></view>
		</scroll-view>
	</view>
</template>
<script>
	import uniPopup from '../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 220,
				accompanyDay: 0,
				showPassword: false,
				show: false,
				showZZ: false,
				qlList: {},
				popName: '',
				data: [],
				currTab: 0,
				logList: [],
				pageLoading: true,
				loading: true,
				outData: {
					transferMoeny: 0,
					transferType: 1,
					payPassword: '',
					transferAccount: ''
				},
				showHideData: {
					isShow1: true,
					isShow2: true,
					isShow3: true
				},
				user: [],
				jf: '',
				zcList: {},
				timer: null,
				transferableUsers: {},
				menuList: [{
						icon: "1744210950633cz",
						path: "me/chongzhi",
						txt: "充值"
					}, {
						icon: "1744210779726tx",
						path: "me/tx",
						txt: "提现"
					},
					{
						icon: "1744211001483zz",
						path: "me/zhuanzhang",
						txt: "转账"
					},
					{
						icon: "1744210809036qb",
						path: "me/usdtDetail",
						txt: "我的钱包"
					},
					{
						icon: "1744211035823zjmx",
						path: "me/zjmx-list",
						txt: "资金明细"
					},
					{
						icon: "1744210834280tzmx",
						path: "me/myPosition",
						txt: "投资明细"
					},
					{
						icon: "1744211050686xjb",
						path: "me/xjb/xjb",
						txt: "现金宝"
					},
					{
						icon: "1744211018642yqhy",
						path: "me/friend",
						txt: "邀请好友"
					},
					// {
					// 	icon: "team",
					// 	path: "me/myTeam",
					// 	txt: "我的团队"
					// },
					// {
					// 	icon: "sczc",
					// 	path: "me/sczc",
					// 	txt: "市场资产"
					// },
					// {
					// 	icon: "zp",
					// 	path: "me/xyzp",
					// 	txt: "幸运转盘"
					// },

					// {
					// 	icon: "vip",
					// 	path: "home/djsm",
					// 	txt: "等级说明"
					// },
					// {
					// 	icon: "kefu",
					// 	path: "webview/webview2",
					// 	txt: "联系客服"
					// },
				],
				menuList2: [{
						icon: "shiming",
						path: "me/verified",
						txt: "实名认证"
					}, {
						icon: "qb",
						path: "me/usdtDetail",
						txt: "我的钱包"
					},
					{
						icon: "set",
						path: "me/account",
						txt: "账户设置"
					},
					{
						icon: "about",
						path: "home/about",
						txt: "关于我们"
					}
				]
			}
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.getUser();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShow() {
			this.getUser();
		},
		onLoad() {},
		methods: {
			togglePasswordVisibility() {
				this.showPassword = !this.showPassword
			},
			tyj() {
				uni.navigateTo({
					url: '/pages/me/tyj/index'
				})
			},
			close() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.close()
			},
			queren() {
				if (!this.outData.transferAccount) {
					uni.showToast({
						title: '请先设置收款账号',
						icon: 'none'
					})
					return
				}
				this.showZZ = true
			},
			submit(e) {
				this.outData.payPassword = e
				this.$request.post({
					url: "/app/dreamUserInfo/getTransfer",
					data: this.outData,
					success: rsp => {
						uni.showToast({
							title: rsp.message,
							icon: 'none'
						})
						this.showZZ = false
						if (rsp.code == 200) {
							this.outData = {
								transferMoeny: 0,
								transferType: 1,
								payPassword: '',
								transferAccount: ''
							}
							this.$refs.popup.close()
							this.getUser();
						}

					}
				})
			},
			// onInput(e) {
			// 	// 清除已经设置的定时器
			// 	clearTimeout(this.timer);

			// 	// 设置新的定时器
			// 	this.timer = setTimeout(() => {
			// 		// 在这里处理节流后的逻辑
			// 		console.log('Input value:', e);

			// 		this.$request.get({
			// 			url: "/app/dreamUserInfo/subordinates",
			// 			data: {
			// 				telPhone: e.detail.value,
			// 			},
			// 			success: rsp => {
			// 				if (rsp.code != 200) {
			// 					uni.showToast({
			// 						title: rsp.message,
			// 						icon: 'none'
			// 					})
			// 				} else {
			// 					this.transferableUsers = rsp.data
			// 				}
			// 			}
			// 		})
			// 	}, 1000); // 500毫秒后执行
			// },
			// zichan() {
			// 	this.$request.get({
			// 		url: "/app/dreamUserInfo/getUserAsset",
			// 		success: rsp => {
			// 			this.zcList = rsp.data
			// 		}
			// 	})
			// },
			qunliao() {
				this.$request.get({
					url: "/app/customerInfo/getCustomerList",
					success: rsp => {
						this.qlList = rsp.data
						uni.navigateTo({
							url: '/pages/webview/webview2?url=' + this.qlList[0].customerUrl
						})
						console.log(this.qlList);
					}
				})
			},
			getUser() {
				this.$request.get({
					url: "/app/dreamUserInfo/getUser",
					success: rsp => {
						this.user = rsp.data
						this.accompanyDay = Math.floor((new Date().getTime() - this.user.createTime) /
							86400000)
					}
				})
			},
			to(e) {
				if (e == 1) {
					uni.navigateTo({
						url: '/pages/me/moneyDetails'
					})
				}
				if (e == 2) {
					uni.navigateTo({
						url: '/pages/me/tixian'
					})
				}
			},
			toPage(path, index) {
				if (path == 'me/verified' && this.user.isDelete == 1) {
					uni.showToast({
						title: '已经实名过了',
						icon: 'none'
					})
					return
				}
				if (path == 'webview/webview2') {
					//客服
					this.qunliao()
					return
				}
				uni.navigateTo({
					url: '/pages/' + path
				})
			},
			toPage1(page, index) {
				uni.navigateTo({
					url: '/pages/' + page
				})
			},
			showDetail(item) {
				if (this.currTab > 0) return;
				uni.navigateTo({
					url: './order_detail?id=' + item.id
				})
			},
			closezujian() {
				this.showZZ = false
			},
		}
	}
</script>
<style>
	page {
		background-color: #F1F1F1;
	}
</style>
<style lang="scss" scoped>
	.content {
		// background: url('../../static/me/bg.png') no-repeat;
		// background-size: 100% 100%;
		// max-height: 100vh;
		// color: #FFFFFF !important;
	}

	.top {
		width: 100%;
		height: 400rpx;
		background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174409903861872@3x.png') no-repeat;
		background-size: 100% 100%;
	}

	.memnu_list {
		padding: 24rpx;
		background: #FFFFFF;
		// box-shadow: 12px 0px 20px 0px #395DAC;
		border-radius: 30px 30px 30px 30px;
	}

	.menu_item {
		width: 25%;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: flex-start;

		image {
			width: 78rpx;
			height: 78rpx;
		}

		view {
			font-weight: 400;
			font-size: 24rpx;
			color: #272727;
			text-align: center;
			// height: 120rpx;
			line-height: 80rpx;
		}
	}

	.btn1 {
		width: 200rpx;
		background-color: #FFFFFF;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 60rpx;
		color: black;
	}

	.btn2 {
		width: 200rpx;
		background-color: #DD322A;
		color: #FFFFFF;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 60rpx;
	}

	.popup {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9999;
		color: #000;

		.popup-box {
			background-color: #fff;
			width: 80%;
			height: 40%;
			margin: 60% auto 0rpx; // 居中显示弹窗内容
			padding: 20rpx; // 添加一些内边距，使内容不会紧贴边缘
			border-radius: 15rpx; // 添加一些圆角，使内容更美观
			box-sizing: border-box; // 确保内边距不会影响内容宽度和高度
			overflow: auto; // 添加滚动条，如果内容超出弹窗框的高度
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.5); // 添加一些阴影，使内容更突出

			.btn-box {
				display: flex; // 使用flex布局，使按钮水平排列
				justify-content: space-between; // 使按钮平均分布，两端对齐
				align-items: center;

				.btn {
					margin-top: 80rpx;
					width: 200rpx;
					height: 80rpx;
					line-height: 80rpx;
				}

				.cancel {
					background-color: #fff;
					color: #000;
					border-radius: 10rpx; // 添加一些圆角，使内容更美观
					border: 1rpx solid #ccc; // 添加一些边框，使内容更突出
					text-align: center;
				}
			}
		}
	}

	.zhfw {
		background-color: #EDEDED;
		border-radius: 10rpx;
		padding: 8rpx 15rpx;
		margin-top: 25rpx;
		font-size: 24rpx;
	}
</style>