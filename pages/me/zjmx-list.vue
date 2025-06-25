<template>
	<view class="content">
		<narBar :title="getLg('资金明细')" @back="toBack()"></narBar>
		<view class="">
			<view class="box">
				<scroll-view scroll-y="true" :style="{'height':windowHeight+'px'}">
					<view>
						<view class="flex-between-center lh100 mx20" style="border-bottom: 1px solid #aaa;"
							v-for="(item,index) in list" :key="index" @click="detail(item.path,index)">
							<view class="flex-start-center">
								<image :src="item.img" mode="widthFix" style="width: 40rpx;height: 40rpx;"></image>
								<view class="ml10">{{item.name}}</view>
							</view>
							<uni-icons type="right"></uni-icons>
						</view>
					</view>
				</scroll-view>
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
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 230,
				list: [{
						img: 'https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744351026466jyjl.png',
						name: '交易记录',
						path: 'me/assetDetails'
					},
					{
						img: 'https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744351060810cz.png',
						name: '充值记录',
						path: 'me/moneyDetails'
					},
					{
						img: 'https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744351171513txjl.png',
						name: '提现记录',
						path: 'me/tixian'
					},
					{
						img: 'https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744351185313tz.png',
						name: '投资记录',
						path:'me/myPosition'
					},
					{
						img: 'https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744351211877qd.png',
						name: '签到记录',
						path: 'me/qd-detail'
					},
					{
						img: 'https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744351240922lw.png',
						name: '幸运福礼记录',
						path: 'me/dingdan'
					},
					{
						img: 'https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744351259105jf.png',
						name: '积分记录',
						path: 'me/jfmx'
					},
					{
						img: 'https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744351306806kq.png',
						name: '卡券记录',
						path: 'me/kq'
					}
				],
			}
		},
		methods: {
			toBack() {
				uni.navigateBack()
			},
			detail(path,index) {
				if(index==6){
					uni.navigateTo({
						url: '/pages/' + path+'?index=0'
					})
					return
				}
				if(index==7){
					uni.navigateTo({
						url: '/pages/' + path+'?index=1'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/' + path
				})
			}
		}
	}
</script>
<style>
	page {
		background: #f1f1f1;
	}
</style>
<style scoped lang="scss">
	.content {
		height: 100vh;
	}

	.title {
		line-height: 80rpx;
	}

	.balance {
		font-size: 60rpx;
		font-weight: 600;
	}

	.box {
		width: 95%;
		padding: 2.5%;
		margin: var(--status-bar-height) 0 0;
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

	.line {
		position: fixed;
		width: 100%;
		bottom: 100rpx;
		text-align: center;
		color: darkslategray;
		font-size: 26rpx;
	}
</style>