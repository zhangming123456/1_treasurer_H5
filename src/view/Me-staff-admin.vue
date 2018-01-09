<template>
  <div class="me_staff_admin_page">
    <div class="azm-card" v-for="(item, index) of findResUserListData" v-if="item.type == 1">
      <div class="title">
        <div class="clearfix">
          <div class="fl title-item">
            <i class="iconfont icon-nv azm-icon azm-icon-F19EC2" v-if="item.sex == 2"></i>
            <i class="iconfont icon-nan azm-icon azm-icon-00c1de" v-else></i>
            <span class="azm-name">&nbsp;&nbsp;{{item.nick_name}}</span>
            <span>({{item.role_name}})</span>
          </div>
          <div class="fr title-item">
            <div class="title-item-bianji" @click="routerLink('/me-staff-info',item)">
              <i class="iconfont icon-bianji"></i>
              <span>编辑</span>
            </div>
          </div>
        </div>
      </div>
      <flexbox class="box">
        <flexbox-item :span="4/6">
          <p><span>手机号：</span>{{item.mobile}}</p>
          <p><span>入职日期：</span>{{item.createTime | dateFormat}}</p>
        </flexbox-item>
        <flexbox-item style="text-align: right">
          <!--<x-button type="primary" mini show-loadin="false" class="azm-button azm-button-tianjia"-->
          <!--@click.native="routerLink('/me-wizard')">-->
          <!--添加-->
          <!--<i class="iconfont icon-tianjia azm-icon"></i>-->
          <!--</x-button>-->
        </flexbox-item>
      </flexbox>
    </div>
    <div class="azm-card" v-for="(item, index) of findResUserListData" v-if="item.type != 1">
      <div class="title">
        <div class="clearfix">
          <div class="fl title-item text-overflow left">
            <i class="iconfont icon-nv azm-icon azm-icon-F19EC2" v-if="item.sex == 2"></i>
            <i class="iconfont icon-nan azm-icon azm-icon-00c1de" v-else></i>
            <span class="azm-name">&nbsp;&nbsp;{{item.nick_name}}</span>
            <span>({{item.role_name}})</span>
          </div>
          <div class="fr title-item">
            <div class="title-item-shancu" @click="deleteResUser(item.id)">
              <i class="iconfont icon-shanchu"></i>
              <span>删除</span>
            </div>
            <div class="title-item-bianji" @click="routerLink('/me-staff-info',item)">
              <i class="iconfont icon-bianji"></i>
              <span>编辑</span>
            </div>
          </div>
        </div>
      </div>
      <flexbox class="box">
        <flexbox-item :span="4/6">
          <p><span>手机号：</span>{{item.mobile}}</p>
          <p><span>入职日期：</span>{{item.createTime | dateFormat}}</p>
        </flexbox-item>
        <flexbox-item style="text-align: right">
          <x-button v-if="item.status == 1" type="warn" mini show-loadin="false" class="azm-button"
                    @click.native="startUsing(item)">禁用
          </x-button>
          <x-button v-else-if="item.status == 0" type="primary" mini show-loadin="false" class="azm-button"
                    @click.native="startUsing(item)">启用
          </x-button>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
  import {
    Group,
    Cell,
    CellBox,
    XInput,
    XNumber,
    XButton,
    XSwitch,
    PopupPicker,
    Flexbox,
    FlexboxItem,
    numberComma,
    numberPad,
    numberRandom
  } from 'vux'
  import { mapState } from 'vuex'

  export default {
    directives: {
      numberComma,
      numberPad,
      numberRandom
    },
    components: {
      XSwitch,
      XNumber,
      XButton,
      Group,
      Cell,
      CellBox,
      XInput,
      PopupPicker,
      Flexbox,
      FlexboxItem
    },
    data () {
      return {
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'me-shop'
        },
        nikeName: '',
        orderList: [['sssjj']],
        orderValue: [],
        jobNumber: null,
        Phone: '',
        CharacterList: [['sssjj']],
        Character: [],
        minWipeZero: '',
        maxWipeZero: '',
        minPercentage: '',
        maxPercentage: '',
        isRefund: 0,
        isAntiCheckout: 0,
        isSubmit: false
      }
    },
    computed: {
      ...mapState({
        findResUserListData: state => state.ApiService.findResUserListData,
        resId: state => state.ApiService.resId,
      })
    },
    created () {
      let that = this
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '员工管理'})
      that.getFindResUserList()
      that.$store.commit('setNavBar', {
        clickRight: function () {
          that.routerLink('/me-wizard')
        },
        rightText: '添加'
      })
    },
    methods: {
      getFindResUserList () {
        let that = this
        this.$store.dispatch('ApiService.findResUser', {
          resId: that.resId,
          config: {isList: 1}
        })
      },
      openImg (e, index) {
        this.$refs.previewer.show(index)
        e.cancelBubble = true
      },
      routerLink (path, params) {
        this.$router.push({path, query: params})
      },
      deleteResUser (id) {
        let that = this
        this.$vux.confirm.show({
          title: '确认操作',
          content: '您是否删除当前员工。',
          onShow () {
          },
          onHide () {
          },
          onCancel () {
          },
          onConfirm () {
            that.$store.dispatch('ApiService.deleteResUser', {id}).then(
              () => {
                that.$store.dispatch('ApiService.findResUser', {
                  resId: that.resId,
                  config: {isList: 1}
                })
              }
            )
          }
        })
      },
      startUsing (item) {
        let [that, data] = [
          this,
          {
            shiroUserId: item.shiro_user_id,
            resId: this.resId,
            status: item.status == 1 ? 0 : 1
          }
        ]
        if (item.status == 1) {
          this.$vux.confirm.show({
            title: '确认操作',
            content: '您是否禁用当前员工。',
            onShow () {
            },
            onHide () {
            },
            onCancel () {
            },
            onConfirm () {
              that.updateResUserStatus(data)
            }
          })
        } else {
          that.updateResUserStatus(data)
        }
      },
      updateResUserStatus (data) {
        if (!data) return
        let that = this
        that.$store.dispatch('ApiService.updateResUser', data).then(
          (rsp) => {
            if (2000 == rsp.data.code) {
              that.getFindResUserList()
            }
          }
        )
      },
      onShow () {},
      onHide () {},
      onChange () {}
    }
  }
</script>
<style scoped lang='less'>
  .me_staff_admin_page {
    box-sizing: border-box;
    padding-top: 10px;
    .azm-card {
      box-sizing: border-box;
      margin: 12px 30px 24px;
      border-radius: 3px;
      background-color: #fff;
      box-shadow: 3px 3px 5px 2px #9c9c9c;
      .title {
        position: relative;
        box-sizing: border-box;
        padding: 5px 11px 5px 38px;
        background-color: #e3e9f3;
        font-size: 11px;
        color: #96a0b2;
        .title-item {
          height: 100%;
          line-height: 28px;
        }
        .left {
          width: 150px;
        }
        .azm-icon {
          position: absolute;
          top: 50%;
          left: 11px;
          transform: translateY(-50%);
          font-size: 23px;
        }
        .azm-name {
          color: #000;
          font-size: 13px;
          font-weight: 500;
        }
        .azm-icon-00c1de {
          color: #00c1de;
        }
        .azm-icon-F19EC2 {
          color: #F19EC2;
        }
        .title-item {
          height: 18px;
          line-height: 18px;
          padding: 6px 0;
          .title-item-shancu {
            padding-right: 11px;
            border-right: 2px solid #ccc;
          }
          .title-item-bianji {
            padding-left: 9px;
          }
          .title-item-shancu, .title-item-bianji {
            display: inline-block;
          }
        }
      }
      .box {
        box-sizing: border-box;
        padding: 20px 11px;
        font-size: 11px;
        color: #000;
        .azm-button {
          border-radius: 99px;
          position: relative;
          &.azm-button-tianjia {
            padding-right: 34.160px;
            .azm-icon {
              position: absolute;
              right: 13px;
              top: 47%;
              transform: translateY(-50%);
              font-size: 14px;
            }
          }

        }
        p {
          height: 20px;
          line-height: 20px;
          > span {
            color: #96a0b2;
          }
        }
      }
    }
  }
</style>
