<template>
  <div class="cube-page" :class="type">
    <header class="header">
      <h1>{{title}}</h1>
      <i @click="back" class="cubeic-back ic" v-if="backShow"></i>
      <i v-if="rightIcon" @click="rightIconClick" class="cubeic-right ic" :class="rightIcon"></i>
    </header>
    <div class="wrapper">
      <section v-show="desc" class="desc">
        <slot name="desc">{{desc}}</slot>
      </section>
      <main class="content">
        <slot name="content">{{content}}</slot>
      </main>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '',
        required: true
      },
      icon: {
        type: String,
        default: '0'
      },
      type: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      backShow: {
        default: true
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      rightIconClick() {
        this.$emit("rightIconClick", 1);
      }
    },
    computed: {
      rightIcon() {
        return {
          0: "",
          1: "cubeic-setting",
          2: "",
        }[this._props.icon];
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "cube-page.styl";

  .cubeic-right {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 15px;
    color: #fc9153;
  }

  .ic {
    font-size: 20px;
  }
</style>
