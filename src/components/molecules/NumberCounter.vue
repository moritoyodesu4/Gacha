<template>
  <div class="number-counter">
    <RoundButton
      class="round-button subtract"
      :isSub="true"
      @handleRoundBtnClick="handleMinusBtnClick"
    >
      <i class='far fa-minus'></i>
    </RoundButton>
    <div class="count">
      <span>{{dispCount}}</span>
    </div>
    <RoundButton
      class="round-button add"
      @handleRoundBtnClick="handlePlusBtnClick"
    >
      <i class='far fa-plus'></i>
    </RoundButton>
  </div>
</template>

<script>
import RoundButton from '@/components/atoms/RoundButton.vue';

export default {
  name: 'NumberCounter',

  components: {
    RoundButton,
  },

  props: {
    count: {
      type: Number,
      defaut: 0,
    },
  },

  computed: {
    dispCount() {
      if (this.count < 100) {
        return `000${this.count}`.slice(-2);
      }
      return this.count;
    },
  },

  methods: {
    handleMinusBtnClick() {
      this.$emit('handleMinusBtnClick');
    },
    handlePlusBtnClick() {
      this.$emit('handlePlusBtnClick');
    },
  },
};
</script>

<style lang="scss" scoped>
.number-counter{
  display: flex;
  align-items: center;
  .round-button{
    width: 25px;
    height: 25px;
    &.add{
      margin-left: 10px;
    }
  }
  .count{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    padding: 0px 10px;
    margin-left: 10px;
    background-color: $white;
    border-radius: 2px;
    font-family: $notoSans;
    font-size: 20px;
    font-weight: 700;
    line-height: 21px;
    color: $black;
  }
}
</style>
