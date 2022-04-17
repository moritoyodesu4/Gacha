<template>
  <div
    class="check-box"
    :class="{ active: isChecked}"
    @click.stop="handleCheckBoxClick"
  >
    <i class="far fa-check"></i>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',

  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleCheckBoxClick() {
      this.$emit('handleCheckBoxClick');
    },
  },
};
</script>

<style lang="scss" scoped>
.check-box{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $white;
  border-radius: 3px;
  border: solid 1px $deepGray;
  .fa-check{
    color: $lightGray;
  }
  &.active{
    background: $redGradient;
    .fa-check{
      color: $white;
    }
  }
}
</style>
