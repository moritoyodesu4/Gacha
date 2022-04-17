<template>
  <BaseTemplate :currentUser="currentUser">
    <div class="complete-buy-point">
      <PageTitle title="ポイント購入完了" />
      <LeafBox class="leaf_box">
        <div class="flex-box">
          <div v-if="isImmediate !== null && isImmediate" class="text thanks immediate">
            <span>ポイントのご購入</span>
            <span>ありがとうございました。</span>
            <span>引き続き商品のご購入を</span>
            <span>お楽しみください。</span>
          </div>
          <div v-if="isImmediate !== null && !isImmediate" class="text thanks delay">
            <span>ポイントのご購入</span>
            <span>ありがとうございました。</span>
            <span>お支払い後、最短30分程度で</span>
            <span>ポイントを反映させていただきます。</span>
          </div>
        </div>
      </LeafBox>
<!--      <div-->
<!--        v-if="isExistPackId !== null && isExistPackId && isMoreThanPackPoint"-->
<!--        class="button-area">-->
<!--        <SquareButton-->
<!--          class="square-button"-->
<!--          text="TOPへ戻る"-->
<!--          :isSub="true"-->
<!--          @handleSquareBtnClick="goToTop"-->
<!--        />-->
<!--        <BlackGradationButton-->
<!--          class="square-button"-->
<!--          text="商品購入へ"-->
<!--          @handleSquareBtnClick="goToBuyProduct"-->
<!--        />-->
<!--      </div>-->
      <BlackGradationButton
        v-if="isExistPackId !== null && (!isExistPackId || !isMoreThanPackPoint)"
        class="square-button top"
        text="トップページへ"
        @handleSquareBtnClick="goToTop"
      />
    </div>
  </BaseTemplate>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import LeafBox from '@/components/organisms/LeafBox.vue';
import BlackGradationButton from '@/components/atoms/BlackGradationButton.vue';
import PageTitle from '@/components/atoms/PageTitle.vue';

export default {
  name: 'CompleteBuyPoint',

  beforeRouteLeave(to, from, next) {
    if (to.name === 'PayRedirect') {
      next(false);
    } else {
      next();
    }
  },

  components: {
    BaseTemplate,
    LeafBox,
    BlackGradationButton,
    PageTitle,
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      currentPack: 'pack/currentPack',
      pointAppendResult: 'user/pointAppendResult',
      pointEndResult: 'user/pointEndResult',
    }),
    isExistPackId() {
      if (this.pointEndResult) {
        const isExistPackId = this.pointEndResult.pack_id;
        const isNotUndefined = !(typeof this.pointEndResult.pack_id === 'undefined');
        return isExistPackId && isNotUndefined;
      }
      return null;
    },
    isMoreThanPackPoint() {
      if (this.currentPack && this.currentUser) {
        return parseInt(this.currentUser.point, 10) > parseInt(this.currentPack.point, 10);
      }
      return false;
    },
    isImmediate() {
      if (this.pointEndResult) {
        return this.pointEndResult.pay_id === 1;
      }
      return null;
    },
  },

  watch: {
    pointEndResult(newVal) {
      if (newVal) {
        if (newVal.pack_id) {
          this.$store.dispatch('pack/setCurrentPack', { packId: newVal.pack_id });
        }
      }
    },
  },

  created() {
    this.$store.dispatch('user/setPointEndResult');
  },

  methods: {
    goToTop() {
      this.$router.push('/');
    },
    goToBuyProduct() {
      const query = {
        packId: this.pointAppendResult.pack_id,
      };
      this.$router.push({ path: '/buy-product', query });
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
.complete-buy-point{
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 680px;
  min-height: 100%;
  padding-top: 0px;
  margin: 0px auto;
  text-align: center;
  .text.thanks{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: $notoSans;
    font-size: 18px;
    line-height: 32.4px;
    color: $deepGray;
  }
  .button-area{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
    .square-button{
      width: 120px;
      height: 50px;
      & + .square-button{
        margin-left: 30px;
      }
    }
  }
  .square-button.top{
    width: 200px;
    height: 50px;
    margin: 60px auto 0px;
  }
}
@media screen and  (max-width: $tabletWidth) {
  .leaf_box {
    margin: 0 10px;
  }
}
</style>
