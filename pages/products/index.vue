<template>
	<view class="content">
		<!-- <narBar :title="getLg('银诚惠选')" background="transparent" :back="false" :rightTxt="'icon'" showRightBtn
			img="/static/tabbar/explain.png" @click="right"></narBar> -->

		<!-- <view style="height: var(--status-bar-height);width: 100%;background-color: transparent;"></view> -->
		<!-- <narBar :title="getLg('积分有礼')" background="transparent" :back="false"></narBar> -->
		<!-- <view class="color-fff ">
				积分有礼
			</view> -->
		<view style="width: 100%;">
			<view class="top">
				<narBar :title="getLg('积分有礼')" background="transparent" :back="false"></narBar>
				<view style="width: 90%;margin:0 2.5%;padding: 2.5%;">
					<view class="flex-around-center br10"
						style="background: #fff;padding:30rpx 20rpx;margin-top: 150rpx;">
						<view class="" @click="toPage('me/jfmx',0)">
							<view class="lh80">我的积分 <text class="color-999 ml5"> &gt;</text></view>
							<view class="fw700 fz40">{{user.integral | toInt}}</view>
						</view>
						<view class="flex-center-center">
							<image
								src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/17446474094145bfb0ad931c8a11c6989882b3785938162f7ba5514029-a297Go@3x.png"
								mode="widthFix" style="width: 50rpx;height: 50rpx;"></image>
							<view class="ml10">
								<view class="fw700 lh80 fz34">我的兑换</view>
								<view class="fz26" @click="toPage('home/dhjl',1)">点击查看 &gt;</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744648014772lpdh.png" mode="widthFix"
				style="width: 150rpx;height: 100rpx;" class="mt100 mx30"></image>
			<scroll-view scroll-y="true" :style="{height:windowHeight+'px'}" style="width: 100%;">
				<view class="flex-between-center-wrap" style="width: 95%;margin: 0 2.5%;">
					<view style="width: 47%;background-color: #fff;" @click="detail(item.id,item.num)" class="shop-box"
						v-for="(item,index) in shopList" :key="index">
						<image :src="item.commodityImage" mode="aspectFill" class="br20"
							style="width: 90%;height: 300rpx;margin: 10rpx 5% 0;">
						</image>
						<view class="color-fff pd30"
							style="background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744648604135p.png') no-repeat;background-size: 100% 100%;margin-top: -20rpx;">
							<view class="fz30 lh40">{{item.commodityName}}</view>
							<view class="flex-start-center">
								<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744648493315jf.png"
									mode="widthFix" style="width: 30rpx;height: 30rpx;">
								</image>
								<view class="ml5">
									{{item.commodityIntegral}}
									<text class="ml10" style="color: #8CFD8C;">积分</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex-around-center">
					<zhini-pagination :totalPage="totalPage" :currentPage.sync="page" @pageNum="getNum"></zhini-pagination>
				</view>
				<view class="fz26 color-7C7C mt60 pb20">
					<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1748621167202sy-2.png" mode="widthFix"
						style="width:80%;margin: 20rpx 10%;"></image>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import narBar from 'pages/public/narBar.vue'
	import ZhiniPagination from '@/components/zhini-pagination/zhini-pagination.vue';
	export default {
		filters: {
		    toInt(value) {
		      return Math.floor(value); // 或 parseInt(value) / Math.round(value)
		    }
		  },
		components: {
			narBar,
			ZhiniPagination
		},
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight') - 30,
				windowHeight: uni.getSystemInfoSync().windowHeight - 300,
				noClick: true,
				page: 1,
				size: 6,
				totalPage: 0,
				user: {},
				shopList: [],
			}
		},
		onReachBottom() {

		},
		onShow() {
			this.getUser()
			this.getList()
		},
		created() {},
		methods: {
			toPage(path, index) {
				if (index == 0) {
					uni.navigateTo({
						url: '/pages/me/jfmx?index=0'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/' + path
				})
			},
			answer() {
				uni.navigateTo({
					url: '/pages/products/startanswer'
				})
			},
			duihuan() {
				this.$request.get({
					url: "/app/exchangeInfo/list",
					data: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						keywords: 0
					},
					success: rsp => {
						this.jfList = rsp.records
						this.jftotalPage = rsp.pages
						console.log(rsp);
					}
				})
			},
			getNum(e) {
				console.log("选中的页面是-->", e)
				this.page = e;
				this.shopList=[]
				this.getList()
			},
			detail(id, num) {
				uni.navigateTo({
					url: '/pages/point/detail?id=' + id + '&num=' + num
				})
			},
			active(index) {
				this.page = 1
				this.shopList = []
				this.getList()
			},
			getList() {
				this.$request.get({
					url: "/app/integralMallInfo/integralMallList",
					data: {
						pageNum: this.page,
						pageSize: this.size,
					},
					success: rsp => {
						this.shopList = rsp.records
						this.totalPage = rsp.pages
						// if (this.page != 1) {
						// 	this.shopList = this.shopList.concat(rsp.records)
						// } else {
						// 	this.shopList = rsp.records
						// }
						// this.total = rsp.total
						// if (this.page * this.size >= this.total && this.total > this.size) {
						// 	uni.showToast({
						// 		title: '已加载全部',
						// 		icon: 'none'
						// 	})
						// }
						for (var i = 0; i < this.shopList.length; i++) {
							this.shopList[i].num = 0
						}
						// for (var i = 0; i < this.list.length; i++) {
						// 	if (this.list[i].progress != 0) {
						// 		this.list[i].jindu = this.list[i].progress
						// 	} else {
						// 		if (this.list[i].alreadySold == null || this.list[i].circulation == null) {
						// 			this.list[i].jindu = 0
						// 		} else {
						// 			this.list[i].jindu = (this.list[i].alreadySold / this.list[i]
						// 				.circulation) * 100
						// 			this.list[i].jindu = this.list[i].jindu.toFixed(2)
						// 		}
						// 	}
						// 	console.log(this.list[i].jindu);
						// }
					}
				})
			},
			getUser() {
				this.$request.get({
					url: "/app/dreamUserInfo/getUser",
					success: rsp => {
						this.user = rsp.data
						console.log(rsp);
					}
				})
			},
		}
	}
</script>
<style>
	page {
		background: #f1f1f1;
	}
</style>
<style scoped lang="scss">
	.header {
		width: 100rpx;
		height: 50rpx;
		margin-left: 40rpx;
		padding-top: var(--status-bar-height);
	}

	.content {}

	.content-text {
		width: 90%;
		margin-left: 5%;
		height: 445rpx;
		border-radius: 30rpx;
		margin-bottom: 20rpx;
	}

	.top {
		width: 100%;
		height: 400rpx;
		background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/174409903861872@3x.png') no-repeat;
		background-size: 100% 100%;
		margin-top: -10rpx;
	}

	.active {
		border-bottom: 5rpx solid #B04B4A;
		color: #DC2020 !important;
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

	.bold {
		font-weight: bold;
	}

	.shop-box {
		margin: 5rpx;
		border-radius: 10rpx;
	}

	.num1 {
		color: #FD7E06;
		font-size: 45rpx;
	}

	.num2 {
		color: #DB312C;
		font-size: 45rpx;
	}

	.flex-around {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.buy {
		background-color: #DD322A;
		width: 80%;
		margin: 0 10%;
		height: 80rpx;
		line-height: 80rpx;
		color: #fff;
		text-align: center;
		border-radius: 60rpx;
		margin-top: 30rpx;
	}
</style>