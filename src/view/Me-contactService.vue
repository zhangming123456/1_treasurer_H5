<template>
  <div :class="name" class="azm-fixed">
    <van-cell-group>
      <van-cell title="客服微信号" value="18507065087">
        <template slot="icon">
          <i class="iconfont icon-weixin" style="color: #49cfae"></i>
        </template>
      </van-cell>
      <van-cell title="客服QQ号" value="18507065087">
        <template slot="icon">
          <i class="iconfont icon-qq" style="color: #f6a966"></i>
        </template>
      </van-cell>
      <van-cell icon="phone" title="电话" value="18507065087"></van-cell>
    </van-cell-group>
    <div class="footer">
      <p>关注官方公众号：yihaozhanggui-，了解最新资讯</p>
      <img src="../../assets/qr.png" alt="">
    </div>
  </div>
</template>

<script>
  import VanCellGroup from 'vant/packages/cell-group/index'
  import VanCell from 'vant/packages/cell/index'

  export default {
    components: {
      VanCell,
      VanCellGroup
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
