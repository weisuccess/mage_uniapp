<template>
	<view :class="index==0?'bg1':title=='运营制度'? 'bg3':title=='公司概况'? 'bg3':'bg2'" style="height: 100vh;">
		<narBar :title="getLg(title)" @back="toBack()" v-if="index!=0&&index!=2&&title!='运营制度'"></narBar>

		<view class="top" v-if="title=='运营制度'&&index!=0">
			<narBar :title="getLg(title)" @back="toBack()" background="transparent"></narBar>
			<view style="width: 90%;margin:var(--status-bar-height) 2.5% 0;padding: 2.5%;">
				<view class="color-fff fz40 fw700 text-align-c mt30">
					UBI资产管理公司运营
				</view>
				<view class="br10"
					style="position: relative;padding: 20rpx;margin-top: 30rpx;height: 400rpx;z-index: 99;">
					<video :src="video" style="width: 100%;height: 400rpx;border-radius: 10rpx;"></video>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" :style="{height:windowHeight-390+'px'}" class="mt250"
			style="width: 100%;border-radius: 10rpx;" v-if="title=='运营制度'&&index!=0">
			<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1748359268985yyzd1.png" mode="widthFix"
				style="width: 100%;"></image>
		</scroll-view>
		<view class="" v-if="title!='运营制度'">
			<view class="vcenter header_left_icon" v-if="index==0||index==2">
				<view class="" @click="toBack()">
					<image mode="widthFix" src="/static/tabbar/back.png"></image>
				</view>
			</view>
		</view>
		<view class="w100 text-align-c" v-if="title == '公司概况'"
			style="margin-top: var(--status-bar-height);position: fixed;top: 20rpx;z-index: 98;">
			公司介绍
		</view>
		<scroll-view scroll-y="true" style="width: 100%;height: 100vh;border-radius: 10rpx;" v-if="index==0">
			<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744096743396gl1.png" mode="widthFix"
				style="width: 100%;"></image>
			<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744096841537gl2.png" mode="widthFix"
				style="width: 100%;margin-top: -10rpx;"></image>
		</scroll-view>
		<scroll-view scroll-y="true" :style="{height:windowHeight-40+'px'}" style="width: 100%;border-radius: 10rpx;"
			v-if="title=='U资产体验说明'&&index!=0">
			<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744989889311Uzc.png" mode="widthFix"
				style="width: 100%;"></image>
		</scroll-view>
		<scroll-view scroll-y="true" style="width: 100%;height: 100vh;border-radius: 10rpx;"
			v-if="index!=0&&title == '公司概况'">
			<view class="box">
				<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1745096593476js.png" mode="widthFix"
					style="width: 100%;height: 400rpx;"></image>
				<view class="br16 lh50"
					style="background-color: #fff;position: absolute;z-index: inherit;9;margin: -200rpx 2.5% 0;width: 90%;padding: 2.5%;">
					<scroll-view scroll-y="true" :style="{height:windowHeight-150+'px'}"
						bindscrolltolower="onReachBottom">
						<view class="mt60" style="">
							<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/17513627162061.png" mode="widthFix" style="width: 100%;"></image>
						</view>
						<view class="flex-around-center mt30">
							<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/17450970093401.png"
								mode="widthFix" style="width: 30%;height: 200rpx;"></image>
							<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/17450970208942.png"
								mode="widthFix" style="width: 30%;height: 200rpx;"></image>
							<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/17450970299583.png"
								mode="widthFix" style="width: 30%;height: 200rpx;"></image>
						</view>
						<view class="mt60">
							<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/17513627752552.png" mode="widthFix" style="width: 100%;"></image>
						</view>
					</scroll-view>
				</view>
			</view>
		</scroll-view>


		<scroll-view class="box" scroll-y="true" :style="{height:windowHeight+'px'}"
			v-if="index!=0&&title!='U资产体验说明'&&title != '公司概况'&&title != '运营制度'" style="margin-top: var(--status-bar-height);color: #3A3A3A;
			width: 100%;border-radius: 20rpx;">
			<view style="">

				<view class="" v-if="title=='财务保障'">
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/17486980083421.png" mode="widthFix"
						style="width: 100%;"></image>
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/17486980292982.png" mode="widthFix"
						style="width: 100%;margin-top: -10rpx;"></image>
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/17486980463233.png" mode="widthFix"
						style="width: 100%;margin-top: -10rpx;"></image>
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/17486980561044.png" mode="widthFix"
						style="width: 100%;margin-top: -10rpx;"></image>
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/17486980649665.png" mode="widthFix"
						style="width: 100%;margin-top: -10rpx;"></image>
				</view>

				<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744208567504yyjs.png" mode="widthFix"
					v-if="title=='运营介绍'" style="width: 100%;"></image>
				<view class="" v-if="title=='帮助中心'">
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1748265234666bzzx.png" mode="widthFix"
						style="width: 100%;"></image>
				</view>
				<view class="" v-if="title=='隐私政策'">
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174499210879064.png" mode="widthFix"
						style="width: 100%;"></image>
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174499231791865.png" mode="widthFix"
						style="width: 100%;margin-top: -10rpx;"></image>
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174499241856766.png" mode="widthFix"
						style="width: 100%;margin-top: -10rpx;"></image>
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174499255092367.png" mode="widthFix"
						style="width: 100%;margin-top: -10rpx;"></image>
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174499264569168.png" mode="widthFix"
						style="width: 100%;margin-top: -10rpx;"></image>
				</view>
				<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1738770228482安全保障.png" mode="widthFix"
					v-if="title=='安全保障'" style="width: 100%;"></image>
				<view class="" v-if="title=='服务协议'">
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174447768463364.png" mode="widthFix"
						style="width: 100%;"></image>
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174447778296865.png" mode="widthFix"
						style="width: 100%;margin-top: -10rpx;"></image>
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174447793773466.png" mode="widthFix"
						style="width: 100%;margin-top: -10rpx;"></image>
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174447799768467.png" mode="widthFix"
						style="width: 100%;margin-top: -10rpx;"></image>
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174447811733168.png" mode="widthFix"
						style="width: 100%;margin-top: -10rpx;"></image>
				</view>
				<view class="" v-if="title=='当前版本说明'">
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174447863431372.png" mode="widthFix"
						style="width: 100%;"></image>
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174447876277673.png" mode="widthFix"
						style="width: 100%;margin-top: -10rpx;"></image>
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174447885573874.png" mode="widthFix"
						style="width: 100%;margin-top: -10rpx;"></image>
				</view>
			</view>
		</scroll-view>
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 70,
				id: 0,
				index: null,
				title: '',
				arr: [],
				noClick: true,
				total: 0,
				pageNum: 1,
				pageSize: 10,
				video: ''
			}
		},
		onLoad(opt) {
			console.log(opt);
			this.id = opt.id
			if (opt.index) {
				this.index = opt.index
				console.log(this.index);
				// if (this.index == 0) {
				// 	// this.title = '入门攻略'
				// 	this.title = ''
				// }
				if (this.index == 1) {
					this.title = '财务保障'
				}
				if (this.index == 2) {
					this.title = '公司概况'
				}
				if (this.index == 3) {
					this.title = '运营介绍'
				}
				if (this.index == 4) {
					this.title = 'U资产体验说明'
				}
				if (this.index == 5) {
					this.title = '帮助中心'
				}
				if (this.index == 6) {
					this.title = '运营制度'
					this.operationSystem()
				}
				// this.getArr()
				return
			}

			if (opt.name) {
				this.title = opt.name
				// this.getArr1()
				return
			}



		},
		onReachBottom() {
			//判断 如果页码*页容量大于等于总条数，提示该页数据加载完毕
			if (this.pageNum * this.pageSize >= this.total) {
				return
			}
			//并且让页码+1,调用获取数据的方法获取第二页数据
			this.pageNum++
			//此处调用自己获取数据列表的方法
			this.getArr()
		},
		methods: {
			getArr() {
				let url = ''
				if (this.index == 0) {
					url = '/app/homeFunctionInfo/entryList'
				}
				if (this.index == 1) {
					url = '/app/homeFunctionInfo/safeList'
				}
				if (this.index == 2) {
					url = '/app/homeFunctionInfo/introduceList'
				}
				if (this.index == 3) {
					url = '/app/aboutUs/query'
				}
				// 
				this.$request.get({
					url: url,
					data: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
					},
					success: rsp => {
						if (this.page != 1) {
							this.arr = this.arr.concat(rsp.records)
						} else {
							this.arr = rsp.records
						}
						//将获取的总条数赋值
						this.total = rsp.total
						if (this.pageNum * this.pageSize >= this.total && this.total > this.pageSize) {
							uni.showToast({
								title: '已加载全部',
								icon: 'none'
							})
						}

					}
				})

			},
			operationSystem() {
				this.$request.get({
					url: '/app/ubiOperateVideoInfo/operationSystem',
					success: rsp => {
						this.video = rsp.data.video
					}
				})
			},

			getArr1() {
				this.$request.get({
					url: '/app/aboutUs/query',
					data: {
						id: this.id
					},
					success: rsp => {
						this.arr = rsp.data
					}
				})
			},
			toBack() {
				uni.navigateBack()
			}
		}
	}
</script>
<style scoped lang="scss">
	.top {
		width: 100%;
		height: 500rpx;
		background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174409903861872@3x.png') no-repeat;
		background-size: 100% 100%;
	}

	.bg2 {
		background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/174410046676033CC33-bg.png') no-repeat;
		background-size: 100% 100%;
		color: #ffffff;
	}

	.bg3 {
		background: #F1F1F1;
		background-size: 100% 100%;
		color: #ffffff;
	}

	.box {
		color: #3A3A3A;
	}
</style>