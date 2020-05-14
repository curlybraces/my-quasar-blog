<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-lg-4 col-md-6 col-xs-12" v-for="(a, index) in articlesData" :key="index">
        <q-card>
          <q-img :src="a.articleCover">
            <div class="absolute-bottom">
              <div
                class="text-h6"
                style="cursor:pointer"
                @click="goToArticleById(a.articleId)"
              >{{ a.articleTitle }}</div>
            </div>
          </q-img>

          <q-card-actions align="between">
            <div class="text-subtitle2">
              <q-icon name="event" size="xs" />
              {{ a.articleDate }}
            </div>
            <div class="text-subtitle2">
              <q-icon name="tag" size="xs" />
              {{ a.articleTag }}
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { AV, Query } from "../api/api";
export default {
  name: "PageIndex",
  data() {
    return {
      articlesData: [],
      slide: "style",
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo."
    };
  },
  created() {
    let data = [];
    const query = new AV.Query("article");
    query.select(["articleCover", "articleTitle", "articleTag"]);
    query.find().then(res => {
      for (let i of res) {
        data["articleTitle"] = i.get("articleTitle")
        data["articleCover"] = i.get("articleCover")
        data["articleTag"] = i.get("articleTag")
        data["articleDate"] = JSON.stringify(i.get("createdAt")).substring(1, 11);
        data["articleId"] = i.id;
        this.articlesData.push(data);
        data =  []
      }
    });
  },
  methods: {
    goToArticleById(article_id) {
      this.$router.push("/article/" + article_id);
    }
  }
};
</script>
