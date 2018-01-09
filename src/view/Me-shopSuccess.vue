<template>
  <div class="Me_fillinfosuccess_page">
    <header>
      <i class="iconfont icon-dui azm-icon"></i>
      <h2 v-if="type == 2">您已经是一号掌柜有限公司的员工，继续开店将失去员工身份。是否继续？</h2>
      <h2 v-else>恭喜您已开店成功</h2>
    </header>
    <footer>
      <van-row v-if="type == 2">
        <van-col span="12" class="azm-btn">
          <x-button type="primary" class="azm-font-cell" link="/me-shop-info">继续开店</x-button>
        </van-col>
        <van-col span="12" class="azm-btn">
          <x-button class="azm-font-cell" @click.native="go(-1)">返回</x-button>
        </van-col>
      </van-row>
      <div v-else>
        <x-button type="primary" class="azm-font-cell" :show-loading="btnManageStaff_isLoading"
                  @click.native="btnManageStaff">管理员工
        </x-button>
      </div>
    </footer>
  </div>
</template>

<script>
  import {
    Flow, FlowState, FlowLine, Flexbox, FlexboxItem, XButton
  } from 'vux'
  import VanRow from 'vant/packages/row/index'
  import VanCol from 'vant/packages/col/index'
  import { mapState } from 'vuex'

  export default {
    directives: {},
    components: {
      VanCol,
      VanRow,
      Flow,
      FlowState,
      FlowLine,
      Flexbox,
      FlexboxItem,
      XButton
    },
    data () {
      return {
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'me-wizard'
        },
        isSubmit: false,
        type: 0,
        btnManageStaff_isLoading: false
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
      this.$store.commit('setNavigationBarTitle', {title: '开店成功'})
      if (this.$route.query) {
        this.type = this.$route.query.type
      }
    },
    methods: {
      go (n) {
        if (this.$azm.util.isNumber(n)) {
          this.$router.back(n)
        }
      },
      openImg (e, index) {
        this.$refs.previewer.show(index)
        e.cancelBubble = true
      },
      routerLink (path, params) {
        this.$router.push({path, query: params})
      },
      btnManageStaff () {
        let that = this
        that.routerLink('/me-staff-admin')
      },
      onShow () {},
      onHide () {},
      onChange () {}
    }
  }
</script>
<style>
  .weui-wepay-flow__li_done .weui-wepay-flow__state, .weui-wepay-flow__process {
    background-color: #00c1de !important;
  }
</style>
<style scoped lang='less'>
  .Me_fillinfosuccess_page {
    box-sizing: border-box;
    header {
      padding: 50px 20px;
      text-align: center;
      h2 {
        font-size: 17px;
        font-weight: 400;
      }
      .azm-icon {
        padding-top: 25px;
        color: #34C9E1;
        font-size: 80px;
        height: 120px;
      }
    }
    footer {
      .azm-font-cell {
        font-size: 15px;
        font-weight: 400;
        padding: 2.5px 0;
      }
      .azm-btn {
        padding: 0 20px;
        box-sizing: border-box
      }
      box-sizing: border-box;
      padding: 10px 20px;
    }
  }
</style>
