<template>
  <BaseTemplate :currentUser="currentUser" :isTop="true">
    <div
      v-if="packList"
      class="top"
    >
      <div class="product-list">
        <ProductBanner
          v-for="(packItem) in packList.list" :key="packItem.id"
          class="banner"
          :packItem="packItem"
          :currentUser="currentUser"
          @handleBannerClick="goToProductDetail"
          @handleLoginClick="goToLogin"
        />
      </div>
      <div class="double-flex">
        <ShadowButton
          class="shadow-button pc"
          text="特定商取引法に基づく表記"
          @handleShadowBtnClick="goToSpecificCommerce"
        />
        <ShadowButton
          class="shadow-button sp"
          text="特定商取引法"
          @handleShadowBtnClick="goToSpecificCommerce"
        />
        <ShadowButton
          class="shadow-button"
          text="利用規約"
          @handleShadowBtnClick="goToTermsOfService"
        />
        <ShadowButton
          class="shadow-button pc"
          text="個人情報保護ポリシー"
          @handleShadowBtnClick="goToPrivacyProtection"
        />
        <ShadowButton
          class="shadow-button sp"
          text="個人情報保護"
          @handleShadowBtnClick="goToPrivacyProtection"
        />
        <ShadowButton
          class="shadow-button"
          text="ご利用ガイド"
          @handleShadowBtnClick="goToUserGuide"
        />
      </div>
      <div class="toiawase">
        <div>お問い合わせ先</div>
        <div>gacha24@iranoan.com</div>
      </div>
    </div>
  </BaseTemplate>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import ProductBanner from '@/components/molecules/ProductBanner.vue';
import ShadowButton from '@/components/molecules/ShadowButton.vue';

export default {
  name: 'Top',

  components: {
    BaseTemplate,
    ProductBanner,
    ShadowButton,
  },

  data: () => ({
  }),

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      packList: 'pack/packList',
    }),
  },

  created() {
    this.$store.dispatch('pack/setPackList');
  },

  methods: {
    goToProductDetail(packId) {
      this.$router.push({ path: '/pack-detail', query: { packId } });
    },
    goToLogin() {
      this.$router.push({ path: '/login' });
    },
    goToSpecificCommerce() {
      this.$router.push('/specific-commerce');
    },
    goToTermsOfService() {
      this.$router.push('/terms-of-service');
    },
    goToPrivacyProtection() {
      this.$router.push('/privacy-protection');
    },
    goToUserGuide() {
      this.$router.push('/user-guide');
    },
  },
};
</script>

<style lang="scss" scoped>
.top{
  width: 100%;
  max-width: 1200px;
  min-height: 100%;
  padding: 50px 20px 32px 20px;
  margin: 0 auto;
  .product-list {
    display: flex;
    flex-wrap: wrap;
  }
  .banner{
    margin-top: 40px;
  }
  .double-flex {
    display: flex;
  }
  .shadow-button{
    min-width: 200px;
    max-width: 48%;
    width: 100%;
    height: 40px;
    margin: 20px auto 0;
  }
  .toiawase {
    text-align: center;
    color: $deepGray;
    margin-top: 20px;
  }
  .pc {
    display: block;
  }
  .sp {
    display: none;
  }
}
@media screen and (max-width: $tabletWidth) {
  .top {
    padding-top: 0;
    .shadow-button {
      min-width: 100px;
      max-width: 48%;
      width: 100%;
      height: 40px;
      margin: 20px auto 0;
      font-size: 12px;
    }
    .pc {
      display: none;
    }
    .sp {
      display: block;
    }
    .shadow-button{
      height: auto;
    }
  }
  .double-flex {
    flex-wrap: wrap;
  }
}
</style>
