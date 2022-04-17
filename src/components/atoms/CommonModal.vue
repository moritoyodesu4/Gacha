<template>
  <div class="common-modal">
    <slot>共通モーダル</slot>
  </div>
</template>

<script>
export default {
  name: 'CommonModal',
};
</script>

<style lang="scss" scoped>
$modalHeight: 262px;

.common-modal{
  width: 100%;
  height: $modalHeight;
  background-image: url("/img/modalBg.png");
  background-repeat: repeat;
  background-size: cover;
  background-position: 0px $modalHeight; // MEMO: 画面サイズを大きくした際に画像の端がジャギるため対応
  border-radius: 8px;
}
</style>
