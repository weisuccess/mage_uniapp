<template>
	<view class="address-form">
		<view class="content"></view>
		<narBar :title="getLg('新增收货地址')" @back="toBack()"></narBar>
		<view class="form-body">
			<view class="form-group">
				<label class="lh80">收货人姓名:</label>
				<input type="text" placeholder="请输入收货人姓名" v-model="address.harvestPeople"
					placeholder-style="color:#fff" />
			</view>
			<view class="form-group">
				<label class="lh80">联系电话:</label>
				<input type="tel" placeholder="请输入联系电话" v-model="address.phone" maxlength="11"
					placeholder-style="color:#fff" />
			</view>
			<view class="form-group ">
				<label class="lh80">所在地区:</label>
				<cityPicker :column="column" :default-value="defaultValue" :mask-close-able="maskCloseAble"
					@confirm="confirm" @cancel="cancel" :visible="visible" />
				<view class="lh80 color-fff" style="background-color: #33CC33;" @tap="open" v-if="!region[0]">
					请选择所在地区
				</view>
				<view class="color-fff lh80 color-fff" style="background-color: #33CC33;" @tap="open" v-else>
					{{ region[0] }} {{ region[1] }} {{ region[2] }}
				</view>
			</view>
			<view class="form-group">
				<label class="lh80">详细地址:</label>
				<input type="text" placeholder="请输入详细地址" v-model="address.fullAddress" placeholder-style="color:#fff" />
			</view>
			<view class="form-footer color-fff">
				<view class="ts-btn" @click.stop="$noMultipleClicks(submitAddress,'')">保存地址</view>
			</view>
		</view>

	</view>
</template>

<script>
	import narBar from 'pages/public/narBar.vue'
	import cityPicker from '@/uni_modules/piaoyi-cityPicker/components/piaoyi-cityPicker/piaoyi-cityPicker'
	export default {
		components: {
			narBar,
			cityPicker
		},
		data() {
			return {
				noClick: true,
				address: {
					harvestPeople: '',
					phone: '',
					fullAddress: '',
					location: '',
					whetherDefault: 2
				},
				visible: false,
				maskCloseAble: true,
				defaultValue: '',
				// defaultValue: ['河北省','唐山市','丰南区'],
				column: 3,
				region: [],
			};
		},
		methods: {
			open() {
				this.visible = true
			},
			confirm(val) {
				console.log(val)
				this.region[0] = val.provinceName
				this.region[1] = val.cityName
				this.region[2] = val.areaName
				this.address.location = val.provinceName + val.cityName + val.areaName
				this.visible = false
			},
			cancel() {
				this.visible = false
			},
			toBack() {
				uni.navigateBack()
			},
			bindRegionChange(e) {
				this.address.region = e.detail.value;
			},
			submitAddress() {
				// 处理提交地址的逻辑
				console.log('提交地址:', this.address);
				this.$request.post({
					url: "/app/harvestAddressInfo/add",
					data: this.address,
					success: rsp => {
						if (rsp.code == 200) {
							uni.navigateBack()
						}
					}
				})
			}
		}
	};
</script>
<style>
	page {
		background: #f1f1f1;
	}
</style>

<style lang="scss" scoped>
	/* styles.css */
	.form-header {
		margin-bottom: 15rpx;
	}

	.form-title {
		font-size: 20px;
		color: #333;
	}

	.form-body {
		color: #333;
		border-radius: 5px;
		position: absolute;
		top: 200rpx;
		width: 90%;
		margin: 2.5%;
		padding: 2.5%;
	}

	.form-group {
		margin-bottom: 15rpx;
	}

	label {
		display: block;
		margin-bottom: 15rpx;
		font-weight: bold;
		color: #666;
	}

	input,
	.picker {
		width: 100%;
		padding: 0 10rpx;
		height: 80rpx;
		line-height: 80rpx;
		border: 1px solid #ddd;
		background: #33CC33;
		border-radius: 3px;
		color: #fff;
		box-sizing: border-box;
	}

	.form-footer {
		text-align: center;
		margin-top: 30rpx;
	}
</style>