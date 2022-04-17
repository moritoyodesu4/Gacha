<template>
  <BaseTemplate :currentUser="currentUser">
    <div class="buy-point">
      <span class="buy-point-title">ポイント購入</span>
      <div class="point-course-area">
      </div>
      <LeafBox :isColumn="true">
        <PointCourse
          v-for="(pointPriceItem) in pointPriceList" :key="pointPriceItem.id"
          class="point-course"
          :point="pointPriceItem.point"
          :price="pointPriceItem.price"
          :memo="pointPriceItem.memo"
          @handleBuyBtnClick="buyPoint(pointPriceItem.id)"
        />
      </LeafBox>
      <div class="notation-area">
        <ShadowButton
          class="shadow-button"
          text="特定商取引法に基づく表記"
          @handleShadowBtnClick="goToSpecificCommerce"
        />
        <ShadowButton
          class="shadow-button"
          text="資金決済法に基づく表記"
          @handleShadowBtnClick="goToFundSettlement"
        />
        <ShadowButton
          class="shadow-button"
          text="ポイント利用規約"
          @handleShadowBtnClick="goToPointTermsOfService"
        />
      </div>
    </div>
  </BaseTemplate>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import ShadowButton from '@/components/molecules/ShadowButton.vue';
import PointCourse from '@/components/organisms/PointCourse.vue';
import LeafBox from '@/components/organisms/LeafBox.vue';

export default {
  name: 'BuyPoint',

  components: {
    BaseTemplate,
    ShadowButton,
    PointCourse,
    LeafBox,
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      pointPriceList: 'pointPrice/pointPriceList',
    }),
  },

  created() {
    const pageNumber = 1;
    this.$store.dispatch('pointPrice/setPointPriceList', { pageNumber });
  },

  methods: {
    buyPoint(pointPriceId) {
      const query = {
        pointPriceId,
      };
      this.$router.push({ path: '/confirm-buy-point', query });
    },
    goToSpecificCommerce() {
      this.$router.push('/specific-commerce');
    },
    goToFundSettlement() {
      this.$router.push('/fund-settlement');
    },
    goToPointTermsOfService() {
      this.$router.push('/point-terms-of-service');
    },
    goToBuyPointHistory() {
      this.$router.push('/buy-point-history');
    },
  },
};
</script>

<style lang="scss" scoped>
.buy-point{
  width: 100%;
  max-width: 1000px;
  min-height: 100%;
  padding: 30px 10px 33px 10px;
  margin: 0 auto;
  text-align: center;
  .buy-point-title{
    font-family: $notoSerif;
    font-size: 30px;
    font-weight: 700;
    color: #4a3f3a;
  }
  .point-course-area{
    margin-top: 30px;
    .point-course{
      width: 100%;
      height: auto;
      & + .point-course{
        margin-top: 5px;
      }
    }
  }
  .notation-area {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 50px;
    .shadow-button {
      width: 255px;
      height: 40px;
      color: #285abe;
    }
  }
}
@media screen and  (max-width: $tabletWidth) {
  .leaf_area {
    flex-direction: column;
  }
  .buy-point {
    .notation-area {
      margin-top: 20px;
      flex-direction: column;
    }
  }
}
</style>
