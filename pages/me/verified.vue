<template>
	<view class="">
		<view class="content1" v-if="user.isDelete==1">
			<narBar :title="getLg('身份材料证明')" @back="toBack()" color="#fff"></narBar>
			<view v-if="showup==1" class="vcenter"
				style="width:100%;height:100%;background-color: rgba(0,0,0,0.4);position:fixed;z-index: 9999;">
				<font style="color:#fff;font-size:16px">上传中...</font>
			</view>
			<view class="" style="padding: 0 30rpx;">
				<view class="" style="margin-top: var(--status-bar-height);">
					<view class="mt60" style="line-height: 40rpx;font-size: 30rpx;">根据相关法律法规，需进行实名认证请您提交真实的身份信息 </view>
				</view>

				<view class="box" style="position: relative;z-index: 9;">
					<view class="vcenter-left" style="line-height: 100rpx;">
						<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737113332649avatar.png"
							style="width: 30rpx;height: 35rpx;margin: 0 20rpx;">
						</image>
						<view class="color-000">姓名</view>
					</view>
					<input type="text" placeholder="请输入真实姓名" :disabled="user.isDelete==1" v-model="trueName" />

					<view class="vcenter-left" style="line-height: 100rpx;">
						<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737113394582identity.png"
							style="width: 50rpx;height: 35rpx;margin: 0 20rpx;">
						</image>
						<view class="color-000">证件号</view>
					</view>
					<input type="text" placeholder="请输入证件号" :disabled="user.isDelete==1" v-model="idCard" />
				</view>
			</view>
		</view>
		<view class="content" v-if="user.isDelete==2">
			<narBar :title="getLg('身份材料证明')" @back="toBack()" color="#fff"></narBar>
			<view v-if="showup==1" class="vcenter"
				style="width:100%;height:100%;background-color: rgba(0,0,0,0.4);position:fixed;z-index: 9999;">
				<font style="color:#fff;font-size:16px">上传中...</font>
			</view>
			<view class="mt60" style="padding: 0 30rpx;">
				<view style="margin-top: var(--status-bar-height);">
					<!-- <view class="mt60" style="line-height: 40rpx;font-size: 30rpx;">根据相关法律法规，需进行实名认证请您提交真实的身份信息 </view> -->
				</view>

				<view class="box" style="position: relative;z-index: 9;">
					<view class="flex-start-center" style="border-bottom: 1px solid #ccc;">
						<view class="vcenter-left" style="line-height: 100rpx;width: 150rpx;">
							<view class="color-000">姓名</view>
						</view>
						<input type="text" placeholder="请输入真实姓名" v-model="trueName" />
					</view>

					<view class="flex-start-center" style="border-bottom: 1px solid #ccc;">
						<view class="vcenter-left" style="line-height: 100rpx;width: 150rpx;">
							<view class="color-000">身份证号</view>
						</view>
						<input type="text" placeholder="请输入身份证号" v-model="idCard" />
					</view>
				</view>
				<view class="color-000 flex-center-center">
					<view class="">───── </view>
					<view class="text-align-c">请拍摄并上传 <br> 你的身份证照片</view>
					<view class="">───── </view>
				</view>
				<view class="flex-around-center">
					<view class="" style="width: 45%;">
						<view class="vcenter" style="width:100%;height:240rpx;margin-top:15px;">
							<upload-img :width="580" :height="240" :bgsrc="cardFront" @chooseimg="upload($event,1)">
							</upload-img>
						</view>
						<view class="text-align-c lh80 color-fff"
							style="background: #33CC33;border-radius: 0 0 10rpx 10rpx;">
							身份证头像面</view>
					</view>
					<view class="" style="width: 45%;">
						<view class="vcenter" style="width:100%;height:240rpx;margin-top:15px;">
							<upload-img :width="580" :height="240" :bgsrc="cardSide" @chooseimg="upload($event,2)">
							</upload-img>
						</view>
						<view class="text-align-c lh80 color-fff"
							style="background: #33CC33;border-radius: 0 0 10rpx 10rpx;">
							身份证国徽面</view>
					</view>
				</view>
				<image src="https://ubi-res.oss-cn-beijing.aliyuncs.com/null/1744481226196yq.png" mode="heightFix"
					style="width: 200rpx;height: 40rpx;" class="mt60"></image>
				<view class="flex-start-center mt30">
					<view style="background: #004BAE;width: 10rpx;height: 10rpx;border-radius: 50%;"></view>
					<view class="ml10">请持本人有效身份证认证</view>
				</view>
				<view class="flex-start-center mt10">
					<view style="background: #004BAE;width: 10rpx;height: 10rpx;border-radius: 50%;"></view>
					<view class="ml10">拍摄时确保身份证边框完整字体清晰亮度均匀</view>
				</view>
				<view style="height: 100rpx;"></view>
			</view>

			<view class="bottom">
				<view class="authentication ts-btn" @click="submit">
					提交认证
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import narBar from 'pages/public/narBar.vue'
	import uploadImg from '@/components/amazarashi-uploadimg/uploadImg.vue'
	import {
		filters
	} from '../../utils/formatWeek.js'
	export default {
		components: {
			narBar,
			uploadImg
		},
		data() {
			return {
				showup: 2,
				trueName: '',
				idCard: '',
				cardFront: 'https://ubi-res.oss-cn-beijing.aliyuncs.com/null/17445281921891737112587392sf1.png',
				cardSide: 'https://ubi-res.oss-cn-beijing.aliyuncs.com/null/17445282956061737112611352sf2.png',
				user: {}
			}
		},
		onLoad() {
			this.getUser()
		},
		methods: {
			getUser() {
				this.$request.get({
					url: "/app/dreamUserInfo/getUser",
					success: rsp => {
						this.user = rsp.data
						if (this.user.isDelete == 1) {
							this.trueName = filters.formattedName(this.user.trueName)
							this.idCard = filters.hideCardCenter(this.user.idCard)
						}
						// this.user.isDelete = 2
					}
				})
			},
			toBack() {
				uni.navigateBack()
			},
			upload(e, type) {
				this.showup = 1
				console.log(e);
				let url = uni.getStorageSync('url')
				uni.uploadFile({
					url: url + '/Ali/upload',
					filePath: e.src,
					name: 'file',
					header: {
						token: uni.getStorageSync('token'),
					},
					success: res => {
						let data = JSON.parse(res.data);
						console.log(data);
						if (data.code == 200) {
							if (type == 1) {
								this.cardFront = data.data;
							}
							if (type == 2) {
								this.cardSide = data.data;
							}
							// if (type == 3) {
							// 	this.cardHandheld = data.data;
							// }
						}
						// 失败报错
						if (data.code == 500) {
							uni.showToast({
								title: '上传失败',
								icon: 'none'
							})
						}
						this.showup = 2
					}
				});
			},
			submit() {
				// let p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
				// if (!p.test(this.idCard)) {
				// 	uni.showToast({
				// 		title: '身份证格式输入不正确',
				// 		icon: 'none'
				// 	})
				// 	return
				// }
				this.$request.post({
					url: "/app/userRealName/getIdCard",
					data: {
						trueName: this.trueName,
						idCard: this.idCard,
						cardFront: this.cardFront,
						cardSide: this.cardSide,
					},
					success: rsp => {
						uni.showToast({
							title: rsp.message,
							icon: 'none'
						})
						if (rsp.code == 200) {
							setTimeout(() => {
								uni.navigateBack()
							}, 1000)
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
		// background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		// background-size: 100% 100%;
		height: 100vh;
	}

	.content1 {
		// background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		// background-size: 100% 100%;
		height: 100vh;
	}

	.title {
		font-size: 50rpx;
		line-height: 100rpx;
	}

	.box {
		width: 95%;
		// height: calc(100vh - 600rpx);
		margin: 70rpx 2.5%;
		padding: 20rpx 0;

		input {
			border-bottom: 1rpx solid #F2F2F2;
			height: 80rpx;
			line-height: 80rpx;
			margin: 0 20rpx;
			color: #000;
		}
	}

	.color-000 {
		color: #000;
	}



	.bottom {
		padding-bottom: 100rpx;
		width: 100%;

	}

	.line {
		color: #B6B6B6;
		text-align: center;
		font-size: 22rpx;
		margin-top: 50rpx;
	}

	.authentication {
		width: 80%;
		margin: 0 10%;
		text-align: center;
		color: #fff;
	}
</style>