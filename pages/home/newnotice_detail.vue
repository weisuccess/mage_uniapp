<template>
	<view class="content">
		<!-- <narBarAndTop2 :background="'#ffffff'" :color="'#000'" :title="'资讯'"    @back="toBack()">
			     	    		 		 	
		 </narBarAndTop2> -->
		 
		 <narBarAndTop :background="'#fb4034'"  :title="'资讯'"    @back="toBack()">
		 	    		 		 	
		 </narBarAndTop>
		
		<view style="height: var(--status-bar-height);width: 100%;"></view>
		
		<view style=" background-image:  url('/static/null/fundindextop.png');
				  background-repeat: no-repeat; 
				  background-size:cover;
				background-size: 100% 100%;
				width:100vw;
				height:200rpx				
				">  
				 
				
		 </view>
				<view class="flex-column-center  mx40" style="margin-top: -90rpx; "> 
					        
						 	<view class="mt20 " style="width: 100%;background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff); border-radius: 16rpx;">
								<image v-if="list.titleImg==''" :src="news.titleImg" mode="widthFix" style="width: 95%;border-radius: 10rpx;"></image>
								<view class="fz32 fw600 mt40 px20 text-align-c" style="color: #0B0B0B;">
									{{news.title}}
								</view>
								<view  style="width: 95%;color: #909090;" class="fz26 text-align-l mt10 ml30 " >
									{{news.createTime|dateFormatW}}
								</view>
								<view class="px30" style="width:94%;margin-top: 0rpx;color: #000;font-size: 24rpx;line-height: 40rpx;padding:30rpx 30rpx ">
									<rich-text style="width:650rpx; overflow: hidden; white-space: normal; word-wrap: break-word;" :nodes="news.content|formatRichText">
										 
									</rich-text>
									
								</view>
							</view>
				</view>
		
		 
			<!-- <view class="box"> -->
			
			 
			 
	</view>
</template>

<script>
	import narBarAndTop2 from 'pages/public/narBarAndTop2.vue'
	import narBarAndTop from 'pages/public/narBarAndTop.vue'
	import MyVideo from './video.vue'
	export default {
		components: {
			narBarAndTop,narBarAndTop2,MyVideo
		},
		data() {
			return {
				list: {},
				id: 0,
				type: '',
				news:{},
				title:'资讯详情',
			}
		},
		onShow() {
		 console.log("show>>>>>>>>");
				var lang=uni.getStorageSync('locale')		 
				uni.$emit("toplang",lang);
				this.$forceUpdate();
				
				uni.$on("lang",d=>{
					 console.log("收到aaa",d);
					if(d==1)
					{
						this.switchLanguage("vi")
					}
					if(d==2)
					{
						this.switchLanguage("en")
					}
					if(d==3)
					{
						this.switchLanguage("zh")
					}
				});
		},
		onLoad(opt) {
			 
			this.id = opt.id
			
			this.type = opt.type
			if(opt.title!=null)
			  this.title=opt.title
			if(this.type!=3)
			{
				this.getList()
			}else{
				// console.log(opt.obj);
				this.news= JSON.parse(decodeURIComponent(opt.obj.replace(/%/g, '%25')));
				 
				// console.log("---",this.news);
			}
			
			// uni.$on("lang",d=>{
			// 	console.log("22222on",d);
			// 	if(d==1)
			// 	{
			// 		this.switchLanguage("vi")
			// 	}
			// 	if(d==2)
			// 	{
			// 		this.switchLanguage("en")
			// 	}
			// 	if(d==3)
			// 	{
			// 		this.switchLanguage("zh")
			// 	}
			// });
			
		},
		methods: {
			toBack() {
				uni.navigateBack({
					delta: 1, // 返回上一页					 
				});
			},
			 
			getList() {
				let url = ''
				if (this.type==1) {
					url = '/app/ubiOperateVideoInfo/query'
				}
				if (this.type==2) {
					url = '/app/industryDynamicsInfo/query'
				}
				if (this.type==3) {
					url = '/app/perspectivesInfo/query'
				}
				this.$request.get({
					url: url,
					data: {
						id: this.id
					},
					success: rsp => {
						this.list = rsp.data
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	page {
		// background-color: #e1edff;  
	}
.content {
		// background: url('/static/page-bg.png') no-repeat;
		background-size: 100% 60%;
		height: 100vh;
		color: #ffffff;
		background-color: #efefef;
		min-height: 100vh;
	}
</style>
