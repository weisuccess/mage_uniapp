<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'我的持有'"    @back="toBack()">
	     	    		 		 	
	     </narBarAndTop>
		<!-- <view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view> -->
		<view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view>
		 
		
		
	
			<view style=" background-image:  url('/static/null/fundindextop.png'); 
					  background-repeat: no-repeat; 
					  background-size:cover;
					background-size: 100% 100%;
					width:100vw;
					height:200rpx				
					">  
					 
					
			 </view>
		<view class="flex-column-center  mx40" style="margin-top: -80rpx; letter-spacing: 2px;"> 
		        
			 	<view class="mt20" style="padding:20rpx 20rpx;width:calc(100% - 10px);background-color: #fff;border-radius: 8rpx;">
					 
					 
					 
					 <view class="flex-between-center fz24 px20" style="border-bottom:2rpx dashed #bfbfbf;margin-top: 40rpx;  padding-bottom: 20rpx;">
					 	<view>我的持有</view>
					 	<view>持有资产 </view>
					 </view>
					<view class="flex-between-start fz24 px20" style="margin-top: 40rpx; padding-bottom: 20rpx;">
						<view class="" style="width: 260rpx;height: 260rpx;">
							<qiun-data-charts
							  type="ring"
							  :opts="opts"
							  :chartData="chartData"
							/>
							</view>
					 
							
						<view style="width:320rpx;" class="">
							<view>持有资产(USDT)</view>
							<view class="mt10 fw600" style="color: #c00707;">398000</view>
							<view class="flex-between-center fz24 mt20"> 
							   <view><uni-icons class="" type="smallcircle-filled" size="15" style="color: #9153ff;"></uni-icons>
							   期货 5.53%
							   </view>
							   <view style="color: #ad0907;">22000</view>							   
							</view>
							<view class="flex-between-center fz24 mt20">
							   <view><uni-icons class="" type="smallcircle-filled" size="15" style="color: #cd3bf0;"></uni-icons>
							   债券 5.53%
							   </view>
							   <view style="color: #ad0907;">22000</view>							   
							</view>
							<view class="flex-between-center fz24 mt20">
							   <view><uni-icons class="" type="smallcircle-filled" size="15" style="color: #555cf2;"></uni-icons>
							   基金 5.53%
							   </view>
							   <view style="color: #ad0907;">22000</view>							   
							</view>
							<view class="flex-between-center fz24 mt20">
							   <view><uni-icons class="" type="smallcircle-filled" size="15" style="color: #4c98ca;"></uni-icons>
							   股票 5.53%
							   </view>
							   <view style="color: #ad0907;">22000</view>							   
							</view>
							<view class="flex-between-center fz24 mt20">
							   <view><uni-icons class="" type="smallcircle-filled" size="15" style="color: #f38005;"></uni-icons>
							   黄金 5.53%
							   </view>
							   <view style="color: #ad0907;">22000</view>							   
							</view>
						</view>
					</view> 
					 
					 
				</view>
				
				<view class="mt20" style="padding:20rpx 20rpx;width:calc(100% - 10px);background-color: #fff;border-radius: 8rpx;">
					 <view class="flex-start-center fz24 px20" style="border-bottom:2rpx dashed #bfbfbf;margin-top: 40rpx;  padding-bottom: 20rpx;">
										 	<view>我的持有(USDT)</view>
									 
					 </view>
					 <view class="flex-between-center fz24">
					 						 <view style="width: 30rpx;"> </view>
					 						 <view>项目</view>
					 						 <view>金额</view>
					 						 <view>今日收益</view>
					 						 <view>累计收益</view>
					 </view>
					 <view class="flex-between-center fz22 mt10">
						 <view class="flex-center-center " style="padding: 4rpx 6rpx;border-radius: 30rpx;width:80rpx;background-color: #9153ff;color:#412576 ;">基金</view>
						 <view  style="width:130rpx;" class="">越南VN30</view>
						 <view style="width:140rpx;" class="">10,000</view>
						 <view style="width:140rpx;color: #da4a4a;" class="text-align-c">+98</view>
						 <view style="width:140rpx;color: #da4a4a" class=" text-align-c">+98</view>
					 </view>
					 <view style="height: 30rpx;"></view>
				</view>
			   
		</view>
		
	
		
		<view class="mt50"></view>
	</view>
	
  <!-- <view class="charts-box">
    <qiun-data-charts 
      type="ring"
      :opts="opts"
      :chartData="chartData"
    />
  </view> -->
</template>

<script>
	import narBarAndTop from 'pages/public/narBarAndTop.vue' 
export default {
 components: {
 	narBarAndTop, 
 },
  data() {
    return {
      chartData: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['ring'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        rotate: false,
        rotateLock: false,
        color: ["#9153ff","#cd3bf0","#555cf2","#4c98ca","#f38005","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
       
	 
        dataLabel: false,
        enableScroll: false,
        legend: {
          show: false,
          position: "right",
          lineHeight: 25
        },
        title: {		 
          name: "资产配置图",
          fontSize: 12,
		  offsetY:11,
		  offsetX:5,
          color: "#666666"
        },
        subtitle: {
		 show: false,
          name: "70%",
          fontSize: 25,
          color: "#7cb5ec00"
        },
        extra: {
          ring: {
            ringWidth: 20,
            activeOpacity: 0.5,
            activeRadius: 0,
            offsetAngle: 4,
            labelWidth: 1,
            border: false,
            borderWidth: 1,
            borderColor: "#FFFFFF"
          }
        }
      },
	  
	  statusBarHeight: uni.getStorageSync('statusBarHeight'),
	  windowHeight: uni.getSystemInfoSync().windowHeight - 90,
	  noClick: true,
	  kong:'&ensp;',
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
	    {name:"dsfsdfa500",price:"6885.25",growrate:"-0.55"},
	   {name:"dsfsdfa500",price:"6885.25",growrate:"-0.55"},
	   {name:"dsfsdfa500",price:"6885.25",growrate:"-0.55"}
	  	
	  ],
	  user:{},
	  rate:'0%',
	  
    };
  },
  onReady() {
    this.getServerData();
  },
  methods: {
	toBack() {
		uni.navigateBack()
	},
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
            series: [
              {
                data: [{"name":"一班","value":50,"labelShow":false},{"name":"二班","value":30,"labelShow":false},{"name":"三班","value":20,"labelShow":false},{"name":"四班","value":18,"labelShow":false},{"name":"五班","value":8,"labelShow":false}]
              }
            ]
          };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
  }
};
</script>

<style scoped>
  /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
  .charts-box {
    width: 300rpx;
    height: 300rpx;
	background-color: red;
  }
  
  
  page {
  		background-color: #e7e9e9;
  		 height: 100vh;
  		  overflow: auto;
  	}
  	 
  .content {
      
  	  
  	    top: 0;
  	  left:0;
  	  //  z-index:0;
  	   position: absolute;
  	  width: 100vw;
  	 
  	  
   
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