<template>
  <div class="s-wrap">
    <div class="search-m">
      <input type="text" placeholder="搜索" class="s-input" @input="inputValue">
    </div>
  </div>
</template>

<script>
  export default {
    methods:{
      inputValue(e){
          this.$emit("inputValue",e.target.value);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/common";
  .s-wrap {
    position: relative;
    background-color: #dfdfdf;
    height: 40px;
    box-sizing: border-box;
    padding: 6px;
    .search-m {
      position: relative;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      border-radius: 13px;
      display: flex;
      align-items: center;
      padding-left: 28px;
      font-size: 14px;
      border: 1px solid #d8d8d8;
      overflow: hidden;
      background-color: #fff;
      .s-input {
        width: 100%;
        height: 100%;
        border: none;
        background-color: #fff;
      }
      &:before {
        @include iconCode("\e722");
        position: absolute;
        top: 8px;
        left: 8px;
        font-size: 16px;
        color: #949494;
      }
    }
  }
</style>
