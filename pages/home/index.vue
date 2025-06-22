<template>
	<view class="content">
		<scroll-view scroll-y="true" :style="{height:windowHeight+'px'}">
			<view
				style="height: var(--status-bar-height);width: 100%;background-color: #27AE50;position: fixed;z-index: 999;top: 0;">
			</view>
			<view class="flex-between-center" style="top: var(--status-bar-height);color: #fff;
				width: 100%;padding: 20rpx 0;position: fixed;background-color: #27AE50;z-index: 999;">
				<view style="width: 30%;padding: 3rpx 0 3rpx 20rpx;">
					<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744098531844logo1.png" mode="widthFix"
						style="width: 200rpx;height: 60rpx;"></image>
				</view>
				<view class="br10 color-999 fz26" style="width: 45%;background-color: #fff;padding: 15rpx 20rpx;"
					@click="toPage('me/notice')">
					查览公告 >
					<!-- <uni-easyinput prefixIcon="search" placeholder="请输入内容" disabled=""></uni-easyinput> -->
				</view>
				<view class="" style="width: 25%;display: flex;justify-content: flex-end;">
					<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744099304954qiandao@3x.png"
						style="width: 45rpx;height: 45rpx;" mode="widthFix" @click="qd">
					</image>
					<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744099335585kefu@3x.png"
						style="width: 45rpx;height: 45rpx;margin: 0 30rpx;" mode="widthFix" @click="kefu"></image>
				</view>
			</view>
			<view style="height: var(--status-bar-height);width: 100%;"></view>
			<view class="top" style="margin-top: 135rpx;">
				<view class="laba" @click="toPage('me/notice')">
					<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744099159637gg@3x.png"
						style="width: 55rpx;height: 55rpx;margin: 0 10rpx;" mode="widthFix">
					</image>
					<uni-notice-bar :speed="30" single scrollable :text="notice" background-color="transparent"
						color="#fff" style="height: 55rpx;width: 100%;"></uni-notice-bar>
				</view>
				<view class="" style="flex-wrap: wrap;display: flex;align-items: center;">
					<view class="vcenter menu_item" v-for="(item,index) in menuList" :key="index"
						@click="toPage(item.path,index)">
						<image :src="'https://ubi-res.oss-cn-beijing.aliyuncs.com/null/'+item.icon+'.png'"
							style="height: 68rpx;width: 20%;" mode="heightFix">
						</image>
						<view class="text_1" style="color: #fff;">{{item.txt}}</view>
					</view>
				</view>

			</view>
			<view class="home_top" style="height: 352rpx;margin-top: -150rpx;">
				<swiper circular autoplay style="height: 352rpx;width:90%;margin: 20rpx 5%;">
					<swiper-item v-for="(item1,index1) in lbtList" :key="index1">
						<image :src="item1.imgUrl" mode="scaleToFill" class="br10" style="height: 100%;width:100%;">
						</image>
					</swiper-item>
				</swiper>
			</view>
			<view class="" style="margin-top: 60rpx;">
				<view class="news">
					<view class="flex-between-center pd30"
						style="background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744381673565bg1.png') no-repeat;background-size: 100% 100%;">
						<view class="">
							<view class="fz38 fw700 mb10">快速了解我们</view>
							<view class="fz26" style="color:#646464;">捕捉投资机会</view>
						</view>
						<view class="flex-around-center fz24" style="width: 50%;">
							<view class="pd10 br5 mr5" :class="videoIndex==1?'active-33CC33':'active-fff'"
								@click="checkVideo(1)">市场<br />
								前景
							</view>
							<view class="pd10 br5 mr5" :class="videoIndex==2?'active-33CC33':'active-fff'"
								@click="checkVideo(2)">发展<br />
								规划
							</view>
							<view class="pd10 br5 mr5" :class="videoIndex==3?'active-33CC33':'active-fff'"
								@click="checkVideo(3)">竞争<br />
								优势
							</view>
							<view class="pd10 br5" :class="videoIndex==4?'active-33CC33':'active-fff'"
								@click="checkVideo(4)">资产<br />
								化解
							</view>
						</view>
					</view>
					<swiper circular autoplay style="position: relative;height: 500rpx;">
						<swiper-item v-for="(item1,index1) in companyArr" :key="index1">
							<MyVideo v-if="item1.video" :src="item1.video"
								style="width: 100%;height: 400rpx;margin-top: 50rpx;border-radius: 10rpx;"></MyVideo>
						</swiper-item>
					</swiper>

				</view>
				<view class=""
					style="width: 90%;margin: 30rpx 2.5%;padding: 2.5%; background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744381816526bg2.png') no-repeat;background-size: 100% 100%;">
					<view class="flex-start-center">
						<view class="ml10 mr10 br5 pd10" :class="isIndex1==1?'active-33CC33':'active-fff'"
							@click="check1(1)">
							热销推荐
						</view>
						<view class="ml10 mr10 br5 pd10" :class="isIndex1==2?'active-33CC33':'active-fff'"
							@click="check1(2)">
							运营制度
						</view>
					</view>
					<view class="ml10 fw700 fz38 lh80">
						<view class="">核心团队处置经营</view>
					</view>
					<swiper indicator-active-color="#D40000" circular autoplay
						style="background-color: #fff;width: 90%;padding: 0 5%;border-radius: 10rpx;height: 400rpx;">
						<swiper-item v-for="(item,index) in list1" :key="index">
							<view class="fz28 fw700 lh100" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
							color: #606060;">
								{{item.title}}
							</view>
							<view class="flex-between-center" style="">
								<swiper circular autoplay style="height: 150rpx;width: 250rpx;position: relative;">
									<swiper-item v-for="(item1,index1) in item.titleImage" :key="index1">
										<image :src="item1" mode="aspectFill"
											@click="previewImage(item.titleImage,index1)"
											style="width: 100%;height: 100%;border-radius: 15rpx;">
										</image>
										<view class="lh40 text-align-c fz22 color-fff" style="position: absolute;z-index: 99;top: 0;
									left: 0;background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744286028509jiaobiao.png') no-repeat ;
									background-size: 100% 100%;width: 120rpx;height: 40rpx;">
											{{item.opportunityLabel}}
										</view>
									</swiper-item>
								</swiper>
								<view class="">
									<view class="flex-end-center fz22">
										<view class="">
											资产利率：<text class="color-33CC33">{{item.interestRate}}%</text>
										</view>
										<view class="ml30">
											资产周期：<text class="color-33CC33">{{item.holdTime}}天</text>
										</view>
									</view>
									<view class="mt20 fz30 fw700 text-align-r">适合长期配置</view>
									<view class="mt10 fz22 text-align-r">{{item.monovalent}}起投 |
										{{item.earningsType==1?'按日':'到期'}}
									</view>
								</view>
							</view>
							<view class="py10" style="width: 100%;margin: 30rpx 0 0;background-color: #EDEDED;">
								<view class="flex-between-center">
									<view class="ml10 fz24" style="color: #A98D71;">热销中 </view>
									<view class="fz24" style="">资产进度：</view>
									<view class="" style="width: 200rpx;">
										<progress :percent="item.progress" stroke-width="10" border-radius="60"
											backgroundColor="#999999" activeColor="#E49E80" />
									</view>
									<view class="mr10 text-align-c fz22" style="color: #C40D0D;"
										@click="detail(item.id)">
										查看详情 &gt;
									</view>
								</view>
								<view class="text-align-c" style="font-size: 22rpx;color: #6D6D6D;">
									{{item.progress}}%
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="" style="width: 90%;margin: 30rpx 2.5%;padding: 30rpx; ">
					<view class="ml10 fw700 fz38 lh80">
						<view class="">策略优选 <text class="color-999 fz28 ml20 fw400">| 优中选优 百里挑一</text> </view>
					</view>
					<view class="flex-start-center">
						<view class="ml10 mr10 br5 pd10" :class="isIndex2==3?'active-33CC33':'active-fff'"
							@click="check2(3)">
							单选策略
						</view>
						<view class="ml10 mr10 br5 pd10" :class="isIndex2==4?'active-33CC33':'active-fff'"
							@click="check2(4)">
							复合策略
						</view>
					</view>

					<swiper indicator-active-color="#D40000" circular autoplay class="mt30"
						style="background-color: #fff;width: 90%;padding: 0 5%;border-radius: 10rpx;height: 400rpx;">
						<swiper-item v-for="(item,index) in list2" :key="index">
							<view class="fz28 fw700 lh100" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
							color: #606060;">
								{{item.title}}
							</view>
							<view class="flex-between-center" style="">
								<swiper circular autoplay style="height: 150rpx;width: 250rpx;position: relative;">
									<swiper-item v-for="(item1,index1) in item.titleImage" :key="index1">
										<image :src="item1" mode="aspectFill"
											@click="previewImage(item.titleImage,index1)"
											style="width: 100%;height: 100%;border-radius: 15rpx;">
										</image>
										<view class="lh40 text-align-c fz22 color-fff" style="position: absolute;z-index: 99;top: 0;
									left: 0;background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744286028509jiaobiao.png') no-repeat ;
									background-size: 100% 100%;width: 120rpx;height: 40rpx;">
											{{item.opportunityLabel}}
										</view>
									</swiper-item>
								</swiper>
								<view class="">
									<view class="flex-end-center fz22">
										<view class="">
											资产利率：<text class="color-33CC33">{{item.interestRate}}%</text>
										</view>
										<view class="ml30">
											资产周期：<text class="color-33CC33">{{item.holdTime}}天</text>
										</view>
									</view>
									<view class="mt20 fz30 fw700 text-align-r">适合长期配置</view>
									<view class="mt10 fz22 text-align-r">{{item.monovalent}}起投 |
										{{item.earningsType==1?'按日':'到期'}}
									</view>
								</view>
							</view>
							<view class="py10" style="width: 100%;margin: 30rpx 0 0;background-color: #EDEDED;">
								<view class="flex-between-center">
									<view class="ml10 fz24" style="color: #A98D71;">热销中 </view>
									<view class="fz24" style="">资产进度：</view>
									<view class="" style="width: 200rpx;">
										<progress :percent="item.progress" stroke-width="10" border-radius="60"
											backgroundColor="#999999" activeColor="#E49E80" />
									</view>
									<view class="mr10 text-align-c fz22" style="color: #C40D0D;"
										@click="detail(item.id)">
										查看详情 &gt;
									</view>
								</view>
								<view class="text-align-c" style="font-size: 22rpx;color: #6D6D6D;">
									{{item.progress}}%
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="" style="width: 90%;margin: 30rpx 2.5%;padding: 30rpx; ">
					<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744532915006dx.png" mode="widthFix"
						style="width: 150rpx;height: 100rpx;margin-left: 10rpx;"></image>
					<swiper indicator-active-color="#D40000" circular autoplay
						style="background-color: #fff;width: 90%;padding: 0 5%;border-radius: 10rpx;height: 400rpx;">
						<swiper-item v-for="(item,index) in list3" :key="index">
							<view class="fz28 fw700 lh100" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
							color: #606060;">
								{{item.title}}
							</view>
							<view class="flex-between-center" style="">
								<swiper circular autoplay style="height: 150rpx;width: 250rpx;position: relative;">
									<swiper-item v-for="(item1,index1) in item.titleImage" :key="index1">
										<image :src="item1" mode="aspectFill"
											@click="previewImage(item.titleImage,index1)"
											style="width: 100%;height: 100%;border-radius: 15rpx;">
										</image>
										<view class="lh40 text-align-c fz22 color-fff" style="position: absolute;z-index: 99;top: 0;
									left: 0;background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744286028509jiaobiao.png') no-repeat ;
									background-size: 100% 100%;width: 120rpx;height: 40rpx;">
											{{item.opportunityLabel}}
										</view>
									</swiper-item>
								</swiper>
								<view class="">
									<view class="flex-end-center fz20">
										<view class="">
											资产利率：<text class="color-33CC33">{{item.interestRate}}%</text>
										</view>
										<view class="ml30">
											资产周期：<text class="color-33CC33">{{item.holdTime}}天</text>
										</view>
									</view>
									<view class="mt20 fz30 fw700 text-align-r">适合长期配置</view>
									<view class="mt10 fz22 text-align-r">{{item.monovalent}}起投 |
										{{item.earningsType==1?'按日':'到期'}}
									</view>
								</view>
							</view>
							<view class="py10" style="width: 100%;margin: 30rpx 0 0;background-color: #EDEDED;">
								<view class="flex-between-center">
									<view class="ml10 fz24" style="color: #A98D71;">热销中 </view>
									<view class="fz24" style="">资产进度：</view>
									<view class="" style="width: 200rpx;">
										<progress :percent="item.progress" stroke-width="10" border-radius="60"
											backgroundColor="#999999" activeColor="#E49E80" />
									</view>
									<view class="mr10 text-align-c fz22" style="color: #C40D0D;"
										@click="detail(item.id)">
										查看详情 &gt;
									</view>
								</view>
								<view class="text-align-c" style="font-size: 22rpx;color: #6D6D6D;">
									{{item.progress}}%
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="fw700 ml30 fz40">独家陪伴，为您领航</view>
				<view class="flex-around-center mt30" style="">
					<view class="" @click="toNotice(1)"
						style="width: 48%; background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744875089096h-bg.png');background-size: 100% 100%;">
						<view class="flex-start-center my20">
							<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744875106439h.png"
								mode="widthFix" class="ml30" style="width: 50rpx;height: 50rpx;"></image>
							<view class="ml10 fz35 fw700"> <text style="color: #A47930;">观点</text>·览阅</view>
						</view>
						<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744875143059h-bo.png"
							mode="widthFix" style="width: 80%;margin: 5% 10%;height: 400rpx;"></image>
					</view>
					<view class="" @click="toNotice(2)"
						style="width: 48%; background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744875287061h1-bg.png');background-size: 100% 100%;">
						<view class="flex-start-center my20">
							<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744875263975h1.png"
								mode="widthFix" class="ml30" style="width: 50rpx;height: 50rpx;"></image>
							<view class="ml10 fz35 fw700"> <text style="color: #AF5F3D;">百科</text>·愈学</view>
						</view>
						<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744875312823h1-bo.png"
							mode="widthFix" style="width: 80%;margin: 5% 10%;height: 400rpx;"></image>
					</view>
				</view>
				<view class="fz26 color-7C7C mt100 w100">
					<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1748621103593sy-1.png" mode="widthFix"
						style="width: 80%;margin: 20rpx 10%;" @click="toPage('me/tyj/index')"></image>
					<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1748621167202sy-2.png" mode="widthFix"
						style="width:80%;margin: 20rpx 10%;"></image>

				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	import videoVue from './video.vue';
	import MyVideo from './video.vue'
	export default {
		components: {
			MyVideo
		},
		data() {
			return {
				videoIndex: 1,
				notice: '',
				isIndex1: 1,
				isIndex2: 3,
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 10,
				lbtList: [],
				list1: [],
				list2: [],
				list3: [],
				isActive: 1,
				s: 15,
				showNotice: false,
				indicatorDots: true,
				current: 0,
				autoplay: true,
				page: 1,
				size: 100,
				total: '',
				user: {},
				menuList: [{
					icon: "1744098781211ubigl",
					path: "home/zxxt/text",
					txt: "UBI攻略"
				}, {
					icon: "1744098763245cwbz",
					path: "home/zxxt/text",
					txt: "财务保障"
				}, {
					icon: "1744098797626gsgk",
					path: "home/zxxt/text",
					txt: "公司概况"
				}, {
					icon: "1744098810131yyjs",
					path: "home/policy",
					txt: "运营介绍"
				}, {
					icon: "1744098210096gd",
					path: "home/gd",
					txt: "更多"
				}, ],
				companyArr: []
			}
		},
		onLoad() {
			this.loadData();
			this.getUser()
			this.lbt()
		},
		onShow() {
			this.getList1()
			this.getList2()
			this.getList3()
			this.getNotice()
			this.companyAdvantagesInfo()
			console.log(this.windowHeight);
		},
		methods: {
			getNotice() {
				this.$request.get({
					url: "/app/latestAnnouncements/list",
					data: {
						pageNum: 1,
						pageSize: 10,
					},
					success: rsp => {
						if (rsp.records[0]) {
							this.notice = rsp.records[0].title
						} else {
							this.notice = ''
						}
					}
				})
			},
			detail(id) {
				uni.navigateTo({
					url: '/pages/fund/detail?id=' + id
				})
			},
			check1(i) {
				if (i == 2) {
					uni.navigateTo({
						url: '/pages/home/zxxt/text?index=6'
					})
					return
				}
				this.isIndex1 = i
				this.getList1()
			},
			check2(i) {
				this.isIndex2 = i
				this.getList2()
			},
			checkVideo(i) {
				this.videoIndex = i
				this.companyArr = []
				this.companyAdvantagesInfo()
			},
			previewImage(item, index) {
				uni.previewImage({
					urls: item,
					current: index
				});
			},
			getList1() {
				this.$request.get({
					url: "/app/opportunityInfo/recommendListOne",
					data: {
						selectedType: this.isIndex1
					},
					success: rsp => {
						this.list1 = rsp.data
						for (var i = 0; i < this.list1.length; i++) {
							if (this.list1[i].titleImage.includes(',') == true) {
								this.list1[i].titleImage = this.list1[i].titleImage.split(',')
							} else {
								this.list1[i].titleImage = [this.list1[i].titleImage]
							}
						}
					}
				})
			},
			getList2() {
				this.$request.get({
					url: "/app/opportunityInfo/recommendListTwo",
					data: {
						selectedType: this.isIndex2
					},
					success: rsp => {
						this.list2 = rsp.data
						for (var i = 0; i < this.list2.length; i++) {
							if (this.list2[i].titleImage.includes(',') == true) {
								this.list2[i].titleImage = this.list2[i].titleImage.split(',')
							} else {
								this.list2[i].titleImage = [this.list2[i].titleImage]
							}
						}
					}
				})
			},
			getList3() {
				this.$request.get({
					url: "/app/opportunityInfo/recommendListThree",
					success: rsp => {
						this.list3 = rsp.data
						for (var i = 0; i < this.list3.length; i++) {
							if (this.list3[i].titleImage.includes(',') == true) {
								this.list[i].titleImage = this.list3[i].titleImage.split(',')
							} else {
								this.list3[i].titleImage = [this.list3[i].titleImage]
							}
						}
					}
				})
			},
			more(id) {
				uni.navigateTo({
					url: '/pages/home/notice1?id=' + id
				})
			},
			qd() {
				uni.navigateTo({
					url: '/pages/me/qiandao'
				})
			},
			companyAdvantagesInfo() {
				this.$request.get({
					url: "/app/understandPlatform/List",
					data: {
						Type: this.videoIndex
					},
					success: rsp => {
						this.companyArr = rsp.data
					}
				})
			},

			kefu() {
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
			lbt() {
				this.$request.get({
					url: "/app/carouselPicture/list",
					success: rsp => {
						this.lbtList = rsp.data
					}
				})
			},
			close() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				// this.$refs.popup.close()
				getApp().globalData.showPopIndex = 1
			},
			loadData() {
				if (uni.getStorageSync('token') == "-1" || uni.getStorageSync('token') == null || uni
					.getStorageSync(
						'token') == "") {
					uni.setStorageSync('token', -1);
					uni.redirectTo({
						url: '../login/login'
					})
				}
			},
			getUser() {
				this.$request.get({
					url: "/app/dreamUserInfo/getUser",
					success: rsp => {
						this.user = rsp.data
					}
				})
			},
			toNotice(type) {
				uni.navigateTo({
					url: '/pages/home/notice1?type=' + type
				})
			},
			toPage(url, index) {
				if (index == 0 || index == 1 || index == 2 || index == 3) {
					uni.navigateTo({
						url: '/pages/home/zxxt/text?index=' + index
					})
					return
				}
				if (url == 'me/verified') {
					if (this.user.isDelete == 1) {
						uni.showToast({
							title: '已经实名过啦!!!',
							icon: 'none'
						})
						return
					} else {
						uni.navigateTo({
							url: "/pages/" + url
						})
					}
					return
				}
				if (url == "service") {
					url = "../public/webBrowser?tit=在线客服&url=" + this.data["kefu"];
				} else {
					url = "/pages/" + url
					//url = "../public/webBrowser?tit="+tit+"&url="+url;
				}
				uni.navigateTo({
					url
				})
			}
		},
	}
</script>
<style>
	page {
		background-color: #f1f1f1;
	}
</style>
<style lang="scss" scoped>
	.k {
		background: #FDF2F3;
		background-size: 100% 100%;
		width: 90%;
		border-radius: 20rpx;
		// height: 500rpx;
		color: #3A3A3A;
		padding-bottom: 60rpx;
		margin: 5%;
	}

	.top {
		width: 100%;
		height: 400rpx;
		background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/174409903861872@3x.png') no-repeat;
		background-size: 100% 100%;
	}

	.tit {
		color: #3A3A3A;
		font-size: 30rpx;
		line-height: 70rpx;
	}

	.mon {
		color: #9B1B1A;
		font-size: 30rpx;
		height: 60rpx;
	}

	.center {
		text-align: center;
	}



	.laba {
		width: 95%;
		margin: 0 0 30rpx;
		height: 80rpx;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		padding: 0 2.5%;
		border-radius: 10rpx;
	}

	.section {
		border-radius: 38rpx;

		image {
			width: 100%;
			height: calc(720 / 1280 * (100vw - 60rpx));
			border-radius: 38rpx;
		}
	}

	.active {
		color: #B04B4A;
	}

	.section1 {
		height: 336rpx;
		padding: 44rpx 50rpx;
		background: rgba(0, 0, 0, 0.83);
		box-shadow: 20rpx 10rpx 34rpx 0rpx #000000;
		border-radius: 38rpx;
		display: flex;
		justify-content: space-between;

		.animated_bg {
			width: 336rpx;
			height: 336rpx;

			&.animated1_bg {
				// background: url('../../static/eco/animated1_bg.png') no-repeat;
				// background-size: 336rpx 336rpx;
				text-align: center;
				padding-top: 120rpx;
			}

			.animated_txt {
				width: 220rpx;
				margin: 0px auto;
			}

			text {
				font-weight: 500;
				font-size: 28rpx;
				line-height: 33rpx;
				text-align: center;
			}

			image {
				width: 44rpx;
				height: 44rpx;
				text-align: center;
			}
		}

		.right {
			.vcenter {
				flex-direction: column;
				text-align: center;
			}

			.animated_item_img {
				background: rgba(0, 0, 0, 0.83);
				box-shadow: 20rpx 10rpx 34rpx 0rpx #000000;
				border-radius: 38rpx 38rpx 38rpx 38rpx;
				width: 86rpx;
				height: 86rpx;

				image {
					width: 86rpx;
					height: 86rpx;
				}
			}

			.animated_item_text {
				margin-top: 10rpx;
				font-weight: 400;
				font-size: 20rpx;
				color: #2FF8EA;
				line-height: 28rpx;
				text-align: center;
				font-style: normal;
				text-transform: none;
			}
		}
	}

	.block_1 {
		margin-top: 60rpx;
		height: 164rpx;
		background: #171622;
		box-shadow: 20rpx 10rpx 34rpx 0rpx #000000, inset 4rpx 0rpx 10rpx -4rpx rgba(178, 173, 246, 0.33);
		border-radius: 92rpx 0rpx 0rpx 92rpx;
		margin-right: -34rpx;
	}

	.block_2 {
		margin-top: 60rpx;
		height: 164rpx;
		background: #171622;
		box-shadow: inset 4rpx 0rpx 10rpx -4rpx rgba(178, 173, 246, 0.33), -20rpx 10rpx 34rpx 0rpx #000000;
		border-radius: 0rpx 92rpx 92rpx 0rpx;
		margin-left: -34rpx;
	}

	.menu_item {
		width: 20%;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: space-around;

		image {
			width: 68rpx;
			height: 68rpx;
		}

		view {
			font-weight: 400;
			font-size: 24rpx;
			color: #272727;
			text-align: center;
			height: 120rpx;
			line-height: 80rpx;
		}
	}

	.tit1 {
		font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
		font-weight: 500;
		font-size: 36rpx;
		color: #FFFFFF;
		line-height: 42rpx;
		font-style: normal;
		text-transform: none;
	}

	.tit2 {
		font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
		font-weight: 100;
		font-size: 20rpx;
		color: #FFFFFF;
		line-height: 30rpx;
		font-style: normal;
		text-transform: none;
	}

	.section4 {
		padding: 60rpx 35rpx;
		background: #171622;
		box-shadow: inset 4rpx 0rpx 10rpx -4rpx rgba(178, 173, 246, 0.33);
		border-radius: 40rpx 40rpx 40rpx 40rpx;

		.tit1 {
			font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
			font-weight: 400;
			font-size: 32rpx;
			color: #FFFFFF;
			line-height: 38rpx;
			text-align: center;
			font-style: normal;
		}

		.tit2 {
			font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
			font-weight: 100;
			font-size: 20rpx;
			color: #959595;
			line-height: 30rpx;
		}

		.img {
			image {
				width: 118rpx;
				height: 118rpx;
			}
		}

		.txt {
			font-family: PingFang SC, PingFang SC;
			font-weight: 500;
			font-size: 24rpx;
			color: #FFFFFF;
			line-height: 28rpx;
		}
	}

	.section5 {
		// clip-path: inset(0 round 40rpx);
		border-radius: 40rpx;
		border: 2rpx solid #0498D8;
		//border-image: linear-gradient(225deg, rgba(81, 250, 252, 1), rgba(83, 159, 235, 1), rgba(108, 38, 178, 1)) 2 2;

		padding: 50rpx 30rpx;

		.imglist2 {
			.img_item2 {
				display: flex;
				flex-direction: column;
				text-align: center;
			}

			image {
				width: 290rpx;
				height: 62rpx;
			}

			text {
				margin-top: 8rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				font-size: 24rpx;
				color: #FFFFFF;
				line-height: 36rpx;
			}
		}

		.imglist {
			image {
				width: 80rpx;
				height: 80rpx;
			}

			text {
				margin-top: 10rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				font-size: 24rpx;
				color: #FFFFFF;
				line-height: 36rpx;
				text-align: center;
			}
		}
	}

	.noticebox {
		border: 1rpx solid #0498D8;
		border-radius: 24rpx;
		padding: 0rpx 24rpx;
		height: 86rpx;
		line-height: 86rpx;
	}

	::v-deep .uni-noticebar__content-wrapper--scrollable {
		margin-top: 19rpx;
		height: 86rpx !important;
		line-height: 86rpx !important;
	}

	::v-deep .uni-noticebar__content-text--scrollable {
		height: 86rpx !important;
		line-height: 86rpx !important;
	}

	.popup {
		position: fixed;
		width: 96%;
		height: 70vh;
		left: 2%;
		top: 8vh;
		z-index: 111;
		text-align: center;

		image {
			height: 100%;
			width: 96%;
		}
	}

	.closebtn {
		margin-top: 10px;
		width: 100%;
		text-align: center;

		image {
			width: 28px;
			height: 28px;
		}
	}

	.news {
		margin-top: 23rpx;

		&_title {
			display: flex;
			align-items: center;

			view {
				font-size: 38rpx;
				font-weight: 700;
				margin-left: 20rpx;
			}
		}

		&_info {
			height: 150rpx;
			line-height: 50rpx;
			font-size: 32rpx;
			color: #0B0B0B;
		}

		&_item {
			display: flex;
			align-items: center;
		}
	}

	.active-33CC33 {
		background-color: #33CC33;
		color: #fff;
	}

	.active-fff {
		background-color: #fff;
	}
</style>