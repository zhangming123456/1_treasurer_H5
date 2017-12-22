<template>
  <div class="me_staff_info_page">
    <h2>员工资料填写</h2>
    <group class="me_shop_group">
      <x-input title="姓名" class="azm-font-cell" label-width="1.07rem" v-model="nikeName" is-type="china-name"
               placeholder="请输入员工姓名"></x-input>
      <x-input title="工号" type="number" class="azm-font-cell" label-width="1.07rem" v-model="jobNumber"
               placeholder="请输入工号"></x-input>
      <x-input title="手机号码" class="azm-font-cell" label-width="1.07rem" name="mobile" mask="999 9999 9999"
               placeholder="请输入手机号码"
               v-model="Phone" keyboard="number"
               :max="13"
               is-type="china-mobile"></x-input>
    </group>
    <group title="店铺信息" class="me_shop_group">
      <popup-picker title="所属店铺" class="azm-font-cell" label-width="1.07rem" :data="orderList" v-model="orderValue"
                    @on-show="onShow"
                    @on-hide="onHide"
                    @on-change="onChange" placeholder="请选择店铺"></popup-picker>
      <popup-picker title="角色" class="azm-font-cell" label-width="1.07rem" :data="CharacterList" v-model="Character"
                    @on-show="onShow"
                    @on-hide="onHide"
                    @on-change="onChange" placeholder="请选择角色"></popup-picker>
      <cell-box class="azm-cellBox" label-width="1.07rem">
        <flexbox>
          <flexbox-item :span="1/5.5">
            <p class="azm-font-cell">抹零范围</p>
          </flexbox-item>
          <flexbox-item>
            <x-input name="mobile" title="最小" placeholder="0" v-model="minWipeZero"
                     keyboard="number" text-align="right"></x-input>
          </flexbox-item>
          <flexbox-item>
            <x-input name="mobile" title="最大" placeholder="9999" v-model="maxWipeZero"
                     keyboard="number" text-align="right"></x-input>
          </flexbox-item>
        </flexbox>
      </cell-box>
      <cell-box class="azm-cellBox" label-width="1.07rem">
        <flexbox>
          <flexbox-item :span="1/5.5">
            <p class="azm-font-cell">折扣范围</p>
          </flexbox-item>
          <flexbox-item>
            <x-input name="mobile" title="最小" type="number" placeholder="0" v-model="minPercentage"
                     keyboard="number" fillable text-align="right" :max="3">
              <span slot="right">%</span>
            </x-input>
          </flexbox-item>
          <flexbox-item>
            <x-input name="mobile" title="最大" type="number" placeholder="100" v-model="maxPercentage"
                     keyboard="number" text-align="right" :max="3">
              <span slot="right">%</span>
            </x-input>
          </flexbox-item>
        </flexbox>
      </cell-box>
      <x-switch title="是否退款" class="azm-font-cell" label-width="1.07rem" :value-map="[0, 1]"
                v-model="isRefund"></x-switch>
      <x-switch title="是否反结账" class="azm-font-cell" label-width="1.07rem" :value-map="[0, 1]"
                v-model="isAntiCheckout"></x-switch>
    </group>
    <footer>
      <x-button type="primary" class="azm-font-cell" :show-loading="isSubmit" style="border-radius:99px;">保存</x-button>
    </footer>
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
        this.$router.push({path, params})
      },
      onShow () {},
      onHide () {},
      onChange () {}
    }
  }
</script>
<style scoped lang='less'>
  .me_staff_info_page {
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
