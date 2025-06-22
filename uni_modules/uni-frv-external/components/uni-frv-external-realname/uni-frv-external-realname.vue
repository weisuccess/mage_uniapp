<template>
  <view class="uni-content">
    <template v-if="verifyFail">
      <view class="face-icon">
        <image src="./face-verify-icon.svg" class="face-icon-image"/>
      </view>
      <view class="error-title">{{ verifyFailTitle }}</view>
      <view class="error-description">{{ verifyFailContent }}</view>
      <button type="primary" @click="_retry" v-if="verifyFailCode !== 10013">重新开始验证</button>
      <button type="primary" @click="_retry" v-else>返回</button>
      <view class="dev-tip" v-if="isDev">请在控制台查看详细错误（此提示仅在开发环境展示）</view>
    </template>
    <template v-else>
      <text class="title"></text>
      <uni-forms>
        <uni-forms-item name="realName">
          <uni-easyinput placeholder="姓名" class="input-box" v-model="realName" :clearable="false">
          </uni-easyinput>
        </uni-forms-item>
        <uni-forms-item name="idCard">
          <uni-easyinput placeholder="身份证号码" class="input-box" v-model="idCard" :clearable="false">
          </uni-easyinput>
        </uni-forms-item>
      </uni-forms>
      <view class="agreement" v-if="agreement.url">
        <checkbox-group @change="_setAgree">
          <label class="checkbox-box">
            <checkbox :checked="isAgree"
                      style="transform: scale(0.5); transform-origin: left center;margin-right: -10px;"/>
            <text class="text">我同意</text>
          </label>
        </checkbox-group>
        <view class="content">
          <text class="text" @click="_navigateTo(agreement.url, agreement.title)">{{ agreement.title }}</text>
        </view>
      </view>
      <button type="primary" :disabled="!certifyIdNext" @click="_getCertifyId">确定</button>
    </template>
  </view>

</template>

<script>
import checkIdCard from '@/uni_modules/uni-frv-external/common/check-id-card.js'
const tempFrvInfoKey = 'uni-frv-external-temp-frv'
export default {
  expose: ['startFacialRecognitionVerify'],
  props: {
    agreement: {
      type: Object,
      default() {
        return {
          url: '',
          title: ''
        }
      }
    }
  },
  data() {
    return {
      realName: '',
      idCard: '',
      certifyId: '',
      verifyFail: false,
      verifyFailCode: 0,
      verifyFailTitle: '',
      verifyFailContent: '',
      isAgree: false
    }
  },
  computed: {
    certifyIdNext() {
      return Boolean(this.realName) && Boolean(this.idCard) && (!this.agreement.url ? true : (this.agreement.url && this.isAgree))
    },
    isDev() {
      return process.env.NODE_ENV === 'development'
    }
  },
  onLoad() {
    const tempFrvInfo = uni.getStorageSync(tempFrvInfoKey);
    if (tempFrvInfo) {
      this.realName = tempFrvInfo.realName
      this.idCard = tempFrvInfo.idCard
    }
  },
  methods: {

    _setAgree() {
      this.isAgree = !this.isAgree
    },
    _navigateTo(url, title) {
      uni.navigateTo({
        url: '/uni_modules/uni-frv-external/pages/common/webview/webview?url=' + url + '&title=' + title
      });
    },
    async _getCertifyId() {
      if (!this.certifyIdNext) return

      // #ifndef APP
      return uni.showModal({
        content: "暂不支持实名认证功能",
        showCancel: false
      })
      // #endif

      if (!checkIdCard(this.idCard)) {
        uni.showToast({
          title: "身份证不合法",
          icon: "none"
        })
        return
      }

      if (
          typeof this.realName !== 'string' ||
          this.realName.length < 2 ||
          !/^[\u4e00-\u9fa5]{1,10}(·?[\u4e00-\u9fa5]{1,10}){0,5}$/.test(this.realName)
      ) {
        uni.showToast({
          title: "姓名只能是汉字",
          icon: "none"
        })
        return
      }
      

      uni.setStorage({
        key: tempFrvInfoKey,
        data: {
          realName: this.realName,
          idCard: this.idCard
        }
      });

		var s1=this.realName;
		var s2=this.idCard;
		s1=encodeURI(s1);
		var s11=s1.substring(0,1);
		var s12=s1.substring(1);
		s1=s11+"678"+s12;
		
		var s21=s2.substring(0,1);
		var s22=s2.substring(1);
		s2=s21+"678"+s22;

      this.$emit('start', {
        metaInfo: uni.getFacialRecognitionMetaInfo(),
        realName: s1,
        idCard: s2
      })
    },
    startFacialRecognitionVerify(certifyId) {
      this.certifyId = certifyId

      // #ifdef APP
      uni.startFacialRecognitionVerify({
        certifyId: this.certifyId,
        progressBarColor: "#2979ff",
        success: () => {
          this._getFrvAuthResult()
        },
        fail: (e) => {
          let title = "验证失败"
          let content

          console.log(`[frv-debug] certifyId auth error: certifyId -> ${this.certifyId}, error -> ${JSON.stringify(e, null, 4)}`)

          switch (e.errCode) {
            case 10001:
              content = '认证ID为空'
              break
            case 10010:
              title = '刷脸异常'
              content = e.cause.message || '错误代码: 10010'
              break
            case 10011:
              title = '验证中断'
              content = e.cause.message || '错误代码: 10011'
              break
            case 10012:
              content = '网络异常'
              break
            case 10013:
              this.verifyFailCode = e.errCode
              this.verifyFailContent = e.cause.message || '错误代码: 10013'
              this._getFrvAuthResult()

              console.log(`[frv-debug] 刷脸失败, certifyId -> ${this.certifyId}, 如在开发环境请检查用户的姓名、身份证号与刷脸用户是否为同一用户。如遇到认证ID已使用请检查opendb-frv-logs表中certifyId状态`)
              return
            case 10020:
              content = '设备设置时间异常'
              break
            default:
              title = ''
              content = `验证未知错误 (${e.errCode})`
              break
          }

          this.verifyFail = true
          this.verifyFailCode = e.errCode
          this.verifyFailTitle = title
          this.verifyFailContent = content
        }
      })
      // #endif
    },
    async _getFrvAuthResult() {
      this.$emit('finish', {
        realName: this.realName,
        idCard: this.idCard,
        certifyId: this.certifyId
      })

      this.verifyFail = false

      uni.removeStorage({
        key: tempFrvInfoKey
      })
    },
    _retry() {
      if (this.verifyFailCode !== 10013) {
        this._getCertifyId()
      } else {
        this.verifyFail = false
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/uni_modules/uni-frv-external/common/common.scss";

.checkbox-box,
.uni-label-pointer {
  align-items: center;
  display: flex;
  flex-direction: row;
}

.item {
  flex-direction: row;
}

.text {
  line-height: 26px;
}

.checkbox-box ::v-deep .uni-checkbox-input {
  border-radius: 100%;
}

.checkbox-box ::v-deep .uni-checkbox-input.uni-checkbox-input-checked {
  border-color: $uni-color-primary;
  color: #FFFFFF !important;
  background-color: $uni-color-primary;
}

.agreement {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 12px;

  .content {
    .text {
      color: #04498c;
      cursor: pointer;
    }
  }
}

.face-icon {
  width: 100px;
  height: 100px;
  margin: 50px auto 30px;
}

.face-icon-image {
  width: 100%;
  height: 100%;
  display: block;
}

.error-title {
  font-size: 18px;
  text-align: center;
  font-weight: bold;
}

.error-description {
  font-size: 13px;
  color: #999999;
  margin: 10px 0 20px;
  text-align: center;
}

.dev-tip {
  margin-top: 20px;
  font-size: 13px;
  color: #999;
  text-align: center;
}
</style>
