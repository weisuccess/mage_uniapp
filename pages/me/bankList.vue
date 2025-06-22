<template>
	<view class="content">
		<narBar :title="getLg('支付宝信息')" @back="toBack()" :rightTxt=" 'add' " showRightBtn background="transparent"
			@rightClick="rightClick()">
		</narBar>
		<view class="" style="padding: 0 30rpx;">
			<view style="position: relative;height: 100rpx;margin-left: 10rpx;">
				<image src="../../static/home/top-line.png" mode="widthFix" class="vmt60"
					style="position: absolute;height: 100rpx;width: 98%;"></image>
				<image src="../../static/me/zfb.png" mode="widthFix" class="vmt60"
					style="position: absolute;width: 150rpx;top:20rpx;left: 35rpx;"></image>
			</view>
			<view class="box">
				<view style="padding: 20rpx;line-height: 60rpx;border-bottom: 1px solid #eee;">
					<view class="box1" v-for="(item,index) in list" :key="index" @click="select(item)">
						<view style="display: flex;align-items: center;color: #fff;margin: 20rpx;justify-content: space-between;">
							<view class="">支付宝</view>
							<view class="">{{item.packsName}}</view>
						</view>
						<view style="color: #fff;margin: 20rpx;text-align: center;">
							{{item.purseAccount}}
						</view>
						<!-- <view style="color: #fff;margin: 20rpx;">
							地址：{{item.purseAddress}}
						</view> -->
					</view>
				</view>
			</view>
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
				page: 1,
				size: 10,
				total: '',
				list: [],
				selectid: ''
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
		onShow() {
			this.page = 1
			this.getList()
		},
		methods: {
			toBack() {
				uni.navigateBack()
			},
			select(item) {
				this.selectid = item.id
				uni.$emit('bank', {
					select: JSON.stringify(item)
				});
				uni.navigateBack()
			},
			rightClick() {
				uni.navigateTo({
					url: './bank'
				})
			},
			getList() {
				this.$request.get({
					url: "/app/alipayInfo/list",
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
						if (this.page * this.size >= this.total&& this.total > this.size) {
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
<style scoped lang="scss">
	.content {
		background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		background-size: 100% 60%;
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

	.color-000 {
		color: #000;
	}

	.money {
		font-size: 40rpx;
		font-weight: bold;
		color: #DD322A;
	}

	.box {
		width: 95%;
		height: calc(100vh - 300rpx);
		margin: 0 2.5%;
		padding-top: 100rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		color: #000;
	}

	.box1 {
		width: 90%;
		border-radius: 15rpx 15rpx 0 0;
		margin: 0 2.5% 2.5%;
		padding: 2.5%;
		min-height: 300rpx;
		margin-top: 60rpx;
		background: url('/static/me/zfb-bg.png') no-repeat;
		background-size: 100% 100%;
		position: relative;
		z-index: 99;
	}
</style>