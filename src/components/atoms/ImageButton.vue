<template>
    <a class="btn_image" @click.prevent="handleBtnClick">
      <img v-bind:src=image_url>
      <span class="text">{{ text }}</span>
    </a>
</template>

<script>
export default {
  name: 'ImageButton',

  props: {
    image_url: {
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
    width: 94px;
    height: 94px;
    border-radius: 30px;
    border: 2px solid #2A2A2A;
    padding: 5px;
    text-align: center;
    background-color: white;
    margin: 5px 9px;
    img{
      display: block;
      margin: 10px auto 0;
    }
    span {
      text-align: center;
      font-size: 16px;
      color: #2A2A2A;
    }
    &.font-vdl{
      font-family: $vdlGothic;
    }
    &.font-han{
      font-family: $sourceHan;
    }
    &.font-co{
      font-family: $coHead;
    }
}
</style>
