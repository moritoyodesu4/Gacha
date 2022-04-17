<template>
  <div
    class="gradation"
    @click.stop="handleSquareBtnClick"
  >
    <span class="text">{{text}}</span>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: 'SKIP',
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
.gradation{
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(to bottom, #4B4438, #6e4c17 50%, #4b4439 100%);
  color: #f5c236;
  border-radius: 6px;
  padding: 8px 20px;
  cursor: pointer;
  transition: 0.4s;
  display: flex;
  justify-content: center;
  align-items: center;
  .text{
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 400;
  }
  &:hover {
    opacity: 0.6;
  }
}
@media screen and  (max-width: $tabletWidth) {
  .gradation{
    &:hover {
      opacity: 1;
    }
  }
}
</style>
