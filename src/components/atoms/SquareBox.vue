<template>
  <div
    class="square-box"
    :class="{ 'active': isActive}"
    @click.stop="handleSquareBoxClick"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SquareBox',

  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleSquareBoxClick() {
      this.$emit('handleSquareBoxClick');
    },
  },
};
</script>

<style lang="scss" scoped>
.square-box{
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid $white;
  &.active{
    background-color: $white;
  }
}
</style>
