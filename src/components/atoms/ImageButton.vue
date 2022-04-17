<template>
    <a class="btn_image" @click.prevent="handleCommonBtnClick">
      <img src="{image}">
      <span class="text">{{ text }}</span>
    </a>
</template>

<script>
export default {
  name: 'ImageButton',

  props: {
    image: {
      type: String,
    },
    text: {
      type: String,
    },
  },

  methods: {
    handleSquareBtnClick() {
      this.$emit('handleSquareBtnClick');
    },
  },
};
</script>

<style lang="scss" scoped>
.btn_image{
  img{
    width: 94px;
    height: 94px;
  }
}
</style>
