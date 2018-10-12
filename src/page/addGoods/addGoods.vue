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
        title: "添加商品",
        validity: {},
        valid: undefined,
        model: {
          inputValue: '',
          price: '',
          textareaValue: '',
          uploadValue: []
        },
        schema: {
          groups: [
            {
              fields: [
                {
                  type: 'input',
                  modelKey: 'inputValue',
                  label: '商品名称',
                  props: {
                    placeholder: '请输入商品名称'
                  },
                  rules: {
                    required: true
                  },
                  trigger: 'blur'
                },
                {
                  type: 'textarea',
                  modelKey: 'textareaValue',
                  label: '商品描述',
                  rules: {
                    required: true
                  },
                  props: {
                    placeholder: '请输入商品描述'
                  },
                  trigger: 'blur'
                },
                {
                  type: 'input',
                  modelKey: 'price',
                  label: '商品价格',
                  props: {
                    placeholder: '请输入商品价格',
                    type: 'number',
                  },
                  rules: {
                    required: true
                  },
                  trigger: 'blur'
                },

              ]
            },
            {
              fields: [
                {
                  props:{
                    primary:true
                  },
                  type: 'submit',
                  label: '添加'
                },
                {
                  type: 'button',
                  props:{
                    outline:true
                  },
                  label: '取消'
                }
              ]
            }
          ]
        },
        options: {
          scrollToInvalidField: true,
          layout: 'standard' // standard fresh
        }
      }
    },
    methods: {
      submitHandler(e) {
        e.preventDefault()
        console.log('submit', e)
      },
      validateHandler(result) {
        this.validity = result.validity
        this.valid = result.valid
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


