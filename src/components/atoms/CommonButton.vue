<template>
    <a class="btn_common" @click.prevent="handleCommonBtnClick">
      <span class="text">{{ text }}</span>
    </a>
</template>

<script>
export default {
  name: 'CommonButton',

  props: {
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
$black: #2A2A2A;
.btn_common{
  padding: 2px;
  border-radius: 4px;
  color: white;
  box-shadow: none;
  padding: 12px 45px;
  height: auto;
  border-radius: 20px;
  &.bg-red{
    background-color: #E8102B;
    &_dark{
      background-color: #BF101E;
    }
  }
  &.bg-black{
    background-color: $black;
  }
  &.bg-white{
    background-color: white;
    border: 2px solid $black;
    color: $black;
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
