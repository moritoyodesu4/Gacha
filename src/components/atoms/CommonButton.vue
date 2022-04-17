<template>
    <a class="btn_common" @click.prevent="handleBtnClick">
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
    handleBtnClick() {
      this.$emit('handleBtnClick');
    },
  },
};
</script>

<style lang="scss" scoped>
$black: #2A2A2A;
.btn_common{
  display: block;
  padding: 2px;
  color: white;
  box-shadow: none;
  padding: 8px 25px;
  height: auto;
  border-radius: 25px;
  font-size: 14px;
  margin-top: 15px;
  text-align: center;
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
