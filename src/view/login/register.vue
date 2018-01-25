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
      <div class="register_form_footer">
        <x-button type="primary" class="azm-btn" action-type="submit"
                  @click.native="next">获取验证码
        </x-button>
        <label>
          <input name="Fruit" type="checkbox" v-model="checkbox"/>
          同意1号掌柜
          <router-link to="/login/useragree">服务条款</router-link>
        </label>
      </div>
    </div>
    <div v-if="step === 1" class="register_form_box">
      <p class="mobile-text">
        验证码已发送至：{{mobile}}
      </p>
      <van-cell-group class="register_form">
        <van-row>
          <van-col :span="14" class="vux-1px-r register_form_item">
            <van-field class="register_form_password register_form_item"
                       v-model="code"
                       type="tel"
                       placeholder="输入验证码"
                       icon="clear"
                       maxLength="6"
                       @click-icon="code = ''"
            />
          </van-col>
          <van-col :span="10" class="register_form_item" style="text-align: center">
            <x-button v-if="!show" type="primary" class="azm-btn azm-btn-code" action-type="submit"
                      @click.native="getSmsCode">获取验证码
            </x-button>
            <x-button v-else type="primary" class="azm-btn azm-btn-code" action-type="submit">
              重新验证码
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
    <div v-else-if="step === 2" class="register_form_box">
      <p class="password-text">请设置6位数的数字密码</p>
      <van-password-input
        :value="password"
        info="    "
        @focus="onKeyboardBlur(1)"
      />
      <van-password-input
        :value="password2"
        info=""
        @focus="onKeyboardBlur(2)"
      />

      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard || showKeyboard2"
        @input="onInput"
        @delete="onDelete"
        @blur="onKeyboardBlur(0)"
      />
      <!--<van-cell-group class="register_form">-->
      <!--<van-field class="register_form_username register_form_item"-->
      <!--v-model="password"-->
      <!--type="tel"-->
      <!--icon="clear"-->
      <!--maxLength="6"-->
      <!--placeholder="请输入6位数字密码"-->
      <!--@click-icon="password = ''"-->
      <!--/>-->
      <!--</van-cell-group>-->
      <!--<van-cell-group class="register_form">-->
      <!--<van-field class="register_form_password register_form_item"-->
      <!--v-model="password2"-->
      <!--type="tel"-->
      <!--placeholder="请确认密码"-->
      <!--icon="clear"-->
      <!--maxLength="6"-->
      <!--@click-icon="password2 = ''"-->
      <!--/>-->
      <!--</van-cell-group>-->
      <div class="register_form_footer">
        <x-button type="primary" class="azm-btn azm-btn-submit" :class="{'disabled':disabled}" action-type="submit"
                  @click.native="next">确定
        </x-button>
      </div>
    </div>
    <div v-else-if="step === 3" class="register_form_box">
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
  import { XButton, Countdown } from 'vux'
  import { Field, CellGroup, Row, Col, PasswordInput, NumberKeyboard } from 'vant/lib/index'
  import { mapState } from 'vuex'
  // import VanField from 'vant/packages/field/index'
  // import VanCellGroup from 'vant/packages/cell-group/index'
  // import VanRow from 'vant/packages/row/index'
  // import VanCol from 'vant/packages/col/index'
  // import Countdown from '../../components/countdown/index'
  // import XButton from '../../components/x-button/index'

  export default {
    components: {
      Countdown,
      XButton,
      [PasswordInput.name]: PasswordInput,
      [NumberKeyboard.name]: NumberKeyboard,
      [CellGroup.name]: CellGroup,
      [Field.name]: Field,
      [Col.name]: Col,
      [Row.name]: Row,
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
        password2: '',
        checkbox: false,
        showKeyboard: true,
        showKeyboard2: false,
        disabled: true,
        verifyPassword: true
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
      getSmsCode (e, cb) {
        let that = this
        try {
          let mobile = this.$azm.util.trim(this.mobile),
            regMobile = this.$azm.util.RegExp.isMobile
          if (regMobile.test(mobile)) {
            this.$store.dispatch('ApiService.checkMobile', {mobile}).then(
              (rsp) => {
                if (rsp.code == 2000 && rsp.returnStatus) {
                  that.$store.dispatch('ApiService.getSmsCodeForRegister', {mobile}).then(
                    () => {
                      if (2000 === rsp.code) {
                        cb && cb()
                      }
                      that.show = true
                      that.countdownTime = 60
                    }
                  )
                } else {
                  !rsp.status && that.$toast(rsp.message)
                }
              }
            )
          } else {
            that.$toast({
              message: '手机号码不正确',
              position: 'top'
            })
          }
        } catch (e) {
          that.$toast({
            message: '手机号码不正确',
            position: 'top'
          })
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
          regMobile = this.$azm.util.RegExp.isMobile
        if (this.step === 0) {
          if (!mobile) {
            that.$toast({
              message: '手机号码不能为空',
              position: `top`
            })
          } else if (!regMobile.test(mobile)) {
            that.$toast({
              message: '手机号码格式不正确',
              position: `top`
            })
          } else if (!that.checkbox) {
            that.$toast({
              message: '请勾选同意1号掌柜服务条款',
              position: `top`
            })
          } else {
            that.getSmsCode(null, function () {
              // that.step++
            })
          }
        } else if (this.step === 1) {
          if (!mobile) {
            that.$toast({
              message: '手机号码不能为空',
              position: `top`
            })
          } else if (!regMobile.test(mobile)) {
            that.$toast({
              message: '手机号码格式不正确',
              position: `top`
            })
          } else if (!code) {
            that.$toast({
              message: '验证码不能为空',
              position: `top`
            })
          } else if (code.length !== 6) {
            that.$toast({
              message: '验证码必须6位数字',
              position: `top`
            })
          } else {
            that.$store.dispatch('ApiService.checkSmsCodeByMobile', {
              mobile, code
            }).then(
              (rsp) => {
                if (rsp.code === 2000) {
                  that.step++
                } else {
                  that.$toast({
                    message: '验证码输入错误',
                    position: `top`
                  })
                }
              }
            )
          }
        } else if (this.step === 2) {
          if (that.getVerifyPassword()) {
            let data = {
              mobile,
              verfyCode: code,
              password: that.$azm.md5(mobile + password).toLowerCase(),
              newPwd: that.$azm.md5(password).toLowerCase()
            }
            that.$store.dispatch('ApiService.register', data).then(
              (rsp) => {
                if (rsp.code == 2000) {
                  that.endShow = true
                  that.endCountdownTime = 10
                  that.step++
                }
                that.$toast(rsp.message)
              }
            )
          }
        } else if (this.step === 3) {
          that.$router.replace('/')
        }
      },
      getVerifyPassword () {
        let that = this,
          password = that.password,
          password2 = that.password2,
          flag = false
        if (!password) {
          that.$toast({
            message: '密码不能为空',
            position: `top`
          })
        } else if (!password2) {
          that.$toast({
            message: '确认密码不能为空',
            position: `top`
          })
        } else if (password2 !== password) {
          that.$toast({
            message: '两次密码不一致',
            position: `top`
          })
        } else if (password.length < 6) {
          that.$toast({
            message: '密码至少6位数字',
            position: `top`
          })
        } else {
          flag = true
        }
        return flag
      },
      onInput (key) {
        if (this.password.length >= 6) {
          this.onKeyboardBlur(2)
        }
        if (this.showKeyboard) {
          this.password = (this.password + key).slice(0, 6)
        } else if (this.showKeyboard2) {
          this.password2 = (this.password2 + key).slice(0, 6)
        }
        if (this.password2.length >= 6) {
          this.verifyPassword = this.getVerifyPassword()
          if (this.verifyPassword) {
            this.disabled = false
          }
        }
      },
      onDelete () {
        this.disabled = true
        if (this.password2.length === 0) {
          this.onKeyboardBlur(1)
        }
        if (!this.verifyPassword && this.showKeyboard2) {
          this.password2 = ''
          this.verifyPassword = true
        } else if (this.showKeyboard2) {
          this.password2 = this.password2.slice(0, this.password2.length - 1)
        } else if (this.showKeyboard) {
          this.password = this.password.slice(0, this.password.length - 1)
        }
      },
      onKeyboardBlur (type) {
        this.showKeyboard = false
        this.showKeyboard2 = false
        if (type === 1) {
          this.showKeyboard = true
        } else if (type === 2) {
          this.showKeyboard2 = true
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
    button.disabled {
      background-color: #999999;
    }
    .register_form_box {
      padding: 90px 20px 0;
      box-sizing: border-box;
      .mobile-text {
        text-align: left;
        line-height: 50px;
        font-size: 13px;
        color: #798292;
      }
      .password-text {
        line-height: 50px;
        font-size: 13px;
        color: #798292;
      }
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
        button {
          margin-bottom: 12px;
        }
        label {
          position: relative;
          color: #e5e5e5;
          line-height: 16px;
          vertical-align: middle;
          padding-left: 20px;
          color: #798292;
          font-size: 13px;
          input[type=checkbox] {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
          a {
            color: #798292;
            font-size: 13px;
          }
        }
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
