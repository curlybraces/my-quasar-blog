<template>
  <q-page padding>
    <div class="row">
      <div v-html="content" class="col-xs-12 col-md-8 q-mx-auto q-mb-lg"></div>
    </div>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn dense icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </q-page>
</template>

<script>
import { markedxx } from "../marked/marked";
// import showdown from 'showdown'
import { AV, Query } from "../api/api";
// let showdown = require('showdown')
// let converter = new showdown.Converter()
// converter.setOption('tables', true)

export default {
  name: "PageArticle",
  data() {
    return {
      content: ""
    };
  },
  mounted() {
    const query = new AV.Query("article");
    query.select(["articleContent"]);
    query.get(this.$route.params.article_id).then(res => {
      this.content = markedxx(res.attributes.articleContent);
      console.log(this.content)
    });
  }
};
</script>
