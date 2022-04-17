<template>
  <div class="prev-button">
    <ShadowBox
      class="shadow-box btn prev"
      @handleClickShadowBox="handlePrevBtnClick"
    >
      <i class="far fa-chevron-left"></i>
    </ShadowBox>
  </div>
</template>

<script>
import ShadowBox from '@/components/atoms/ShadowBox.vue';

export default {
  name: 'PrevButton',

  components: {
    ShadowBox,
  },

  methods: {
    handlePrevBtnClick() {
      this.$emit('handlePrevBtnClick');
    },
  },
};
</script>

<style lang="scss" scoped>
.prev-button{
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
