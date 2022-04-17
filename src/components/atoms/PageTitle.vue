<template>
  <span class="page_title">{{title}}</span>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.page_title{
  font-family: $notoSerif;
  font-size: 30px;
  font-weight: 700;
  color: $deepGray;
  margin-bottom: 40px;
  display: block;
  text-align: center;
}
@media screen and (max-width: $tabletWidth) {
  .page_title {
    margin-top: 40px;
  }
}
</style>
