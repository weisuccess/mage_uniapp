import request from './request1';
import debounce from './debounce';

  
 
var url = ""
var url1 = ""
// var url1 = baseUrl
// url1 = 'http://api.ubi90011.com'
 
url1 = uni.getStorageSync('url') || ''
url1 = "http://192.168.1.11:8877/"
// url1 = "http://47.242.222.144:8877/"

 if(url!=''|| url1!=null)
 {
	 	uni.setStorageSync('url',url1)
		
		request.setConfig({
			url: url1,
		});
 }


 
  // url1 = "http://192.168.1.88:8877/"
 // url1 = "http://api.guotaiminan1999.com"
  
   //http://api.https://dd.wmxcn.com.com|http://api.https://dd.wmxcn.com.com
 //   const t1="data:image/png;base64,aHR0cHM6Ly9hcGkuZ3VvdGFpbWluYW4xOTk5LmNvbXxodHRwczovL2FwaS5ndW90YWltaW5hbjE5OTkuY29t";
 //   console.log(t1);
 // console.log(base64Decode(t1.split(',')[1]));
   
 //   const arrayBuffer = uni.base64ToArrayBuffer(t1);
 
 //   const blob = new Blob([arrayBuffer], { type: 'image/png' });
 //   const Url = URL.createObjectURL(blob);
 //   console.log(Url.toString());
   
  // request.setConfig({
  // 	url: url1,
  // });
  
  // uni.setStorage({
  // 	key: 'url',
  // 	data: url1
  // })
console.log("===============abc"+url1);
 // uni.clearStorage('url')
 // uni.clearStorage('index')

function getRandomElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
if (url1 == "" || !url1) {
	init()
	// uni.request({
	// 	url: 'https://api.wmxcn.com/app/dreamUserInfo/login', // 接口地址
	// 	method: 'GET', // 请求方法
	// 	data: {
	// 	 telPhone:'',
	// 	 password:''
	// 	},
	// 	success: (res) => {
		
			 
	// 		url1="https://api.wmxcn.com";
			
	
	// 			request.setConfig({
	// 				url: url1,
	// 			});

	// 			uni.setStorage({
	// 				key: 'url',
	// 				data: url1
	// 			})
			
	// 	},
	// 	fail: (err) => {
	// 		 console.log("接口错误");
	// 		init();
	// 	},
	// });
}


function init()
{
	if (url1 == "" || !url1) {
		// uni.showLoading({
		// 	title: "选择最优线路中",
		// 	mask: true,
		// })
		// uni.setStorage({
		// 	key: 'askIndex',
		// 	data: 0
		// })
		// console.log('askIndex', uni.getStorageSync('askIndex'))
		setTimeout(() => {
			uni.hideLoading()
		}, 5000)
		if (!uni.getStorageSync('index')) {
			uni.setStorage({
				key: 'index',
				data: 0
			})
		}
	
		uni.downloadFile({
			url: 'https://mega-1362607592.cos.ap-hongkong.myqcloud.com/mega.png?s=' + Math.floor(Math.random() *
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
								console.log(url1, '1111111111111111111111111111111');
							}
						});
					}, function(e) {
						console.log("Resolve file URL failed: " + e.message);
					});
				}
			},
			complete: (e) => {
				uni.hideLoading()
				console.log(e);
				if (e.statusCode && e.statusCode != 200) {
					uni.showModal({
						title: '提示' ,
						content: '网络异常',
						confirmText:'重新加载',
						cancelText:'取消',
						
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.setStorage({
									key: 'index',
									data: 0
								})
								uni.removeStorageSync('url')
								plus.runtime.restart();
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					// uni.showToast({
					// 	title: '网络异常',
					// 	icon: 'error'
					// })
				}
				console.log(e);
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
}

// 设置全局配置
let ajaxTimes = 0;
let isMask=true;
request.addInterceptors.request(config => {
	 
	ajaxTimes++;
	if(false)
	{
		uni.showLoading({
			// title: '加载中···',
			mask: true
		})
	} 
	
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
	//console.log(uni.getStorageSync('token'));
	config.header['token'] = uni.getStorageSync('token');
	config.header['group'] = 1;
	uni.setStorage({
		key: 'index-group',
		data: 1
	})
	config.header['Access-Control-Allow-Origin'] = '*';
	//console.log(config);
	return config;
})
var numErr = 0

// 不return res或者return false, 则都不会返回值
// return Promise.reject('xxxxx')，主动抛出错误
request.addInterceptors.response(res => {
	//isMask=true;
	ajaxTimes--;
	  
	let firstCodeNum = String(res.statusCode).substr(0, 1)
	//console.log(firstCodeNum);
	if (ajaxTimes == 0) {
		uni.hideLoading()
	}
	
	 console.log('firstCodeNum', ajaxTimes, firstCodeNum);
	// // 2xx 成功!
	if (firstCodeNum === '2') {
		let data = res.data;
		if (res.data.code == 403 || res.data.code == 405) {
			console.log(res.data.message);
			
			 
			var lang=uni.getStorageSync('locale');
			var msg='';
		 
				msg="请先登录";
			 
			
			 
			
			uni.showToast({
				title:"请先登录",
				icon: 'none',
				mask: true
			})
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/login/newlogin'
				})
			}, 1500)

			uni.removeStorageSync('token')
			uni.hideLoading()
		}
		return data;
	} else {
		var lang=uni.getStorageSync('locale');
		var reload='';
	 
		 
		
		uni.hideLoading()
		uni.showToast({
			title: "重新加载",
			icon: 'none',
			duration: 1000
		})
		setTimeout(() => {
			uni.hideToast()
		}, 1000)
	}

	// 3xx
	if (firstCodeNum === '3') {
		// do something
		return res;
	}

	//4xx or 5xx
	// if (firstCodeNum === '4' || firstCodeNum === '5') {
	// 	// do something
	// 	return Promise.reject(res)
	// }

	// 停止发送请求 request.stop()
	if (JSON.stringify(res) === '{"errMsg":"request:fail abort"}') {
		// do something
		return false;
	}
	console.log(res);
	numErr += 1
	let indexUrl = uni.getStorageSync('index')
	let askIndex = uni.getStorageSync('askIndex') || 0
	console.log(askIndex);
	// const now = Date.now()
	// let lastShowTime=uni.getStorageSync('lastShowTime') || 0
	if (askIndex == 1 || askIndex >= 6) {
		uni.setStorage({
			key: 'index',
			data: 0
		})
		if (askIndex >= 6) {
			askIndex = 0
			uni.setStorage({
				key: 'askIndex',
				data: 0
			})
		}
		if (askIndex == 1) {
			askIndex += 1
			uni.setStorage({
				key: 'askIndex',
				data: askIndex
			})
		}
		console.log(askIndex);
		
		var lang=uni.getStorageSync('locale');
		var webErr='';
	 
			webErr="网络异常";
		 
		
		var notice='';
	 
			notice="通知";
	 	
		 
		
		var reload='';
 
			reload="重新加载";
		 
		
		var cancel='';
 
			cancel="取消";
		 
		

		uni.showModal({			 
			
			title: notice ,
			content:webErr,
			confirmText:reload ,
			cancelText:cancel ,
			success: function(res) {
				if (res.confirm) {
					console.log('用户点击确定');
					uni.setStorage({
						key: 'index',
						data: 0
					})
					uni.removeStorageSync('url')
					if (askIndex >= 6) {
						
						uni.removeStorageSync('askIndex')
					}
					uni.clearStorage('url')
					uni.clearStorage('index')
					plus.runtime.restart();
				} else if (res.cancel) {
					console.log('用户点击取消');
					// uni.setStorage({
					// 	key: 'askIndex',
					// 	data: 0
					// })
				}
			}
		});
		return
	}
	askIndex += 1
	console.log(askIndex);
	uni.setStorage({
		key: 'askIndex',
		data: askIndex
	})




	indexUrl += 1
	uni.setStorage({
		key: 'index',
		data: indexUrl
	})
	// console.log('numErrnumErrnumErrnumErr', numErr);
	console.log('indexUrl', indexUrl);
	// if (numErr == 1) {
	// 	numErr = 0
	
	return;
	setTimeout(() => {
		uni.downloadFile({
			url: 'https://ubi-addr1.oss-cn-hongkong.aliyuncs.com/ubiV1.png?s=' + Math.floor(
				Math.random() *
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
								// console.log(data);
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
								// console.log("arr", arr)
								// console.log(index);
								let urls = ''
								for (var i = index; i < arr
									.length; i++) {
									// console.log(arr[i]);
									urls = arr[i]
								}
								// console.log("urls", urls)
								url1 = urls.trim()
								// console.log("url1", url1)
								uni.hideLoading()
								// 初始化请求配置
								
								
								// request.setConfig({
								// 	url: url1,
								// });

								// uni.setStorage({
								// 	key: 'url',
								// 	data: url1
								// })
							}
						});
					}, function(e) {
						console.log("Resolve file URL failed: " + e.message);
					});
				}
			}
		})
	}, 1000)
	
	
	
	
	// }


	return Promise.reject(res)
})


export default request