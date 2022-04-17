<template>
  <BaseTemplate :currentUser="currentUser">
    <div class="pack-detail">
      <ProductBanner
        v-if="currentPack"
        :packItem="currentPack"
        :showDetail="true"
      />
      <div class="detail_area">
        <div class="name">{{currentPack.name}}</div>
        <div class="point_base_area">
          <div class="point_area">
            <span class="point">{{currentPack.point | comma}}</span>
            <span class="red_message">残りあと{{currentPack.pack_count | comma}}パック</span>
          </div>
          <div class="count_base_area_block">
            <ErrorMessage
              v-if="errorMessageCount"
              class="error-message"
              :message="errorMessageCount"
            />
            <div class="count_base_area">
              <div class="count_area">
                <span>購入数</span>
                <SelectBox
                  class="select_box"
                  :options="buyList"
                  selectedOption="1"
                  @handleSelectChange="changeCount" />
              </div>
              <div class="buttons">
                <BlackGradationButton
                  class="square-button"
                  text="購入する"
                  @handleSquareBtnClick="goToConfirmBuyProduct"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <LeafBox
        class="description-box"
        opacity="_65"
      >
        <ProductDescription
          v-if="currentPack"
          title="商品説明"
          :description="currentPack.detail"
        />
      </LeafBox>
    </div>
    <CommonOverlay class="overlay" v-show="isOpenModal">
      <CommonModal class="modal">
        <div class="modal-title">
          <span>ポイント不足</span>
        </div>
        <div class="text">
          <span>ポイントが不足しています。</span>
          <span>購入しますか？</span>
        </div>
        <div class="modal-button-area">
          <SquareButton
            class="square-button"
            text="いいえ"
            :isSub="true"
            @handleSquareBtnClick="closeModal"
          />
          <SquareButton
            class="square-button"
            text="はい"
            @handleSquareBtnClick="goToBuyPoint"
          />
        </div>
      </CommonModal>
    </CommonOverlay>
  </BaseTemplate>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  separateCharacterNumber,
} from '@/common/util/format';

import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import CommonOverlay from '@/components/atoms/CommonOverlay.vue';
import CommonModal from '@/components/atoms/CommonModal.vue';
import ProductBanner from '@/components/molecules/ProductBanner.vue';
import ProductDescription from '@/components/molecules/ProductDescription.vue';
import SquareButton from '@/components/atoms/SquareButton.vue';
import BlackGradationButton from '@/components/atoms/BlackGradationButton.vue';
import SelectBox from '@/components/atoms/SelectBox.vue';
import LeafBox from '@/components/organisms/LeafBox.vue';

export default {
  name: 'PackDetail',

  components: {
    BaseTemplate,
    CommonOverlay,
    CommonModal,
    ProductBanner,
    ProductDescription,
    SquareButton,
    BlackGradationButton,
    SelectBox,
    LeafBox,
  },

  data: () => ({
    isOpenModal: false,
    errorMessageCount: null,
    count: 1,
  }),

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      currentPack: 'pack/currentPack',
      packCheckResult: 'pack/packCheckResult',
      setCheckPackResult: 'pack/setCheckPackResult',
    }),
    packPoint() {
      if (this.currentPack) {
        return separateCharacterNumber(this.currentPack.point);
      }
      return 0;
    },
    isAvailable() {
      return parseInt(this.currentUser.point, 10) >= parseInt(this.currentPack.point, 10);
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
        option.push({ id: i, name: `${i}パック` });
      }
      return option;
    },
  },

  created() {
    this.$store.dispatch('pack/setCurrentPack', { packId: this.$route.query.packId });
  },

  beforeDestroy() {
    this.$store.dispatch('pack/clearCurrentPack');
  },

  filters: {
    comma(value) {
      return separateCharacterNumber(value);
    },
  },

  watch: {
    packCheckResult(newVal) {
      console.log(newVal);
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
          this.isOpenModal = true;
        }
      }
    },
  },

  methods: {
    buyPack() {
      const query = {
        packId: this.$route.query.packId,
      };
      // ログインしていない場合、ログイン画面へ。routerのbeforeEachだとエラーが出る。（リダイレクトはされる）
      if (this.currentUser.is_login === '0') {
        this.$router.push({ path: '/login', query });
        return;
      }
      // 商品購入画面へ
      if (this.isAvailable) {
        this.$router.push({ path: '/buy-product', query });
        return;
      }
      this.isOpenModal = true;
    },
    changeCount(val) {
      this.count = parseInt(val, 10);
    },
    closeModal() {
      this.isOpenModal = false;
    },
    goToBuyPoint() {
      // ポイント購入画面へ
      const query = { packId: this.$route.query.packId };
      this.$router.push({ path: '/buy-point', query });
    },
    goToConfirmBuyProduct() {
      const postParams = {
        count: String(this.count),
      };
      this.$store.dispatch('pack/setCheckPackResult', { postParams });
    },
  },
};
</script>

<style lang="scss" scoped>
.pack-detail{
  width: 100%;
  max-width: 680px;
  min-height: 100%;
  padding: 30px 20px 26px 20px;
  margin: 0px auto;
  .description-box{
    margin-top: 30px;
    border: 1px solid $white;
  }
  .buy-area{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    .point-box{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 185px;
      height: 50px;
      .value-point{
        font-family: $notoSerif;
        font-size: 24px;
        font-weight: 700;
        color: $gold;
      }
    }
    .square-button{
      width: 120px;
      height: 50px;
      margin-left: 30px;
    }
  }
}
.overlay{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 30px;
  z-index: 1;
  .modal{
    padding: 40px 28px;
    font-family: $notoSans;
    color: $brown;
    text-align: center;
    .modal-title{
      font-size: 20px;
      font-weight: 700;
    }
    .text{
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      font-size: 16px;
      font-weight: 400;
      line-height: 28px;
    }
    .modal-button-area{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
      .square-button{
        width: 120px;
        height: 50px;
        & + .square-button{
          margin-left: 20px;
        }
      }
    }
  }
}
.detail_area {
  margin-top: 40px;
  padding: 0 10px;
  color: $deepGray;
  font-size: 18px;
  .point_base_area {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .point_area {
      width: 50%;
      .point {
        font-weight: 700;
        color: $deepGray;
        &:before {
          content: "P";
          width: 20px;
          height: 20px;
          color: $deepGray;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          background-color: $yellow;
          border-radius: 100px;
          font-size: 16px;
          margin-right: 5px;
        }
      }
      .red_message {
        font-size: 12px;
        margin-left: 10px;
        color: $red;
      }
    }
    .count_base_area_block {
      width: 50%;
      .count_base_area {
        display: flex;
        justify-content: space-between;
        .count_area {
          display: flex;
          font-size: 14px;
          min-width: 200px;
          align-items: center;
          .select_box {
            width: 120px;
            margin-left: 10px;
          }
        }
        .buttons {
          .square-button {
            width: 120px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: $tabletWidth) {
  .pack-detail {
    padding: 30px 20px 26px 20px;

    .point_base_area {
      flex-direction: column;

      .point_area {
        width: 100%;
      }

      .count_base_area_block {
        width: 100% !important;

        .count_base_area {
          flex-direction: column;
          align-items: center;

          .count_area {
            margin: 20px 0;
          }
        }
      }
    }
  }
}
</style>
