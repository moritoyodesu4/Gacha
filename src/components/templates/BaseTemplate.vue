<template>
  <div
    class="base-template"
    :class="{'hide-base-bg-image': !isShowBaseContents, 'is_top': isTop}"
  >
    <CommonHeader
      v-if="isShowBaseContents"
      :availablePoint="availablePoint"
      :currentUser="currentUser"
      :isTop="isTop"
      @handleShopNameClick="goToTop"
      @handlePointBoxClick="goToBuyPoint"
    />
    <div class="contents" :class="{adjust: currentUser}">
      <slot></slot>
    </div>
    <CommonOverlay class="overlay" v-show="isLoading">
      <v-progress-circular
        indeterminate
        color="red"
      ></v-progress-circular>
    </CommonOverlay>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  separateCharacterNumber,
} from '@/common/util/format';

import CommonOverlay from '@/components/atoms/CommonOverlay.vue';
import CommonHeader from '@/components/organisms/CommonHeader.vue';

export default {
  name: 'BaseTempalte',

  components: {
    CommonOverlay,
    CommonHeader,
  },

  props: {
    isShowBaseContents: {
      type: Boolean,
      default: true,
    },
    isTop: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      isLoading: 'isLoading',
    }),
    availablePoint() {
      if (this.currentUser) {
        return separateCharacterNumber(this.currentUser.point);
      }
      return '0';
    },
  },

  methods: {
    goToTop() {
      if (this.$route.name === 'Top') {
        return;
      }
      this.$router.push('/');
    },
    goToBuyPoint() {
      if (this.$route.name === 'BuyPoint') {
        return;
      }
      if (this.currentUser.is_login === '0') {
        if (this.$route.name === 'UserLogin') {
          return;
        }
        this.goToLogin();
        return;
      }
      let url = '/buy-point';
      if (this.$route.params.productId) {
        url += `/${this.$route.params.productId}`;
      }
      this.$router.push(url);
    },
  },
};
</script>

<style lang="scss" scoped>
$headerHeight: 70px;
$footerHeight: 80px;

.base-template{
  height: 100%;
  background-color: #fff;
  //background-image: url('/img/backimage.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  &.hide-base-bg-image{
    height: 100%;
    background: $black;
    .contents{
      &.adjust{
        height: 100%;
      }
    }
  }
  .contents{
    width: 100%;
    height: 100vh;
    &.adjust{
      height: calc(100% - 70px);
      padding-top: 70px;
      min-height: 100vh;
      //padding-bottom: 80px;
    }
  }
  .common-footer{
    position: fixed;
    bottom: 0px;
    width: 100%;
  }
  .overlay{
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.is_top {
  height: auto;
  .contents{
    width: 100%;
    height: auto;
    &.adjust{
      height: calc(100% - 800px);
      padding-top: 70px;
      min-height: 100vh;
      //padding-bottom: 80px;
    }
  }
}
@media screen and  (max-width: $tabletWidth) {
  .base-template{
    .contents{
      padding-bottom: 100px;
      &.adjust{
        padding-top: 50px;
      }
    }
  }
}
</style>
