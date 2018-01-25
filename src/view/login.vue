<template>
  <div :class="name" class="azm-fixed">
    <div class="top">
      <img src="../../assets/logo.png"/>
    </div>
    <div class="center">
      <van-cell-group class="login_form">
        <van-field class="login_form_username login_form_item"
                   v-model="username"
                   type="tel"
                   icon="clear"
                   maxLength="11"
                   placeholder="输入手机号"
                   @click-icon="username = ''"
        />
      </van-cell-group>
      <van-cell-group class="login_form">
        <van-field class="login_form_password login_form_item"
                   v-model="password"
                   type="password"
                   placeholder="输入密码"
                   icon="clear"
                   maxLength="13"
                   @click-icon="password = ''"
        />
      </van-cell-group>
      <van-row>
        <van-col :span="12">
          <label>
            <input name="Fruit" type="checkbox" v-model="checkbox"/>记住密码
          </label>
        </van-col>
        <van-col :span="12" class="forgetPwd">
          <router-link to="/login/forgetPwd">忘记密码?</router-link>
        </van-col>
      </van-row>
    </div>
    <div class="submit">
      <x-button type="primary" class="azm-font-cell azm-btn-submit" action-type="submit" :show-loading="isSubmit"
                @click.native="fromSubmit">{{isSubmit?'登录中，请稍后。。。':'登录'}}
      </x-button>
      <router-link to="/login/register" class="register" replace>新用户注册</router-link>
    </div>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  import { mapState } from 'vuex'
  import VanCellGroup from 'vant/packages/cell-group/index'
  import VanField from 'vant/packages/field/index'
  import VanRow from 'vant/packages/row/index'
  import VanCol from 'vant/packages/col/index'

  export default {
    components: {
      VanCol,
      VanRow,
      VanField,
      VanCellGroup,
      XButton
    },
    data () {
      return {
        name: 'login',
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'login',
          navBarHide: true
        },
        username: '',
        password: '',
        checkbox: false,
        isSubmit: false,
        loginText: '登录'
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
      this.$store.commit('setNavigationBarTitle', {title: '登录'})
    },
    methods: {
      fromSubmit () {
        if (this.isSubmit) {
          return
        }
        let that = this,
          mobile = that.$azm.util.trim(that.username),
          password = that.$azm.util.trim(that.password)
        const history = window.sessionStorage
        that.$azm.cookie.remove('secretKey')
        try {
          if (!new RegExp(that.$azm.util.RegExp.isMobile_str).test(mobile)) {
            that.$toast('用户名不正确')
          } else if (!that.$azm.util.trim(password)) {
            that.$toast('密码不正确')
          } else {
            let data = {
              mobile,
              newPwd: that.$azm.md5(password).toLowerCase(),
              password: that.$azm.md5(mobile + password).toLowerCase()
            }
            if (that.checkbox) {
              data.config = {
                expires: 7
              }
              // let secretKey = that.$azm.querystring.stringify({
              //   0: data.mobile, 1: data.password, 2: data.newPwd
              // })
              // console.log(secretKey, 'secretKey')
              // that.$azm.cookie.set('secretKey',
              //   secretKey,
              //   {
              //     expires: 7
              //   })
            }
            this.isSubmit = true
            that.$store.dispatch('ApiService.toLogin', data).then(
              (rsp) => {
                if (2000 === rsp.code && that.$azm.util.isEmptyValue(rsp.value)) {
                  that.$router.push({path: '/'})
                } else {
                  !rsp.status && that.$toast('用户名或密码不正确')
                }
                this.isSubmit = false
              },
              () => {
                this.isSubmit = false
              }
            )
          }
        } catch (e) {
          that.$toast('用户名或密码不正确')
        }
      }
    }
  }
</script>

<style lang='less'>
  .login {
    .login_form_item {
      input {
        background-color: transparent;
        color: #fff;
      }
      input:-webkit-autofill,
      textarea:-webkit-autofill,
      select:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px #282E3A inset; //去除黄色背景
        -webkit-text-fill-color: #fff; //字体颜色
        color: #fff;
      }
      input[type=text]:focus,
      input[type=password]:focus,
      textarea:focus {
        -webkit-box-shadow: 0 0 0 1000px #282E3A inset; //获取焦点时候可以去除背景色
        -webkit-text-fill-color: #fff; //字体颜色
        color: #fff;
      }
      .van-field__icon {
        color: #fff;
      }
    }
  }
</style>

<style scoped lang='less'>
  .login {
    background: #282E3A url("../../assets/bg_1.png") no-repeat fixed top;
    background-size: 375px 667px;
    padding: 0 20px;
    box-sizing: border-box;
    .top {
      padding: 54px 0 28px 0;
      text-align: center;
      img {
        width: 156px;
        height: auto;
      }
    }
    .center {
      padding: 50px 0 25px;
    }
    .center {
      label {
        position: relative;
        color: #e5e5e5;
        line-height: 16px;
        vertical-align: middle;
        padding-left: 20px;
        input[type=checkbox] {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
      .forgetPwd {
        text-align: right;
        a {
          color: #e5e5e5;
        }
      }
      .login_form {
        background-color: #282E3A;
        margin: 10px 0;
        .login_form_item {
          background-color: #282E3A;
        }
        &::after {
          border-radius: 5px;
          border-width: 1px 1px;
        }
      }

      .checkbox-box {
        padding: 10px 15px 10px 0;
        .checkbox {
          color: #999;
          font-size: 13px;
          .van-icon {
            border-color: #fff;
            background-color: #fff;
          }
        }
      }
    }
    .submit {
      text-align: center;
      .register {
        display: inline-block;
        font-size: 13px;
        color: #34c9e1;
        margin-top: 25px;
        text-align: center;
        width: 100px;
        height: 30px;
      }
    }
  }
</style>
