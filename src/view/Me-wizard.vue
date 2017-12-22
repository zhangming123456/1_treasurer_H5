<template>
  <div class="Me_wizard_page">
    <flexbox>
      <flexbox-item :span="1/4" class="azm-left">
        <flow orientation="vertical" class="azm-flew">
          <flow-state is-done state="1" title="展示员工个人二维码"></flow-state>
          <flow-line is-done line-span="380px" class="azm-flew-line"></flow-line>
          <flow-state is-done state="2" title="扫扫描员工二维码"></flow-state>
          <flow-line is-done line-span="30px" class="azm-flew-line"></flow-line>
          <flow-state is-done state="3" title="完善员工资料并保存"></flow-state>
        </flow>
      </flexbox-item>
      <flexbox-item class="azm-img-box" :span="3/4" style="margin-top: -55px;">
        <img src="../assets/mePage.jpg" alt="" class="azm-img">
      </flexbox-item>
    </flexbox>
    <footer>
      <x-button type="primary" class="azm-font-cell" :show-loading="isSubmit" style="border-radius:99px;">立即扫描
      </x-button>
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
      this.$store.commit('setNavigationBarTitle', {title: '添加员工向导'})
    },
    methods: {
      openImg (e, index) {
        this.$refs.previewer.show(index)
        e.cancelBubble = true
      },
      routerLink (path, params) {
        this.$router.push({path, params})
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
  .Me_wizard_page {
    box-sizing: border-box;
    .azm-img {
      width: 170px;
    }
    footer {
      .azm-font-cell {
        font-size: 15px;
        font-weight: 400;
      }
      box-sizing: border-box;
      padding: 10px 80px;
    }
  }
</style>
