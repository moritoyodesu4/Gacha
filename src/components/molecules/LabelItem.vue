<template>
  <div class="label-item">
    <span class="label">{{label}}</span>
    <span class="text">{{text}}</span>
  </div>
</template>

<script>
export default {
  name: 'LabelItem',

  props: {
    label: {
      type: String,
    },
    text: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.label-item{
  display: flex;
  flex-direction: column;
  text-align: left;
  .label{
    font-family: $notoSans;
    font-size: 14px;
    line-height: 23.4px;
    color: $deepGray;
  }
  .text{
    margin-top: 10px;
    font-family: $notoSans;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.8;
    color: $deepGray;
  }
}
</style>
