<template>
  <div class="shadow-box-title-description">
    <ShadowBox
      v-if="title"
      class="shadow-box"
      opacity="_60"
    >
      <span class="text">{{title}}</span>
    </ShadowBox>
    <slot></slot>
  </div>
</template>

<script>
import ShadowBox from '@/components/atoms/ShadowBox.vue';

export default {
  name: 'ShadowBoxTitleDescription',

  components: {
    ShadowBox,
  },

  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.shadow-box-title-description{
  .shadow-box{
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 30px;
    padding: 6px 5px;
    .text{
      font-family: $notoSans;
      font-size: 12px;
      color: #cfad6b;
      display: flex;
      align-items: center;
      background-color: #4a3f3a;
      padding: 4px 10px;
      border-radius: 100px;
      &:before {
        content: '';
        background-image: url('/img/block.png');
        width: 20px;
        height: 20px;
        display: inline-flex;
        background-size: 100%;
        margin-right: 10px;
      }
      &:after {
        content: '';
        background-image: url('/img/block.png');
        width: 20px;
        height: 20px;
        display: inline-flex;
        background-size: 100%;
        margin-left: 10px;
      }
    }
  }
}
</style>
