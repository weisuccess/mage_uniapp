<template>
	
	<view class="content">
	     <narBarAndTop :background="'#fb4034'"  :title="'常见问题'"    @back="toBack()">
	     	    		 		 	
	     </narBarAndTop>
	 
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
		        
			 	<view class="mt20" style="width: 100%;background: linear-gradient(to bottom, #fee9eb,  #ffffff, #ffffff); border-radius: 16rpx;">
					 <view class="" style="margin: 30rpx;">						
						  <view v-for="(item,index) in list" :key="index" class="py20">
							  <view class="flex-between-center" @click="openswtich(item)">
								 
								  <view class="fz26 fw600" style=" font-family: 'YaHei';">{{item.title}}</view>
								   <uni-icons v-if="item.open==0" type="right" size="15"></uni-icons>
								   <uni-icons v-else-if="item.open==1" type="down" size="15"></uni-icons>
							  </view>
							  
							   <view v-if="item.open==1" class="pd20" style=" font-family: 'YaHei';white-space: pre-line;color: #a0a0a0;">{{item.content}}</view>
						  </view>
						 
						 
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
		 
				  {title:"1. 实名认证可以用护照号、军官证号吗？",content:"MEGA EQUITY平台中国大陆区暂不支持，支持的证件类型只有身份证，所以能填写的证件号码只能是中国大陆居民身份证18位号码，不能是护照号码或其他证件号码，为配合响应中国网络实名制政策，实名认证姓名、身份证号码、账户不相符将有可能会被暂时冻结账户，禁止提现。审核实名认证通过以后自动在24小时内解除。海外区证件请联系在线客服进行认证。",open:0},
				  {title:"2. 认证成功后，身份证号码可以更换吗？",content:"不可以更换，为保障投资者账号安全，实名认证通过后不可修改。",open:0},
				  {title:"3. 手机丢失是否影响账号安全？",content:"资金变动都需要输入支付密码，故手机丢失不影响账号安全。",open:0},
				  {title:"4. 会员能注销账号吗？",content:"MEGA EQUITY平台账号不支持注销。半年内不登录会员账号，平台会自动注销会员账号。",open:0},
				  {title:"5. 密码分类及说明",content:"账号密码有登录密码、交易密码两种。登陆密码用于登陆账号使用。交易密码用于资金发生变化时使用。为了账户安全，注册登录平台后请及时保管好交易密码，确保账户资金安全。",open:0},
				  {title:"6. 登录密码和支付密码找回",content:"①联系在线客服 \n②提供本人身份证正反面及手持身份证照片 \n③审核通过 \n④提供给您重置的支付密码",open:0},
				  {title:"7. 提现是否需要手续费？",content:"提现MEGA EQUITY平台不产生手续费用！",open:0},
				  {title:"8. 充值未到账？",content:"请在平台客服工作时间内联系在线客服进行咨询。",open:0},
				  {title:"9. 实名认证通过提现不到账？",content:"①. 请核对真实姓名与身份证号是否匹配。\n②. 请核对真实姓名是否输入正确。\n③. 请核对身份证号是否输入正确。\n④.请核对USDT-TRC20收款地址是否正确。",open:0},
				  {title:"10. 如果还是认证成功提现不到账，请联系在线客服",content:"客服在线时间：09:00-23:00；平台提现时间：北京时间（CST)9:00-21:00塞浦路斯东二区时间（EET）3:00-15:00",open:0},
				  {title:"11. 充值到账时间。",content:"（1）平台充值时间：北京时间（CST)9:00-23:00塞浦路斯东二区时间（EET）3:00-17:00\n（2）提交充值订单审核成功后会即时到账，如果您通过USDT-TRC20钱包确认已经成功充值，但账户没有到账，您可联系在线客服进行咨询。",open:0},
				  {title:"12. 查询充值记录",content:"①点击APP[右下角我的]再次点击[充值记录]进行查询！",open:0},
				  {title:"13. 查询提现记录",content:"①点击APP[右下角我的]再次点击[提现记录]进行查询！",open:0},
				  {title:"14. 如何查询收益明细",content:"①点击[右下角我的]再次点击[财务明细]进行查询！",open:0},
				  {title:"15. 可以绑定多个钱包收款地址吗？",content:"不可以，每个账户只能绑定一个USDT-TRC20钱包收款地址，如需更改需咨询平台在线客服进行更改。",open:0},
				  {title:"16. 申购资产前需要注意哪些事项？",content:"请详细阅读所选择产品的收益率、持仓周期等信息。确保账号的金额充足，如若不足请及时充值。",open:0},
				   {title:"17. 建仓后何时开始计算收益？",content:"建仓后的24小时结算当天收益。例如：今日上午9点15分建仓，至次日上午9点15分收到当天收益。平台上有不同产品收益返还形式，认购产品前请仔细查看产品收益返还形式！",open:0},
				    {title:"18. 最低充值/提现金额",content:"最低充值金额为100USDT；最低提现金额为100USDT",open:0},
				 {title:"19. 申购产品后是否可以取消",content:"申购产品后不允许取消，产品到期后资金会自动返还到账户余额里。",open:0},
				  {title:"20. 一个实名可以注册多个账户吗？",content:"不可以，一张身份证只能实名一个会员账户，一经发现一张身份证实名多个会员账户，或者在平台恶意注册，将冻结该账户（包含所有账户资金）！",open:0} 
				 
				  
					
				],
				user:{},
				rate:'0%',
			};
		},
		onLoad() {
			 //this.getUser();
		},
		onUnload(){
			//uni.$off("lang");
		},
		onShow() {
			this.pageNum = 1
			//this.getList()
		},
		methods: {
		 openswtich(item){
			 if(item.open==0)
				item.open=1
				else item.open=0
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