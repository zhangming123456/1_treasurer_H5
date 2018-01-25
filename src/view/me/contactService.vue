<template>
  <div :class="name" class="azm-fixed">
    <van-cell-group>
      <van-cell title="客服微信号" value="kelailer">
        <template slot="icon">
          <i class="iconfont icon-weixin" style="color: #49cfae"></i>
        </template>
      </van-cell>
      <van-cell title="客服QQ号" value="2044789217">
        <template slot="icon">
          <i class="iconfont icon-qq" style="color: #f6a966"></i>
        </template>
      </van-cell>
      <van-cell icon="phone" title="电话" value="0755-32914310转2"></van-cell>
    </van-cell-group>
    <div class="footer">
      <p style="margin-bottom: 2em">请添加微信客服一对一客服</p>
      <qrcode value="https://u.wechat.com/MEsww62KjAF9TMjecL5BbE0" type="img" :size="200"></qrcode>
      <!--<img src="../../../assets/lALPBbCc1UV6wrnNAQLNAQI_258_258.png" alt="">-->
    </div>
  </div>
</template>

<script>
  import { Qrcode } from 'vux'
  import { CellGroup, Cell } from 'vant/lib/index'
  // import VanCellGroup from 'vant/packages/cell-group/index'
  // import VanCell from 'vant/packages/cell/index'

  export default {
    components: {
      Qrcode,
      [CellGroup.name]: CellGroup,
      [Cell.name]: Cell
    },
    data () {
      return {
        name: 'me-contact-service',
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'me-contact-service'
        }
      }
    },
    created () {
      this.$emit('transfer', this.transferObj)
      if (!this.transferObj.navBarHide) {
        this.name = `${this.name} azm-fixed_46px`
      }
      this.$store.commit('setNavigationBarTitle', {title: '联系客服'})
    },
    methods: {}
  }
</script>

<style lang='less'>
  .me-contact-service {
  }
</style>

<style scoped lang='less'>
  .me-contact-service {
    background-color: #fff;
    .footer {
      text-align: center;
      p {
        margin-top: 58.5px;
        font-size: 13px;
        color: #96a0b2;
      }
      img {
        margin-top: 28px;
        width: 120px;
        height: auto;
      }
    }
  }
</style>
