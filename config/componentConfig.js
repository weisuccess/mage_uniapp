// 此方法是接口请求方法
import {BASE_URL2,request} from '../utils/request2.js'
export default {
	// 发起ajax请求获取服务端版本号
	getServerNo: (version, isPrompt = false, callback) => {
		let httpData = {
			version: version.versionCode,
			// 版本名称
		    versionName: version.versionName,
			// setupPage参数说明（判断用户是不是从设置页面点击的更新，如果是设置页面点击的更新，有不要用静默更新了，不然用户点击没反应很奇怪的）
			setupPage: isPrompt   
		};
		const platform = uni.getSystemInfoSync().platform;
		var os=1101;
		if (platform == "android") {
			httpData.type = 1101;
			os=1101;
		} else {
			httpData.type = 1102;
			os=1102;
		}
		/* 接口入参说明
		 * version: 应用当前版本号（已自动获取）
		 * versionName: 应用当前版本名称（已自动获取）
		 * type：平台（1101是安卓，1102是IOS）
		 */
		/****************以下是示例*******************/
		// 可以用自己项目的请求方法（接口自己找后台要，插件不提供）
		var cUrl=uni.getStorageSync('new_BASE_URL');
		console.log(cUrl+"<<<<<<<<<<<<<<<<<");
		uni.request({
			url: cUrl+'Home/Login/app_version',
			method: 'GET',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			data: {os:os},
			success: res => {
				console.log(version)
				var nArr=version.versionName.split('.');
				var oArr=res.data.versionName.split('.');
				if(nArr[0]!=oArr[0]||nArr[1]!=oArr[1]||nArr[2]!=oArr[2]){
					if(nArr[0]!=oArr[0]||nArr[1]!=oArr[1]){//1.0.1 如果前两位不同，就强制更新
						res.data.updateType="forcibly";//强制更新
					}
					callback && callback(res.data);
				}else{
					// uni.showToast({
					// 	title: "当前已是最新版本！",
					// 	icon: "none"
					// });
				}
		
			},
			fail: err => {
				
			},
			complete: () => {
		
			}
		})
		
		/****************以上是示例*******************/
	},
	// 弹窗主颜色（不填默认粉色）
	appUpdateColor: "f00",
	// 弹窗图标（不填显示默认图标，链接配置示例如： '/static/demo/ic_attention.png'）
	appUpdateIcon: ''
}