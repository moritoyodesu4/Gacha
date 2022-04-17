<template>
  <div>
    <div class='common-header' :class="{second_header:isTop}">
      <div class="sp_base_menu" :class="{top_header:isTop}">
        <SpMenu :currentUser="currentUser"></SpMenu>
      </div>
      <div class='name_area'>
        <div class="name" v-if="currentUser.is_login == '1'">
          {{currentUser.last_name}} {{currentUser.first_name}}さん
        </div>
        <div class="point" v-if="currentUser.is_login == '1'">{{availablePoint}}</div>
        <div class="name" v-if="currentUser.is_login == '0'">
          ゲストさん
        </div>
        <a class="login" v-if="currentUser.is_login == '0'" @click="page('/login')">ログイン</a>
      </div>
    </div>
  </div>
</template>

<script>
import SpMenu from '@/components/molecules/SpMenu.vue';

export default {
  name: 'CommonHeader',

  props: {
    availablePoint: {
      type: String,
      default: '0',
    },
    currentUser: {
      type: Object,
      default: () => {},
    },
    isTop: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    if (this.isTop) {
      window.$(window).off('resize');
      window.$(window).on('resize', () => {
        this.checkBreakPoint();
      });
      this.checkBreakPoint();
    }
  },

  components: {
    SpMenu,
  },

  methods: {
    handleShopNameClick() {
      this.$emit('handleShopNameClick');
    },
    handlePointBoxClick() {
      this.$emit('handlePointBoxClick');
    },
    page(url) {
      this.$router.push(url);
    },
    checkBreakPoint() {
      window.$('.slick.slick-initialized').slick('unslick');
      if (window.$(window).width() <= 768) {
        window.$('.slick').slick({
          autoplay: true,
          autoplaySpeed: 2500,
          speed: 800,
          dots: true,
          arrows: false,
          centerMode: true,
          centerPadding: '0',
        });
      } else {
        window.$('.slick').slick({
          autoplay: true,
          autoplaySpeed: 2500,
          speed: 800,
          dots: true,
          arrows: false,
          variableWidth: true,
          centerMode: true,
          centerPadding: '15%',
        });
        window.$('.slick').slick('slickGoTo', 0, false);
      }
    },
  },

};
</script>
<style lang="scss">
.slick-dots {
  bottom: 10px!important;
}
</style>

<style lang="scss" scoped>
.common-header{
  position: fixed;
  border-top: solid 8px $deepGray;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 58px;
  background-color: $deepGray;
  padding: 0 10px 0 15px;
  z-index: 101;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: $white;
    &:before {
      content: '';
      width: 24px;
      height: 24px;
      background-size: 100%;
      margin-right: 5px;
    }
  }
  .name_area{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: $white;
    white-space: nowrap;
    padding-left: 210px;
    .name {
      color: #fff;
      margin-right: 20px
    }
    .point {
      color: #f5c236;
      &:before {
        content: "P";
        background-color: $yellow;
        border-radius: 100px;
        color: $deepGray;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
    a.login {
      color: $yellow;
      &:before {
        background-image: url('/img/icon_login.png');
      }
    }
  }
  .menu_area {
    margin-right: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 380px;
    a.mypage {
      &:before {
        background-image: url('/img/icon_mypage.png');
      }
    }
    a.point_buy {
      &:before {
        background-image: url('/img/icon_point.png');
      }
    }
    a.item_history {
      &:before {
        background-image: url('/img/icon_history.png');
      }
    }
  }
}

.slick {
  margin-bottom: 0!important;
  .slick-slide:not(.slick-center) {
    filter: blur(20px);
  }
  .slick-slide {
    max-width: 950px;
    max-height: 475px;
  }
}

.top_header {
  border-top: solid 8px $deepGray;
  .humberger_menu {
    top: 8px;
  }
}
.second_header {
  position: initial;
  width: 100%!important;
}
@media screen and  (max-width: $tabletWidth) {
  .sp_base_menu {
    background-color: $deepGray;
    width: 100%;
    padding: 8px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10006;
  }
  .common-header {
    position: fixed;
    top: 40px;
    width: 100%;
    border-top: solid 1px $yellow;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10005;
    .name_area {
      padding-left: 0;
      font-size: 16px;
    }
    .menu_area {
      display: none;
    }
  }
  .slick {
    margin-top: 44px;
  }
  .top_header {
    border-top: none;
  }
  .second_header {
    position: initial;
    width: 100%!important;
  }
}
</style>
