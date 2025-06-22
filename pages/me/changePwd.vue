<template>
	<view class="content">
		<narBar :title="getLg('修改交易密码')" @back="toBack()"></narBar>
		<view class="box">
			<uni-forms :rules="rules" label-position="left">
				<uni-forms-item label="原交易密码" name="name" :label-width="120">
					<view class="vcenter"
						style="width:calc(100% - 40rpx);height:40px;background-color: #33CC33;border-radius: 10rpx;padding: 0 20rpx;">
						<view style="width:88%;height:100%">
							<input type="text" v-model="params.payPassword" maxlength="6"
								placeholder-style="color:#fff" style="border:0px;width:100%;height:40px;color: #fff;"
								placeholder="请输入密码" />
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item label="新交易密码" name="name" :label-width="120">
					<view class="vcenter"
						style="width:calc(100% - 40rpx);height:40px;background-color: #33CC33;border-radius: 10rpx;padding: 0 20rpx;">
						<view style="width:88%;height:100%">
							<input type="text" v-model="params.newPayPassword" maxlength="6"
								placeholder-style="color:#fff" style="border:0px;width:100%;height:40px;color: #fff;"
								placeholder="请输入新密码" />
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item label="确认新交易密码" name="name" :label-width="120">
					<view class="vcenter"
						style="width:calc(100% - 40rpx);height:40px;background-color: #33CC33;border-radius: 10rpx;padding: 0 20rpx;">
						<view style="width:88%;height:100%">
							<input type="text" v-model="params.confirmNewPayPassword" maxlength="6"
								placeholder-style="color:#fff" style="border:0px;width:100%;height:40px;color: #fff;"
								placeholder="请确认新密码" />
						</view>
					</view>
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="ts-btn color-fff text-align-c"
			style="width:80%;margin: 50rpx 10% 0;position: fixed;bottom: 100rpx;" @click.stop="$noMultipleClicks(edit,'')">
			确认修改交易密码
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
				noClick: true,
				params: {
					confirmNewPayPassword: '',
					newPayPassword: '',
					payPassword: ''
				},
				rules: {
					// 对name字段进行必填验证
					name: {
						rules: [{
								required: true,
								errorMessage: '请输入用户名',
							},
							{
								minLength: 3,
								maxLength: 5,
								errorMessage: '姓名长度在3 到 5 个字符',
							}
						]
					},
				}
			}
		},
		onLoad() {


		},
		methods: {
			edit() {
				if (this.params.newPayPassword != this.params.confirmNewPayPassword) {
					uni.showToast({
						title: '两次输入新密码不一样',
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					title: '提交中···',
					mask: true
				})
				this.$request.get({
					url: '/app/dreamUserInfo/updatePayPassword',
					data: this.params,
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
		}
	}
</script>
<style>
	page {
		background-color: #f1f1f1;
	}
</style>
<style scoped>
	.content {
		/* background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		background-size: 100% 60%; */
		height: 100vh;
	}

	.title {
		line-height: 40px;
	}

	.box {
		width: 90%;
		margin: 100rpx 2.5% 0;
		/* box-shadow: 0 0 30rpx rgba(0, 0, 0, .2); */
		padding: 2.5%;
		/* background-color: #fff; */
		/* color: #333; */
		/* border-radius: 9px; */
		position: relative;
	}

	.active {
		border-bottom: 2px solid #004AC9;
		color: #000;
	}
</style>