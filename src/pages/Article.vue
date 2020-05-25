<template>
  <q-page padding>
    <div class="row article-container">
      <div v-html="content" class="col-xs-12 col-md-8 q-mx-auto q-mb-lg"></div>
    </div>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn dense icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </q-page>
</template>

<script>
// import { markedxx } from "../marked/marked";
import { AV, Query } from "../api/api";
import "../css/markdown.css"
// import "highlight.js/styles/dracula.css"
import "../css/github.css"

const hljs = require('highlight.js');
const md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

export default {
  name: "PageArticle",
  data() {
    return {
      content: "",
      // test: res
    };
  },
  
  mounted() {
    const query = new AV.Query("article");
    query.select(["articleContent"]);
    query.get(this.$route.params.article_id).then(res => {
      this.content = md.render(res.attributes.articleContent);
      console.log(this.content)
    });
  }
};
</script>
