<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'合同'"    @back="toBack()">
	     	    		 		 	
	     </narBarAndTop>
		<!-- <view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view> -->
		<view style="height: var(--status-bar-height);width: 100%;background-color: #fb4034;"></view>
		<!-- <view style="height: 100rpx;width: 100%;background-color: #fb4034;" class=""></view> -->
		
		
	
			<view style=" background-image:  url('/static/null/fundindextop.png'); 
					  background-repeat: no-repeat; 
					  background-size:cover;
					background-size: 100% 100%;
					width:100vw;
					height:200rpx				
					">  
					 
					
			 </view>
		<view class="flex-column-center  mx40" style="margin-top: -90rpx; "> 
		        
			 	<view class="mt20" style="width: 100%;background-color: #ffffff; border-radius: 16rpx;">
					<scroll-view scroll-y="true" :style="{height:windowHeight+'px'}"
								style="color: #3A3A3A;padding: 30rpx;width: calc(100% - 60rpx);">
								<view class="" style="margin-top: var(--status-bar-height);">
									<view class="">
										<view class="lh60 fz40 text-align-c fw600 ">
											我的合同
											<!-- <image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/17487895378391.png"
												mode="widthFix" style="width: 100%;"></image> -->
												
										</view>
									</view>
					
									<!-- <image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/17485155944881.jpg" mode="widthFix" class="w100"></image> -->
									 
									<view class="mt30">
										
										甲方(投资人):{{list.trueName}}<br /><br /> 
										乙方(管理方):MEGAEQUITY资产管理公司<br /><br />
									</view>
									<!-- <image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/17485144253522.jpg"  mode="widthFix" class="w100"></image> -->
					
									<view class="mt30">
										鉴于甲方有投资理财的需求, 乙方拥有专业的理财投资管理能力,履行本合同义务提供担保, 双方经友好协商, 依据中国相关法律法规, 就投资理财及担保事宜达成如下合约, 以兹共同遵守:
									</view >
									<view class="mt30 fw600 fz34">
										一、理财投资详情
									</view>
									<view class="mt30">
										<text class="" style="line-height: 40rpx;">
											合同编号 ：{{list.positionCode}}
											产品名称 ：{{list.positionName}}
											投资人名称 ：{{list.trueName}}
											投资人身份证 ：{{list.idCard}}
											投入本金数额 ：{{list.positionPrice}} USDT
											收益周期：{{list.holdTime}}天
											结算周期：{{list.earningsType}} 
											收益率 ：{{list.positionEarnings}}%
											到期日 ：{{list.settlementTime}}
											应收本息 ：{{list.principalAndInterest}} USDT
										</text>
										 
										 
									</view>
									<view class="mt20">
									 保本保息约定: 乙方承诺在本合约履行期间, 保障甲方投入的本金安全, 且按照约定的收益率向甲方支付利息。无论投资项目实际运营情况如何, 乙方均需在到期日向甲方足额支付本金和相应利息。
									</view>
									 
									 <view class="mt30 fw600 fz34">
										 二、合约期相关规定
									 </view>
									 
									 <view class="mt10">
										 1. 甲方应确保所提供信息和资料的真实、准确、完整, 不得提供虚假资料或故意隐瞒重要事实。若甲方违反本规定, 即构成违约, 本合约随即终止, 由此产生的一切法律责任和经济损失由甲方自行承担。
									 </view>
									 <view class="mt10">
									 	2. 未经乙方书面同意, 甲方不得擅自终止本合约。否则, 乙方有权取消理财服务, 甲方无权要求返还已产生的收益。甲方在投资前应充分了解投资项目的详细情况, 乙方应向甲方充分披露投资项目的收益构成等关键信息, 甲方严格按照乙方的要求进行操作, 因甲方违规操作造成的损失由甲方自行承担。									 1. 甲方应确保所提供信息和资料的真实、准确、完整, 不得提供虚假资料或故意隐瞒重要事实。若甲方违反本规定, 即构成违约, 本合约随即终止, 由此产生的一切法律责任和经济损失由甲方自行承担。
									 </view>
									  <view class="mt10">
										  3. 甲方保证投资资金来源合法, 自己是资金的合法所有人。若因资金合法性问题引发争议或导致账户被司法机关冻结、执行, 甲方应自行解决相关问题, 并承担由此产生的全部后果。如因甲方资金合法性问题给乙方造成损失, 甲方应负责全额赔偿, 赔偿范围包括但不限于直接损失、间接损失、为解决纠纷支付的律师费、诉讼费等。
									</view>
									
									<view class="mt30 fw600 fz34">
										三、理财合约形成步骤
									</view>
									 <view class="mt10">
										1. 合约成立与生效: 乙方在理财平台发布理财产品及收益信息后, 应确保信息真实、准确、完整, 不存在虚假记载、误导性陈述或重大遗漏。甲方点击确认投资时, 应已阅读并理解本合约所有条款及产品相关信息, 本合约约定内容即成立。本合约自双方签字(或盖章)之日起生效。合约生效的同时, 乙方不可撤销甲方的投资金额, 该金额与本合约第一条约定的投入本金金额一致。
									</view>
								
									<view class="mt10">
										2. 投资资金冻结与处理: 甲方点击"立即认购"按钮, 即视为向乙方发出不可撤销的授权指令, 授权乙方全权处理和操作投资资金。自合约生效起, 甲方的投资本金将被冻结, 冻结资金与投资本金金额相同。该冻结在合约生效时或合约确定失效时 (项目周期结束) 解除。理财资金由甲方账户划转至乙方综合理财账户进行投资操作, 乙方应将投资范围限定在法律法规允许的范围内, 不得用于违法违规项目。在期货、外汇、债券、基金、全球金融。等项目投资中, 乙方应优先保障资金安全以实现保本保息, 甲方不得干预乙方的正常理财操作, 每日收益应发放至甲方账户。投资周期届满时, 乙方应将理财本金划入甲方在乙方开立的存款账户, 确保本金和利息足额到账, 到账时间最迟不超过到期日后的1个工作日。
									</view>
									
									<view class="mt30 fw600 fz34">
										四、权利与义务
									</view>
									
									<view class="mt30 fw600 fz30">
										(一) 甲方权利与义务
									</view>
									<view class="mt10">
										<text>
											1. 有权按照本合约约定获取投资收益和收回投资本金, 在保本保息方面享有约定权利。
											2. 应按照合约约定及时、足额提供投资资金, 并确保资金来源合法。
											3. 遵守本合约约定及乙方理财平台的相关规则, 不得干扰乙方为实现保本保息而进行的正常投资运作。
										</text>
									</view>
									<view class="mt30 fw600 fz30">
										(二) 乙方权利与义务
									</view>
									<view class="mt10">
										<text>
											1. 有权依据本合约约定对甲方的投资资金进行管理和运作, 自主决定投资策略和投资组合, 但需符合本合约约定的投资范围和原则, 且一切运作都以保障甲方本金安全和实现约定收益为目标。
											2. 负责投资项目的具体运作和管理, 承担投资过程中除应由甲方承担外的相关费用, 确保有足够资金履行保本保息义务。
											3. 按照本合约约定的时间和金额, 向甲方支付投资收益和返还投资本金, 严格遵守保本保息的承诺。如遇特殊情况导致无法按时支付, 逾期支付的, 应按照本合约第五条第1款承担违约责任。
										</text>
									</view>
									
									<view class="mt30 fw600 fz34">
										五、违约责任
									</view>
									
									<view class="mt10">
										<text>
											1. 若乙方未按照本合约约定按时足额向甲方支付投资收益或返还投资本金, 违反保本保息约定, 乙方应向甲方支付投资总金额10%的违约金。
											2. 若乙方未按照本合约约定履行担保责任, 每逾期一日, 应按照未担保金额的0.05%向甲方支付违约金; 逾期超过10日的, 甲方有权要求乙方承担赔偿责任, 赔偿范围包括但不限于未担保金额、违约金、甲方为实现债权所支付的律师费、诉讼费、差旅费等费用。
											3. 若甲方违反本合约约定, 如提供虚假资料、擅自终止合约等, 应按照本合约第一条相关约定承担违约责任。
											4. 任何一方违反本合约中关于保密义务的约定, 给对方造成损失的, 应承担赔偿责任。
										</text>
									</view>
									
									 <view class="mt30 fw600 fz34">
									 	六、合约的变更与解除
									 </view>
									 
									 <view class="mt10">
									 	<text>
									 		1. 本合约的任何变更或补充需经双方协商一致, 并签订书面补充合约, 补充合约与本合约具有同等法律效力。
									 		2. 在合约履行期间, 若发生以下情形之一, 双方可协商解除本合约: 因不可抗力或政策调整等原因, 导致本合约无法继续履行; 双方协商一致同意解除本合约; 一方严重违反本合约约定, 经对方书面通知后在15个工作日内仍未改正的, 守约方有权解除本合约。
									 		3. 合约解除后, 乙方应在5个工作日内将甲方的投资本金及已实现的收益返还至甲方指定账户, 以落实保本保息要求, 并按照本合约约定承担相应的违约责任。
									  
									 	</text>
									 </view>
									 
									 <view class="mt30 fw600 fz34">
									 	七、争议解决
									 </view>
									 
									 <view class="mt10">
									 	本合约的签订、履行、解释及争议解决均适用中华人民共和国法律。双方在履行本合约过程中如发生争议, 应首先通过友好协商解决; 协商不成的, 任何一方均有权向乙方所在地有管辖权的人民法院提起诉讼。
									 </view>
									 
									 <view class="mt30 fw600 fz34">
									 	八、其他条款
									 </view>
									  <view class="mt10">
										<text>
									 		1. 本合约一式两份, 甲、乙双方各执一份, 具有同等法律效力。
									 		2. 本合约自双方签字(或盖章)之日起生效。本合约采用电子文本形式制成的, 电子签名与手写签名或盖章具有同等法律效力, 其任何修改、补充均须以书面形式作出, 并经双方签字(或盖章)确认。
									 		3. 本合约未经甲方事先书面同意, 乙方不得将本合约项下的任何权利义务转让给任何第三方。
									  
									 	</text>
									 </view>
									 
									 
									<view class="flex-start-center ml30" style="position: relative;height: 300rpx;line-height: 50rpx;">
										甲方：{{list.trueName}}<br />
										<!--  {{list.createTime}} -->
										<image src="/static/null/hetongzhang.png" mode="widthFix" 
											class="zhang">
											
										 </image>
										<view class="flex-column-center" style="margin-top: 280rpx;;z-index: 1000;position: absolute;; width: 650rpx ;height: 400rpx; ">
												 <image :src="user.signature"  style="width: 650rpx ;height: 400rpx;" mode="widthFix" />
										</view>
									</view>
									
									<view class="ml40" style="position: relative;height: 100rpx;line-height: 60rpx;">
										乙方：MEGAEQUITY资产管理公司 <br />
										<!--  {{list.createTime}} -->
										<!-- <image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737558897602北银公章.png" mode="widthFix"
										class="zhang"></image> -->
									</view>
									 
									
								
									<view style="height: 80;"></view>
									 
								</view>
							</scroll-view>
					
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
						windowHeight: uni.getSystemInfoSync().windowHeight - 50,
						list: '',
						id: '',
						user:{},
						positionName: '',
						outData:{},
						 title: 'Hello',
						            penColor: '#000',
						            penSize: 5,
						            url2: '',
						            openSmooth: true,
									productParam:{},
					}
				},
				onLoad(opt) {
				 
						this.id = opt.id
						this.positionName = opt.positionName
						this.gethetong()
						this.getUser()
				},
				methods: {
					
					 getUser() {
					 				this.$request.get({
					 					url: "/app/dreamUserInfo/getUser",
					 					success: rsp => {
					 						this.user = rsp.data
					 						console.log(this.user);
					 						this.telphone=this.user.telPhone;
					 					}
					 				})
					  },
					pdfPreview(url) {
						var title = '预览'
						// uni.showLoading({
						// 	title: '加载中',
						// 	mask: true
						// })
						//由于android 下webview无法直接打开pdf，需要先下载
						// uni.getSystemInfo({
						// 	success: res => {
						// 		console.log(res.platform);
						// 		// if (res.platform === 'android') {
						// 		wx.downloadFile({
						// 			url: this.list,
						// 			// filePath: wx.env.USER_DATA_PATH  + "/我的协议.pdf",
						// 			success: function(res) {
						// 				const filePath = res.tempFilePath;
						// 				uni.showLoading({
						// 					title: '正在打开',
						// 					mask: true
						// 				})
						// 				wx.openDocument({
						// 					filePath: filePath,
						// 					showMenu: true, // 显示右上角菜单
						// 					fileType: "pdf",
						// 					success: function(res) {
						// 						uni.hideLoading()
						// 						console.log('打开文档成功');
						// 					},
						// 					fail: function(err) {
						// 						uni.hideLoading()
						// 						console.log('fail:' + JSON.stringify(err));
						// 					}
						// 				});
						// 			}
						// 		});
						// 		// } else {
						// 		// 	this.$tab.navigateTo(`/pagesA/common/webview/index?title=${title}&url=${url}`)
						// 		// }
						// 	}
						// });
					},
		
					gethetong() {
						uni.showLoading({
							title: '加载中',
							mask: true
						})
						this.$request.get({
							url: "/app/positionUser/contractInfoQuery?id=" + this.id,
							success: rsp => {
								this.list = rsp.data
								console.log(rsp);
								if (rsp.code != 200) {
									uni.showToast({
										title: rsp.message,
										icon: 'none',
										duration: 1000
									});
								}
								uni.hideLoading()
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