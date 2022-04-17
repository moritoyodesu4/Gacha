<template>
  <div
    class="shadow-button"
    @click.stop="handleShadowBtnClick"
  >
    <ShadowBox
      class="shadow-box"
      opacity="_50"
    >
      <span class="text">{{ text }}</span>
<!--      <i class="fal fa-angle-right" />-->
    </ShadowBox>
  </div>
</template>

<script>
import ShadowBox from '@/components/atoms/ShadowBox.vue';

export default {
  name: 'shadow-button',

  components: {
    ShadowBox,
  },

  props: {
    text: {
      type: String,
    },
  },

  methods: {
    handleShadowBtnClick() {
      this.$emit('handleShadowBtnClick');
    },
  },
};
</script>

<style lang="scss" scoped>
.shadow-button{
  font-family: $notoSans;
  font-size: 14px;
  color: $blue;
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    opacity: 0.4;
  }
  .shadow-box{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 0px;
    .fa-angle-right{
      position: absolute;
      right: 10px;
      width: 6px;
      height: 14px;
    }
  }
}
@media screen and (max-width: $tabletWidth) {
  .shadow-button {
    width: 50%;
    &:hover {
      opacity: 1;
    }
    .shadow-box{
    }
  }
}
</style>
