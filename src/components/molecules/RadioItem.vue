<template>
  <label class="radio-item">
    <RadioButton
      class="radio-btn"
      :paymentId="paymentId"
      :isChecked="isChecked"
      @handleRadioBtnClick="handleRadioBtnClick"
    />
    <span class="name">{{name}}</span>
    <span class="note">{{memo}}</span>
  </label>
</template>

<script>
import RadioButton from '@/components/atoms/RadioButton.vue';

export default {
  name: 'RadioItem',

  components: {
    RadioButton,
  },

  props: {
    paymentId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
    },
    memo: {
      type: String,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleRadioBtnClick(paymentId) {
      this.$emit('handleRadioBtnClick', paymentId);
    },
  },
};
</script>

<style lang="scss" scoped>
.radio-item{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-family: $notoSans;
  color: $deepGray;
  .radio-btn{
    width:20px;
    height:20px;
  }
  .name{
    margin-left: 10px;
    font-size: 14px;
    line-height: 20px;
  }
  .note{
    margin-left: 10px;
    font-size: 10px;
    color: $blue;
  }
}
</style>
