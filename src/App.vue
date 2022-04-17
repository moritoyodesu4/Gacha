<template>
  <v-app class='app'>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  mounted() {
    document.oncontextmenu = () => true;
  },

  watch: {
    $route() {
      window.scrollTo(0, 0);
    },
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>
.v-application--wrap {
  min-height: auto!important;
}
</style>
