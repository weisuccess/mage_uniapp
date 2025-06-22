<template>
	<view class="content">
		<narBar :title="getLg('有奖问答')" @back="toBack()" background="transparent"></narBar>
		<view class="" style="padding: 0 30rpx;">
			<image src="/static/products/yjf.png" mode="widthFix" style="width: 70%;margin: 100rpx 15% 0;"></image>
			<view class="box">
				<view style="padding: 20rpx;line-height: 60rpx;border-bottom: 1px solid #eee;"
					v-for="(item,index) in list" :key="index" v-if="index==select">
					<view style="font-weight: bold;font-size: 47rpx;">
						{{index+1}}/{{list.length}}
					</view>
					<view style="font-weight: bold;">
						{{item.title}}
					</view>
					<view class="bg-btn" @click="confirm(item.correctOption,'A',item)"
						:style="[{'background':item.userAnswer&&item.correctOption=='A'?'#16CED5':item.userAnswer&&item.correctOption!=item.userAnswer&&item.userAnswer=='A'?'#747474':'#AF2827'}]">
						<view class="">A.{{item.optionA}}</view>
						<view class="" v-if="item.userAnswer">
							<view class="" v-if="item.userAnswer&&item.correctOption=='A'">
								<image src="/static/products/dui.png" mode="widthFix"
									style="width: 40rpx;height: 40rpx;"></image>
							</view>
							<view v-if="item.userAnswer&&item.userAnswer!=item.correctOption&&item.userAnswer=='A'">
								<image src="/static/products/cuo.png" mode="widthFix"
									style="width: 40rpx;height: 40rpx;"></image>
							</view>
						</view>
					</view>
					<view class="bg-btn" @click="confirm(item.correctOption,'B',item)"
						:style="[{'background':item.userAnswer&&item.correctOption=='B'?'#16CED5':item.userAnswer&&item.correctOption!=item.userAnswer&&item.userAnswer=='B'?'#747474':'#AF2827'}]">
						<view class="">B.{{item.optionB}}</view>
						<view class="" v-if="item.userAnswer">
							<view class="" v-if="item.userAnswer&&item.correctOption=='B'">
								<image src="/static/products/dui.png" mode="widthFix"
									style="width: 40rpx;height: 40rpx;"></image>
							</view>
							<view v-if="item.userAnswer&&item.userAnswer!=item.correctOption&&item.userAnswer=='B'">
								<image src="/static/products/cuo.png" mode="widthFix"
									style="width: 40rpx;height: 40rpx;"></image>
							</view>
						</view>
					</view>
					<view class="bg-btn" @click="confirm(item.correctOption,'C',item)"
						:style="[{'background':item.userAnswer&&item.correctOption=='C'?'#16CED5':item.userAnswer&&item.correctOption!=item.userAnswer&&item.userAnswer=='C'?'#747474':'#AF2827'}]">
						<view class="">C.{{item.optionC}}</view>
						<view class="" v-if="item.userAnswer">
							<view class="" v-if="item.userAnswer&&item.correctOption=='C'">
								<image src="/static/products/dui.png" mode="widthFix"
									style="width: 40rpx;height: 40rpx;"></image>
							</view>
							<view v-if="item.userAnswer&&item.userAnswer!=item.correctOption&&item.userAnswer=='C'">
								<image src="/static/products/cuo.png" mode="widthFix"
									style="width: 40rpx;height: 40rpx;"></image>
							</view>
						</view>
					</view>
					<view class="bg-btn" @click="confirm(item.correctOption,'D',item)"
						:style="[{'background':item.userAnswer&&item.correctOption=='D'?'#16CED5':item.userAnswer&&item.correctOption!=item.userAnswer&&item.userAnswer=='D'?'#747474':'#AF2827'}]">
						<view class="">D.{{item.optionD}}</view>
						<view class="" v-if="item.userAnswer">
							<view class="" v-if="item.userAnswer&&item.correctOption=='D'">
								<image src="/static/products/dui.png" mode="widthFix"
									style="width: 40rpx;height: 40rpx;"></image>
							</view>
							<view v-if="item.userAnswer&&item.userAnswer!=item.correctOption&&item.userAnswer=='D'">
								<image src="/static/products/cuo.png" mode="widthFix"
									style="width: 40rpx;height: 40rpx;"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="vbetween color-000" style="line-height: 70rpx;position: fixed;bottom: 200rpx;width: 85%;">
				<view class="">
					<view style="border-radius: 10rpx;padding: 0 20rpx;background: #E0D0AD;" @click="changeTopic(1)"
						v-if="select>0">上一道</view>
				</view>
				<view class="">
					<view style="border-radius: 10rpx;padding: 0 20rpx;background: #E0D0AD;" @click="changeTopic(2)"
						v-if="select<list.length-1">下一道</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popWin">
			<view style="width: 80vw; margin: 0 10vw; height: 43vh;border-radius: 20rpx;background-color: #fff;
				background: url('/static/products/k.png') no-repeat;background-size: 100% auto;" v-if="correct=='transport'">
				<view class="">
					<image src="/static/products/close.png" mode="widthFix"
						style="width: 30%;height: 100rpx;margin: 50rpx 35% 0;"></image>
					<view style="font-size: 46rpx;color: #282626;text-align: center;font-weight: bold;
						line-height: 100rpx;">很遗憾答错了</view>
					<!-- <view style="color: #9B1311;font-size: 37rpx;text-align: center;background: url('/static/products/ck.png') no-repeat;background-size: 100% 100%;
					height: 100rpx;line-height: 100rpx;width: 80%;margin: 0 10%;">正确答案是：{{answer}}</view> -->
					<!-- <image src="/static/products/jxdt.png" mode="widthFix" @click="jx"
						style="width: 80%;margin: 150rpx 10% 0;"></image> -->
					<view class="ts-btn text-align-c" style="width: 80%;margin: 70rpx 10% 0;" @click="jx">
						继续答题
					</view>
				</view>
			</view>
			<view style="width: 80vw; margin: 0 10vw; height: 43vh;border-radius: 20rpx;background-color: #fff;
				background: url('/static/products/k.png') no-repeat;background-size: 100% auto;" v-if="correct=='win'">
				<view class="">
					<image src="/static/products/yes.png" mode="widthFix"
						style="width: 30%;height: 100rpx;margin: 50rpx 35% 0;"></image>
					<view style="font-size: 46rpx;color: #282626;text-align: center;font-weight: bold;
							line-height: 100rpx;">恭喜您答对了</view>
					<view style="color: #EB3537;text-align: center;
									line-height: 60rpx;">获得积分{{jifen}}</view>
					<view class="ts-btn text-align-c" style="width: 80%;margin: 70rpx 10% 0;" @click="jx">
						开心收下
					</view>
					<!-- <image src="/static/products/kxsx.png" mode="widthFix" @click="jx"
						style="width: 80%;margin: 250rpx 10% 0;"></image> -->
				</view>
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
				list: [],
				select: 0,
				correct: '',
				answer: '',
				jifen: ''
			}
		},
		onLoad() {
			this.getList()
			// setTimeout(() => {
			// 	this.$refs.popWin.open('center')
			// }, 500)
		},
		methods: {
			toBack() {
				uni.navigateBack()
			},
			close1() {
				this.$refs.popWin.close()
			},
			getList() {
				this.$request.get({
					url: "/app/question/list",
					success: rsp => {
						this.list = rsp.data
						console.log(this.list);
					}
				})
			},
			confirm(correctOption, type, item) {
				if (item.userAnswer) {
					uni.showToast({
						title: '这道题已经回答过了',
						icon: 'none'
					})
					return
				}
				let answerRecordVo = {
					questionId: item.id,
					userAnswer: type,
				}
				this.$request.post({
					url: "/app/question/answer",
					data: answerRecordVo,
					success: rsp => {
						console.log(correctOption, type);
						if (rsp.data.isCorrect == 0) {
							this.$refs.popWin.open('center')
							this.correct = 'transport'
							this.answer = correctOption
						} else if (rsp.data.isCorrect == 1) {
							this.correct = 'win'
							this.$refs.popWin.open('center')
							this.answer = ''
							this.jifen = item.optionIntegral
						}
						this.getList()
						// if (correctOption != type) {
						// 	this.$refs.popWin.open('center')
						// 	this.correct = 'transport'
						// 	this.answer = correctOption
						// } else {
						// 	this.correct = 'win'
						// 	this.$refs.popWin.open('center')
						// 	this.answer = ''
						// 	this.jifen = item.optionIntegral
						// }
					}
				})

			},
			changeTopic(e) {
				if (e == 1) {
					this.select -= 1
				}
				if (e == 2) {
					this.select += 1
				}
				this.$forceUpdate()
			},
			jx() {
				if (this.select < this.list.length - 1) {
					this.select += 1
				}
				this.close1()
				this.$forceUpdate()
			}
		}
	}
</script>
<style scoped lang="scss">
	.content {
		background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		background-size: 100% 100%;
		height: 100vh;
		color: #ffffff;
	}

	.title {
		line-height: 80rpx;
	}

	.bg-btn {
		// background-color: #AF2827;
		width: 80%;
		margin: 20rpx 7.5%;
		border-radius: 15rpx;
		color: #fff;
		// text-align: center;
		padding: 15rpx 2.5%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.balance {
		font-size: 60rpx;
		font-weight: 600;
	}

	.box {
		width: 95%;
		// height: calc(100vh - 300rpx);
		box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.2);
		margin: 70rpx 0;
		padding-top: 20rpx;
		padding: 0 2.5%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		color: #000;
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

	.ver-left {
		background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737138168260serialNumber.png') no-repeat;
		background-size: 100% 100%;
		height: 40rpx;
		margin: 0 20rpx;
		font-size: 24rpx;
		width: 50rpx;
		text-align: center;
		line-height: 35rpx;
		color: #fff;
	}
</style>