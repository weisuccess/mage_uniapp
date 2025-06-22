<template>
	<view class="content">
		<narBar :title="getLg('修改昵称')" @back="toBack()"></narBar>
		<view class="" style="height: var(--status-bar-height);"></view>
		<view style="background-color: #fff;width: 90%;border-radius: 15rpx;margin: 2.5%;padding: 2.5%;">
			<textarea placeholder-style="color:#ccc" placeholder="修改昵称!" maxlength="20" v-model="params.nickName" />
			<view style="text-align: end;">
				{{params.nickName.length || 0}}/20
			</view>
		</view>
		<view class="vcenter" style="width:100%;height:40px;margin-top:25px" @click="edit()">
			<view style="width:95%;height:40px;text-align: center;line-height: 40px;
			border-radius: 5rpx;" class="ts-btn">
				<font class="color-fff">确定</font>
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
				arr: [],
				params: {
					nickName: ''
				}
			}
		},
		onLoad() {

		},
		methods: {
			edit() {
				if (!this.params.nickName) {
					uni.showToast({
						title: '昵称不能为空',
						icon: 'none',
						mask: true
					})
					return
				}
				uni.showLoading({
					title: '提交中···',
					mask: true
				})
				this.$request.get({
					url: '/app/dreamUserInfo/updateUserInformation',
					data: {
						nickName: this.params.nickName,
						handlUrl: '',
					},
					success: rsp => {
						uni.showToast({
							title: rsp.message,
							icon: 'none'
						})
						if (rsp.code == 200) {
							setTimeout(() => {
								uni.navigateBack()
								uni.hideLoading()
							}, 1000)
						}
					},
					fail: rsp => {
						uni.hideLoading()
					}
				})
			},
			toBack() {
				uni.navigateBack()
			},
			toPage(id) {
				uni.redirectTo({
					url: '../index/newInfoaa?id=' + id
				})
			}
		}
	}
</script>

<style>
	.content {
		background: #F1F1F1;
		background-size: 100% 100%;
		height: 100vh;
	}
</style>