<template>
  <BaseTemplate :currentUser="currentUser">
    <div class="get-card-list">
      <PageTitle title="獲得カード一覧" />
      <div class="description">
        <span class="text">発送希望のカードを選択してください。</span>
        <span class="text">発送を希望されない商品はポイントにて還元いたします。</span>
      </div>
      <!-- <ShadowBox
        class="shadow-box btn prev"
        opacity="_60"
        @handleClickShadowBox="dispPrevCard"
      >
        <i class="far fa-chevron-left"></i>
      </ShadowBox> -->
      <LeafBox class="leafbox">
        <div class="pack_area">
          <div class="pack_name">{{packName}}</div>
          <div class="pack_created">購入日 {{created}}</div>
        </div>
        <div class="acquired-card-container">
          <template v-for="(acquiredCardItem) in getCardList">
            <SelectCard
              class="select-card"
              :key="acquiredCardItem.history_id"
              :acquiredCardItem="acquiredCardItem"
              :isChecked="selectedCardHistoryIds.includes(String(acquiredCardItem.history_id))"
              @handleCardSelect="selectCard(String(acquiredCardItem.history_id))"
            />
          </template>
        </div>
        <!-- <ShadowBox
          class="shadow-box btn next"
          opacity="_60"
          @handleClickShadowBox="dispNextCard"
        >
          <i class="far fa-chevron-right"></i>
        </ShadowBox> -->
        <BorderArea>
          <div class="card-handling-result">
            <div class="card-flex">
              <div class="_title">発送商品数</div>
              <div class="_num">
                <span class="_select_num">{{sendItemCount}}</span>
                <span class="_total_num">{{buyPackResult.cards.length}}枚</span>
              </div>
            </div>
            <div class="card-flex">
              <div class="_title">還元ポイント</div>
              <div class="_num">
                <span class="_point">{{returnPointTotal}}</span>
              </div>
            </div>
          </div>
        </BorderArea>
        <BlackGradationButton
          class="square-button"
          text="最終確認"
          @handleSquareBtnClick="goToConfirmGetCardList"
        />
      </LeafBox>
    </div>
  </BaseTemplate>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  separateCharacterNumber,
  parseNumberArrayToStringArray,
} from '@/common/util/format';

import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import SelectCard from '@/components/organisms/SelectCard.vue';
import PageTitle from '@/components/atoms/PageTitle.vue';
import LeafBox from '@/components/organisms/LeafBox.vue';
import BlackGradationButton from '@/components/atoms/BlackGradationButton.vue';
import BorderArea from '@/components/atoms/BorderArea.vue';

export default {
  name: 'GetProductList',

  beforeRouteLeave(to, from, next) {
    if (to.name === 'GachaAnimation') {
      next(false);
    } else {
      next();
    }
  },

  components: {
    BaseTemplate,
    SelectCard,
    PageTitle,
    LeafBox,
    BlackGradationButton,
    BorderArea,
  },

  data: () => ({
    selectedCardHistoryIds: [],
  }),

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      buyPackResult: 'pack/buyPackResult',
    }),
    getCardList() {
      if (this.buyPackResult) {
        return this.buyPackResult.cards;
      }
      return [];
    },
    packName() {
      if (this.buyPackResult) {
        return this.buyPackResult.title;
      }
      return '';
    },
    created() {
      if (this.buyPackResult) {
        return this.buyPackResult.created;
      }
      return '';
    },
    sendItemCount() {
      const isExist = this.selectedCardHistoryIds.length > 0;
      return isExist ? separateCharacterNumber(this.selectedCardHistoryIds.length) : 0;
    },
    returnPointTotal() {
      const isExist = this.selectedCardHistoryIds.length > 0;
      let totalPoint = 0;
      if (isExist) {
        totalPoint = this.getCardList.reduce((acc, cur) => {
          const isAddPoint = !this.selectedCardHistoryIds.includes(String(cur.history_id));
          if (isAddPoint) {
            /* eslint-disable-next-line no-param-reassign */
            acc += parseInt(cur.buy_point, 10);
          }
          return acc;
        }, 0);
        return totalPoint;
      }
      totalPoint = this.getCardList.reduce((acc, cur) => {
        /* eslint-disable-next-line no-param-reassign */
        acc += parseInt(cur.buy_point, 10);
        return acc;
      }, 0);
      return separateCharacterNumber(totalPoint);
    },
  },

  created() {
    if (this.$route.query.selectedCardHistoryIds) {
      this.parseSendCardIds();
    }
  },

  methods: {
    parseSendCardIds() {
      const { selectedCardHistoryIds } = this.$route.query;
      let sendCards = [];
      if (typeof selectedCardHistoryIds === 'string') {
        sendCards.push(selectedCardHistoryIds);
      } else {
        sendCards = [...selectedCardHistoryIds];
      }
      this.selectedCardHistoryIds = parseNumberArrayToStringArray(sendCards);
    },
    selectCard(selectCardId) {
      const targetCardIdIndex = this.selectedCardHistoryIds.findIndex(
        (selectedCardHistoryId) => selectedCardHistoryId === String(selectCardId),
      );
      if (targetCardIdIndex === -1) {
        this.selectedCardHistoryIds.push(String(selectCardId));
        return;
      }
      this.selectedCardHistoryIds.splice(targetCardIdIndex, 1);
    },
    // dispNextCard() {
    //   // TODO: カード送りの処理。
    // },
    // dispPrevCard() {
    //   // TODO: カード戻りの処理。
    // },
    goToConfirmGetCardList() {
      this.$router.push({ path: '/confirm-get-card-list', query: { selectedCardHistoryIds: this.selectedCardHistoryIds } });
    },
  },
};
</script>

<style lang="scss" scoped>
.get-card-list{
  width: 100%;
  min-height: 100%;
  padding: 30px 0px;
  text-align: center;
  .description{
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    .text{
      font-family: $notoSans;
      font-size: 12px;
      line-height: 1.8;
      color: $deepGray;
    }
  }
  .leafbox {
    max-width: 1000px;
    margin: 20px auto 0 auto;
  }
  .shadow-box.btn{
    position: absolute;
    top: 273px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33px;
    height: 77px;
    color: white;
    z-index: 1;
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
  .acquired-card-container{
    display: flex;
    position: relative;
    width: 100%;
    margin-top: 20px;
    overflow: hidden;
    overflow-x: scroll;
    white-space: nowrap;
    .select-card{
      display: flex;
      & + .select-card{
        margin-left: 29px;
      }
    }
    @media screen and  (min-width: $tabletWidth) {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      overflow: visible;
      margin-top: 10px;
      .select-card{
        margin-top: 10px;
      }
    }
    &::before{
      content: '';
      min-width: 29px;
      flex: 1;
      height: 10px;
    }
    &::after{
      content: '';
      min-width: 29px;
      flex: 1;
      height: 10px;
    }
  }
  .card-handling-result{
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 10px 20px;
    .card-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $deepGray;
      font-size: 12px;
      ._num {
        ._select_num {
          font-size: 24px;
          color: $yellow;
        }
        ._total_num {
          font-size: 16px;
          &:before {
            content: '/';
            margin: 0 4px;
          }
        }
        ._point {
          color: $red;
          font-size: 24px;
          display: flex;
          align-items: center;
          &:before {
            content: "P";
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 18px;
            height: 18px;
            background-color: $yellow;
            color: $deepGray;
            font-size: 12px;
            border-radius: 100px;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .square-button{
    width: 200px;
    height: 40px;
    margin: 25px auto;
  }
}
.pack_area {
  margin-top: 20px;
  margin-bottom: 30px;
  width: 100%;
  .pack_name {
    width: 100%;
    font-size: 24px;
    color: $deepGray;
    text-align: center;
  }
  .pack_created {
    width: 100%;
    font-size: 14px;
    color: $deepGray;
    text-align: center;
  }
}
@media screen and  (max-width: $tabletWidth) {
  .get-card-list {
    .leafbox {
      margin: 20px 10px;
    }
  }
}
</style>
