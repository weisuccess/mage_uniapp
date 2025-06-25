<template>
	<!-- <view class="content">
		<narBar :title="getLg('我的合同')" @back="toBack()" background="#9B1B1A"></narBar>
		<view>
			<scroll-view scroll-y="true" class="box"
				:style="{'height':windowHeight+'px','marginTop':statusBarHeight+'px'}">
				<view style="padding: 20rpx;" class="mt60">
					<rich-text :nodes="list"></rich-text>
				</view>
			</scroll-view>
		</view>

	</view> -->
	<view class="content">
		<narBar :title="getLg('合同')" @back="toBack()"></narBar>
		<scroll-view scroll-y="true" :style="{height:windowHeight+'px'}"
			style="color: #3A3A3A;padding: 30rpx;width: calc(100% - 60rpx);">
			<view class="" style="margin-top: var(--status-bar-height);">
				<view class="">
					<view class=" ">
						<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/17487895378391.png"
							mode="widthFix" style="width: 100%;"></image>
					</view>
				</view>

				<!-- <image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/17485155944881.jpg" mode="widthFix" class="w100"></image> -->
				<view class="mt30">
					<text class="lh60 fz40">项目编号:{{list.positionCode}}</text>
					<br />
					本投资协议(“本协议”)由以下三方于{{list.createTime}}签署
				</view>
				<view class="mt30">
					甲方(管理方):UBI资产管理公司<br /><br />
					乙方(投资方):{{list.trueName}}<br /><br />
					丙方(担保方):友邦保險(國際)有限公司香港分行
				</view>
				<!-- <image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/17485144253522.jpg"  mode="widthFix" class="w100"></image> -->

				<view class="mt30">
					基于各方的业务需求和责任,双方签订本合同完全是自愿的,并非强迫或欺骗。
					在本合同履行过程中,如需对本合同内容进行变更或补充,双方同意制作本合同理财明细。
					本合同附件是本合同不可分的组成部分,与本合同具有同等法律效力。
					乙方通过由甲方运营管理的“UBI”线上平台,进行对其公司运营操作的产品项目投资事宜,双方根据平等、自愿的原则,达成本协议如下
				</view>
				<view class="mt60">
					<text class="fw700 fz35">一、收益金额、期限、返款方式<br /><br /></text>
					1.甲方同意通过“UBI”线上平台接收乙方投资金额如下,乙方同意通过“UBI”线上平台向甲方投资金额、收益、返款方式。
				</view>
				<view class="fz40 fw700 pd30 mt20 mb30" style="border-bottom: 3px dashed #ccc;">理财投资明细</view>
				<view class="px30">
					<table border width="100%" padding="20rpx">
						<tr>
							<td style="width: 35%;">产品名称</td>
							<td>{{list.positionName}}</td>
						</tr>
						<tr>
							<td>投资人姓名</td>
							<td>{{list.trueName}}</td>
						</tr>
						<tr>
							<td>投资人身份证</td>
							<td>{{list.idCard}}</td>
						</tr>
						<tr>
							<td>投入本金数额</td>
							<td>{{list.positionPrice}} USDT</td>
						</tr>
						<tr>
							<td>协议期(天)</td>
							<td>{{list.holdTime}}天</td>
						</tr>
						<tr>
							<td>收益方式</td>
							<td>{{list.earningsType}}</td>
						</tr>
						<tr>
							<td>约定收益率</td>
							<td>{{list.positionEarnings}}%</td>
						</tr>
						<tr>
							<td>生效日</td>
							<td>{{list.createTime}}</td>
						</tr>
						<tr>
							<td>到期日</td>
							<td>{{list.settlementTime}}</td>
						</tr>
						<tr>
							<td>应收本息</td>
							<td>{{list.principalAndInterest}} USDT</td>
						</tr>
					</table>
				</view>

				<!-- <image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/17485145250754.png"  mode="widthFix" class="w100"></image>
				<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/17485144682783.jpg"  mode="widthFix" class="w100"></image> -->
				<view class="mt60">
					<text class="fw700 fz35 ">二、投资流程</text> <br /><br />
					1.本协议成立:甲方首先在“UBI”线上平台上发布相关的投资产品项目收益,乙方按照甲方的规则,通过在“UBI”线上平台上相关的投资产品项目收益,按钮确认投资时,本协议下所约定的关系即成立,本协议的签署关系同时成立。
					2.投资资金冻结:乙方点击“立即投资”按钮即视为其已经向甲方发出不可撤销的授权指令,授权甲方全权处理和操作本次的投资金额(“乙方“UBI”线上平台账户”)中的冻结金额等同于本协议投资的本金数额”的资金。上述冻结在本协议生效时或本协议确定失效时(项目周期结束)解除。
					3.投资资金变更:本协议生效的同时,甲方即不可撤销乙方所投资的金额本金额等同于本协议第一条所列的“收益金额、期限、返款方式”
				</view>
				<view class="mt60">
					<text class="fw700 fz35">三、投资资金来源保证</text> <br /><br />
					1.乙方保证其所用于投资资金来源合法,乙方是该资金的合法所有人,如果合法性问题(如盗用他人的银行卡,信用卡等)发生争议,由乙方自行负责解决。如乙方未能解决,因乙方资金安全问题导致账户被相关司法机关冻结或者执行,由乙方自行负责解决相关司法问题。
				</view>
				<view class="mt60">
					<text class="fw700 fz35 ">四、本息返还方式</text> <br /><br />
					1.甲方同意并承诺,乙方所投资金的收益金额、期限、返款方式的执行甲方负责对乙方所投资金额的收益金额和返款时间的保证,甲方必须按照本协议的约定按时间全额的将其返还到乙方的帐户中。<br /><br />
					2.甲方应在每周期或每日规定的返款时间(每日分红和到期返本金)(不得迟于24:00)将其按照本协议第一条所述的本息,转入乙方的账户。<br /><br />
					3.如果返款日遇到法定假日或公休日,返款日期时间不受影响。
				</view>
				<view class="mt60">
					<text class="fw700 fz35">五、违约</text> <br /><br />
					1.如果甲方严重违反本协议的协定,如:没能按时的返还乙方的红利及本金,甲方应向乙方支付投资总金额和投资总金额10%作为违约金。乙方须保证其资金来源的合法性不得隐瞒,否则甲方有权冻结其资金移送法办。<br /><br />
					2.乙方保证其提供的信息和资料的真实性,不得提供虚假资料或隐瞒。乙方提供虚假资料或者故意隐瞒,构成违约,应承担违约责任,同时本协议视为提前终止。<br /><br />
					3.发生下列任何一项或几项情形的,甲方、乙方任何财产遭受没收、征用、查封、扣押、冻结等可能影响其履约能力的不利事件,且不能及时提任何财产遭受没收、征用、查封、扣押、冻结等可能影响其履约能力的不利事件,且不能及时提供有效补救措施的;提前终止本协议;采取法律、法规以及本协议约定的其他救济措施。
				</view>
				<view class="mt60">
					<text class="fw700 fz35 ">六、风险控制及承保责任</text> <br /> <br />
					1.甲方对乙方投资资金负有控制风险的责任,必须勤勉尽责。如果投资有亏损情况,则无论亏损大小由甲方承担全部损失,按合同承诺支付给乙方,如果甲方出现违约将有承担机构方(丙方)履行承诺兑付义务。
				</view>
				<view class="mt60">
					<text class="fw700 fz35 ">七、保密义务</text> <br /><br />
					1.甲乙丙三方对其通过接触和通过其他渠道得知的有关各方的商业机密等应该严格保密,对所有项目资料严格保密,不得向任何其他人员及机构透露相关信息。
				</view>
				<view class="mt60">
					<text class="fw700 fz35 ">八、合同生效</text> <br /><br />
					1.本协议在下述条件全部满足时生效:<br />
					(1)甲方、乙方、丙方在本协议(含传真件)上签字盖章、且乙方通过“UBI”线上平台以网络在线点击:立即投资的方式签订;<br /><br />
					(2)自甲方发布的投资项目起,乙方所投项目资金全部在“UBI”线上平台账户中本金将被冻结直至项目周期结束。<br /><br />
					2.本协议的任何修改、补充均须以“UBI”线上平台电子文本形式作出。<br />
					3.三方均确认,本协议的签订、生效和履行以不违反法律为前提。如果本协议中的任何一条或多条违反适用的法律,则该条将被视为无效,但该无效条款并不影响本协议其他条款的效力。<br /><br />
					4.如果双方在本协议履行过程中发生任何争议,应友好协商解决:如协商不成,任何一方有权向本方所在地的人民法院提起仲裁或诉讼。<br /><br />
					5.甲方保留与本协议有关的书面文件或电子信息。本协议采用电子文本形式制作,各方均认可该形式合同的法律效力。<br /><br />
					6.本协议一式三份,甲方一份,乙方一份,丙方一份,具有同等法律效力。
				</view>
				<view class="mt60">
					<text class="fw700 fz35 ">九、终止合作的条件</text> <br /><br />
					1.合作合同规定的期限届满;合作目的已达到;根据国家主管机构的决定:法律规定的其他情形。
				</view>
				<view class="flex-start-center ml30" style="position: relative;height: 300rpx;line-height: 50rpx;">
					甲方：UBI资产管理公司<br />
					<!--  {{list.createTime}} -->
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1748514881485jia.png" mode="widthFix"
						class="zhang"></image>
				</view>
				<view class="ml40" style="position: relative;height: 100rpx;line-height: 60rpx;">
					乙方：{{list.trueName}} <br />
					<!--  {{list.createTime}} -->
					<!-- <image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737558897602北银公章.png" mode="widthFix"
					class="zhang"></image> -->
				</view>
				<view class="flex-start-center ml30" style="position: relative;height: 300rpx;line-height: 50rpx;">
					丙方：友邦保險(國際)有限公司香港分行<br />
					<!--  {{list.createTime}} -->
					<image src="https://ubi-res1.oss-cn-hongkong.aliyuncs.com/null/1748514891103bing.png" mode="widthFix"
						class="zhang"></image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import narBar from 'pages/public/narBar.vue'
	export default {
		components: {
			narBar
		},
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				windowHeight: uni.getSystemInfoSync().windowHeight - 50,
				list: '',
				id: '',
				positionName: ''
			}
		},
		onLoad(opt) {
			this.id = opt.id
			this.positionName = opt.positionName
			this.gethetong()
		},
		methods: {
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
	}
</script>

<style>
	.content {
		/* background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		background-size: 100% 50%;
		height: 100vh;
		position: relative; */
	}

	.box {
		position: absolute;
		top: 0;
		z-index: 999;
		background-color: #ffffff;
		border-radius: 15rpx;
		/* margin-top: var(--status-bar-height); */
		color: #3A3A3A;
	}

	.zhang {
		position: absolute;
		width: 250rpx;
		height: 250rpx;
		left: 15%;
		top: calc(50% - 130rpx);
	}
</style>