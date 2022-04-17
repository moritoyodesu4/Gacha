<template>
  <BaseTemplate>
    <div class="confirm-user-register">
      <PageTitle title="入力内容確認" />
      <span class="text description">登録内容をご確認ください。</span>
      <LabelItem
        class="label-item"
        label="氏名"
        :text="fullName"
      />
      <LabelItem
        class="label-item"
        label="電話番号"
        :text="$route.query.tel"
      />
      <LabelItem
        class="label-item"
        label="メールアドレス"
        :text="$route.query.mail"
      />
      <LabelItem
        class="label-item"
        label="郵便番号"
        :text="$route.query.zipCode"
      />
      <LabelItem
        class="label-item"
        label="都道府県"
        :text="prefectureName"
      />
      <LabelItem
        class="label-item"
        label="市区町村"
        :text="$route.query.shiku"
      />
      <LabelItem
        class="label-item"
        label="番地"
        :text="$route.query.address"
      />
      <LabelItem
        class="label-item"
        label="建物名"
        :text="$route.query.building"
      />
      <LabelItem
        class="label-item"
        label="パスワード"
        :text="dispPassword"
      />
      <div class="button-area">
        <SquareButton
          class="square-button"
          text="修正する"
          :isSub="true"
          @handleSquareBtnClick="goToUserRegister"
        />
        <BlackGradationButton
          class="square-button"
          text="登録する"
          @handleSquareBtnClick="register"
        />
      </div>
    </div>
  </BaseTemplate>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import SquareButton from '@/components/atoms/SquareButton.vue';
import LabelItem from '@/components/molecules/LabelItem.vue';
import PageTitle from '@/components/atoms/PageTitle.vue';
import BlackGradationButton from '@/components/atoms/BlackGradationButton.vue';

export default {
  name: 'ConfirmUserRegister',

  components: {
    BaseTemplate,
    SquareButton,
    LabelItem,
    PageTitle,
    BlackGradationButton,
  },

  computed: {
    ...mapGetters({
      prefectureList: 'prefecture/prefectureList',
      appendUserResult: 'user/appendUserResult',
    }),
    fullName() {
      return `${this.$route.query.lastName}${this.$route.query.firstName}`;
    },
    dispPassword() {
      if (this.$route.query.password) {
        const passwordLength = this.$route.query.password.length;
        const dispPassword = Array(passwordLength + 1).join('●');
        return dispPassword;
      }
      return '';
    },
    prefectureName() {
      if (this.prefectureList) {
        return this.prefectureList.find(
          (prefecture) => prefecture.id === this.$route.query.prefectureId,
        ).name;
      }
      return null;
    },
  },

  watch: {
    appendUserResult(newVal) {
      if (newVal) {
        if (newVal.state === 200) {
          this.$store.dispatch('user/clearAppendUserResult');
          this.$router.push('complete-user-register');
        }
      }
    },
  },

  created() {
    this.$store.dispatch('prefecture/setPrefectureList');
  },

  methods: {
    goToUserRegister() {
      const query = {
        lastName: this.$route.query.lastName,
        firstName: this.$route.query.firstName,
        tel: this.$route.query.tel,
        mail: this.$route.query.mail,
        zipCode: this.$route.query.zipCode,
        prefectureId: this.$route.query.prefectureId,
        shiku: this.$route.query.shiku,
        address: this.$route.query.address,
        building: this.$route.query.building,
        password: this.$route.query.password,
        confirmPass: this.$route.query.confirmPass,
      };
      this.$router.push({ path: '/user-register', query });
    },
    register() {
      const postParams = {
        lastName: this.$route.query.lastName,
        firstName: this.$route.query.firstName,
        tel: this.$route.query.tel,
        mail: this.$route.query.mail,
        zipcode: this.$route.query.zipCode,
        pref_id: this.$route.query.prefectureId,
        shiku: this.$route.query.shiku,
        address: this.$route.query.address,
        building: this.$route.query.building,
        pass: this.$route.query.password,
        confirmPass: this.$route.query.confirmPass,
      };
      this.$store.dispatch('user/appendUser', { postParams });
    },
  },
};
</script>

<style lang="scss" scoped>
.confirm-user-register{
  width: 100%;
  max-width: 680px;
  min-height: 100%;
  padding: 50px 30px;
  margin: 0px auto;
  text-align: center;
  .description{
    display: inline-block;
    height: 20px;
    margin-top: 30px;
    font-family: $notoSans;
    font-size: 14px;
    line-height: 23.4px;
    color: $deepGray;
  }
  .label-item{
    width: 100%;
    height: 68px;
    margin-top: 20px;
    padding-bottom: 10px;
    color: $deepGray;
    border-bottom: 1px solid $deepGray;
  }
  .button-area{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    .square-button{
      width: 120px;
      height: 50px;
      & + .square-button{
        margin-left: 30px;
      }
    }
  }
}
</style>
