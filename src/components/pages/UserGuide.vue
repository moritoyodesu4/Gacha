<template>
  <BaseTemplate :currentUser="currentUser">
    <div class="privacy-protection">
      <div class="privacy-protection-title">
        <span class="text">ご利用ガイド</span>
      </div>
      <div class="scroll-container">
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="購入にあたって"
        >
          <div class="text-container">
            <span class="text">
              １.ログイン頂いた状態で、ポイント購入画面から、ポイントをご購入ください。
            </span>
            <span class="text">
              お支払いが完了いたしましたら、画面左上の数字が変動いたします。
            </span>
            <span class="text">
              ※銀行振込などの場合は、ご入金を確認させて頂き次第の反映となりますので、反映まで最大数日かかる場合がございますこと、予めご容赦くださいませ。
            </span>
            <br>
            <span class="text center">
              ↓
            </span>
            <br>
            <span class="text">
              ２.購入したい商品を全て選び終えましたら、購入手続きに進んで下さい。
            </span>
            <br>
            <span class="text center">
              ↓
            </span>
            <br>
            <span class="text">
              ３.購入いただいた商品が一覧で表示されます。
            </span>
            <span class="text">
              その中から、発送希望商品とポイントへ還元する商品を14日以内にご選択ください。
            </span>
            <span class="text">
              14日間を過ぎますと、自動で購入いただいた商品が全てポイントに還元されます。
            </span>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="お支払いについて"
        >
          <div class="text-container">
            <span class="text">
              ・各種クレジットカード
            </span>
            <span class="text">
              ・コンビニエンスストア払い
            </span>
            <span class="text">
              ・PayPal
            </span>
            <span class="text">
              ・銀行振込
            </span>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="発送日"
        >
          <div class="text-container">
            <span class="text">
              ご入金確認後、原則14営業日前後で発送致します。<br>
              ただしご利用後、所持ポイントから500P引かせていただくことで48時間以内（土日祝を除く）の発送が可能です。<br>
              （gacha24@iranoan.comのメールアドレスにその旨のご連絡をお願いします。）<br>
              ※現在業務多忙につき、48時間以内の発送を一時中断しております。再開までしばらくお待ちください。
            </span>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="消費税について"
        >
          <div class="text-container">
            <span class="text">
              表示されている金額は全て税込(10%)となります。
            </span>
            <span class="text">
              (1円未満は四捨五入)
            </span>
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
  name: 'UserGuide',

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
.privacy-protection{
  width: 100%;
  max-width: 1000px;
  min-height: 100%;
  padding: 30px 20px 0px;
  margin: 0px auto;
  color: #4a3f3a;
  .privacy-protection-title{
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
        padding: 5px 5px 0px 5px;
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
          &.indent{
            padding-left: 2.6em;
            text-indent: -1.6em;
          }
        }
      }
      & + .shadow-box-title-description{
        margin-top: 40px;
      }
    }
  }
  .center {
    text-align:center;
  }
}
</style>
