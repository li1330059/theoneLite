<template>
  <div id="app">
    <pageHeader />
    <router-view />
<!--    <mobileTabbar v-if="screenWidth <= 500" /> -->
  </div>
</template>
 
<script>
import pageHeader from "@/components/layout/header/header";
// import mobileTabbar from "@/components/layout/mobileTabbar";

export default {
  name: "App",
  data() {
    return {
      screenWidth: null,
    };
  },
  components: {
    pageHeader,
    // mobileTabbar,
  },
  mounted() {
    this.screenWidth = document.body.clientWidth;

    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth;
      })();
    };
  },
};
</script>
 
<style>
#app {
  height: 100%;
}
</style>
