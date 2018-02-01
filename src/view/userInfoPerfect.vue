<template>
  <div :class='name' class="azm-fixed">
    <div class="user-info-perfect_box">
      <p class="title">填写个人基本资料</p>
      <van-row class="user-info-perfect_row">
        <van-col :span="5">
          <div class="van-cell user-info-perfect_box__text">昵称</div>
        </van-col>
        <van-col :span="19">
          <van-cell-group class="form-group">
            <van-field class="form-group__nikename form-group__item"
                       v-model="nike_name"
                       type="tel"
                       icon="clear"
                       maxLength="11"
                       placeholder="必填，请输入昵称"
                       @click-icon="nike_name = ''"
            />
          </van-cell-group>
        </van-col>
      </van-row>
      <van-row class="user-info-perfect_row">
        <van-col :span="5">
          <div class="van-cell user-info-perfect_box__text">性别</div>
        </van-col>
        <van-col :span="19">
          <van-radio-group v-model="sex">
            <van-row>
              <van-col :span="9">
                <van-radio name="1">先生</van-radio>
              </van-col>
              <van-col :span="9">
                <van-radio name="2">女士</van-radio>
              </van-col>
            </van-row>
          </van-radio-group>
        </van-col>
      </van-row>
      <van-row class="user-info-perfect_row">
        <van-col :span="5">
          <div class="van-cell user-info-perfect_box__text">生日</div>
        </van-col>
        <van-col :span="19">
          <x-button class="btn-birthday" @click.native="openBirthday">
            <p>
              <span>{{year}}年</span>
              <span>&nbsp;-&nbsp;</span>
              <span>{{month}}月</span>
              <span>&nbsp;-&nbsp;</span>
              <span>{{day}}日</span>
            </p>
          </x-button>
        </van-col>
      </van-row>
      <x-button type="primary" class="azm-btn azm-btn-submit" action-type="submit"
                @click.native="submitUserInfo">下一步
      </x-button>
    </div>
    <!--生日-->
    <group title="" style="display: none">
      <datetime v-model="birthday" @on-change="birthdayChange" end-date="2019-10-20"
                title=""></datetime>
    </group>
  </div>
</template>

<script>
  import { XButton, Group, Datetime, dateFormat } from 'vux'
  import { mapState } from 'vuex'
  import { Field, CellGroup, Row, Col, PasswordInput, NumberKeyboard, Radio, RadioGroup } from 'vant/lib/index'
  import ButtonTab from 'vux/src/components/button-tab/button-tab'

  export default {
    components: {
      ButtonTab,
      XButton,
      Group,
      Datetime,
      [PasswordInput.name]: PasswordInput,
      [NumberKeyboard.name]: NumberKeyboard,
      [CellGroup.name]: CellGroup,
      [Field.name]: Field,
      [Col.name]: Col,
      [Row.name]: Row,
      [Radio.name]: Radio,
      [RadioGroup.name]: RadioGroup,
    },
    data () {
      return {
        name: 'user-info-perfect',
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'user-info-perfect',
          navBarHide: true
        },
        iframe: '',
        hash: '',
        nike_name: '',
        currentDate: dateFormat(new Date(), 'YYYY-MM-DD'),
        birthday: '',
        year: '',
        month: '',
        day: '',
        visibility: false,
        sex: '1'
      }
    },
    computed: {
      ...mapState({
        shiroUserId: state => state.ApiService.shiroUserId,
        resId: state => state.ApiService.resId
      })
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '完善个人信息'})
      this.hash = this.$azm.config.Hash
    },
    methods: {
      birthdayChange () {

      },
      openBirthday () {
        let that = this
        let birthday = dateFormat(new Date(), 'YYYY-MM-DD')
        if (that.birthday) {
          birthday = that.birthday
        }
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD',
          value: '',
          onConfirm (val) {
            let birthday = val.split('-')
            that.birthday = val
            that.year = birthday[0]
            that.month = birthday[1]
            that.day = birthday[2]
          },
          onHide (e) {
            console.log(e)
          },
          onShow (e) {

          }
        })
      },
      submitUserInfo () {
        let that = this,
          shiroUserId = this.shiroUserId,
          nickName = this.nike_name,
          sex = this.sex,
          birthday = this.birthday
        if (!nickName) {
          that.$toast('请填写昵称')
        } else if (!sex) {
          that.$toast('请选择性别')
        } else if (!birthday) {
          that.$toast('请填写生日')
        } else
          this.$store.dispatch('ApiService.updateShiroUser',
            {
              id: shiroUserId,
              nickName,
              userBirthday: +new Date(birthday),
              sex
            }
          ).then(
            rsp => {
              if (rsp.code === 2000) {
                this.$router.replace('/registerSuccess')
              } else {
                !rsp.status && that.$toast('提交信息出错')
              }
            }
          )
      }
    }
  }
</script>

<style scoped>
  .user-info-perfect {
  }
</style>
<style scoped lang='less'>
  .user-info-perfect {
    .azm-btn-submit {
      margin-top: 107px;
    }
    .form-group {
      &::after {
        border: 1px solid #afb4be;
        border-radius: 10px;
      }
    }
    background-color: #fff;
    button.disabled {
      background-color: #999999;
    }
    p.title {
      font-size: 12px;
      color: #798292;
      margin-bottom: 30px;
    }
    .user-info-perfect_box {
      padding: 24px 20px 0;
      box-sizing: border-box;
      .user-info-perfect_row {
        margin-bottom: 25px;
        .btn-birthday {
          background-color: transparent;
          color: #798292;
          padding-top: 10px;
          padding-bottom: 10px;
          &::after {
            border-color: #afb4be;
          }
          p {
            font-size: 12px;
            color: #96A0B2;
            line-height: 24px;
          }
        }
      }
      .user-info-perfect_box__text {
        font-size: 13px;
        color: #798292;
      }
    }
  }
</style>
