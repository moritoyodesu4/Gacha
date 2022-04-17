<template>
  <div
    class="shadow-box"
    :class="opacity"
    @click="handleClickShadowBox"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ShadowBox',

  props: {
    opacity: {
      type: String,
      default: '_65',
    },
  },

  methods: {
    handleClickShadowBox() {
      this.$emit('handleClickShadowBox');
    },
  },
};
</script>

<style lang="scss" scoped>
.shadow-box{
  display: flex;
  justify-content: center;
  align-items: center;
  //border-radius: 4px;
  //&._50{
  //  background-color: $shadowBlack_50;
  //}
  //&._60{
  //  background-color: $shadowBlack_60;
  //}
  //&._65{
  //  background-color: $shadowBlack_65;
  //}
}
</style>
