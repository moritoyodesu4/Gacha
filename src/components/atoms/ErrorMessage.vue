<template>
  <div class="error-message">
    <span class="message">{{message}}</span>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',

  props: {
    message: {
      type: String,
      default: '不正な値です。',
    },
  },
};
</script>

<style lang="scss" scoped>
.error-message{
  text-align: left;
  font-family: "Noto Sans JP", sans-serif;
  font-size: 16px;
  line-height: 1.8;
  color: $red;
}
</style>
