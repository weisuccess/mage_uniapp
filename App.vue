<script>
	export default {
		globalData: {
			showPopIndex: 2,
			windowHeight: uni.getSystemInfoSync().windowHeight,
			// index: 0
		},
		// mixins: [pageAnimation],
		onLaunch: function() {
			// uni.loadFontFace({
			//   family: 'Senegal',
			//   source: 'url("/static/nullmage1116.oss-cn-hongkong.aliyuncs.com/res/Senegal.ttf")',
			//   success() {
			//       console.log('success')
			//   }
			// })
			// uni.loadFontFace({
			//     global: true, // 是否全局生效
			//     family: 'Senegal', // 定义的字体名称
			//     source: 'url("/static/null/Senegal.ttf")', // 字体资源的地址。建议格式为 TTF 和 WOFF，WOFF2 在低版本的iOS上会不兼容。
			//     success() {
			//       console.log('成功的回调函数')
			//     },
			//     fail(){
			//       console.log('失败的回调函数')
			//     },
			//     complete(){
			//       console.log('接口调用结束的回调函数（调用成功、失败都会执行）')
			//     }
			//   })
			
			 
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
		 font-family: 'OPPOSans';
		 letter-spacing: 1px;
		 font-size: 24rpx;
		width: 100%;
		overflow-x: hidden;
		background-color: #eceded;
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