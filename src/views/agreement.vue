<template>
  <div class="shopping-agreement">
    <h4 class="title shopping-s-title">{{news.name}}</h4>
    <div class="content shopping-s-title" v-html="news.details"></div>
  </div>
</template>

<script>
import { dynamicNews } from "../api/base";
export default {
  data () {
    return {
      news: {}
    }
  },
  created () {
    this.getContent()
  },
  methods: {
    getContent () {
      dynamicNews({
        location: this.$route.params.id
      }).then(res => {
        this.news = res.data.data[0]
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.shopping-agreement {
  max-width: 1200px;
  margin: 20px auto;
  .title{
    padding: 20px 0;
  }
  .content {
    color: $fc-main;
    margin-top: 20px;
    line-height: 30px;
  }
}
</style>