import Big from 'big.js'

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
	dateFormatYMD: function(value) {
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
			result = year + "-" + month + "-" + sdate + ' ' 
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
	formatRichText:function (html) { 
		if(html==null)
		return ''
		//控制小程序中图片大小
				    let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
				        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
				        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
				        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
				        return match;
				    });
				    newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
				        match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
				        return match;
				    });
				    newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				    newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
				    return newContent;
				},
 
	moneyFormat:function(value)
	{
		
		 
		if(value!=null)
		 return	Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		 
		return '';
			
	},
	fixedMul(a, b) {//a:数字，b:小数点后有几位数
	  return Math.round(a * Math.pow(10, b)) / Math.pow(10, b);
	},
	NumberMul2(arg1, arg2) {
		if(arg1==null || arg2==null )
			return ''
	    var m = 0;
	    var s1 = arg1.toString();
	    var s2 = arg2.toString();
	    try {
	        m += s1.split(".")[1].length;
	    } catch (e) {}
	    try {
	        m += s2.split(".")[1].length;
	    } catch (e) {}
	 
	    const mm= Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
		
		return mm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
	},
	ChangeDecimalToPercentage(data) {
		var data1 = (data * 100).toFixed(2) + "%";
		return data1;
	},
	ChangeDecimalToPercentage0(data) {
		var data1 = (data).toFixed(2) + "%";
		return data1;
	},
	toFixed2(data) {
		if(data!=null)
		{
			var data1 = parseFloat(data).toFixed(2) ;
			return data1;
		}else return ''
		
	},
	tonull(data) {
		if(data==null)
		{
			 
			return 0;
		}else return data
		
	},
	bigNumberMul3(arg1, arg2,arg3) {
		 if(arg1==null || arg2==null )
		 	return ''
		const product = new Big(arg1).times(arg2);
		const  product2= new Big(product).times(arg3);
		 return product2.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		console.log(product2.toString()); // "0.3"
		
		
	},
	bigNumberMul4(arg1, arg2,arg3,arg4) {
		 if(arg1==null || arg2==null )
		 	return ''
		const product = new Big(arg1).times(arg2);
		const  product2= new Big(product).times(arg3);
		const  product3= new Big(product2).times(arg4);
		 return product3.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		console.log(product3.toString()); // "0.3"
		
		
	},
	
	NumberMul3(arg1, arg2,arg3) {
		
		console.log(arg1,arg2,arg3);
		if(arg1==null || arg2==null ||arg3==null )
			return ''
	    var m = 0;
	 
	    var s1 = arg1.toString();
	    var s2 = arg2.toString();
		var s3 = arg3.toString();
		console.log(s1,s2,s3);
		console.log('==============');
	    try {
	        m += s1.split(".")[1].length;
	    } catch (e) {}
	    try {
	        m += s2.split(".")[1].length;
	    } catch (e) {}
		
		try {
		    m += s3.split(".")[1].length;
		} catch (e) {}
	 
	    const mm=Number(s1.replace(".", "")) * Number(s2.replace(".", ""))* Number(s3.replace(".", "")) / Math.pow(10, m);
		
		 return mm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
	},
	NumberMul4(arg1, arg2,arg3,arg4) {
		if(arg1==null || arg2==null || arg3==null || arg4==null)
			return ''
	    var m = 0;
	    var s1 = arg1.toString();
	    var s2 = arg2.toString();
		var s3 = arg3.toString();
		var s4 = arg4.toString();
	    try {
	        m += s1.split(".")[1].length;
	    } catch (e) {}
	    try {
	        m += s2.split(".")[1].length;
	    } catch (e) {}
		
		try {
		    m += s3.split(".")[1].length;
		} catch (e) {}
		
		try {
		    m += s4.split(".")[1].length;
		} catch (e) {}
	   
	    const mm=Number(s1.replace(".", "")) * Number(s2.replace(".", ""))* Number(s3.replace(".", ""))* Number(s4.replace(".", "")) / Math.pow(10, m);
	 
	    return mm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
	},
	
	dateFormatW: function(value) {
		let result = ''
		console.log(typeof value);
		if (value) {
			var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var year = date.getFullYear();
			var month = ("0" + (date.getMonth() + 1)).slice(-2);
			var sdate = ("0" + date.getDate()).slice(-2);
			var hour = ("0" + date.getHours()).slice(-2);
			var minute = ("0" + date.getMinutes()).slice(-2);
			var second = ("0" + date.getSeconds()).slice(-2);
			// 拼接
			result = hour + ':' + minute + ':' + second+'    '+sdate  + "-" + month + "-" + year + ' '
			// 返回
		}
		// console.log(result,'result')
		return result;
	},
	isnull: function(value) {
				 
			 if (!value){
				 var temp=''
			    return temp
			 }
			
			 return value
	  },
	dateFormatW2: function(value) {
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
			result = hour + ':' + minute + ':' + second+'    '+sdate  + "-" + month  
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
	
	convertTimestampToDateYear: function(value) {
		var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var year = date.getFullYear();
		var month = ("0" + (date.getMonth() + 1)).slice(-2);
		var sdate = ("0" + date.getDate()).slice(-2);
		// 拼接
		var result = year 
		// 返回
		return result;
	},
	maskString:function (str, keepStart = 4, keepEnd = 3, maskChar = '*') {
	  // 处理边界情况：字符串过短直接返回原字符串 
	  if (str.length  <= keepStart + keepEnd) return str; 
	  // 截取前半部分和后半部分 
	  const start = str.slice(0,  keepStart); 
	  const end = str.slice(-keepEnd);  
	  // 计算中间需要填充的星号数量 
	  const maskLength = str.length  - keepStart - keepEnd; 
	  // 拼接结果 
	  return start + maskChar.repeat(maskLength)  + end; 
	} ,
	convertTimestampToDateMon: function(value) {
		var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var year = date.getFullYear();
		var month = ("0" + (date.getMonth() + 1)).slice(-2);
		var sdate = ("0" + date.getDate()).slice(-2);
		// 拼接
		var result = month 
		// 返回
		return result;
	},
	convertTimestampToDateDay: function(value) {
		var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var year = date.getFullYear();
		var month = ("0" + (date.getMonth() + 1)).slice(-2);
		var sdate = ("0" + date.getDate()).slice(-2);
		// 拼接
		var result = sdate 
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
	replaceLastCharsWithAsterisk(str, replaceLength = 3) { 
	  // 验证输入是否为字符串 
	  if (typeof str !== 'string') { 
	    throw new Error('输入必须是字符串类型'); 
	  } 
	  
	  // 处理空字符串情况 
	  if (str.length  === 0) { 
	    return str; 
	  } 
	  
	  // 确保替换长度为非负整数 
	  const len = Math.max(0,  Math.floor(Number(replaceLength)));  
	  
	  // 如果字符串长度小于等于要替换的长度，全部替换为星号 
	  if (str.length  <= len) { 
	    return '*'.repeat(str.length);  
	  } 
	  
	  // 否则保留前面部分，替换后面指定长度为星号 
	  const prefix = str.slice(0,  -len); 
	  const asterisks = '*'.repeat(len); 
	  
	  console.log( prefix + asterisks);
	  return prefix + asterisks; 
	} ,
	
	hideCardCenter(data) {
		if (data) {
			var card = data.replace(/^(.{4})(?:\d+)(.{4})$/, "$1******$2");
			return card
		}
	}
}