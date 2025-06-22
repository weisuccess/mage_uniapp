<template>
	<view class="content">
		<narBar :title="getLg(title)" @back="toBack()"></narBar>
		<view class="" style="margin-top: 150rpx;">
			<view class="box" :style="{'height':windowHeight+'px'}" v-if="type==2">
				<view class="ml30 text-align-c pb20 flex-around-center">
					<view class="mx20 " :class="isActive==1?'active':'sel'" @click="check(1)">U交易操作视频</view>
					<view class="mx20 " :class="isActive==2?'active':'sel'" @click="check(2)">行业动态</view>
				</view>
				<scroll-view scroll-y="true" :style="{'height':windowHeight1+'px'}" @scrolltolower="reachBottom"
					bindscrolltolower="onReachBottom" v-if="isActive==1">
					<!-- <view class="flex-around-center-wrap ">
						<view class="mb30" @click="del(1,item.id)" v-for="(item,index) in list" :key="index"
							style="width: 47%;">
							<view class="">
									<MyVideo v-if="item.video" :src="item.video"
										style="width: 100%;height: 350rpx;border-radius: 16rpx 16rpx 0 0;"></MyVideo>
							</view>
							<view class="color-fff br16" style="background-color: #33CC33;margin-top: -30rpx;">
								<view class="pt30 ellipsis px20 lh60">{{item.title}}</view>
								<view class="px20 lh60">{{item.createTime|dateFormat}}</view>
							</view>
						</view>
						<view class="" style="width: 47%;" v-if="list.length%2!=0"></view>
					</view> -->
					<view class=" ">
						<view class="mb30" @click="del(1,item.id)" v-for="(item,index) in list" :key="index"
							style="width: 90%;margin: 0 5% 30rpx;">
							<view class="">
								<!-- <image :src="item.titleImg" mode="aspectFill" class=""
									style="width: 100%;height: 350rpx;border-radius: 16rpx 16rpx 0 0;"></image> -->
									<MyVideo v-if="item.video" :src="item.video"
										style="width: 100%;height: 350rpx;border-radius: 16rpx 16rpx 0 0;"></MyVideo>
							</view>
							<view class="color-fff br16" style="background-color: #33CC33;margin-top: -30rpx;">
								<view class="pt30 ellipsis px20 lh60 fw700 fz34" style="height: 60rpx;">{{item.title}}</view>
								<view class="textMax px20 fz24" style="width: calc(100% - 40rpx);">{{item.content}}</view>
								
								<!-- <u-parse :content="item.content" class="textMax px20 fz26"></u-parse> -->
								<view class="px20 lh60 fz24">{{item.createTime|dateFormat}}</view>
							</view>
						</view>
						<!-- <view class="" style="width: 47%;" v-if="list.length%2!=0"></view> -->
					</view>

				</scroll-view>
				<scroll-view scroll-y="true" :style="{'height':windowHeight1+'px'}" @scrolltolower="reachBottom"
					bindscrolltolower="onReachBottom" v-if="isActive==2">
					<view class="flex-between-center px20" style="border-bottom: 1px solid #ccc;" v-for="(item,index) in list"
						:key="index">
						<view class="fz24" style="padding: 20rpx;;width: calc(100% - 320rpx);">
							<view class="fw700 textMax" style="color: #0B0B0B;font-size: 32rpx;width:50vw;">
								{{item.title}}
							</view>
							<view class="mt10 color-666">
								<view class="textMax fz22 ">
									{{extractChinese(item.content).slice(0,200)}}
								</view>
								<!-- <u-parse :content="item.content" class="textMax px20 fz22"></u-parse> -->
							</view>
							<view class="flex-between-center fz22">
								<view class="py20 mt5 color-666">{{item.createTime|dateFormat}}</view>
								<view class="color-33CC33 br60" @click="del(2,item.id)"
									style="border: 1px solid #33CC33;padding: 5rpx 10rpx;">
									查看详情>
								</view>
							</view>
						</view>
						<image :src="item.titleImg" mode="aspectFill" class="10" style="width: 250rpx;height: 200rpx;">
						</image>
					</view>
				</scroll-view>
			</view>
			<view class="box" :style="{'height':windowHeight+'px'}" v-if="type==1">
				<scroll-view scroll-y="true" :style="{'height':windowHeight1+'px'}" @scrolltolower="reachBottom"
					bindscrolltolower="onReachBottom" v-if="isActive==1">
					<view class="flex-start-center px20" style="border-bottom: 1px solid #ccc;"
						v-for="(item,index) in list" :key="index">
						<image :src="item.titleImg" mode="aspectFill" class="10" style="width: 250rpx;height: 200rpx;">
						</image>
						<view class="fz28" style="padding: 20rpx;width: calc(100% - 300rpx);">
							<view class="fw700 textMax pt5" style="color: #0B0B0B;height: 80rpx;">
								{{item.title}}
							</view>
							<view class="mt10 color-666">
								<view class="textMax fz22 ">
									{{extractChinese(item.content).slice(0,200)}}
								</view>
								<!-- <u-parse :content="item.content" class="textMax px20 fz22"></u-parse> -->
							</view>
							<view class="flex-between-center fz22">
								<view class="py20 mt5 color-666">{{item.createTime|dateFormat}}</view>
								<view class="color-33CC33 br60" @click="del(3,item.id)"
									style="border: 1px solid #33CC33;padding: 5rpx 10rpx;">
									查看详情>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import narBar from 'pages/public/narBar.vue'
	import MyVideo from './video.vue'
	export default {
		components: {
			narBar,
			MyVideo
		},
		data() {
			return {
				windowHeight: uni.getSystemInfoSync().windowHeight - 200,
				windowHeight1: uni.getSystemInfoSync().windowHeight - 270,
				list: {},
				id: 0,
				total: 0,
				page: 1,
				size: 10,
				isActive: 1
			}
		},
		onLoad(opt) {
			this.type = opt.type
			if (this.type == 1) {
				this.title = '观点·览阅'
			}
			if (this.type == 2) {
				this.title = '百科·愈学'
			}
			this.getList()
		},
		methods: {
			extractChinese(str) {
				// 匹配中文字符的正则表达式
				const chineseRegex = /[\u4e00-\u9fa5]/g;
				const result = str.match(chineseRegex);
				return result ? result.join('') : '';
			},
			del(type, id) {
				uni.navigateTo({
					url: '/pages/home/notice_detail?type=' + type + '&id=' + id
				})
			},
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
			toBack() {
				uni.navigateBack()
			},
			check(e) {
				this.page = 1
				this.list=[]
				this.isActive = e
				this.getList()
			},
			getList() {
				let url = ''
				if (this.type == 1) {
					url = '/app/perspectivesInfo/list'
				}
				if (this.type == 2) {
					if (this.isActive == 1) {
						url = '/app/ubiOperateVideoInfo/list'
					}
					if (this.isActive == 2) {
						url = '/app/industryDynamicsInfo/list'
					}
				}

				this.$request.get({
					url: url,
					data: {
						pageNum: this.page,
						pageSize: this.size,
					},
					success: rsp => {
						if (this.page != 1) {
							this.list = this.list.concat(rsp.records)
						} else {
							this.list = rsp.records
						}
						console.log(this.list);
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
		}
	}
</script>
<style>
	page {
		background-color: #F3F3F3;
	}
</style>
<style scoped lang="scss">
	.content {
		background: url('/static/page-bg.png') no-repeat;
		background-size: 100% 70%;
		height: 100vh;
		color: #ffffff;
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
		padding-top: 50rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		color: #000;
	}

	.active {
		color: #33CC33;
		padding: 20rpx 70rpx;
		border-radius: 60rpx;
	}

	.sel {
		padding: 20rpx 70rpx;
		border-radius: 60rpx;
	}
</style>