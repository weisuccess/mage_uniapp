<template>
	<view class="content">
		<narBar :title="getLg('验证码设置')" @back="toBack()"></narBar>
		<view class="main">
			<button class="line vmt30" @click="gopage(1)">方式一</button>
			<button class="line vmt30" @click="gopage(2)">方式二</button>
			<button class="line vmt30" @click="gopage(3)">方式三</button>
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
		}
	},
	onLoad() {
	},
	methods: {
		gopage(v) {
			uni.redirectTo({
				url:'/pages/eco/paypwd'+v
			})
		},
		toBack(){
			uni.redirectTo({
				url:'/pages/eco/index'
			})
		}
	}
}
</script>
<style lang="scss" scoped>
.title{
    display: flex;
    padding: 20rpx 10rpx;
    font-size: 32rpx;
}
</style>