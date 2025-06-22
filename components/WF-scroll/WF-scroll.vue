<template>
	<div>
		<scroll-view show-scrollbar="true" :scroll-top="scrollTop" scroll-y="true" @scrolltolower="upper"
			@scroll="scroll" :style="{'height':scrollHeight+'rpx'}">
			<div class="content" @touchstart="touchstart" @touchend="touchend">
				<div class="content_list" v-for="(item, i) in listAr" :key="i" v-if="listAr[0]">
					<!-- {{ k.depict }}{{i}} -->
					恭喜 
					 <text v-if="item.trueName" class="ml5 mr5">{{item.trueName | testuserName}}</text>
					 <text v-else class="ml5 mr5">{{item.userName | testuserName}}</text>
					幸运转盘获得{{item.rewardLevel}}{{item.rewardName}}
					<text v-if="item.rewardQuantity>1">*{{item.rewardQuantity}}</text>
				</div>
			</div>
		</scroll-view>
	</div>
</template>

<script>
	/*
	listAr  循环数组
	scrollHeight  scroll可视区域高度
	scrollTimer  是否默认开始滚动
	*/
	export default {
		name: "WF-scroll",
		props: {
			listAr: {
				type: Array,
				required: true
			},
			scrollHeight: {
				type: Number,
				required: true
			},
			scrollTimer: {
				type: Boolean,
				required: true
			},
		},
		data() {
			return {
				scrollTop: 0,
				scrollType: true, //判断滚动所用为防止滚动到底部多次赋值
				contentHeight: '', //内容高度
				touchstartType: false,
			};
		},
		created() {
			setTimeout(() => {
				if (this.scrollTimer) {
					this.setTimer()
				}
				const query = uni.createSelectorQuery().in(this);
				query.select('.content').boundingClientRect(data => {
					this.contentHeight = data.height * 2 - 40
				}).exec();
			}, 1000)
		},
		methods: {
			// 手指触摸
			touchstart() {
				this.touchstartType = true
				this.removeTimer()
			},
			// 手指离开
			touchend() {
				this.touchstartType = false
				this.setTimer()
				this.upper()
			},
			scroll(e) {
				if (this.touchstartType) {
					this.scrollTop = e.detail.scrollTop
				}
			},
			upper() {
				console.log(this.touchstartType);
				if (!this.touchstartType) {
					setTimeout(() => {
						if (this.scrollType && this.contentHeight > this.scrollHeight) {
							this.scrollTop = 0
							this.scrollType = false
							setTimeout(() => {
								this.scrollType = true
							}, 3000)
						}
					}, 3000)
				}

			},
			removeTimer() {
				if (this.timer) {
					clearInterval(this.timer)
					this.timer = null
				}
			},
			// 这里设置滚动速度时间越短滚动则越快
			setTimer() {
				this.removeTimer()
				this.timer = setInterval(() => {
					this.scrollTop++
				}, 44)
			},
		}
	}
</script>

<style scoped lang="scss">
	.content {
		padding: 40rpx 20rpx 0;
		// background: #fff;
	}

	.content_list {
		// width: 710rpx;
		// overflow: hidden;
		// white-space: nowrap;
		// text-overflow: ellipsis;
		// cursor: pointer;
		// color: #1debffff;
		color: #2C2C2C;
		padding: 15rpx 20rpx;
		font-size: 29rpx;
		line-height: 1.5rem;
	}
</style>