<template>
	<view class="address-list-container">
		<narBar :title="getLg('收货地址')" @back="toBack()"></narBar>
		<scroll-view scroll-y class="address-list" :style="{'height':windowHeight+'px'}">
			<block v-for="(address, index) in list" :key="index">
				<view class="address-item" @click="select(address)">
					<view class="item-header">
						<view style="display: flex;align-items: center;width: 60%;">
							<view class="item-name color-fff">{{ address.harvestPeople }}</view>
						</view>
						<view class="item-phone color-fff">{{ address.phone }}</view>
					</view>
					<view class="item-body color-fff">
						<view>{{ address.location }} </view>
						<view>{{ address.fullAddress }} </view>
					</view>
					<view class="item-footer flex-between-center">
						<view class="">
							<view class="item-set-default" v-if="address.whetherDefault==2||!address.whetherDefault"
								@click.stop="moren(address)">设为默认</view>
							<view class="default" v-if="address.whetherDefault==1">默认地址</view>
						</view>
						<!-- <button class="edit-btn" @click.stop="edit">编辑</button> -->
						<!-- <button class="edit-btn" @click.stop="moren(address.id)">默认</button> -->
						<view class="" @click.stop="deleteAddress(address.id)">
							<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744474893067del.png"
								mode="widthFix" style="width: 40rpx;height: 50rpx;"></image>
						</view>
						<!-- <button class="delete-btn">删除</button> -->
					</view>

				</view>
			</block>
		</scroll-view>
		<view class="addAddress ts-btn" @click.stop="$noMultipleClicks(add,'')">
			添加收货地址
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 250,
				noClick: true,
				list: [],
				pageNum: 1,
				pageSize: 10,
				total: 0
			};
		},
		onReachBottom() {
			//判断 如果页码*页容量大于等于总条数，提示该页数据加载完毕
			if (this.pageNum * this.pageSize >= this.total) {
				// uni.showToast({
				// 	title: '已加载全部',
				// 	icon: 'none'
				// })
				return
			}
			//并且让页码+1,调用获取数据的方法获取第二页数据
			this.pageNum++
			//此处调用自己获取数据列表的方法
			this.getList()

		},
		onLoad() {

		},
		onShow() {
			this.pageNum = 1
			this.getList()
		},
		methods: {
			select(item) {
				uni.$emit('address', {
					select: JSON.stringify(item)
				});
				uni.navigateBack()
			},
			add() {
				uni.navigateTo({
					url: './addAddress'
				})
			},
			moren(item) {
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定设置' + item.location + item.fullAddress + '为默认地址吗？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.$request.get({
								url: "/app/harvestAddressInfo/defaultSetup",
								data: {
									id: item.id
								},
								success: rsp => {
									uni.showToast({
										title: rsp.message,
										icon: 'none'
									})
									if (rsp.code == 200) {
										that.getList()
									}
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			getList() {
				this.$request.get({
					url: "/app/harvestAddressInfo/list",
					// data: {
					// 	pageNum: this.pageNum,
					// 	pageSize: this.pageSize
					// },
					success: rsp => {
						this.list = rsp.data
						// if (this.pageNum != 1) {
						// 	this.list = this.list.concat(rsp.records)
						// } else {
						// 	this.list = rsp.records
						// }
						//将获取的总条数赋值
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
			selectAddress(address) {
				// 选中地址的逻辑
				console.log('选中地址:', address);
			},
			setDefault(address) {
				// 设为默认地址的逻辑
				this.addresses.forEach(addr => {
					addr.isDefault = false;
				});
				address.isDefault = true;
			},
			deleteAddress(id) {
				// 删除地址的逻辑
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定删除吗？',
					success: function(res) {
						if (res.confirm) {
							that.$request.get({
								url: "/app/harvestAddressInfo/remove",
								data: {
									id: id
								},
								success: rsp => {
									this.pageNum = 1
									this.list = []
									that.getList()
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			edit() {
				uni.navigateTo({
					url: '/pages/me/addAddress'
				})
			},
			toBack() {
				uni.navigateBack()
			},
		}
	};
</script>

<style lang="scss" scoped>
	/* styles.css */
	.content {
		background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		background-size: 100% 100%;
		height: 55vh;
		position: relative;
		color: #333;
		// color: #ffffff;
	}

	uni-button {
		margin-right: 0;
	}

	.list-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15rpx;
	}

	.list-title {
		font-size: 20px;
		color: #333;
	}

	.add-address-btn {
		padding: 10px 20px;
		background: #007AFF;
		color: #fff;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		text-decoration: none;
	}

	.add-address-btn:hover {
		background: #0056b3;
	}

	.address-list {
		width: 100%;
		// margin: 5%;
		// max-height: calc(100vh - 400rpx);
		position: absolute;
		top: 200rpx;
		// background-color: #fff;
		// color: #333;
		/* 调整高度以适应屏幕 */
		overflow-y: auto;
	}

	.address-item {
		width: 90%;
		margin: 0 2.5%;
		padding: 2.5%;
		border-radius: 15rpx;
		margin-top: 30rpx;
		background: #33CC33;
	}

	.item-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
		width: 100%;
	}

	.item-name {
		font-weight: bold;
		width: 80%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.item-set-default {
		color: #007AFF;
		cursor: pointer;
		width: 150rpx;
	}

	.item-set-default:hover {
		text-decoration: underline;
	}

	.item-body {
		margin-bottom: 5px;
	}

	.item-phone {
		margin-top: 10rpx;
	}

	.item-footer {
		// display: flex;
		// justify-content: flex-end;
	}

	.edit-btn,
	.delete-btn {
		height: 60rpx;
		line-height: 55rpx;
		width: 100rpx;
		font-size: 26rpx;
		padding: 5rpx 10rpx;
		margin-left: 5rpx;
		border: none;
		border-radius: 10rpx;
		cursor: pointer;
	}

	.edit-btn {
		background: #4CAF50;
		color: #fff;
		width: 100rpx;
	}

	.delete-btn {
		background: #FF5722;
		color: #fff;
		width: 100rpx;
	}

	.addAddress {
		width: 90%;
		margin: 0 5%;
		// border-radius: 60rpx;
		position: fixed;
		bottom: 100rpx;
		text-align: center;
		// height: 100rpx;
		// line-height: 100rpx;
		// background-color: #EC2F29;
		color: #fff;
	}

	.default {
		color: #E8530C;
		background-color: #FFEEE7;
		width: 150rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 10rpx;
		font-size: 28rpx;
	}
</style>