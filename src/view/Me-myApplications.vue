<template>
  <div class="me_my_applications_page">
    <group>
      <cell is-link class="group-item" link="/me-applications-info" title="智慧收银">
        <img slot="icon" src="../assets/grid_icon.png" alt="" class="azm-icon-img">
        <x-button mini>未开通</x-button>
        <flexbox slot="inline-desc">
          <flexbox-item>
            剩下：
          </flexbox-item>
          <flexbox-item>
            已发：
          </flexbox-item>
        </flexbox>
      </cell>
    </group>
    <group>
      <cell is-link class="group-item" title="智慧收银">
        <img slot="icon" src="../assets/grid_icon.png" alt="" class="azm-icon-img">
        <x-button mini class="btn-Using">使用中</x-button>
        <flexbox slot="inline-desc">
          <flexbox-item>
            剩下：
          </flexbox-item>
          <flexbox-item>
            已发：
          </flexbox-item>
        </flexbox>
      </cell>
    </group>
  </div>
</template>

<script>
  import { Group, Cell, CellBox, Previewer, TransferDom, PopupPicker, Flexbox, FlexboxItem } from 'vux'
  import XButton from '../../node_modules/vux/src/components/x-button/index.vue'

  export default {
    directives: {
      TransferDom
    },
    components: {
      XButton,
      Group,
      Cell,
      CellBox,
      Previewer,
      PopupPicker,
      Flexbox,
      FlexboxItem
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
      this.$store.commit('setNavigationBarTitle', {title: '我的资料'})
    },
    methods: {
      openImg (e, index) {
        this.$refs.previewer.show(index)
        e.cancelBubble = true
      },
      routerLink (path, params) {
        this.$router.push({path, params})
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
        }
      }
      .azm-icon-img {
        margin-right: 18px;
      }
    }
  }

</style>
