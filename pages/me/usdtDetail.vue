<template>
	<view class="content">
		<narBar :title="getLg('钱包信息')" @back="toBack()" :rightTxt=" 'add' " showRightBtn @rightClick="rightClick()">
		</narBar>
		<view class="">
			<view style="position: relative;height: 100rpx;margin-left: 10rpx;">
			</view>
			<view class="box">
				<view style="padding: 20rpx;line-height: 60rpx;border-bottom: 1px solid #eee;">
					<view class="box1" v-for="(item,index) in list" :key="index" @click="select(item)" >
						<view class="" style="color: #fff;line-height: 2rem;">
							<view class="flex-end-center">
								<view class="text-align-c color-000 br10 fw700"
									style="background-color: #7EF07E;width: 100rpx;" @tap.stop="del()">更换</view>
							</view>
							<view class="mt20 fz50">
								{{item.usdtPacksAddress}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup">
			<view class=""
				style="width: 90vw; margin: 0 5vw; height: 33vh;border-radius: 20rpx;background-color: #fff;position: relative;">
				<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744479312310x.png" mode="widthFix"
					style="width: 10%;margin: 500rpx 45% 0;position: absolute;" @click="close"></image>
				<image
					src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744877860031eb436f78de539c1baf7b44719a31a22eb7e1731d2497e-nrNa4I@3x.png"
					mode="widthFix" style="width: 60%;margin: -200rpx 20% 0;"></image>
				<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744877942416lxkf.png" mode="widthFix"
					style="width: 90%;margin: 100rpx 5% 0;border-bottom: 1px dashed #ccc;" class="pb30"></image>
				<view class="color-fff text-align-c lh80 br60" @click="qunliao"
				 style="width: 60%;margin: 20rpx 20%;background-color: #33CC33;">立即联系客服</view>
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
				page: 1,
				size: 10,
				total: '',
				list: [],
				selectid: 0
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
			qunliao() {
				this.$request.get({
					url: "/app/customerInfo/getCustomerList",
					success: rsp => {
						uni.navigateTo({
							url: '/pages/webview/webview2?url=' + rsp.data[0].customerUrl
						})
					}
				})
			},
			toBack() {
				uni.navigateBack()
			},
			rightClick() {
				uni.navigateTo({
					url: './usdt'
				})
			},
			select(item) {
				this.selectid = item.id
				uni.$emit('bank', {
					select: JSON.stringify(item)
				});
				uni.navigateBack()
			},
			del(id) {
				// this.$request.get({
				// 	url: "/app/usdtAddress/delete",
				// 	data: {
				// 		id:id
				// 	},
				// 	success: rsp => {
				// 		if(rsp.code==200){
				// 			this.page = 1
				// 			this.getList()
				// 		}
				// 	}
				// })
				this.$refs.popup.open('center')
				// uni.showModal({
				// 	title: '提示',
				// 	content: '如需更换，请联系在线客户提供相关信息更改！'
				// })
			},
			close() {
				this.$refs.popup.close()
			},
			getList() {
				this.$request.get({
					url: "/app/usdtAddressInfo/list",
					success: rsp => {
						this.list = rsp.data
						// if (this.page != 1) {
						// 	this.list = this.list.concat(rsp.records)
						// } else {
						// 	this.list = rsp.records
						// }
						// //将获取的总条数赋值
						// this.total = rsp.total
						// if (this.page * this.size >= this.total && this.total > this.size) {
						// 	uni.showToast({
						// 		title: '已加载全部',
						// 		icon: 'none'
						// 	})
						// }
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
		height: 100vh;
		color: #fff;
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
		height: calc(100vh - 300rpx);
		border-radius: 20rpx;
		color: #000;
	}

	.box1 {
		width: 95%;
		border-radius: 15rpx;
		padding: 2.5%;
		min-height: 300rpx;
		margin-top: 60rpx;
		background: #33CC33;
		position: relative;
		z-index: 99;
		word-wrap: break-word;
	}
</style>