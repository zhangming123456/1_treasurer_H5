<template>
  <div class="me_my_applications_page">
    <group v-for="(item,index) of resModularList" :key="index">
      <cell is-link class="group-item" @click.native="routerLink('/me/applications/info',item)"
            :title="item.modularName">
        <img slot="icon" :src="'./static/libs/images/appIcon/'+item.icon+'.png'" alt="" class="azm-icon-img">
        <x-button mini class="btn-Using btn_item" v-if="item.status == 0">立即续费</x-button>
        <x-button mini class="btn-default btn_item" v-else-if="item.status == 1">立即开通</x-button>
        <flexbox slot="inline-desc" v-if="item.type == 1" class="font_item">
          <flexbox-item>
            剩下：{{item.availableCount}}
          </flexbox-item>
          <flexbox-item>
            已发：{{item.usedCount}}
          </flexbox-item>
        </flexbox>
        <div slot="inline-desc" v-else-if="item.type == 0" class="font_item">
          有效期至：{{item.expiredTime | dateFormat('YYYY-MM-DD')}}
        </div>
      </cell>
    </group>
  </div>
</template>

<script>
  // import { Group, Cell, CellBox, Previewer, TransferDom, PopupPicker, Flexbox, FlexboxItem } from 'vux'
  import XButton from '../../../node_modules/vux/src/components/x-button/index.vue'
  import { mapState } from 'vuex'
  import Group from '../../components/group/index'
  import Cell from '../../components/cell/index'
  import CellBox from '../../components/cell-box/index'
  import Previewer from '../../components/previewer/index'
  import PopupPicker from '../../components/popup-picker/index'
  import Flexbox from '../../components/flexbox/flexbox'
  import FlexboxItem from '../../components/flexbox/flexbox-item'
  import TransferDom from '../../directives/transfer-dom'

  export default {
    directives: {
      TransferDom
    },
    components: {
      FlexboxItem,
      Flexbox,
      PopupPicker,
      Previewer,
      CellBox,
      Cell,
      Group,
      XButton,
      // Group,
      // Cell,
      // CellBox,
      // Previewer,
      // PopupPicker,
      // Flexbox,
      // FlexboxItem
    },
    data () {
      return {
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'me-info'
        },
        sex: [],
        sexList: [
          {
            name: '无',
            value: 0
          },
          {
            name: '男',
            value: 1
          },
          {
            name: '女',
            value: 2
          }
        ]
      }
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '我的应用'})
      this.getResModularList()
    },
    computed: {
      ...mapState({
        resModularList: state => state.ApiService.resModularList,
        shiroUserId: state => state.ApiService.shiroUserId,
        resId: state => state.ApiService.resId
      })
    },
    methods: {
      getResModularList () {
        let resId = this.resId
        this.$store.dispatch('ApiService.getResModularList', {resId})
      },
      openImg (e, index) {
        this.$refs.previewer.show(index)
        e.cancelBubble = true
      },
      routerLink (path, params) {
        this.$router.push({path, query: params})
      },
      sexFormat: function (value, name) {
        let v = Number(value[0])
        switch (v) {
          case 1:
            return '男'
          case 2:
            return '女'
          default:
            return '无'
        }
      }
    }
  }
</script>
<style lang='less'>
  .me_my_applications_page {
    .group-item {
      .btn_item {
        padding: 0 5px;
        font-size: 11px;
      }
      .font_item {
        font-size: 12px;
        margin-top: 5px;
      }
      .vux-cell-bd {
        font-size: 15px;
        color: #576073;
        .vux-label-desc {
          font-size: 12px;
          color: #88deec;
        }
      }
      .weui-cell__ft {
        button {
          background-color: transparent;
          &.btn-Using {
            color: #88deec;
            &::after {
              border: 1px solid #88deec;
            }
          }
          &.btn-default {
            color: #979fb2;
            &::after {
              border: 1px solid #979fb2;
            }
          }
        }
      }
      .azm-icon-img {
        margin-right: 18px;
        width: 44px;
        height: auto;
      }
    }
  }

</style>
