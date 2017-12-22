<template>
  <div :class="name">
    <header>
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <van-row class="top">
              <van-col span="5">
                <img src="../assets/grid_icon.png" alt="">
              </van-col>
              <van-col span="14">短信包</van-col>
              <van-col span="5">
                <van-button size="small">未开通</van-button>
              </van-col>
            </van-row>
            <van-row class="footer">
              <van-col span="12">
                <p>6000</p>
                <p>剩余短信量</p>
              </van-col>
              <van-col span="12">
                <p>5000</p>
                <p>短信发送量</p>
              </van-col>
            </van-row>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell is-link title="使用记录" icon="pending-orders" to="/me-expenses-record"></van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <p class="azm-title">产品简介</p>
            <p class="azm-section">可以通过短信假发快了几分安静就警方卡黑科技和空间规划v肯定很好的会计法规和科技</p>
            <van-button size="large" class="azm-btn-indigo">立即续费</van-button>
          </template>
        </van-cell>
      </van-cell-group>
    </header>
  </div>
</template>

<script>
  import { Cell, CellGroup, Tag, Row, Col, Button } from 'vant/lib/index'

  export default {
    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Tag.name]: Tag,
      [Row.name]: Row,
      [Col.name]: Col,
      [Button.name]: Button
    },
    data () {
      return {
        name: 'me-applications-info',
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'me-applications-info'
        }
      }
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '加载中...'})
    },
    methods: {}
  }
</script>

<style lang='less'>
  .me-applications-info {
  }
</style>

<style scoped lang='less'>
  .me-applications-info {
    header {
      .van-cell-group {
        margin-top: 8px;
        &:nth-child(1) {
          margin-top: 0;
        }
      }
      .van-cell {
        padding-top: 16px;
        padding-bottom: 16px;
        font-size: 15px;
      }
      .top .van-col {
        height: 54px;
        line-height: 54px;
        img {
          height: 54px;
          width: 54px;
          border-radius: 5px;
        }
      }
      .footer {
        margin-top: 28px;
        .van-col {
          text-align: center;
          &:nth-child(1) {
            border-right: 1px solid #f3f4f5;
          }
          p:nth-child(1) {
            font-weight: bold;
            font-size: 24px;
          }
          p:nth-child(2) {
            font-size: 12px;
            color: #979fb2;
          }
        }
      }
      .azm-title {
        font-size: 13px;
      }
      .azm-section {
        margin-top: 17px;
        color: #9ea5b7;
        font-size: 12px;
        text-indent: 24px;
      }
      .azm-btn-indigo {
        margin-top: 45px;
        background-color: #34C9E1;
        border: 1px solid #34C9E1;
        color: #fff;
      }
    }
  }
</style>
