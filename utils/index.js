import request from './request1';


var url = ""
var url1 = ""
// var url1 = baseUrl
 // url1 = 'https://16639bc6.r35.cpolar.top'
url1="http://43.100.75.222:8877"




function getRandomElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}


if (url1 == "" || !url1) {
	uni.showLoading({
		title: "选择最优线路中",
		mask: true
	})
	if (!uni.getStorageSync('index')) {
		uni.setStorage({
			key: 'index',
			data: 0
		})
	}
	uni.downloadFile({
		url: 'https://comm-won-gn.oss-cn-hangzhou.aliyuncs.com/by/byV1.png?s=' + Math.floor(Math.random() *
			10) + 1, // 替换为实际的文件下载链接
		success: function(res) {
			if (res.statusCode === 200) {
				// 下载成功，‌res.tempFilePath 包含临时文件路径
				console.log('下载成功:', res);
				plus.io.resolveLocalFileSystemURL(res.tempFilePath, function(entry) {
					entry.file(function(file) {
						var fileReader = new plus.io.FileReader();
						fileReader.readAsText(file, 'utf-8');
						fileReader.onloadend = function(evt) {
							let data = evt.target.result.split(",");
							console.log(data);
							// let urls = getRandomElement(atob(data[1]).split("|"))
							let newUrl = atob(data[1])
							let arr = newUrl.split("|")
							let index = uni.getStorageSync('index')
							if (index >= arr.length - 1) {
								uni.setStorage({
									key: 'index',
									data: 0
								})
								index = 0
							}
							console.log(index);
							console.log("arr!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", arr)
							let urls = ''
							for (var i = index; i < arr.length; i++) {
								console.log(arr[i]);
								urls = arr[i]
							}
							console.log("urls!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", urls)
							url1 = urls.trim()
							console.log("url1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", url1)
							uni.hideLoading()
							// 初始化请求配置
							request.setConfig({
								url: url1,
							});

							uni.setStorage({
								key: 'url',
								data: url1
							})
							plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
								console.log(widgetInfo);
								uni.request({
									url: url1 + '/app/versionHistory/query', //仅为示例，并非真实接口地址。
									success: (res) => {
										console.log(res);
										console.log(res.data.data.version, '版本号', widgetInfo.version);
										if (res.data.data.version != widgetInfo.version) {
											console.log('版本号不同', res.data.data);
											uni.request({
												url: url1 +
													'/app/versionHistory/getSysConfig', //仅为示例，并非真实接口地址。
												success: (res1) => {
													console.log(res1, 'getSysConfig');
													let arr = res1.data.data
													console.log(arr);
													uni.navigateTo({
														url: '/pages/webview/webview3?url=' +
															arr[0].configValue
													})
												}
											});
										}
									}
								});
							});

							console.log(url1, '1111111111111111111111111111111');
						}
					});
				}, function(e) {
					console.log("Resolve file URL failed: " + e.message);
				});
			}
		}
	})

} else {
	request.setConfig({
		url: url1,
	});

	uni.setStorage({
		key: 'url',
		data: url1
	})
}


// 设置全局配置
let ajaxTimes = 0;
request.addInterceptors.request(config => {
	ajaxTimes++;
	uni.showLoading({
		// title: '加载中···',
		mask: true
	})
	uni.getSystemInfo({
		success: function(res) {
			config.header['deviceId'] = res.deviceId;
			config.header['deviceType'] = res.deviceType;
			config.header['deviceBrand'] = res.deviceBrand;
			config.header['deviceModel'] = res.deviceModel;
			config.header['deviceOrientation'] = res.deviceOrientation;
			config.header['devicePixelRatio'] = res.devicePixelRatio;
			config.header['osName'] = res.osName;
			config.header['osVersion'] = res.osVersion;
		}
	});
	// console.log(config, 'config');
	console.log(uni.getStorageSync('token'));
	config.header['token'] = uni.getStorageSync('token');
	config.header['group'] = 1;
	uni.setStorage({
		key: 'index-group',
		data: 1
	})
	config.header['Access-Control-Allow-Origin'] = '*';
	console.log(config);
	return config;
})
var numErr = 0
// 不return res或者return false, 则都不会返回值
// return Promise.reject('xxxxx')，主动抛出错误
request.addInterceptors.response(res => {
	ajaxTimes--;
	console.log("res:", res);
	let firstCodeNum = String(res.statusCode).substr(0, 1)
	console.log(firstCodeNum);
	if (ajaxTimes == 0) {
		uni.hideLoading()
	}
	console.log('firstCodeNum', ajaxTimes, firstCodeNum);
	// // 2xx 成功!
	if (firstCodeNum === '2') {
		let data = res.data;
		if (res.data.code == 403 || res.data.code == 405) {
			uni.showToast({
				title: res.data.message,
				icon: 'none',
				mask: true
			})
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}, 1500)

			uni.removeStorageSync('token')
			uni.hideLoading()
		}
		if (res.data.code == 406) {
			let versionTime = uni.getStorageSync("versionTime");
			if (versionTime == null || versionTime == undefined || new Date().getTime() - versionTime > 3000) {

				uni.setStorageSync("versionTime", new Date().getTime())
				console.log(res.data);
				uni.showToast({
					title: res.data.message,
					icon: 'none',
					success: function(rsp) {
						console.log(rsp);
						var url = "";
						if (uni.getSystemInfoSync().osName != "ios") {
							console.log(res.data.data.android);
							url = res.data.data.android;
						} else {
							console.log(res.data.data.android);
							url = res.data.data.ios;
						}
						console.log(url);
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/webview/webview3?url=' + url
							})
						}, 1500);
					},
					fail: function(res) {},
				})
			}
			uni.hideLoading()
		}
		// console.log('request中打印后端返回数据', data);
		return data;
	} else {
		uni.hideLoading()
		uni.showToast({
			title: ' 加载错误，请重新进入页面尝试',
			icon: 'none',
			mask: true
		})
	}

	// 3xx
	if (firstCodeNum === '3') {
		// do something
		return res;
	}

	//4xx or 5xx
	if (firstCodeNum === '4' || firstCodeNum === '5') {
		// do something
		return Promise.reject(res)
	}

	// 停止发送请求 request.stop()
	if (JSON.stringify(res) === '{"errMsg":"request:fail abort"}') {
		// do something
		return false;
	}
	console.log(res);
	numErr += 1
	let indexUrl = uni.getStorageSync('index')
	indexUrl += 1
	uni.setStorage({
		key: 'index',
		data: indexUrl
	})
	console.log('numErrnumErrnumErrnumErr', numErr);
	console.log('indexUrl', indexUrl);
	// if (numErr == 1) {
	// 	numErr = 0
	// setTimeout(() => {
	// 	uni.downloadFile({
	// 		url: 'https://comm-won-gn.oss-cn-hangzhou.aliyuncs.com/by/byV1.png?s=' + Math.floor(
	// 			Math.random() *
	// 			10) + 1, // 替换为实际的文件下载链接
	// 		success: function(res) {
	// 			if (res.statusCode === 200) {
	// 				// 下载成功，‌res.tempFilePath 包含临时文件路径
	// 				console.log('下载成功:', res);
	// 				plus.io.resolveLocalFileSystemURL(res.tempFilePath, function(entry) {
	// 					entry.file(function(file) {
	// 						var fileReader = new plus.io.FileReader();
	// 						fileReader.readAsText(file, 'utf-8');
	// 						fileReader.onloadend = function(evt) {
	// 							let data = evt.target.result.split(",");
	// 							console.log(data);
	// 							// let urls = getRandomElement(atob(data[1]).split("|"))
	// 							let newUrl = atob(data[1])
	// 							let arr = newUrl.split("|")
	// 							let index = uni.getStorageSync('index')
	// 							if (index >= arr.length - 1) {
	// 								uni.setStorage({
	// 									key: 'index',
	// 									data: 0
	// 								})
	// 								index = 0
	// 							}
	// 							console.log("arr",arr)
	// 							console.log(index);
	// 							let urls = ''
	// 							for (var i = index; i < arr.length; i++) {
	// 								console.log(arr[i]);
	// 								urls = arr[i]
	// 							}
	// 							console.log("urls",urls)
	// 							url1 = urls.trim()
	// 							console.log("url1",url1)
	// 							uni.hideLoading()
	// 							// 初始化请求配置
	// 							request.setConfig({
	// 								url: url1,
	// 							});

	// 							uni.setStorage({
	// 								key: 'url',
	// 								data: url1
	// 							})
	// 						}
	// 					});
	// 				}, function(e) {
	// 					console.log("Resolve file URL failed: " + e.message);
	// 				});
	// 			}
	// 		}
	// 	})
	// }, 1000)
	// }


	return Promise.reject(res)
})


export default request