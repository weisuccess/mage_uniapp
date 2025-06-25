<template>
	<view class="l-dialer" :style="getStyle">
		<view class="l-dialer__inner" :style="getDialStyle">
			<view class="l-dialer__inner-border" v-if="$slots.border">
				<slot name="border" />
			</view>
			<view class="l-dialer__inner-wrap"
				:style="styleOpt.borderColor && (' border: 1rpx solid ' + styleOpt.borderColor)">
				<view class="l-dialer__inner-item" v-for="(item, index) in prizeList" :key="index"
					:style="[getRotateAngle(index)]">
					<view class="l-dialer__inner-content" :style="[getCorrectAngle(index)]">
						<slot v-if="$slots.prize" name="prize" :item="item" :even="index % 2"></slot>
						<block v-else>
							<view :style="[{color: styleOpt.color}]">{{item.rewardLevel}}</view>
							<view class="l-dialer__inner-name" style="z-index: 9999;position: relative;"
								:style="[{fontSize: styleOpt.fontSize, color: styleOpt.color}]">
								{{ item.rewardName }}<text v-if="item.rewardQuantity>1">*{{item.rewardQuantity}}</text>
							</view>
							<image class="l-dialer__inner-img" :src="item.rewardImge"></image>
						</block>
					</view>
				</view>
			</view>
		</view>
		<view class="l-dialer__pointer" :style="pointerStyle">
			<slot v-if="$slots && $slots.pointer" name="pointer" />
			<image v-else :class="!isTurnIng ? 'heart': ''" src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744738149435zz.png"
				style="width: 100%;position: relative;" mode="widthFix" @tap="$emit('click')">
			</image>
			<!-- <view style="position: absolute;bottom: 30%;text-align: center;width: 100%;" @tap="$emit('click')">
				<view style="font-size: 35rpx;color: #fff;font-weight: 600;margin-bottom: 10rpx;">抽奖</view>
				<view style="font-size: 20rpx;color: #fff;" v-if="num>0">剩余免费次数:{{num}}</view>
				<view style="font-size: 20rpx;color: #fff;" v-else>200积分抽奖一次</view>
			</view> -->
		</view>
	</view>
</template>
<script>
	// import {addUnit} from '@/uni_modules/lime-shared/addUnit'	
	// import {sleep} from '@/uni_modules/lime-shared/sleep'	
	export default {
		name: 'l-dialer',
		emits: ['click', 'done'],
		props: {
			size: {
				type: [String, Number],
				default: 300
			},
			prizeList: {
				type: Array
			},
			turns: {
				type: Number,
				default: 10
			},
			num: {
				type: Number,
				default: 0
			},
			duration: {
				type: Number,
				default: 3
			},
			styleOpt: {
				type: Object,
				default: () => ({
					// 每一块扇形的背景色,默认值,可通过父组件来改变
					// $primary-1 $primary-2 
					prizeBgColors: ['#FFD8F5', '#FFF4FC'],
					color: '#F82117',
					fontSize: '20rpx',
					// 每一块扇形的外边框颜色,默认值,可通过父组件来改变
					// primary-4
					borderColor: '#FF937E',
				})
			},
			customStyle: {
				type: String,
			},
			dialStyle: {
				type: String,
			},
			pointerStyle: {
				type: String,
				default: `width: 15%`
			}
		},
		data() {
			return {
				noClick: true,
			}
		},
		created() {
			console.log(this.prizeList);
		},
		data() {
			return {
				// 开始转动的角度
				startRotateDegree: 0,
				// 设置指针默认指向的位置,现在是默认指向2个扇形之间的边线上
				rotateAngle: 0,
				rotateTransition: '',
				isTurnIng: false,
			};
		},
		computed: {
			getStyleOpt() {
				const style = {
					// 每一块扇形的背景色,默认值,可通过父组件来改变
					prizeBgColors: ['#FFD8F5', '#FFF4FC'],
					color: '#F82117',
					fontSize: '20rpx',
					// 每一块扇形的外边框颜色,默认值,可通过父组件来改变
					borderColor: '#C65195',
				}
				return Object.assign(style, this.styleOpt)
			},
			getRotateAngle() {
				return index => {
					const style = {
						transform: `rotate(${(360 / this.prizeList.length) * index}deg) skewX(0deg) skewY(${360 / this.prizeList.length - 90}deg)`,
						backgroundColor: `${this.getStyleOpt.prizeBgColors[index % this.getStyleOpt.prizeBgColors.length]}`,
						border: `${this.getStyleOpt.borderColor && '1rpx solid ' + this.getStyleOpt.borderColor }`
					}
					if (this.prizeList.length == 2) {
						style['transform'] = index == 0 ? 0 :
							`rotate(270deg)` //`rotate(${(360 / this.prizeList.length) * index}deg)`
						style['top'] = 0
					}
					return style
					// return {
					// 	transform: `rotate(${(360 / this.prizeList.length) * index}deg) skewX(0deg) skewY(${360 / this.prizeList.length - 90}deg)`,
					// 	backgroundColor: `${this.styleOpt.prizeBgColors[index % this.styleOpt.prizeBgColors.length]}`,
					// 	border: `${this.styleOpt.borderColor && '1rpx solid ' + this.styleOpt.borderColor }`
					// }
				};
			},
			getCorrectAngle() {
				return index => {
					const style = {
						transform: `skewY(${90 - 360 / this.prizeList.length}deg) skewX(0deg) rotate(${180 / this.prizeList.length}deg)`
					}
					if (this.prizeList.length == 2) {
						if (index == 0) {
							style['transform'] = `rotate(90deg)`
							style['bottom'] = 0
						} else {
							style['transform'] = `rotate(0deg)`
							style['left'] = 0
							style['bottom'] = '-50%'
						}

					}
					return style
				};
			},
			getStyle() {
				let {
					size,
					customStyle
				} = this;
				//addUnit(size)//
				size = /\d$/.test(size) ? size + 'px' : size;
				return `width: ${size}; height: ${size}; ${customStyle}`;
			},
			getDialStyle() {
				return `
				padding: ${this.getStyleOpt.padding};
				transform: ${this.rotateAngle};
				transition: ${this.rotateTransition};
				${this.dialStyle}
			`;
			}

		},
		methods: {
			// 转动起来
			run(index) {
				if (this.isTurnIng) return
				const duration = this.duration;
				const length = this.prizeList.length

				const rotateAngle = this.startRotateDegree + this.turns * 360 + 360 - (180 / length + (360 / length) *
					index) - (this.startRotateDegree % 360);
				this.startRotateDegree = rotateAngle;
				this.rotateAngle = `rotate(${rotateAngle}deg)`;
				this.rotateTransition = `transform ${duration}s cubic-bezier(0.250, 0.460, 0.455, 0.995)`;
				this.isTurnIng = true
				// sleep(duration * 1000 + 500).then(() => {
				// 	this.$emit('done', index);
				// 	this.isTurnIng = false
				// })
				setTimeout(() => {
					this.$emit('done', index);
					this.isTurnIng = false
				}, duration * 1000 + 500);
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import './index';
</style>