<template>
  <div :class="['text-box', { readonly }]">
    <slot name="left"></slot>
    <input
      class="text"
      :type="inputType"
      :value="value"
      @input="handleTextInput($event.target.value)"
      @change="handleTextChange"
      :placeholder="placeholder"
      :readonly="readonly"
      :maxlength="maxlength"
    >
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: 'TextBox',

  props: {
    inputType: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
    },
    placeholder: {
      type: String,
      default: '入力してください',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: String,
      default: '',
    },
  },
  model: {
    prop: 'value',
    event: 'change-value',
  },

  methods: {
    handleTextInput(text) {
      this.$emit('change-value', text);
      this.$emit('handleTextInput', text);
    },
    handleTextChange() {
      this.$emit('handleTextChange');
    },
    inputData(val) {
      this.$emit('change-value', val);
    },
  },
};
</script>

<style lang="scss" scoped>
.text-box{
  display: flex;
  width: 100%;
  padding: 7px 10px;
  background-color: $white;
  border: solid 2px #2a2a2a;
  border-radius: 2px;
  &.readonly{
    background-color: $disabledGray;
  }
  .text{
    width: 100%;
    flex: 1 1 100%;
    font-family: $kozukaM;
    font-size: 14px;
    line-height: 20px;
    outline: none;
    &::placeholder{
      color: $gray;
    }
  }
}
</style>
