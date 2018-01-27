<template>
  <div class="me_shop_info_page">
    <h2>填写基本资料</h2>
    <group class="me_shop_group">
      <x-input class="azm-font-cell" label-width=".88rem" name="trueName" is-type="china-name"
               v-model="trueName"
               placeholder="请输入门店名称">
        <div slot="label" class="label-width"><span class="color-red">*</span>门店名称</div>
      </x-input>
      <x-input title="门店电话" type="tel" class="azm-font-cell" label-width=".88rem" name="mobile"
               mask="999999999999"
               placeholder="输入电话&手机号码"
               v-model="mobile" keyboard="number"
               :max="12"
               :is-type="chinaMobile">
        <div slot="label" class="label-width"><span class="color-red">*</span>门店电话</div>
      </x-input>
      <!--<x-input title="  " type="tel" class="azm-font-cell" label-width=".88rem" name="mobile" mask="99999999999"-->
      <!--placeholder="或手机"-->
      <!--v-model="mobile" keyboard="number"-->
      <!--:max="11"-->
      <!--is-type="china-mobile"></x-input>-->
    </group>
    <group title="门店设置" class="me_shop_group">
      <popup-picker class="azm-font-cell"
                    :data="businessTypeList"
                    :columns="1"
                    v-model="businessType"
                    :display-format="businessTypeFormat"
                    @on-change="onChange"
                    placeholder="请选择门店类型">
        <div slot="title" class="label-width"><span class="color-red">*</span>门店类型</div>
      </popup-picker>
      <popup-picker class="azm-font-cell" :data="orderList" v-model="orderValue" :display-format="orderFormat"
                    @click.native="openDishList"
                    @on-change="onChange" placeholder="请选择业态">
        <div slot="title" class="label-width"><span class="color-red">*</span>业态</div>
      </popup-picker>
      <cell is-link @click.native="doShowAddress(0)" :value="'ddd'">
        <div slot="icon" class="label-width"><span class="color-red">*</span>门店地址</div>
        <div v-if="addressDataTo">
          <span v-for="(item,index) of addressDataTo" :key="index">{{ item.name }}&nbsp;&nbsp;</span>
        </div>
        <div v-else>
          <span>省 - 市 - 区&县</span>
        </div>
      </cell>
      <!--<x-address title="省份选择" :list="province_list" placeholder="省" @on-shadow-change="addressShadowChange"-->
      <!--style="display:none;" :show.sync="onShowProvince_list"></x-address>-->
      <x-textarea title="    " class="azm-font-cell" placeholder="请填写详细地址" v-model="addRess" name="addRess"
                  autosize
                  :rows="3"></x-textarea>
    </group>
    <footer>
      <x-button type="primary" class="azm-font-cell azm-btn-submit" action-type="submit" :show-loading="isSubmit"
                @click.native="fromSubmit">保存
      </x-button>
    </footer>
    <van-popup v-model="popupShow" position="bottom">
      <van-tabs :active="addressActive" sticky @click="handleTabClick">
        <van-tab v-for="(item, index) of addressValue" :title="item.name" :disabled="!item.status" :key="index">
          <scroller lock-x scrollbar-y class="azm-popupShow-h">
            <group gutter="0">
              <cell class="azm-address-cell" v-for="(v,i) of addressData[item.addressType]" :title="v.name"
                    :is-loading="v.isLoading" :key="i"
                    is-link @click.native="doShowAddress(index+1,v)"></cell>
            </group>
          </scroller>
        </van-tab>
      </van-tabs>
    </van-popup>
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
    numberRandom,
    Tab,
    TabItem,
    Scroller
  } from 'vux'
  import { Popup } from 'vant/lib/index'
  import { mapState } from 'vuex'
  import VanTab from 'vant/packages/tab/index'
  import VanTabs from 'vant/packages/tabs/index'

  export default {
    directives: {
      numberComma,
      numberPad,
      numberRandom
    },
    components: {
      VanTabs,
      VanTab,
      [Popup.name]: Popup,
      XNumber,
      XTextarea,
      XButton,
      XAddress,
      Group,
      Cell,
      CellBox,
      XInput,
      PopupPicker,
      Tab,
      TabItem,
      Scroller
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
        orderList: [],
        jobNumber: null,
        Character: [],
        minWipeZero: '',
        maxWipeZero: '',
        minPercentage: '',
        maxPercentage: '',
        isRefund: 0,
        isAntiCheckout: 0,
        isSubmit: false,
        addressValue: [
          {
            name: '省',
            addressType: 'province_list'
          },
          {
            name: '市',
            addressType: 'city_list'
          },
          {
            name: '区&县',
            addressType: 'county_list'
          }
        ],
        addressDataTo: null,
        addressActive: 0,
        provinceCity: [],
        trueName: '',
        mobile: '',
        phone: '',
        addRess: '',
        areaList: {},
        orderValue: [], // 业态
        searchResult: [],
        popupShow: false,
        onShowProvince_list: false
      }
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '商家开店'})
      this.$store.dispatch('ApiService.getAllProvince')
    },
    computed: {
      ...mapState({
        addressData: state => state.ApiService.ChinaAddressData,
        DicList: state => state.ApiService.DicList,
        shiroUserId: state => state.ApiService.shiroUserId
      })
    },
    methods: {
      openImg (e, index) {
        this.$refs.previewer.show(index)
        e.cancelBubble = true
      },
      routerLink (path, params) {
        this.$router.push({path, query: params})
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
      onChange (v) {
        // console.log(v, '______________')
      },
      orderFormat (value, name) {
        // let that = this
        // console.log(arguments, '++++++++')
        return name
        // return `${that.orderList[0][value[0]].name} - ${that.orderList[1][value[1]].name}`
      },
      openDishList () {
        let that = this,
          p1 = that.$store.dispatch('ApiService.getDicList'),
          p2 = that.$store.dispatch('ApiService.getDicList', {config: {type: 1}})
        this.$http.all([p1, p2]).then(
          () => {
            that.orderList = []
            that.orderList[0] = that.DicList.cater_industry
            that.orderList[1] = that.DicList.cooking_type
            console.log(that.orderList)
          }
        )
      },
      chinaMobile (v) {
        console.log(v)
        // if (/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(v)) {
        //   return {valid: true, msg: '正确的手机号码'}
        // }
        if (this.$azm.util.RegExp.isPhone_Mobile.test(v)) {
          return {valid: true, msg: '正确的电话号码'}
        } else {
          return {valid: false, msg: '电话号码格式不对哦~'}
        }
      },
      onSave () {
      },
      onDelete () {
      },
      doShowAddress (index, item, i) {
        let that = this
        if (index === 0) {
          that.addressActive = index
          that.popupShow = !that.popupShow
          if (that.addressValue[0].status) {
            Object.assign(that.addressValue[0], that.addressData.province_list[that.addressValue[0].index])
          } else {
            Object.assign(that.addressValue[0], that.addressData.province_list[0])
          }
          if (that.addressValue[1].status) {
            Object.assign(that.addressValue[1], that.addressData.province_list[that.addressValue[1].index])
          } else {
            Object.assign(that.addressValue[1], that.addressData.city_list[0])
          }
          if (that.addressValue[2].status) {
            Object.assign(that.addressValue[2], that.addressData.province_list[that.addressValue[2].index])
          } else {
            Object.assign(that.addressValue[2], that.addressData.county_list[0])
          }
        } else if (index === 1) {
          Object.assign(that.addressValue[0], item)
          item.isLoading = true
          that.addressValue[1].status = false
          that.addressValue[2].status = false
          that.$store.dispatch('ApiService.getRegionByPid', {pid: item.value}).then(
            (rsp) => {
              that.addressActive = index
              Object.assign(that.addressValue[1], that.addressData.city_list[0])
              that.addressValue[0].index = i
              item.isLoading = false
            }
          )
        } else if (index === 2) {
          let config = {addressType: 1}
          Object.assign(that.addressValue[1], item)
          that.addressValue[2].status = false
          item.isLoading = true
          that.$store.dispatch('ApiService.getRegionByPid', {pid: item.value, config}).then(
            () => {
              that.addressActive = index
              Object.assign(that.addressValue[2], that.addressData.county_list[0])
              that.addressValue[1].index = i
              item.isLoading = false
            }
          )
        } else if (index === 3) {
          Object.assign(that.addressValue[2], item)
          that.popupShow = !that.popupShow
          that.addressDataTo = that.addressValue
        }
      },
      handleTabClick (index) {
        console.log(this.addressActive, index)
        this.addressActive = index
      },
      /**
       * 提交表单
       */
      fromSubmit () {
        // *     mobile：门店电话
        // *     provinceCity：门店地址.
        // *     addRess：详细地址
        // *     businessType:门店类型 //0连锁//1单店
        // *     业态: {
        // *          typeOfOperation: 分类 0：堂食 1：快餐
        //   *          typeOfCooking：菜系
        let data = {
            shiroUserId: this.shiroUserId,
            trueName: this.trueName,
            mobile: this.mobile,
            addRess: this.addRess,
            businessType: this.businessType[0],
            provinceCity: []
          },
          that = this
        if (this.addressDataTo) {
          for (let v of this.addressDataTo) {
            data.provinceCity.push(v.value)
          }
          data.provinceCity = JSON.stringify(data.provinceCity)
        }
        data.typeOfOperation = this.orderValue[0]
        data.typeOfCooking = this.orderValue[1]
        console.log(data, '提交')
        if (!this.$azm.util.trim(data.trueName)) {
          this.$toast('门店名称不能为空')
        } else if (!this.$azm.util.trim(data.mobile)) {
          this.$toast('手机号码不能为空')
        } else if (!this.$azm.util.RegExp.isPhone_Mobile.test(data.mobile)) {
          this.$toast('手机格式不正确')
        } else if (!this.$azm.util.trim(data.typeOfOperation) || !this.$azm.util.trim(data.typeOfCooking)) {
          this.$toast('请选择业态')
        } else if (!this.$azm.util.trim(data.provinceCity)) {
          this.$toast('请选择门店地址')
        } else {
          that.$store.dispatch('ApiService.createRestaurant', data).then(
            (rsp) => {
              if (2000 == rsp.code) {
                that.$router.go(-2)
              }
            }
          )
        }
      }
    }
  }
</script>
<style scoped lang='less'>
  .me_shop_info_page {
    box-sizing: border-box;
    .azm-address-cell {
      font-size: 12px;
    }
    .label-width {
      width: 66px;
    }
    .azm-btn-submit {
      border-radius: 99px;
    }
    .color-red {
      color: #ff0000;
    }
    .azm-popupShow-h {
      height: 250px !important;
    }
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
