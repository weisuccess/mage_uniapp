<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="urlStr"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				urlStr: "http://shop.eber.vip/h5/index.html",
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onLoad(e) {
			if (e != null && e != '' && e != undefined && e.url != null && e.url != "") {
				this.urlStr = e.url
			}
		}
	}
</script>