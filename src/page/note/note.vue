<template>
  <div>
    <cubePage
      :title="title"
      icon="2"
      @rightIconClick="riClick">
      <div slot="content" class="content-wrap" id="content">
        <search @inputValue="searchWordGet"></search>
        <div class="scroll-list-wrap" :style="{height:height}">
          <cube-scroll ref="scroll"
                       :data="noteList"
                       @pulling-down="onPullingDown"
                       @pulling-up="onPullingUp"
                       :options="options">
            <div>
              <transition-group enter-active-class="animated bounceInLeft"
                                leave-active-class="animated bounceOutLeft">
                <slideDelete
                  v-for="(item,index) in noteList"
                  :slideBtn="slideBtn"
                  :key="item.id"
                  @slideBtnClick="slideBtnClick($event,index,item)"
                  :ref="index + 'note'">
                  <div slot="content">
                    <h5 class="note-list-item-title">
                      {{item.title}}
                    </h5>
                    <div class="note-list-item-from">
                      {{item.writerInfo.name}} <span style="padding: 0 4px"></span> {{item.createTime}}
                    </div>
                  </div>
                </slideDelete>
              </transition-group>
            </div>
          </cube-scroll>
        </div>
      </div>
    </cubePage>
    <cubeView></cubeView>
  </div>
</template>

<script>
  import cubePage from "../../components/cube-page";
  import cubeView from "../../components/cube-view";
  import search from "../../components/search";
  import slideDelete from "../../components/slideDelete";

  export default {
    name: "note",
    data() {
      return {
        keyWord: "",
        title: "日志管理",
        current: "",
        height: "400px",
        page: 1,
        size: 10,
        noMore: false,
        noteList: [],
        options: {
          pullDownRefresh: {
            txt: "刷新成功"
          },
          pullUpLoad: {
            threshold: 20,
            txt: {
              more: '加载成功',
              noMore: '没有更多数据'
            }
          },
        },
        slideBtn: [
          {txt: "编辑", value: 1, bc: "#3f51b5"},
          {txt: "删除", value: 2, bc: ""},
        ]
      }
    },
    methods: {
      onPullingDown() {
        this.getNotList();
      },
      onPullingUp() {
        if (this.noMore) {
          this.scrollEnd();
          return;
        }
        this.getNotList(false, true);
      },
      riClick() {
        gl.methods.goPath("/note/addNote");
        // this.$createActionSheet({
        //   // title: '设置',
        //   // active: 0,
        //   data: [
        //     {
        //       content: '添加日志',
        //     },
        //     {
        //       content: '编辑日志',
        //     },
        //   ],
        //   onSelect: (item, index) => {
        //     let path = {
        //       0: "/note/addNote",
        //       1: "",
        //     }[index];
        //     gl.methods.goPath(path);
        //   }
        // }).show()
      },
      getNotList(refresh = true, loadMore = false, search = false) {

        if (refresh) {
          this.keyWord = "";
          this.page = 1;
          this.noMore = false;
        }

        if (loadMore) {
          this.page = this.page + 1;
        }

        if (search) {
          this.page = 1;
          this.noMore = false;
        }

        let ad = {
          title: this.keyWord,
          page: this.page,
          size: this.size,
        };

        gl.ajax.request("/getNoteList", ad).then(v => {
          let list = v.data;

          if (!list.length) {
            this.noMore = true;
            this.scrollEnd();
          }

          if (refresh || search) {
            this.noteList = list;
          }

          if (loadMore) {
            let arr = this.noteList;
            list.forEach(i => {
              arr.push(i)
            });
            this.noteList = arr;
          }

        });
      },
      searchWordGet(v) {
        this.keyWord = v.trim();
        gl.methods.deBounce(() => {
          this.getNotList(false, false, true)
        }, 200);
      },
      scrollEnd() {
        this.$refs.scroll.forceUpdate();
      },
      async slideBtnClick(btn, index, note) {

        let closeSlide = () => {
          this.$refs[index + 'note'][0].slideBtnMove();
        };

        closeSlide();

        let vl = btn.value;

        switch (vl) {
          case 1:
            //编辑
            gl.methods.goPath(`/note/addNote?id=${note.id}`);
            break;
          case 2:
            //删除
            await gl.ajax.request("/deleteNote", {id: note.id},"delete");
            this.noteList.splice(index, 1);
            break;
        }

      },
    },
    created() {
      // gl.ajax.request("/demo", {demo: "demo111"});
    },
    mounted() {
      this.height = (window.innerHeight - 84) + "px";
      this.getNotList();
      gl.data.bus.$on("noteListChane", v => {
        this.getNotList();
      });
    },
    components: {
      cubePage,
      cubeView,
      search,
      slideDelete,
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../scss/common";
  .note-list-item-title {
    width: 100%;
    line-height: 1.2;
    font-size: 15px;
    font-weight: 600;
    @include wordHidden_2;
  }
  .note-list-item-from {
    font-size: 13px;
    color: #ada3a3;
    margin-top: 6px;
    text-align: left;
  }
</style>

