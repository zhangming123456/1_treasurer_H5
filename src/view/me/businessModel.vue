<template>
  <div :class='name'>
    <header>
      * 请根据业态慎重选择，一旦确定，只能联系服务商进行更改
    </header>
    <section>
      <checker v-model="select" default-item-class="demo1-item" selected-item-class="demo1-item-selected"
               :radio-required="true">
        <ul>
          <li v-for="items in findBusinessModelData" :key="items.code">
            <checker-item :value="items.code">
              <van-row class="top">
                <van-col span="3" class="left text-left">
                  <img :src="'http://f.zhenler.com'+ items.icon"/>
                </van-col>
                <van-col span="15" class="center text-left">
                  <span>{{items.text}}</span>
                </van-col>
                <van-col span="6" class="right text-right">
                  <div class="btn" :class="{'btn-active': items.code === select}">选择</div>
                </van-col>
              </van-row>
              <p v-for="item in strSplit_filter(items.description,'#')">
                {{item}}
              </p>
              <div class="footer">
                <van-row gutter="20">
                  <van-col span="6" class="footer-item" v-for="(key,i) in items.sysDicList" :key="key.id">
                    <i class="round">{{i+1}}</i>
                    <p class="text-center">{{key.value}}</p>
                  </van-col>
                </van-row>
              </div>
            </checker-item>
          </li>
        </ul>
      </checker>
    </section>
    <div class="footer_60"></div>
    <footer>
      <x-button type="primary" class="azm-btn azm-btn-submit" action-type="submit" @click.native="setBusinessModel">下一步
      </x-button>
    </footer>
  </div>
</template>

<script>
  import { XButton, Checker, CheckerItem } from 'vux'
  import { Row, Col } from 'vant/lib/index'
  import { mapState } from 'vuex'

  export default {
    components: {
      XButton, Checker, CheckerItem,
      [Row.name]: Row,
      [Col.name]: Col
    },
    data () {
      return {
        name: 'business-model',
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'business-model',
          navBarHide: false
        },
        iframe: '',
        hash: '',
        select: ''
      }
    },
    computed: {
      ...mapState({
        shiroUserId: state => state.ApiService.shiroUserId,
        resId: state => state.ApiService.resId,
        findBusinessModelData: state => state.ApiService.findBusinessModelData
      })
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '选择商业模式'})
      this.hash = this.$azm.config.Hash
      this.$store.dispatch('ApiService.findBusinessModel')
      if (!this.resId)
        this.$store.dispatch('ApiService.getUserByShiroUserId', {
          id: this.shiroUserId
        })
    },
    methods: {
      routerLink (path, params) {
        this.$router.push({path, query: params})
      },
      routerReplace (path, params) {
        this.$router.replace({path, query: params})
      },
      setBusinessModel () {
        let that = this,
          code = this.select,
          resId = this.resId
        if (code > 0) {
          this.$store.dispatch('ApiService.setBusinessModel', {modelType: code, resId}).then(
            (rsp) => {
              if (rsp.code === 2000) {
                that.routerReplace('/me/createShop-success')
              } else {
                !rsp.status && that.$toast('商业模式选择出错')
              }
            }
          )
        } else {
          that.$toast('请设置商业模式')
        }
      },
      strSplit_filter (v, str) {
        return v.split(str)
      }
    }
  }
</script>

<style scoped>
  .business-model {
  }
</style>
<style scoped lang='less'>
  .business-model {
    header {
      font-size: 10px;
      color: #fb5e5f;
      margin-top: 12.5px;
      margin-bottom: 15px;
      padding: 0 25px;
      box-sizing: border-box;
    }
    section {
      ul {
        li {
          background-color: #fff;
          margin: 0 10px 25px 10px;
          border-radius: 10px;
          box-shadow: 0 0 5px 5px #e9e9e9;
          padding: 15px;
          box-sizing: border-box;
          .top {
            line-height: 30px;
            height: 30px;
            margin-bottom: 15px;
            img {
              width: 30px;
              height: 30px;
            }
            .center {
              font-size: 14px;
              color: #333;
            }
            .right {
              .btn {
                box-sizing: border-box;
                line-height: 28px;
                display: inline-block;
                border: 1px solid #34c9e1;
                border-radius: 5px;
                padding: 0 22.5px;
                color: #34c9e1;
                font-size: 14px;
                &.btn-active {
                  background-color: #34c9e1;
                  color: #fff;
                }
              }
            }
          }
          p {
            font-size: 13px;
            color: #96a0b2;
            margin-bottom: 13px;
          }
          .footer {
            margin-top: 20px;
            border-top: 1px dashed #34c9e1;
            position: relative;
            .footer-item {
              position: relative;
              p {
                margin: 15px 0 0 0;
              }
              i.round {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate(-50%, -50%);
                border: 1px solid #34c9e1;
                width: 15px;
                height: 15px;
                text-align: center;
                line-height: 15px;
                background-color: #fff;
                border-radius: 100%;
                color: #34c9e1;
                font-size: 10px;
              }
            }
          }
        }
      }
    }
    .footer_60 {
      height: 60px;
    }
    footer {
      position: fixed;
      box-sizing: border-box;
      padding: 30px;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #f8f8f8;
      .azm-btn {
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        line-height: 45px;
        width: 85%;
        font-size: 15px;
      }
    }
  }
</style>
