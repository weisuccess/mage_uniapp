<template>
	<view>
		<view class="tabbarPlaceholder"></view>
		<view class="tabbar">
		    <view class="tabbar_item" v-for="(item,index) in tabbar_list" :key="index" @click="toPage(item.url)">
		        <view class="tabbar_item_icon_box">
					<image class="tabbar_item_icon" mode="widthFix" :src="'/static/tabbar/'+ item.icon + (pageId==index?'_on':'') +'.png'"></image>
				</view>
				<view class="tabbar_item_text_box">
					<text class="tabbar_item_text" :class="pageId==index?'tabbar_item_text_on':''">{{getLg(item.title)}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
		  pageId:{
		    type:Number,
			default: 0
		  }
		},
		data() {
			return {
				oldId:uni.getStorageSync('bottomId'),
				url:uni.getStorageSync('kefu'),
				tabbar_list:[
					{
						icon:"home",
						url:"home/index",
						title:"首页"
					},
					{
						icon:"products",
						url:"products/index",
						title:"产品"
					},
					{
						icon:"fund",
						url:"fund/index",
						title:"国债"
					},
					{
						icon:"point",
						url:"point/index",
						title:"积分兑换"
					},
					{
						icon:"me",
						url:"me/index",
						title:"我的"
					}
				]
			}
		},
		methods: {
			toPage(url){
				console.log('将要跳转的页面',url);
				uni.redirectTo({
					url:"../"+url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.tabbarPlaceholder{
	width: 100%;
	height: 158rpx;
}
.tabbar{
	display:flex;
	align-items:center;
	justify-content:space-between;
	width: 100%;
	height: 158rpx;
	background: #FFFFFF;
	border-radius: 0rpx;
	position:fixed;
	bottom:0px;
	z-index:99999;
	
	&_item{
		width:20%;
		height:100%;
		
		&_icon_box{
		  margin-top:26rpx;
		  display:flex;
		  align-items:center;
		  justify-content:center
		}
		&_icon{
			width:58rpx;
			height:58rpx;
		}
		&_text_box{
		  margin-top:10rpx;
		  display:flex;
		  align-items:center;
		  justify-content:center
		}
		&_text{
			font-family: SourceHanSansCN, SourceHanSansCN;
			font-weight: 400;
			font-size: 24rpx;
			color: #D6D6D6;
			
			&_on{
				color: #D52724;
			}
		}
	}
}
</style>
