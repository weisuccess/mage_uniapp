<script>
	export default {
		globalData: {
			showPopIndex: 2,
			windowHeight: uni.getSystemInfoSync().windowHeight,
			// index: 0
		},
		// mixins: [pageAnimation],
		onLaunch: function() {
			console.log('App onLaunch')
			if (!uni.getStorageSync('index')) {
				uni.setStorage({
					key: 'index',
					data: 0
				})
			}
			uni.getSystemInfo({
				success: function(info) {
					// iOS下，导航栏高度为44，状态栏高度为20
					let statusBarHeight = info.platform === 'android' ? info.statusBarHeight : (info
						.statusBarHeight + 44);
					uni.setStorageSync('statusBarHeight', statusBarHeight)
				}
			});
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onHide: function() {
			// uni.setStorageSync('showNotice',-1);
			console.log('App Hide')
		},
		onUnload() {
			console.log('App unload')
			uni.setStorageSync('showNotice', -1);
		}
	}
</script>

<style lang="scss">
	@import "static/css/font.css";
	@import "static/css/oscss.css";
	@import "static/css/grid.scss";
	@import "uview-ui/index.scss";

	button:after {
		border: none;
	}

	/*每个页面公共css */
	page {
		width: 100%;
		overflow-x: hidden;
		background: #FFFFFF;
		color:#333;
		-webkit-user-drag: none
			/* 禁止用户拖拽 */
		;
	}

	.main {
		margin-top: 30rpx;
		padding: 0rpx 30rpx;
		overflow-x: hidden;
		-webkit-user-drag: none;
		/* 禁止用户拖拽 */
		;
	}

	.safe {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: content-box;
	}

	// view{
	// 	color:#000000;
	// }
</style>