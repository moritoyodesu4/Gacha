<template>
  <BaseTemplate :currentUser="currentUser">
    <div class="my-page">
      <PageTitle title="マイページ" />
      <LeafBox>
        <div class="point_area">
          <div class="point">{{point | comma}}</div>
          <div class="point_button_area">
            <SquareButton
              class="square-button"
              text="ポイント購入"
              @handleSquareBtnClick="goToPointBuy"
            />
            <BlackGradationButton
              class="square-button"
              text="ポイント履歴"
              @handleSquareBtnClick="goToPointHistory"
            />
          </div>
        </div>
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
            inputType="tel"
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
            :readonly="true"
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
              placeholder="都道府県を選択してください"
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
              placeholder="市区町村を入力してください"
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
        <LabelInput
          class="label-input"
          labelText="パスワード"
        >
          <SquareButton
            class="square-button2"
            text="パスワードを変更する"
            isMaxWidth="true"
            @handleSquareBtnClick="goToChangePassword"
          />
        </LabelInput>
        <BlackGradationButton
          class="square-button"
          text="更新する"
          @handleSquareBtnClick="upadateUserInfo"
        />
      </LeafBox>
      <AlertSuccess
        ref="alertSuccess"
        :isShow="isShowAlertSuccess"
        text="お客様情報を更新しました。"
        v-click-outside="closeAlertSuccess"
      />
    </div>
  </BaseTemplate>
</template>

<script>
import { mapGetters } from 'vuex';
import ClickOutside from 'vue-click-outside';
import {
  separateCharacterNumber,
} from '@/common/util/format';

import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import AlertSuccess from '@/components/atoms/AlertSuccess.vue';
import TextBox from '@/components/atoms/TextBox.vue';
import SelectBox from '@/components/atoms/SelectBox.vue';
import SquareButton from '@/components/atoms/SquareButton.vue';
import ErrorMessage from '@/components/atoms/ErrorMessage.vue';
import LabelInput from '@/components/molecules/LabelInput.vue';
import LeafBox from '@/components/organisms/LeafBox.vue';
import BlackGradationButton from '@/components/atoms/BlackGradationButton.vue';
import PageTitle from '@/components/atoms/PageTitle.vue';

export default {
  name: 'MyPage',

  components: {
    BaseTemplate,
    AlertSuccess,
    TextBox,
    SelectBox,
    SquareButton,
    ErrorMessage,
    LabelInput,
    LeafBox,
    BlackGradationButton,
    PageTitle,
  },

  directives: {
    ClickOutside,
  },

  filters: {
    comma(value) {
      return separateCharacterNumber(parseInt(value, 10));
    },
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
    point: null,
    confirmPass: null,
    isShowAlertSuccess: false,
    errorMessageLastName: null,
    errorMessageFirstName: null,
    errorMessageTel: null,
    errorMessageMail: null,
    errorMessageZipCode: null,
    errorMessagePrefectureId: null,
    errorMessageShiku: null,
    errorMessageAddress: null,
    errorMessageBuilding: null,
  }),

  computed: {
    ...mapGetters({
      prefectureList: 'prefecture/prefectureList',
      currentUser: 'user/currentUser',
      currentUserDetail: 'user/currentUserDetail',
      currentAddress: 'zipCode/currentAddress',
      changeUserInformationResult: 'user/changeUserInformationResult',
      logOutUserResult: 'user/logOutUserResult',
    }),
  },

  watch: {
    currentUserDetail(newResult) {
      this.$nextTick(() => {
        this.lastName = newResult.lastName;
        this.firstName = newResult.firstName;
        this.tel = newResult.tel;
        this.mail = newResult.mail;
        this.zipCode = newResult.zipcode;
        // this.prefectureId = newResult.pref_id;
        this.shiku = newResult.shiku;
        this.address = newResult.address;
        this.building = newResult.building;
        this.point = newResult.availablePoint;
        // MEMO: 都道府県リストが更新されないため、レンダリング完了を待ち、さらに少し時間差をつける。（100に根拠はないが、リロードして動作を確認）
        setTimeout(() => {
          this.prefectureId = newResult.pref_id;
        }, 100);
      });
    },
    currentAddress(newVal) {
      if (newVal) {
        if (newVal.state === 200) {
          const { result } = newVal;
          this.selectPrefectureId(result[0].prefcode);
          this.inputShiku(`${result[0].address2}${result[0].address3}`);
        }
      }
    },
    changeUserInformationResult(newVal) {
      if (newVal) {
        if (newVal.state === 200) {
          this.$store.dispatch('user/clearChangeUserInformationResult');
          this.isShowAlertSuccess = true;
        } else {
          const {
            lastName, firstName, tel, mail, zipcode, pref_id: prefId, shiku, address, building,
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
        }
      }
    },
    logOutUserResult(newVal) {
      if (newVal) {
        if (newVal.state === 200) {
          this.$store.dispatch('user/clearLogOutUserResult');
          this.$router.push('/login');
        }
      }
    },
  },

  created() {
    this.$store.dispatch('user/setCurrentUserDetail');
    this.$store.dispatch('prefecture/setPrefectureList');
  },

  mounted() {
    this.popupItem = this.$refs.alertSuccess;
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
    upadateUserInfo() {
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
      };
      this.$store.dispatch('user/changeUserInformation', { postParams });
    },
    logout() {
      this.$store.dispatch('user/logOutUser');
    },
    goToChangePassword() {
      this.$router.push('./change-password');
    },
    goToPointBuy() {
      this.$router.push('./buy-point');
    },
    goToPointHistory() {
      this.$router.push('./buy-point-history');
    },
    closeAlertSuccess() {
      this.isShowAlertSuccess = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.my-page{
  width: 100%;
  max-width: 680px;
  min-height: 100%;
  padding: 30px 30px 68px;
  margin: 0px auto;
  text-align: center;
  .point_area {
    padding-bottom: 30px;
    border-bottom: solid 1px $deepGray;
    width: 100%;
    .point {
      font-size: 32px;
      &:before {
        content: "P";
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background-color: $yellow;
        border-radius: 100px;
        color: $deepGray;
        margin-right: 10px;
      }
    }
    .point_button_area {
      display: flex;
      justify-content: space-between;
    }
  }
  .flex_box {
    display: flex;
    .label-input {
      &:nth-child(1) {
        margin-rigth: 5px;
      }

      &:nth-child(2) {
        margin-left: 5px;
        margin-rigth: 5px;
      }

      &:nth-child(3) {
        margin-left: 5px;
      }
    }
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
    height: 40px;
    margin: 40px auto 0px;
    padding: 0;
    &:nth-child(1) {
      margin-right: 5px;
    }
    &:nth-child(2) {
      margin-left: 5px;
    }
  }
  .square-button2{
    width: 100%;
    height: 40px;
    margin: 0;
    display: flex;
    justify-content: center;
    margin-left: 0!important;
  }
  .shadow-button-area{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 60px;
    .shadow-button{
      width: 255px;
      height: 30px;
      & + .shadow-button{
        margin-top: 20px;
      }
    }
  }
}
@media screen and  (max-width: $tabletWidth) {
  .my-page {
    padding: 30px 10px 68px;
  }
  .flex_box {
    width: 100%;
    flex-direction: column;
    .label-input {
      &:nth-child(1) {
        margin-right: 0!important;
      }
      &:nth-child(2) {
        margin-left: 0!important;
        margin-right: 0!important;
      }
      &:nth-child(3) {
        margin-left: 0!important;
      }
    }
  }
  .square-button2 {
    width: 100%!important;
  }
}
</style>
