

export const BASE_URL=''



export const request = (options) => {
	
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method:options.method || 'GET',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'Authorization': uni.getStorageSync('token')?uni.getStorageSync('token'):"-1",
			},
			data:options.data || {},
			success: res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			},
			complete: () => {
				
			}
		})
	})
}
