<template>
  <BaseTemplate>
    <div class="user-register">
      <PageTitle title="会員登録" />
      <span class="text description">以下に登録情報をご入力ください。</span>
      <LabelInput class="label-input" labelText="氏名">
        <div class="user-name">
          <div class="last-name-container">
            <TextBox
              class="text-box last-name"
              inputType="text"
              :value="lastName"
              placeholder="姓"
              @handleTextInput="inputLastName"
            />
            <ErrorMessage
              v-if="errorMessageLastName"
              class="error-message"
              :message="errorMessageLastName"
            />
          </div>
          <div class="first-name-container">
            <TextBox
              class="text-box first-name"
              inputType="text"
              :value="firstName"
              placeholder="名"
              @handleTextInput="inputFirstName"
            />
            <ErrorMessage
              v-if="errorMessageFirstName"
              class="error-message"
              :message="errorMessageFirstName"
            />
          </div>
        </div>
      </LabelInput>
      <LabelInput class="label-input" labelText="電話番号" annotation="「−」ハイフンは不要です">
        <TextBox
          class="text-box tel"
          inputType="Number"
          :value="tel"
          placeholder="01234567890"
          @handleTextInput="inputTel"
        />
        <ErrorMessage
          v-if="errorMessageTel"
          class="error-message"
          :message="errorMessageTel"
        />
      </LabelInput>
      <LabelInput class="label-input" labelText="メールアドレス" annotation="@yahooや@gmailなどを推奨します">
        <TextBox
          class="text-box mail"
          inputType="mail"
          :value="mail"
          placeholder="example@gamil.com"
          @handleTextInput="inputMail"
        />
        <ErrorMessage
          v-if="errorMessageMail"
          class="error-message"
          :message="errorMessageMail"
        />
      </LabelInput>
      <div class="flex_box">
        <LabelInput class="label-input" labelText="郵便番号" annotation="「−」ハイフンは不要です">
          <TextBox
            class="text-box zip-code"
            inputType="Number"
            :value="zipCode"
            placeholder="0000000"
            @handleTextInput="inputZipCode"
            @handleTextChange="changeZipCode"
          />
          <ErrorMessage
            v-if="errorMessageZipCode"
            class="error-message"
            :message="errorMessageZipCode"
          />
        </LabelInput>
        <LabelInput class="label-input" labelText="都道府県">
          <SelectBox
            class="select-box prefecture-id"
            :options="prefectureList"
            :selectedOption="prefectureId"
            placeholder=""
            @handleSelectChange="selectPrefectureId"
          />
          <ErrorMessage
            v-if="errorMessagePrefectureId"
            class="error-message"
            :message="errorMessagePrefectureId"
          />
        </LabelInput>
        <LabelInput class="label-input" labelText="市区町村">
          <TextBox
            class="text-box shiku"
            inputType="text"
            :value="shiku"
            placeholder=""
            @handleTextInput="inputShiku"
          />
          <ErrorMessage
            v-if="errorMessageShiku"
            class="error-message"
            :message="errorMessageShiku"
          />
        </LabelInput>
      </div>
      <LabelInput class="label-input" labelText="番地">
        <TextBox
          class="text-box address"
          inputType="text"
          :value="address"
          placeholder="番地を入力してください"
          @handleTextInput="inputAddress"
        />
        <ErrorMessage
          v-if="errorMessageAddress"
          class="error-message"
          :message="errorMessageAddress"
        />
      </LabelInput>
      <LabelInput
        class="label-input"
        labelText="建物名"
        annotation="配送トラブル防止のため、該当する場合は略さずに必ず記載して下さい。"
      >
        <TextBox
          class="text-box address"
          inputType="text"
          :value="building"
          placeholder="建物名を入力してください"
          @handleTextInput="inputBuilding"
        />
        <ErrorMessage
          v-if="errorMessageBuilding"
          class="error-message"
          :message="errorMessageBuilding"
        />
      </LabelInput>
      <LabelInput class="label-input" labelText="パスワード">
        <TextBox
          class="text-box password"
          inputType="password"
          :value="password"
          placeholder="半角英数字6文字以上20文字以内"
          @handleTextInput="inputPassword"
        />
        <ErrorMessage
          v-if="errorMessagePassword"
          class="error-message"
          :message="errorMessagePassword"
        />
      </LabelInput>
      <LabelInput class="label-input" labelText="パスワード確認用">
        <TextBox
          class="text-box password confirm"
          inputType="password"
          :value="confirmPass"
          placeholder="半角英数字6文字以上20文字以内"
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
        text="入力内容を確認する"
        @handleSquareBtnClick="goToConfirmUserRegister"
      />
    </div>
  </BaseTemplate>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import TextBox from '@/components/atoms/TextBox.vue';
import SelectBox from '@/components/atoms/SelectBox.vue';
import ErrorMessage from '@/components/atoms/ErrorMessage.vue';
import LabelInput from '@/components/molecules/LabelInput.vue';
import PageTitle from '@/components/atoms/PageTitle.vue';
import BlackGradationButton from '@/components/atoms/BlackGradationButton.vue';

export default {
  name: 'UserRegister',

  components: {
    BaseTemplate,
    TextBox,
    SelectBox,
    ErrorMessage,
    LabelInput,
    PageTitle,
    BlackGradationButton,
  },

  data: () => ({
    lastName: null,
    firstName: null,
    tel: null,
    mail: null,
    zipCode: null,
    prefectureId: null,
    shiku: null,
    address: null,
    building: null,
    password: null,
    confirmPass: null,
    errorMessageLastName: null,
    errorMessageFirstName: null,
    errorMessageTel: null,
    errorMessageMail: null,
    errorMessageZipCode: null,
    errorMessagePrefectureId: null,
    errorMessageShiku: null,
    errorMessageAddress: null,
    errorMessageBuilding: null,
    errorMessagePassword: null,
  }),

  computed: {
    ...mapGetters({
      prefectureList: 'prefecture/prefectureList',
      currentAddress: 'zipCode/currentAddress',
      confirmUserResult: 'user/confirmUserResult',
    }),
  },

  watch: {
    currentAddress(newVal) {
      if (newVal) {
        if (newVal.state === 200) {
          const { result } = newVal;
          this.selectPrefectureId(result[0].prefcode);
          this.inputShiku(`${result[0].address2}${result[0].address3}`);
        }
      }
    },
    confirmUserResult(newVal) {
      if (newVal) {
        if (newVal.state === 200) {
          const query = {
            lastName: this.lastName,
            firstName: this.firstName,
            tel: this.tel,
            mail: this.mail,
            zipCode: this.zipCode,
            prefectureId: this.prefectureId,
            shiku: this.shiku,
            address: this.address,
            building: this.building,
            password: this.password,
            confirmPass: this.confirmPass,
          };
          this.$store.dispatch('user/clearConfirmUserResult');
          this.$router.push({ path: '/confirm-user-register', query });
        } else {
          const {
            lastName, firstName, tel, mail, zipcode,
            pref_id: prefId, shiku, address, building, pass,
          } = newVal.errors;
          this.errorMessageLastName = lastName ? lastName[0] : null;
          this.errorMessageFirstName = firstName ? firstName[0] : null;
          this.errorMessageTel = tel ? tel[0] : null;
          this.errorMessageMail = mail ? mail[0] : null;
          this.errorMessageZipCode = zipcode ? zipcode[0] : null;
          this.errorMessagePrefectureId = prefId ? prefId[0] : null;
          this.errorMessageShiku = shiku ? shiku[0] : null;
          this.errorMessageAddress = address ? address[0] : null;
          this.errorMessageBuilding = building ? building[0] : null;
          this.errorMessagePassword = pass ? pass[0] : null;
        }
      }
    },
  },

  created() {
    this.lastName = this.$route.query.lastName || null;
    this.firstName = this.$route.query.firstName || null;
    this.tel = this.$route.query.tel || null;
    this.mail = this.$route.query.mail || null;
    this.zipCode = this.$route.query.zipCode || null;
    this.prefectureId = this.$route.query.prefectureId || null;
    this.shiku = this.$route.query.shiku || null;
    this.address = this.$route.query.address || null;
    this.building = this.$route.query.building || null;
    this.password = this.$route.query.password || null;
    this.confirmPass = this.$route.query.confirmPass || null;
    this.$store.dispatch('prefecture/setPrefectureList');
  },

  methods: {
    inputLastName(lastName) {
      this.lastName = lastName;
    },
    inputFirstName(firstName) {
      this.firstName = firstName;
    },
    inputTel(tel) {
      this.tel = tel;
    },
    inputMail(mail) {
      this.mail = mail;
    },
    inputZipCode(zipCode) {
      this.zipCode = zipCode;
    },
    selectPrefectureId(prefectureId) {
      this.prefectureId = prefectureId;
    },
    inputShiku(shiku) {
      this.shiku = shiku;
    },
    inputAddress(address) {
      this.address = address;
    },
    inputBuilding(building) {
      this.building = building;
    },
    inputPassword(password) {
      this.password = password;
    },
    inputConfirmPass(confirmPass) {
      this.confirmPass = confirmPass;
    },
    changeZipCode() {
      const zipCodeLength = 7;
      if (String(this.zipCode).length === zipCodeLength) {
        const postParams = {
          zipcode: this.zipCode,
        };
        this.$store.dispatch('zipCode/setCurrentAddress', { postParams });
      }
    },
    goToConfirmUserRegister() {
      const postParams = {
        lastName: this.lastName,
        firstName: this.firstName,
        tel: this.tel,
        mail: this.mail,
        zipcode: this.zipCode,
        pref_id: this.prefectureId,
        shiku: this.shiku,
        address: this.address,
        building: this.building,
        pass: this.password,
        confirmPass: this.confirmPass,
      };
      this.$store.dispatch('user/confirmUser', { postParams });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-register{
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
  .label-input{
    width: 100%;
    margin-top: 20px;
    .user-name{
      display: flex;
      width: 100%;
      margin-top: 10px;
      .last-name-container{
        flex: 1 1 150px;
        min-width: 0;
      }
      .first-name-container{
        flex: 1 1 150px;
        min-width: 0;
        margin-left: 15px;
      }
      .text-box{
        margin-top: 0px;
      }
    }
    .text-box{
      margin-top: 10px;
      width: 100%;
      height: 40px;
    }
    .select-box{
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
.flex_box {
  display: flex;
  .label-input {
    &:nth-child(1) {
      margin-right: 5px;
    }
    &:nth-child(2) {
      margin-left: 5px;
      margin-right: 5px;
    }
    &:nth-child(3) {
      margin-left: 5px;
    }
  }
}
@media screen and  (max-width: $tabletWidth) {
  .flex_box{
    width: 100%;
    flex-direction: column;
    .label-input {
      &:nth-child(1) {
        margin-right: 0;
      }
      &:nth-child(2) {
        margin-left: 0;
        margin-right: 0;
      }
      &:nth-child(3) {
        margin-left: 0;
      }
    }
  }
}
</style>
