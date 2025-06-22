<template>
	<view class="">
		<view style="height: var(--status-bar-height);width: 100%;position: fixed;top: 0;left: 0;
		z-index: 999;background:transparent"></view>

		<view style="width: 100%;">
			<view class="top">
				<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744215334577q.png" mode="widthFix"
					style="width: 90%;margin:200rpx 5% 0;"></image>
			</view>
			<view class="my20 mt100 flex-start-center">
				<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744215448189zc.png" mode="widthFix"
					style="width: 100rpx;height: 80rpx;margin: 0 20rpx;" @click="active1()"></image>
				<scroll-view scroll-x="true" show-scrollbar="false"
					style="white-space: nowrap;display: flex;width: calc(100% - 160rpx);">
					<view style="display: inline-block" class="mx5 py20" @click="active(index)"
						v-for="(item,index) in titlist" :key="index">
						<view style="font-size: 30rpx;" :class="isActive==index?'active':'noactive'">
							{{item.title}}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<scroll-view scroll-y="true" :style="{height:windowHeight +'px'}" style="width: 100%;"
			@scrolltolower="reachBottom">
			<view class="k" style="" v-for="(item,index) in list" :key="index">
				<view class="fz28 fw700 lh100" style="width: 90%;margin: 0 5%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
						color: #606060;">
					{{item.title}}
				</view>
				<view class="flex-between-center" style="margin: 0 5%;">
					<swiper circular autoplay style="height: 150rpx;width: 250rpx;position: relative;">
						<swiper-item v-for="(item1,index1) in item.titleImage" :key="index1">
							<image :src="item1" mode="aspectFill" @click="previewImage(item.titleImage,index1)"
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
				<view class="py10" style="width: 90%;margin: 30rpx 5% 0;background-color: #EDEDED;">
					<view class="flex-between-center">
						<view class="ml10 fz24" style="color: #A98D71;">热销中 </view>
						<view class="fz24" style="">资产进度：</view>
						<view class="" style="width: 200rpx;">
							<progress :percent="item.progress" stroke-width="10" border-radius="60"
								backgroundColor="#999999" activeColor="#E49E80" />
						</view>
						<view class="mr10 text-align-c fz22" style="color: #C40D0D;" @click="detail(item.id)">
							查看详情 &gt;
						</view>
					</view>
					<view class="text-align-c" style="font-size: 22rpx;color: #6D6D6D;">
						{{item.progress}}%
					</view>
				</view>
			</view>
			<!-- <zhini-pagination :totalPage="totalPage" :currentPage.sync="page"
					@pageNum="jfgetNum"></zhini-pagination> -->
			<view class="fz26 color-7C7C mt60 pb20">
				<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1748621167202sy-2.png" mode="widthFix"
					style="width:80%;margin: 20rpx 10%;"></image>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import narBar from 'pages/public/narBar.vue'
	import ZhiniPagination from '@/components/zhini-pagination/zhini-pagination.vue';
	export default {
		components: {
			narBar,
			ZhiniPagination
		},
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 350,
				totalPage: 0,
				isActive: null,
				opportunityType: null,
				noClick: true,
				page: 1,
				size: 10,
				total: '',
				list: [],
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				status: 'more',
				titlist: [{
					title: '新手资产'
				}, {
					title: '优质资产'
				}, {
					title: '稳健资产'
				}, {
					title: 'SPV资产'
				}, {
					title: '福利资产'
				}, {
					title: '体验资产'
				}, {
					title: '预售资产'
				}]
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
			this.getList()
		},
		created() {},
		methods: {
			reachBottom() {
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
			jfgetNum(e) {
				console.log("选中的页面是-->", e)
				this.page = e;
				this.getList()
			},
			previewImage(item, index) {
				uni.previewImage({
					urls: item,
					current: index
				});
			},
			detail(id) {
				uni.navigateTo({
					url: '/pages/fund/detail?id=' + id
				})
			},
			active1() {
				this.opportunityType = null
				this.isActive = null
				this.page = 1
				this.getList()
			},
			active(index) {
				this.isActive = index
				this.opportunityType = index + 1
				this.page = 1
				this.getList()
			},
			getList() {
				this.$request.get({
					url: "/app/opportunityInfo/list",
					data: {
						pageNum: this.page,
						pageSize: this.size,
						opportunityType: this.opportunityType
					},
					success: rsp => {
						if (this.page != 1) {
							this.list = this.list.concat(rsp.records)
						} else {
							this.list = rsp.records
						}
						//将获取的总条数赋值
						this.total = rsp.total
						this.totalPage = rsp.pages
						if (this.page * this.size >= this.total && this.total > this.size) {
							uni.showToast({
								title: '已加载全部',
								icon: 'none'
							})
						}
						for (var i = 0; i < this.list.length; i++) {
							if (this.list[i].titleImage.includes(',') == true) {
								this.list[i].titleImage = this.list[i].titleImage.split(',')
							} else {
								this.list[i].titleImage = [this.list[i].titleImage]
							}
						}
					}
				})
			},
		}
	}
</script>
<style>
	page {
		background-color: #f1f1f1;
	}
</style>
<style scoped lang="scss">
	.content {
		color: #ffffff;
	}

	.top {
		width: 100%;
		height: 400rpx;
		background: url('https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744215207340bg.png') no-repeat;
		background-size: 100% 100%;
	}

	.content-text {
		width: 90%;
		margin-left: 5%;
		height: 445rpx;
		border-radius: 30rpx;
		margin-bottom: 20rpx;
	}

	.active {
		background-color: #33CC33;
		border-radius: 10rpx;
		color: #fff;
		padding: 5rpx 10rpx;
	}

	.noactive {
		background-color: #D5D5D5;
		border-radius: 10rpx;
		color: #000;
		padding: 5rpx 10rpx;
	}

	.k {
		background: #fff;
		background-size: 100% 100%;
		width: 90%;
		border-radius: 20rpx;
		// height: 500rpx;
		color: #3A3A3A;
		padding-bottom: 30rpx;
		margin: 5%;
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

	.noList {
		position: fixed;
		bottom: 50rpx;
		width: 100%;
	}
</style>