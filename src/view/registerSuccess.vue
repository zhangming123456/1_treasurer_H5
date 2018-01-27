<template>
  <div :class='name'>
    <header>
      <i class="iconfont icon-dui azm-icon"></i>
      <h2>注册成功</h2>
      <p>终于等到你，你是我们的第53999位用户</p>
    </header>
    <section>
      <p class="title">我是员工</p>
      <x-button type="primary" class="azm-btn azm-btn-submit" action-type="submit" link="/bindShop">
        <i class="iconfont icon-bianji"></i>
        <span>去绑定店铺</span>
      </x-button>
      <p class="title">我是老板</p>
      <x-button type="primary" plain class="azm-btn azm-btn-submit" action-type="submit"
                @click.native="routerReplace('/me/shopInfo')">
        <i class="iconfont icon-msnui-dianpu"></i>
        <span>开店当老板</span>
      </x-button>
    </section>
    <footer class="">
      <x-button type="primary" plain class="azm-btn azm-btn-return" action-type="submit" link="BACK">
        返回登录
      </x-button>
    </footer>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  import { mapState } from 'vuex'

  export default {
    components: {
      XButton
    },
    data () {
      return {
        name: 'register-success',
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'register-success',
          navBarHide: true
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
      this.$store.commit('setNavigationBarTitle', {title: '注册成功'})
      this.hash = this.$azm.config.Hash
    },
    methods: {
      routerLink (path, params) {
        this.$router.push({path, query: params})
      },
      routerReplace (path, params) {
        this.$router.replace({path, query: params})
      }
    }
  }
</script>

<style scoped>
  .register-success {
  }
</style>
<style scoped lang='less'>
  .register-success {
    header {
      padding-top: 40px;
      text-align: center;
      .azm-icon {
        font-size: 40px;
        color: #34c9e1;
      }
      h2 {
        font-weight: 400;
        color: #789292;
        font-size: 17px;
        margin-bottom: 25px;
      }
      p {
        color: #789292;
        font-size: 13px;
      }
    }
    section {
      box-sizing: border-box;
      padding: 68px 25px 0;
      p {
        margin-bottom: 10px;
        font-size: 13px;
        color: #789292;
      }
      .azm-btn {
        margin-bottom: 17px;
        font-size: 15px;
        line-height: 45px;
      }
      .weui-btn_plain-primary {
        color: #34C9E1;
        border-color: #34C9E1;
      }
    }
    footer {
      position: fixed;
      bottom: 30px;
      right: 35px;
      .azm-btn {
        color: #789292;
        border-color: #789292;
        font-size: 15px;
        line-height: 40px;
      }
    }
  }
</style>
