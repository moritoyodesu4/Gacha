<template>
  <div
    class="square-button outer "
    :class="isSub ? 'sub' : 'main'"
    @click.stop="handleSquareBtnClick"
  >
    <v-btn class="inner" :class="{max_width:isMaxWidth}">
      <span class="text">{{ text }}</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'SquareButton',

  props: {
    isSub: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
    },
    isMaxWidth: {
      type: Boolean,
      default: false,
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
.square-button{
  padding: 2px;
  border-radius: 4px;
  .v-btn.inner{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 4px;
    background: $redGradient;
    box-shadow: none;
    .text{
      font-family: $notoSans;
      font-weight: normal;
      color: $yellow;
    }
  }
  &.sub{
    background: $gray;
    color: $white;
    .v-btn.inner{
        background: $gray!important;
    }
  }
  .v-btn.max_width {
    max-width: 240px;
  }
}
</style>
