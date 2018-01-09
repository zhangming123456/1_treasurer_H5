<template>
  <div class="me_staff_info_page">
    <!--<h2>员工资料填写</h2>-->
    <group class="me_shop_group">
      <x-input title="姓名" class="azm-font-cell" label-width="1.07rem" v-model="nick_name" is-type="china-name"
               placeholder="请输入员工姓名"></x-input>
      <x-input title="工号" type="number" class="azm-font-cell" label-width="1.07rem" v-model="workNo"
               placeholder="请输入工号"></x-input>
      <x-input title="手机号码" class="azm-font-cell" label-width="1.07rem" name="mobile" mask="99999999999"
               :disabled="isEdit"
               placeholder="请输入手机号码"
               v-model="mobile" keyboard="number"
               :max="11"
               is-type="china-mobile"></x-input>
    </group>
    <group title="店铺信息" class="me_shop_group">
      <!--<popup-picker title="所属店铺" class="azm-font-cell" label-width="1.07rem" :data="orderList" v-model="orderValue"-->
      <!--@on-show="onShow"-->
      <!--@on-hide="onHide"-->
      <!--@on-change="onChange" placeholder="请选择店铺"></popup-picker>-->
      <popup-picker v-if="type == 2" title="角色" class="azm-font-cell" label-width="1.07rem" :data="findRoleList"
                    v-model="findRoleValue"
                    @click.native="open_role" show-name
                    @on-change="onChange" :placeholder="role_name?role_name:'请选择角色'"></popup-picker>
      <cell v-else-if="type == 1" title="角色" :value="role_name"></cell>
      <cell-box class="azm-cellBox" label-width="1.07rem">
        <flexbox>
          <flexbox-item :span="1/5.5">
            <p class="azm-font-cell">抹零范围</p>
          </flexbox-item>
          <flexbox-item>
            <x-input name="mobile" title="最小" placeholder="0" v-model="minMaling"
                     keyboard="number" text-align="right"></x-input>
          </flexbox-item>
          <flexbox-item>
            <x-input name="mobile" title="最大" placeholder="9999" v-model="maxMaling"
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
            <x-input name="mobile" title="最小" type="number" placeholder="0" v-model="minDiscount"
                     keyboard="number" fillable text-align="right" :max="3" :show-clear="false">
              <span slot="right">%</span>
            </x-input>
          </flexbox-item>
          <flexbox-item>
            <x-input name="mobile" title="最大" type="number" placeholder="100" v-model="maxDiscount"
                     keyboard="number" text-align="right" :max="3" :show-clear="false">
              <span slot="right">%</span>
            </x-input>
          </flexbox-item>
        </flexbox>
      </cell-box>
      <x-switch v-if="type == 2" title="是否锁定" class="azm-font-cell" label-width="1.07rem" :value-map="[0, 1]"
                v-model="status"></x-switch>
      <x-switch title="是否退款" class="azm-font-cell" label-width="1.07rem" :value-map="[0, 1]"
                v-model="refund"></x-switch>
      <x-switch title="是否反结账" class="azm-font-cell" label-width="1.07rem" :value-map="[0, 1]"
                v-model="checkout"></x-switch>
    </group>
    <footer>
      <x-button type="primary" class="azm-font-cell" :show-loading="isSubmit" style="border-radius:99px;"
                @click.native="btnSubmit">保存
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
  import { mapState } from 'vuex'

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
        isEdit: false,
        transferObj: {
          isTabbar: false,
          tabbarLink: 'me-shop'
        },
        isRefund: 0,
        isAntiCheckout: 0,
        isSubmit: false,
        findRoleList: [],
        findRoleValue: [],
        nick_name: '',
        workNo: '',
        mobile: '',
        minMaling: '',
        maxMaling: '',
        minDiscount: '',
        maxDiscount: '',
        checkout: 0,
        refund: 0,
        status: 0
      }
    },
    computed: {
      ...mapState({
        findRoleListData: state => state.ApiService.findRoleListData,
        shiroUserId: state => state.ApiService.shiroUserId,
        resId: state => state.ApiService.resId
      })
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.setStaffInfo()
    },
    methods: {
      setStaffInfo () {
        let that = this
        console.log(this.$route.query, '______')
        let query = this.$route.query
        if (that.$azm.util.isEmptyValue(query)) {

          that.type = query.type
          if (query.isBindResUser != 1) {
            this.$store.commit('setNavigationBarTitle', {title: '编辑管理'})
            that.isEdit = true
          } else {
            this.$store.commit('setNavigationBarTitle', {title: '添加员工'})
          }
          that.shiro_user_id = query.shiro_user_id
          that.nick_name = query.nick_name
          that.mobile = query.mobile
          that.workNo = query.workNo
          that.role_id = query.role_id
          that.role_name = query.role_name
          that.minMaling = query.minMaling || 0
          that.maxMaling = query.maxMaling || 100
          that.minDiscount = query.minDiscount || 0
          that.maxDiscount = query.maxDiscount || 100
          that.checkout = query.checkout || 0
          that.refund = query.refund || 0
          that.status = query.status || 0
        } else {
          that.$router.go(-1)
        }
        // ApiService.findRoleList
      },
      openImg (e, index) {
        this.$refs.previewer.show(index)
        e.cancelBubble = true
      },
      routerLink (path, params) {
        this.$router.push({path, query: params})
      },
      open_role () {
        let that = this
        this.$store.dispatch('ApiService.findRoleList', {resId: this.resId}).then(
          () => {
            console.log(that.findRoleListData)
            that.findRoleList = that.findRoleListData
          }
        )
      },
      btnSubmit () {
        let that = this
        let data = {
          shiroUserId: that.shiro_user_id,
          resId: that.resId,
          nick_name: that.nick_name,
          mobile: that.mobile,
          workNo: that.workNo,
          role_id: that.role_id,
          role_name: that.role_name,
          minMaling: that.minMaling,
          maxMaling: that.maxMaling,
          minDiscount: that.minDiscount,
          maxDiscount: that.maxDiscount,
          checkout: that.checkout,
          refund: that.refund,
          status: that.status
        }
        if (!this.$azm.util.trim(data.nick_name)) {
          this.$toast('姓名不能为空')
        } else if (!this.$azm.util.trim(data.mobile)) {
          this.$toast('手机号码不能为空')
        } else if (!this.$azm.util.RegExp.isPhone_Mobile.test(data.mobile)) {
          this.$toast('手机格式不正确')
        } else if (!this.$azm.util.trim(data.role_id)) {
          this.$toast('请选择角色')
        } else {
          if (that.isEdit) {
            that.$store.dispatch('ApiService.updateOrSaveResUser', data).then(
              (rsp) => {
                if (2000 == rsp.data.code) {
                  that.$router.go(-1)
                }
              }
            )
          } else {
            that.$store.dispatch('ApiService.bindResUser', data).then(
              (rsp) => {
                if (2000 == rsp.data.code) {
                  that.$router.go(-3)
                }
              }
            )
          }
        }
      },
      onShow () {},
      onHide () {},
      onChange (v) {
        console.log(v)
        this.role_id = v[0]
      }
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
