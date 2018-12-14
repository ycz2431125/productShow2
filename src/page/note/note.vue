<template>
  <div>
    <cubePage
      :title="title"
      icon="1"
      @rightIconClick="riClick">
      <div slot="content" class="content-wrap" id="content">
        <search @inputValue="searchWordGet"></search>
        <div class="scroll-list-wrap" :style="{height:height}">
          <cube-scroll ref="scroll"
                       :data="noteList"
                       @pulling-down="onPullingDown"
                       @pulling-up="onPullingUp"
                       :options="options">
            <ul class="note-list-wrap">
              <li class="note-list-item" v-for="note in noteList">
                <h5 class="note-list-item-title">
                  {{note.title}}
                </h5>
                <div class="note-list-item-from">
                  {{note.writerInfo.name}} <span style="padding: 0 4px"></span> {{note.createTime}}
                </div>
              </li>
            </ul>
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
        }
      }
    },
    methods: {
      onPullingDown() {
        this.getNotList();
      },
      onPullingUp() {
        this.getNotList(false, true);
      },
      riClick() {
        this.$createActionSheet({
          // title: '设置',
          // active: 0,
          data: [
            {
              content: '添加日志',
            },
            {
              content: '编辑日志',
            },
          ],
          onSelect: (item, index) => {
            let path = {
              0: "/note/addNote",
              1: "",
            }[index];
            gl.methods.goPath(path);
            console.log(index);
          }
        }).show()
      },
      getNotList(refresh = true, loadMore = false , search = false) {

        if (refresh) {
          this.keyWord = "";
          this.page = 1;
          this.size = 10;
        }

        if (loadMore) {
          this.page = this.page + 1;
        }

        let ad = {
          title: this.keyWord,
          page: this.page,
          size: this.size,
        };

        gl.ajax.request("/getNoteList", ad).then(v => {
          let list = v.data;

          if (!list.length) {
            this.scrollEnd();
          }

          if (refresh || search) {
            this.noteList = list;
            console.log(this.noteList);
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
        gl.methods.deBounce(()=>{
          this.getNotList(false, false,true)
        }, 200);
      },
      scrollEnd() {
        this.$refs.scroll.forceUpdate();
      }
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
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../scss/common";

  .note-list-wrap {
    .note-list-item {
      height: 70px;
      padding: 12px 10px;
      width: 100%;
      border-bottom: 1px solid #d8d8d8;
      background: #fff;
      box-sizing: border-box;
      &:last-child {
        border: none;
      }
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
    }
  }
</style>

