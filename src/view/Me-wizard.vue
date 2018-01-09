<template>
  <div class="Me_wizard_page">
    <flexbox>
      <flexbox-item :span="1/4" class="azm-left">
        <flow orientation="vertical" class="azm-flew">
          <flow-state is-done state="1" title="展示员工个人二维码"></flow-state>
          <flow-line is-done line-span="380px" class="azm-flew-line"></flow-line>
          <flow-state is-done state="2" title="扫扫描员工二维码"></flow-state>
          <flow-line is-done line-span="30px" class="azm-flew-line"></flow-line>
          <flow-state is-done state="3" title="完善员工资料并保存"></flow-state>
        </flow>
      </flexbox-item>
      <flexbox-item class="azm-img-box" :span="3/4">
        <img src="../assets/mePage.jpg" alt="" class="azm-img">
      </flexbox-item>
    </flexbox>
    <footer>
      <x-button type="primary" class="azm-font-cell" :show-loading="isSubmit" style="border-radius:99px;"
                @click.native="scanQRCode">
        立即扫描
      </x-button>
    </footer>
  </div>
</template>

<script>
  import {
    Flow, FlowState, FlowLine, Flexbox, FlexboxItem, XButton
  } from 'vux'

  export default {
    directives: {},
    components: {
      Flow, FlowState, FlowLine, Flexbox, FlexboxItem, XButton
    },
    data () {
      return {
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'me-wizard'
        },
        isSubmit: false
      }
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '添加员工向导'})
    },
    methods: {
      openImg (e, index) {
        this.$refs.previewer.show(index)
        e.cancelBubble = true
      },
      routerLink (path, params) {
        this.$router.push({path, query: params})
      },
      scanQRCode () {
        let that = this,
          data = {}
        if (that.$device.isWechat) {
          that.$wechat.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              var result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
              data = that.$azm.querystring.parse(result)
              if (data.shiroUserId) {
                that.$vux.loading.show({text: 'Loading'})

                that.$store.dispatch('ApiService.judgmentShop', data).then(
                  (rsp) => {
                    if (!rsp.data.returnStatus && rsp.data.code == 2000) {
                      that.routerLink('/me-staff-info', {
                        shiro_user_id: data.shiroUserId,
                        isBindResUser: 1,
                        type: 2
                      })
                    } else {
                      that.$toast(rsp.data.message)
                    }
                    that.$vux.loading.hide()
                  }
                )
              } else {
                that.$vux.toast.text('用户ID为空')
              }
            },
            fail (rsp) {
              that.$toast('网络开小差了，请稍后再试~')
              // console.log(rsp)
              // let result = 'shiroUserId=ad5e63f3a1f84f89b834e121a0f71a04&resId=&type=',
              //   data = that.$azm.querystring.parse(result)
              // debugger
              // if (data.shiroUserId) {
              //   that.$vux.loading.show({text: 'Loading'})
              //   that.$store.dispatch('ApiService.judgmentShop', data).then(
              //     (rsp) => {
              //       if (!rsp.data.returnStatus && rsp.data.code == 2000) {
              //         that.routerLink('/me-staff-info', {
              //           shiro_user_id: data.shiroUserId,
              //           isBindResUser: 1,
              //           type: 2
              //         })
              //       } else {
              //         that.$toast(rsp.data.message)
              //       }
              //       that.$vux.loading.hide()
              //     }
              //   )
              // } else {
              //   that.$vux.toast.text('用户ID为空')
              // }
            }
          })
        } else {
          that.$toast('请进入一号掌柜微信公众号使用哦~')
        }
      },
      onShow () {},
      onHide () {},
      onChange () {}
    }
  }
</script>
<style>
  .weui-wepay-flow__li_done .weui-wepay-flow__state, .weui-wepay-flow__process {
    background-color: #00c1de !important;
  }
</style>
<style scoped lang='less'>
  .Me_wizard_page {
    box-sizing: border-box;
    .azm-img {
      width: 170px;
    }
    footer {
      .azm-font-cell {
        font-size: 15px;
        font-weight: 400;
      }
      box-sizing: border-box;
      padding: 10px 80px;
    }
    .azm-img-box {
      margin-top: -55px;
    }
  }
</style>
