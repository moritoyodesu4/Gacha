<template>
  <BaseTemplate :currentUser="currentUser">
    <PageTitle title="購入内容確認" />
    <LeafBox class="leaf_box">
      <div class="confirm-buy-product">
        <ProductBanner
          v-if="currentPack"
          :packItem="currentPack"
          :showDetail="true"
        />
        <div class="message_area">
          <div class="pack_name_area">
            <div class="left_area">購入商品名</div>
            <div class="pack_name">{{currentPack.name}}</div>
          </div>
          <BorderArea class="border_area">
            <div class="areas">
              <span v-if="packPoint" class="text">
                <span class="point">{{packPoint | comma}}</span>
                を消費して
              </span>
              <span class="text">
                <span class="buy-count">{{$route.query.buyCount}}</span>
                パック購入します
              </span>
            </div>
          </BorderArea>

          <div class="pack_name_area">
            <div class="left_area">所持ポイント</div>
            <div class="pack_name">
              <span v-if="currentUser" class="point">{{currentUser.point | comma}}</span>
              <i class="far fa-arrow-right"></i>
              <span v-if="currentUser && packPoint" class="point red_mode">
                {{(currentUser.point - packPoint) | comma}}
              </span>
            </div>
          </div>
          <hr>
          <div class="last_area">
            <span class="text confirm">よろしいですか？</span>
            <div class="button-area">
              <BlackGradationButton
                class="square-button"
                text="はい"
                @handleSquareBtnClick="buyPack"
              />
              <div class="back_button" @click="goToBuyProduct">商品ページに戻る</div>
              <SquareButton
                class="square-button"
                text="いいえ"
                :isSub="true"
                @handleSquareBtnClick="goToBuyProduct"
              />
            </div>
          </div>
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
import ProductBanner from '@/components/molecules/ProductBanner.vue';
import LeafBox from '@/components/organisms/LeafBox.vue';
import PageTitle from '@/components/atoms/PageTitle.vue';
import BorderArea from '@/components/atoms/BorderArea.vue';
import BlackGradationButton from '@/components/atoms/BlackGradationButton.vue';

export default {
  name: 'ConfirmBuyProduct',

  components: {
    BaseTemplate,
    ProductBanner,
    LeafBox,
    PageTitle,
    BorderArea,
    BlackGradationButton,
  },

  filters: {
    comma(value) {
      return separateCharacterNumber(value);
    },
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      currentPack: 'pack/currentPack',
      buyPackResult: 'pack/buyPackResult',
    }),
    packPoint() {
      if (this.currentPack) {
        return this.$route.query.buyCount * this.currentPack.point;
      }
      return 0;
    },
  },

  created() {
    const { packId } = this.$route.query;
    this.$store.dispatch('pack/setCurrentPack', { packId });
  },

  methods: {
    goToBuyProduct() {
      const query = {
        packId: this.$route.query.packId,
      };
      this.$router.push({ path: '/pack-detail', query });
    },
    buyPack() {
      (async () => {
        await this.$store.dispatch('pack/buyPack');
        const { buyPackResult } = this;
        const isSuceess = buyPackResult.state === 200 && buyPackResult.result === '1';
        if (isSuceess) {
          this.$store.dispatch('pack/clearBuyPackResult');
          this.$router.push('/gacha-animation');
        } else {
          const { count } = buyPackResult.errors;
          const query = {
            packId: this.$route.query.packId,
            errorMessageCount: count,
          };
          this.$router.push({ path: '/buy-product', query });
        }
      })();
    },
  },
};
</script>

<style lang="scss" scoped>
.leaf_box {
  max-width: 1000px;
  margin: 0 auto;
  align-items: center;
  .text {
    font-size: 14px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .confirm-buy-product {
    width: 680px;
    margin: auto;
    .message_area {
      margin-top: 60px;
      padding: 0 10px;
      color: $deepGray;
      .pack_name_area {
        font-size: 16px;
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        .left_area {
          width: 200px;
        }
        .pack_name {
          font-weight: 700;
        }
      }
      .border_area {
        width: 100%;
        margin-bottom: 20px;
        .areas {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0 40px;
          .buy-count {
            font-weight: bold;
            font-size: 28px;
            color: $red;
          }
        }
      }
    }
  }
}
.point {
  font-weight: bold;
  font-size: 28px;
  display: inline-flex;
  align-items: center;

  &:before {
    content: "P";
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    color: $deepGray;
    background-color: $yellow;
    font-weight: normal;
    font-size: 14px;
    border-radius: 100px;
    margin-right: 5px;
  }
}
.fa-arrow-right {
  margin: 0 10px;
}
.red_mode {
  color: $red;
}
hr {
  border:none;
  background-color: $deepGray;
  height: 1px;
  margin: 30px -10px;
}
.last_area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding-top: 40px;
  .confirm {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }
  .square-button {
    margin: 20px auto 10px auto;
    width: 180px;
  }
  .back_button {
    text-align: center;
    color: $blue;
    cursor: pointer;
  }
}
@media screen and  (max-width: $tabletWidth) {
  .leaf_box {
    margin: 0 10px;
    .confirm-buy-product {
      width: 100%;
    }
  }
  .pack_name_area {
    flex-direction: column;
    .left_area {
      text-align: center;
      width: 100%;
      margin-bottom: 10px;
    }
  }
  .areas {
    flex-direction: column;
  }
  .pack_name {
    display: flex;
    flex-direction: column;
    align-items: center;
    .fa-arrow-right {
      transform: rotate(90deg);
    }
  }
}
</style>
