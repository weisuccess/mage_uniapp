let BASE_URL = 'https://2b0ce211.r28.cpolar.top/v2';
let BASE_URL2 = 'https://2b0ce211.r28.cpolar.top/v2'; //配置web模式地址
let SYS_TYPE = 2; //1web 模式，2app模式


import base from '@/utils/base64.js' //引入

async function getBaseUrl() {
	let url =
		'https://lwfollowup.oss-cn-beijing.aliyuncs.com/image/5f95bf6fa8e94418bb3763c7d56e295e1640663934929.png';
	let url2 =
		'https://lwfollowup.oss-cn-beijing.aliyuncs.com/image/5f95bf6fa8e94418bb3763c7d56e295e1640663934929.png';
	//let url = 'https://facebookoss.oss-accelerate.aliyuncs.com/fb-logo.png';
	//let url2 = 'https://facebookoss.oss-accelerate.aliyuncs.com/fb-logo.png';//备用
	let info = {};
	try {
		info = uni.getStorageSync('BASE_URL')
		if (info && info.url != "") {

		} else {
			console.log("请求img_");
			let data = {};
			let res = await request2({
				url: url,
				data: data
			})
			console.log(res + ":||||||");
			if (res == "error" || res.data.length < 5) {
				res = await request2({
					url: url2,
					data: data
				})
			}
			var newss = res.data.substring(0, 4);
			console.log(newss + ":||||||");
			if (newss != "data") {
				res = await request2({
					url: url2,
					data: data
				})
			}

			let BASEURL = res.data.replace('data:image/jpg;base64,', '');
			BASEURL = BASEURL.replace('data:image/png;base64,', '');

			console.log(BASEURL + "<><><>");
			var base1 = new base();
			BASEURL = base1.decode(BASEURL)
			console.log(BASEURL + "<><><>");
			var newss = BASEURL.substring(0, 4);

			BASEURL = BASEURL.split('|');
			var nsize = BASEURL.length;
			var nList = BASEURL;
			let a = Math.random();
			//随机生成的数字 0-1之间
			//乘以9之后 0-8之间
			let b = a * BASEURL.length
			// 向下取整
			let c = Math.floor(b) //向下取整

			BASEURL = BASEURL[c];


			console.log(BASEURL + "<<<<<<<<<<<<<<<<<<<<<<<<<<auto");
			let res2 = await request2({
				url: BASEURL + "Home/Login/checkNet",
				data: data
			})
			console.log("123");
			console.log(res2 + "/////");
			if (res2 == "error") {
				for (var ni = 0; ni < nsize; ni++) {
					console.log("开始第" + (ni + 1) + "个地址：" + nList[ni]);
					res2 = await request2({
						url: nList[ni] + "Home/Login/checkNet",
						data: data
					})
					if (res2 == "error") {
						console.log("第" + (ni + 1) + "个地址错误");
					} else {
						BASEURL = nList[ni];
						break;
					}
				}
			} else {

			}

			console.log("456");

			console.log("覆盖");
			// console.log(BASEURL)
			uni.setStorageSync('BASE_URL', {
				url: BASEURL,
				_t: new Date().getTime()
			})


		}
	} catch (e) {
		//TODO handle the exception
	} finally {
		info = uni.getStorageSync('BASE_URL')
		//console.log(info,'fin');

		return info.url
	}


}

async function request3(options) {
	if (SYS_TYPE == 1) { //web模式
		BASE_URL = BASE_URL2;
		if (BASE_URL == "" || BASE_URL == null || BASE_URL.length < 1) {
			BASE_URL = BASE_URL2;
		}
		uni.setStorageSync('BASE_URL', {
			url: BASE_URL2,
			_t: new Date().getTime()
		})
	} else {
		BASE_URL = await getBaseUrl();
	}


	console.log("u=:" + BASE_URL);
	uni.setStorageSync('new_BASE_URL', BASE_URL);
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'Authorization': uni.getStorageSync('token') ? uni.getStorageSync('token') : "-1",
			},
			data: options.data || {},
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
			complete: () => {

			}
		})
	})
}


function request2(options) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: options.url,
			method: options.method || 'GET',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			timeout: 3000,
			data: options.data || {},
			success: res => {

				resolve(res)


			},
			fail: err => {
				resolve("error")
			},
			complete: () => {

			}
		})
	})
}


export const request = (options) => {
	console.log(options);
	return request3({
		url: BASE_URL + options.url,
		data: options.data,
		method: 'POST'
	})
}

export default {
	request
}