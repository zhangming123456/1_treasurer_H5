<template>
  <div class="Me_fillinfosuccess_page">
    <header>
      <i class="iconfont icon-dui azm-icon"></i>
      <h2>添加员工成功</h2>
    </header>
    <footer>
      <flexbox>
        <flexbox-item>
          <x-button type="default" class="azm-font-cell" :show-loading="isSubmit" link="/me/wizard">继续添加</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary" class="azm-font-cell" :show-loading="isSubmit" link="/me/staffAdmin">返回员工列表
          </x-button>
        </flexbox-item>
      </flexbox>
    </footer>
  </div>
</template>

<script>
  import {
    Flow, FlowState, FlowLine, Flexbox, FlexboxItem, XButton
  } from 'vux'

  export default {
    directives: {},
    components: {
      Flow, FlowState, FlowLine, Flexbox, FlexboxItem, XButton
    },
    data () {
      return {
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'me-wizard'
        },
        isSubmit: false
      }
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '添加员工成功'})
    },
    methods: {
      openImg (e, index) {
        this.$refs.previewer.show(index)
        e.cancelBubble = true
      },
      routerLink (path, params) {
        this.$router.push({path, query: params})
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
      height: 150px;
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
      box-sizing: border-box;
      padding: 10px 20px;
    }
  }
</style>
