<template>
  <div
    class="round-button outer"
    :class="isSub ? 'sub' : 'main'"
    @click.stop="handleRoundBtnClick"
  >
    <v-btn class="inner">
      <span class="text">
        <slot></slot>
      </span>
    </v-btn>
  </div>
</template>

<script>

export default {
  name: 'RoundButton',

  props: {
    isSub: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleRoundBtnClick() {
      this.$emit('handleRoundBtnClick');
    },
  },
};
</script>

<style lang="scss" scoped>
.round-button{
  border-radius: 100%;
  padding: 1px;
  background: $goldGradient;
  .v-btn.inner{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-width: 21px;
    padding: 0px;
    background: $redGradient;
    border-radius: 100%;
    box-shadow: none;
    .text{
      font-family: $notoSans;
      font-weight: 700;
      color: $white;
      line-height: 1;
    }
  }
  &.sub{
    background: $silverGradient;
    .v-btn.inner{
        background: $grayGradient;
    }
  }
}
</style>
