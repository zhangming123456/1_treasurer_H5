<template>
  <div :class='name' class="example-avatar">
    <nav>
      <x-button type="primary" mini plain class="azm-fixed_btn" link="BACK">跳过
      </x-button>
    </nav>
    <div class="azm-fixed">
      <div class="azm-fixed_46px"></div>
      <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
        <h3>Drop files to upload</h3>
      </div>
      <div class="avatar-upload" v-show="!edit">
        <div class="text-center p-2">
          <label for="avatar">
            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"
                 class="rounded-circle"/>
          </label>
        </div>
        <div class="text-center p-2">
          <file-upload
            extensions="gif,jpg,jpeg,png,webp"
            accept="image/png,image/gif,image/jpeg,image/webp"
            name="avatar"
            class="btn btn-primary"
            :drop="!edit"
            v-model="files"
            :post-action="postAction"
            :put-action="putAction"
            :extensions="extensions"
            :accept="accept"
            :multiple="multiple"
            :directory="directory"
            :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
            :headers="headers"
            :data="data"
            :drop-directory="dropDirectory"
            @input-filter="inputFilter"
            @input-file="inputFile"
            :add-index="addIndex"
            ref="upload">
            上传头像
          </file-upload>

          <label class="dropdown-item" for="avatar">Add files</label>
        </div>
      </div>
    </div>
    <div class="avatar-edit azm-fixed" v-show="files.length && edit">
      <div class="avatar-edit-image" v-if="files.length">
        <img ref="editImage" :src="files[0].url"/>
      </div>
      <van-row class="text-center p-4">
        <van-col span="6" class="left">
          <x-button mini type="button" class="azm-btn azm-btn-secondary" @click.native="$refs.upload.clear">取消
          </x-button>
        </van-col>
        <van-col span="12" class="left">
          <x-button mini type="button" class="azm-btn azm-btn-reduction" @click.native="reset">还原
          </x-button>
        </van-col>
        <van-col span="6" class="left">
          <x-button mini type="submit" class="azm-btn azm-btn-primary" @click.native="editSave">完成</x-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  import { mapState } from 'vuex'
  import Cropper from 'cropperjs'
  import FileUpload from 'vue-upload-component'
  import { Row, Col } from 'vant/lib/index'

  export default {
    components: {
      XButton,
      FileUpload,
      [Row.name]: Row,
      [Col.name]: Col
    },
    data () {
      return {
        name: 'certificate-info',
        msg: 'Hello World!',
        transferObj: {
          isTabbar: false,
          tabbarLink: 'certificate-info',
          navBarHide: false
        },
        iframe: '',
        hash: '',
        files: [],
        edit: false,
        cropper: false,
        accept: 'image/png,image/gif,image/jpeg,image/webp',
        extensions: 'gif,jpg,jpeg,png,webp',
        // extensions: ['gif', 'jpg', 'jpeg','png', 'webp'],
        // extensions: /\.(gif|jpe?g|png|webp)$/i,
        minSize: 1024,
        size: 1024 * 1024 * 10,
        multiple: true,
        directory: false,
        dropDirectory: true,
        addIndex: false,
        thread: 3,
        postAction: '/upload/post',
        putAction: '/upload/put',
        headers: {
          'X-Csrf-Token': 'xxxx',
        },
        data: {
          '_csrf_token': 'xxxxxx',
        },

        autoCompress: 1024 * 1024,
        uploadAuto: false,
        isOption: false,

        addData: {
          show: false,
          name: '',
          type: '',
          content: '',
        },

        editFile: {
          show: false,
          name: '',
        }
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
      this.$store.commit('setNavigationBarTitle', {title: '填写证照信息'})
      this.hash = this.$azm.config.Hash
    },
    watch: {
      edit (value) {
        if (value) {
          let that = this
          this.$nextTick(function () {
            if (!this.$refs.editImage) {
              return
            }
            let cropper = new Cropper(
              this.$refs.editImage,
              {
                aspectRatio: 1 / 1,
                viewMode: 1,
                dragMode: 'move',
                minCropBoxWidth: 200,
                minCropBoxHeight: 200,
                cropBoxMovable: false,
                cropBoxResizable: false
              }
            )
            this.cropper = cropper
          })
        } else {
          if (this.cropper) {
            this.cropper.destroy()
            this.cropper = false
          }
        }
      }
    },
    methods: {
      editSave () {
        this.edit = false

        let that = this,
          oldFile = that.files[0],
          width = 800,
          height = 800,
          binStr = atob(that.cropper.getCroppedCanvas({width, height}).toDataURL(oldFile.type).split(',')[1]),
          arr = new Uint8Array(binStr.length)
        for (let i = 0; i < binStr.length; i++) {
          arr[i] = binStr.charCodeAt(i)
        }

        let file = new File([arr], oldFile.name, {type: oldFile.type})
        console.log(file)
        this.$refs.upload.update(
          oldFile.id,
          {
            file,
            type: file.type,
            size: file.size,
            active: true,
          })
      },
      reset () {
        if (this.cropper) {
          this.cropper.reset()
        }
      },
      rotate () {
        if (this.cropper) {
          this.cropper.rotate(45)
        }
      },
      inputFile (newFile, oldFile, prevent) {
        if (newFile && !oldFile) {
          this.$nextTick(function () {
            this.edit = true
          })
        }
        if (!newFile && oldFile) {
          this.edit = false
        }
      },
      inputFilter (newFile, oldFile, prevent) {
        if (newFile && !oldFile) {
          if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
            this.$toast('你的选择不是一个图片')
            return prevent()
          }
        }

        if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
          newFile.url = ''
          let URL = window.URL || window.webkitURL
          if (URL && URL.createObjectURL) {
            newFile.url = URL.createObjectURL(newFile.file)
          }
        }
      }
    }
  }
</script>

<style lang='less'>
  .certificate-info {
  }
</style>
<style scoped lang='less'>

  .certificate-info {
    nav > .azm-fixed_btn {
      position: fixed;
      z-index: 1001;
      top: 7px;
      right: 10px;
      font-size: 13px;
      border-color: #38f;
      color: #000;
    }
    &.example-avatar {
      .avatar-edit {
        z-index: 1002;
        background-color: #000;
        .avatar-edit-image {
          position: absolute;
          margin: auto;
          top: 0;
          left: 0;
          bottom: 45px;
          right: 0;
        }
        .p-4 {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 45px;
          line-height: 45px;
          border-top: 1px solid #808080;
          .azm-btn {
            background-color: transparent;
            color: #fff;
          }
        }
      }
      .avatar-upload {
        .rounded-circle {
          width: 200px;
          height: 200px;
        }
      }
      .text-center .btn {
        margin: 0 .5rem
      }
      .drop-active {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        position: fixed;
        z-index: 9999;
        opacity: .6;
        text-align: center;
        background: #000;
        h3 {
          margin: -.5em 0 0;
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
          font-size: 40px;
          color: #fff;
          padding: 0;
        }
      }
    }
    .azm-fixed {
      .azm-fixed_46px {
        height: 46px;
      }
      background-color: #fff;
    }
  }
</style>
