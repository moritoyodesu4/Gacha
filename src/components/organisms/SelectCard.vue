<template>
  <div class="select-card">
    <img
      class="card"
      @click.stop="handleCardSelect"
      :src="acquiredCardItem.image"
      :alt="acquiredCardItem.name"
    >
    <div class="card-info" @click.stop="handleCardSelect">
      <div class="name">
        <div class="chkblock">
          <CheckBox
            class="check-box"
            :isChecked="isChecked"
            @handleCheckBoxClick="handleCardSelect"
          />
        </div>
        <span class="text">{{acquiredCardItem.name}}</span>
      </div>
      <div class="model-number">
        <span class="text">{{acquiredCardItem.model_number}}</span>
      </div>
      <span class="rarity">
        <span class="text">{{acquiredCardItem.rarity_label}}</span>
      </span>
    </div>
    <div class="point_area">
      還元
      <span class="point">{{acquiredCardItem.buy_point}}</span>
    </div>
  </div>
</template>

<script>
import {
  separateCharacterNumber,
} from '@/common/util/format';

import CheckBox from '@/components/atoms/CheckBox.vue';

export default {
  name: 'SelectCard',

  components: {
    CheckBox,
  },

  props: {
    acquiredCardItem: {
      type: Object,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    returnPoint() {
      return this.isChecked ? separateCharacterNumber(this.acquiredCardItem.cardPoint) : 0;
    },
  },

  methods: {
    handleCardSelect() {
      this.$emit('handleCardSelect');
    },
  },
};
</script>

<style lang="scss" scoped>
.select-card{
  display: flex;
  flex-direction: column;
  width: 130px;
  .card{
    width: 100%;
    min-width: 113px;
  }
  .card-info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    width: 100%;
    .name{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 2px 0;
      .text{
        display: inline-block;
        font-family: $notoSans;
        font-size: 12px;
        color: $deepGray;
        line-height: 1.25;
        white-space: pre-wrap;
        margin-left: 5px;
      }
    }
    .name {
      color: $deepGray;
      .check-box{
        width: 25px;
        height: 25px;
        margin: 0 auto 0;
      }
    }
    .model-number {
      margin-left: 28px;
      font-size: 9px;
      color: $deepGray;
      text-align: left;
    }
    .rarity {
      span {
        background: $redGradient;
        font-size: 12px;
        color: $yellow;
        display: inline;
        padding: 3px 8px;
        border-radius: 5px;
      }
    }
  }
  .point_area {
    font-size: 12px;
    color: $deepGray;
    display: flex;
    align-items: center;
    margin-left: 28px;
    .point {
      font-size: 20px;
      font-weight: 700;
      margin-left: 5px;
      position: relative;
      &:before {
        content: "P";
        font-size: 12px;
        width: 18px;
        height: 18px;
        border-radius: 100px;
        display:inline-flex;
        justify-content: center;
        align-items: center;
        background-color: $yellow;
        color: $deepGray;
        margin-right: 5px;
        position: relative;
        top: -2px;
      }
    }
  }
}
@media screen and  (max-width: $tabletWidth) {
  .select-card {
    .card{
      width: 113px;
    }
    .point_area {
      margin-left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
