<template>
  <!--<scroller :id="'scroller2'" lock-x scrollbar-y ref="scroller2" :class="name" class="azm-fixed scroller2">-->
  <!---->
  <!--</scroller>-->
  <van-pull-refresh v-model="isLoading" ref="scroller3" v-scroll="onScroll(isLoading)" @keyup.enter="onScroll">
    <van-cell-group>
      <van-cell v-for="item of MobileMsgListData" :key="item.id" :title="titleCode(item.explain)"
                :value="item.telPhone"
                :label="item.createTime | dateFormat"></van-cell>
    </van-cell-group>
  </van-pull-refresh>
</template>

<script>
  import { Cell, CellGroup, PullRefresh } from 'vant/lib/index'
  import { Scroller } from 'vux'
  import { mapState } from 'vuex'

  export default {
    components: {
      Scroller,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [PullRefresh.name]: PullRefresh
    },
    data () {
      return {
        name: 'me-expenses-record',
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'me-expenses-record'
        },
        isLoading: false
      }
    },
    computed: {
      ...mapState({
        MobileMsgListData: state => state.ApiService.MobileMsgListData,
        resId: state => state.ApiService.resId
      })
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '消费记录'})
      this.getMobileMsgList()
    },
    methods: {
      onScroll (e) {
        console.log(e)
        console.log(10)
      },
      titleCode (txt) {
        if (txt === 'SMS_XIAOFEI_CONTENT') {
          return '消费确认'
        } else if (txt === 'SMS_XIAOFEICODE_CONTENT') {
          return '消费提醒'
        } else if (txt === 'SMS_CHONGZHI_CONTENT') {
          return '充值提醒'
        }
      },
      getMobileMsgList (cb) {
        let that = this
        that.$store.dispatch('ApiService.getMobileMsgList', {shirouserId: that.resId}).then(cb)
      }
    },
    watch: {
      isLoading (e) {
        let that = this
        console.log(this.$refs.scroller3, e)
        // console.log(document.querySelector('.scroller2').scrollTop)
        if (this.isLoading) {
          this.getMobileMsgList(() => {
            setTimeout(() => {
              that.isLoading = false
              that.count++
            }, 1000)
          })
        } else {

        }
      }
    }
  }
</script>

<style lang='less'>
  .me-expenses-record {
  }
</style>

<style scoped lang='less'>
  .me-expenses-record {

  }
</style>
