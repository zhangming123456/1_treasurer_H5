<template>
  <div :class="name" class="azm-fixed">
    <div v-if="step === 0" class="register_form_box">
      <van-cell-group class="register_form">
        <van-field class="register_form_username register_form_item"
                   v-model="mobile"
                   type="tel"
                   icon="clear"
                   maxLength="11"
                   placeholder="请输入注册手机号吗"
                   @click-icon="mobile = ''"
        />
      </van-cell-group>
      <van-cell-group class="register_form">
        <van-row>
          <van-col :span="16" class="vux-1px-r register_form_item">
            <van-field class="register_form_password register_form_item"
                       v-model="code"
                       type="tel"
                       placeholder="输入验证码"
                       icon="clear"
                       maxLength="6"
                       @click-icon="code = ''"
            />
          </van-col>
          <van-col :span="8" class="register_form_item" style="text-align: center">
            <x-button v-if="!show" type="primary" class="azm-btn azm-btn-code" action-type="submit"
                      @click.native="getSmsCode">获取验证码
            </x-button>
            <x-button v-else type="primary" class="azm-btn azm-btn-code" action-type="submit">
              <countdown v-model="countdownTime" @on-finish="finish" v-show="show"></countdown>
              <span>s</span>
            </x-button>
          </van-col>
        </van-row>
      </van-cell-group>
      <div class="register_form_footer">
        <x-button type="primary" class="azm-btn" action-type="submit"
                  @click.native="next">下一步
        </x-button>
      </div>
    </div>
    <div v-else-if="step === 1" class="register_form_box">
      <van-cell-group class="register_form">
        <van-field class="register_form_username register_form_item"
                   v-model="password"
                   type="tel"
                   icon="clear"
                   maxLength="6"
                   placeholder="请输入6位数字密码"
                   @click-icon="password = ''"
        />
      </van-cell-group>
      <van-cell-group class="register_form">
        <van-field class="register_form_password register_form_item"
                   v-model="password2"
                   type="tel"
                   placeholder="请确认密码"
                   icon="clear"
                   maxLength="6"
                   @click-icon="password2 = ''"
        />
      </van-cell-group>
      <div class="register_form_footer">
        <van-row gutter="20">
          <van-col :span="12">
            <x-button type="primary" class="azm-btn azm-btn-submit" action-type="submit"
                      @click.native="step--">上一步
            </x-button>
          </van-col>
          <van-col :span="12">
            <x-button type="primary" class="azm-btn azm-btn-submit" action-type="submit"
                      @click.native="next">注册
            </x-button>
          </van-col>
        </van-row>
      </div>
    </div>
    <div v-else-if="step === 2" class="register_form_box">
      <p>注册成功</p>
      <p>
        <i class="iconfont icon-dui azm-icon"></i>
      </p>
      <p>将在
        <countdown v-model="endCountdownTime" @on-finish="finish2" v-show="endShow"></countdown>
        s后跳转...
      </p>
      <div class="register_form_footer">
        <x-button type="primary" class="azm-btn azm-btn-submit" action-type="submit"
                  @click.native="next">立即跳转
        </x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import VanField from 'vant/packages/field/index'
  import VanCellGroup from 'vant/packages/cell-group/index'
  import XButton from '../../components/x-button/index'
  import VanRow from 'vant/packages/row/index'
  import VanCol from 'vant/packages/col/index'
  import Countdown from '../../components/countdown/index'

  export default {
    components: {
      Countdown,
      VanCol,
      VanRow,
      XButton,
      VanCellGroup,
      VanField
    },
    data () {
      return {
        name: 'register',
        msg: 'Hello World!',
        show: false,
        countdownTime: 60,
        endShow: true,
        endCountdownTime: 10,
        step: 0,
        transferObj: {
          isTabbar: false,
          tabbarLink: 'register',
          navBarHide: true
        },
        mobile: '',
        code: '',
        password: '',
        password2: ''
      }
    },
    computed: {
      ...mapState({
        findResUserListData: state => state.ApiService.findResUserListData,
        resId: state => state.ApiService.resId,
      })
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '注册'})
    },
    methods: {
      getSmsCode () {
        let that = this
        try {
          let mobile = this.$azm.util.trim(this.mobile),
            regMobile = this.$azm.util.RegExp.isMobile
          if (regMobile.test(mobile)) {
            this.$store.dispatch('ApiService.checkMobile', {mobile}).then(
              (rsp) => {
                if (rsp.data.code == 2000 && rsp.data.returnStatus) {
                  that.$store.dispatch('ApiService.getSmsCode', {mobile}).then(
                    () => {
                      that.show = true
                      that.countdownTime = 60
                    }
                  )
                } else {
                  that.$toast(rsp.data.message)
                }
              }
            )
          } else {
            that.$toast('手机号码不正确')
          }
        } catch (e) {
          that.$toast('手机号码不正确')
        }
      },
      finish (index) {
        this.show = false
        this.countdownTime = 0
      },
      finish2 (index) {
        this.endShow = false
        this.endCountdownTime = 0
        this.next()
      },
      next () {
        let that = this,
          mobile = this.$azm.util.trim(this.mobile),
          code = this.$azm.util.trim(this.code),
          password = this.$azm.util.trim(this.password),
          password2 = this.$azm.util.trim(this.password2),
          regMobile = this.$azm.util.RegExp.isMobile
        if (this.step === 0) {
          if (!mobile) {
            that.$toast('手机号码不能为空')
          } else if (!regMobile.test(mobile)) {
            that.$toast('手机号码格式不正确')
          } else if (!code) {
            that.$toast('验证码不能为空')
          } else if (code.length !== 6) {
            that.$toast('验证码必须6位数字')
          } else {
            that.step++
          }
        } else if (this.step === 1) {
          if (!password) {
            that.$toast('密码不能为空')
          } else if (!password2) {
            that.$toast('确认密码不能为空')
          } else if (password2 !== password) {
            that.$toast('两次密码不一致')
          } else if (password.length < 6) {
            that.$toast('密码至少6位数字')
          } else {
            let data = {
              mobile,
              verfyCode: code,
              password: that.$azm.md5(mobile + password).toLowerCase(),
              newPwd: that.$azm.md5(password).toLowerCase()
            }
            that.$store.dispatch('ApiService.register', data).then(
              (rsp) => {
                if (rsp.data.code == 2000) {
                  that.endShow = true
                  that.endCountdownTime = 10
                  that.step++
                }
                that.$toast(rsp.data.message)
              }
            )
          }
        } else if (this.step === 2) {
          that.$router.go(-1)
        }
      }
    }
  }
</script>

<style lang='less'>
  .register {
  }
</style>

<style scoped lang='less'>
  .register {
    background-color: #fff;
    .register_form_box {
      padding: 80px 20px;
      box-sizing: border-box;
      .register_form {
        margin-bottom: 12.5px;
        height: 43.5px;
        line-height: 43.5px;
        overflow: hidden;
        .register_form_item {
          height: 43.5px;
          line-height: 43.5px;
        }

        &::after {
          border-radius: 10px;
          border-width: 1px 1px;
          border-color: #dbdbdb;
        }
        &:nth-last-child(1) {
          margin-top: 25px;
        }
      }
      .register_form_footer {
        margin-top: 54/2px;
      }
      .azm-btn {
        line-height: 95/2px;
        font-size: 15px;
        &::after {
          border: none;
        }
      }
      .azm-btn-code {
        background-color: transparent;
        color: #34C9E1;
        font-size: 13px;
        line-height: 43.5px;
        &::after {
          border: none;
        }
      }
      p {
        text-align: center;
        font-size: 17px;
        .azm-icon {
          font-size: 60px;
          color: #34c9e1;
        }
      }
    }
    .azm-code {
      display: none;
    }
  }
</style>
