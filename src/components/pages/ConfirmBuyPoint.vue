<template>
  <BaseTemplate :currentUser="currentUser">
    <div class="confirm-buy-point">
      <PageTitle title="ポイント購入確認" />
      <LeafBox>
        <BorderArea class="point-value-area">
          <div class="price">&yen;{{dispPrice}}</div>
          <div class="cursor"><img src="/img/downarrow.png"></div>
          <div class="point">{{dispPoint}}</div>
        </BorderArea>
        <SelectPayment
          v-if="payList"
          ref="selectPayment"
          class="select-payment"
          :paymentList="payList.list"
          :currentPaymentId="currentPaymentId"
          :errorMessageAccountHolder="errorMessageAccountHolder"
          @handleRadioBtnClick="SelectPayment"
          @handleAccountHolderChange="accountHolderChange"
        />
        <div class="button_flex">
          <span class="text confirm">上記内容でよろしいですか？</span>
          <div class="button-area">
            <SquareButton
              class="square-button"
              text="キャンセル"
              :isSub="true"
              @handleSquareBtnClick="cancelPayment"
            />
            <BlackGradationButton
              class="square-button"
              text="決済にすすむ"
              @handleSquareBtnClick="makePayment"
            />
          </div>
        </div>
      </LeafBox>
    </div>
  </BaseTemplate>
</template>

<script defer language="javascript" :src="process.env.VUE_APP_PAYGENT_JS" charset="UTF-8"></script>
<script>
// index.htmlの読み込みも変える必要あり
import { mapGetters } from 'vuex';
import {
  separateCharacterNumber,
} from '@/common/util/format';

import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import ShadowBox from '@/components/atoms/ShadowBox.vue';
import SquareButton from '@/components/atoms/SquareButton.vue';
import SelectPayment from '@/components/organisms/SelectPayment.vue';
import LeafBox from '@/components/organisms/LeafBox.vue';
import BlackGradationButton from '@/components/atoms/BlackGradationButton.vue';
import PageTitle from '@/components/atoms/PageTitle.vue';
import BorderArea from '@/components/atoms/BorderArea.vue';

export default {
  name: 'ConfirmBuyPoint',

  components: {
    BaseTemplate,
    ShadowBox,
    SquareButton,
    SelectPayment,
    LeafBox,
    BlackGradationButton,
    PageTitle,
    BorderArea,
  },

  data: () => ({
    accountHolder: null,
    currentPaymentId: null,
    errorMessageAccountHolder: null,
  }),

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      currentPointPrice: 'pointPrice/currentPointPrice',
      payList: 'pay/payList',
      buyPointResult: 'user/buyPointResult',
    }),
    dispPoint() {
      if (this.payList) {
        return separateCharacterNumber(this.payList.point);
      }
      return 0;
    },
    dispPrice() {
      if (this.payList) {
        return separateCharacterNumber(this.payList.price);
      }
      return 0;
    },
  },

  watch: {
    currentPointPrice(newVal) {
      if (newVal) {
        this.$store.dispatch('pay/setPayList');
      }
    },
    payList(newVal) {
      if (newVal && newVal.list.length > 0) {
        this.currentPaymentId = newVal.list[0].id;
      }
    },
    buyPointResult(newVal) {
      if (newVal) {
        if (newVal.state === 200 && newVal.result === '1') {
          if (newVal.payment_id) {
            this.$router.push(`/confirm-combini?paymentID=${newVal.receipt_number}`);
          } else {
            if (newVal.url === '1') {
              alert('決済が成功し、ポイントに反映しました。');
            }
            this.$store.dispatch('user/clearBuyPointResult');
            if (newVal.url.startsWith('http')) {
              this.$store.dispatch('setIsLoading', true);
              window.location.href = newVal.url;
            } else {
              this.$router.push(newVal.url);
            }
          }
        } else {
          alert('決済が失敗しました。クレジットカードの状態をご確認ください。\n状態が不明な場合は、クレジットカード会社にお問い合わせください。');
          const { name } = newVal.errors;
          this.errorMessageAccountHolder = name ? name[0] : null;
        }
      }
    },
  },

  created() {
    const { pointPriceId } = this.$route.query;
    if (pointPriceId) {
      // pointPriceIdが存在すれば、選択されたpoint_priceをサーバーのsessionに格納、watchしているsetPayListでsessionに格納した値を取得。
      this.$store.dispatch('pointPrice/setCurrentPointPrice', { pointPriceId });
    } else {
      // pointPriceIdが存在しなければsessionに格納されているpoint_priceから呼び出す。
      this.$store.dispatch('pay/setPayList');
    }
  },

  methods: {
    SelectPayment(paymentId) {
      this.currentPaymentId = paymentId;
    },
    accountHolderChange(accountHolder) {
      this.accountHolder = accountHolder;
    },
    cancelPayment() {
      if (this.$route.query.packId) {
        const query = {
          packId: this.$route.query.packId,
        };
        this.$router.push({ path: '/buy-point', query });
        return;
      }
      this.$router.push('/buy-point');
    },
    makePayment() {
      if (this.currentPaymentId === 1) {
        this.checkPaygent();
      } else if (this.currentPaymentId === 2) {
        const postParams = {
          pay_id: this.currentPaymentId,
        };
        this.$store.dispatch('user/buyPoint', { postParams });
      } else if (this.currentPaymentId === 3) {
        const postParams = {
          pay_id: this.currentPaymentId,
        };
        this.$store.dispatch('user/buyPoint', { postParams });
      } else if (this.currentPaymentId === 4) {
        const postParams = {
          pay_id: this.currentPaymentId,
          name: this.accountHolder,
        };
        this.$store.dispatch('user/buyPoint', { postParams });
      }
    },
    checkPaygent() {
      // const gID = '41161'; // マーチャントID(test)
      // const gKey = 'test_fc0XnocUcXteKklGeZsPbEqb'; // トークン生成鍵
      // const gID = process.env.VUE_APP_PAYGENT_ID; // マーチャントID(本番)
      // const gKey = process.env.VUE_APP_PAYGENT_KEY; // トークン生成鍵

      const inputData = this.$refs.selectPayment.getData();
      const paygentToken = new window.PaygentToken();
      paygentToken.createToken(
        process.env.VUE_APP_PAYGENT_ID, //第１引数︓マーチャントID
        process.env.VUE_APP_PAYGENT_KEY, //第２引数︓トークン生成鍵
        {
          card_number:
            inputData.card_number01 +
            inputData.card_number02 +
            inputData.card_number03 +
            inputData.card_number04 + '', //クレジットカード番号
          expire_year: inputData.limit_year, //有効期限-YY
          expire_month: inputData.limit_month, //有効期限-MM
          cvc: inputData.cvc, //セキュリティーコード
          name: inputData.card_name //カード名義
        }, this.paygent_step2 //︓コールバック関数(トークン取得後に実⾏)
      );
    },
    paygent_step2(response) {
      if (response.result == '0000') { //トークン処理結果が正常の場合
        const postParams = {
          pay_id: this.currentPaymentId,
          token: response.tokenizedCardObject.token,
          card_save: 1,
        };
        this.$store.dispatch('user/buyPoint', { postParams });
        // $('#card_token').val(response.tokenizedCardObject.token);
        // $('#card_fingerprint').val(response.tokenizedCardObject.fingerprint);
        // $('#card_masked_card_number').val(response.tokenizedCardObject.masked_card_number);
        // $('#card_token').val(response.tokenizedCardObject.token);
        // $('#card_valid_until').val(response.tokenizedCardObject.valid_until);
        // $('#card_hc').val(response.hc);
        //
        // $('#frm_order').submit();
      } else { //トークン処理結果が異常の場合
        var msg = "" ;
        if ( response.result=='1300' || response.result=='1301' ) msg="カード番号";
        if (response.result=='1400'
          || response.result=='1401'
          || response.result=='1500'
          || response.result=='1501'
          || response.result=='1502' ) msg="カード(年月)";
        if ( response.result=='1600' || response.result=='1601' ) msg="カード(セキュリティコード)";
        if ( response.result=='1700') msg="カード名義";
        if ( response.result=='8000') msg="システムメンテナンス";
        if ( response.result=='7001') msg="通信エラー";
        if ( msg=="" ) msg="その他"

        alert(msg + 'が不正です');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.confirm-buy-point{
  width: 100%;
  max-width: 1000px;
  min-height: 100%;
  padding: 30px 24px 25px 24px;
  margin: 0 auto;
  text-align: center;
  .point-value-area{
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .point {
      font-size: 28px;
      &:before {
        content: "P";
        width: 30px;
        height: 30px;
        background-color: $yellow;
        border-radius: 100px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        color: $deepGray;
        font-size: 23px;
        margin-right: 10px;
      }
      .price {
        color: $red;
        font-size: 24px;
        margin-bottom: 10px;
      }
    }
    .shadow-box{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 60px;
      margin-top: 5px;
      border-radius: 6px;
      font-family: $notoSerif;
      font-size: 30px;
      font-weight: 700;
      &.point{
        color: $deepGray;
        border: 1px solid $white;
      }
      &.value{
        color: $gold;
        border: 1px solid $gold;
      }
    }
    .text{
      display: inline-block;
      margin-top: 5px;
      font-family: $notoSans;
      font-size: 20px;
      font-weight: 500;
      color: $deepGray;
      line-height: 29px;
    }
  }
  .select-payment{
    margin-top: 10px;
  }
  .confirm.text{
    display: inline-block;
    margin-top: 30px;
    margin-bottom: 20px;
    font-family: $notoSans;
    font-size: 18px;
    color: $deepGray;
  }
  .button-area{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    .square-button{
      width: 200px;
      height: 40px;
      & + .square-button{
        margin-left: 30px;
      }
    }
  }
}
.button_flex {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
}
@media screen and  (max-width: $tabletWidth) {
  .confirm-buy-point {
    padding: 30px 10px 25px 10px;
    .button-area {
      flex-direction: column-reverse;

      .square-button {
        width: 200px;
        padding: 0;

        & + .square-button {
          margin-bottom: 10px;
          margin-left: 0;
        }
      }
    }
  }
}
</style>
