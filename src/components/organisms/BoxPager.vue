<template>
  <div class="box-pager">
    <div
      class="icon double-left"
      :class="{ 'disabled': currentPageCount === 1}"
      @click.stop="handlePagerClick(1)"
    >
      <i class="far fa-chevron-double-left" />
    </div>
    <div
      class="icon left"
      :class="{ 'disabled': currentPageCount === 1}"
      @click.stop="handlePagerClick(currentPageCount - 1)"
    >
      <i class="far fa-chevron-left" />
    </div>
    <div class="page-numbers">
      <SquareBox
        v-for="(_, index) in pagerLoopCount" :key="index"
        class="square-box"
        :class="{
          'active': restSquareBoxCount >= dispBoxCount ?
            index === 0 :
            currentPageCount === totalPageCount - dispBoxCount + 1 + index,
          'dot':
            totalPageCount > dispBoxCount &&
            index === dotIndexNumber &&
            restSquareBoxCount > dispBoxCount
          ,
        }"
        @handleSquareBoxClick="handleSquareBtnClick(index)"
      >
        <span
          v-if="
            totalPageCount > dispBoxCount &&
            restSquareBoxCount >= dispBoxCount &&
            (index + 1) === pagerLoopCount
          "
          class="text"
        >
          {{totalPageCount}}
        </span>
        <span
          v-else-if="
            (restSquareBoxCount >= dispBoxCount && index !== dotIndexNumber) ||
            restSquareBoxCount === dispBoxCount
          "
          class="text"
        >
          {{currentPageCount + index}}
        </span>
        <span
          v-else-if="
            restSquareBoxCount >= dispBoxCount &&
            index === dotIndexNumber
          "
          class="dot"
        >
          …
        </span>
        <span
          v-else-if="
            totalPageCount > dispBoxCount &&
            restSquareBoxCount < dispBoxCount
          "
          class="text"
        >
          {{totalPageCount - dispBoxCount + index + 1}}
        </span>
        <span
          v-else-if="
            totalPageCount <= dispBoxCount
          "
          class="text"
        >
          {{index + 1}}
        </span>
      </SquareBox>
    </div>
    <div
      class="icon right"
      :class="{ 'disabled': isNextDisabled}"
      @click.stop="handlePagerClick(currentPageCount + 1)"
    >
      <i class="far fa-chevron-right" />
    </div>
    <div
      class="icon double-right"
      :class="{ 'disabled': isNextDisabled}"
      @click.stop="handlePagerClick(totalPageCount)"
    >
      <i class="far fa-chevron-double-right" />
    </div>
  </div>
</template>

<script>
import SquareBox from '@/components/atoms/SquareBox.vue';

export default {
  name: 'BoxPager',

  components: {
    SquareBox,
  },

  props: {
    totalPageCount: {
      type: Number,
      default: 1,
    },
    currentPageCount: {
      type: Number,
      default: 1,
    },
    dispBoxCount: {
      type: Number,
      default: 5,
    },
    dotIndexNumber: {
      type: Number,
      default: 3,
    },
  },

  computed: {
    restSquareBoxCount() {
      return this.totalPageCount - this.currentPageCount + 1;
    },
    pagerLoopCount() {
      if (this.totalPageCount > this.dispBoxCount) {
        return this.dispBoxCount;
      }
      return this.totalPageCount;
    },
    isPrevDisabled() {
      return this.currentPageCount === 1;
    },
    isNextDisabled() {
      return this.currentPageCount === this.totalPageCount;
    },
  },

  methods: {
    handlePagerClick(pageNumber) {
      const outsideRange = pageNumber < 1 || this.totalPageCount < pageNumber;
      const startOrEnd = pageNumber === this.currentPageCount;
      if (outsideRange || startOrEnd) {
        return;
      }
      this.$emit('handlePagerClick', pageNumber);
    },
    handleSquareBtnClick(index) {
      let pageNumber = 1;
      if (this.restSquareBoxCount >= this.dispBoxCount) {
        pageNumber = this.currentPageCount + index;
      }
      pageNumber = this.totalPageCount - this.dispBoxCount + 1 + index;
      // 同一ページの場合はなにもしない
      if (pageNumber === this.currentPageCount) {
        return;
      }
      this.$emit('handleSquareBtnClick', pageNumber);
    },
  },
};
</script>

<style lang="scss" scoped>
.box-pager{
  display: flex;
  justify-content: center;
  align-items: center;
  .fa-chevron-double-left,
  .fa-chevron-left,
  .fa-chevron-double-right,
  .fa-chevron-right{
    font-size: 18px;
    line-height: 1.5;
    color: $deepGray;
  }
  .icon{
    cursor: pointer;
    &.disabled{
      opacity: 0.2;
      pointer-events: none;
    }
  }
  .icon.left{
    margin-left: 20px;
  }
  .page-numbers{
    display: flex;
    margin-left: 25px;
    .square-box{
      width: 30px;
      height: 30px;
      border: solid 1px $deepGray;
      cursor: pointer;
      .text{
        font-family: $notoSans;
        font-size: 14px;
        line-height: 27px;
        color: $deepGray;
      }
      .dot{
        color: $deepGray;
      }
      &.active{
        background-color: $deepGray;
        border: solid 1px $deepGray;
        cursor: auto;
        .text{
          color: $white;
        }
      }
      &.dot{
        border: none;
      }
      & + .square-box{
        margin-left: 10px;
      }
    }
  }
  .icon.right{
    margin-left: 25px;
  }
  .icon.double-right{
    margin-left: 20px;
  }
}
</style>
