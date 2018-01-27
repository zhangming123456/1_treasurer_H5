<template>
  <div :class='name'>
    <header>
      <qrcode :value="qrcodeImg1" type="img" class="qrcode" :size="130"></qrcode>
      <p>1号掌柜的二维码</p>
    </header>
    <section>
      <ul>
        <li>
          <van-row class="">
            <van-col span="3" class="left">
              <span>1</span>
            </van-col>
            <van-col span="21" class="right">
              <p>用另一部手机上，在“1号掌柜智慧餐饮”公众号--商户中心，用[主账号]登录</p>
              <p>未关注公众号？
                <router-link to="/followUs">点此关注</router-link>
              </p>
            </van-col>
          </van-row>
        </li>
        <li>
          <van-row class="">
            <van-col span="3" class="left">
              <span>2</span>
            </van-col>
            <van-col span="21" class="right">
              <p>在我--店铺管理--员工管理--添加员工，扫描此二维码</p>
            </van-col>
          </van-row>
        </li>
        <li>
          <van-row class="">
            <van-col span="3" class="left">
              <span>3</span>
            </van-col>
            <van-col span="21" class="right">
              <p>完善员工信息和权限设置，添加成功</p>
            </van-col>
          </van-row>
        </li>
      </ul>
    </section>
    <footer>
      <x-button type="primary" class="azm-btn azm-btn-submit" action-type="submit" link="BACK">返回</x-button>
    </footer>
  </div>
</template>

<script>
  import { XButton, Qrcode } from 'vux'
  import { Row, Col } from 'vant/lib/index'
  import { mapState } from 'vuex'

  export default {
    components: {
      XButton,
      Qrcode,
      [Row.name]: Row,
      [Col.name]: Col
    },
    data () {
      return {
        name: 'bind-shop',
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'bind-shop',
          navBarHide: true
        },
        iframe: '',
        hash: '',
        qrcodeImg1: `{
        'shiroUserId': '000000005c2536d5015c2e169196061e',
        'resId': '000000005c2536d5015c2e169199061f',
        'type': '1'
        }`
      }
    },
    computed: {
      ...mapState({
        shiroUserId: state => state.ApiService.shiroUserId,
        resId: state => state.ApiService.resId,
        qrcodeImg: state => state.ApiService.qrcodeImg,
      })
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '绑定店铺'})
      this.hash = this.$azm.config.Hash
    },
    methods: {}
  }
</script>

<style scoped>
  .bind-shop {
  }
</style>
<style scoped lang='less'>
  .bind-shop {
    header {
      position: relative;
      text-align: center;
      .qrcode {
        text-align: center;
        margin-top: 43px;
      }
      p {
        margin-top: 15px;
        color: #789292;
        font-size: 13px;
      }
    }
    section {
      padding: 45px 60px 10px 40px;
      li {
        margin-bottom: 40px;
        .left {
          span {
            display: inline-block;
            border: 1px solid #789292;
            text-align: center;
            width: 22px;
            height: 22px;
            line-height: 22px;
            font-size: 15px;
            border-radius: 100%;
            color: #789292;
          }
        }
        .right {
          p {
            color: #789292;
            font-size: 13px;
            margin-bottom: 10px;
            a {
              color: #34C9E1;
              font-size: 13px;
            }
          }
        }
      }
    }
    footer {
      position: fixed;
      bottom: 30px;
      left: 25px;
      right: 25px;
      button {
        line-height: 45px;
        font-size: 15px;
      }
    }
  }
</style>
