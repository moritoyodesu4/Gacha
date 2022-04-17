<template>
  <BaseTemplate :currentUser="currentUser">
    <div class="my-page">
      <div class="my-page-title">
        <span class="text">カード情報入力</span>
      </div>
      <LabelInput class="label-input" labelText="カード番号">
        <div class="user-name">
          <div class="last-name-container">
            <TextBox
              class="text-box last-name input-center"
              inputType="tel"
              v-model="card_number01"
              placeholder=""
              maxlength="4"
            />
          </div>
          <div class="first-name-container">
            <TextBox
              class="text-box first-name input-center"
              inputType="tel"
              v-model="card_number02"
              placeholder=""
              maxlength="4"
            />
          </div>
          <div class="first-name-container">
            <TextBox
              class="text-box first-name input-center"
              inputType="tel"
              v-model="card_number03"
              placeholder=""
              maxlength="4"
            />
          </div>
          <div class="first-name-container">
            <TextBox
              class="text-box first-name input-center"
              inputType="tel"
              v-model="card_number04"
              placeholder=""
              maxlength="4"
            />
          </div>
        </div>
      </LabelInput>
      <LabelInput class="label-input" labelText="有効期限" style="width:140px;">
        <div class="user-name">
          <div class="last-name-container">
            <TextBox
              class="text-box last-name input-center"
              inputType="tel"
              v-model="limit_month"
              placeholder="月"
              maxlength="2"
            />
          </div>
          <div class="first-name-container">
            <TextBox
              class="text-box first-name input-center"
              inputType="tel"
              v-model="limit_year"
              placeholder="年"
              maxlength="4"
            />
          </div>
        </div>
      </LabelInput>
      <LabelInput class="label-input" labelText="セキュリティコード" style="width:140px;">
        <div class="user-name">
          <div class="last-name-container">
            <TextBox
              class="text-box last-name input-center"
              inputType="tel"
              v-model="cvc"
              placeholder=""
              maxlength="3"
            />
          </div>
        </div>
      </LabelInput>
      <LabelInput class="label-input" labelText="カード名義">
        <div class="user-name">
          <div class="last-name-container">
            <TextBox
              class="text-box last-name"
              inputType="text"
              v-model="name"
              placeholder=""
              maxlength="20"
            />
          </div>
        </div>
      </LabelInput>

      <span class="buy-point-title">カード情報入力</span>
      <div class="point-course-area">
        <PointCourse
          v-for="(pointPriceItem) in pointPriceList" :key="pointPriceItem.id"
          class="point-course"
          :point="pointPriceItem.point"
          :price="pointPriceItem.price"
          @handleBuyBtnClick="buyPoint(pointPriceItem.id)"
        />
      </div>
      <div class="notation-area">
        <ShadowButton
          class="shadow-button"
          text="特定商取引法に基づく表記"
          @handleShadowBtnClick="goToSpecificCommerce"
        />
        <ShadowButton
          class="shadow-button"
          text="資金決済法に基づく表記"
          @handleShadowBtnClick="goToFundSettlement"
        />
        <ShadowButton
          class="shadow-button"
          text="ポイント利用規約"
          @handleShadowBtnClick="goToPointTermsOfService"
        />
      </div>
    </div>
  </BaseTemplate>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import ShadowButton from '@/components/molecules/ShadowButton.vue';
import PointCourse from '@/components/organisms/PointCourse.vue';
import LabelInput from '@/components/molecules/LabelInput.vue';
import TextBox from '@/components/atoms/TextBox.vue';

export default {
  name: 'CardInput',

  components: {
    BaseTemplate,
    ShadowButton,
    PointCourse,
    LabelInput,
    TextBox,
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      pointPriceList: 'pointPrice/pointPriceList',
    }),
  },

  data: () => ({
    card_number01: '',
    card_number02: '',
    card_number03: '',
    card_number04: '',
    limit_month: '',
    limit_year: '',
    cvc: '',
    name: '',
  }),

  created() {
    const pageNumber = 1;
    this.$store.dispatch('pointPrice/setPointPriceList', { pageNumber });
  },

  methods: {
    buyPoint(pointPriceId) {
      const query = {
        pointPriceId,
      };
      this.$router.push({ path: '/confirm-buy-point', query });
    },
    goToSpecificCommerce() {
      console.log(this.card_number01);
      console.log(this.card_number02);
      console.log(this.card_number03);
      console.log(this.card_number04);
    },
    goToFundSettlement() {
    },
    goToPointTermsOfService() {
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
  .my-page-title{
    .text{
      height: 44px;
      font-family: $notoSerif;
      font-size: 30px;
      font-weight: 700;
      color: $white;
      text-shadow: $titleShadow;
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
    height: 50px;
    margin: 40px auto 0px;
  }
  .shadow-button-area{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 60px;
    .shadow-button{
      width: 255px;
      height: 40px;
      & + .shadow-button{
        margin-top: 20px;
      }
    }
  }
}
.input-center {
  input {
    text-align: center!important;
  }
}
</style>
