<template>
  <BaseTemplate :currentUser="currentUser">
    <div class="specific-commerce">
      <div class="specific-commerce-title">
        <span class="text">特定商取引法に基づく表記</span>
      </div>
      <div class="scroll-container">
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="販売業者"
        >
          <div class="text-container">
            <span class="text">株式会社Iranoan</span>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="代表責任者"
        >
          <div class="text-container">
            <span class="text">鈴木 直</span>
          </div>
        </ShadowBoxTitleDescription>
<!--        <ShadowBoxTitleDescription-->
<!--          class="shadow-box-title-description"-->
<!--          title="担当責任者"-->
<!--        >-->
<!--          <div class="text-container">-->
<!--            <span class="text">鈴木 直</span>-->
<!--          </div>-->
<!--        </ShadowBoxTitleDescription>-->
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="会社登記住所・営業所住所"
        >
          <div class="text-container">
            <span class="text">〒330-0856</span>
            <span class="text">埼玉県さいたま市大宮区三橋2-800-18</span>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="電話番号"
        >
          <div class="text-container">
            <span class="text">050-3552-5876</span>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="メールアドレス"
        >
          <div class="text-container">
            <span class="text">gacha24@iranoan.com</span>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="価格"
        >
          <div class="text-container">
            <span class="text">各商品毎に表示</span>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="商品代金以外の必要料金"
        >
          <div class="text-container left">
            <span class="text">
              当社の提供するサービスを利用するための機器に関する費用、インターネッ
              ト接続料金、パケット通信料、消費税、代金支払いの振込手数料
            </span>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="引渡時期"
        >
          <div class="text-container">
            <span class="text">申込受付時</span>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="販売数量"
        >
          <div class="text-container left">
            <span class="text">特に指定はございません。</span>
            <span class="text">※商品によって数量制限設定あるものもございます。</span>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="お支払い方法"
        >
          <div class="text-container left">
            <span class="text">クレジットカード・コンビニエンスストア・PayPal・銀行振込となります。</span>
            <span class="text">
              ※ご決済後のお客様都合によるキャンセルは承ることができませんこと、ご容赦ください。
            </span>
            <span class="text">
              商品の性質上(おひとり様1個までのものなど)、
              お客様都合でキャンセルが生じてしまう際には、
            </span>
            <span class="text">
              キャンセル手数料(商品代金によってご請求額は異なります)をご請求させて頂きます。
            </span>
            <span class="text">
              銀行振込をご選択頂いた場合は、 下記の弊社口座まで3日以内にお振込をお願いいたします。
            </span>
            <span class="text">
              期限までにお支払いがない場合、自動的にキャンセルとなります。
            </span>
          </div>
          <div class="text-container">
            <span class="text one-line-space-top">【住信SBIネット銀行】</span>
            <span class="text">法人第一支店（106）</span>
            <span class="text">普通</span>
            <span class="text">1678946</span>
            <span class="text">カ)イラノアン</span>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="支払時期"
        >
          <div class="text-container">
            <table class="code">
              <tr>
                <th>クレジットカード</th>
                <td>クレジットカード会社の規約に基づく。</td>
              </tr>
              <tr>
                <th>コンビニ決済<br>(ファミリーマートのみ)</th>
                <td>ご注文日から３日以内に代金をお支払いください。<br>期限までにお支払いがない場合、自動的に注文キャンセルとなります。</td>
              </tr>
              <tr>
                <th>銀行振込決済</th>
                <td>ご注文日から３営業日以内に代金をお支払いください。<br>期限までにお支払いがない場合、自動的に注文キャンセルとなります。</td>
              </tr>
              <tr>
                <th>PayPal</th>
                <td>ご注文日から３営業日以内に代金をご送金ください。<br>期限までに送金がない場合、自動的に注文キャンセルとなります。</td>
              </tr>
            </table>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="返品特約と期限"
        >
          <div class="text-container left">
            <span class="text">
              返品・返還不可
            </span>
            <span class="text">
              利用規約第22条記載のとおり、返品・返還やその他の保証は一切致しません。
            </span>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="許認可・資格"
        >
          <div class="text-container">
            <span class="text">古物商営業許可</span>
            <span class="text">第431370040346</span>
            <span class="text">株式会社Iranoan</span>
            <span class="text">埼玉県公安委員会</span>
          </div>
        </ShadowBoxTitleDescription>
      </div>
    </div>
  </BaseTemplate>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import ShadowBoxTitleDescription from '@/components/molecules/ShadowBoxTitleDescription.vue';

export default {
  name: 'SpecificCommerce',

  components: {
    BaseTemplate,
    ShadowBoxTitleDescription,
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
    }),
  },

  created() {
    this.$store.dispatch('user/setCurrentUser', { token: 'yugi' });
  },
};
</script>

<style lang="scss" scoped>
.specific-commerce{
  width: 100%;
  max-width: 1000px;
  min-height: 100%;
  padding: 30px 20px 0;
  margin: 0 auto;
  color: #4a3f3a;
  .specific-commerce-title{
    display: flex;
    justify-content: center;
    .text{
      height: 35px;
      font-family: $notoSerif;
      font-size: 24px;
      font-weight: 700;
    }
  }
  .scroll-container{
    width: 100%;
    margin-top: 30px;
    padding-bottom: 360px;
    .shadow-box-title-description{
      width: 100%;
      .text-container{
        display: flex;
        flex-direction: column;
        padding: 5px 5px 0 5px;
        text-align: center;
        .text{
          font-family: $notoSans;
          font-size: 13px;
          line-height: 1.5;
          letter-spacing: 0.03em;
          &.margin-top{
            margin-top: 10px;
          }
          &.one-line-space-top{
            margin-top: 1em;
          }
        }
      }
      & + .shadow-box-title-description{
        margin-top: 40px;
      }
    }
  }
}
table.code {
  width: 620px;
  margin: auto;
  th, td {
    font-size: 13px;
  }
  th {
    font-weight: normal;
    text-align: right;
    padding-right: 10px;
    &:after {
      content: ':';
    }
  }
  td {
    text-align: left;
    padding-left: 10px;
  }
}
@media screen and  (max-width: $tabletWidth) {
  table.code {
    width: 100%;
    th, td {
      display: block;
    }
    th {
      text-align: left;
      padding-right: 0;
      &:after {
        content: '';
      }
    }
    td {
      text-align: left;
      padding-left: 0;
      padding-bottom: 10px;
    }
  }
  .left {
    text-align: left!important;
  }
}
</style>
