<template>
  <BaseTemplate :show_head="true">
    <div class="user-login" @keydown.enter="login" tabindex="0">
      <PageTitle title="会員ログイン" />
      <LabelInput
        class="label-input"
        labelText="メールアドレス"
      >
        <div class="card-area">
          <div class="last-name-container" style="width:100%;">
            <TextBox
              class="text-box mail"
              :value="mail"
              placeholder="メールアドレス"
              @handleTextInput="inputMail"
            />
          </div>
        </div>
      </LabelInput>
      <LabelInput
        class="label-input label-password"
        labelText="パスワード"
      >
        <div class="card-area">
          <div class="last-name-container" style="width:100%;">
            <TextBox
              class="text-box password"
              :inputType="isShowPassword ? 'text' : 'password'"
              :value="password"
              placeholder="パスワード"
              @handleTextInput="inputPassword"
            >
              <template v-slot:right>
                <div
                  class="icon eye"
                  @click.stop="toggleShowPassword"
                >
                  <i class="fas fa-eye" />
                  <div v-show="isShowPassword" class="icon slash">
                    <i class="far fa-slash"></i>
                  </div>
                </div>
              </template>
            </TextBox>
          </div>
        </div>
      </LabelInput>
      <ErrorMessage
        v-if="errorMessage"
        class="error-message"
        :message="errorMessage"
      />
      <div class="check-box-container">
        <CheckBox
          class="check-box"
          :isChecked="isChecked"
          @handleCheckBoxClick="toggleCheck"
        />
        <span class="text">次回以降入力を省略する</span>
      </div>
      <BlackGradationButton
        class="square-button login"
        text="ログイン"
        @handleSquareBtnClick="login"
      />
      <div class="forget-password">
        <span class="text">パスワードをお忘れの場合は<a @click.stop="forgetPassword">こちら</a></span>
      </div>
      <div class="description">
        <span class="text">HPで既に会員登録を頂いている方も、こちらをご利用</span>
        <span class="text">いただく際は、新規会員登録が必須となります。</span>
        <span class="text">※HPでの会員登録情報と同じでも構いません。</span>
      </div>
      <CommonButton
        class="bg-red font-vdl"
        text="ログイン"
        @handleSquareBtnClick="login"
      />
    </div>
  </BaseTemplate>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import TextBox from '@/components/atoms/TextBox.vue';
import CheckBox from '@/components/atoms/CheckBox.vue';
import CommonButton from '@/components/atoms/CommonButton.vue';
import ErrorMessage from '@/components/atoms/ErrorMessage.vue';
import BlackGradationButton from '@/components/atoms/BlackGradationButton.vue';
import PageTitle from '@/components/atoms/PageTitle.vue';
import LabelInput from '@/components/molecules/LabelInput.vue';

export default {
  name: 'UserLogin',

  components: {
    BaseTemplate,
    TextBox,
    CheckBox,
    CommonButton,
    ErrorMessage,
    BlackGradationButton,
    PageTitle,
    LabelInput,
  },

  data: () => ({
    mail: null,
    password: null,
    isChecked: false,
    isShowPassword: false,
    errorMessage: '',
  }),

  computed: {
    ...mapGetters({
      loginUserResult: 'user/loginUserResult',
    }),
  },

  watch: {
    loginUserResult(newVal) {
      if (newVal) {
        if (newVal.state === 200) {
          this.$store.dispatch('user/clearLoginUserResult');
          const { packId } = this.$route.query;
          if (packId) {
            this.$router.push({ path: '/pack-detail', query: { packId } });
            return;
          }
          this.$router.push('/');
        } else {
          const { mail } = newVal.errors;
          this.errorMessage = mail ? mail[0] : null;
        }
      }
    },
  },

  methods: {
    inputMail(mail) {
      this.mail = mail;
    },
    inputPassword(password) {
      this.password = password;
    },
    toggleShowPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
    toggleCheck() {
      this.isChecked = !this.isChecked;
    },
    login(e) {
      // 日本語入力中のEnterのkeyCode(229)の場合は何もしない。
      if (e && e.keyCode === 229) {
        return;
      }
      const postParams = {
        mail: this.mail,
        pass: this.password,
      };
      if (this.isChecked) {
        postParams.save_cookie = '1';
      }
      this.$store.dispatch('user/loginUser', { postParams });
    },
    forgetPassword() {
      this.$router.push('/password-reissue');
    },
    goToUserRegister() {
      this.$router.push('/user-register');
    },
  },

};
</script>

<style lang="scss" scoped>
.user-login{
  width: 100%;
  max-width: 680px;
  min-height: 100%;
  padding: 100px 20px 20px;
  margin: 0px auto;
  text-align: center;
  outline: none;
  .login-title{
    display: flex;
    flex-direction: column;
    align-items: center;
    .text{
      height: 35px;
      font-family: $notoSerif;
      font-size: 24px;
      font-weight: 500;
      color: $white;
    }
    .logo{
      width: 176px;
      margin-top: 10px;
    }
  }
  .label-password {
    margin-top: 20px;
  }
  .text-box{
    width: 315px;
    margin: 0px auto;
    &.mail{
      width: 100%;
    }
    &.password{
      width: 100%;
      .icon.eye{
        position: relative;
        margin: 0px 5px 0px 10px;
        .fa-eye, .fa-slash{
          font-size: 18px;
          line-height: 1.5;
          color: $brown;
        }
        .fa-slash{
          position: absolute;
          top: calc(50% - 8px);
          left: calc(50% - 11px);
        }
      }
    }
  }
  .error-message{
    width: 315px;
    margin: 0px auto;
  }
  .check-box-container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto 0px;
    .check-box{
      width: 25px;
      height: 25px;
    }
    .text{
      margin-left: 10px;
      font-family: $notoSans;
      font-size: 16px;
      line-height: 1.8;
      color: $deepGray;
    }
  }
  .square-button{
    width: 200px;
    height: 50px;
    margin: 40px auto 0px;
  }
  .forget-password{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px auto 0px;
    .text{
      font-family: $notoSans;
      font-size: 14px;
      color: $deepGray;
      a {
        color: $red;
      }
    }
    .fa-angle-right{
      margin-left: 10px;
      font-size: 21px;
      line-height: 27px;
      color: $deepGray;
    }
  }
  .description{
    display: flex;
    flex-direction: column;
    height: 66px;
    margin-top: 40px;
    .text{
      font-family: $notoSans;
      font-size: 13px;
      line-height: 23.4px;
      color: $deepGray;
    }
  }
}
</style>
