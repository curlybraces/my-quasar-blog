<template>
  <q-layout view="hHh Lpr lFf" class="my-font">
    <q-header reveal elevated>
      <q-toolbar class="bg-white text-primary">
        <!-- <q-btn flat label="Xuerzong" /> -->
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-btn flat no-caps no-wrap to="/">
          <q-toolbar-title shrink class="text-weight-bold text-primary">Xu Erzong</q-toolbar-title>
        </q-btn>

        <q-space/>
        
        <q-btn dense flat round :icon="gitIcon" @click="goToGithub"></q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
        v-model="drawer"
        show-if-above
        :width="300"
        :breakpoint="800"
      >
        <!-- <q-scroll-area style="height: calc(100% - 200px); margin-top: 200px; border-right: 1px solid #ddd"> -->
          <q-list padding class="text-weight-bold" style="height: calc(100% - 200px); margin-top: 200px; border-right: 1px solid #ddd">
            <q-item clickable v-ripple to="/" exact>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section>
                主页
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/about" exact>
              <q-item-section avatar>
                <q-icon name="info" />
              </q-item-section>

              <q-item-section>
                关于
              </q-item-section>
            </q-item>
            
          </q-list>
        <!-- </q-scroll-area> -->

        <div class="absolute-top bg-white"  style="height: 200px;border-right: 1px solid #ddd">
          <div class="absolute-center text-center text-white">
            <q-avatar size="100px" class="q-mb-sm shadow-2">
              <img src="http://cdn.xuerzong.cn/avatar.png">
            </q-avatar>
            <div class="text-weight-bold text-h6 text-primary">Xu Erzong</div>
          </div>
        </div>
      </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { fabGithub } from "@quasar/extras/fontawesome-v5";
export default {
  name: "MainLayout",
  data() {
    return {
      drawer: false,
      gitIcon: fabGithub,
      tab: "mail"
    };
  },

  methods: {
    goToGithub() {
      window.location.href='http://github.com/xuerzong'
    }
  }
};
</script>

<style>
.my-toolbar {
  height: 64px;
}
</style>