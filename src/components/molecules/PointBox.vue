<template>
  <div class="point-box outer" @click="handlePointBoxClick">
    <div class="inner">
      <span class="point">{{point}} P</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PointBox',

  props: {
    point: {
      type: String,
      default: '0',
    },
  },

  methods: {
    handlePointBoxClick() {
      this.$emit('handlePointBoxClick');
    },
  },
};
</script>

<style lang="scss" scoped>
.point-box{
  width: 95px;
  height: 45px;
  background: $goldGradient;
  padding: 2px;
  cursor: pointer;
  .inner{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 8px;
    background-color: $black;
    .point{
      // overflow-x: scroll;
      white-space: nowrap;
      font-family: $notoSerif;
      font-size: 16px;
      font-weight: 700;
      color: $white;
    }
  }
}
</style>
