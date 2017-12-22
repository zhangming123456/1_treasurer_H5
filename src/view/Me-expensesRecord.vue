<template>
  <scroller lock-x scrollbar-y ref="scroller" :class="name" class="azm-fixed">
    <van-pull-refresh v-model="isLoading">
      <van-cell-group>
        <van-cell title="消费提醒" value="18507065087" label="2017-08-12 22:22:12"></van-cell>
      </van-cell-group>
    </van-pull-refresh>
  </scroller>
</template>

<script>
  import { Cell, CellGroup, PullRefresh } from 'vant/lib/index'
  import { Scroller } from 'vux'

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
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '消费记录'})
    },
    methods: {
      scroller () {}
    },
    watch: {
      isLoading () {
        if (this.isLoading) {
          setTimeout(() => {
            this.isLoading = false
            this.count++
          }, 500)
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
