<template>
  <BaseTemplate>
    <div class="password-reissue">
      <PageTitle title="仮パスワード発行" />
      <div class="description">
        <span class="text">仮のパスワードをご登録のメールアドレスへ</span>
        <span class="text">送信いたします。</span>
      </div>
      <div class="mail-text-container">
        <LabelInput
          class="label-input"
          labelText="メールアドレス"
        >
          <TextBox
            class="text-box mail"
            @handleTextInput="inputMail"
          />
        </LabelInput>
        <ErrorMessage
          v-if="errorMessageMail"
          class="error-message"
          :message="errorMessageMail"
        />
      </div>
      <BlackGradationButton
        class="square-button send-mail"
        text="メール送信"
        @handleSquareBtnClick="sendPasswordMail"
      />
    </div>
  </BaseTemplate>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import TextBox from '@/components/atoms/TextBox.vue';
import ErrorMessage from '@/components/atoms/ErrorMessage.vue';
import PageTitle from '@/components/atoms/PageTitle.vue';
import BlackGradationButton from '@/components/atoms/BlackGradationButton.vue';
import LabelInput from '@/components/molecules/LabelInput.vue';

export default {
  name: 'PasswordReissue',

  components: {
    BaseTemplate,
    TextBox,
    ErrorMessage,
    PageTitle,
    BlackGradationButton,
    LabelInput,
  },

  data: () => ({
    mail: null,
    errorMessageMail: null,
  }),

  computed: {
    ...mapGetters({
      reissuePasswordResult: 'user/reissuePasswordResult',
    }),
  },

  watch: {
    reissuePasswordResult(newVal) {
      if (newVal) {
        if (newVal.state === 200) {
          this.$store.dispatch('user/clearReissuePasswordResult');
          this.$router.push('/complete-password-reissue');
        } else {
          const { mail } = newVal.errors;
          this.errorMessageMail = mail ? mail[0] : null;
        }
      }
    },
  },

  methods: {
    inputMail(mail) {
      this.mail = mail;
    },
    sendPasswordMail() {
      const postParams = {
        mail: this.mail,
      };
      this.$store.dispatch('user/reissuePassword', { postParams });
    },
  },
};
</script>

<style lang="scss" scoped>
.password-reissue{
  width: 100%;
  max-width: 680px;
  min-height: 100%;
  padding: 70px 30px 0px;
  margin: 0px auto;
  text-align: center;
  .password-reissue-title{
    .text{
      height: 35px;
      font-family: $notoSerif;
      font-size: 24px;
      font-weight: 700;
      color: $white;
    }
  }
  .description{
    display: flex;
    flex-direction: column;
    height: 43px;
    margin-top: 40px;
    .text{
      font-family: $notoSans;
      font-size: 14px;
      line-height: 23.4px;
      color: $deepGray;
    }
  }
  .mail-text-container{
    width: 315px;
    margin: 20px auto 0 auto;
    .text-box{
      &.mail{
      }
    }
  }
  .square-button{
    width: 200px;
    height: 50px;
    margin: 40px auto 0px;
  }
}
</style>
