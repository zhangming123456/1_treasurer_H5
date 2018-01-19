<template>
  <div class="me_shop_page">
    <group>
      <cell is-link link="/me-shop-info" title="基本资料填写" class="azm-cell"></cell>
      <cell is-link link="/me-staff-info" title="员工资料填写" class="azm-cell"></cell>
      <cell is-link link="/me-staff-admin" title="员工管理" class="azm-cell"></cell>
      <cell is-link link="/me/wizard" title="添加员工向导" class="azm-cell"></cell>
      <cell is-link link="/me-fill-info-success" title="添加员工成功提示" class="azm-cell"></cell>
      <cell is-link link="/me-shop-success" title="开店成功提示" class="azm-cell"></cell>
    </group>
  </div>
</template>

<script>
  import {
    Group,
    Cell,
    CellBox,
    XInput,
    XNumber,
    XButton,
    XSwitch,
    PopupPicker,
    Flexbox,
    FlexboxItem,
    numberComma,
    numberPad,
    numberRandom
  } from 'vux'

  export default {
    directives: {
      numberComma,
      numberPad,
      numberRandom
    },
    components: {
      XSwitch,
      XNumber,
      XButton,
      Group,
      Cell,
      CellBox,
      XInput,
      PopupPicker,
      Flexbox,
      FlexboxItem
    },
    data () {
      return {
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'me-shop'
        },
        nikeName: '',
        orderList: [['sssjj']],
        orderValue: [],
        jobNumber: null,
        Phone: '',
        CharacterList: [['sssjj']],
        Character: [],
        minWipeZero: '',
        maxWipeZero: '',
        minPercentage: '',
        maxPercentage: '',
        isRefund: 0,
        isAntiCheckout: 0,
        isSubmit: false
      }
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '商家开店'})
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
<style scoped lang='less'>

  .me_shop_page {
    box-sizing: border-box;
    h2 {
      text-align: center;
      padding: 10px 0 0;
      font-size: 17px;
      font-weight: 400;
      color: #000;
    }
    .me_shop_group {
      margin-top: -10px;
      &:nth-of-type(2) {
        margin-top: 10px;
      }
      div {
        font-size: 13px;
        color: #000;
      }
      .azm-cellBox {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
    footer {
      .azm-font-cell {
        font-size: 15px;
        font-weight: 400;
      }
      box-sizing: border-box;
      padding: 50px 80px;
    }
  }
</style>
