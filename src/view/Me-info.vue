<template>
  <div class="me_info_page">
    <group title="个人信息" class="group">
      <cell class="group_item" title="头像">
        <div class="group_img">
          <img v-if="userInfo" :src="imagesUrl+userInfo.headPhoto" alt="">
        </div>
      </cell>
      <cell is-link class="group_item" title="昵称" :value="userInfo.nick_name"
            @click.native="openNickNameConfirm"></cell>
      <cell class="group_item" title="手机号" :value="userInfo.mobile"></cell>
      <!--:display-format="sexFormat"-->
      <popup-picker class="group_item" title="性别" :data="sexList" :columns="1" v-model="sex" :display-format="sexFormat"
                    @on-change="sexChange"
                    placeholder="无"></popup-picker>
      <cell class="group_item" title="二维码名片" @click.native="openImg($event,0)">
        <!--<img class="group_qr" src="../../assets/qr.png" alt="">-->
        <i class="iconfont icon-erweima"></i>
        <qrcode :value="qrcodeImg" type="img" :size="100" id="qrcodeImg" style="display: none"></qrcode>
      </cell>
    </group>
    <group title="所在企业" class="group">
      <cell class="group_item" :title="userInfo.res_name" :value="userInfo.trueName"></cell>
    </group>
    <group title="" class="group btn-footer">
      <cell class="group_item" @click.native="logOut">
        <p slot="after-title" class="text-center">退出账户</p>
      </cell>
    </group>
  </div>
</template>

<script>
  import { Group, Cell, CellBox, Previewer, TransferDom, PopupPicker, Qrcode } from 'vux'
  import { mapState } from 'vuex'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Group,
      Cell,
      CellBox,
      Previewer,
      PopupPicker,
      Qrcode
    },
    computed: {
      ...mapState({
        userInfo: state => state.ApiService.findResUserData,
        resId: state => state.ApiService.resId,
        shiroUserId: state => state.ApiService.shiroUserId,
        qrcodeImg: state => state.ApiService.qrcodeImg,
      })
    },
    data () {
      let that = this
      return {
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'me-info'
        },
        sex: [],
        sexList: [
          {
            name: '男',
            value: 1
          },
          {
            name: '女',
            value: 2
          }
        ],
        imagesUrl: that.$azm.config.imageUrl
      }
    },
    created () {
      this.$emit('transfer', this.transferObj)
      this.$store.commit('setNavigationBarTitle', {title: '我的资料'})
      this.getUserInfo()
    },
    methods: {
      openImg (e, position) {
        try {
          let url = window.document.querySelector('#qrcodeImg img').src
          if (url) {
            this.$vant.ImagePreview([
              url
            ], typeof position === 'number' ? position : 0)
          }
          console.log(url)
        } catch (e) {
          console.warn('打开二维码图片失败')
        }
        e.cancelBubble = true
      },
      routerLink (path, params) {
        this.$router.push({path, query: params})
      },
      logOut () {
        this.$store.dispatch('logOut')
        this.routerLink('/login')
      },
      sexFormat (value, name) {
        let v = Number(value[0])
        switch (v) {
          case 1:
            return '男'
          case 2:
            return '女'
          default:
            return '无'
        }
      },
      sexChange () {
        // console.log(this.sex, '__________', this.sex[0] != this.userInfo.sex)
        if (this.sex[0] != this.userInfo.sex) {
          this.updateUserInfo({sex: this.sex[0]})
        }
        // this.updateUserInfo({sex: this.sex[0]})
      },
      getUserInfo () {
        let that = this
        this.$store.dispatch('ApiService.findResUser', {
          resId: that.resId,
          shiroUserId: that.shiroUserId
        }).then(
          () => {
            that.sex = [that.userInfo.sex]
          }
        )
      },
      updateUserInfo (data) {
        let that = this,
          value = Object.assign({
            resId: that.resId,
            id: that.shiroUserId
          }, data)
        this.$store.dispatch('ApiService.updateShiroUser', value).then(
          () => {
            that.getUserInfo()
          }
        )
      },
      openNickNameConfirm () {
        let that = this
        this.$vux.confirm.prompt('请输入你的昵称', {
          title: '编辑昵称',
          onShow (e) {
            that.$vux.confirm.setInputValue(that.userInfo.nick_name)
          },
          onHide (e) {

          },
          onCancel (value) {
          },
          onConfirm (value) {
            if (value && value !== that.userInfo.nick_name) {
              that.updateUserInfo({trueName: value})
            }
          }
        })
      }
    }
  }
</script>
<style scoped lang='less'>
  .me_info_page {
    .group {
      &.btn-footer {
        margin-top: 50px;
      }
      .weui-cells__title {
        font-size: 14px;
      }
      .group_item {
        font-size: 13px;
      }
      .group_img {
        width: 45px;
        height: 45px;
        border-radius: 100%;
        overflow: hidden;
        img {
          width: 45px;
          height: 45px;
        }
      }
      .group_qr {
        width: 20px;
        height: auto;
        vertical-align: middle;
      }
    }
  }

</style>
