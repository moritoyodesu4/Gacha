<template>
  <BaseTemplate :currentUser="currentUser" :isTop="true">
    <div class="top-sp">
      <div class="logo">
          <img src="/img/mobile/logo.png" width="100%" />
      </div>
      <div class="button-container">
          <CommonButton
            class="bg-red font-vdl"
            text="ログイン"
            @handleBtnClick="goToLogin"
          />
          <CommonButton
            class="bg-black font-vdl"
            text="会員登録"
            @handleBtnClick="goToRegister"
          />
      </div>
      <div class="notice-container">
          <p class="notice">会員登録いただくと、ここに会員ID並びにバーコードが表示されます。<br>店舗での買い物や買取などがスムーズにお得にご利用いただけます。</p>
          <p class="notice">Gacha24の会員様は、自動で会員情報を同期しておりますので、<br>登録なしに、ログインいただけます。</p>
      </div>
      <div class="shop-container">
          <ImageButton
              image_url='/img/mobile/ic_minny_gacha.png'
              text='Gacha'
              class="font-co"
          />
          <ImageButton
              image_url='/img/mobile/ic_gacha_24.png'
          />
          <ImageButton
              image_url='/img/mobile/ic_shop.png'
              text='通  販'
              class="font-han"
          />
      </div>
      <div class="footer-menu-container">
        <CommonButton
          class="bg-white font-han"
          text="ご利用ガイド"
          @handleBtnClick="goToSpecificCommerce"
        />
        <CommonButton
          class="bg-white font-han"
          text="利用規約"
          style="width: 45%"
          @handleBtnClick="goToTermsOfService"
        />
      </div>
      <div class="footer-menu-container">
        <CommonButton
          class="bg-white font-han"
          text="個人情報保護ポリシー"
          style="font-size: 13px; padding: 8px 10px"
          @handleBtnClick="goToPrivacyProtection"
        />
        <CommonButton
          class="bg-white font-han"
          text="特定商取引法"
          @handleBtnClick="goToUserGuide"
        />
      </div>

   </div>

  </BaseTemplate>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import CommonButton from '@/components/atoms/CommonButton.vue';
import ImageButton from '@/components/atoms/ImageButton.vue';

export default {
  name: 'Top',

  components: {
    BaseTemplate,
    CommonButton,
    ImageButton,
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
.top-sp{
  background-image: url('/img/mobile/bg.png');
  width: 375px;
  max-width: 100%;
  min-height: 100%;
  padding: 50px 20px 32px 20px;
  margin: 0 auto;
  height: 100vh;
  .logo {
    width: 90px;
    margin: 50px auto;
  }
  .button-container {
    width: 160px;
    margin: 50px auto 20px;
  }
  .notice-container {
    width: 320px;
    margin: 30px auto 50px;
  }
  .notice {
    text-align: left;
    font-size: 10px;
    color: #E8102B;
    font-family: $kozukaM;
    margin-bottom: 0;
  }
  .shop-container {
    display: inline-flex;
    margin-bottom: 15px;
  }
  .footer-menu-container {
    display: inline-flex;
    margin-bottom: 5px;
  }
  .footer-menu-container a {
    min-width: 160px !important;
    max-width: 160px !important;
    max-height: 45px;
    margin: 5px;
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
