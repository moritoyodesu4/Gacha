<template>
  <div class="point-course">
    <ShadowBox
      class="shadow-box"
      opacity="_60"
    >
      <div class="point-area">
        <span class="point">{{ point | comma }}</span>
<!--        <span class="point-service" v-if="bonusPoint > 0">-->
<!--          {{point | comma}}P + おまけ{{bonusPoint | comma}}P-->
<!--        </span>-->
      </div>
      <span class="value">¥{{price | comma}}</span>
      <BlackGradationButton
        text="購入する"
        @handleSquareBtnClick="handleBuyBtnClick"
      />
      <div class="memo">{{memo}}</div>
    </ShadowBox>
  </div>
</template>

<script>
import {
  separateCharacterNumber,
} from '@/common/util/format';

import ShadowBox from '@/components/atoms/ShadowBox.vue';
// import SquareButton from '@/components/atoms/SquareButton.vue';
import BlackGradationButton from '@/components/atoms/BlackGradationButton.vue';

export default {
  name: 'PointCourse',

  components: {
    ShadowBox,
    // SquareButton,
    BlackGradationButton,
  },

  filters: {
    comma(value) {
      return separateCharacterNumber(parseInt(value, 10));
    },
  },

  props: {
    point: {
      type: String,
    },
    price: {
      type: String,
    },
    memo: {
      type: String,
    },
  },

  computed: {
    bonusPoint() {
      const bonusPoint = parseInt(this.point, 10) - parseInt(this.price, 10);
      return separateCharacterNumber(bonusPoint);
    },
  },

  methods: {
    handleBuyBtnClick() {
      this.$emit('handleBuyBtnClick');
    },
  },
};
</script>

<style lang="scss" scoped>
.point-course{
  text-align: left;
  width: 50%;
  .shadow-box{
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 10px;
    font-family: $notoSans;
    font-size: 20px;
    flex-wrap: wrap;
    .point-area{
      display: flex;
      flex-wrap: wrap;
      .point{
        font-weight: 700;
        line-height: 29px;
        color: #705d53;
        &:before {
          content: "P";
          width: 30px;
          height: 30px;
          border-radius: 100px;
          background-color: $yellow;
          margin-right: 10px;
          color: $deepGray;
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }
      }
      .point-service{
        font-size: 12px;
      }
    }
    .value{
      margin-left: auto;
      font-weight: 700;
      color: #705d53;
      margin-right: 20px;
    }
    .square-button{
      width: 82px;
      height: 36px;
      margin-left: 24px;
    }
  }
}
.memo {
  width: 100%;
  margin-left: 40px;
  font-size: 12px;
  color: $red;
}
@media screen and  (max-width: $tabletWidth) {
  .point-course{
    width: 100%;
    .shadow-box {
      font-size: 16px;
      padding: 10px 0;
    }
  }
}
</style>
