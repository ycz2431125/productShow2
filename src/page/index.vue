<template>
  <div>
    <cubePage
      type="scroll-nav-side"
      icon="1"
      @rightIconClick="riClick"
      :title="title"
    >
      <div slot="content">
        <div class="view-wrapper">
          <cube-scroll-nav
            :side="true"
            :data="goods"
            :current="current">
            <cube-scroll-nav-panel
              v-for="item in goods"
              :key="item.name"
              :label="item.name"
              :title="item.name">
              <ul>
                <li v-for="food in item.foods">
                  <div>
                    <img :src="food.icon">
                    <p class="p">{{food.name}}</p>
                    <p class="fp">￥{{food.price}}</p>
                  </div>
                </li>
              </ul>
            </cube-scroll-nav-panel>
          </cube-scroll-nav>
        </div>
      </div>
    </cubePage>
    <cubeView></cubeView>
  </div>

</template>

<script>
  import cubePage from "../components/cube-page";
  import cubeView from "../components/cube-view";
  import goodsData from '../data/goods-list.json'

  let gd = goodsData.goods;

  export default {
    data() {
      return {
        title: "王者小店",
        current: "",
        picker: false,
        goods: gd
      }
    },
    methods: {
      showToast() {
        this.$createToast({
          txt: "123"
        }).show()
      },
      riClick() {
        this.$createActionSheet({
          title: '设置',
          active: 0,
          data: [
            {
              content: '添加商品',
            },
            {
              content: '编辑商品',
            },
          ],
          onSelect: (item, index) => {
            let path = {
              0:"index/addGoods",
              1:"",
            }[index];
            window.methodsGloble.goPath(path);
            console.log(index);
          }
        }).show()
      }
    },
    created() {
      global.ajax.request("/demo");
    },
    components: {
      cubePage,
      cubeView,
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>

