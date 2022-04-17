<template>
  <div class="point-value-area">
    <div class="point-borders">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.point-value-area{
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .point-borders {
    width: 500px;
    border: solid 1px $deepGray;
    padding: 20px;
    position: relative;
    &:after {
      content: '';
      border: solid 1px $deepGray;
      position: absolute;
      top: - 10px;
      bottom: -10px;
      left: 10px;
      right: 10px;
      pointer-events: none;
    }
  }
}
</style>
