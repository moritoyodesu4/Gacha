<template>
  <BaseTemplate>
    <div class="confirm-buy-point">
      <PageTitle title="ポイント購入完了" />
      <LeafBox>
        <div class="point-value-area">
          <div class="title">第1番号</div>
          <ShadowBox class="shadow-box point" opacity="_60">
            <span>{{code01}}</span>
          </ShadowBox>
          <div class="title">第2番号</div>
          <ShadowBox class="shadow-box point" opacity="_60">
            <span>{{code02}}</span>
          </ShadowBox>
          <span class="text">上記番号でコンビニ支払いを行って下さい。</span>
        </div>
      </LeafBox>
      <div class="button-area">
        <BlackGradationButton
          class="square-button"
          text="TOPに戻る"
          @handleSquareBtnClick="goTop"
        />
      </div>
    </div>
  </BaseTemplate>
</template>

<script>
import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import ShadowBox from '@/components/atoms/ShadowBox.vue';
import LeafBox from '@/components/organisms/LeafBox.vue';
import BlackGradationButton from '@/components/atoms/BlackGradationButton.vue';
import PageTitle from '@/components/atoms/PageTitle.vue';

export default {
  name: 'ConfirmCombini',

  components: {
    BaseTemplate,
    ShadowBox,
    LeafBox,
    BlackGradationButton,
    PageTitle,
  },

  data: () => ({
    code01: '',
    code02: '',
  }),

  created() {
    const wk = this.$route.query.paymentID;
    const wks = wk.split('-');
    [this.code01, this.code02] = wks;
  },

  methods: {
    goTop() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.confirm-buy-point{
  width: 100%;
  max-width: 680px;
  min-height: 100%;
  padding: 30px 24px 25px 24px;
  margin: 0 auto;
  text-align: center;
  .confirm-buy-point-title{
    font-family: $notoSerif;
    font-size: 30px;
    font-weight: 700;
    color: $deepGray;
  }
  .point-value-area{
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
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
        border: 1px solid $deepGray;
        margin-bottom: 10px;
      }
      &.value{
        color: $deepGray;
        border: 1px solid $deepGray;
      }
    }
    .text{
      display: inline-block;
      margin-top: 5px;
      font-family: $notoSans;
      font-size: 16px;
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
    margin-top: 19px;
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
      width: 240px;
      height: 50px;
      & + .square-button{
        margin-left: 30px;
      }
    }
  }
}
@media screen and  (max-width: $tabletWidth) {
  .confirm-buy-point {
    padding: 30px 10px 25px 10px;
  }
}
</style>
