<template>
	<iframe :onload="onloadCode" scrolling="no" style="width:100%;height:100%;border:1px solid #fff;background: #000;"></iframe>
</template>
<script>
	export default {
		props: {
			src: {}
		},
		data() {
			return {
				onloadCode: ''
			}
		},
		created() {
			this.onloadCode =
				`this.contentWindow.document.body.innerHTML = '<video style="width: 100%;height: 100%" autoplay="true" controls="controls" src="${this.src}"></video>';`
		},
	}
</script>
<style lang="scss">
</style>