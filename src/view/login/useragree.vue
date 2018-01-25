<template>
  <div :class='name' class="azm-fixed">
    <iframe ref="iframe" src="https://vip.zhenler.com/H5/useragree.html"></iframe>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    components: {},
    data () {
      return {
        name: 'useragree',
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'useragree',
          navBarHide: true
        },
        iframe: '',
        hash: ''
      }
    },
    computed: {
      ...mapState({
        shiroUserId: state => state.ApiService.shiroUserId,
        resId: state => state.ApiService.resId
      })
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '服务条款'})
      this.hash = this.$azm.config.Hash
    },
    methods: {}
  }
</script>

<style scoped>
  .useragree {
  }
</style>
<style scoped lang='less'>
  .useragree {
    iframe {
      border: none;
      width: 100%;
      height: 100%;
    }
  }
</style>
