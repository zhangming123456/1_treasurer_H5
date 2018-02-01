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
    <!--品牌logo-->
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

    <x-button type="primary" class="azm-btn azm-btn-submit" action-type="submit" @click.native="startUpload">开始上传
    </x-button>
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
        files2: [],
        edit: false,
        edit2: false,
        cropper: false,
        accept: 'image/png,image/gif,image/jpeg,image/webp',//表单的accept属性, MIME type
        extensions: 'gif,jpg,jpeg,png,webp',//允许上传的文件后缀
        // extensions: ['gif', 'jpg', 'jpeg','png', 'webp'],
        // extensions: /\.(gif|jpe?g|png|webp)$/i,
        minSize: 1024,
        size: 1024 * 1024 * 10,//允许上传的最大字节
        multiple: true,//是否允许选择多个文件
        directory: false,//是否是上传文件夹
        dropDirectory: true,//是否开启拖拽目录 如果设置成 false 则过滤掉目录
        addIndex: false,//add() 方法 index 参数的默认值
        drop: false,//拖拽上传  如果设置成 true 则读取父组件作为容器
        thread: 3,//同时并发上传的文件数量 线程数
        inputId: '',//input 标签的 id 属性
        _name: '',//input标签的 name 属性
        timeout: 600 * 1000,//上传超时时间毫秒
        maximum: 3,//列表最大文件数
        postAction: '/upload/post',//POST 请求的上传URL
        putAction: '',//PUT 请求的上传URL put-action 不为空请优先 PUT 请求
        headers: {
          'X-Csrf-Token': 'xxxx',
        },//自定义上传请求 header 数据
        data: {
          '_csrf_token': 'xxxxxx',
        },//POST 请求: 附加请求的 body PUT 请求: 附加请求的 query

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
        },

        updateFile: null
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
        let that = this
        if (value) {
          that.$nextTick(function () {
            if (!that.$refs.editImage) {
              return
            }
            let cropper = new Cropper(
              that.$refs.editImage,
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
            that.cropper = cropper
          })
        } else {
          if (that.cropper) {
            that.cropper.destroy()
            that.cropper = false
          }
        }
      },
      updateFile (value) {
        if (value) {
          console.log(value)
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
        that.updateFile = that.$refs.upload.update(
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

        if (newFile && oldFile && !newFile.active && oldFile.active) {
          // 获得相应数据
          console.log('response', newFile.response)
          if (newFile.xhr) {
            //  获得响应状态码
            console.log('status', newFile.xhr.status)
          }
        }

        if (newFile && oldFile) {
          // 更新文件

          // 开始上传
          if (newFile.active !== oldFile.active) {
            console.log('Start upload', newFile.active, newFile)

            // 限定最小字节
            if (newFile.size >= 0 && newFile.size < 100 * 1024) {
              newFile = this.$refs.upload.update(newFile, {error: 'size'})
            }
          }

          // 上传进度
          if (newFile.progress !== oldFile.progress) {
            console.log('progress', newFile.progress, newFile)
          }

          // 上传错误
          if (newFile.error !== oldFile.error) {
            console.log('error', newFile.error, newFile)
          }

          // 上传成功
          if (newFile.success !== oldFile.success) {
            console.log('success', newFile.success, newFile)
          }
        }

        if (!newFile && oldFile) {
          // 删除文件

          // 自动删除 服务器上的文件
          if (oldFile.success && oldFile.response.id) {
            // $.ajax({
            //   type: 'DELETE',
            //   url: '/file/delete?id=' + oldFile.response.id,
            // });
          }
        }

        // 自动上传
        if (this.uploadAuto && (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error)) {
          if (!this.$refs.upload.active) {
            this.$refs.upload.active = true
          }
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
      },
      startUpload () {
        let that = this,
          $refs = that.$refs
        if (!$refs.upload || !$refs.upload.active) {
          $refs.upload.active = true
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
