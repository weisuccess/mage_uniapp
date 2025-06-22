import CryptoJS from '@/utils/crypto-js.js'
export default {
	install(plugin){
		plugin.mixin({
			methods:{
				encrypt(str) {
				       var key = CryptoJS.enc.Utf8.parse("AAAAAAAABBBBBBBB");
				       var iv = CryptoJS.enc.Utf8.parse("CCCCCC_AAAAABBBB");
				       var encrypted = CryptoJS.AES.encrypt(str, key, {
				           iv: iv,
				           mode: CryptoJS.mode.CBC,
				           padding: CryptoJS.pad.Pkcs7
				       });
				       return "p_="+encrypted.toString();
				  },
				decrypt(str) {
				    var key = CryptoJS.enc.Utf8.parse("AAAAAAAABBBBBBBB");
				    var iv = CryptoJS.enc.Utf8.parse("CCCCCC_AAAAABBBB");
				    var decrypt = CryptoJS.AES.decrypt(str, key, {
				      iv: iv,
				      mode: CryptoJS.mode.CBC,
				      padding: CryptoJS.pad.Pkcs7
				    });
					var ss=decrypt.toString(CryptoJS.enc.Utf8);
					var aa=JSON.parse(ss);
					if(99==aa['status']){
						console.log("error:99");
						uni.setStorageSync('page_cover_index',"");
						uni.showToast({title: this.getLg("该账户已在其他设备上登录"),icon:'none',duration: 2000},{
							backgroundColor:'#FFFFFF'
						});
						setTimeout(() => {
							uni.setStorageSync('token',-1);
							uni.redirectTo({
								url:'../login/login'
							})
						}, 2000);
						
					}
					console.log("sssss:"+ss);
				    return ss;
				},
				toHtml(txt){
					return txt.replace(/\n/g, "<br>");
				},
				toPage(page,index){
					if(page){
						let mode = getMode(index)
						uni[mode]({
							url: '/pages/'+page,
							fail:(e)=>{
								console.log('[error]'+e.errMsg)
							}
						})
					}else{
						// noPage()
					}
				},
				getDay(day){
					let myDate = new Date();
					myDate.setDate(myDate.getDate() + day);
					
					let nowYear = myDate.getFullYear();
					
					let nowMonth = myDate.getMonth() + 1;
					nowMonth = nowMonth>=10?nowMonth:"0"+nowMonth;
					
					let nowDay = myDate.getDate();
					nowDay = nowDay>=10?nowDay:"0"+nowDay;
					
					let dayStr = nowYear
					dayStr+="/";
					dayStr+=nowMonth;
					dayStr+="/";
					dayStr+=nowDay;
					
					return dayStr;
				},
				goBack(delta=1,page="cover/index"){
					if(getCurrentPages().length>1){
						uni.navigateBack({
							delta:delta
						})
					}else{
						this.toPage(page,4)
					}
				},
				showMsg2(msg,icon='none'){
					uni.showToast({
						icon:icon,
						title:msg
					})
				},
				showSuccess(msg){
					this.showMsg2(msg,'success')
				},
				showError(msg){
					this.showMsg2(msg,'error')
				},
				getLg(name){
					return name;
				},
				toVNDInput(money){
					money = money+"";
					return money.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
				},
				toVND(money){
					money = money+"";
					money = money.split(".");
					var num = money[0];
					return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
				}
				
			}
		})
	}
}
function noPage(){
	uni.showToast({
		title:'NO PAGE',
		icon:'error'
	})
}
function getMode(index){
	let mode = 'navigateTo'
	switch(index){
		case 1:
			mode = 'navigateTo'
		break;
		case 2:
			mode = 'switchTab'
		break;
		case 3:
			mode = 'redirectTo'
		break;
		case 4:
			mode = 'reLaunch'
		break;
	}
	return mode
}

function getLg2 (name){
	let reStr="";
	switch(name){
		case "应用名称":
			reStr="JMC";
			break;
		case "登录":
			reStr="Đăng nhập";
			break;
		case "在线客服":
			reStr="Dịch vụ trực tuyến";
			break;
		case "注册":
			reStr="Đăng ký";
			break;
		case "请输入短信验证码":
			reStr="Mã xác minh SMS";
			break;
		case "获取验证码":
			reStr="Lấy mã xác minh";
			break;
		case "重新发送":
			reStr="Gửi lại";
			break;
		case "请输入手机验证码":
			reStr="Vui lòng nhập Mã xác minh SMS";
			break;
		case "验证码获取失败!":
			reStr="Không lấy được mã xác minh";
			break;
		case "发送成功":
			reStr="Gửi thành công";
			break;
		case "手机验证码错误，请重新输入!":
			reStr="Mã xác minh số điện thoại di động bị sai, vui lòng nhập lại.";
			break;
		case "阅读并同意":
			reStr="Đọc và đồng ý";
			break;
		case "用户协议":
			reStr="Sự thỏa thuận của người dùng";
			break;
		case "隐私协议":
			reStr="Thỏa thuận quyền riêng tư";
			break;
		case "线路匹配中":
			reStr="Khớp dòng";
			break;
		case "自动登录中":
			reStr="Tự động đăng nhập";
			break;	
		case "取消":
			reStr="Hủy bỏ";
			break;	
		case "用户登录":
			reStr="Đăng nhập người dùng";
			break;
		case "密码登录":
			reStr="Mật khẩu đăng nhập";
			break;
		case "验证码登录":
			reStr="Đăng nhập mã xác minh";
			break;
		case "请输入手机号":
			reStr="Vui lòng nhập số điện thoại";
			break;	
		case "请输入密码":
			reStr="Xin vui lòng nhập mật khẩu";
			break;
		case "记住密码":
			reStr="Nhớ mật khẩu";
			break;	
		case "忘记密码":
			reStr="Quên mật khẩu";
			break;
		case "请阅读并同意《用户协议》和《隐私政策》":
			reStr='Vui lòng đọc và đồng ý với "Thỏa thuận người dùng" và "Chính sách quyền riêng tư"';
			break;	
		case "请输入手机号码":
			reStr="Vui lòng nhập số điện thoại";
			break;
		case "登录成功":
			reStr="Đăng nhập thành công";
			break;
		case "请稍等一下,服务器正在处理!":
			reStr="Hệ thống đang xử lý,vui lòng đợi !";
			break;	
		case "账户已被冻结,请联系客服!":
			reStr="Tài khoản đã bị đóng băng, vui lòng liên hệ bộ phận chăm sóc khách hàng";
			break;
		case "密码错误":
			reStr="Sai mật khẩu";
			break;	
		case "用户名不存在!":
			reStr="Tên đăng nhập không tồn tại!";
			break;
		case "确定":
			reStr="Xác nhận";
			break;
		case "用户注册":
			reStr="Đăng ký người dùng";
			break;
		case "再次输入密码":
			reStr="Nhập lại mật khẩu";
			break;	
		case "邀请码(必填)":
			reStr="Mã mời (bắt buộc)";
			break;
		case "验证码":
			reStr="Mã xác nhận";
			break;
		case "请输入正确的手机号码":
			reStr="Vui lòng nhập đúng số điện thoại";
			break;
		case "请输入密码,6位字符以上":
			reStr="Vui lòng nhập mật khẩu, nhiều hơn 6 ký tự";
			break;
		case "请确认密码":
			reStr="Vui lòng xác nhận mật khẩu của bạn";
			break;
		case "两次密码不同":
			reStr="Hai mật khẩu khác nhau";
			break;	
		case "请输入邀请码":
			reStr="Vui lòng nhập mã mời";
			break;	
		case "请输入验证码":
			reStr="Vui lòng nhập mã xác nhận";
			break;	
		case "验证码错误":
			reStr="Lỗi mã xác minh";
			break;	
		case "手机号已被注册，请更换手机号!":
			reStr="Số điện thoại di động đã được đăng ký, vui lòng đổi số điện thoại di động!";
			break;
		case "您输入的邀请人推荐ID不存在!":
			reStr="Mã mời bạn đã nhập không tồn tại!";
			break;	
		case "立即注册":
			reStr="Đăng ký ngay";
			break;
		case "站内提示":
			reStr="Thông báo";
			break;	
		case "新手指南":
			reStr="Vận hành";
			break;
		case "最新资讯":
			reStr="Thông tin";
			break;	
		case "客服指引":
			reStr="CSKH";
			break;
		case "热门推荐":
			reStr="Phổ biến";
			break;	
		case "开启盲盒":
			reStr="Hộp bí ẩn";
			break;
		case "已售罄":
			reStr="Bán hết";
			break;	
		case "收益率":
			reStr="Lãi suất ngày";
			break;
		case "首页":
			reStr="Trang chủ";
			break;	
		case "交易":
			reStr="Đầu tư";
			break;
		case "兑换":
			reStr="Đổi điểm";
			break;	
		case "我的":
			reStr="Tài khoản";
			break;
		case "设置交易密码":
			reStr="Thiết lập mật khẩu thanh toán";
			break;
		case "新交易密码":
			reStr="Mật khẩu thanh toán mới";
			break;
		case "确认新密码":
			reStr="Xác nhận mật khẩu mới";
			break;
		case "保存":
			reStr="Chắc chắn";
			break;	
		case "购买金额":
			reStr="Giá mua";
			break;	
		case "请输入购买金额":
			reStr="Vui lòng nhập số tiền mua";
			break;	
		case "最多可购买金额":
			reStr="Số tiền mua tối đa";
			break;	
		case "交易密码":
			reStr="Mật khẩu thanh toán";
			break;
		case "请输入交易密码":
			reStr="Vui lòng nhập mật khẩu";
			break;	
		case "立即购买":
			reStr="Mua nó ngay bây giờ";
			break;
		case "产品详情":
			reStr="Chi tiết";
			break;
		case "日":
			reStr="Ngày";
			break;
		case "天":
			reStr="Thu nhập ngày";
			break;
		case "天了":
			reStr="ngày";
			break;
		case "周期":
			reStr="Kỳ hạn";
			break;	
		case "认证信息":
			reStr="Thông tin chứng nhận";
			break;
		case "合约地址":
			reStr="Địa chỉ";
			break;	
		case "认证标识":
			reStr="Dấu chứng nhận";
			break;
		case "认证标准":
			reStr="Tiêu chuẩn chứng nhận";
			break;	
		case "认证网络":
			reStr="Mạng xác thực";
			break;
		case "市场描述":
			reStr="Mô tả thị trường";
			break;	
		case "请输入正确的金额":
			reStr="Vui lòng nhập đúng số tiền";
			break;
		case "本产品最低金额为":
			reStr="Số tiền tối thiểu cho sản phẩm này là";
			break;	
		case "本产品最高金额为":
			reStr="Số tiền tối đa cho sản phẩm này là";
			break;
		case "参数错误":
			reStr="Lỗi tham số";
			break;
		case "请输入交易密码":
			reStr="Vui lòng nhập mật khẩu thanh toán";
			break;
		case "购买成功":
			reStr="Mua thành công";
			break;
		case "请输入新交易密码,长度6位以上.":
			reStr="Vui lòng nhập mật khẩu thanh toán mới, mật khẩu phải dài ít nhất 6 ký tự.";
			break;
		case "两次密码不同，请重新输入":
			reStr="Hai mật khẩu này khác nhau, vui lòng nhập lại";
			break;	
		case "设置成功":
			reStr="Thiết lập thành công";
			break;	
		case "请先进行实名认证":
			reStr="Vui lòng thực hiện xác thực tên thật trước";
			break;	
		case "交易密码错误":
			reStr="Sai mật khẩu thanh toán";
			break;	
		case "余额不足":
			reStr="Thiếu cân bằng";
			break;
		case "该藏品已售罄":
			reStr="Bộ sưu tập này đã bán hết";
			break;	
		case "购买":
			reStr="Mua";
			break;
		case "起购金额":
			reStr="Số tiền tối thiểu";
			break;	
		case "限购金额":
			reStr="Số tiền tối đa";
			break;
		case "限购份数":
			reStr="Số lượng tối đa";
			break;	
		case "份":
			reStr="Số lượng";
			break;
		case "结算方式":
			reStr="Ghi chú";
			break;	
		case "满24小时自动结息":
			reStr="Lãi sẽ được tự động giải quyết sau 24h";
			break;
		case "数量":
			reStr="Số lượng";
			break;	
		case "金额":
			reStr="Số tiền";
			break;
		case "请输入金额":
			reStr="Vui lòng nhập số tiền";
			break;	
		case "收益":
			reStr="Thu nhập";
			break;
		case "立即支付":
			reStr="Thanh toán ngay";
			break;	
		case "最多可购买数量":
			reStr="Số lượng mua tối đa";
			break;
		case "我的积分":
			reStr="Điểm của tôi";
			break;
		case "记录":
			reStr="Lịch sử đổi";
			break;
		case "积分":
			reStr="Điểm";
			break;
		case "价格":
			reStr="Giá";
			break;
		case "兑换流程":
			reStr="Quy trình đổi thưởng";
			break;	
		case "点击兑换":
			reStr="Trao đổi";
			break;	
		case "填写地址":
			reStr="Điền địa chỉ";
			break;	
		case "下单支付":
			reStr="Chi trả";
			break;	
		case "发布物流":
			reStr="Giao hàng";
			break;
		case "商品详情":
			reStr="Chi tiết";
			break;	
		case "立即兑换":
			reStr="Đổi ngay bây giờ";
			break;
		case "名称":
			reStr="Tên";
			break;	
		case "收货人姓名":
			reStr="Người nhận";
			break;
		case "联系电话":
			reStr="Số liên lạc";
			break;	
		case "收货地址":
			reStr="Địa chỉ";
			break;
		case "请输入":
			reStr="Vui lòng nhập";
			break;	
		case "请输入收货人姓名":
			reStr="Vui lòng nhập tên người nhận hàng";
			break;
		case "请输入联系电话":
			reStr="Vui lòng nhập số điện thoại của bạn";
			break;	
		case "请输入收货地址":
			reStr="Vui lòng nhập địa chỉ giao hàng";
			break;
		case "兑换成功":
			reStr="Đổi thưởng thành công";
			break;	
		case "积分不足":
			reStr="Không đủ điểm";
			break;
		case "拒绝":
			reStr="Từ chối";
			break;	
		case "审核中":
			reStr="Đang được xem xét";
			break;
		case "已经发货":
			reStr="Đã giao hàng";
			break;
		case "签到":
			reStr="Thưởng đăng nhập";
			break;	
		case "账户余额":
			reStr="Số dư tài khoản";
			break;
		case "昨日收益":
			reStr="Thu nhập của ngày hôm qua";
			break;	
		case "累计收益":
			reStr="Thu nhập tích lũy";
			break;
		case "余币宝":
			reStr="Số tiền còn lại";
			break;	
		case "年化利率":
			reStr="Mỗi năm";
			break;
		case "转出":
			reStr="Chuyển ra ngoài";
			break;
		case "转入":
			reStr="Chuyển giao";
			break;	
		case "个人中心":
			reStr="Trung tâm cá nhân";
			break;
		case "充值":
			reStr="Nạp tiền";
			break;	
		case "提现":
			reStr="Rút tiền";
			break;
		case "我的订单":
			reStr="Đang đầu tư";
			break;	
		case "我的盲盒":
			reStr="Hộp bí ẩn";
			break;
		case "排行榜":
			reStr="Xếp hạng";
			break;
		case "会员权益":
			reStr="Thành viên";
			break;	
		case "我的团队":
			reStr="Đội của tôi";
			break;
		case "邀请好友":
			reStr="Mời bạn bè";
			break;	
		case "资金明细":
			reStr="Chi tiết quỹ";
			break;
		case "积分明细":
			reStr="Chi tiết điểm";
			break;	
		case "充值记录":
			reStr="Kỷ lục nạp tiền";
			break;
		case "提现记录":
			reStr="Hồ sơ rút tiền";
			break;
		case "安全退出":
			reStr="ĐĂNG XUẤT";
			break;	
		case "请先绑定银行卡":
			reStr="Vui lòng ràng buộc thẻ ngân hàng của bạn trước";
			break;
		case "请输入转出金额":
			reStr="Vui lòng nhập số tiền chuyển";
			break;	
		case "最小金额为":
			reStr="Số tiền tối thiểu là";
			break;
		case "最大金额为":
			reStr="Số tiền tối đa là";
			break;	
		case "转入成功":
			reStr="Chuyển thành công";
			break;
		case "超出了可用金额":
			reStr="Đã vượt quá số lượng có sẵn";
			break;
		case "转出成功":
			reStr="Chuyển thành công";
			break;	
		case "余额":
			reStr="Số dư ví";
			break;
		case "USDT充值":
			reStr="Tiền gửi USDT";
			break;	
		case "银联充值":
			reStr="Nạp tiền";
			break;
		case "暂无渠道，请联系客服":
			reStr="CSKH";
			break;	
		case "上传中":
			reStr="Đang tải lên";
			break;
		case "设置":
			reStr="Cài đặt";
			break;
		case "头像":
			reStr="Hình đại diện";
			break;	
		case "实名认证":
			reStr="Xác minh danh tính";
			break;
		case "修改登录密码":
			reStr="Thay đổi mật khẩu đăng nhập";
			break;	
		case "修改交易密码":
			reStr="Thay đổi mật khẩu thanh toán";
			break;
		case "请认证您的真实身份":
			reStr="Vui lòng xác minh danh tính thực sự của bạn";
			break;	
		case "为保障您的帐户安全，避免身份信息被盗用":
			reStr="Để bảo vệ tính bảo mật cho tài khoản của bạn và ngăn chặn hành vi trộm cắp danh tính";
			break;
		case "请先完成实名认证，我们承诺保护您的信息安全":
			reStr="Vui lòng hoàn tất xác thực tên thật trước. Chúng tôi cam kết bảo mật thông tin của bạn.";
			break;
		case "真实姓名":
			reStr="Tên thật";
			break;	
		case "身份证号":
			reStr="Số ID";
			break;
		case "身份证正面":
			reStr="Đằng trước";
			break;	
		case "身份证背面":
			reStr="Mặt sau";
			break;
		case "手持身份证照片":
			reStr="Cầm chứng minh thư";
			break;	
		case "完成":
			reStr="Hoàn thành";
			break;
		case "请输入真实姓名":
			reStr="Vui lòng nhập tên thật của bạn";
			break;
		case "请输入身份证号码":
			reStr="Vui lòng nhập số ID của bạn";
			break;	
		case "请上传身份证正面":
			reStr="Vui lòng tải lên mặt trước CMND của bạn";
			break;
		case "请上传身份证背面":
			reStr="Vui lòng tải lên mặt sau CMND của bạn";
			break;	
		case "请上传手持身份证":
			reStr="Vui lòng tải lên thẻ ID cầm tay của bạn";
			break;
		case "原登录密码":
			reStr="Mật khẩu đăng nhập gốc";
			break;	
		case "新登录密码":
			reStr="Mật khẩu đăng nhập mới";
			break;
		case "请输入原登录密码":
			reStr="Vui lòng nhập mật khẩu đăng nhập ban đầu";
			break;
		case "请输入新登录密码,长度6位以上.":
			reStr="Vui lòng nhập mật khẩu đăng nhập mới, mật khẩu phải dài ít nhất 6 ký tự.";
			break;	
		case "原交易密码":
			reStr="Mật khẩu thanh toán gốc";
			break;
		case "请输入原交易密码":
			reStr="Vui lòng nhập mật khẩu thanh toán ban đầu";
			break;	
		case "每日签到大礼包":
			reStr="Gói quà đăng nhập hàng ngày";
			break;
		case "无限积分拿不停":
			reStr="Kiếm điểm không giới hạn mà không cần dừng lại";
			break;	
		case "已连续签到":
			reStr="Đăng nhập liên tục";
			break;
		case "立即签到":
			reStr="Đăng nhập ngay";
			break;
		case "已签到":
			reStr="Đã đăng nhập";
			break;	
		case "注：连续满签为30天，断签或连续签满后重置":
			reStr="Lưu ý: Ký liên tục trong 30 ngày, sẽ được reset sau khi tạm dừng hoặc ký đầy đủ liên tục.";
			break;
		case "资金流水":
			reStr="Dòng vốn";
			break;	
		case "收款信息":
			reStr="Thông báo thanh toán";
			break;
		case "联系客服进行充值":
			reStr="Liên hệ với dịch vụ khách hàng để nạp tiền";
			break;	
		case "上传凭证":
			reStr="Tải lên chứng chỉ";
			break;
		case "到账金额":
			reStr="Số tiền nhận được";
			break;
		case "充值金额":
			reStr="Số tiền nạp";
			break;	
		case "备注信息":
			reStr="Bình luận";
			break;
		case "提交充值":
			reStr="Gửi nạp tiền";
			break;	
		case "充值须知":
			reStr="Hướng dẫn nạp tiền";
			break;
		case "请点击图片上传凭证":
			reStr="Vui lòng nhấp vào hình ảnh để tải lên chứng chỉ";
			break;	
		case "请输入正确的充值金额":
			reStr="Vui lòng nhập đúng số tiền nạp";
			break;
		case "提交成功,等待审核":
			reStr="Đã gửi thành công, đang chờ xét duyệt";
			break;
		case "您有未审核的的充值订单，请稍后操作":
			reStr="Bạn có lệnh nạp tiền chưa được phê duyệt, vui lòng thao tác sau.";
			break;	
		case "提现方式":
			reStr="Đăng nhập";
			break;
		case "选择提现方式":
			reStr="Đăng nhập";
			break;	
		case "银联提现":
			reStr="Rút tiền";
			break;
		case "绑定银行卡":
			reStr="Liên kết tài khoản ngân hàng";
			break;	
		case "银行名称":
			reStr="Tên ngân hàng";
			break;
		case "开户人姓名":
			reStr="Tên chủ tài khoản";
			break;
		case "银行卡号":
			reStr="Số tài khoản";
			break;	
		case "请输入银行名称":
			reStr="Vui lòng nhập tên ngân hàng";
			break;
		case "请输入开户人姓名":
			reStr="Vui lòng nhập tên chủ tài khoản";
			break;	
		case "请输入银行卡号":
			reStr="Vui lòng nhập số thẻ ngân hàng";
			break;
		case "USDT汇率":
			reStr="USDT tỷ giá";
			break;	
		case "输入金额":
			reStr="Nhập số tiền";
			break;
		case "最少输入":
			reStr="Số tiền tối thiểu";
			break;
		case "请输入整数":
			reStr="Vui lòng nhập một số nguyên";
			break;	
		case "您有未审核的的提现订单":
			reStr="Bạn có lệnh rút tiền chưa được phê duyệt";
			break;
		case "帐户余额不足":
			reStr="Số dư tài khoản không đủ";
			break;	
		case "提现须知":
			reStr="Hướng dẫn rút tiền";
			break;
		case "全部":
			reStr="Tất cả";
			break;	
		case "进行中":
			reStr="Trong tiến trình";
			break;
		case "买入":
			reStr="Mua";
			break;	
		case "合成产品":
			reStr="Sản phẩm tổng hợp";
			break;
		case "完整产品中奖":
			reStr="Chiến thắng sản phẩm hoàn chỉnh";
			break;	
		case "待赎回":
			reStr="Tái đầu tư";
			break;
		case "赎回中":
			reStr="Đổi thưởng";
			break;	
		case "已赎回":
			reStr="Được chuộc lại";
			break;
		case "购入价格":
			reStr="Giá mua";
			break;
		case "购入时间":
			reStr="Thời gian mua hàng";
			break;	
		case "到期时间":
			reStr="Hạn sử dụng";
			break;
		case "到期赎回":
			reStr="Chuộc lỗi";
			break;	
		case "订单进行中，无法赎回":
			reStr="Đơn đặt hàng đang được xử lý và không thể đổi được";
			break;
		case "盲盒价格":
			reStr="Giá hộp mù";
			break;	
		case "盲盒产品":
			reStr="Sản phẩm hộp mù";
			break;
		case "盲盒内容":
			reStr="Nội dung hộp mù";
			break;
		case "合成完整产品":
			reStr="Tổng hợp";
			break;	
		case "已拥有":
			reStr="Có";
			break;
		case "规则描述":
			reStr="Mô tả quy tắc";
			break;	
		case "购买盲盒":
			reStr="Mua hộp mù";
			break;
		case "中奖记录":
			reStr="Chiến thắng";
			break;	
		case "合成记录":
			reStr="Tổng hợp";
			break;
		case "中奖":
			reStr="Chiến thắng";
			break;
		case "合成产品":
			reStr="Sản phẩm tổng hợp";
			break;	
		case "碎片":
			reStr="Mảnh vỡ";
			break;
		case "完整产品":
			reStr="Sản phẩm";
			break;	
		case "产品价格":
			reStr="Giá sản phẩm";
			break;
		case "时间":
			reStr="Thời gian";
			break;	
		case "只显示前50名":
			reStr="Chỉ hiển thị top 50";
			break;
		case "成交额":
			reStr="Doanh số";
			break;
		case "用户":
			reStr="Người dùng";
			break;	
		case "排名":
			reStr="Xếp hạng";
			break;
		case "会员奖励":
			reStr="Phần thưởng";
			break;	
		case "等级":
			reStr="Cấp";
			break;
		case "交易总额":
			reStr="Tổng chi tiêu";
			break;	
		case "额外利率":
			reStr="Lãi suất bổ sung";
			break;
		case "团队奖励":
			reStr="Thưởng lên cấp";
			break;
		case "人数":
			reStr="Số lượng người";
			break;	
		case "状态":
			reStr="Tình trạng";
			break;
		case "未达成":
			reStr="Không đạt";
			break;	
		case "领取":
			reStr="Nhận được";
			break;
		case "已领取":
			reStr="Đạt";
			break;	
		case "领取成功":
			reStr="Đã nhận thành công";
			break;
		case "邀请好友":
			reStr="Mời bạn bè";
			break;
		case "市场记录":
			reStr="Kỷ lục thị trường";
			break;	
		case "邀请朋友扫码，成为合作伙伴":
			reStr="Mời bạn bè quét mã QR và trở thành đối tác";
			break;
		case "复制推广链接发给朋友，邀请码":
			reStr="Copy link khuyến mãi gửi cho bạn bè, mã mời";
			break;	
		case "复制":
			reStr="Sao chép";
			break;
		case "复制成功~":
			reStr="Đã sao chép thành công";
			break;
		case "只需三步 即可获得佣金":
			reStr="Chỉ cần ba bước để nhận hoa hồng";
			break;	
		case "通过以上方式邀请好友":
			reStr="Mời bạn bè thông qua các phương pháp trên";
			break;
		case "产生交易您将获得收益奖励三代":
			reStr="Tạo giao dịch và bạn sẽ nhận được phần thưởng thu nhập cho ba thế hệ";
			break;
		case "一级":
			reStr="Cấp độ 1";
			break;	
		case "二级":
			reStr="Cấp độ 2";
			break;
		case "三级":
			reStr="Cấp độ 3";
			break;	
		case "用户名":
			reStr="Tên tài khoản";
			break;
		case "级别":
			reStr="Mức độ";
			break;	
		case "注册时间":
			reStr="Thời gian đăng ký";
			break;
		case "充值总额":
			reStr="Hoa hồng tuyến dưới";
			break;
		case "提现总额":
			reStr="Tổng số tiền rút";
			break;	
		case "消费总额":
			reStr="Tổng chi tiêu";
			break;
		case "转入余额宝":
			reStr="Chuyển đến Yu’E Bao";
			break;	
		case "转出余额宝":
			reStr="Chuyển Yu’E Bao ra ngoài";
			break;
		case "充值成功":
			reStr="Nạp tiền thành công";
			break;	
		case "扣款成功":
			reStr="Ghi nợ thành công";
			break;
		case "项目分红":
			reStr="Cổ tức dự án";
			break;
		case "项目到期":
			reStr="Dự án hết hạn";
			break;	
		case "加入项目":
			reStr="Tham gia dự án";
			break;
		case "银行卡兑换USDT":
			reStr="Đổi thẻ ngân hàng";
			break;	
		case "购买藏品赠送积分":
			reStr="Nhận điểm khi mua bộ sưu tập";
			break;
		case "会员等级提升赠送积分":
			reStr="Điểm thưởng khi nâng cấp thành viên";
			break;	
		case "本产品碎片":
			reStr="Các mảnh của sản phẩm này";
			break;
		case "盲盒免费抽奖次数":
			reStr="Số lần rút hộp mù miễn phí";
			break;
		case "合成失败!":
			reStr="Tổng hợp thất bại!";
			break;			
		case "今日已签到":
			reStr="Đã đăng nhập hôm nay";
			break;
		case "签到成功":
			reStr="Đăng nhập thành công";
			break;
		case "签到获得：":
			reStr="Bạn nhận được ";
			break;
		case "恭喜你，获得实物奖励：":
			reStr="Xin chúc mừng, bạn đã nhận được phần thưởng vật chất:";
			break;
		case "，请联系客服领取":
			reStr=", vui lòng liên hệ bộ phận chăm sóc khách hàng để lấy nó";
			break;
		case "签到获得盲盒抽奖次数：":
			reStr="Đăng nhập để lấy số lần rút hộp mù:";
			break;
		case "次,产品：":
			reStr="thời gian, sản phẩm:";
			break;
		case "银行卡提款退回":
			reStr="Hoàn trả rút tiền thẻ ngân hàng";
			break;
		case "银行卡提款申请":
			reStr="Ứng dụng rút tiền thẻ ngân hàng";
			break;
		case "密码修改完成":
			reStr="Hoàn thành";
			break;
		case "原密码错误":
			reStr="Sai mật khẩu gốc";
			break;
		case "签到积分":
			reStr="Thưởng điểm danh";
			break;
		case "积分商城兑换商品":
			reStr="Điểm tích luỹ đổi vật phẩm";
			break;
		case "提现每天不能超过1单。":
			reStr="Mỗi ngày chỉ được rút tiền 1 lần";
			break;
		case "详情":
			reStr="CHI TIẾT";
			break;
		case "保存失败":
			reStr="Lưu không thành công";
			break;
		case "积分赠送比例":
			reStr="Tỉ lệ quy đổi : Đầu tư 350.000VND = 1 Điểm";
			break;
		case "请输入区号或者国家":
			reStr="Vui lòng nhập mã vùng hoặc quốc gia";
			break;			
		case "注册成功":
			reStr="Đăng ký thành công";
			break;
		case "恭喜您获得":
			reStr="chúc mừng bạn đã nhận được";
			break;
		case "盲盒抽奖机会":
			reStr="cơ hội xổ số hộp mù";
			break;
		case "次":
			reStr="tần số";
			break;
		case "请登录APP到开启盲盒":
			reStr="vui lòng đăng nhập APP để mở hộp mù";
			break;
		case "查看":
			reStr="kiểm tra";
			break;
		case "项目本金返款":
			reStr="Hoàn trả tiền gốc hạng mục";
			break;
		case "1层下级":
			reStr="Tuyến dưới cấp 1";
			break;
		case "2层下级":
			reStr="Tuyến dưới cấp 2";
			break;
		case "3层下级":
			reStr="Tuyến dưới cấp 3";
			break;
		case "新手礼包":
			reStr="Gói quà dành cho người mới";
			break;
		default:
			reStr="";
	}
	return reStr
		
}