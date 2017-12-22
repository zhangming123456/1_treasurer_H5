<template>
  <div class="me_shop_info_page">
    <h2>填写基本资料</h2>
    <group class="me_shop_group">
      <x-input title="门店名称" class="azm-font-cell" label-width=".88rem" name="trueName" is-type="china-name"
               v-model="trueName"
               placeholder="请输入门店名称"></x-input>
      <!--<x-input title="分店名称" type="number" class="azm-font-cell" label-width=".88rem" v-model="jobNumber"-->
      <!--placeholder="请输入分店名称"></x-input>-->
      <x-input title="门店电话" type="tel" class="azm-font-cell" label-width=".88rem" name="mobile" mask="9999-99999"
               placeholder="请输入门店电话"
               v-model="mobile" keyboard="number"
               :max="11"
               :is-type="chinaMobile"></x-input>
    </group>
    <group title="门店设置" class="me_shop_group">
      <popup-picker class="azm-font-cell" title="门店类型" label-width=".88rem"
                    :data="businessTypeList"
                    :columns="1"
                    v-model="businessType"
                    :display-format="businessTypeFormat"
                    @on-change="onChange"
                    placeholder="请选择门店类型"></popup-picker>
      <popup-picker title="业态" class="azm-font-cell" label-width=".88rem" :data="orderList" v-model="orderValue"
                    @on-change="onChange" placeholder="请选择业态"></popup-picker>
      <!--<x-address title="地址选择" class="azm-font-cell" label-width="1.07rem" v-model="addressValue"-->
      <!--:list="addressData" placeholder="请选择门店地址" @on-shadow-change="addressShadowChange"-->
      <!--value-text-align="right"></x-address>-->
      <cell is-link title="地址选择" :value="addressValue" @click.native="openPopup"></cell>
      <x-textarea title="详细信息" class="azm-font-cell" placeholder="请填写详细信息" :show-counter="false" v-model="addRess"
                  :rows="3"></x-textarea>
    </group>
    <footer>
      <x-button type="primary" class="azm-font-cell" action-type="submit" :show-loading="isSubmit"
                style="border-radius:99px;">保存
      </x-button>
    </footer>

    <van-popup v-model="popupShow" position="bottom" :overlay="false">
      <van-area :areaList="addressData" :columnsNum="3" value="110101"/>
    </van-popup>
    <!--<van-popup v-model="popupShow" position="bottom" :overlay="false">ljkafj</van-popup>-->
    <!--<van-area :areaList="addressData" :columnsNum="3" value="110101"/>-->
  </div>
</template>

<script>
  import {
    Group,
    Cell,
    CellBox,
    XInput,
    XAddress,
    XTextarea,
    XNumber,
    XButton,
    PopupPicker,
    numberComma,
    numberPad,
    numberRandom
  } from 'vux'
  import { Popup } from 'vant/lib/index'
  import { mapState } from 'vuex'
  import VanArea from 'vant/packages/area/index'

  export default {
    directives: {
      numberComma,
      numberPad,
      numberRandom
    },
    components: {
      VanArea,
      [Popup.name]: Popup,
      XNumber,
      XTextarea,
      XButton,
      XAddress,
      Group,
      Cell,
      CellBox,
      XInput,
      PopupPicker
    },
    data () {
      return {
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'me-shop'
        },
        businessTypeList: [
          {
            name: '单店',
            value: 0
          },
          {
            name: '连锁',
            value: 1
          }
        ],
        businessType: [0],
        orderList: [['堂食', '快餐'], ['小米1', 'iPhone2', '华为3', '情怀4', '三星5', '其他6', '不告诉你7']],
        orderValue: [],
        jobNumber: null,
        CharacterList: [['sssjj']],
        Character: [],
        minWipeZero: '',
        maxWipeZero: '',
        minPercentage: '',
        maxPercentage: '',
        isRefund: 0,
        isAntiCheckout: 0,
        isSubmit: false,
        addressValue: [],
        provinceCity: [],
        trueName: '',
        mobile: '',
        addRess: '',
        areaList: {},
        searchResult: [],
        popupShow: false
      }
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '商家开店'})
      this.$store.dispatch('ApiService.getAllProvince')
    },
    computed: {
      ...mapState({
        addressData: state => state.ApiService.ChinaAddressData
      })
    },
    methods: {
      openImg (e, index) {
        this.$refs.previewer.show(index)
        e.cancelBubble = true
      },
      routerLink (path, params) {
        this.$router.push({path, params})
      },
      businessTypeFormat (value, name) {
        let v = Number(value[0])
        switch (v) {
          case 1:
            return '连锁'
          default:
            return '单店'
        }
      },
      addressShadowChange (v) {
        console.log(v)
        // this.$store.dispatch('ApiService.getRegionByPid', {pid: v[0]})
      },
      onShow () {},
      onHide () {},
      onChange () {},
      chinaMobile (v) {
        console.log(v)
        if (/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(v)) {
          return {valid: true, msg: '正确的手机号码'}
        } else if (/^(0[0-9]{2,3})?([2-9][0-9]{6,7})+([0-9]{1,4})?$/.test(v)) {
          return {valid: true, msg: '正确的电话号码'}
        } else {
          return {valid: false, msg: '错误信息'}
        }
      },
      onSave () {
      },
      onDelete () {
      },
      openPopup () {
        this.popupShow = true
      },
      onChangeDetail (val) {
        if (val) {
          this.searchResult = [{
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }]
        } else {
          this.searchResult = []
        }
      }
    }
  }
</script>
<style scoped lang='less'>
  .me_shop_info_page {
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
