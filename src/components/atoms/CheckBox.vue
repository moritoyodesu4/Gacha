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
  border: solid 2px #2a2a2a;
  .fa-check{
    color: #2a2a2a;
  }
  &.active{
    .fa-check{
      color: $white;
    }
  }
}
</style>
