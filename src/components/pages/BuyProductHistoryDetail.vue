<template>
  <BaseTemplate :currentUser="currentUser">
    <LeafBox class="leaf_box">
      <div class="buy-product-history-detail">
        <div class="buy-product-history-detail-title">
          <span v-if="currentPackHistory" class="text">
            {{currentPackHistory.pack_name}}
          </span>
        </div>
        <div class="flex-box">
          <div class="buy-date">
            <span class="text">購入日</span>
            <span class="text date">{{dispBuyDate}}</span>
          </div>
          <div v-if="currentPackHistory && currentPackHistory.delivery_code" class="delivery-code">
            <span class="text">配送コード</span>
            <span class="text date">{{currentPackHistory.delivery_code}}</span>
          </div>
        </div>
        <CardList
          class="card-list send"
          cardListTitle="配送依頼したカード"
          :cardList="sendCardList"
        />
        <CardList
          class="card-list return-point"
          cardListTitle="ポイント還元したカード"
          :cardList="returnPointCardList"
        />

        <BorderArea>
          <span class="point_text">
            <div>還元ポイント</div>
            <span class="point">{{dispReturnPoint}}</span>
          </span>
        </BorderArea>
        <div class="button-area">
          <BlackGradationButton
            class="square-button"
            text="一覧へ戻る"
            @handleSquareBtnClick="goToBuyProductHistory"
          />
        </div>
      </div>
    </LeafBox>
  </BaseTemplate>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  separateCharacterNumber,
} from '@/common/util/format';

import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import CardList from '@/components/organisms/CardList.vue';
import LeafBox from '@/components/organisms/LeafBox.vue';
import BorderArea from '@/components/atoms/BorderArea.vue';
import BlackGradationButton from '@/components/atoms/BlackGradationButton.vue';

export default {
  name: 'BuyProductHistoryDetail',

  components: {
    BaseTemplate,
    CardList,
    LeafBox,
    BorderArea,
    BlackGradationButton,
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      currentPackHistory: 'packHistory/currentPackHistory',
    }),
    sendCardList() {
      if (!this.currentPackHistory) {
        return [];
      }
      return this.currentPackHistory.send_card;
    },
    returnPointCardList() {
      if (!this.currentPackHistory) {
        return [];
      }
      return this.currentPackHistory.reduction_card;
    },
    dispReturnPoint() {
      if (!this.currentPackHistory) {
        return 0;
      }
      return separateCharacterNumber(this.currentPackHistory.reduction_point);
    },
    dispBuyDate() {
      if (!this.currentPackHistory) {
        return null;
      }
      const buyDate = this.currentPackHistory.created.split(' ')[0];
      return buyDate;
    },
  },

  created() {
    const { packHistoryId } = this.$route.query;
    this.$store.dispatch('packHistory/setCurrentPackHistory', { packHistoryId });
  },

  methods: {
    goToBuyProductHistory() {
      this.$router.push('/buy-product-history');
    },
  },
};
</script>

<style lang="scss" scoped>
.leaf_box {
  margin: 40px auto;
  max-width: 1000px;
}
.buy-product-history-detail{
  width: 100%;
  min-height: 100%;
  padding: 20px 0px;
  text-align: center;
  .buy-product-history-detail-title{
    padding: 0px 20px;
    .text{
      height: 59px;
      font-family: $notoSerif;
      font-size: 20px;
      line-height: 30px;
      font-weight: 700;
      color: $deepGray;
    }
  }
  .flex-box {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    .buy-date {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      margin-right: 20px;

      .text {
        font-family: $notoSans;
        font-size: 14px;
        color: $deepGray;

        &.date {
          margin-left: 10px;
          font-weight: 700;
        }
      }
    }

    .delivery-code {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      margin-left: 20px;

      .text {
        font-family: $notoSans;
        font-size: 14px;
        color: $deepGray;

        &.date {
          margin-left: 10px;
          font-weight: 700;
        }
      }
    }
  }
  .card-list{
    margin-top: 20px;
    &.return-point{
      margin-top: 11px;
    }
  }
  .shadow-box{
    width: 255px;
    height: 40px;
    margin: 14px auto 0px;
    .text{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0px;
      padding: 0 36px;
      font-family: $notoSans;
      font-size: 14px;
      line-height: 23.4px;
      color: $deepGray;
      .point{
        margin-left: auto;
        font-family: $notoSerif;
        font-size: 24px;
        font-weight: 700;
        line-height: 1.5;
        color: $deepGray;
      }
      .unit{
        margin-left: 10px;
      }
    }
  }
  .button-area{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    .square-button{
      width: 200px;
      height: 40px;
    }
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
@media screen and  (max-width: $tabletWidth) {
  .point_text {
    flex-direction: column;
  }
}
</style>
