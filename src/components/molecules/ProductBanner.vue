<template>
  <div class="banner_base" :class="{detail_show: showDetail}">
    <div
      :class="['product-banner', {'active': isActive}]"
      :style="{ ...dotsStyleVariables, '--animation-duration': `${animationDuration}ms` }"
    >
      <PrevButton
        v-if="nextImage"
        class="btn prev"
        @handlePrevBtnClick="showPrevImage"
      />
      <div class="image_area">
        <div
          class="image current"
          :style="{backgroundImage: `url(${currentImage})`}"
          @animationend="setCurrentImageIndex(animationDelay)"
        />
        <div class="point_area">
          <div class="pack_point" v-if="!showDetail">{{packItem.point | comma}}</div>
        </div>
      </div>
      <div
        v-if="nextImage"
        class="image next"
        :style="{backgroundImage: `url(${nextImage})`}"
      />
      <NextButton
        v-if="nextImage"
        class="btn next"
        @handleNextBtnClick="showNextImage"
      />
      <div v-if="nextImage" class="dots" ref="dots">
        <div
          v-for="item in imageCount"
          :key="item"
          :class="['dot', {'active': item - 1 === currentImageIndex}]"
          @click="showSelectImage(item - 1)"
        />
      </div>
    </div>
    <LeafBox class="pack_area" :areaCenter="true"  v-if="!showDetail">
      <div class="pack_name">{{packItem.name}}</div>
    </LeafBox>
    <div class="button_area" v-if="!showDetail">
      <span v-if="currentUser.is_login == '0'">
        <BlackGradationButton
          class="square-button"
          text="ログインする"
          @handleSquareBtnClick="handleLoginClick()"
        />
      </span>
      <span v-if="currentUser.is_login == '1'">
        <BlackGradationButton
          v-if="packItem.pack_count > 0"
          class="square-button"
          text="購入する"
          @handleSquareBtnClick="handleBannerClick(packItem.id)"
        />
        <div class="sold_out" v-if="packItem.pack_count == 0">SOLD OUT</div>
      </span>
    </div>
  </div>
</template>

<script>
import {
  separateCharacterNumber,
} from '@/common/util/format';
import PrevButton from '@/components/molecules/PrevButton.vue';
import NextButton from '@/components/molecules/NextButton.vue';
import LeafBox from '@/components/organisms/LeafBox.vue';
import BlackGradationButton from '@/components/atoms/BlackGradationButton.vue';

export default {
  name: 'ProductBanner',

  components: {
    PrevButton,
    NextButton,
    LeafBox,
    BlackGradationButton,
  },

  filters: {
    comma(value) {
      return separateCharacterNumber(value);
    },
  },

  props: {
    packItem: {
      type: Object,
      default: () => {},
    },
    showDetail: {
      type: Boolean,
      default: false,
    },
    currentUser: {
      type: Object,
    },
  },

  data: () => ({
    currentImageIndex: null,
    nextImageIndex: null,
    isActive: false,
    animationDelay: 2000,
    animationDuration: 1000,
    timer: null,
  }),

  computed: {
    currentImage() {
      if (this.packItem && this.packItem.image && this.currentImageIndex !== null) {
        return this.packItem.image[this.currentImageIndex];
      }
      return null;
    },
    nextImage() {
      if (this.packItem && this.packItem.image && this.nextImageIndex !== null) {
        return this.packItem.image[this.nextImageIndex];
      }
      return null;
    },
    imageCount() {
      if (this.packItem && this.packItem.image) {
        return this.packItem.image.length;
      }
      return 0;
    },
    dotsStyleVariables() {
      if (this.imageCount > 0) {
        const dotWidth = 10;
        const dotHeight = 10;
        const dotMargin = 10;
        const dotsWidth = this.imageCount * (dotWidth + dotMargin) - dotMargin;
        return {
          '--dot-width': `${dotWidth}px`,
          '--dot-height': `${dotHeight}px`,
          '--dot-margin': `${dotMargin}px`,
          '--dots-width': `${dotsWidth}px`,
        };
      }
      return null;
    },
  },

  mounted() {
    this.$nextTick(() => {
      if ('image' in this.packItem) {
        this.currentImageIndex = 0;
        // 画像が2枚以上ある場合、次の画像indexをセットする。
        if (this.packItem.image.length > 1) {
          this.setNextImageIndex();
        }
      }
    });
  },

  methods: {
    handleBannerClick(packId) {
      this.$emit('handleBannerClick', (packId));
    },
    handleLoginClick() {
      this.$emit('handleLoginClick');
    },
    setCurrentImageIndex(animationDelay = this.animationDelay, imageIndex = null) {
      // imageIndexが明示的に渡された時は渡された値にimageIndexを変更する
      if (imageIndex !== null) {
        this.currentImageIndex = imageIndex;
      } else if (imageIndex === null && this.currentImageIndex === this.imageCount - 1) {
        // if (this.currentImageIndex === this.imageCount - 1) {
        this.currentImageIndex = 0;
      } else {
        this.currentImageIndex += 1;
      }
      this.changeIsActive(false);
      // this.isActiveがfalseになり画面が際レンダリングされてから呼び出す。
      this.$nextTick(() => {
        this.setNextImageIndex(animationDelay);
      });
    },
    setNextImageIndex(animationDelay = this.animationDelay) {
      // 現在の画像が配列の末尾のものの場合
      if (this.currentImageIndex === this.imageCount - 1) {
        this.nextImageIndex = 0;
      } else {
        this.nextImageIndex = this.currentImageIndex + 1;
      }
      // アニメーションを開始する
      this.timer = setTimeout(() => {
        this.changeIsActive(true);
      }, animationDelay);
    },
    changeIsActive(status) {
      this.isActive = status;
    },
    showPrevImage() {
      // アニメーション中は何もしない
      if (this.isActive) {
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.currentImageIndex === 0) {
        this.currentImageIndex = this.imageCount - 1;
      } else {
        this.currentImageIndex -= 1;
      }
      this.changeIsActive(false);
      // this.isActiveがfalseになり画面が際レンダリングされてから呼び出す。
      this.$nextTick(() => {
        this.setNextImageIndex(this.animationDelay);
      });
    },
    showNextImage() {
      // アニメーション中は何もしない
      if (this.isActive) {
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.setCurrentImageIndex(this.animationDelay);
    },
    showSelectImage(imageIndex) {
      // アニメーション中は何もしない
      if (this.isActive) {
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.setCurrentImageIndex(this.animationDelay, imageIndex);
    },
  },

};
</script>

<style lang="scss" scoped>
$shadowBtnHeight: 77px;

.banner_base {
  margin: 0 10px;
  width: 360px;
}

.detail_show {
  width: 100%;
}

.product-banner{
  position: relative;
  width: 100%;
  height: 0px;
  padding-top: 180% * 100 / 335;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-shadow: $bannerShadow;
  .image{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 0px;
    padding-top: 180% * 100 / 335;
    background-size: cover;
    background-position: center;
    box-shadow: $bannerShadow;
    &.current{
      opacity: 1;
    }
    &.next{
      opacity: 0;
    }
  }
  .btn{
    position: absolute;
    height: $shadowBtnHeight;
    top: calc(50% - #{$shadowBtnHeight}/2);
    z-index: 1;
    cursor: pointer;
    &.prev{
      left: 8px;
    }
    &.next{
      right: 8px;
    }
  }
  .dots{
    position: absolute;
    left: calc(50% - (var(--dots-width) / 2));
    bottom: -21px;
    display: flex;
    .dot{
      width: var(--dot-width);
      height: var(--dot-height);
      background-color: $white;
      border-radius: 100%;
      border: solid 1px $yellow;
      & + .dot{
        margin-left: var(--dot-margin);
      }
      &.active{
        background: $yellow;
      }
    }
  }
  &.active{
    .image{
      &.current{
        animation-name: fadeOut;
        animation-duration: var(--animation-duration);
        animation-timing-function: ease-in;
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: forwards;
      }
      &.next{
        animation-name: fadeIn;
        animation-duration: var(--animation-duration);
        animation-timing-function: ease-in;
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: forwards;
      }
    }
  }

  .point_area {
    height: 30px;
    width: 100%;
    background-color: $deepGray;
    position: relative;
    .pack_point {
      position: absolute;
      top: -20px;
      right: 0;
      background-color: $white;
      border-top-left-radius: 100px;
      border-bottom-left-radius: 100px;
      color: $deepGray;
      padding: 4px 10px;
      z-index: 10000;
      &:before {
        content: "P";
        width: 20px;
        height: 20px;
        background-color: $yellow;
        border-radius: 100px;
        color: $deepGray;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
      }
    }
  }
}
.pack_area {
  margin-top: 30px;
  .pack_name {
    margin-bottom: -15px;
  }
}
.sold_out {
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $red;
  font-size: 34px;
}
@media screen and (max-width: $tabletWidth) {
  .banner_base {
    margin: 0;
    width: 100%;
  }
}
</style>
