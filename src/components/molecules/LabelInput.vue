<template>
  <div class="label-input">
    <div class="label">
      <span class="text">{{labelText}}<span class="annotation">{{annotation}}</span></span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LabelInput',

  props: {
    labelText: {
      type: String,
    },
    annotation: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.label-input{
  text-align: left;
  .label{
    display: flex;
    align-items: center;
    height: 20px;
    font-family: $notoSans;
    font-size: 14px;
    line-height: 23.4px;
    color: $deepGray;
    font-family: $vdlGothic;
    font-weight: bold;
    .annotation{
      margin-left: 10px;
      font-size: 10px;
      line-height: 10px;
      color: $red;
      font-family: $kozukaM;
    }
  }
}
@media screen and (max-width: 700px) {
  .label-input {
    .label {
      height: auto;
      align-items: baseline;
      flex-direction: column;
    }
  }
}
</style>
