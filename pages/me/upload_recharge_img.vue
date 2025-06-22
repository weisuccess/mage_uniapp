<template>
	<view class="content">
		<narBar :title="getLg('上传充值凭证')" @back="toBack()"></narBar>
		<view class="main">
			<view class="vpform_vsel" style="margin-top:40rpx;">
				<view>{{saveData.trc20_address}}</view>
				<view class="vcenter" style="height: 100%;">
					<view class="vpline"></view>
					<image src="/static/wallet/recharge/copy.png" style="width:48rpx;height:48rpx;" @click="copy()"></image>
				</view>
			</view>
			<view class="vsplit"></view>
			<view class="vpform_item vbetween">
				<input class="vpform_item_input2" type="digit" v-model="saveData.amount" maxlength="30" placeholder="请输入充值数量" />
				<view class="vcenter vmr30">
					<text class="vfm" style="font-weight: 500;font-size: 28rpx;color: #39E8BE;margin-right:14rpx;">RMB</text>
				</view>
			</view>
			<view class="vsplit"></view>
			<view class="vpform_uploadimg">
				<ygy-upload-img :title="info.title" :infoType="4" sizew="580" sizeh="380" :num="info.num" :iconAddStyle="info.iconAddStyle"
					  :iconCloseStyle="info.iconCloseStyle" @saveImg="getImgList"></ygy-upload-img>
			</view>
			<button @click="saveInfo" :loading="btnSet.loading" :disabled="btnSet.disabled" class="vpform_button" style="margin-top: 38rpx;">{{btnSet.txt}}</button>
		</view>
	</view>
</template>
<script>
import narBar from 'pages/public/narBar.vue'
import ygyUploadImg from '@/components/ygy-upload-img/ygy-upload-img.vue'
import uniCopy from '@/utils/uni-copy.js'
export default {
	components: {
		narBar,
		ygyUploadImg
	},
	data() {
		return {
			data:[],
			btnSet:{
				loading:false,
				disabled:false,
				txt:"上传截图"
			},
			info: {
				title: '',
				size: 200,
				num: 1,
				iconAddStyle: { //加号样式
					fontSize: '200rpx',
					color: "#42b983"
				},
				iconCloseStyle: { //关闭图标样式
					fontSize: '60rpx',
					color: "#f40"
				}
			},
			imgList: [],
			pageLoading:true,
			saveData:{
				trc20_address:"",
				amount:"",
				img1Base64:""
			}
		}
	},
	onLoad() {
		this.loadData();
	},
	methods: {
		loadData(){
			this.request({
				url:'Home/Index/t5_getRechargeInfo', 
				method:'POST',
				data:"",
			}).then((res)=>{
				res.data=JSON.parse(this.decrypt(res.data));
				if(res.data.status == 1){
					this.data=res.data.data;
					this.saveData.trc20_address=this.data.trc20_address;
				}
				this.pageLoading=false;
			})
		},
		getImgList(arr) {
			if(arr[0]!=null){
				var a1=arr[0].substring(0,20);
				var a2=arr[0].substring(20);
				var a3="a1b2c3b4d5e6f7"+a1+"a1b2c3b4d5e6f7"+a2;
				this.saveData.img1Base64=a3;
			}else{
				this.saveData.img1Base64=arr[0];
			}
		},
		handleChooseImg(e){
			this.saveData.sf1 = '';
			this.photo = e.src;
			this.showup=1;
			var info = uni.getStorageSync('BASE_URL');
			uni.uploadFile({
				url: info+'Home/Login/fileup',
				filePath: this.photo,
				name: 'file',
				header: {
					'Authorization': uni.getStorageSync('token')
				},
				success: (resp) => {
					let res = JSON.parse(resp.data);
					this.saveData.sf1=res.url;
					this.showup=2;				
				},
				fail: () => {
					uni.showToast({
						title: '网络错误',
						icon:'none',
						duration: 2000
					});
					this.showup=2;
				}
			});
		},
		saveInfo(){
			if(this.saveData.trc20_address==null||this.saveData.trc20_address.length<1){
				 uni.showToast({title: "充值地址错误",icon:'none',duration: 1500});	
				 return false;
			}
			if(this.saveData.amount==null||this.saveData.amount.length<1){
				 uni.showToast({title: "请输入充值数量",icon:'none',duration: 1500});	
				 return false;
			}
			if(this.saveData.img1Base64==""||this.saveData.img1Base64==null){
				uni.showToast({title: "请上传充值凭证截图",icon:'none',duration: 1500});
				 return false;
			}
			this.btnSet={
				loading:true,
				disabled:true,
				txt:"凭证上传中..."
			},
			this.request({
				url:'Home/Index/t5_saveRecharge',
				method:'POST',
				data:this.encrypt(JSON.stringify(this.saveData)),
			}).then((res)=>{
				let data=JSON.parse(this.decrypt(res.data));
				if(data.status==1){
					uni.showToast({
						title: data.msg,
						icon: 'none',
						duration: 2000
					});
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/wallet/recharge_coin'
						})
					},2000)
				}else{
					uni.showToast({
						title: data.msg,
						icon: 'none',
						duration: 2000
					});
					this.btnSet={
						loading:false,
						disabled:false,
						txt:"上传截图"
					};
				}
			})
			 
				 
		},
		copy(){
			var that = this;
			uniCopy({
				content:that.saveData.trc20_address,
				success:(res)=>{
					uni.showToast({
						title: res,
						icon: 'none'
					})
				},
				error:(e)=>{
					uni.showToast({
						title: e,
						icon: 'none',
						duration:3000,
					})
				}
			})
		},
		toBack(){
			uni.navigateTo({
				url:'/pages/wallet/recharge_coin'
			})
		}
	}
}
</script>
<style lang="scss" scoped>
	page{
		background: #0E0E15;
	}
</style>