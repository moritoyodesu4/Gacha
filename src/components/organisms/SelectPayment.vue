<template>
  <div class="select-payment">
    <ShadowBox class="shadow-box" opacity="_60">
      <span class="select-payment-title">決済方法を選択</span>
      <span v-for="(payment) in paymentList" :key="payment.id" class="pay_list">
        <RadioItem
          class="radio-item"
          :paymentId="payment.id"
          :name="payment.name"
          :memo="payment.memo"
          :isChecked="currentPaymentId === payment.id"
          @handleRadioBtnClick="handleRadioBtnClick"
        />
        <div class="credit_icon" v-if="currentPaymentId === 1 && payment.id === 1">
          <img src="/img/credit/visa.png">
          <img src="/img/credit/master.png">
          <img src="/img/credit/jcb.png">
          <img src="/img/credit/amex.png">
          <img src="/img/credit/dc.png">
          <img src="/img/credit/diners.png">
        </div>
        <div v-if="currentPaymentId === 1 && payment.id === 1" class="area-base">
          <LabelInput class="label-input" labelText="カード番号">
            <div class="card-area">
              <div class="last-name-container">
                <TextBox
                  class="text-box last-name input-center"
                  inputType="tel"
                  v-model="card_number01"
                  placeholder=""
                  maxlength="4"
                  @handleTextInput="handleTextInput('card_number01', $event)"
                />
              </div>
              <div class="first-name-container">
                <TextBox
                  class="text-box first-name input-center"
                  inputType="tel"
                  v-model="card_number02"
                  placeholder=""
                  maxlength="4"
                  @handleTextInput="handleTextInput('card_number02', $event)"
                />
              </div>
              <div class="first-name-container">
                <TextBox
                  class="text-box first-name input-center"
                  inputType="tel"
                  v-model="card_number03"
                  placeholder=""
                  maxlength="4"
                  @handleTextInput="handleTextInput('card_number03', $event)"
                />
              </div>
              <div class="first-name-container">
                <TextBox
                  class="text-box first-name input-center"
                  inputType="tel"
                  v-model="card_number04"
                  placeholder=""
                  maxlength="4"
                  @handleTextInput="handleTextInput('card_number04', $event)"
                />
              </div>
            </div>
          </LabelInput>
          <div class="card_flex">
            <LabelInput class="label-input" labelText="有効期限" style="width:220px;">
              <div class="card-area">
                <div class="last-name-container">
                  <TextBox
                    class="text-box last-name input-center"
                    inputType="tel"
                    v-model="limit_month"
                    placeholder="月"
                    maxlength="2"
                    @handleTextInput="handleTextInput('limit_month', $event)"
                  />
                </div>
                <div class="first-name-container">
                  <TextBox
                    class="text-box first-name input-center"
                    inputType="tel"
                    v-model="limit_year"
                    placeholder="年"
                    maxlength="2"
                    @handleTextInput="handleTextInput('limit_year', $event)"
                  />
                </div>
              </div>
            </LabelInput>
            <LabelInput
              class="label-input"
              labelText="セキュリティコード"
              style="width:380px;white-space: nowrap;"
            >
              <div class="card-area">
                <div class="last-name-container" style="width:100%;">
                  <TextBox
                    class="text-box last-name input-center"
                    inputType="tel"
                    v-model="cvc"
                    placeholder="CVC"
                    maxlength="4"
                    @handleTextInput="handleTextInput('cvc', $event)"
                  />
                </div>
              </div>
            </LabelInput>
          </div>
          <LabelInput class="label-input" labelText="カード名義" style="width:100%;">
            <div class="card-row">
              <div class="last-name-container">
                <TextBox
                  class="text-box last-name"
                  inputType="text"
                  v-model="card_name"
                  placeholder=""
                  maxlength="20"
                  @handleTextInput="handleTextInput('card_name', $event)"
                />
              </div>
            </div>
          </LabelInput>
        </div>
        <LabelInput
          v-if="currentPaymentId === 4 && payment.id === 4"
          class="label-input"
          labelText="振込口座名義"
          annotation="振込人名義（カタカナ）をご入力ください"
          style="width:100%;">
          <div class="card-row">
            <div class="last-name-container">
              <TextBox
                class="text-box area-base"
                inputType="text"
                placeholder=""
                @handleTextInput="handleAccountHolderChange"
              />
            </div>
          </div>
        </LabelInput>
<!--        <TextBox-->
<!--          v-if="currentPaymentId === 4 && payment.id === 4"-->
<!--          style="width: 90%;"-->
<!--          class="text-box area-base"-->
<!--          @handleTextInput="handleAccountHolderChange"-->
<!--        />-->
      </span>
      <ErrorMessage
        v-if="errorMessageAccountHolder"
        class="error-message"
        :message="errorMessageAccountHolder"
      />
    </ShadowBox>
  </div>
</template>

<script>
import ShadowBox from '@/components/atoms/ShadowBox.vue';
import TextBox from '@/components/atoms/TextBox.vue';
import ErrorMessage from '@/components/atoms/ErrorMessage.vue';
import RadioItem from '@/components/molecules/RadioItem.vue';
import LabelInput from '@/components/molecules/LabelInput.vue';

export default {
  name: 'SelectPayment',

  components: {
    ShadowBox,
    TextBox,
    ErrorMessage,
    RadioItem,
    LabelInput,
  },

  data: () => ({
    card_number01: '',
    card_number02: '',
    card_number03: '',
    card_number04: '',
    limit_month: '',
    limit_year: '',
    cvc: '',
    card_name: '',
  }),

  props: {
    paymentList: {
      type: Array,
    },
    currentPaymentId: {
      type: Number,
    },
    errorMessageAccountHolder: {
      type: String,
      default: null,
    },
  },

  methods: {
    handleRadioBtnClick(paymentId) {
      this.$emit('handleRadioBtnClick', paymentId);
    },
    handleAccountHolderChange(accountHolder) {
      this.$emit('handleAccountHolderChange', accountHolder);
    },
    handleTextInput(code, value) {
      this.$emit(code, value);
    },
    getData() {
      return {
        card_number01: this.card_number01,
        card_number02: this.card_number02,
        card_number03: this.card_number03,
        card_number04: this.card_number04,
        limit_month: this.limit_month,
        limit_year: this.limit_year,
        cvc: this.cvc,
        card_name: this.card_name,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.select-payment{
  width: 100%;
  .shadow-box{
    padding: 15px 20px;
    border-radius: 6px;
    flex-direction: column;
    align-items: flex-start;
    .credit_icon {
      display: flex;
      margin: 5px 0 5px 0;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 52px;
        margin: 2px;
      }
    }
    .pay_list {
      width: 600px;
      margin: 10px auto;
      .label-input {
        margin-top: 20px;
      }
    }
    .select-payment-title{
      font-family: $notoSans;
      font-size: 20px;
      color: $deepGray;
      display: block;
      width: 100%;
      margin-top: 20px;
      border-bottom: solid 1px $deepGray;
      padding-bottom: 40px;
      margin-bottom: 20px;
    }
    .radio-item{
      margin-top: 10px;
    }
    .text-box{
      width: 100%;
      margin-top: 5px;
      padding-left: 30px;
    }
  }
}
@media screen and  (max-width: $tabletWidth) {
  .select-payment{
    .shadow-box{
      padding: 15px 0;
      .credit_icon {
        img {
          width: 36px;
        }
      }
      .pay_list {
        width: 100%;
      }
      .select-payment-title{
        border-bottom: solid 1px $deepGray;
        padding-bottom: 20px;
        margin: 0 0 10px 0;
      }
    }
  }
}
</style>
<style lang="scss">
.area-base {
  margin-left: 0;
  .card_flex {
    display: flex;
  }
  .card-area {
    display: flex;

    div {
      margin-right: 8px;
    }
    .input-center {
      padding-left: 0!important;
      padding-right: 0!important;
      input {
        text-align: center!important;
      }
    }
  }
  .card-row {
    div {
      margin-right: 8px;
    }
  }
}
</style>
