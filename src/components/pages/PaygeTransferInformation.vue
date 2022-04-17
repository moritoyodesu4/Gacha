<template>
  <BaseTemplate :currentUser="currentUser">
    <div class="bank-transfer-information">
      <PageTitle title="ポイント購入完了" />

      <LeafBox>
        <div class="flex-box">
          <span class="text top">ポイントのご購入ありがとうございました。</span>
          <span class="text top">以下のメールアドレスに3日以内に送金をお願いいたします。</span>
        </div>
        <div class="transfer-information top-30">
          <span class="text">送金額</span>
          <ShadowBox class="shadow-box value" opacity="_60">
            <span class="price">¥{{dispSalePointPrice}}</span>
          </ShadowBox>
          <span class="text top-30">送金先メールアドレス</span>
          <ShadowBox class="shadow-box bank-account" opacity="_60">
            <div class="row" style="margin: auto;">
              <span class="value">yugioh@iranoan.com</span>
            </div>
          </ShadowBox>
        </div>
        <div class="flex-box">
          <span class="text bottom top-30">送金を確認させて頂きましたら、</span>
          <span class="text bottom">最短その日中にポイントを</span>
          <span class="text bottom">反映させて頂きます。</span>
        </div>
      </LeafBox>
      <BlackGradationButton
        class="square-button top-30"
        text="TOPページへ"
        @handleSquareBtnClick="goToTop"
      />
    </div>
  </BaseTemplate>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  separateCharacterNumber,
} from '@/common/util/format';

import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import ShadowBox from '@/components/atoms/ShadowBox.vue';
import LeafBox from '@/components/organisms/LeafBox.vue';
import BlackGradationButton from '@/components/atoms/BlackGradationButton.vue';
import PageTitle from '@/components/atoms/PageTitle.vue';

export default {
  name: 'PaygeTransferInformation',

  beforeRouteLeave(to, from, next) {
    if (to.name === 'ConfirmBuyPoint') {
      next(false);
    } else {
      next();
    }
  },

  components: {
    BaseTemplate,
    ShadowBox,
    LeafBox,
    BlackGradationButton,
    PageTitle,
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      currentBank: 'bank/currentBank',
    }),
    dispSalePointPrice() {
      if (this.currentBank) {
        return separateCharacterNumber(parseInt(this.currentBank.price, 10));
      }
      return 0;
    },
  },

  created() {
    this.$store.dispatch('bank/setCurrentBank');
  },

  methods: {
    goToTop() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-box {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.price {
  color: $red;
}
.bank-transfer-information{
  width: 100%;
  max-width: 680px;
  min-height: 100%;
  padding: 30px 20px;
  margin: 0px auto;
  text-align: center;
  .text{
    display: inline-block;
    font-family: $notoSans;
    font-size: 16px;
    color: $deepGray;
    white-space: nowrap;
    &.top{
      line-height: 28.8px;
    }
    &.bottom{
      line-height: 32.4px;
    }
  }
  .top-30{
    margin-top: 30px;
  }
  .transfer-information{
    width: 100%;
    .text{
      font-size: 18px;
    }
    .shadow-box{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: 10px;
      border-radius: 6px;
      &.value{
        height: 60px;
        border: 1px solid $deepGray;
        font-family: $notoSerif;
        font-size: 30px;
        font-weight: 700;
        color: $deepGray;
      }
      &.bank-account{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 20px;
        border: 1px solid $deepGray;
        font-family: $notoSans;
        font-size: 13px;
        color: $deepGray;
        .row{
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          margin: 0px;
          & + .row{
            margin-top: 10px;
          }
          .key{
            text-align: left;
            min-width: 93px;
          }
          .value{
            margin-left: 10px;
            font-weight: 700;
          }
        }
      }
    }
  }
  .square-button{
    width: 200px;
    height: 50px;
    margin: 30px auto 0px;
  }
}

@media screen and  (max-width: $tabletWidth) {
  .flex-box {
    .text {
      white-space: normal;
      font-size: 14px;
    }
  }
  .bank-transfer-information{
    padding: 30px 10px;
  }
}
</style>
