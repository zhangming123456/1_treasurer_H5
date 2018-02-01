<template>
  <div :class='name'>
    <section>
      <p class="top">
        <i class="iconfont icon-dui"></i>
        <span>信息填写成功</span>
      </p>
      <p class="center">只要两步，就可以开店当老板了</p>
      <ul>
        <li>
          <p>1、完善商品信息</p>
          <p>
            <span>登录商户中心完善商品信息</span>
            <router-link class="a" to="http://vip.zhenler.com">vip.zhenler.com</router-link>
          </p>
        </li>
        <li>
          <p>2、买一台收银电脑或平板，马上收银</p>
          <p>
            <span>您可以自己购买安卓平板或安卓收银电脑具体配置可以来电咨询或联系当地合作服务商</span>
          </p>
        </li>
      </ul>
      <div class="text-center footer">
        <x-button type="primary" mini plain class="azm-btn azm-btn-submit" action-type="submit"
                  @click.native="routerReplace('/')">立即体验
        </x-button>
      </div>
    </section>
    <footer>
      <ul>
        <li>
          <van-row class="li">
            <van-col span="12" class="footer-item">
              <img src="../../../assets/1_shop.jpg" alt="">
            </van-col>
            <van-col span="12" class="footer-item">
              <p>小米生态链极速收银电脑</p>
              <p class="center">15.6英寸电容屏，八核高通CPU 质量保证</p>
              <p class="footer">
                <span>￥2499.00</span>
                <x-button type="primary" mini plain class="azm-btn azm-btn-submit" action-type="submit"
                          link="http://d138583.s60968.m.fy.xyunqi.com/product-26960.html#hashxiangqing">立即购买
                </x-button>
              </p>
            </van-col>
          </van-row>
        </li>
        <li>
          <van-row class="li">
            <van-col span="12" class="footer-item">
              <img src="../../../assets/2_shop.jpg" alt="">
            </van-col>
            <van-col span="12" class="footer-item">
              <p>10寸安卓平板电脑</p>
              <p class="center">10.1英寸电容屏，八核处理器 16G存储空间</p>
              <p class="footer">
                <span>￥1080.00</span>
                <x-button type="primary" mini plain class="azm-btn azm-btn-submit" action-type="submit"
                          link="http://d138583.s60968.m.fy.xyunqi.com/product-84069.html">立即购买
                </x-button>
              </p>
            </van-col>
          </van-row>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  import { Row, Col } from 'vant/lib/index'
  import { mapState } from 'vuex'

  export default {
    components: {
      XButton,
      [Row.name]: Row,
      [Col.name]: Col
    },
    data () {
      return {
        name: 'create-shop-success',
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'create-shop-success',
          navBarHide: false
        },
        iframe: '',
        hash: ''
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
      this.$store.commit('setNavigationBarTitle', {title: '提交成功'})
      this.hash = this.$azm.config.Hash
    },
    methods: {
      routerLink (path, params) {
        this.$router.push({path, query: params})
      },
      routerReplace (path, params) {
        this.$router.replace({path, query: params})
      },
    }
  }
</script>

<style scoped>
  .create-shop-success {
  }
</style>
<style scoped lang='less'>
  .create-shop-success {
    section {
      box-sizing: border-box;
      padding: 25px 45px 64px;
      .top {
        text-align: center;
        line-height: 17px;
        margin-bottom: 14px;
        .iconfont, span {
          font-size: 17px;
          color: #34C9E1;
        }
      }
      .center {
        margin-bottom: 69px;
        text-align: center;
        font-size: 17px;
      }
      ul {
        li {
          margin-bottom: 25px;
          p {
            &:nth-child(1) {
              font-size: 14px;
            }
            &:nth-child(2) {
              font-size: 13px;
              color: #96a0b2;
              .a {
                display: inline;
                font-size: 13px;
                color: #96a0b2;
              }
            }
          }
        }
      }
      .footer {
        .azm-btn {
          color: #34C9E1;
          border-color: #34C9E1;
          line-height: 30px;
          font-size: 15px;
          border-radius: 30px;
        }
      }
    }
    footer {
      border-top: 1px dashed #96a0b2;
      ul li {
        box-sizing: border-box;
        padding: 22px 25px;
        .li {
          background-color: #f8f8f8;
        }
        img {
          width: 150px;
          height: auto;
        }
        .footer-item {
          box-sizing: border-box;
          padding-left: 10px;
          p {
            &:nth-child(1) {
              font-size: 13px;
              color: #96a0b2;
              margin-bottom: 10px;
            }
            &:nth-child(2) {
              font-size: 11px;
              color: #96a0b2;
              margin-bottom: 20px;
            }
            &:nth-child(3) {
              font-size: 13px;
              position: relative;
              font-weight: bold;
              .azm-btn {
                display: inline-block;
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                line-height: 20px;
                font-size: 11px;
                padding-left: 8px;
                padding-right: 8px;
                color: #e30736;
                border-color: #e30736;
              }
            }
          }
        }
      }
    }
  }
</style>
