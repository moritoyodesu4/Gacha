<template>
  <div
    class="skip-button"
    @click.stop="handleSkipClick"
  >
    <span class="text">{{text}}<i class="fas fa-caret-right"></i></span>
  </div>
</template>
<script>
export default {
  name: 'SkipButton',

  props: {
    text: {
      type: String,
      default: 'SKIP',
    },
  },

  methods: {
    handleSkipClick() {
      this.$emit('handleSkipClick');
    },
  },
};
</script>

<style lang="scss" scoped>
.skip-button{
  font-family: $notoSerif;
  font-size: 24px;
  font-weight: 700;
  color: $white;
  .text{
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 400;
    .fa-caret-right{
      width: 7px;
      height: 18px;
      margin-left: 8px;
    }
  }
}
</style>
