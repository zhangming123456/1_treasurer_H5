<template>
  <div class="me_shop_info_page azm-fixed">
    <div class="user-info-perfect_box">
      <p class="title">填写门店基本信息</p>
      <van-row class="user-info-perfect_row">
        <van-col :span="5">
          <div class="van-cell user-info-perfect_box__text">门店名称</div>
        </van-col>
        <van-col :span="19">
          <van-cell-group class="form-group">
            <van-field class="form-group__trueName form-group__item"
                       v-model="trueName"
                       type="text"
                       icon="clear"
                       placeholder="必填，请输入门店品牌名称"
                       @click-icon="trueName = ''"
            />
          </van-cell-group>
        </van-col>
      </van-row>
      <van-row class="user-info-perfect_row">
        <van-col :span="5">
          <div class="van-cell user-info-perfect_box__text"></div>
        </van-col>
        <van-col :span="19">
          <van-cell-group class="form-group">
            <van-field class="form-group__trueName form-group__item"
                       v-model="trueName"
                       type="text"
                       icon="clear"
                       placeholder="非必填，请输入分店名（如南山店）"
                       @click-icon="trueName = ''"
            />
          </van-cell-group>
        </van-col>
      </van-row>
      <van-row class="user-info-perfect_row">
        <van-col :span="5">
          <div class="van-cell user-info-perfect_box__text">门店类型</div>
        </van-col>
        <van-col :span="19">
          <van-radio-group v-model="businessType">
            <van-row>
              <van-col :span="9">
                <van-radio class="form-group-radio" name="0">单店</van-radio>
              </van-col>
              <van-col :span="9">
                <van-radio class="form-group-radio" name="1">连锁</van-radio>
              </van-col>
            </van-row>
          </van-radio-group>
        </van-col>
      </van-row>
      <van-row class="user-info-perfect_row">
        <van-col :span="5">
          <div class="van-cell user-info-perfect_box__text">业态</div>
        </van-col>
        <van-col :span="19">
          <x-button class="azm_popup_picker_btn" plain @click.native="openDishList" type="primary">
            <span>{{orderValueText?orderValueText:'必填，请选择业态'}}</span>
            <i class="iconfont icon-jiantou1 azm-icon"></i>
          </x-button>
          <popup-picker class="" :data="orderList" v-model="orderValue" :display-format="orderFormat"
                        @click.native="openDishList"
                        @on-change="onChange" placeholder="必填，请选择业态" style="display: none" :show.sync="showPopupPicker">
          </popup-picker>
        </van-col>
      </van-row>
      <van-row class="user-info-perfect_row">
        <van-col :span="5">
          <div class="van-cell user-info-perfect_box__text">门店电话</div>
        </van-col>
        <van-col :span="19">
          <van-cell-group class="form-group">
            <van-field class="form-group__trueName form-group__item"
                       v-model="mobile"
                       type="tel"
                       icon="clear"
                       placeholder="必填，填写多个以“，”分隔"
                       @click-icon="mobile = ''"
            />
          </van-cell-group>
        </van-col>
      </van-row>
      <van-row class="user-info-perfect_row">
        <van-col :span="5">
          <div class="van-cell user-info-perfect_box__text">门店地址</div>
        </van-col>
        <van-col :span="19">
          <x-button class="azm_popup_picker_btn" plain @click.native="doShowAddress(0)" type="primary">
            <span>{{addressDataToText?addressDataToText:'省 - 市 - 区/县'}}</span>
            <i class="iconfont icon-jiantou1 azm-icon"></i>
          </x-button>
          <van-popup class="azm-address_popup" v-model="popupShow" position="bottom">
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
        </van-col>
      </van-row>
      <van-row class="user-info-perfect_row">
        <van-col :span="5">
          <div class="van-cell user-info-perfect_box__text"></div>
        </van-col>
        <van-col :span="19">
          <van-cell-group class="form-group">
            <van-field class="form-group__trueName form-group__item"
                       v-model="addRess"
                       type="textarea"
                       icon="clear"
                       autosize
                       placeholder="必填，请输入详细地址"
                       @click-icon="addRess = ''"
            />
          </van-cell-group>
        </van-col>
      </van-row>
    </div>
    <footer>
      <x-button type="primary" class="azm-font-cell azm-btn-submit" action-type="submit" :show-loading="isSubmit"
                @click.native="fromSubmit">下一步
      </x-button>
    </footer>
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
  import { mapState } from 'vuex'
  import { Field, CellGroup, Row, Col, PasswordInput, NumberKeyboard, Radio, RadioGroup, Popup } from 'vant/lib/index'
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
      Scroller,
      [PasswordInput.name]: PasswordInput,
      [NumberKeyboard.name]: NumberKeyboard,
      [CellGroup.name]: CellGroup,
      [Field.name]: Field,
      [Col.name]: Col,
      [Row.name]: Row,
      [Radio.name]: Radio,
      [RadioGroup.name]: RadioGroup,
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
        businessType: '0',
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
        addressDataToText: null,
        addressActive: 0,
        provinceCity: [],
        trueName: '',
        mobile: '',
        phone: '',
        addRess: '',
        areaList: {},
        orderValue: [], // 业态
        orderValueText: '', // 业态
        searchResult: [],
        popupShow: false,
        onShowProvince_list: false,
        showPopupPicker: false
      }
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '创建门店'})
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
      routerReplace (path, params) {
        this.$router.replace({path, query: params})
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
        this.orderValueText = name
        return name
        // return `${that.orderList[0][value[0]].name} - ${that.orderList[1][value[1]].name}`
      },
      openDishList () {
        this.showPopupPicker = true
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
          that.addressDataToText = `${that.addressDataTo[0].name} - ${that.addressDataTo[1].name} - ${that.addressDataTo[2].name}`
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
        } else if (!this.$azm.util.trim(data.typeOfOperation) || !this.$azm.util.trim(data.typeOfCooking)) {
          this.$toast('请选择业态')
        } else if (!this.$azm.util.trim(data.provinceCity)) {
          this.$toast('请选择门店地址')
        } else if (!this.$azm.util.trim(data.addRess)) {
          this.$toast('请填写门店详细地址')
        } else {
          that.routerLink('/me/certificateInfo')
          // that.$store.dispatch('ApiService.createRestaurant', data).then(
          //   (rsp) => {
          //     if (2000 == rsp.code) {
          //
          //     }
          //   }
          // )
        }
      }
    }
  }
</script>

<style lang="less">
  .me_shop_info_page {

  }
</style>
<style scoped lang='less'>
  .me_shop_info_page {
    box-sizing: border-box;
    margin-top: 45px;
    .form-group-radio {
      height: 30px;
      line-height: 30px;
    }
    .azm_popup_picker_btn {
      border: 1px solid #afb4be;
      position: relative;
      color: #789292;
      line-height: 34px;
      font-size: 12px;
      text-align: left;
      &::after {
        border: none;
      }
      .azm-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        line-height: 1;
        font-size: 13px;
      }
    }
    .form-group {
      &::after {
        border: 1px solid #afb4be;
        border-radius: 10px;
      }
    }
    background-color: #fff;
    button.disabled {
      background-color: #999999;
    }
    p.title {
      font-size: 12px;
      color: #798292;
      margin-bottom: 30px;
    }
    .user-info-perfect_box {
      padding: 24px 20px 0;
      box-sizing: border-box;
      .user-info-perfect_row {
        margin-bottom: 10px;
        .form-group__item {
          padding-top: 5px;
          padding-bottom: 5px;
        }
        .btn-birthday {
          background-color: transparent;
          color: #798292;
          padding-top: 10px;
          padding-bottom: 10px;
          &::after {
            border-color: #afb4be;
          }
          p {
            font-size: 12px;
            color: #96A0B2;
            line-height: 24px;
          }
        }
      }
      .user-info-perfect_box__text {
        font-size: 13px;
        color: #798292;
        padding-top: 5px;
        padding-bottom: 5px;
      }
    }
    footer {
      padding: 0 25px;
      .azm-btn-submit {
        margin-top: 64px;
        line-height: 45px;
        font-size: 15px;
      }
    }
    .azm-address_popup {
      .azm-popupShow-h {
        height: 250px !important;
        .azm-address-cell {
          font-size: 15px;
          color: #181818;
        }
      }
    }
  }
</style>
