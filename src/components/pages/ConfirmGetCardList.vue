<template>
  <BaseTemplate :currentUser="currentUser">
    <div class="confirm-get-card-list">
      <PageTitle title="最終確認" />
      <LeafBox class="leaf_box">
        <div class="pack_area">
          <div class="pack_name">{{packName}}</div>
          <div class="pack_created">購入日 {{created}}</div>
        </div>
        <CardList
          class="card-list send"
          cardListTitle="発送するカード"
          :cardList="sendCardList"
        />
        <CardList
          class="card-list return-point"
          cardListTitle="ポイント還元するカード"
          :cardList="returnPointCardList"
        />
        <BorderArea>
          <span class="point_text">
            <div>還元ポイント</div>
            <span class="point">{{dispReturnPoint}}</span>
          </span>
        </BorderArea>
        <div class="button-area">
          <span class="text">よろしいですか？</span>
          <div class="button-flex">
            <BlackGradationButton
              class="buttons"
              text="はい"
              @handleSquareBtnClick="changeCardStatus"
            />
          </div>
          <div class="selected_page" @click="goToGetCardList">
            選択ページに戻る
          </div>
        </div>
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
import CardList from '@/components/organisms/CardList.vue';
import LeafBox from '@/components/organisms/LeafBox.vue';
import BlackGradationButton from '@/components/atoms/BlackGradationButton.vue';
import BorderArea from '@/components/atoms/BorderArea.vue';
import PageTitle from '@/components/atoms/PageTitle.vue';

export default {
  name: 'ConfirmGetCardList',

  components: {
    BaseTemplate,
    CardList,
    LeafBox,
    BlackGradationButton,
    BorderArea,
    PageTitle,
  },

  data: () => ({
    sendCardStringIds: [],
  }),

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      buyPackResult: 'pack/buyPackResult',
      devidePackCardresult: 'pack/devidePackCardresult',
    }),
    getCardList() {
      if (this.buyPackResult) {
        return this.buyPackResult.cards;
      }
      return [];
    },
    sendCardList() {
      const sendCardList = this.getCardList.filter((acquiredCard) => {
        const isSend = this.sendCardStringIds.includes(String(acquiredCard.history_id));
        return isSend;
      });
      return sendCardList;
    },
    returnPointCardList() {
      const returnPointCardList = this.getCardList.filter((acquiredCard) => {
        const isReturnPoint = !this.sendCardStringIds.includes(String(acquiredCard.history_id));
        return isReturnPoint;
      });
      return returnPointCardList;
    },
    dispReturnPoint() {
      const returnPoint = this.returnPointCardList.reduce((acc, cur) => {
        /* eslint-disable-next-line no-param-reassign */
        acc += parseInt(cur.buy_point, 10);
        return acc;
      }, 0);
      return separateCharacterNumber(returnPoint);
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
  },

  watch: {
    devidePackCardresult(newVal) {
      if (newVal) {
        if (newVal.state === 200 && newVal.result === '1') {
          this.$store.dispatch('pack/clearDevidePackCardResult');
          this.$router.push('/thank-you');
        }
      }
    },
  },

  created() {
    this.parseSendCardIds();
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
      this.sendCardStringIds = parseNumberArrayToStringArray(sendCards);
    },
    goToGetCardList() {
      this.$router.push({ path: '/get-card-list', query: { selectedCardHistoryIds: this.sendCardStringIds } });
    },
    changeCardStatus() {
      const sendCardHistoryIds = this.sendCardList.map(
        (sendCard) => sendCard.history_id,
      );
      const returnPointCardHistoryIds = this.returnPointCardList.map(
        (returnPointCard) => returnPointCard.history_id,
      );

      const postParams = {
        send_card: sendCardHistoryIds,
        reduction_card: returnPointCardHistoryIds,
      };

      this.$store.dispatch('pack/devidePackCard', { postParams });
    },
  },
};
</script>

<style lang="scss" scoped>
.confirm-get-card-list{
  width: 100%;
  min-height: 100%;
  padding: 30px 0px;
  text-align: center;
  .leaf_box {
    max-width: 1000px;
    margin: 0 auto;
  }
  .confirm-get-card-list-title{
    font-family: $notoSerif;
    font-size: 30px;
    font-weight: 700;
    color: $white;
  }
  .card-list{
    &.send{
      margin-top: 10px;
    }
    &.return-point{
      margin-top: 10px;
    }
  }
  .text{
    display: block;
    margin-top: 15px;
    font-family: $notoSans;
    font-size: 18px;
    color: $deepGray;
  }
  .button-area {
    width: 100%;
    text-align: center;
    margin-top: 40px;
    .button-flex {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 15px;
      .buttons {
        width: 200px;
        height: 40px;
      }
    }
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
.point_text {
  display: flex;
  padding: 10px 60px;
  justify-content: space-between;
  font-size: 16px;
  .point {
    color: $red;
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
.selected_page {
  margin-top: 20px;
  font-size: 14px;
  color: $deepGray;
  cursor: pointer;
  margin-bottom: 40px;
}
@media screen and  (max-width: $tabletWidth) {
  .point_text {
    padding: 10px 10px;
  }
}
</style>
