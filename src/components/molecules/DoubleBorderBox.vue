<template>
  <div class="double-border-box outer-border" @click.stop="handleClickDoubleBorderBox">
    <div class="border-margin">
      <div class="inner-border">
        <div class="inner">
          <i class="icon fal" :class="iconClassName"></i>
          <span class="text">{{text}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoubleBorderBox',

  props: {
    iconClassName: {
      type: String,
    },
    text: {
      type: String,
    },
  },

  methods: {
    handleClickDoubleBorderBox() {
      this.$emit('handleClickDoubleBorderBox');
    },
  },
};
</script>

<style lang="scss" scoped>
.double-border-box{
  padding: 2px;
  .border-margin{
    width: 100%;
    height: 100%;
    padding: 2px;
    background-color: $deepGray;
    .inner-border{
      width: 100%;
      height: 100%;
      padding: 1px;
      .inner{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-color: $deepGray;
        color: $white;
        .icon{
          font-size: 22px;
        }
        .text{
          margin-top: 7px;
          font-family: $notoSans;
          font-size: 10px;
        }
      }
    }
  }
}
</style>
