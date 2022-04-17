<template>
  <div class="common-overlay" @click.stop="handleOverlayClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CommonOverlay',

  methods: {
    handleOverlayClick() {
      this.$emit('handleOverlayClick');
    },
  },
};
</script>

<style lang="scss" scoped>
.common-overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: $shadowBlack_50;
}
</style>
