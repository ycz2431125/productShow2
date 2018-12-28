<template>
  <div class="list-item" ref="item">
    <div class="list-item-wrap" ref="scrollWrap">
      <div class="list-scrollWrap"
           @touchstart="itemTouchStart"
           @touchmove="itemTouchMove"
           @touchend="itemTouchEnd">
      </div>
      <!--内容插槽-->
      <slot name="content"></slot>
    </div>
    <!--滑动按钮-->
    <div class="list-item-slideArea"
         v-if="slideBtn.length"
         :style="{right:-eleWidth + 'px',width: eleWidth + 'px'}">
      <div class="note-list-item-slideArea-btn"
           v-for="btn in slideBtn"
           :style="{backgroundColor:btn.bc,lineHeight:divHeight + 'px'}"
           @click="slideBtnClick(btn)">
        {{btn.txt}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      slideBtn: {
        default: [],//{txt:'',value:'',bc:"#3f51b5" 背景色 默认红色}
      },
    },
    data() {
      return {
        initX: 0,
        eleX: 0,
        eleWidth: 60,
        divHeight: 0
      }
    },
    created() {
      this.eleWidth = this._props.slideBtn.length * 60;
    },
    mounted() {
      this.divHeight = this.$refs.item.clientHeight;
    },
    methods: {
      itemTouchStart(event) {
        let el = event.target.parentNode;
        this.initX = event.targetTouches[0].pageX;
        this.objX = el.style.WebkitTransform
          .replace(/translateX\(/g, '')
          .replace(/px\)/g, '') * 1;
        if (this.objX === 0) {
          this.slideBtnMove();
        }
      },
      itemTouchMove(event) {
        let moveX = event.targetTouches[0].pageX; // 滑动时的位置
        let X = 0;
        X = moveX - this.initX;
        if (this.objX === 0) {
          if (X >= 0) {
            this.slideBtnMove();
          }
          else if (X < 0) {
            let l = Math.abs(X);
            this.slideBtnMove(-l);
            if (l > this.eleWidth) {
              l = this.eleWidth;
              this.slideBtnMove(-l);
            }
          }
        }
        if (this.objX < 0) {
          if (X >= 0) {
            let r = -this.eleWidth + Math.abs(X);
            this.slideBtnMove(r);
            if (r > 0) {
              r = 0;
              this.slideBtnMove(r);
            }
          } else {
            // 向左滑动
            this.slideBtnMove(-this.eleWidth);
          }
        }
      },
      itemTouchEnd(event) {
        let el = event.target.parentNode.parentNode;
        let minX = this.eleWidth / 2;
        this.objX = el.style.WebkitTransform
          .replace(/translateX\(/g, '')
          .replace(/px\)/g, '') * 1;
        if (this.objX > -minX) {
          this.slideBtnMove();
          this.objX = 0;
        }
        else {
          this.slideBtnMove(-this.eleWidth);
          this.objX = -this.eleWidth;
        }
      },
      slideBtnClick(btn) {
        this.$emit("slideBtnClick", btn);
      },
      slideBtnMove(move = 0) {
        // 父组件调用
        // slideBtnClick(btn,ref){
        // this.$refs[ref][0].slideBtnMove();
        // },
        this.$refs.scrollWrap.parentNode.style.WebkitTransform = `translateX(${move}px)`;
      }
    },
  }
</script>

<style scoped lang="scss">
  .list-item {
    width: 100%;
    padding: 2px 0;
    border-bottom: 1px solid #d8d8d8;
    background: #fff;
    box-sizing: border-box;
    transition: all .2s;
    position: relative;
    .list-item-wrap {
      padding: 12px 10px;
      height: 100%;
      box-sizing: border-box;
      position: relative;
      .list-scrollWrap {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
      }
    }
    &:last-child {
      border: none;
    }
    .list-item-slideArea {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      background: #0b97c4;
      display: flex;
      .note-list-item-slideArea-btn {
        text-align: center;
        width: 60px;
        height: 100%;
        color: #fff;
        font-size: 13px;
        background-color: #ff543e;
      }
    }
  }
</style>

<!--使用实例-->
<!--<slideDelete v-for="item in noteList" :slideBtn="slideBtn">-->
<!--<div slot="content">-->
<!--<h5 class="note-list-item-title">-->
<!--{{item.title}}-->
<!--</h5>-->
<!--<div class="note-list-item-from">-->
<!--{{item.writerInfo.name}} <span style="padding: 0 4px"></span> {{item.createTime}}-->
<!--</div>-->
<!--</div>-->
<!--</slideDelete>-->
