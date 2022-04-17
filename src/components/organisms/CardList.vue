<template>
  <div class="card-list">
    <ShadowBoxTitleDescription
      class="shadow-box"
      :title="cardListTitle"
      opacity="_60">
      <div class="card-list-container">
        <!-- <PrevButton
          class="btn prev"
          @handlePrevBtnClick="handlePrevBtnClick"
        /> -->
        <div class="scroll-container">
          <template v-for="(cardItem, index) in cardList">
            <div class="card-container" :key="index">
              <img
                class="card"
                :src="cardItem.image" :alt="cardItem.card_name"
              >
              <div class="card-info">
                <div class="name">
                  <span class="text">{{cardItem.name}}</span>
                </div>
                <div class="model-number">
                  <span class="text">{{cardItem.model_number}}</span>
                </div>
                <div class="rarity">
                  <span class="text">{{cardItem.rarity_label}}</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </ShadowBoxTitleDescription>
      <!-- <NextButton
        class="btn next"
        @handleNextBtnClick="handleNextBtnClick"
      /> -->
  </div>
</template>

<script>
import ShadowBoxTitleDescription from '@/components/molecules/ShadowBoxTitleDescription.vue';

export default {
  name: 'CardList',

  props: {
    cardListTitle: {
      type: String,
    },
    cardList: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    ShadowBoxTitleDescription,
    // PrevButton,
    // NextButton,
  },

  methods: {
    // handlePrevBtnClick() {
    //   this.$emit('handlePrevBtnClick');
    // },
    // handleNextBtnClick() {
    //   this.$emit('handleNextBtnClick');
    // },
  },
};
</script>

<style lang="scss" scoped>
$shadowBtnHeight: 77px;

.card-list{
  width: 100%;
  .card-list-container{
    position: relative;
    width: 100%;
    min-height: 154px;
    margin-top: 10px;
    white-space: nowrap;
    .btn{
      position: absolute;
      height: $shadowBtnHeight;
      top: calc(50% - #{$shadowBtnHeight}/2);
      &.prev{
        left: 10px;
      }
      &.next{
        right: 10px;
      }
      @media screen and  (min-width: $tabletWidth) {
        display: none;
      }
    }
    .scroll-container{
      display: flex;
      overflow: hidden;
      overflow-x: scroll;
      margin-top: 10px;
      @media screen and  (min-width: $tabletWidth) {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        overflow: visible;
        margin-top: -10px;
        .card{
          margin-top: 10px;
        }
      }
      &::before{
        content: '';
        min-width: 20px;
        flex: 1;
        height: 10px;
      }
      &::after{
        content: '';
        min-width: 20px;
        flex: 1;
        height: 10px;
      }
      .card-container{
        display: flex;
        flex-direction: column;
        width: 100px;
        min-width: 100px;
        & + .card-container{
          margin-left: 20px;
        }
        &:first-of-type{
          margin: 0 auto;
        }
        .card{
          width: 100%;
          height: 146px;
        }
        .card-info{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          width: 100%;
          .name, .model-number{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 2px 2px;
            .text{
              display: inline-block;
              font-family: $notoSans;
              font-size: 12px;
              color: $deepGray;
              line-height: 1.25;
              white-space: pre-wrap;
            }
          }
          .rarity {
            background: $redGradient;
            padding: 0px 10px 4px 10px;
            border-radius: 5px;
            span {
              white-space: pre-wrap;
              display: inline;
              font-size: 12px;
              color: $yellow;
            }
          }
        }
      }
    }
  }
}
</style>
