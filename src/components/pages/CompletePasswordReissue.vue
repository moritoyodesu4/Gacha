<template>
  <BaseTemplate>
    <div class="complete-password-reissue">
      <PageTitle title="仮パスワード送信完了" />
      <div class="description">
        <span class="text">仮のパスワードをご登録のメールアドレスへ</span>
        <span class="text">送信いたしました。</span>
        <span class="text">メールを受信してご確認ください。</span>
      </div>
      <BlackGradationButton
        class="square-button"
        text="ログインへ戻る"
        @handleSquareBtnClick="goToUserLogin"
      />
    </div>
  </BaseTemplate>
</template>

<script>
import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import PageTitle from '@/components/atoms/PageTitle.vue';
import BlackGradationButton from '@/components/atoms/BlackGradationButton.vue';

export default {
  name: 'CompletePasswordReissue',

  beforeRouteLeave(to, from, next) {
    if (to.name === 'PasswordReissue') {
      next(false);
    } else {
      next();
    }
  },

  components: {
    BaseTemplate,
    PageTitle,
    BlackGradationButton,
  },

  methods: {
    goToUserLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
.complete-password-reissue{
  width: 100%;
  max-width: 680px;
  min-height: 100%;
  padding: 70px 30px 0;
  margin: 0 auto;
  text-align: center;
  .description{
    display: flex;
    flex-direction: column;
    height: 67px;
    margin-top: 40px;
    .text{
      font-family: $notoSans;
      font-size: 14px;
      line-height: 23.4px;
      color: $deepGray;
    }
  }
  .square-button{
    width: 200px;
    height: 50px;
    margin: 40px auto 0px;
  }
}
</style>
