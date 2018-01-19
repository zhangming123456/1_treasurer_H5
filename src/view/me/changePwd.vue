<template>
  <div :class="name" class="azm-fixed">
    <div v-if="step === 0" class="forget_pwd_form_box">
      <van-cell-group class="forget_pwd_form">
        <van-field class="forget_pwd_form_username forget_pwd_form_item"
                   v-model="oldPwd"
                   type="text"
                   icon="clear"
                   maxLength="13"
                   placeholder="请输入旧密码"
                   @click-icon="oldPwd = ''"
        />
      </van-cell-group>
      <van-cell-group class="forget_pwd_form">
        <van-field class="forget_pwd_form_password forget_pwd_form_item"
                   v-model="password"
                   type="tel"
                   placeholder="请输入6位数字新密码"
                   icon="clear"
                   maxLength="6"
                   @click-icon="password = ''"
        />
      </van-cell-group>
      <van-cell-group class="forget_pwd_form">
        <van-field class="forget_pwd_form_password forget_pwd_form_item"
                   v-model="password2"
                   type="tel"
                   placeholder="请确认新密码"
                   icon="clear"
                   maxLength="6"
                   @click-icon="password2 = ''"
        />
      </van-cell-group>
      <div class="forget_pwd_form_footer">
        <x-button type="primary" class="azm-btn azm-btn-submit" action-type="submit"
                  @click.native="next">确认
        </x-button>
      </div>
    </div>
    <div v-else-if="step === 1" class="forget_pwd_form_box">
      <p>修改密码成功</p>
      <p>
        <i class="iconfont icon-dui azm-icon"></i>
      </p>
      <p>将在
        <countdown v-model="endCountdownTime" @on-finish="finish" v-show="endShow"></countdown>
        s后跳转...
      </p>
      <div class="forget_pwd_form_footer">
        <x-button type="primary" class="azm-btn azm-btn-submit" action-type="submit"
                  @click.native="next">立即跳转
        </x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { XButton, Countdown } from 'vux'
  import { mapState } from 'vuex'
  import VanField from 'vant/packages/field/index'
  import VanCellGroup from 'vant/packages/cell-group/index'
  import VanRow from 'vant/packages/row/index'
  import VanCol from 'vant/packages/col/index'
  // import Countdown from '../../components/countdown/index'
  // import XButton from '../../components/x-button/index'

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
        name: 'change-pwd',
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'change-pwd'
        },
        endShow: true,
        endCountdownTime: 10,
        step: 0,
        oldPwd: '',
        password: '',
        password2: ''
      }
    },
    computed: {
      ...mapState({
        shiroUserId: state => state.ApiService.shiroUserId,
        mobile: state => state.ApiService.mobile,
        resId: state => state.ApiService.resId,
      })
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '修改密码'})
    },
    methods: {
      finish (index) {
        this.endShow = false
        this.endCountdownTime = 0
        this.next()
      },
      next () {
        let that = this,
          mobile = this.$azm.util.trim(this.mobile),
          oldPwd = this.$azm.util.trim(this.oldPwd),
          password = this.$azm.util.trim(this.password),
          password2 = this.$azm.util.trim(this.password2)
        if (this.step === 0) {
          if (!oldPwd) {
            that.$toast('旧密码不能为空')
          } else if (oldPwd.length < 6) {
            that.$toast('旧密码至少6位数字')
          } else if (!password) {
            that.$toast('新密码不能为空')
          } else if (!password2) {
            that.$toast('确认新密码不能为空')
          } else if (password === oldPwd) {
            that.$toast('旧密码与新密码不能相同哦~')
          } else if (password2 !== password) {
            that.$toast('两次新密码不一致')
          } else if (password.length < 6) {
            that.$toast('新密码至少6位数字')
          } else {
            let data = {
              mobile,
              oldPwd: that.$azm.md5(mobile + oldPwd).toLowerCase(),
              password: that.$azm.md5(mobile + password).toLowerCase(),
              newPwd: that.$azm.md5(password).toLowerCase()
            }
            that.$store.dispatch('ApiService.updatePassword', data).then(
              (rsp) => {
                if (rsp.code == 2000 && rsp.returnStatus) {
                  that.endShow = true
                  that.endCountdownTime = 10
                  that.step++
                }
                that.$toast(rsp.message)
              }
            )
          }
        } else if (this.step === 1) {
          that.$router.go(-1)
        }
      }
    }
  }
</script>

<style lang='less'>
  .change-pwd {
  }
</style>

<style scoped lang='less'>
  .change-pwd {
    background-color: #fff;
    .forget_pwd_form_box {
      padding: 80px 20px;
      box-sizing: border-box;
      &:nth-child(1) {
        p {
          font-size: 13px;
          color: #96a0b2;
          margin-bottom: 14px;
          padding-left: 15px;
        }
      }
      .forget_pwd_form {
        margin-bottom: 12.5px;
        height: 43.5px;
        line-height: 43.5px;
        overflow: hidden;
        .forget_pwd_form_item {
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
      .forget_pwd_form_footer {
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
