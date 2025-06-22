<template>
	<view class="content" :class="index==0?'bg1':'bg2'" style="min-height: 100vh;">
		<narBar :title="title" @back="toBack()" background="transparent"></narBar>
		<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737137734184rmgl-text.png" mode="widthFix"
			style="width: 60%;height: 200rpx;margin: 0 20%;" v-if="index==0"></image>
		<!-- :style="{height:windowHeight+'px'}" -->
		<scroll-view scroll-y="true" v-if="index==0"
			style="width: 100%;height: 100vh;border-radius: 10rpx;">
			<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/图层 67@3x.png" mode="widthFix" style="width: 100%;"></image>
		</scroll-view>
		<scroll-view scroll-y="true" :style="{height:windowHeight+'px'}" v-if="title=='投资者中心'"
			style="width:100%;margin-top: var(--status-bar-height);color: #3A3A3A;">
			<view style="background-color: #fff;width: 90%;margin: 2.5%;padding: 2.5%;border-radius: 20rpx;">
				<view style="padding: 20rpx;">
					<view class="fz36 fw700" style="color: #BE0A0A;">
						投资者权益须知
					</view>
					<view class="fz26" style="color: #616161;">
						尊敬的投资者: <br />
						投资在获取收益的同时存在投资风险。为了更好的保障您的投资权益,保护您的合法权益,请在投资BOB资金管理计划前认真于阅读以下内容:<br />
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						1、什么是不良资产
					</view>
					<view class="fz26" style="color: #616161;">
						通俗来说就是在银行逾期未偿还贷款的抵押物称之为银行的不良资产。所谓不良资产是指处于呆滞状态、缺乏流动性、使用效能差,虽以资产形式存在但不能带来预期收益的经济资源。
						<br /><br />
						不良资产是一个广泛定义,它是对于会计分录里的坏账损失学科而言的,主要包含但不限于银行的不良资产,政府部门的不良资产,证券、保险、资产的不良资产,公司的不良资产。金融机构是不良资产的根源。
						<br /><br />
						如银行不良资产主要是指不良贷款或呆坏账;企业不良资产是指企业还没有处理的资产损失和潜亏(资金)挂账,以及按财务会计制度规定应提未提资产减值准备的各类有问题资产预计损失金额。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						2、不良资产的分类
					</view>
					<view class="fz26" style="color: #616161;">
						实物类不良资产 指因市价持续下跌、技术陈日、长期闲置等原因
						<br />
						<br />
						债券类不良资产 指长期难以回收的、预计可能产生坏账损失的应收
						<br />
						<br />
						股权类不良资产 指长期投资可收回金额低于其账面
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						3、不良资产的处置方式
					</view>
					<view class="fz26" style="color: #616161;">
						不良资产处置,是指通过综合运用法律法规允许范围内的一切手段和方法,对资产进行的价值变现和价值提升的活动。不良资产的处置方式主要有:常规催收、债务重组、内部核销、委托处理、打包转让、协议处置、不良资产证券化。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						4、BOB资管的合格投资者
					</view>
					<view class="fz26" style="color: #616161;">
						1)本公司仅向市场提供不良资产处置资产认购交易:
						<br /><br />
						2)BOB的合格投资者是指具备相应风险识别能力和风险承担能力:投资不良资产是一种长期的理财工具,在投资运作过程中合规风险下进行ABS商业模式为投资者进行投资回报等
						<br /><br />
						3)投资人应当充分了解不良资产的类别,本公司相关管理人承诺投资人利益优先,承诺以诚信守信勤勉尽责的原则管理和运营。
						以上提示事项仅位为列举性质,未能详尽列举所有不良资产相关知识以及交易过程。投资者在投资前,应认真阅读并理解业务规则及本权益告知书的全部内容,并独立做出是否购买的决定。
					</view>
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" :style="{height:windowHeight+'px'}" v-if="title=='Tether全指南'"
			style="width:100%;margin-top: var(--status-bar-height);color: #3A3A3A;">
			<view style="background-color: #fff;width: 90%;margin: 2.5%;padding: 2.5%;border-radius: 20rpx;">
				<image src="https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737378415430组 34@2x.png"
					mode="widthFix" style="width: 100%;"></image>
				<view style="padding: 20rpx;">
					<view class="fz36 fw700" style="color: #BE0A0A;">
						一、了解Tether(USDT)的基本概念
					</view>
					<view class="fz26 py20" style="color: #616161;">
						Tether(USDT)是一种基于区块链技术的稳定币，其价值与美元(USD)挂钩。这意味着每个USDT通常都应该等值于一美元。Tether由Tether
						Limited公司发行，该公司公共担保每发行-枚USDT都有相应的储备作为支撑。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						1.什么是稳定币?
					</view>
					<view class="fz26 py20" style="color: #616161;">
						稳定币是一种加密货币，其价值通常与某种稳定资产(如法定货币或贵金属)挂钩。稳定币的目的是减少加密货币市场的波动性，使其更适合于日常交易和价值储存。Tether(USDT)是目前市场上最流行的稳定币之一。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						2.Tether(USDT)的运作机制
					</view>
					<view class="fz26 py20" style="color: #616161;">
						Tether(USDT)透过区块链技术进行运作，并且存在于多个区块链平台上，如Bitcoin(透过Omniayer协议)、Ethereum(透过ERC-20协议)和Tron(透过TRC-20协议)。这使得USDT可以在不同的区块链之间进行转移和交易。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						3.Tether(USDT)的特点
					</view>
					<view class="fz26 py20" style="color: #616161;">
						价值稳定 与美元挂钩，每个USDT通常等值于一美元
						<br />
						<br />
						高流动性 在多个加密货币交易所和平台广泛交易
						<br />
						<br />
						跨链兼容性 存在于多个区块链平台上，如Bitcoin、Ethereum、Tron透明度 Tether Limited定期发布其资产储备情况
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						4.BOB为什么选择Tether(USDT)?
					</view>
					<view class="fz26 py20" style="color: #616161;">
						BOB选择Tether(USDT)的主要原因包括其价值稳定，高流动性和跨链兼容性。为BOB资产管理公司与托管银行和投资者者之间兑汇支付方面快捷，也为投资人提供了价值存储一站式服务和期望，同时提高BOB运营的效率。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						5.Tether(USDT)的应用场景
					</view>
					<view class="fz26 py20" style="color: #616161;">
						USDT可以用干多种应用场景，包括但不限于:<br />
						1.在加密货币交易所中进行交易对交易<br />
						2.作为价值储存工具，尤其是在市场波动较大的时期<br />
						3.跨境支付和转账，利用其快速和低成本的特性
					</view>

					<view class="fz36 fw700 mt60" style="color: #BE0A0A;">
						二、对港企业使用USDT完成交易的法律和合规性考量
					</view>
					<view class="fz26 py20" style="color: #616161;">
						作为国际金融中心，对加密货币的监管有其独特的方式要求。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						1.香港的加密货币监管框架
					</view>
					<view class="fz26 py20" style="color: #616161;">
						主要由香港金融管理局(HKMA)和证券及期货事务监察委员会(SFC)负责。两大机构对加密货币交易所、钱包服务提供商及其他相关业务进行监管。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						2.香港的加密货币监管框架
					</view>
					<view class="fz26 py20" style="color: #616161;">
						主要由香港金融管理局(HKMA)和证券及期货事务监察委员会(SFC)负责。两大机构对加密货币交易所、钱包服务提供商及其他相关业务进行监管。
						<br /><br />
						香港金融管理局主要关注加密货币是否涉及洗钱和恐怖主义融资等非法活动。因此，交易所和其他服务提供商、以及有关于Tether(USDT)应用的业务范围内必须遵守《打击洗钱及恐怖分子资金筹集条例》。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						3.证券及期货事务监察委员会的规定
					</view>
					<view class="fz26 py20" style="color: #616161;">
						证券及期货事务监察委员会(SFC)则对涉及证券型代币的交易进行监管，BOB以USDT作为P2F业务范围内交易条例，所受监管以及交易进行的合规性符合香港法规，并保护投资者利益。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						4.交易合规性
					</view>
					<view class="fz26 py20" style="color: #616161;">
						BOB所属P2F业务涉及相关钱包与托管银行联系，受香港金融管理局(HKMA)和香港证券及期货事务监察委员会(SFC)共同监管。银行托管专户进行对投资者按期还本付息、对BOB结余、充值、提现、转账、资产管理、现金管理的托管专户在交易合规下进行，由两大机构对BOB交易范围内使用得到加密货币用户管理实行24小时监控，确保资产投资人投资权益，确保投资人资金安全，确保投资人的投资行为在法律法规下进行和规范，同时BOB也积极对市场进行维护透明度和发展性。
					</view>

					<view class="fz36 fw700 mt60" style="color: #BE0A0A;">
						三、BOB对购买USDT时的安全建议和注意事项
					</view>
					<view class="fz30 fw700 lh70 mt20"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						1.选择可靠的交易平台
					</view>
					<view class="fz26 py20" style="color: #616161;">
						Tether(USDT)时，选择一个可靠的交易平台至关重要，请确保平台具备良好的声誉，透明的运营模式以及强大的安全措施，建议查看用户评价和第三方评测，并选择那些经过监管和认证的平台。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						2.启用双重身份验证
					</view>
					<view class="fz26 py20" style="color: #616161;">
						双重身份验证(2FA)是保护您的账户免受未经授权访问的重要措施。无论您使用的是哪种全球交易所还是本地加密货币交易所，启用2FA都能显提高您的账户安全性。常见的2FA方法包括短信验证和Google
						Authenticator 。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						3.注意所用交易所平台的使用下载网址安全性
					</view>
					<view class="fz26 py20" style="color: #616161;">
						请谨慎对待来自未知来源的电子邮件和链接，并确保您访问的网址正确无误，建议可以在浏览器中手动输入网址，而不是点击邮件中的链接。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						4.保护您的私钥
					</view>
					<view class="fz26 py20" style="color: #616161;">
						私钥是您加密货币的唯一凭证，因此其安全性至关重要。请勿将私钥存储在互联网链接的设备上，建议使用硬件钱包或者冷钱包来保护您的私钥，。切勿向任何人透露您的私钥。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						5.谨慎选择交易对象
					</view>
					<view class="fz26 py20" style="color: #616161;">
						如果您选择通过P2P平台进行USDT 交易，请务必谨慎选择交易对象，建议选择那些拥有良好评价和交易记录的用户进行交易，若有可能，选择平台提供的担保服务，以进一步降低风险。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						6.防范价格波动风险
					</view>
					<view class="fz26 py20" style="color: #616161;">
						虽然USDT是一种稳定币，其价值通常与美元挂钩，但市场上的价格波动仍然可能影响您的交易体验，在进行大额交易前，请密切关注市场行情，选择合适的交易时机。
					</view>

					<view class="fz36 fw700 mt60" style="color: #BE0A0A;">
						四、常见的USDT钱包选择和使用技巧
					</view>
					<view class="fz30 fw700 lh70 mt20"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						1.冷钱包和热钱包的区别
					</view>
					<view class="fz26 py20" style="color: #616161;">
						在选择USDT钱包时，首先需要了解冷钱包和热钱包的区别。冷钱包是指不连接互联网的钱包，如硬件钱包和手机钱包，安全性高但不便于即时交易。热钱包则是链接互联网的钱包，如手机应用程序和网页钱包，便于即时交易但安全性相对较低。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						2.常见的USDT钱包选择
					</view>
					<view class="fz26 py20" style="color: #616161;">
						硬件钱包
						硬件钱包如Ledger Nano S、Trezor等，是存储USDT的安全选择。这些设备将私钥离线存储，防止黑客攻击。使用硬件钱包时，需确保购买的是原厂产品，并妥善保管恢复助记词。
						<br /><br />
						手机钱包
						手机钱包如Trust
						Wallet、imToken、TokenPocket等，提供便捷的USDT存储和管理功能。这些应用程序通常支持多种加密货币，并提供用户友好的界面和安全措施。使用手机钱包时，应设置强密码，妥善保管恢复助记词。
						<br /><br />
						网页钱包
						网页钱包如MyEtherWallet(MEW)和MetaMask等，适合经常交易的用户。这些钱包通常支持浏览器扩展，方便用户直接在网页上进行USDT交易。使用网页钱包时，应确保访问的是官方网站，并避免在公共网络上操作。
						<br /><br />
						交易所钱包
						许多加密货币交易所如Binance、Huobi和OKEX等，也提供内置钱包功能。这些钱包便于用户在交易所内进行USDT交易，但不建议长期存放大量资金。
					</view>

					<view class="fz36 fw700 mt60" style="color: #BE0A0A;">
						五、使用USDT钱包的技巧
					</view>
					<view class="fz30 fw700 lh70 mt20"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						1.备份与恢复
					</view>
					<view class="fz26 py20" style="color: #616161;">
						无论使用哪种类型的USDT钱包,备份都是至关重要的。应妥善保管私钥、恢复助记词和钱包文件,并避免将这些信息存储在互联网上。定期检查备份的有效性,确保在需要时能够顺利恢复钱包。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						2.安全设置
					</view>
					<view class="fz26 py20" style="color: #616161;">
						设置强密码和启用双重身份验证(2FA)是保护USDT钱包的基本措施。此外，应定期更新钱包软件，确保使用最新的安全补丁和功能。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						3.防范钓鱼攻击
					</view>
					<view class="fz26 py20" style="color: #616161;">
						钓鱼攻击是加密货币用户常见的威胁之Z一。应谨慎对待来自未知来源的电子邮件和链接，并确保访问的是官方网站。使用浏览器扩展如HTTPSEverywhere和uBlock
						Origin，可以以进一步提高安全性。
					</view>

					<view class="fz36 fw700 mt60" style="color: #BE0A0A;">
						六、常见问题解答
					</view>
					<view class="fz30 fw700 lh70 mt20"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						1.什么是Tether(USDT)?
					</view>
					<view class="fz26 py20" style="color: #616161;">
						Tether(USDT)是一种稳定币，其价值与美元(USD)挂钩。这意味着每个USDT通常等值于一美元，旨在减少加密货币市场的波动性。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						2.购买USDT有哪些方法?
					</view>
					<view class="fz26 py20" style="color: #616161;">
						您可以通过以下途径购买USDT <br />
						1.全球加密货币交易所,如币安、火币和OKEx. <br />
						2.P2P平台,如BinanceP2P和LocalBitcoins <br />
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						3.如何选择可靠的交易平台?
					</view>
					<view class="fz26 py20" style="color: #616161;">
						选择交易平台时,应考虑以下因素 <br />
						1.平台的声普和用户评价· <br />
						2.是否经过监管和认证。 <br />
						3.交易费用和支付方式。 <br />
						4.平台的安全措施,如双重身份验证(2FA)
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						4.什么是双重身份验证(2FA)?
					</view>
					<view class="fz26 py20" style="color: #616161;">
						双重身份验证(2FA)是一种安全措施,通过要求用户在登入时提供两种形式的身份验证来提高安全性。常见的2FA方法包括短信验证和 Google Authenticator。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						5.在P2P平台上交易USDT有什么风险?
					</view>
					<view class="fz26 py20" style="color: #616161;">
						P2P交易的风险包括: <br />
						1.交易对象的可信度。<br />
						2.交易过程中的安全性。<br />
						建议选择信誉良好的卖家并使用平台内部的通信工具和担保交易服务。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						6.如何保护我的USDT资产?
					</view>
					<view class="fz26 py20" style="color: #616161;">
						保护USDT资产的建议包括: <br />
						1.选择可靠的钱包,如硬件钱包、手机钱包或网页钱句。 <br />
						2.设置强密码和启用双重身份验证(2FA)。 <br />
						3.谨慎对待钓鱼攻击,避免点击未知来源的链接。 <br />
						4.妥善保管私钥和备份钱包信息。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						7.使用硬件钱包有什么优势?
					</view>
					<view class="fz26 py20" style="color: #616161;">
						硬件钱包的优势包括: <br />
						1.私钥离线存储,提高安全性。<br />
						2.防止黑客攻击。<br />
						3.适合长期存储大额资产。<br />
						常见的硬件钱包品牌有Ledger和Trezor
					</view>
					<view class="fz30 fw700"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding: 20rpx 10rpx;">
						8.BOB资产平台在资产管理交易中合规性的要求是什么?
					</view>
					<view class="fz26 py20" style="color: #616161;">
						BOB资产平台需遵守法律和合规性要求包括: <br />
						1.客户身份认证(KYC)和反洗钱(AML)措施。 <br />
						2.遵守香港金融管理局(HKMA)和证券及期货事务监察委员会(SFC)的监管要求。
					</view>
					<view class="fz30 fw700 lh70"
						style="background: url('/static/title-bg.png') no-repeat;background-size: 100% 100%;padding-left: 10rpx;">
						9.如何应对加密货币市场的价格波动?
					</view>
					<view class="fz26 py20" style="color: #616161;">
						虽然USDT是稳定币,但市场波动仍可能影响交易建议: <br />
						1.密切矣注市场行情。<br />
						2.选择合适的交易时机。<br />
						3.使用限价单进行交易。
					</view>
					<view class="fz36 fw700 mt60" style="color: #BE0A0A;">
						免责声明：
					</view>
					<view class="fz26 py20" style="color: #616161;">
						本文所载内容仅供参考之用，如有不应被视为任何形式之推广、投资建议或任何投资产品的邀约、招搅或推荐。<br />
						本文所载内容仅为我司BOB对Tether(USDT)的使用建议，意为广大USDT使用者风险防范与合规进行交易，读者应自行评估并寻求专业意见。
					</view>
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" v-if="index==2||index==1||title=='隐私政策'||title=='下层级奖励'||title=='ABS商业模式资产证劵化程序'||title=='常见问题解答'" :style="{height:windowHeight+'px'}" style="width: 90%;margin-top: var(--status-bar-height);background-color: #fff;
			border-radius: 10rpx;margin-left: 2.5%;margin-right: 2.5%;padding: 2.5%;">
			<view style="width: 90%;margin:10rpx 5%;" v-for="(item,index) in arr" :key="index">
				<rich-text :nodes="item.content"></rich-text>
			</view>
			<view class="fz26" style="width: 90%;margin:10rpx 5%;" v-if="index==null">
				<rich-text :nodes="arr.detail"></rich-text>
			</view>
			<view style="height: 100rpx;"></view>
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
				windowHeight: uni.getSystemInfoSync().windowHeight - 100,
				id: 0,
				index: null,
				title: '',
				arr: [],
				noClick: true,
				total: 0,
				pageNum: 1,
				pageSize: 10,
			}
		},
		onLoad(opt) {
			console.log(opt);
			this.id = opt.id
			
			if (opt.index) {
				this.index = opt.index
				console.log(this.index);
				if (this.index == 0) {
					// this.title = '入门攻略'
					this.title = ''
				}
				if (this.index == 1) {
					this.title = '安全保障'
				}
				if (this.index == 2) {
					this.title = '北银国际'
				}
				this.getArr()
				return
			}
			
			if (opt.name) {
				this.title = opt.name
				this.getArr1()
				return
			}

			

		},
		onReachBottom() {
			//判断 如果页码*页容量大于等于总条数，提示该页数据加载完毕
			if (this.pageNum * this.pageSize >= this.total) {
				return
			}
			//并且让页码+1,调用获取数据的方法获取第二页数据
			this.pageNum++
			//此处调用自己获取数据列表的方法
			this.getArr()
		},
		methods: {
			getArr() {
				let url = ''
				if (this.index == 0) {
					url = '/app/homeFunctionInfo/entryList'
				}
				if (this.index == 1) {
					url = '/app/homeFunctionInfo/safeList'
				}
				if (this.index == 2) {
					url = '/app/homeFunctionInfo/introduceList'
				}
				if (this.index == 3) {
					url = '/app/aboutUs/query'
				}
				// 
				this.$request.get({
					url: url,
					data: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
					},
					success: rsp => {
						if (this.page != 1) {
							this.arr = this.arr.concat(rsp.records)
						} else {
							this.arr = rsp.records
						}
						//将获取的总条数赋值
						this.total = rsp.total
						if (this.pageNum * this.pageSize >= this.total && this.total > this.pageSize) {
							uni.showToast({
								title: '已加载全部',
								icon: 'none'
							})
						}

					}
				})
				
			},
			getArr1() {
				this.$request.get({
					url: '/app/aboutUs/query',
					data: {
						id: this.id
					},
					success: rsp => {
						this.arr = rsp.data
					}
				})
			},
			toBack() {
				uni.navigateBack()
			}
		}
	}
</script>
<style scoped lang="scss">
	// .content {
	// 	background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
	// 	background-size: 100% 60%;
	// 	// color: #ffffff;
	// 	color: #3A3A3A;
	// }

	// .bg1 {
	// 	background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737137699270rmgl-bg.png') no-repeat;
	// 	background-size: 100% auto;
	// }

	.bg2 {
		background: url('https://cecece777.oss-cn-hongkong.aliyuncs.com/null/1737123023235bg.png') no-repeat;
		background-size: 100% auto;
	}
</style>