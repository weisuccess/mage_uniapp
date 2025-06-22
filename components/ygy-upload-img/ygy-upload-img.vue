<template>
	<view>
		<view class="ygy-upload-img-container">
			<view class="title" v-if="title">{{title}}</view>
			<view class="content">
				<view class="ygy-img" :style="{width:sizew+'rpx',height:sizeh+'rpx'}" v-for="(item, index) in imgList"
					:key="index" @click="perviewImg(index)">
					<image :style="{width:sizew+'rpx',height:sizeh+'rpx'}" :src="item" v-if="item&&showType==1"></image>
					<view v-if="showType==1" class="ygy-icon-close" @click.stop="handleRemove(index)">
						<text class="iconfont icon-close-circle-fill" :style="iconCloseStyle"></text>
					</view>
				</view>
				<view class="ygy-img-add" :style="{width:sizew+'rpx',height:sizeh+'rpx'}" @click="chooseImage"
					v-show="imgList.length<num">
					<image v-if="infoType==1" style="width:500rpx;height:auto;" mode="widthFix" src="/static/wallet/set/front.png"  ></image>
					<image v-if="infoType==2" style="width:500rpx;height:auto;" mode="widthFix" src="/static/wallet/set/back.png"  ></image>
					<image v-if="infoType==3" style="width:500rpx;height:auto;" mode="widthFix" src="/static/wallet/set/photo.png"  ></image>
					<image v-if="infoType==4" style="width:154rpx;height:154rpx;" mode="widthFix" src="/static/wallet/addimg.png"  ></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ygy-upload-img',
		props: {
			title: {
				required: false,
				default: "上传图片:"
			},
			num: {
				required: false,
				default: 3
			},
			showType: {
				required: false,
				default: 1
			},
			infoType:{
				required: false,
				default: 1
			},
			size: {
				required: false,
				default: 150
			},
			sizew: {
				required: false,
				default: 150
			},
			sizeh: {
				required: false,
				default: 150
			},
			iconAddStyle: {
				required: false,
				default: () => {
					return {
						fontSize: '130rpx'
					}
				}
			},
			iconCloseStyle: {
				required: false,
				default: () => {
					return {
						fontSize: '50rpx'
					}
				}
			},
		},

		data() {
			return {
				imgList: [],
				imgBase64List: []
			};
		},
		methods: {
			chooseImage() {
				
				uni.chooseImage({
					count: this.num,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: async (res) => {
						let img = await this.getImgInfo(res.tempFilePaths[0]);
						console.log(res.tempFiles[0].size+"<<<<<<<<<<");
						let newWidth=img.width;
						let newHeight=img.height;
						
						let wRate=0;
						let hRate=0;
						if(img.width>800){
							newWidth=800;
							wRate=parseFloat(img.width/800).toFixed(2);
							newHeight=parseInt(img.height/wRate);
							console.log("宽度大于800，值："+img.width+"，已设置为800,比例："+wRate+",原始高度："+img.height+",新高度："+newHeight);
						}else{
							console.log("宽度小于800，当前："+img.width);
						}
						
						if(newHeight>1024){
							let oldNewHeight=newHeight;
							let oldNewWidth=newWidth;
							newHeight=1024;
							hRate=parseFloat(oldNewHeight/1024).toFixed(2);
							newWidth=parseInt(newWidth/hRate);
							console.log("高度大于1024，值："+oldNewHeight+"，已设置为1024,比例："+hRate+",原始宽度："+oldNewWidth+",新宽度："+newWidth);
						}else{
							console.log("高度小于1024，当前："+newHeight);
						}
						// #ifdef APP-PLUS
						res.tempFilePaths[0]=await this.setImg(res.tempFilePaths[0],newWidth,newHeight);
						// #endif
						
						
						
						uni.setStorageSync('uImg',res.tempFilePaths[0])
						this.imgList.push(res.tempFilePaths[0]);
						let data = await this.detailImage(res.tempFilePaths[0]);
						this.imgBase64List.push(data);
						
						this.$emit('saveImg', this.imgBase64List);
					}
				})
			},
			perviewImg(index) {
				let urls = [];
				if (index != -1) {
					urls[0] = this.imgList[index];
				} else {
					urls = this.imgList;
				}
				uni.previewImage({
					urls: urls
				});
			},
			handleRemove(index) {
				let il = [],
					ibl = [];
				for (var i = 0; i < this.imgList.length; i++) {
					if (i != index) {
						il.push(this.imgList[i]);
						ibl.push(this.imgBase64List[i]);
					}
				}
				this.imgList = il;
				this.imgBase64List = ibl;
				this.$emit('saveImg', this.imgBase64List);
			},
			setImg(rs,newWidth,newHeight){
				return new Promise((resolve, reject) => {
					uni.compressImage({
					  src:rs,
					  quality: 80,
					  compressedWidth:newWidth,
					  compressHeight:newHeight,
					  success: res => {
						resolve(res.tempFilePath);
					  }
					})
					
				})	
			},
			getImgInfo(rs){
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
							src: rs,
							success: function (image) {
								resolve(image);
							}
					});
				})	
			},
			detailImage(path) {
				// #ifdef APP-PLUS
				return new Promise((resolve, reject) => {
					plus.io.resolveLocalFileSystemURL(path, function(entry) {
						entry.file(function(file) {
							var fileReader = new plus.io.FileReader();
							//alert("getFile:" + JSON.stringify(file));
							fileReader.readAsDataURL(file);
							fileReader.onloadend = function(evt) {
								// base64字符串
								resolve(evt.target.result);
							}
						})
					})
				})
				// #endif

				// #ifdef H5
				return new Promise((resolve, reject) => {
					uni.request({
						url: path,
						method: 'GET',
						responseType: 'arraybuffer',
						success: res => {
							let base64 = uni.arrayBufferToBase64(res.data); //把arraybuffer转成base64
							base64 = 'data:image/jpeg;base64,' + base64 //不加上这串字符，在页面无法显示的
							resolve(base64)
						},
						fail: err => {
							reject(err)
						}
					})
				})
				// #endif
			}
		}
	}
</script>

<style scoped>
	@import url("./iconfont/iconfont.css");

	.ygy-upload-img-container {
		/* margin: 5rpx; */
	}

	.title {
		margin: 15rpx 0;
		white-space: nowrap;
	}

	.content::after {
		content: '';
		display: block;
		clear: both;
	}

	.ygy-img {
		overflow: hidden;
		float: left;
		position: relative;
		height: 100rpx;
		width: 100rpx;
		margin: 5rpx;
		border: 1px solid #eee;
		border-radius: 5px;
	}


	.ygy-img-add {
		float: left;
		margin: 5rpx;
		height: 100rpx;
		width: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ygy-img-add>text {
		font-size: 80rpx;
		color: #fff;
	}

	.ygy-img>image {
		height: 100rpx;
		width: 100rpx;
	}

	.ygy-icon-close {
		width: 20rpx;
		height: 20rpx;
		position: absolute;
		right: 0rpx;
		top: 0rpx;
		color: #fa3534;
	}

	.ygy-icon-close>text {
		position: absolute;
		right: 0rpx;
		top: 0rpx;
		color: #fa3534;
	}
</style>
