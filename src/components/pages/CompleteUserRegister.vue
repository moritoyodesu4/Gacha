<template>
  <BaseTemplate>
    <div class="complete-user-register">
      <PageTitle title="会員登録完了" />
      <div class="description">
        <span class="text">会員のご登録</span>
        <span class="text">ありがとうございました。</span>
        <span class="text">引き続き商品のご購入を</span>
        <span class="text">お楽しみください。</span>
      </div>
      <BlackGradationButton
        class="square-button"
        text="TOPページへ"
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
  name: 'CompleteUserRegister',

  beforeRouteLeave(to, from, next) {
    if (to.name === 'ConfirmUserRegister') {
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
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.complete-user-register{
  width: 100%;
  max-width: 680px;
  min-height: 100%;
  padding: 70px 30px 0px;
  margin: 0px auto;
  text-align: center;
  .description{
    display: flex;
    flex-direction: column;
    height: 113px;
    margin-top: 40px;
    .text{
      font-family: $notoSans;
      font-size: 18px;
      line-height: 1.6;
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
