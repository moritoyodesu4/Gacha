<template>
  <div class="leaf">
    <div class="leaf_top">
      <hr>
    </div>
    <div class="leaf_area" :class="{isColumn: isColumn}">
      <slot></slot>
    </div>
    <div class="leaf_bottom">
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isColumn: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.leaf {
  background-color: #fffbf2;

  .leaf_top {
    width: 100%;
    position: relative;
    padding: 13px 35px 0 35px;

    hr {
      border: solid 1px #6c5f54;
    }

    &:before {
      content: '';
      background-image: url('/img/mark_lefttop.png');
      width: 25px;
      height: 24px;
      position: absolute;
      background-size: 100%;
      top: 10px;
      left: 10px;
    }

    &:after {
      content: '';
      background-image: url('/img/mark_righttop.png');
      width: 25px;
      height: 24px;
      position: absolute;
      background-size: 100%;
      top: 10px;
      right: 10px;
    }
  }

  .leaf_area {
    padding: 20px 30px;
    position: relative;
    display: flex;
    flex-wrap: wrap;

    &:before {
      content: '';
      position: absolute;
      top: 15px;
      bottom: 0;
      left: 14px;
      width: 2px;
      background-color: #6c5f54;
    }

    &:after {
      content: '';
      position: absolute;
      top: 15px;
      bottom: 0;
      right: 14px;
      width: 2px;
      background-color: #6c5f54;
    }
  }

  .leaf_bottom {
    width: 100%;
    position: relative;
    padding: 20px 35px 0 35px;
    background-color: #fffbf2;
    height: 30px;

    hr {
      border: solid 1px #6c5f54;
    }

    &:before {
      content: '';
      background-image: url('/img/mark_leftbottom.png');
      width: 25px;
      height: 24px;
      position: absolute;
      background-size: 100%;
      top: 0;
      left: 10px;
    }

    &:after {
      content: '';
      background-image: url('/img/mark_rightbottom.png');
      width: 25px;
      height: 24px;
      position: absolute;
      background-size: 100%;
      top: 0;
      right: 10px;
    }
  }
}
@media screen and  (max-width: $tabletWidth) {
  .leaf {
    .isColumn {
      flex-direction: column;
    }
  }
}
</style>
