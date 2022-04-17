<template>
  <div class="common-footer">
    <DoubleBorderBox
      class="footer-btn"
      iconClassName="fa-home-lg"
      text="トップ"
      @handleClickDoubleBorderBox="goToTop"
    />
    <DoubleBorderBox
      class="footer-btn"
      iconClassName="fa-user"
      text="マイページ"
      @handleClickDoubleBorderBox="goToMyPage"
    />
    <DoubleBorderBox
      class="footer-btn"
      iconClassName="fa-database"
      text="ポイント購入"
      @handleClickDoubleBorderBox="goToBuyPoint"
    />
    <DoubleBorderBox
      class="footer-btn"
      iconClassName="fa-history"
      text="商品購入履歴"
      @handleClickDoubleBorderBox="goToBuyProductHistory"
    />
  </div>
</template>

<script>
import DoubleBorderBox from '@/components/molecules/DoubleBorderBox.vue';

export default {
  name: 'CommonFooter',

  components: {
    DoubleBorderBox,
  },

  props: {
    currentUser: {
      type: Object,
    },
  },

  methods: {
    goToLogin() {
      // ログインしていない場合、ログイン画面へ。routerのbeforeEachだとエラーが出る。（リダイレクトはされる）
      const query = {
        packId: this.$route.query.packId,
      };
      this.$router.push({
        path: '/login',
        query: this.$route.query.packId ? query : null,
      });
    },
    goToTop() {
      if (this.$route.name === 'Top') {
        return;
      }
      this.$router.push('/');
    },
    goToMyPage() {
      if (this.$route.name === 'MyPage') {
        return;
      }
      if (this.currentUser.is_login === '0') {
        if (this.$route.name === 'UserLogin') {
          return;
        }
        this.goToLogin();
        return;
      }
      this.$router.push('/my-page');
    },
    goToBuyPoint() {
      if (this.$route.name === 'BuyPoint') {
        return;
      }
      if (this.currentUser.is_login === '0') {
        if (this.$route.name === 'UserLogin') {
          return;
        }
        this.goToLogin();
        return;
      }
      let url = '/buy-point';
      if (this.$route.params.productId) {
        url += `/${this.$route.params.productId}`;
      }
      this.$router.push(url);
    },
    goToBuyProductHistory() {
      if (this.$route.name === 'BuyProductHistory') {
        return;
      }
      if (this.currentUser.is_login === '0') {
        if (this.$route.name === 'UserLogin') {
          return;
        }
        this.goToLogin();
        return;
      }
      this.$router.push('/buy-product-history');
    },
  },
};
</script>

<style lang="scss" scoped>
.common-footer {
  display: none;
}
@media screen and (max-width: $tabletWidth) {
  .common-footer{
    display: flex;
    background-color: $deepGray;
    padding: 5px 6px;
    z-index: 10005;
    .footer-btn{
      flex: 1 1 87px;
      height: 70px;
      cursor: pointer;
      & + .footer-btn{
        margin-left: 5px;
      }
    }
  }
}
</style>
