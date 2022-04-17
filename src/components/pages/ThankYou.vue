<template>
  <BaseTemplate :currentUser="currentUser">
    <LeafBox class="leaf_box">
      <div class="thank-you">
        <img src="/img/logo_gray.png">
        <div class="midashi">商品を購入しました！</div>
        <div class="description">
          <span class="text">この度はご利用くださり、</span>
          <span class="text">誠にありがとうございました。</span>
          <span class="text">発送希望いただいた商品は、</span>
          <span class="text">原則14営業日前後で発送いたします。</span>
          <span class="text">またご縁をいただけることがございましたら、</span>
          <span class="text">何卒よろしくお願いいたします。</span>
        </div>
      </div>
    </LeafBox>
    <div class="button-area">
      <BlackGradationButton
        class="square-button"
        text="TOPページへ"
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

export default {
  name: 'ThankYou',

  beforeRouteLeave(to, from, next) {
    if (to.name === 'ConfirmGetCardList') {
      next(false);
    } else {
      next();
    }
  },

  components: {
    BaseTemplate,
    LeafBox,
    BlackGradationButton,
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
    }),
  },

  created() {
    this.$store.dispatch('user/setCurrentUser', { token: 'yugi' });
  },

  methods: {
    goToTop() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.leaf_box {
  max-width: 700px;
  margin: 50px auto 0 auto;
}
.thank-you{
  width: 100%;
  max-width: 680px;
  min-height: 100%;
  padding: 30px 30px 30px;
  margin: 0px auto;
  text-align: center;
  color: $deepGray;
  .midashi {
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 30px;
    font-weight: 700;
  }
  .description{
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    .text{
      font-family: $notoSans;
      font-size: 16px;
      line-height: 1.6;
    }
  }
}
.button-area {
  margin: 50px auto;
  width: 200px;
}
@media screen and  (max-width: $tabletWidth) {
  .leaf_box {
    margin: 50px 10px;
  }
  .thank-you {
    padding: 30px 0 0 0;
    img {
      max-width: 240px;
      width: 90%;
    }
    .midashi {
      font-size: 24px;
    }
    .description {
      .text {
        font-size: 14px;
      }
    }
  }
}
</style>
