<template>
	
	<view class="content">
	      
		<!-- <view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view> -->
		<view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view>
		 
		
		
	
			<view style=" background-image:  url('/static/null/fundindextop.png'); 
					  background-repeat: no-repeat; 
					  background-size:cover;
					background-size: 100% 100%;
					width:100vw;
					height:200rpx				
					">  
				 <view class="text-align-c fz32" style="color: #fff;;">国际行情</view>
					
			 </view>
		<view class="flex-column-center  mx40" style="margin-top: -70rpx; "> 
		        
			 	<view class="mt20" style="width: 100%;background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff);border-radius: 16rpx;">
					<view  class="flex-center-center fz28 mt20 fw600">
						<view class=" text-align-c" style="flex:1">名称</view>
						<view class=" text-align-c" style="flex:1">最新价</view>
						<view class=" text-align-c" style="flex:1">涨跌幅</view>
					</view>
					
					<view :class="['xhx', { 'last-item': index === gupiaoArr.length - 1 }]"  v-for="(item,index) in gupiaoArr"   class="flex-center-center  fz24 fw400 " style="padding: 25rpx 0;border-bottom: 1rpx solid #c5c5c5;">
					 
							 
					<view class="  text-align-c" style="flex:1">{{item.name}}</view>
					<view class="  text-align-c" style="flex:1;color: #ff0000;">{{item.close}}</view>
					<view class="  text-align-c " style="flex:1;color: #ff0000;">{{(item.close-item.open)|toFixed2}}</view>
					  
					</view>
					
				</view>
		</view>
		
	
		
		<view class="mt50"></view>
	</view>
	 
</template>

<script>
 
import narBarAndTop from 'pages/public/narBarAndTop.vue' 
	export default {
		components: {
			narBarAndTop, 
		},
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 90,
				noClick: true,
				piclist: [
					 
				],
				zilist:[
					
				],
				loginInfo:{},
				pageNum: 1,
				pageSize: 10,
				total: 0,
				myLevel:0,
				list:[
				  {name:"test1",price:"6885.25",growrate:"-0.55"},
				 {name:"test2",price:"6885.25",growrate:"-0.55"},
				 {name:"test3",price:"6885.25",growrate:"-0.55"}
					
				],
				user:{},
				rate:'0%',
				 token:'cbde3fc541c543e98e8432c763fcb6a2',
				gupiaoArr:[],
				inter1:null,
			};
		},
		onLoad() {
			 //this.getUser();
			// this.shangZhengZhiShu('399292',1)
			 // this.shangZhengZhiShu('399292',1)
			 
		},
		onUnload(){
			//uni.$off("lang");
			clearInterval(this.inter1)
			this.inter1=null
		},
		onHide() {
			clearInterval(this.inter1)
			this.inter1=null
		},
		onShow() {
			this.gupiaoArr=[]
		 
			
			this.inter1=setInterval(() => {
				this.gupiaoArr=[]
			        this.getstockList()
								  
			}, 200000);
			this.pageNum = 1
			 this.getstockList()
			 
		},
		methods: {
			getstockList()
			{
				this.gupiaoArr=[]
					this.$request.get({
						url: "/Ali/stockList",
						data: {
							size: 5 
						},
						success: res => {							 
						 
						 
						 for (var i = 0; i < res.data.length; i++) {
						 	var temp= res.data[i];
							if(temp!=null)
							{
								 console.log('ok');
								 temp.a1=temp.close-temp.low
								  temp.a2=temp.close-temp.high

								  temp.name=temp.name
								 this.gupiaoArr.push(temp)
							}
						 }
							
						
						
						
						
						
						
						
						
						
						
						
						 }});
			},
			 
			all(){
				
				var url="https://www.tsanghi.com/api/fin/index/CHN/list?token=cbde3fc541c543e98e8432c763fcb6a2";
				
			 
				uni.request({
									url:url , // 请求地址
									method: 'GET', // 请求方式
									success: (res) => { 
									 
									  console.log(res.data.data);
										 var arr1=res.data.data;
										var arr2= arr1.sort(() => Math.random() - 0.5);
										 
										var arr=arr2.slice(1,10);
										 console.log(arr);
										 
										 for (var i = 0; i < arr.length; i++) {
										 	//console.log(ob[i].ticker);
										 	 this.shangZhengZhiShu(arr[i].ticker,arr[i].name)
										 }
										 
										  
									},
									fail: (err) => {
										console.error('请求失败:', err); // 请求失败后的处理
									}
								});	



				return;
				for (var i = 0; i < ob.length; i++) {
					//console.log(ob[i].ticker);
					 this.shangZhengZhiShu(ob[i].ticker,ob[i].name)
				}
				
				 
				
				 
				
				this.$forceUpdate();
			},
			
			shangZhengZhiShu(code,name){
				var url=`https://www.tsanghi.com/api/fin/index/CHN/daily/realtime?token=${this.token}&ticker=${code}`;
				console.log(url);
				uni.request({
					url:url , // 请求地址
					method: 'GET', // 请求方式
					success: (res) => { 
					var temp= res.data.data[0];	
					  console.log(temp);
						 if(temp!=null)
						 {
							 console.log('ok');
							 temp.a1=temp.close-temp.low
							  temp.a2=temp.close-temp.high
						 
							  temp.name=name
							 this.gupiaoArr.push(temp)
						 }
						 
						 
						 // this.SZstock.a1=this.SZstock.close-this.SZstock.low
						 //  this.SZstock.a2=this.SZstock.close-this.SZstock.high
						 // var grow=(temp/this.yesterdayPrice1)*100						 
						 //  this.SZstock.grow=grow.toFixed(2)+'%'
						 // this.SZstock.close=this.SZstock.close.toFixed(2);
						 
						  
					},
					fail: (err) => {
						console.error('请求失败:', err); // 请求失败后的处理
					}
				});
				
			},
		 
			 
			getUser() {
				this.$request.get({
					url: "/app/dreamUserInfo/getUser",
					success: rsp => {
						this.user = rsp.data
						console.log(this.user);
						
						this.vip_nexexperience=this.user.nextvipGradeInfo.vipExperience;
						
						this.vip_remainnexexperience=this.user.nextvipGradeInfo.vipExperience-this.user.investmentAmount;
					
						this.vip_progress=1-(this.vip_remainnexexperience/this.user.nextvipGradeInfo.vipExperience);
						this.myLevel=this.user.vipGradeInfo.id;
					
					if(this.myLevel>=1)
					  this.rate=this.zilist[this.myLevel-1].rate						 
					}
				})
			},
			getList() {
				this.$request.get({
					url: "/app/vipGradeInfo/List",
					success: rsp => {
						this.list = rsp.data
						 
					}
				})
			},
			toBack() {
				uni.navigateBack()
			},
		}
	};
</script>
 
<style lang="scss" scoped>
	
	page {
			background-color: #e7e9e9;
			 height: 100vh;
			  overflow: auto;
		}
		 .xhx{
		 		
		 		border-bottom: 1rpx solid #c5c5c5;
		 	} 
		 	.last-item {
		 	  border-bottom: none !important;
		 	}
	.content {
	    
		   
		    top: 0;
		  left:0;
		  //  z-index:0;
		   position: absolute;
		  width: 100vw;
		  height: 100vh;
		  
	 background-color: #e7e9e9;
	}
	.k {
		 
		// background: url('https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744290610523bg.png') no-repeat;
		
		 
		 
		width: 100%;
		background-color: #ffffff;
		background-size: 100% auto;
		// background-color: #f1f1f1;
		  display: flex;
		  flex-direction: column;
		// padding-bottom: 60rpx;
		// margin: 60rpx 2.5%;k
	
	}
	.topbg{
	 
	
	    
	  
	 //    background-size: cover; /* 背景图片覆盖整个容器 */
	 //    // background-position: right top; /* 图片在容器的右侧和垂直居中 */
		// background-size: 100% 100%;
	 //   // z-index:0;
		// background-size: 100% 100%;
		// background-size:cover;
		// // height: 100rpx;
		// margin-top: 160rpx;
		// padding: 0;
		  
	}
	.bg1{
		background-image:  url('/static/null/menub1.png') ;
		background-repeat: no-repeat;
		  background-size:cover;
		background-size: 100% 100%;
	}
	.bg2{
		background-image:  url('/static/null/menub2.png') ;
		background-repeat: no-repeat;
		background-size:cover;
		background-size: 100% 100%;
	}
	.xht1 {
		background-image:  url('https://vp09029.oss-cn-hongkong.aliyuncs.com/vgui/vipbg2.png') ;
	 
		  background-repeat: no-repeat;
		// background-size:cover;
		background-size: 100% 100%;
		width:calc(100% - 26px);
		 
		}
	.quan{
			border-bottom: 2rpx solid #c5c5c5;
			margin:30rpx;
			
			background-color: #ffffff;
			border-radius: 22rpx;
		}
	.w20 {
		width: 25%;
		text-align: center;
	}

	.box {
		width: 100%;
		border-bottom: 1px solid #b8b8b8;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 20rpx 0;
		color: #5E5959;
		font-size: 20rpx;
		color: #434040;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-around;
		color: #fff;
		padding: 15rpx 0;
		border-bottom: 1px solid #b8b8b8;
		font-size: 24rpx;
		background: url('/static/me/sczc-bg.png') no-repeat;
		background-size: 100% 100%;
	}

	.bg-fff {
		background: url("https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744713194215bg1.png");
		background-size: 100% 100%;
	}

	.bg-green {
		background: url("https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1744713201037bg2.png");
		background-size: 100% 100%;
	}
</style>