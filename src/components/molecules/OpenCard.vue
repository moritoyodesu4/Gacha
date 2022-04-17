<template>
  <div class="open-card" @click.stop="handleCardClick">
    <div
      v-if="isSkipOpen"
      :class="['cards no-animation', card.rarity]"
    >
      <img class="card" :src="card.image" :alt="card.name">
    </div>
    <div
      v-else
      :class="['cards', card.rarity, {'open': isOpen}]"
      @animationend="handleAnimationEnd"
      @transitionend="handleOpenCardEnd"
    >
      <img class="card back" src="/img/cardBack.png" alt="card_back">
      <img class="card front" :src="card.image" :alt="card.name">
    </div>
    <div :class="['card-info', { 'active': isSkipOpen || isShowCardInfo }]">
      <div class="text"><span>{{card.name}}</span></div>
      <div class="text"><span>{{card.rarity_label}}</span></div>
      <div class="text"><span>{{card.model_number}}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpenCard',

  props: {
    card: {
      type: Object,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    isSkipOpen: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isShowCardInfo: false,
    };
  },

  mounted() {
    // MEMO: componentが完全に描画されるのを待つ
    this.$nextTick(() => {
      this.$emit('handleCardMount');
    });
  },

  methods: {
    handleCardClick() {
      this.$emit('handleCardClick');
    },
    handleAnimationEnd() {
      this.$emit('handleAnimationEnd');
    },
    handleOpenCardEnd() {
      this.$emit('handleOpenCardEnd');
      this.isShowCardInfo = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.open-card{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  .cards{
    position: relative;
    width: 200px;
    height: 291px;
    transform-style: preserve-3d;
    transition: all 2s cubic-bezier(1, 0, 0.2, 1.0);
    box-shadow: $whiteShadow;
    &.open{
      transform: rotateY(180deg);
    }
    &.superRare{
      //box-shadow: $redShadow;
    }
    &.ultraRare{
      //box-shadow: $goldShadow;
    }
    // &.superRare{
    //   animation: flash_red 0.2s ease forwards;
    // }
    // &.ultraRare{
    //   animation: flash_gold 0.2s ease forwards;
    // }
    .card{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      background: rgba(255, 255, 255); //MEMO: 何かしらのcolorをbackgroundで指定しないとカードをめくる動作にならない
      &.front{
        transform: rotateY(180deg);
      }
    }
    &.no-animation{
      transform-style: flat;
      transition: unset;
      &.superRare{
        //box-shadow: $redShadow;
      }
      &.ultraRare{
        //box-shadow: $goldShadow;
      }
    }
  }
  &.active{
    filter: drop-shadow(0px 0px 8px yellow);
  }
  .card-info{
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    .text{
      display: flex;
      justify-content: center;
      text-align: center;
      width: 200px;
      font-size: 18px;
      color: $white;
      white-space: pre-wrap;
      margin-top: 4px;
      z-index: 1;
      &:first-of-type{
        margin-top: 10px;
      }
    }
    &.active{
      opacity: 1;
    }
  }
  // @keyframes flash_red {
  //   0% {
  //     box-shadow: 0px 0 100px rgba(249, 118, 160, 0);
  //   }
  //   100% {
  //     box-shadow: $redShadow;
  //   }
  // }
  // @keyframes flash_gold {
  //   0% {
  //     box-shadow: 0px 0 100px rgba(255, 237, 0, 0);
  //   }
  //   100% {
  //     box-shadow: $goldShadow
  //   }
  // }
}
</style>
