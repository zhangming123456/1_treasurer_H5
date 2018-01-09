<template>
  <div :class="name">
    <header>
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <van-row class="top">
              <van-col span="5">
                <img :src="'./static/libs/images/appIcon/'+appInfo.icon+'.png'" alt="">
              </van-col>
              <van-col span="14">{{appInfo.modularName}}</van-col>
              <van-col span="5">
                <van-button size="small" class="btn-Using" v-if="appInfo.status == 0">使用中</van-button>
                <van-button size="small" class="btn-default" v-else-if="appInfo.status == 1">未开通</van-button>
              </van-col>
            </van-row>
            <van-row class="footer" v-if="appInfo.type == 1">
              <van-col span="12">
                <p>{{appInfo.availableCount}}</p>
                <p>剩余短信量</p>
              </van-col>
              <van-col span="12">
                <p>{{appInfo.usedCount}}</p>
                <p>短信发送量</p>
              </van-col>
            </van-row>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group v-if="appInfo.type == 1">
        <van-cell is-link title="使用记录" icon="pending-orders" to="/me-expenses-record"></van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <p class="azm-title">产品简介</p>
            <p class="azm-section">{{appInfo.intro}}</p>
          </template>
        </van-cell>
      </van-cell-group>
    </header>
    <footer>
      <van-button bottom-action class="azm-btn-indigo" v-if="appInfo.status == 0" @click.native="benewNowBtn">立即续费
      </van-button>
      <van-button bottom-action class="azm-btn-indigo" v-else-if="appInfo.status == 1" @click.native="benewNowBtn">
        立即开通
      </van-button>
    </footer>
  </div>
</template>

<script>
  import VanCellGroup from 'vant/packages/cell-group/index'
  import VanButton from 'vant/packages/button/index'
  import VanCell from 'vant/packages/cell/index'
  import VanTag from 'vant/packages/tag/index'
  import VanRow from 'vant/packages/row/index'
  import VanCol from 'vant/packages/col/index'

  export default {
    components: {
      VanCol,
      VanRow,
      VanTag,
      VanCell,
      VanButton,
      VanCellGroup
    },
    data () {
      return {
        name: 'me-applications-info',
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'me-applications-info'
        },
        appInfo: {}
      }
    },
    created () {
      this.$emit('transfer', this.transferObj)
      let query = this.$route.query
      if (this.$azm.util.isEmptyValue(query)) {
        this.appInfo = query
        this.$store.commit('setNavigationBarTitle', {title: query.modularName})
      }
    },
    methods: {
      benewNowBtn () {

      }
    }
  }
</script>

<style lang='less'>
  .me-applications-info {
  }
</style>

<style scoped lang='less'>
  .me-applications-info {
    .btn-Using {
      color: #88deec;
      border: 1px solid #88deec;
    }
    .btn-default {
      color: #979fb2;
      border: 1px solid #979fb2;
    }
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
    }
    footer {
      position: fixed;
      bottom: 10px;
      left: 10px;
      right: 10px;
      .azm-btn-indigo {
        height: 35px;
        line-height: 35px;
        font-size: 14px;
        border-radius: 5px;
        background-color: #34C9E1;
        border: 1px solid #34C9E1;
        color: #fff;
      }
    }
  }
</style>
