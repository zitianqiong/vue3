<template>
  <router-view/>
</template>

<style>
@import './style/common.scss';
</style>
<script>
import store from "./store"

export default {
  name: 'app',
  setup() {
  },
  mounted() {
    window.onbeforeunload = (e) => {
      sessionStorage.setItem('vuexStore', JSON.stringify(store.state));
    }
  },
  created() {
    let sessionStore = sessionStorage.getItem('vuexStore');
    sessionStore && store.replaceState(JSON.parse(sessionStore));
  },
};
</script>
