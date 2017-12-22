<template>
  <div class="home_page">

  </div>
</template>

<script>
  export default {
    data () {
      return {
        socketService: null,
        msg: 'Hello World!',
        setData: null,
        transferObj: {
          isTabbar: true,
          tabbarLink: 'home'
        }
      }
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '首页'})
    },
    methods: {}
  }
</script>
<style>
</style>
<style scoped lang='less'>
  .byFurnace {
    background: #2c6afd;
    padding-top: 80px;
  }

  .byControl {
    width: 50%;
    margin: 0 auto;
  }

  .byControl ._Image {
    margin: 0 auto;
    width: 187.5px;
    height: 105px;
    background: url('../../static/libs/images/i-con.png') no-repeat -450px -102px;
    background-size: 960px 840px;
  }

  .fonTitle {
    margin-top: 10px;
    font-family: monospace
  }

  .fonTitle p {
    font-size: 25px;
    color: #fff;
    text-align: center;
    line-height: 25px;
    padding: 5px 0;
  }

  .buttonBox {
    padding: 37.5px 0;
    a {
      display: block;
      width: 120px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      letter-spacing: 2px;
      background: #2490ff;
      border-radius: 12px;
      border: none;
      margin: 12.5px auto;
      color: #fff;
      font-size: 18px;
    }
  }

  .buttonBox button i {
    color: red;
    font-size: 20px;
  }

  .footer {
    bottom: 20px;
    padding: 55px 0 !important;
    text-align: center;
    font-size: 15px;
    p {
      color: #fff;
    }
  }

  .byControl .tagjump {
    color: #fff;
    font-size: 30px;
    font-weight: 200;
    position: absolute;
    top: 35px;
    left: 18px;
  }

</style>
