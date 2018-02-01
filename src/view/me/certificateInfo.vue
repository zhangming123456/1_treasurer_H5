<template>
  <div :class='name' class="example-avatar">
    <nav>
      <x-button type="primary" mini plain class="azm-fixed_btn" @click.native="routerReplace('/me/businessModel')">跳过
      </x-button>
    </nav>
    <div class="azm-fixed">
      <div class="azm-fixed_46px"></div>
      <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
        <h3>放置文件上传</h3>
      </div>
      <!--品牌logo-->
      <div class="avatar-upload" v-show="!files.logo.edit">
        <p>品牌LOGO</p>
        <p>图片尺寸800*800，大小不超过1M</p>
        <div class="p-2">
          <file-upload
            :for="files.logo.name"
            extensions="gif,jpg,jpeg,png,webp"
            accept="image/png,image/gif,image/jpeg,image/webp"
            :name="files.logo.name"
            class="btn btn-primary"
            :drop="!files.logo.edit"
            v-model="files.logo.files"
            :post-action="files.logo.postAction"
            :put-action="files.config.putAction"
            :extensions="files.config.extensions"
            :accept="files.config.accept"
            :multiple="files.config.multiple"
            :directory="files.config.directory"
            :thread="files.config.thread < 1 ? 1 : (files.config.thread > 5 ? 5 : files.config.thread)"
            :data="files.logo.data"
            :size="files.config.size"
            :drop-directory="files.config.dropDirectory"
            @input-filter="inputFilter"
            @input-file="inputFile"
            :add-index="files.config.addIndex"
            :ref="files.logo.name">
            <label :for="files.logo.name" class="azm-addFiles"></label>
            <img class="rounded-circle"
                 :src="files.logo.files.length?files.logo.files[0].url:'../../../../assets/125_03.png'"/>
            <!--<img class="rounded-circle" :src="files.logo.imageUrl?files.logo.imageUrl:'../../../../assets/125_03.png'"/>-->
          </file-upload>
          <pre>{{updateFile}}</pre>
        </div>
      </div>
      <!--证照信息-->
      <div class="avatar-upload" v-show="!files.License.edit">
        <p>证照信息</p>
        <p>请上传在在有效期内的合格营业执照图片，需原件图片</p>
        <div class="p-2">
          <file-upload
            extensions="gif,jpg,jpeg,png,webp"
            accept="image/png,image/gif,image/jpeg,image/webp"
            :name="files.License.name"
            class="btn btn-primary"
            :drop="!files.License.edit"
            v-model="files.License.files"
            :post-action="files.License.postAction"
            :put-action="files.config.putAction"
            :extensions="files.config.extensions"
            :accept="files.config.accept"
            :multiple="files.config.multiple"
            :directory="files.config.directory"
            :thread="files.config.thread < 1 ? 1 : (files.config.thread > 5 ? 5 : files.config.thread)"
            :data="files.License.data"
            :size="files.config.size"
            :drop-directory="files.config.dropDirectory"
            @input-filter="inputFilter"
            @input-file="inputFile"
            :add-index="files.config.addIndex"
            :ref="files.License.name">
            <label :for="files.License.name" class="azm-addFiles"></label>
            <!--<img :src="files.License.imageUrl ? files.License.imageUrl : '../../../../assets/125_03.png'" class="rounded-circle"/>-->
            <img class="rounded-circle"
                 :src="files.logo.files.length?files.logo.files[0].url:'../../../../assets/125_03.png'"/>
          </file-upload>
        </div>
      </div>
    </div>
    <!--品牌logo-->
    <div class="avatar-edit azm-fixed" v-show="files.logo.files.length && files.logo.edit">
      <div class="avatar-edit-image" v-if="files.logo.files.length">
        <img ref="editImage" :src="files.logo.files[0].url"/>
      </div>
      <van-row class="text-center p-4">
        <van-col span="6" class="left">
          <x-button mini type="button" class="azm-btn azm-btn-secondary" @click.native="$refs[files.logo.name].clear">取消
          </x-button>
        </van-col>
        <van-col span="12" class="left">
          <x-button mini type="button" class="azm-btn azm-btn-reduction" @click.native="reset(files.logo.name)">还原
          </x-button>
        </van-col>
        <van-col span="6" class="left">
          <x-button mini type="submit" class="azm-btn azm-btn-primary" @click.native="editSave(files.logo.name)">完成
          </x-button>
        </van-col>
      </van-row>
    </div>
    <!--证照信息-->
    <div class="avatar-edit azm-fixed" v-show="files.License.files.length && files.License.edit">
      <div class="avatar-edit-image" v-if="files.License.files.length">
        <img ref="editImage" :src="files.License.files[0].url"/>
      </div>
      <van-row class="text-center p-4">
        <van-col span="6" class="left">
          <x-button mini type="button" class="azm-btn azm-btn-secondary"
                    @click.native="$refs[files.License.name].clear">取消
          </x-button>
        </van-col>
        <van-col span="12" class="left">
          <x-button mini type="button" class="azm-btn azm-btn-reduction" @click.native="reset(files.License.name)">还原
          </x-button>
        </van-col>
        <van-col span="6" class="left">
          <x-button mini type="submit" class="azm-btn azm-btn-primary" @click.native="editSave(files.License.name)">完成
          </x-button>
        </van-col>
      </van-row>
    </div>
    <footer>
      <x-button type="primary" class="azm-btn azm-btn-submit" action-type="submit"
                @click.native="submit">下一步
      </x-button>
    </footer>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  import { mapState } from 'vuex'
  import Cropper from 'cropperjs'
  import FileUpload from 'vue-upload-component'
  import { Row, Col } from 'vant/lib/index'
  import { Upload, Button } from 'element-ui'

  export default {
    components: {
      XButton,
      FileUpload,
      [Row.name]: Row,
      [Col.name]: Col,
      [Upload.name]: Upload,
      [Button.name]: Button
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
        files: {
          License: {
            name: 'License',//input标签的 name 属性
            inputId: 'License',//input 标签的 id 属性
            edit: false,
            cropper: false,
            uploadAuto: true,
            imageUrl: '',
            postAction: '/upload/post',//POST 请求的上传URL
            data: {},
            files: []
          },
          logo: {
            name: 'logo',//input标签的 name 属性
            inputId: 'logo',//input 标签的 id 属性
            edit: false,
            cropper: false,
            postAction: '/upload/post',//POST 请求的上传URL
            imageUrl: '',
            uploadAuto: false,
            data: {},
            files: []
          },
          config: {
            accept: 'image/png,image/gif,image/jpeg,image/webp',//表单的accept属性, MIME type
            extensions: 'gif,jpg,jpeg,png,webp',//允许上传的文件后缀
            // extensions: ['gif', 'jpg', 'jpeg','png', 'webp'],
            // extensions: /\.(gif|jpe?g|png|webp)$/i,
            minSize: 1024,
            size: 1024 * 1024 * 1,//允许上传的最大字节
            multiple: false,//是否允许选择多个文件
            directory: false,//是否是上传文件夹
            dropDirectory: false,//是否开启拖拽目录 如果设置成 false 则过滤掉目录
            addIndex: false,//add() 方法 index 参数的默认值
            drop: false,//拖拽上传  如果设置成 true 则读取父组件作为容器
            thread: 1,//同时并发上传的文件数量 线程数
            timeout: 600 * 1000,//上传超时时间毫秒
            maximum: 3,//列表最大文件数
            postAction: '/upload/post',//POST 请求的上传URL
            putAction: '',//PUT 请求的上传URL put-action 不为空请优先 PUT 请求
            headers: {},//自定义上传请求 header 数据
            data: {},//POST 请求: 附加请求的 body PUT 请求: 附加请求的 query
            autoCompress: 1024 * 1024,
            isOption: false,
          }
        },
        updateFile: null,
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
      this.files.logo.postAction = `${this.$azm.config.host}/api/upload/uploadImage?resId=${this.resId}&imageType=logo`
      this.files.License.postAction = `${this.$azm.config.host}/api/upload/uploadImage?resId=${this.resId}&imageType=license`
      if (!this.resId)
        this.$store.dispatch('ApiService.getUserByShiroUserId', {
          id: this.shiroUserId
        })
    },
    watch: {
      'files.logo.edit': function (value) {
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
            that.files.logo.cropper = cropper
          })
        } else {
          if (that.files.logo.cropper) {
            that.files.logo.cropper.destroy()
            that.files.logo.cropper = false
          }
        }
      },
      'files.License.edit': function (value) {
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
                cropBoxMovable: false,
                cropBoxResizable: false
              }
            )
            that.files.License.cropper = cropper
          })
        } else {
          if (that.files.License.cropper) {
            that.files.License.cropper.destroy()
            that.files.License.cropper = false
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
      routerLink (path, params) {
        this.$router.push({path, query: params})
      },
      routerReplace (path, params) {
        this.$router.replace({path, query: params})
      },
      editSave (type) {
        this.files[type].edit = false
        let width = 800,
          height = 800
        let that = this,
          oldFile = that.files[type].files[0],
          base64 = that.files[type].cropper.getCroppedCanvas({
            width,
            height
          }).toDataURL(oldFile.type),
          binStr = atob(that.files[type].cropper.getCroppedCanvas({
            width,
            height
          }).toDataURL(oldFile.type).split(',')[1]),
          arr = new Uint8Array(binStr.length)
        for (let i = 0; i < binStr.length; i++) {
          arr[i] = binStr.charCodeAt(i)
        }
        that.updateFile = arr
        let file = new File([arr], oldFile.name, {type: oldFile.type})

        that.$refs[type].update(
          oldFile.id,
          {
            file,
            type: file.type,
            size: file.size,
            active: true,
          }
        )
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
      // inputFile (newFile, oldFile, prevent) {
      //   let size = 1 * 1024 * 1024
      //   if (newFile && !oldFile) {
      //     this.$nextTick(function () {
      //       this.files.logo.edit = true
      //     })
      //   }
      //   if (!newFile && oldFile) {
      //     this.files.logo.edit = false
      //   }
      //
      //   if (newFile && oldFile && !newFile.active && oldFile.active) {
      //     // 获得相应数据
      //     console.log('response', newFile.response)
      //     if (newFile.xhr) {
      //       //  获得响应状态码
      //       console.log('status', newFile.xhr.status)
      //     }
      //   }
      //
      //   if (newFile && oldFile) {
      //     // 更新文件
      //     this.$toast.loading('logo开始上传')
      //     // 开始上传
      //     if (newFile.active !== oldFile.active) {
      //       console.log('Start upload', newFile.active, newFile)
      //
      //       // 限定最小字节
      //       if (newFile.size >= 0 && newFile.size < 1024) {
      //         newFile = this.$refs.logo.update(newFile, {error: 'size'})
      //       }
      //     }
      //
      //     // 上传进度
      //     if (newFile.progress !== oldFile.progress) {
      //       console.log('progress', newFile.progress, newFile)
      //       this.$toast.loading(`logo-${+oldFile.progress}%`)
      //     }
      //
      //     // 上传错误
      //     if (newFile.error !== oldFile.error) {
      //       console.log('error', newFile.error, newFile)
      //       this.$toast.loading(`logo上传错误`)
      //       this.$refs.logo.clear()
      //     }
      //
      //     // 上传成功
      //     if (newFile.success !== oldFile.success) {
      //       console.log('success', newFile.success, newFile)
      //       this.$toast.loading(`logo上传成功`)
      //     }
      //   }
      //
      //   if (!newFile && oldFile) {
      //     // 删除文件
      //
      //     // 自动删除 服务器上的文件
      //     if (oldFile.success && oldFile.response.id) {
      //       // $.ajax({
      //       //   type: 'DELETE',
      //       //   url: '/file/delete?id=' + oldFile.response.id,
      //       // });
      //     }
      //   }
      //
      //   // 自动上传
      //   if (this.uploadAuto && (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error)) {
      //     if (!this.$refs.logo.active) {
      //       this.$refs.logo.active = true
      //     }
      //   }
      //
      // },
      inputFile (newFile, oldFile, prevent) {
        let file = newFile || oldFile,
          type = file.el.id,
          minSize = 1024,
          that = this
        if (!that.files[type].uploadAuto && newFile && !oldFile) {
          that.$nextTick(function () {
            that.files[type].edit = true
          })
        }
        if (!newFile && oldFile) {
          that.files[type].edit = false
        }

        if (newFile && oldFile) {
          // 更新文件
          that.$vux.loading.show({
            text: `开始上传${type}`
          })
          // that.updateFile = newFile
          // 开始上传
          if (newFile.active !== oldFile.active) {
            console.log('Start upload', newFile.active, newFile)

            // 限定最小字节
            if (newFile.size >= 0 && newFile.size < minSize) {
              newFile = this.$refs[type].update(newFile, {error: 'minSize'})
            }
          }

          // 上传进度
          if (newFile.progress !== oldFile.progress) {
            console.log('progress', newFile.progress, newFile)
            that.$vux.loading.show({
              text: `${type}-${+oldFile.progress}%`
            })
          }

          // 上传错误
          if (newFile.error !== oldFile.error) {
            console.log('error', newFile.error, newFile)
            that.$vux.loading.hide()
            if (newFile.error === 'size') {
              let size = that.files[type].size || that.files.config.size
              that.$vux.toast.text(`请上传图片大小不超过${size / 1024 / 1024}M`)
            } else if (newFile.error === 'minSize') {
              that.$vux.toast.text(`上传图片大小不得低于最小字节${minSize}`)
            } else {
              that.$vux.loading.show({
                text: `${type}上传错误`,
              })
            }
            setTimeout(() => {
              that.$vux.loading.hide()
            }, 1000)
            that.$refs[type].clear()
          }

          // 上传成功
          if (newFile.success !== oldFile.success) {
            that.$vux.loading.hide()
            console.log('success', newFile.success, newFile)
            // 获得相应数据
            console.log('response', newFile.response)
            if (newFile.xhr) {
              //  获得响应状态码
              console.log('status', newFile.xhr.status, newFile.xhr)
              if (newFile.xhr.status === 200) {
                let data = newFile.xhr.response
                if (that.$azm.util.isJsonString(newFile.xhr.response)) {
                  data = JSON.parse(newFile.xhr.response)
                }
                let code = +data.code
                if (code === 2000) {
                  that.$vux.loading.show({
                    text: `${type}上传成功`,
                  })
                } else {
                  that.$vux.loading.show({
                    text: `${type}上传错误`,
                  })
                  that.$vux.toast.text(data.message)
                  that.$refs[type].clear()
                }
                setTimeout(() => {
                  that.$vux.loading.hide()
                }, 1000)
              }
            }
          }
        }

        if (!newFile && oldFile) {
          // 删除文件
          that.$refs[type].clear()
          // 自动删除 服务器上的文件
          if (oldFile.success && oldFile.response.id) {
            // $.ajax({
            //   type: 'DELETE',
            //   url: '/file/delete?id=' + oldFile.response.id,
            // });
          }
        }

        // 自动上传
        if (that.files[type].uploadAuto && (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error)) {
          if (!that.$refs[type].active) {
            that.$refs[type].active = true
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
          newFile.url = this.getObjectURL(newFile.file)
        }
      },
      startUpload (type) {
        let that = this,
          $refs = that.$refs
        if (!$refs[type] || !$refs[type].active) {
          $refs[type].active = true
        }
      },
      getObjectURL (file) {
        var url = null
        if (window.createObjectURL != undefined) {
          url = window.createObjectURL(file)
        } else if (window.URL != undefined) {
          url = window.URL.createObjectURL(file)
        } else if (window.webkitURL != undefined) {
          url = window.webkitURL.createObjectURL(file)
        }
        return url
      },
      submit () {
        let files = this.files
        if (files.logo.imageUrl && files.License.imageUrl) {
          this.routerReplace('/me/businessModel')
        } else {
          this.$vux.toast.text('请填写证照信息')
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
          height: 136px;
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
      .avatar-upload {
        position: relative;
        .p-2 {
          position: relative;
          .azm-addFiles {
            position: absolute;
            z-index: 100;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          }
        }
      }
    }
    .avatar-upload {
      box-sizing: border-box;
      margin-bottom: 25px;
      padding: 25px 25px 0;
      p {
        line-height: 25px;
        &:nth-child(1) {
          font-weight: 600;
          font-size: 15px;
        }
        &:nth-child(2) {
          margin-bottom: 5px;
        }
      }
    }
    footer {
      position: fixed;
      bottom: 0;
      left: 25px;
      right: 25px;
      button {
        margin-bottom: 25px;
        font-size: 15px;
        line-height: 45px;
      }
    }
  }
</style>
