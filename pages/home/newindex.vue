<template>
	
	<view class="content">
	 
		<view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view>
		 
 
		<view style=" background-image:  url('/static/null/menu1.png'); 
		  background-repeat: no-repeat; 
		  background-size:cover;
		background-size: 100% auto;
		width:100vw;
		
		"> 
 <!--  -->
					<view class="flex-column-start-center " style="width:calc(100vw - 0px);margin-left: 0rpx;padding-top: 30rpx;">
						<view class="" style="width:calc(100vw - 60px);">
							<view class="flex-start-center" style="width: 660rpx;border-radius: 50rpx;padding: 0rpx;border: 1px solid #dadada;">
								<uni-icons type="sound" style="margin-left: 20rpx;color: #fff;" size="20"></uni-icons>
								 <view style="width: 660rpx; position: relative;height:45rpx;" class="">
									 <uni-notice-bar :speed="30" single scrollable :text="notice" background-color="transparent"
									 	color="#fff" style="position: absolute;top: 50%; left: 50%; transform: translate(-50%, -50%); height: 80rpx;width: 100%;"  ></uni-notice-bar>
								 </view>
								
							</view>
							 
							 
						</view>
						<view class="mt30" style="width:calc(100vw - 0px);">
							<view class="flex-between-center mx70">
								
								
								<view @click="openGuanWang()" class="flex-column-center">
																  <image src="/static/null/menu_a1.png"	style="width: 100rpx;" mode="widthFix" /> 
																
																  <view  class="color-fff">官网</view>
								</view>
							  
							  <view @click="openQiandao()" class="flex-column-center">
							  								  <image src="/static/null/menu_a3.png"	style="width: 100rpx;" mode="widthFix" /> 
							  								
							  								  <view  class="color-fff">每日签到</view>
							  </view>
							<view @click="openGongGao()" class="flex-column-center">
										  				  <image src="/static/null/menu_a2.png"	style="width: 100rpx;" mode="widthFix" /> 
										  				
										  				  <view class="color-fff">公告</view>
										  			  </view>			  
									
							 <view @click="openHQB()" class="flex-column-center">
							 			  				  <image src="/static/null/menu_a4.png"	style="width: 100rpx;" mode="widthFix" /> 
							 			  				
							 			  				  <view class="color-fff">活期宝</view>
							 			  			  </view>
								<view @click="openGuid()" class="flex-column-center">
											  				  <image src="/static/null/menu_a3.png"	style="width: 100rpx;" mode="widthFix" /> 
											  				
											  				  <view class="color-fff">新手指南</view>
											  			  </view>	
							</view>
						</view>
					 
							
				 </view>
				 <view class="flex-center-start" style="margin-top:20rpx;">
				 
					     <swiper circular autoplay style="height: 352rpx;width:90%;margin: 20rpx 5%;">
							<swiper-item v-for="(item1,index1) in lbtList" :key="index1">
								<image :src="item1.imgUrl" mode="scaleToFill" class="br10" style="height: 100%;width:100%;">
								</image>
							</swiper-item>
						</swiper>
					   
				 	 <!-- <image @click="toLiChai()" src="/static/null/menubtn1.png"	style="width: 300rpx;" mode="widthFix" /> -->
				  </view> 
			 <!-- <view class="" style="padding-top: 300rpx;"></view> -->
		</view>
	 
		<view class="flex-column-start mx40" style=" border-radius: 8rpx;background-color: #ffffff;padding: 30rpx 20rpx;margin-top: 20rpx;" >
					 <view class="fw600 fz34">今日行情</view>
					 
					 <view class="flex-between-center mt20 ">
						 <view class="flex-column-center fw400 " style="height: 115rpx;border-radius: 8rpx;
						 background-image:  url('/static/null/gbg.png'); 
						 		  background-repeat: no-repeat; 
						 		  background-size:cover;
						 		background-size: 100% 100%;
						 width:170rpx ;padding: 20rpx 20rpx;">
							 <view class="fw600 fz26">上证指数</view>
					<view class="fw600 mt10 color-ef0304">{{this.threeSock1.close|toFixed2}}</view> 
					<view class="fz20 flex-between-center px10" style="width: 90%;">
						<view style="color: #ef0304;">{{this.threeSock1.a1|toFixed2}}</view>  <view   style="margin-left: 5rpx;color: #00aa00;">{{this.threeSock1.a2|toFixed2}}</view> 
					</view>
						 </view>
						  <view class="flex-column-center  " style="height: 115rpx;border-radius: 8rpx;
						   background-image:  url('/static/null/gbg.png'); 
						  				 		  background-repeat: no-repeat; 
						  				 		  background-size:cover;
						  				 		background-size: 100% 100%;
						  width:170rpx ;padding: 20rpx 20rpx;">
						  					 <view class="fw600 fz26">深圳指数</view>
											 
						  				<view class="fw600 mt10 color-ef0304">{{this.threeSock2.close|toFixed2}}</view>
										<view class="fz20 flex-between-center px10" style="width: 90%;">
											<view style="color: #ef0304;">{{this.threeSock2.a1|toFixed2}}</view>  
											<view  style="margin-left: 5rpx;color: #00aa00;">{{this.threeSock2.a2|toFixed2}}</view> 
										</view>
											 
											 
											 
						  </view>
						  <view class="flex-column-center fw400 " style="height: 115rpx;border-radius: 8rpx;
						   background-image:  url('/static/null/gbg.png'); 
						  				 		  background-repeat: no-repeat; 
						  				 		  background-size:cover;
						  				 		background-size: 100% 100%;
						  width:170rpx ;padding: 20rpx 20rpx;">
						  					 <view class="fw600 fz26">香港恒生指数</view>
						  					 <view class="fw600 mt10 color-ef0304">{{this.threeSock2.close}}</view>
						  					<view class="fz20 flex-between-center px10" style="width: 90%;">
											<view style="color: #ef0304;">{{this.threeSock3.a1|toFixed2}}</view>  
											<view  style="margin-left: 5rpx;color: #00aa00;">{{this.threeSock3.a2|toFixed2}}</view> 
										</view>
						  </view>
					 </view>
				</view>	
		<view class="flex-center-center mt20" style="width:100vw;" >
									<view class="flex-center-center" style="border: 2px solid #e4f0fe;">	
										<MyVideo v-if="companyArr[0].video && playvideo" :src="companyArr[0].video"
																		style="width: 680rpx; height: 390rpx; border-radius: 10rpx;"></MyVideo>						
																
										<!-- <video  v-if="companyArr[0].video"
										id="myVideo"
										:src="companyArr[0].video"
										controls="true"
										:autoplay="autoplay"
										 :loop="loop"
										:direction="direction"
										style="width: 680rpx; height: 390rpx;"
										>
										</video> -->
									</view>	 
										
										 
					</view>
		 
		<view class="flex-column-center  mx40 px30" style="border: 2rpx solid #ffffff;; margin-top: 15rpx;border-radius: 10rpx; background: linear-gradient(135deg, #fcedb4, #f79369, #f8a38f);">
			 <view class="flex-between-center mt20" style="width: 100%;">
			 	<view class="color-ffff" style=" font-family: 'NotoSansHans-Bold';"><text class="fz36" style="color: #ef0304;">股神</text><text class="fz36">·训练营</text></view>
			 	<view class=" color-ffff fz24" @click="explan()">{{txtState}}</view>
			 </view>
			 <view v-if="isOpen"  class="flex-between-center my30" style="border-radius: 10rpx;color: #000000;width: 100%; ">
			 	<view style="line-height: 40rpx;height: 240rpx;border-radius: 10rpx;;flex:1;margin-left: 10rpx;background-color: #fff;" class="bg2 pd20 flex-column-start"> 
			 						<view class="my30 fz32 fw600" style="width: 260rpx;font-family: 'NotoSansHans-Bold';">最新资讯</view>
			 						
			 						<view st @click="openlastnews(item)" v-for="(item,index) in lastnews" class="fw400 fz26 mt10 ellipsis " style="font-family: 'NotoSansHans-Bold';width: 260rpx;"><text class="fw600" style="color:#ef0304; ;">
			 						{{index+1}}.</text> {{item.title}}
			 						</view>
			 						 
			 					</view>
			 	<view style="line-height: 40rpx;height: 240rpx;border-radius: 10rpx;;flex:1;margin-left: 20rpx;background-color: #fff;" class="bg2 pd20 flex-column-start"> 
					<view class="my30 fz32 fw600" style="font-family: 'NotoSansHans-Bold';width: 260rpx;">热门产品</view>
				 
					<view v-for="(item,index) in hotlist" @click="openchanping(item)" class="fz26 mt10 ellipsis fw400" style="font-family: 'NotoSansHans-Bold';width: 260rpx;"><text class="" style="color:#ef0304; ;">
					{{index+1}}.</text> {{item.title}}
					</view>
					 
				</view>
			 	 
			 </view>
		 </view>
		<view class="flex-column-center   px30" style="width: 700rpx;margin-top: 15rpx;">
			<view class="flex-start-center mt20 " style="font-family: 'NotoSansHans-Bold';width: 100%;">
				<image src="/static/null/menufire.png"	style="width: 40rpx;margin-left: 0rpx;" mode="widthFix" /> 
				<view class="fw600 fz32 ml20">热点资讯</view>
			</view>
			 
			<view v-for="(item,index) in hynews" @click="openHotNews(item)" class=" flex-start-center mt20" style="border-radius: 6rpx;background-color: #ffffff;padding:10rpx 10rpx;width: 93%;">
				 				
				<image :src='item.titleImg'  style="width: 150rpx;height: 100rpx;" mode="aspectFill" />
				 
				<view class=" px20" style="line-height: 50rpx; margin-left: 20rpx;">
					<view class="fz26 fw500 ellipsis" style="font-family: 'NotoSansHans-Bold';width: 430rpx;">{{item.title}}</view>
					<!-- <text class="fz26">{{item.content}}</text> -->
					<!-- <u-parse :content="item.content" class="fz24 ellipsis"></u-parse> -->
					<view class="fz20">
						{{item.createTime|dateFormat}}
					</view>
				</view>
				 
			</view>
		</view>
		
		 <view class="" style="height:200rpx;">
					 
				 </view>
				 
		<uni-popup ref="popGG" style="margin-top: 150rpx;" @safe-area=true >
			
			
 
										   <view class="ml30"
														style="width: 94vw;height: 900rpx;
														background-image:  url('/static/null/ggbg.png'); 
																						  background-repeat: no-repeat; 
																						  background-size:cover;
																						background-size: 100% 100%;
														
														;  border-radius: 16rpx;padding:80rpx 0;position: relative;">
														<view class="" style="width: 650rpx;;height: 600rpx;margin: 230rpx 80rpx 10rpx 20rpx; ">
															
				 <view class="text flex-center-center fw600 " style="font-size: 58rpx;color: #000;">公告</view>
					 <view class="text flex-center-center fw600 " style="font-size: 32rpx;color: #000;">Announcement</view>									
														
														 
					<scroll-view class="" scroll-y="true" style="height: 500rpx;margin-top: 20rpx;" >									 
				 <view class="flex-column-center-center fz40 " >
							<image v-if="ggnews.titleImg==''" :src="ggnews.titleImg" mode="widthFix" style="width: 95%;border-radius: 10rpx;"></image>
							<view class="px30" style="width:94%;margin-top: 0rpx;color: #000;font-size: 24rpx;line-height: 35rpx;padding:30rpx 30rpx ">
							<rich-text style="width:700rpx; overflow: hidden; white-space: normal; word-wrap: break-word;" :nodes="ggnews.content|formatRichText">
								 
							</rich-text>
							</view>
							
					</view>
					</scroll-view>
					
					<view class="flex-center-center px40 mt30">
					 										 
					<view  @click="ggclose"  style="font-size: 22rpx;padding: 10rpx 100rpx;background-color: #df332a;
														border-radius: 4rpx;color:#fff;">我知道了</view>
					</view>
	</view>
					 
				</view>
						  
						  
						  
			 </uni-popup>		 
		
	</view>
	 
</template>

<script>
	import narBar from 'pages/public/narBar.vue' 
	import videoVue from './video.vue';
		import MyVideo from './video.vue'
	export default {
		components: {
			narBar, MyVideo
		},
		data() {
			return {
				show:true,
				isOpen:true,
				txtState:'收起',
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 90,
				noClick: true,
				notice: '',
				guanwang:'',
				companyArr: [2],
				autoplay:true,
				videoContext:null,
				loop:true,
				 direction:90, 
				 videoIndex: 1,
				 hotlist:[],
				 hynews:[],
				 lbtList:[],
				 lastnews:[],
				 SZstock:{},
				 SengZstock:{},
				 XiangGstock:{},
				 Yesterday:'',
				 
				 yesterdayPrice1:null,
				 yesterdayPrice2:null,
				 yesterdayPrice3:null,
				 token:'cbde3fc541c543e98e8432c763fcb6a2',
				 inter1:null,
				 inter2:null,
				 inter3:null,
				 ggnews:{},
				 threeSock1:{},
				 threeSock2:{},
				 threeSock3:{},
				 updateremark:'',
				 playvideo:true,
			};
		},
		onReady() {
			this.videoContext  = uni.createVideoContext('myVideo',  this)
			 
			   //this.shangZhengZhiShuYesterday();
			   // this.sengZhengZhiShuYesterday();
			   
			   // this.XiangGangZhiShuYesterday();
			   
			   
			   this.gongao();
			   
		},
		onLoad() {		
			 
		    
			 
			
		},
		onHide() {
			  this.playvideo=false;
			this.show=false;
			this.videoContext  && this.videoContext.pause() 
		},
		onUnload(){
			 this.playvideo=false;
			//uni.$off("lang");
			this.videoContext  && this.videoContext.pause() 
		},
		onShow() {
			
			 this.playvideo=true;
			  this.getHotUpdate();
			
			 // #ifdef APP
						  this.getHotUpdate();
						 // #endif
			 console.log('showaaa');
			 this.show=true;   
			
           // this.videoContext  &&  this.videoContext.play()
			

			this.pageNum = 1
			this.getNotice()
			   this.companyAdvantagesInfo()
			   this.lbt();
			this.getNewsList();
			this.getLastNewsList();
			this.hotgetList();
			this.getstockList();
			
		},
		methods: {
			getstockList()
			{
				this.gupiaoArr=[]
					this.$request.get({
						url: "/Ali/threestockList",
						data: {
							size: 5 
						},
						success: rsp => {							 
						 
						 
						 for (var i = 0; i < rsp.data.length; i++) {
						 	 var temp= rsp.data[i];
							 if(temp!=null)
								{
									 console.log('ok');
									 temp.a1=temp.close-temp.low
									  temp.a2=temp.close-temp.high
				 
									  temp.name=temp.name
									 
									 if(i==0)
										 this.threeSock1=temp
									if(i==1)
										 this.threeSock2=temp
								    if(i==2)
								    	 this.threeSock3=temp
								}
						 }
						 console.log(this.threeSock1);
						 console.log(this.threeSock2);
						 console.log(this.threeSock3);
						 
						 
			// 			 for (var i = 0; i < res.data.length; i++) {
			// 			 	var temp= res.data[i];
			// 				if(temp!=null)
			// 				{
			// 					 console.log('ok');
			// 					 temp.a1=temp.close-temp.low
			// 					  temp.a2=temp.close-temp.high
			
			// 					  temp.name=temp.name
			// 					 this.gupiaoArr.push(temp)
			// 				}
			// 			 } 
						 }});
			},
			gongao(){
				this.$request.get({
					url: "/app/ganggao/list",
					data: {
						pageNum: 1,
						pageSize:1,
					},
					success: rsp => {							 
						 console.log("===============");
						console.log(rsp.records);
						if(rsp.records.length>0)
						this.ggnews=rsp.records[0]
						
						this.$refs.popGG.open('top')
					 }});
			},
			ggclose(){
				this.$refs.popGG.close()
			},
			openGongGao(){
				uni.navigateTo({
											 
					 url: '/pages/home/gonggao'
				 })	
			},
			openChaiWu(){
				uni.navigateTo({
							 
									url: '/pages/me/chaiwu'
								})	
			},
			 
			 
			shangZhengZhiShu(){
				var url=`https://www.tsanghi.com/api/fin/index/CHN/daily/realtime?token=${this.token}&ticker=000001`;				 
				uni.request({
					url:url , // 请求地址
					method: 'GET', // 请求方式
					success: (res) => { 
						this.SZstock=res.data.data[0];	
							 console.log('结果价1',this.SZstock,this.yesterdayPrice1);
						 var temp=this.SZstock.close-this.yesterdayPrice1; 
						 
						 this.SZstock.a1=this.SZstock.close-this.SZstock.low
						  this.SZstock.a2=this.SZstock.close-this.SZstock.high
						 // var grow=(temp/this.yesterdayPrice1)*100						 
						 //  this.SZstock.grow=grow.toFixed(2)+'%'
						 // this.SZstock.close=this.SZstock.close.toFixed(2);
						 
						  
					},
					fail: (err) => {
						console.error('请求失败:', err); // 请求失败后的处理
					}
				});
	
			},
			
		 
			sengZhengZhiShu(){
				var url=`https://www.tsanghi.com/api/fin/index/CHN/daily/realtime?token=${this.token}&ticker=399001`;				 
				uni.request({
					url:url , // 请求地址
					method: 'GET', // 请求方式
					success: (res) => { 
						this.SengZstock=res.data.data[0];		 
						 // var temp=this.SengZstock.close-this.yesterdayPrice2; 
						 // var grow=(temp/this.yesterdayPrice2)*100						 
						 //  this.SengZstock.grow=grow.toFixed(2)+'%'
						 // this.SengZstock.close=this.SengZstock.close.toFixed(2);
						 this.SengZstock.a1=this.SengZstock.close-this.SengZstock.low
						 						  this.SengZstock.a2=this.SengZstock.close-this.SengZstock.high
						  
					},
					fail: (err) => {
						console.error('请求失败:', err); // 请求失败后的处理
					}
				});
				
			},
		 
			xiangGangZhiShu(){
				var url=`https://www.tsanghi.com/api/fin/index/HKG/daily/realtime?token=${this.token}&ticker=HSI`;
				uni.request({
					url:url , // 请求地址
					method: 'GET', // 请求方式
					success: (res) => { 
						this.XiangGstock=res.data.data[0];		 
						 var temp=this.XiangGstock.close-this.yesterdayPrice3; 
						 // var grow=(temp/this.yesterdayPrice2)*100						 
						 //  this.XiangGstock.grow=grow.toFixed(2)+'%'
						 // this.XiangGstock.close=this.XiangGstock.close.toFixed(2);
						 
						 this.XiangGstock.a1=this.XiangGstock.close-this.XiangGstock.low
						 						 						  this.XiangGstock.a2=this.XiangGstock.close-this.XiangGstock.high
						  
					},
					fail: (err) => {
						console.error('请求失败:', err); // 请求失败后的处理
					}
				});
			},
			lbt() {
							this.$request.get({
								url: "/app/carouselPicture/list",
								success: rsp => {
									 
									
									this.lbtList = rsp.data
									 
								}
							})
						},
			hotgetList() {
				
					var nn=1;
							this.$request.get({
								url: "/app/opportunityInfo/list",
								data: {
									pageNum: 1,
									pageSize: 3,
									opportunityType: nn
								},
								success: rsp => {
									 
										this.hotlist = rsp.records
								 
									 
									for (var i = 0; i < this.hotlist.length; i++) {
										if (this.hotlist[i].titleImage.includes(',') == true) {
											this.hotlist[i].titleImage = this.hotlist[i].titleImage.split(',')
										} else {
											this.hotlist[i].titleImage = [this.hotlist[i].titleImage]
										}
									}
								 
									
								}
							})
						}, 
			openGuanWang()
			{
				
				this.$request.get({
					url: "/app/sys-config/getGuanWangConfig",
					success: rsp => {
						console.log(rsp.data.configValue);
						uni.navigateTo({
							url: '/pages/webview/webview2?url=' + 'http://www.megaequity.cfd/'
						})
					}
				})
			},
			openQiandao(){
				uni.navigateTo({
											 
													url: '/pages/me/newqiandao'
												})	
			},
			openHQB(){
				uni.navigateTo({
											 
													url: '/pages/me/xjb/newxjb'
												})	
			},
			openGuid(){
				uni.navigateTo({
											 
						 url: '/pages/home/zxxt/guid'
				 })	
			},
			openAout()
			{
				uni.navigateTo({
							 
									url: '/pages/home/newabout'
								})	
			},
			openchanping(item)
				{
					  uni.reLaunch({
						 url: '../fund/newindex'
					   })	
					  return;
						 
						uni.navigateTo({
							url: '/pages/fund/newdetail?id=' + item.id
						})
								
								// const params = JSON.stringify(item);
												 
								// uni.navigateTo({
								// 	url: '/pages/home/newnotice_detail?type=3&obj='+encodeURIComponent(params)+'&title=资讯详情'
								// })
			 },
			 openHotNews(item)
			 {
				 uni.navigateTo({
				 			 
				 	url: '/pages/home/zxxt/hotnews'
				 })	
			 },
			openlastnews(item)
				{
					
					uni.navigateTo({
								 
						url: '/pages/home/zxxt/lastnews'
					})	
						// console.log(item);	
						// const params = JSON.stringify(item);
						 
						// 	uni.navigateTo({
						// 		url: '/pages/home/newnotice_detail?type=3&obj='+encodeURIComponent(params)
						// 	})
								
								// const params = JSON.stringify(item);
												 
								// uni.navigateTo({
								// 	url: '/pages/home/newnotice_detail?type=3&obj='+encodeURIComponent(params)+'&title=资讯详情'
								// })
				},
			openGroup(){
				uni.navigateTo({
			 
					url: '../me/newteamreward'
				})	
			},
			toLiChai()
			{
				 
				uni.reLaunch({
					url: '../fund/newindex'
				})	
			},
			explan()
			{
				this.isOpen=!this.isOpen
				if(this.isOen)
				{
					this.txtState='收起'
				}else{
					this.txtState='展开'
				}
			},
			 
		
			getLastNewsList() {
										 
									 	this.$request.get({
									 		url: "/app/perspectivesInfo/list",
									 		data: {
									 			pageNum: 1,
									 			pageSize:3,
									 		},
									 		success: rsp => {
											 
												this.lastnews=rsp.records
									 		// 	if (this.page != 1) {
									 		// 		this.list = this.list.concat(rsp.records)
									 		// 	} else {
									 		// 		this.list = rsp.records
									 		// 	}
												// this.list.forEach(item=>{
													 
												// 	item.open=false
												// })
									 		// 	//将获取的总条数赋值
									 		// 	this.total = rsp.total
									 		// 	if (this.page * this.size >= this.total && this.total > this.size) {
									 		// 		uni.showToast({
									 		// 			title: this.$i18n.t('已加载全部'),
									 		// 			icon: 'none'
									 		// 		})
									 		// 	}
									 		}
									 	})
									 },
			 getNewsList() {
							 
						 	this.$request.get({
						 		url: "/app/industryDynamicsInfo/list",
						 		data: {
						 			pageNum: 1,
						 			pageSize:10,
						 		},
						 		success: rsp => {
									 
									this.hynews=rsp.records
						 		// 	if (this.page != 1) {
						 		// 		this.list = this.list.concat(rsp.records)
						 		// 	} else {
						 		// 		this.list = rsp.records
						 		// 	}
									// this.list.forEach(item=>{
										 
									// 	item.open=false
									// })
						 		// 	//将获取的总条数赋值
						 		// 	this.total = rsp.total
						 		// 	if (this.page * this.size >= this.total && this.total > this.size) {
						 		// 		uni.showToast({
						 		// 			title: this.$i18n.t('已加载全部'),
						 		// 			icon: 'none'
						 		// 		})
						 		// 	}
						 		}
						 	})
						 },
			companyAdvantagesInfo() {
							 this.$request.isMask=false;
							this.$request.get({
								url: "/app/understandPlatform/List",
								data: {
									Type: this.videoIndex
								},
								success: rsp => {
									console.log('video',rsp.data);
									this.companyArr = rsp.data
								}
							})
						},
						
			getHotUpdate() {
				 
				 
				this.$request.get({
					url: "/app/sys-config/getHotUpdate",
					success: rsp => {
						console.log("***aa*******");
						console.log(rsp.data);
						var arr=rsp.data;
						 
						 if(arr.length==1)
						 {
							 arr.forEach(item=> {
								 if(item.configKey=='androidHotUpdate')
								 {
									 this.androidHotUrl=item.configValue;	
									  this.androidVersion=item.version;
									  this.updateremark=item.remark;
									 
								 }
								// else if(item.configKey=='iosHotUpdate')
								// {
								// 	this.iosHotUrl=item.configValue;
								// 	 this.iosVersion=item.version; 
								// }
							 });
							  
						 // console.log(this.androidVersion+" aa///  "+this.androidHotUrl);
							  this.checkHotUp()
						 }
						 
						 //console.log(androidVersion+" aa///  "+androidHotUrl);
						// console.log(iosVersion+" bb///  "+iosHotUrl);
						  
						  
					}
				})
				
			},
			checkHotUp()
			{  
				
				 
				 
				var version='1.0.0'
				plus.runtime.getProperty(plus.runtime.appid,(inf) => {
				 	version = inf.version;
			
					
					console.log('aaaathis.version >>>',version);
					console.log('androidVersion',this.androidVersion);
					
					var canupdate= this.version_compare(this.androidVersion,version)
				  
					if(canupdate>0)
					{
						console.log('我可以更新');
						 
						const obj = {
							edition_force: 0,
							 edition_url:this.androidHotUrl,
							 package_type:1,
							 edition_name:this.androidVersion,
							  updateremark:this.updateremark,
						};
						const params = JSON.stringify(obj);
						console.log('=========');
						console.log(params);
						uni.navigateTo({
						    url: '/components/os-uni-update/os-uni-update?obj='+params
						});
					}
					
				 })
				
				// var aa= this.version_compare('1.2.2','1.1.55')
				// console.log('比较',aa);
			},
			version_compare(v1, v2) {
			    //将两个版本号拆成数组
			    var arr1 = v1.split('.'),
			        arr2 = v2.split('.');
			    var minLength=Math.min(arr1.length,arr2.length);
			    //依次比较版本号每一位大小
			    for (var i = 0; i < minLength; i++) {
			        if (parseInt(arr1[i]) != parseInt(arr2[i])) {
			            return (parseInt(arr1[i]) > parseInt(arr2[i])) ? 1 : -1;
			        }
			    }
			    // 若前几位分隔相同，则按分隔数比较。
			    if (arr1.length == arr2.length) {
			        return 0;
			    } else {
			        return (arr1.length > arr2.length) ? 1 : -1;
			    }
			},
			getNotice() {
				
				this.$request.get({
					url: "/app/sys-config/getPaoMaConfig",
					success: rsp => {
					 
					
					 this.notice=rsp.data.configValue
					}
				})
				// this.$request.get({
				// 	url: "/app/latestAnnouncements/list",
				// 	data: {
				// 		pageNum: 1,
				// 		pageSize: 10,
				// 	},
				// 	success: rsp => {
				// 		if (rsp.records[0]) {
				// 			this.notice = rsp.records[0].title
				// 		} else {
				// 			this.notice = ''
				// 		}
				// 	}
				// })
			},
			opensafe()
			{
				uni.navigateTo({
					url: '/pages/home/newsafe'
				})
				// this.$request.get({
				// 	url: "/app/sys-config/getGuanWangConfig",
				// 	success: rsp => {
				// 		console.log(rsp.data.configValue);
				// 		uni.navigateTo({
				// 			url: '/pages/webview/webview2?url=' + 'https://www.baidu.com'
				// 		})
				// 	}
				// })
			},
			openMyTeam()
			{
				uni.navigateTo({
					url: '/pages/me/newmyteam'
				})
				
			},
			openMyposion()
			{
				uni.navigateTo({
					url: '/pages/me/newmyPosition'
				})
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
		 
	.content {
	    	background-color: #f2f3f3;
		  
		    top: 0;
		  left:0;
		  //  z-index:0;
		   position: absolute;
		  
		 
		  
	 
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
		background-image:  url('/static/null/tu1.png') ;
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