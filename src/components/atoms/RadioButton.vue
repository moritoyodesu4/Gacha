<template>
  <div class="radio-btn outer" @click.stop="handleRadioBtnClick">
    <div v-show="isChecked" class="inner" />
  </div>
</template>

<script>
export default {
  name: 'RadioButton',

  props: {
    paymentId: {
      type: Number,
      required: true,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleRadioBtnClick() {
      this.$emit('handleRadioBtnClick', this.paymentId);
    },
  },
};
</script>

<style lang="scss" scoped>
.radio-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  background-color: $white;
  border:solid 1px $deepGray;
  border-radius: 100%;
  .inner{
    width: 100%;
    height: 100%;
    background: $redGradient;
    border-radius: 100%;
  }
}
</style>
