<template>
  <BaseTemplate :currentUser="currentUser">
    <div class="fund-settlement">
      <div class="fund-settlement-title">
        <span class="text">資金決済法に基づく表記</span>
      </div>
      <div class="scroll-container">
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="運営会社名称"
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
          title="ポイント(本サイト内通貨)所有上限・期限"
        >
          <div class="text-container left">
            <span class="text">ポイントの上限はございません。</span>
            <span class="text">
              ただし、ポイント購入及びポイント交換からポイントを使用することなく最終のご使用日から6ヶ月(当日を含む)が経過した場合、
              あらかじめお客様に通知することなくアカウントを削除することができます。
            </span>
            <span class="text">この場合、ポイントは失効いたします。</span>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="ポイント使用場所の範囲"
        >
          <div class="text-container left">
            <span class="text">ポイントの上限はございません。</span>
            <span class="text">ポイント(本サイト内通貨)は、ご登録されているアカウント内にてご利用可能となります。</span>
            <span class="text">また、アカウントの譲渡及びポイントの譲渡は禁止いたします。</span>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="ご利用上のご注意"
        >
          <div class="text-container left">
            <span class="text">ポイント(本サイト内通貨)の払い戻しは致しかねます。</span>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="所有ポイントの確認方法"
        >
          <div class="text-container left">
            <span class="text">本サイトの画面上にてご確認いただけます。</span>
            <span class="text">所有ポイントに動きがございましたら、そこの数字が自動で変化いたします。</span>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="お問い合わせ先"
        >
          <div class="text-container left">
            <span class="text">以下の2つのうちのいずれかからご連絡ください。</span>
            <span class="text">メールアドレス : gacha24@iranoan.com</span>
            <span class="text">TEL : 050-3552-5876</span>
          </div>
        </ShadowBoxTitleDescription>
        <ShadowBoxTitleDescription
          class="shadow-box-title-description"
          title="利用規約"
        >
          <div class="text-container">
            <span class="text">本サイトの利用規約をご確認ください。</span>
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
  name: 'FundSettlement',

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
.fund-settlement{
  width: 100%;
  max-width: 1000px;
  min-height: 100%;
  padding: 30px 20px 0px;
  margin: 0px auto;
  color: #4a3f3a;
  .fund-settlement-title{
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
@media screen and  (max-width: $tabletWidth) {
  .left {
    text-align: left!important;
  }
}
</style>
