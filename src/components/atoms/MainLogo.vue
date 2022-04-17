<template>
  <div class="main_logo">
    <div class="circle" @click="go_top">
      <img src="/img/menu_logo.png">
    </div>
    <img class="sp_logo" src="/img/sp_logo.png" @click="go_top">
  </div>
</template>

<script>
export default {
  methods: {
    go_top() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.main_logo {
  position: fixed;
  z-index: 10000;
  left: -110px;
  top: -130px;
  .circle {
    background-color: $deepGray;
    width: 310px;
    height: 310px;
    border-radius: 200px;
    position: relative;
    cursor: pointer;
    img {
      width: 120px;
      position: absolute;
      bottom: 40px;
      right: 60px;
    }
  }
  .sp_logo {
    display: none;
  }
}
@media screen and  (max-width: $tabletWidth) {
  .main_logo {
    position: initial;
    .circle {
      display: none;
    }
    .sp_logo {
      display: block;
    }
  }
}
</style>
