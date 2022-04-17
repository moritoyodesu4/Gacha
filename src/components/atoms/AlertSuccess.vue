<template>
  <div
    ref="alertSuccess"
    :class="['alert-success', { active: isShow }]"
    :style="alertStyle"
  >
    <v-alert
      type="success"
      dense
      color="rgba(76, 175, 80, 0.9)"
    >
      {{text}}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'AlertSuccess',

  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '完了しました',
    },
  },

  data: () => ({
    alertWidth: 0,
  }),

  computed: {
    alertStyle() {
      if (this.alertWidth > 0) {
        return {
          left: `calc(50% - ${this.alertWidth / 2}px)`,
        };
      }
      return 0;
    },
  },

  mounted() {
    this.alertWidth = this.$refs.alertSuccess.offsetWidth;
  },
};
</script>

<style lang="scss" scoped>
.alert-success{
  position: fixed;
  top: 0px;
  transition: all 0.2s ease-out;
  opacity: 0;
  pointer-events: none;
  &.active{
    top: 80px;
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
