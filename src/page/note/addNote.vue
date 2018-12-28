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
                    placeholder: '请输入日志标题',
                    readonly: false,
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
                    readonly: false,
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
        files: [],
        id: "",
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
        if (this.id) {
          gl.ajax.request("/updateNote", {
            title: this.model.title,
            content: this.model.content,
            id: this.id,
            userId: gl.data.userId,
          }, "put").then(() => {
            gl.data.bus.$emit("noteListChane", 1);
            this.$createDialog({
              type: 'alert',
              title: "提示",
              content: "编辑日志成功",
              onConfirm: () => {
                gl.methods.goBack();
              },
            }).show();
          });
          return false;
        }
        gl.ajax.request("/addNote", {
          title: this.model.title,
          content: this.model.content,
          userId: gl.data.userId,
        }, "post").then(v => {
          gl.data.bus.$emit("noteListChane", 1);
          this.$createDialog({
            type: 'alert',
            title: "提示",
            content: "添加日志成功",
            onConfirm: () => {
              gl.methods.goBack();
            },
          }).show();
        })
      },
      validateHandler(result) {
        this.validity = result.validity;
        this.valid = result.valid;
      },
      resetHandler(e) {
        console.log('reset', e)
      }
    },
    async created() {
      this.id = this.$route.query.id || false;
      if (this.id) {
        this.title = "编辑日志";
        let detail = await gl.methods.getNoteDetail(this.id);
        this.model.title = detail.data.title;
        this.model.content = detail.data.content;
      }

    },
    components: {
      cubePage,
      cubeView,
      buttonGroup,
    }
  }
</script>


