<template>
  <div :class="name" class="azm-fixed">
    <div class="top">
      <x-button type="primary" class="azm-btn azm-btn-code" action-type="submit"
                @click.native="BindOrderQRcode">
        <i class="azm-icon iconfont icon-saoma"></i>
        <span v-if="isBindOrderQRCode && isBindOrderQRCode.id">解绑店铺</span>
        <span v-else>绑定店铺</span>
      </x-button>
    </div>
    <van-row class="section" v-if="findQRTableDtoListData[0]">
      <van-col :span="8" class="section-left section-item">
        <ul v-for="(item,index) of findQRTableDtoListData" :key="item.subareaId">
          <li :class="{'active':(index == page)}" @click="tabCilck(index)">{{item.subareaName}}</li>
        </ul>
      </van-col>
      <van-col :span="15" offset="1" class="section-right section-item">
        <scroller ref="my_scroller">
          <ul v-for="item of findQRTableDtoListData[page].tableList" :key="item.id">
            <li>
              <header class="vux-1px-b">
                <p>名称：{{item.name}}</p>
                <p>
                  <span>桌台编号：</span>
                  <span>{{item.tableNo}}</span>
                </p>
              </header>
              <section>
                <p>
                  <span>二维码编号1：</span>
                  <span v-if="item.qrTableList && item.qrTableList[0]">{{item.qrTableList[0].serialNumber}}</span>
                </p>
                <p>
                  <span>二维码编号2：</span>
                  <span v-if="item.qrTableList && item.qrTableList[1]">{{item.qrTableList[1].serialNumber}}</span>
                </p>
              </section>
              <van-row gutter="10" class="footer">
                <van-col :span="12" class="text-center">
                  <x-button mini plain :type="(item.qrTableList && item.qrTableList[0])?'warn':'primary'"
                            class="azm-btn azm-btn-code" action-type="submit"
                            @click.native="isBindQRcode(item,0)">
                    <span v-if="item.qrTableList && item.qrTableList[0]">解绑1</span>
                    <span v-else>绑定1</span>
                  </x-button>
                </van-col>
                <van-col :span="12" class="text-center">
                  <x-button mini plain :type="(item.qrTableList && item.qrTableList[1])?'warn':'primary'"
                            class="azm-btn azm-btn-code" action-type="submit"
                            @click.native="isBindQRcode(item,1)">
                    <span v-if="item.qrTableList && item.qrTableList[1]">解绑2</span>
                    <span v-else>绑定2</span>
                  </x-button>
                </van-col>
              </van-row>
            </li>
          </ul>
        </scroller>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  import { mapState } from 'vuex'
  // import XButton from '../../components/x-button/index'
  import VanCol from 'vant/packages/col/index'
  import VanRow from 'vant/packages/row/index'

  export default {
    components: {
      VanRow,
      VanCol,
      XButton
    },
    data () {
      return {
        name: 'bound-table',
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'bound-table',
          navBarHide: true
        },
        x: '',
        y: '',
        page: 0
      }
    },
    computed: {
      ...mapState({
        shiroUserId: state => state.ApiService.shiroUserId,
        resId: state => state.ApiService.resId,
        findQRTableDtoListData: state => state.ApiService.findQRTableDtoListData,
        isBindOrderQRCode: state => state.ApiService.isBindOrderQRCode
      })
    },
    created () {
      this.$emit('transfer', this.transferObj)
      if (!this.transferObj.navBarHide) {
        this.name = `${this.name} azm-fixed_46px`
      }
      this.$store.commit('setNavigationBarTitle', {title: '绑定桌台'})
      this.$store.dispatch('ApiService.isBindRestaurantQRcode', {resId: this.resId})
      this.$store.dispatch('ApiService.findQRTableDtoList', {resId: this.resId})
    },
    methods: {
      isBindQRcode (item, type) {
        if (item.qrTableList && item.qrTableList[type]) {
          this.unBoundQRcode(item.qrTableList[type], 0)
        } else {
          this.bindQRCode(item, 0)
        }
      },
      BindOrderQRcode () {
        let val = this.isBindOrderQRCode
        if (this.$azm.util.isEmptyValue(val)) {
          this.unBoundQRcode(val, 1)
        } else {
          this.bindQRCode(val, 1)
        }
      },
      unBoundQRcode (val, type) {
        let that = this,
          data = {
            resId: that.resId,
            id: val.id,
            handleId: val.handleId
          },
          content = `您是否解除编号为${val.serialNumber}的桌台二维码`
        if (type) {
          data.type = type
          content = `您是否解除编号为${val.serialNumber}的店铺二维码`
        } else {
          data.tableId = val.tableId
        }
        this.$vux.confirm.show({
          title: '确认操作',
          content,
          confirmText: '是',
          cancelText: '否',
          onShow: function onShow () {},
          onHide: function onHide () {},
          onCancel: function onCancel () {},
          onConfirm: function onConfirm () {
            that.$store.dispatch('ApiService.unBoundQRcode', data)
          }
        })
      },
      bindQRCode (item, type) {
        let that = this,
          data = {
            resId: that.resId,
            handleId: that.shiroUserId
          }
        if (type) {
          data.type = type
        } else {
          data.tableId = item.id
        }
        if (that.$device.isWechat) {
          that.$wechat.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              var result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
              data.id = result
              if (data.handleId) {
                that.$vux.loading.show({text: 'Loading'})
                that.$store.dispatch('ApiService.bindQRcode', data).then(
                  (rsp) => {
                    that.$toast(rsp.message)
                    that.$vux.loading.hide()
                  }
                )
              } else {
                that.$toast('服务器开小差了，请稍后再试~')
              }
            },
            fail (rsp) {
              that.$toast('网络开小差了，请稍后再试~')
              // console.log(rsp)
              // let result = 'http://vip.zhenler.com/H5/qrcode.html?id=c73764fde95b45138a4659c19b716e1e'
              // data.id = result
              // that.$vux.loading.show({text: 'Loading'})
              // that.$store.dispatch('ApiService.bindQRcode', data).then(
              //   (rsp) => {
              //     that.$toast(rsp.message)
              //     that.$vux.loading.hide()
              //   }
              // )
            }
          })
        } else {
          that.$toast('请进入1号掌柜微信公众号使用哦~')
        }
      },
      tabCilck (index) {
        this.page = index
      },
      scroller1 () {
        let {left, top} = this.$refs.my_scroller.getPosition()
        this.x = left
        this.y = top
        console.log(left, top)
      }
    }
  }
</script>

<style lang='less'>
  .bound-table {
  }
</style>

<style scoped lang='less'>
  .bound-table {
    background-color: #efeff4;
    iframe {
      border: none;
      width: 100%;
      height: 100%;
    }
    .top {
      padding: 10px 20px;
      button {
        line-height: 40px;
        font-size: 14px;
        .azm-icon {
          font-size: 14px;
          color: #fff;
        }
      }
    }
    .section {
      position: absolute;
      top: 60px;
      left: 0;
      bottom: 0;
      right: 0;
      /*#f7f9fa*/
      .section-item {
        position: absolute;
        top: 0;
        bottom: 0;
      }
      .section-left {
        left: 0;
        background-color: #f7f9fa;
        li {
          height: 50px;
          line-height: 50px;
          padding-left: 20px;
          padding-right: 10px;
          &.active {
            background-color: #fff;
            border-right: 3px solid #34C9E1;
          }
        }
      }
      .section-right {
        right: 0;
        li {
          box-sizing: border-box;
          padding: 12px 21px 12px 12px;
          background-color: #f7f9fa;
          margin-bottom: 10px;
          header, section {
            p {
              font-size: 12px;
              line-height: 26px;
              span:nth-child(1) {
                color: #96a0b2;
              }
            }
          }
          header {
            padding-bottom: 5px;
            p {
              &:nth-child(1) {
                font-weight: bold;
                font-size: 15px;
              }
            }
          }
          .footer {
            padding-top: 5px;
            button {
              font-size: 12px;
              line-height: 27px;
              border-radius: 27px;
              padding-left: 25px;
              padding-right: 25px;
            }
            .weui-btn_warn {

            }
            .weui-btn_plain-primary {
              color: #34C9E1;
              border: 0.013333rem solid #34C9E1;
            }
          }
        }
      }
    }
  }
</style>
