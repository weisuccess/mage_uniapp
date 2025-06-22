<template>
	<view class="content">
		<narBar :title="getLg('方式一')" @back="toBack()"></narBar>
		<view class="main">
		<view style="width: 750rpx;text-align: center;padding-top: 60rpx;font-size: 40rpx;">
			{{tit}}</view>
			<view style="color: #8d8d8d;padding-bottom: 120rpx;padding-top: 15rpx;
			text-align: center;width: 750rpx;">{{nub}}</view>
		<view @click="moveUp(0)" class="flex-column-start"  style="padding-left: 80rpx;">
			
			<view class="flex-row-start" style="height: 80rpx;padding-left: 23rpx;">
				<view style="margin-right: 65rpx;font-size: 60rpx;" v-for="(x,i) in codeList" :key="i" >{{x}}</view>
				<view class="move-inpt" v-show="codeList.length<6" style="width: 3rpx;height: 50rpx;background-color: #FFFFFF;color:#FFFFFF;margin-left: 13rpx;">
					
				</view>
			</view>		
			
			<view class="flex-row-start" >
				<view style="margin-right: 25rpx;" :class="x==codeList.length?'input-code':'code'"  v-for="x in [0,1,2,3,4,5]" :key="x" ></view>
			</view>
		</view>
		<!-- 键盘 -->
		<view :animation="animationData"  style="background-color: #000000;position: fixed;bottom: 0;width: 750rpx;
		height: 500rpx;z-index: 10;" class="flex-column-around">
			<view class="flex-row-around flex-wrap">
				<view @click="nup(x)" class="flex-row-center num-int" v-for="x in [1,2,3,4,5,6,7,8,9]" :key="x" style="background-color: #000000;">
					{{x}}
				</view>
				<view @click="backNup" class="flex-row-center num-int" style="background-color: #000000;">
					←
				</view>
				<view @click="nup(0)" class="flex-row-center num-int" style="background-color: #000000;">
					0
				</view>
				<view @click="moveUp(500)" class="flex-row-center num-int" 
				style="background-color: #000000;color: #F1F1F1;">
					X
				</view>
			</view>
		</view>
		</view>
	</view>
</template>
<script>
const l=uni.getSystemInfoSync().screenWidth/750 
import narBar from 'pages/public/narBar.vue'
export default {
	components: {
		narBar
	},
	data() {
		return {
			tit:"请输入收到的验证码",
			nub:"已发送验证码",
			fwMes:"",
			fwCl:"#555555",
			codeList:[],
			animationData:{}
		}
	},
	onLoad() {
	},
	methods: {
		// 移动自定义数字键盘
		moveUp(x){
			console.log(x)
			 var animation = uni.createAnimation({
			      duration: 500,
			        timingFunction: 'ease',
			    })
			
			    this.animation = animation
				// 用px解决手机端失效问题
			    animation.translateY(x*l).step()
			
			    this.animationData = animation.export()
		},
		// 对应输入法删减最后一个数字
		backNup(){
			if(this.codeList.length>0){
				this.codeList.pop()
			}	
		},
		// 清除验证码
		clearCode(){
			this.codeList=[]
		},
		// 输入6个数字之后自动校验验证码
		nup(i){
			if(this.codeList.length<6){
				// 小于6个会填写验证码
				this.codeList.push(i)
				// 如果填写后等于6个会触发验证
				if(this.codeList.length==6){
					var codePl=""
					// 拿到验证码
					this.codeList.forEach((x)=>{
						codePl+=x+""
					})
					this.tit="正在进行验证..."
					this.fwCl="#a1a1a1"
					// 这里写业务逻辑
					
					
				}
			}
									
		},
		toBack(){
			uni.redirectTo({
				url:'/pages/eco/paypwd'
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

	 .flex-column-center{
		 display: flex;
		 flex-direction: column;
		 justify-content: center;
		 align-items: center;
	 }
	 .flex-column-between{
	 		 display: flex;
	 		 flex-direction: column;
	 		 justify-content: space-between;
	 		 align-items: center;
	 }
	 .flex-column-start{
	 		 display: flex;
	 		 flex-direction: column;
			 justify-content: center;
	 }
	 .flex-column-around{
	 		 display: flex;
	 		 flex-direction: column;
			 justify-content: space-around;
			 align-items: center;
			 
	 }
	 .flex-row-start{
	 		 display: flex;
	 		 flex-direction: row;
	 		 align-items: center;
	 }
	 .flex-row-around{
	 		 display: flex;
	 		 flex-direction: row;
	 		 justify-content: space-around;
	 		 align-items: center;
	 }
	 .flex-row-center{
	 		 display: flex;
	 		 flex-direction: row;
	 		 justify-content: center;
	 		 align-items: center;
	 }
	 .flex-row-between{
	 		 display: flex;
	 		 flex-direction: row;
	 		 justify-content: space-between;
	 		 align-items: center;
	 }
	 .move-inpt{
	 	animation:inpt 0.6s ease;
	 	animation-iteration-count:infinite;
	 	animation-direction:alternate;
	 }
	 .input-code{
	 	width: 75rpx;
	 	height: 4rpx;
	 	background-color: #616161;
	 	/* 定义名为bigt动画,0.6秒完成 ease为先减速再加速再减速的缓动运动 */
	 	animation:bigt 0.6s ease;
	 	/* 动画次数,infinite为一直重复 */
	 	animation-iteration-count:infinite;
	 	/* 定义动画重复时的运动方向,alternate为反向运动 */
	 	animation-direction:alternate;		
	 }
	 /* 动画实际操作 */
	 @keyframes bigt
	 {
	 	/* {}里为组件属性 */
	 from {opacity:1;}
	 to {opacity:0.5;}
	 }
	 @keyframes inpt
	 {
	 from {opacity:1;}
	 to {opacity:0;}
	 }
	 .code{
	 	width: 75rpx;
	 	height: 1rpx;
	 	background-color: #a7a7a7;
	 }
	 .num-int{
	 	width: 215rpx;
	 	margin-top: 20rpx;
	 	height: 100rpx;
	 	background-color: #e7e7e7;
	 	border-radius: 10rpx;
	 	font-size: 40rpx;
	 }
	 .flex-wrap {
	 	flex-wrap: wrap;
	 }
</style>