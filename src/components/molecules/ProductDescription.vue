<template>
  <div class="product-description">
    <span class="description-title">{{title}}</span>
    <span class="description">{{description}}</span>
    <span class="link_area">
      <span @click="page('/specific-commerce')">特定商取引法について</span>
    </span>
  </div>
</template>

<script>

export default {
  name: 'ProductDescription',

  props: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },

  components: {
  },

  methods: {
    page(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.product-description{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 19px 14px;
  width: 100%;
  .description-title{
    font-family: $notoSerif;
    font-size: 18px;
    font-weight: 500;
    color: $deepGray;
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
    border-bottom: solid 1px $deepGray;
  }
  .description{
    margin-top: 20px;
    font-family: $notoSans;
    font-size: 13px;
    color: $deepGray;
    line-height: 23px;
    white-space: pre-wrap;
    width: 100%;
    padding: 0 20px;
  }
  .link_area {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    border-top: solid 1px $deepGray;
    padding: 20px 10px;
    width: 100%;
    text-align: center;
    span {
      color: $blue;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
@media screen and (max-width: $tabletWidth) {
  .link_area {
    flex-direction: column;
    span {
      margin: 10px 0;
    }
  }
}
</style>
