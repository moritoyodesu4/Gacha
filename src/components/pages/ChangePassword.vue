<template>
  <BaseTemplate :currentUser="currentUser">
    <div class="change-password">
      <PageTitle title="パスワード変更" />
      <LabelInput class="label-input" labelText="新しいパスワード">
        <TextBox
          class="text-box password"
          inputType="password"
          :value="password"
          placeholder="半角英数字15文字以内"
          @handleTextInput="inputPassword"
        />
        <ErrorMessage
          v-if="errorMessagePassword"
          class="error-message"
          :message="errorMessagePassword"
        />
      </LabelInput>
      <LabelInput class="label-input" labelText="新しいパスワード確認用">
        <TextBox
          class="text-box password confirm"
          inputType="password"
          :value="confirmPass"
          placeholder="半角英数字15文字以内"
          @handleTextInput="inputConfirmPass"
        />
        <ErrorMessage
          v-if="errorMessagePassword"
          class="error-message"
          :message="errorMessagePassword"
        />
      </LabelInput>
      <BlackGradationButton
        class="square-button"
        text="変更する"
        @handleSquareBtnClick="updatePassword"
      />
      <AlertSuccess
        ref="alertSuccess"
        :isShow="isShowAlertSuccess"
        text="パスワードを変更しました。"
        v-click-outside="closeAlertSuccess"
      />
    </div>
  </BaseTemplate>
</template>

<script>
import { mapGetters } from 'vuex';
import ClickOutside from 'vue-click-outside';

import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import AlertSuccess from '@/components/atoms/AlertSuccess.vue';
import TextBox from '@/components/atoms/TextBox.vue';
import ErrorMessage from '@/components/atoms/ErrorMessage.vue';
import LabelInput from '@/components/molecules/LabelInput.vue';
import BlackGradationButton from '@/components/atoms/BlackGradationButton.vue';
import PageTitle from '@/components/atoms/PageTitle.vue';

export default {
  name: 'ChangePassword',

  components: {
    BaseTemplate,
    AlertSuccess,
    TextBox,
    ErrorMessage,
    LabelInput,
    BlackGradationButton,
    PageTitle,
  },

  directives: {
    ClickOutside,
  },

  data: () => ({
    password: null,
    confirmPass: null,
    isShowAlertSuccess: false,
    errorMessagePassword: null,
  }),

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      changeUserPasswordResult: 'user/changeUserPasswordResult',
    }),
  },

  watch: {
    changeUserPasswordResult(newVal) {
      if (newVal) {
        if (newVal.state === 200) {
          this.$store.dispatch('user/clearChangeUserPasswordResult');
          this.isShowAlertSuccess = true;
        } else {
          const { pass } = newVal.errors;
          this.errorMessagePassword = pass ? pass[0] : null;
        }
      }
    },
  },

  created() {
    this.$store.dispatch('user/setCurrentUser', { token: 'yugi' });
  },

  mounted() {
    this.popupItem = this.$refs.alertSuccess;
  },

  methods: {
    inputPassword(password) {
      this.password = password;
    },
    inputConfirmPass(confirmPass) {
      this.confirmPass = confirmPass;
    },
    updatePassword() {
      const postParams = {
        pass: this.password,
        confirmPass: this.confirmPass,
      };
      this.$store.dispatch('user/changeUserPassword', { postParams });
    },
    closeAlertSuccess() {
      if (this.isShowAlertSuccess) {
        this.isShowAlertSuccess = false;
        this.$router.push('./my-page');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.change-password{
  width: 100%;
  max-width: 680px;
  min-height: 100%;
  padding: 30px 30px 0px;
  margin: 0px auto;
  text-align: center;
  .change-password-title{
    .text{
      height: 44px;
      font-family: $notoSerif;
      font-size: 30px;
      font-weight: 700;
      color: $white;
      text-shadow: $titleShadow;
    }
  }
  .label-input{
    width: 100%;
    margin-top: 20px;
    .text-box{
      margin-top: 10px;
      width: 100%;
      height: 40px;
    }
  }
  .square-button{
    width: 200px;
    height: 50px;
    margin: 40px auto 0px;
  }
}
</style>
