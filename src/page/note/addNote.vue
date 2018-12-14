<template>
  <cubePage :title="title">
    <div slot="content">
      <!--:schema="schema"-->
      <cube-form
        :model="model"
        :immediate-validate="false"
        :schema="schema"
        :options="options"
        @validate="validateHandler"
        @submit="submitHandler"
        @reset="resetHandler">
      </cube-form>
    </div>
  </cubePage>
</template>

<script>
  import cubePage from "../../components/cube-page";
  import cubeView from "../../components/cube-view";
  import buttonGroup from "../../components/cube-button-group";
  export default {
    data() {
      return {
        title: "添加日志",
        validity: {},
        valid: undefined,
        model: {
          title: '',
          content: '',
          uploadValue: []
        },
        schema: {
          groups: [
            {
              fields: [
                {
                  type: 'input',
                  modelKey: 'title',
                  label: '日志标题',
                  props: {
                    placeholder: '请输入日志标题'
                  },
                  rules: {
                    required: true
                  },
                  trigger: 'blur'
                },
                {
                  type: 'textarea',
                  modelKey: 'content',
                  label: '日志内容',
                  props: {
                    placeholder: '请输入日志内容',
                    maxlength: 200,
                  },
                  trigger: 'blur'
                },
                // {
                //   type: 'cube-upload',
                //   modelKey: 'uploadValue',
                //   label: '上传图片',
                //   rules: {
                //     required: true,
                //     uploaded: (val, config) => {
                //       return Promise.all(val.map((file, i) => {
                //         return new Promise((resolve, reject) => {
                //           if (file.uploadedUrl) {
                //             return resolve()
                //           }
                //           // fake request
                //           setTimeout(() => {
                //             if (i % 2) {
                //               reject(new Error())
                //             } else {
                //               file.uploadedUrl = 'uploaded/url';
                //               resolve()
                //             }
                //           }, 1000)
                //         })
                //       })).then(() => {
                //         return true
                //       })
                //     }
                //   },
                //   messages: {
                //     uploaded: '上传失败'
                //   }
                // },
              ]
            },
            {
              fields: [
                {
                  props: {
                    primary: true
                  },
                  type: 'submit',
                  label: '确定'
                },
                {
                  type: 'button',
                  props: {
                    outline: true
                  },
                  label: '取消'
                }
              ]
            }
          ]
        },
        options: {
          scrollToInvalidField: true,
          layout: 'classic' // standard fresh
        },
        files: []
      }
    },
    methods: {
      addedHandler() {
        const file = this.files[0]
        file && this.$refs.upload.removeFile(file)
      },
      errHandler(file) {
        // const msg = file.response.message
        this.$createToast({
          type: 'warn',
          txt: 'Upload fail',
          time: 1000
        }).show()
      },
      submitHandler(e) {
        e.preventDefault();
        gl.ajax.request("/addNote", {
          title: this.model.title,
          content: this.model.content,
          userId: gl.data.userId,
        }, "post").then(v => {
          gl.data.bus.$emit("noteListChane",1);
          this.$createDialog({
            type: 'alert',
            title:"提示",
            content:"添加日志成功",
            onConfirm: () => {
              gl.methods.goBack();
            },
          }).show();
        })
      },
      validateHandler(result) {
        this.validity = result.validity;
        this.valid = result.valid;
        console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
      },
      resetHandler(e) {
        console.log('reset', e)
      }
    },
    created() {

    },
    components: {
      cubePage,
      cubeView,
      buttonGroup,
    }
  }
</script>


