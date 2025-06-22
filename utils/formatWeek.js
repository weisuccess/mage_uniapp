export const filters = {
	dateFormat: function(value) {
		let result = ''
		if (value) {
			var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var year = date.getFullYear();
			var month = ("0" + (date.getMonth() + 1)).slice(-2);
			var sdate = ("0" + date.getDate()).slice(-2);
			var hour = ("0" + date.getHours()).slice(-2);
			var minute = ("0" + date.getMinutes()).slice(-2);
			var second = ("0" + date.getSeconds()).slice(-2);
			// 拼接
			result = year + "-" + month + "-" + sdate + ' ' + hour + ':' + minute
			// 返回
		}
		// console.log(result,'result')
		return result;
	},
	dateFormat1: function(value) {
		let result = ''
		if (value) {
			var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var year = date.getFullYear();
			var month = ("0" + (date.getMonth() + 1)).slice(-2);
			var sdate = ("0" + date.getDate()).slice(-2);
			var hour = ("0" + date.getHours()).slice(-2);
			var minute = ("0" + date.getMinutes()).slice(-2);
			var second = ("0" + date.getSeconds()).slice(-2);
			// 拼接
			result = year + "-" + month + "-" + sdate + ' ' + hour + ':' + minute + ':' + second
			// 返回
		}
		// console.log(result,'result')
		return result;
	},
	getHMS: function(value) {
		var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var hour = ("0" + date.getHours()).slice(-2);
		var minute = ("0" + date.getMinutes()).slice(-2);
		var second = ("0" + date.getSeconds()).slice(-2);
		// 拼接
		var result = hour + ':' + minute + ':' + second
		return result;
	},
	getHM: function(value) {
		var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var hour = ("0" + date.getHours()).slice(-2);
		var minute = ("0" + date.getMinutes()).slice(-2);
		var second = ("0" + date.getSeconds()).slice(-2);
		// 拼接
		var result =  hour + ':' + minute 
		return result;
	},
	convertTimestampToDate: function(value) {
		var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var year = date.getFullYear();
		var month = ("0" + (date.getMonth() + 1)).slice(-2);
		var sdate = ("0" + date.getDate()).slice(-2);
		// 拼接
		var result = year + "-" + month + "-" + sdate
		// 返回
		return result;
	},

	convertToTimestamp: function(dateString) {
		var dateObj = new Date(dateString);
		return dateObj.getTime();
	},
	// 加密姓名
	testuserName(value) {
		var newStr;
		if (value.length === 2) {
			newStr = value.substr(0, 1) + '*';
		} else if (value.length > 2) {
			var char = '';
			for (var i = 0, len = value.length - 2; i < len; i++) {
				char += '*';
			}
			newStr = value.substr(0, 1) + char + value.substr(-1, 1);
		} else {
			newStr = value;
		}
		return newStr;
	},
	formattedName(name) {
		if (name) {
			return name.substring(0, 1) + new Array(name.length).join('*')
		}
	},
	hidePhone(phone) {
		if (phone) {
			return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
		}
	},
	hideCardCenter(data) {
		if (data) {
			var card = data.replace(/^(.{4})(?:\d+)(.{4})$/, "$1******$2");
			return card
		}
	}
}