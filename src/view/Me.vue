<template>
  <div class="me_page">
    <div class="azm-me" @click="routerLink('/me-info')">
      <div class="azm-me-link clearfix">
        <div class="fl azm-me-link-item azm-me-img">
          <img v-if="userInfo" :src="imagesUrl+userInfo.headPhoto" alt="" class="">
        </div>
        <div class="fl azm-me-link-item azm-me-name">
          <h3>{{userInfo.nick_name}}</h3>
        </div>
        <div class="fr azm-me-link-item azm-me-qr" @click="openImg($event,0)">
          <!--<img class="" src="../../assets/qr.png">-->
          <i class="iconfont icon-erweima azm-icon"></i>
          <i class="iconfont icon-fanhui-copy-copy-copy azm-icon-copy"></i>
          <qrcode :value="qrcodeImg" type="img" :size="100" id="qrcodeImg" style="display: none"></qrcode>
        </div>
      </div>
    </div>
    <div class="azm-cell-list">
      <group class="azm-cell-list-group">
        <cell is-link title="我的账户" class="azm-cell" @click.native="judg('/me/userAccount')">
          <i slot="icon" class="iconfont icon-diamond azm-icon azm-icon-f86162"></i>
          <div>收银账号设置</div>
        </cell>
        <cell is-link title="我的应用" class="azm-cell" @click.native="judg('/me/applications')">
          <i slot="icon" class="iconfont icon-05 azm-icon azm-icon_bold azm-icon-34c9e1"></i>
        </cell>
        <cell is-link title="绑定桌台" class="azm-cell"
              @click.native="judg('me/boundTable')">
          <i slot="icon" class="iconfont icon-bangding azm-icon azm-icon-ae94eb"></i>
        </cell>
        <!--link="/me-shop"-->
        <cell is-link title="商家开店" class="azm-cell" @click.native="judgmentShop($event)"
              :is-loading="isLoadingJudgmentShop">
          <i slot="icon" class="iconfont icon-shangjia azm-icon azm-icon-41a3fb"></i>
        </cell>
        <cell is-link title="修改密码" class="azm-cell" link="/me/changePwd">
          <i slot="icon" class="iconfont icon-mima azm-icon azm-icon-ac92eb"></i>
        </cell>
        <cell is-link title="联系客服" class="azm-cell" link="/me-contact-service">
          <i slot="icon" class="iconfont icon-kefu azm-icon azm-icon-febf00"></i>
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
  import { Group, Cell, CellBox, Previewer, TransferDom, Qrcode } from 'vux'
  import { mapState } from 'vuex'
  import VanCellGroup from 'vant/packages/cell-group/index'
  import VanCell from 'vant/packages/cell/index'

  export default {
    directives: {
      TransferDom
    },
    components: {
      VanCell,
      VanCellGroup,
      Group,
      Cell,
      CellBox,
      Previewer,
      Qrcode
    },
    data () {
      let that = this
      return {
        socketService: null,
        msg: 'Hello World!',
        setData: null,
        transferObj: {
          isTabbar: true,
          tabbarLink: 'me'
        },
        imagesUrl: that.$azm.config.imageUrl,
        isLoadingJudgmentShop: false
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.ApiService.findResUserData,
        resId: state => state.ApiService.resId,
        shiroUserId: state => state.ApiService.shiroUserId,
        qrcodeImg: state => state.ApiService.qrcodeImg,
      })
    },
    created () {
      console.log(this.$route, '______________')
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '个人中心'})
      this.getUserInfo()
    },
    methods: {
      openImg (e, position) {
        try {
          let url = window.document.querySelector('#qrcodeImg img').src
          if (url) {
            this.$vant.ImagePreview([
              url
            ], typeof position === 'number' ? position : 0)
          }
          console.log(url)
        } catch (e) {
          console.warn('打开二维码图片失败')
        }
        e.cancelBubble = true
      },
      routerLink (path, params) {
        this.$router.push({path, query: params})
      },
      getUserInfo (cb) {
        let that = this
        this.$store.dispatch('ApiService.findResUser', {
          resId: that.resId,
          shiroUserId: that.shiroUserId
        }).then(cb)
      },
      judg (path) {
        let that = this
        if (this.resId) {
          this.routerLink(path)
        } else {
          this.$vux.confirm.show({
            title: '确认操作',
            content: '你暂时未开店，请先填写信息进行开店',
            confirmText: '开店',
            cancelText: '取消',
            onShow () {
            },
            onHide () {
            },
            onCancel () {},
            onConfirm () {
              that.routerLink('/me-shop-info')
            }
          })
        }
      },
      judgmentShop () {
        let that = this
        that.isLoadingJudgmentShopL = true
        that.getUserInfo(
          () => {
            that.isLoadingJudgmentShopL = false
            try {
              let type = that.userInfo.type
              if (1 == type) {
                that.routerLink('/me-shop-success', {type})
              } else if (2 == type) {
                that.routerLink('/me-shop-success', {type})
              } else {
                that.routerLink('/me-shop-info')
              }
            } catch (e) {

            }
          }
        )
      }
    }
  }
</script>
<style scoped lang='less'>
  .me_page {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    padding-bottom: 120px;
  }

  .azm-me {
    .azm-me-link {
      display: block;
      box-sizing: border-box;
      padding: 20px 30px 0 50px;
      line-height: 76px;
      .azm-me-name {
        h3 {
          font-size: 15px;
          color: #34c9e1;
          font-weight: 600;
        }
      }
      .azm-me-link-item {
        height: 100%;
      }
      .azm-me-link-item.azm-me-img {
        width: 65px;
        height: 65px;
        margin-right: 36px;
        text-align: center;
        vertical-align: middle;
        border-radius: 100%;
        border: 5px solid #efefef;
        overflow: hidden;
        img {
          width: 60px;
          height: auto;
        }
      }
      .azm-me-link-item.azm-me-qr {
        width: 60px;
        height: 65px;
        line-height: 65px;
        position: relative;
        text-align: right;
        .azm-icon {
          font-size: 25px;
          display: inline;
          color: #C8C8CD;
          position: absolute;
          top: 50%;
          left: 30%;
          transform: translateY(-50%);
        }
        .azm-icon-copy {
          display: inline;
          font-size: 12px;
          color: #C8C8CD;
        }
      }
    }
  }

  .azm-cell-list {
    .azm-cell {
      font-size: 13px;
      color: #2b2e3a;
      .azm-icon {
        width: 35px;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        font-weight: 500;
      }
      .azm-icon_bold {
        font-weight: bold;
      }
      .azm-icon-34c9e1 {
        color: #34c9e1;
      }
      .azm-icon-f86162 {
        color: #f86162;
      }
      .azm-icon-41a3fb {
        color: #41a3fb;
      }
      .azm-icon-ac92eb {
        color: #ac92eb;
      }
      .azm-icon-febf00 {
        color: #febf00;
      }
      .azm-icon-48cfae {
        color: #48cfae;
      }
      .azm-icon-ae94eb {
        color: #ae94eb;
      }
    }
  }


</style>
