<template>
  <div class="next-button">
    <ShadowBox
      class="shadow-box btn next"
      opacity="_60"
      @handleClickShadowBox="handleNextBtnClick"
    >
      <i class="far fa-chevron-right"></i>
    </ShadowBox>
  </div>
</template>

<script>
import ShadowBox from '@/components/atoms/ShadowBox.vue';

export default {
  name: 'NextButton',

  components: {
    ShadowBox,
  },

  methods: {
    handleNextBtnClick() {
      this.$emit('handleNextBtnClick');
    },
  },
};
</script>

<style lang="scss" scoped>
.next-button{
  width: 30px;
  height: 77px;
  color: $white;
  display: flex;
  align-items: center;
  .shadow-box{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 100px;
    color: $yellow;
    background-color: $deepGray;
  }
}
</style>
