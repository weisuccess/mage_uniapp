<template>
	<view class="content">
		<!-- <narBar :title="getLg('关于我们')" @back="toBack()" background="transparent"></narBar> -->
		<narBar :title="getLg('关于UBI')" @back="toBack()"></narBar>
		<!-- <scroll-view scroll-y="true" :style="{height:windowHeight+'px'}" style="width: 100%;border: 1px solid green;"> -->
		<view class="">
			<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744477050582UBI.png" mode="widthFix"
				style="width: 20%;margin: 150rpx 40% 30rpx;"></image>
			<view class="box lh90">
				<view class="text-align-c">当前版本：{{version_number}}</view>
				<view class="color-fff br16 flex-between-center" @click="pop"
					style="background: #33CC33;width: 90%;margin: 30rpx 2.5%;padding:10rpx 2.5%;">
					<view class="">检查版本 </view>
					<uni-icons type="right" color="#fff" size="25"></uni-icons>
				</view>
				<view class="br16 flex-between-center" @click="detail('隐私政策',1)"
					style="background: #fff;width: 90%;margin: 30rpx 2.5%;padding:10rpx 2.5%;">
					<view class="">隐私政策 </view>
					<uni-icons type="right" color="#999" size="25"></uni-icons>
				</view>
				<view class="color-fff br16 flex-between-center" @click="detail('服务协议',2)"
					style="background: #33CC33;width: 90%;margin: 30rpx 2.5%;padding:10rpx 2.5%;">
					<view class="">服务协议 </view>
					<uni-icons type="right" color="#fff" size="25"></uni-icons>
				</view>
				<view class="br16 flex-between-center" @click="detail('当前版本说明',3)"
					style="background: #fff;width: 90%;margin: 30rpx 2.5%;padding:10rpx 2.5%;">
					<view class="">当前版本说明 </view>
					<uni-icons type="right" color="#999" size="25"></uni-icons>
				</view>
				<!-- <view class="flex-between-center px30" style="width: 80%;margin: 0 5%;"
				:style="{ 'borderBottom': index === list.length - 1 ? 'none' : '1px dashed #2C1A1A' }"
					v-for="(item,index) in list" :key="index" @click="detail(item,index)">
					<view class="">{{item.title}}</view>
					<uni-icons type="right" color="#3D2222" size="25"></uni-icons>
					</image>
				</view> -->
			</view>
		</view>
		<!-- </scroll-view> -->
		<uni-popup ref="popup" type="center" borderRadius="10px">
			<view class="popup br16">
				<image
					src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744479233875fb99ad850d8397c5b9f15a0ef379b7a6a549df06d88b-SI2tOY_fw1200@3x.png"
					mode="widthFix" style="width: 30%;margin: -100rpx 35% 0;"></image>
				<view class="color-000 text-align-c fz40 fw700 lh120 mt30">目前已是最新版本</view>
				<view class="wzdl text-align-c lh80 br60 " @click="close">
					我知道了~
				</view>
				<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744479312310x.png" mode="widthFix"
					style="width: 10%;margin: 100rpx 45% 0;position: absolute;"  @click="close"></image>
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 200,
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
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
				version_number: ''
			}
		},
		// onReachBottom() {
		// 	//判断 如果页码*页容量大于等于总条数，提示该页数据加载完毕
		// 	if (this.page * this.size >= this.total) {
		// 		// uni.showToast({
		// 		// 	title: '已加载全部',
		// 		// 	icon: 'none'
		// 		// })
		// 		return
		// 	}
		// 	//并且让页码+1,调用获取数据的方法获取第二页数据
		// 	this.page++
		// 	//此处调用自己获取数据列表的方法
		// 	this.getList()
		// },
		onLoad() {
			// this.getList()
			const systemInfo = uni.getSystemInfoSync();
			this.version_number = systemInfo.appVersion;
			console.log(systemInfo);

		},
		methods: {
			toBack() {
				uni.navigateBack()
			},
			close() {
						this.$refs.popup.close()
					},
			pop() {
				this.$refs.popup.open('center')
			},
			detail(item, i) {
				// let index = i + 3
				uni.navigateTo({
					url: '/pages/home/zxxt/text?name=' + item
				})
			},
			getList() {
				this.$request.get({
					url: "/app/aboutUs/list",
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
		background: #f1f1f1;
	}
</style>
<style scoped lang="scss">
	.content {
		// background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		// background-size: 100% 50%;
		min-height: 100vh;
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
		// height: calc(100vh - 500rpx);
		background-size: 100% 100%;
		border-radius: 20rpx;
		color: #3D2222;
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
	.popup{
		background-color: #fff;
		width: 80vw;
		margin: 0 10vw;
		height: 500rpx;
		position: relative;
	}
	.wzdl{
		width: 50%;
		margin: 50rpx 25% 0;
		background: #33CC33;
		color: #fff;
	}
</style>