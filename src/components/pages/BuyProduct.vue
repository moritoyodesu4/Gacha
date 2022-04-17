<template>
  <BaseTemplate :currentUser="currentUser">
    <div class="buy-product">
      <span class="buy-product-title">商品購入</span>
      <div class="description">
        <span class="text">ポイントを使用して商品を購入します。</span>
        <span class="text">購入する商品の数を選択してください。</span>
      </div>
      <ProductBanner
        v-if="currentPack"
        class="product-banner"
        :packItem="currentPack"
      />
      <ShadowBox class="shadow-box value" opacity="_60">
        <div class="value-area">
          <div class="value-per-pack">
            <span class="text">1パック = <span class="point">{{packPoint}}P</span></span>
          </div>
          <div class="pack-count-area">
            <span>残り</span>
            <span class="pack-count">{{packCount}}</span>
            <span>パック</span>
          </div>
        </div>
        <div class="counter-area">
<!--          <NumberCounter-->
<!--            class="number-counter"-->
<!--            :count="count"-->
<!--            @handleMinusBtnClick="subtractCouont"-->
<!--            @handlePlusBtnClick="addCount"-->
<!--          />-->
          <SelectBox :options="buyList" selectedOption="1" @handleSelectChange="changeCount" />
        </div>
      </ShadowBox>
      <ErrorMessage
        v-if="errorMessageCount"
        class="error-message"
        :message="errorMessageCount"
      />
      <SquareButton
        class="square-button"
        text="購入内容確認"
        @handleSquareBtnClick="goToConfirmBuyProduct"
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
import SquareButton from '@/components/atoms/SquareButton.vue';
import ErrorMessage from '@/components/atoms/ErrorMessage.vue';
import ProductBanner from '@/components/molecules/ProductBanner.vue';
import SelectBox from '@/components/atoms/SelectBox.vue';

export default {
  name: 'BuyProduct',

  components: {
    BaseTemplate,
    ShadowBox,
    SquareButton,
    ErrorMessage,
    ProductBanner,
    SelectBox,
  },

  data: () => ({
    count: 1,
    errorMessageCount: null,
    options: [],
  }),

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      currentPack: 'pack/currentPack',
      packCheckResult: 'pack/packCheckResult',
    }),
    packPoint() {
      if (this.currentPack) {
        return separateCharacterNumber(this.currentPack.point);
      }
      return 0;
    },
    packCount() {
      if (this.currentPack) {
        return separateCharacterNumber(this.currentPack.pack_count);
      }
      return 0;
    },
    buyList() {
      if (!this.packCount) {
        return [];
      }
      const count = parseInt(this.packCount.replace(',', ''), 10);
      let max = count;
      if (max > 3000) {
        max = 3000;
      }
      const maxCount = parseInt(this.currentPack.max_buy_count, 10);
      if (maxCount > 0 && max > maxCount) {
        max = maxCount;
      }
      const option = [];
      for (let i = 1; i <= max; i += 1) {
        option.push({ id: i, name: `${i}枚` });
      }
      return option;
    },
  },

  watch: {
    packCheckResult(newVal) {
      if (newVal) {
        if (newVal.state === 200 && newVal.result === '1') {
          const query = {
            packId: this.$route.query.packId,
            buyCount: this.count,
          };
          this.$store.dispatch('pack/clearPackCheckResult');
          this.$router.push({ path: '/confirm-buy-product', query });
        } else {
          const { count } = newVal.errors;
          this.errorMessageCount = count ? count[0] : null;
        }
      }
    },
  },

  created() {
    const { packId, errorMessageCount } = this.$route.query;
    this.errorMessageCount = errorMessageCount ? errorMessageCount[0] : null;
    this.$store.dispatch('pack/setCurrentPack', { packId });
  },

  methods: {
    goToConfirmBuyProduct() {
      const postParams = {
        count: String(this.count),
      };
      this.$store.dispatch('pack/setCheckPackResult', { postParams });
    },
    subtractCouont() {
      if (this.count > 1) {
        this.count -= 1;
      }
    },
    changeCount(val) {
      this.count = parseInt(val, 10);
    },
    addCount() {
      const overPackCount = this.count >= this.currentPack.pack_count;
      const overMaxBuyCount = this.count >= this.currentPack.max_buy_count;
      const isInfinite = this.currentPack.max_buy_count === '0';
      if (overPackCount || (overMaxBuyCount && !isInfinite)) {
        return;
      }
      this.count += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.buy-product{
  width: 100%;
  max-width: 680px;
  min-height: 100%;
  padding: 30px 20px;
  margin: 0px auto;
  text-align: center;
  .buy-product-title{
    font-family: $notoSerif;
    font-size: 30px;
    font-weight: 700;
    color: $white;
  }
  .description{
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    .text{
      display: inline-block;
      font-family: $notoSans;
      font-size: 16px;
      line-height: 1.8;
      color: $white;
    }
  }
  .product-banner{
    margin-top: 30px;
  }
  .shadow-box{
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    padding: 15px 20px;
    border: 1px solid $white;
    font-family: $notoSans;
    font-size: 13px;
    color: $white;
    .value-area{
      .value-per-pack{
        height: 35px;
        .text{
          font-family: $notoSans;
          font-size: 13px;
          line-height: 1.8;
          color: $white;
        }
        .point{
          font-family: $notoSerif;
          font-size: 24px;
          line-height: 1;
          color: $gold;
          font-weight: 700;
        }
      }
      .pack-count-area{
        display: flex;
        align-items: center;
        margin-top: 10px;
        font-family: $notoSans;
        font-size: 16px;
        line-height: 21px;
        color: $white;
        .pack-count{
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 4px 8px;
          border: 2px solid $white;
          border-radius: 2px;
          font-family: $notoSerif;
          font-size: 20px;
          line-height: 1.5;
          font-weight: 700;
        }
        & > span + span{
          margin-left: 5px;
        }
      }
    }
    .counter-area{
      display: flex;
      align-items: center;
      width: 80px;
      .round-button{
        width: 25px;
        height: 25px;
      }
    }
  }
  .square-button{
    width: 200px;
    height: 50px;
    margin: 30px auto 0px;
  }
}
</style>
