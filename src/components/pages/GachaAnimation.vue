<template>
  <BaseTemplate
    :currentUser="currentUser"
    :isShowBaseContents="false">
    <div class="gacha-animation">
      <div
        v-if="isShowVideo"
        class="video-container"
      >
        <video
          class="video"
          ref="video"
          :src="currentVideoSrc"
          preload="auto"
          playsinline
          @ended="handleVideoEnd"
        />
      </div>
      <div
        v-else
        class="open-card-container"
      >
        <OpenCard
          class="open-card"
          :card="currentGetCard"
          :isOpen="isCardOpen"
          :isSkipOpen="isSkipCardOpen"
          @handleCardMount="openCard"
          @handleCardClick="skipOpenCard"
          @handleOpenCardEnd="disabledSkipOpenCard"
        />
        <SquareButton
          class="square-button"
          text="次へ"
          @handleSquareBtnClick="handleNextBtnClick"
        />
      </div>
      <!-- <iframe :src="sound.rare" allow="autoplay" style="display:none" id="iframeAudio">
      </iframe> -->
      <!-- <audio ref="audioObj" :src="sound.rare"></audio> -->
    </div>
    <CommonOverlay
      ref="commonOverlay"
      v-show="isShowOverlay"
      class="overlay"
      @handleOverlayClick="startAnimation"
    >
      <span class="text">タップしてSTART</span>
      <span class="text desc">※動画再生中に画面をタップするとスキップできます</span>
    </CommonOverlay>
      <SkipButton
        ref="skipAll"
        v-show="isShowVideo"
        class="skip-button all"
        text="All SKIP"
        @handleSkipClick="skipAllAnimation"
        v-click-outside="skipVideo"
      />
    <SkipButton
      v-show="!isShowVideo && isExistNextCard"
      class="skip-button card one"
      text="SKIP"
      @handleSkipClick="showNextCard"
    />
  </BaseTemplate>
</template>

<script>
import { transRarity } from '@/common/config/js/const';
import { mapGetters } from 'vuex';

import ClickOutside from 'vue-click-outside';
import BaseTemplate from '@/components/templates/BaseTemplate.vue';
import CommonOverlay from '@/components/atoms/CommonOverlay.vue';
import SquareButton from '@/components/atoms/SquareButton.vue';
import SkipButton from '@/components/atoms/SkipButton.vue';
import OpenCard from '@/components/molecules/OpenCard.vue';

export default {
  name: 'GachaAnimation',

  beforeRouteLeave(to, from, next) {
    if (to.name === 'ConfirmBuyProduct') {
      next(false);
    } else {
      next();
    }
  },

  components: {
    BaseTemplate,
    CommonOverlay,
    SquareButton,
    SkipButton,
    OpenCard,
  },

  directives: {
    ClickOutside,
  },

  data: () => ({
    isIos: /iP(hone|(o|a)d)/.test(navigator.userAgent),
    isShowOverlay: true,
    isCardOpen: false,
    isSkipCardOpen: false,
    isShowVideo: true,
    isEnabledVideoSkip: false,
    videoObj: null,
    cardIndexCount: 0,
    videoSrcList: {
      normal: '/video/normal.mp4',
      rare: '/video/rare.mp4',
      superRare: '/video/superRare.mp4',
      ultraRare: '/video/ultraRare.mp4',
    },
    isEnabledSkipCardOpen: false,
    // isEnabledSound: false,
    // audioObj: null,
    // sound: {
    //   rare: '/sound/rare.mp3',
    // },
  }),

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      buyPackResult: 'pack/buyPackResult',
    }),
    isExistNextCard() {
      if (this.buyPackResult) {
        return this.cardIndexCount < this.buyPackResult.cards.length - 1;
      }
      return 0;
    },
    currentGetCard() {
      if (this.buyPackResult) {
        const targetCard = this.buyPackResult.cards[this.cardIndexCount];
        if (targetCard) {
          const rarity = transRarity[targetCard.rarity];
          return { ...targetCard, rarity };
        }
        return { ...targetCard, rarity: 'normal' };
      }
      return {};
    },
    currentVideoSrc() {
      if (this.buyPackResult) {
        if (this.buyPackResult.cards.length === 0) {
          return this.videoSrcList.normal;
        }
        const { rarity } = this.buyPackResult.cards[this.cardIndexCount];
        let srcPath = null;
        if (rarity === '1') {
          srcPath = this.videoSrcList.normal;
        } else if (rarity === '2') {
          srcPath = this.videoSrcList.rare;
        } else if (rarity === '3') {
          srcPath = this.videoSrcList.superRare;
        } else if (rarity === '4') {
          srcPath = this.videoSrcList.ultraRare;
        }
        return srcPath;
      }
      return null;
    },
  },

  mounted() {
    this.popupItem = this.$refs.skipAll;
  },

  methods: {
    startAnimation() {
      this.isShowOverlay = false;
      this.videoObj = this.$refs.video;
      this.videoObj.muted = false;
      setTimeout(() => {
        this.videoObj.play();
      }, 300);
      this.isEnabledVideoSkip = true;
      // MEMO: 効果音の再生がうまくいかない。一旦コメントアウト
      // this.$refs.audioObj.muted = true;
      // this.$refs.audioObj.play();
    },
    handleVideoEnd() {
      this.openCardReady();
    },
    openCard() {
      // メモ: テスト環境でカードの回転が起こらなかったため、遅延処理
      setTimeout(() => {
        this.isCardOpen = true;
      }, 300);
    },
    handleNextBtnClick() {
      if (this.isExistNextCard) {
        this.nextAnimationReady();
        return;
      }
      this.goToGetCardList();
    },
    nextAnimationReady() {
      this.isShowVideo = true;
      this.isCardOpen = false;
      this.isShowOverlay = true;
      this.isSkipCardOpen = false;
      this.addCardIndexCount();
      // this.setIsEnabledSound(false);
      // this.resetSound();
    },
    openCardReady() {
      this.isEnabledVideoSkip = false;
      this.isEnabledSkipCardOpen = true;
      // this.setIsEnabledSound(true);
      this.isShowVideo = false;
    },
    addCardIndexCount() {
      this.cardIndexCount += 1;
    },
    skipVideo() {
      if (this.isEnabledVideoSkip) {
        this.isEnabledVideoSkip = false;
        setTimeout(() => {
          this.openCardReady();
        }, 300);
      }
    },
    skipOpenCard() {
      if (this.isEnabledSkipCardOpen) {
        this.isSkipCardOpen = true;
        // this.soundPlay();
        this.isEnabledSkipCardOpen = false;
      }
    },
    // soundPlay() {
    //   if (this.isEnabledSound) {
    //     this.$refs.audioObj.muted = false;
    //     const result = this.$refs.audioObj.play();
    //     this.setIsEnabledSound(false);
    //   }
    // },
    // resetSound() {
    //   this.$refs.audioObj.pause();
    //   this.$refs.audioObj.currentTime = 0;
    // },
    // setIsEnabledSound(boolean) {
    //   // 効果音再生を許可するレアリティ
    //   const enabledSoundRarityList = [transRarity[2], transRarity[3]];
    //   const isEnabled = enabledSoundRarityList.includes(this.currentGetCard.rarity);
    //   this.isEnabledSound = (isEnabled && boolean);
    // },
    disabledSkipOpenCard() {
      this.isEnabledSkipCardOpen = false;
    },
    showNextCard() {
      this.openCardReady();
      this.skipOpenCard();
      this.addCardIndexCount();
    },
    skipAllAnimation() {
      this.$router.push('/get-card-list');
    },
    goToGetCardList() {
      this.$router.push('/get-card-list');
    },
  },
};
</script>

<style lang="scss" scoped>
.gacha-animation{
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 580px;
  min-height: 100%;
  margin: 0px auto;
  transition: all 1s ease;
  .video-container{
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .video{
      //width: 100%;
      height: 80vh;
    }
    .gacha-btn{
      position: absolute;
    }
  }
  .open-card-container{
    width: 100%;
    .square-button{
      width: 120px;
      height: 50px;
      margin: 60px auto 0px;
    }
  }
}
.overlay{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text{
    font-family: $notoSerif;
    font-size: 36px;
    font-weight: 700;
    color: $white;
    letter-spacing: 0.05em;
    &.desc{
      margin-top: 16px;
      font-size: 14px;
    }
  }
}
.skip-button{
  position: absolute;
  top: 30px;
  right: 20px;
  &.animation.one{
    top: 0px;
  }
}
</style>
