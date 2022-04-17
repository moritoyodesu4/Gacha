<template>
  <div class="sp_menu">
    <div class="humberger_menu">
      <div class="humberger" :class="{active: isMenu}" @click="show_menu">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="scroll_area" :class="{active: isMenu}">
      <div class="menu_list">
        <div class="close_button" @click="close_menu">
          <div></div>
          <div></div>
        </div>
        <div>
          <a @click="page('/my-page')">マイページ</a>
        </div>
        <div>
          <a @click="page('/buy-point-history')">ポイント履歴</a>
        </div>
        <div><a @click="page('/terms-of-service')">利用規約</a></div>
        <div><a @click="page('/user-guide')">ご利用ガイド</a></div>
        <div class="logout" v-if="currentUser.is_login == '1'" @click="logout">ログアウト</div>
        <div class="logout" v-if="currentUser.is_login == '0'" @click="page('/login')">ログイン</div>
        <hr>
        <div>
          <a @click="page('/point-terms-of-service')">ポイント利用規約</a>
        </div>
        <div>
          <a @click="page('/fund-settlement')">資金決済法に基づく表記</a>
        </div>
        <div>
          <a @click="page('/specific-commerce')">特定商取引法に基づく表記</a>
        </div>
        <div>
          <a @click="page('/privacy-protection')">個人情報保護ポリシー</a>
        </div>
        <div class="copy">
          Copyright &copy; 2021 iranoan All rights reserved.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentUser: {
      type: Object,
      default: () => {},
    },
  },

  data: () => ({
    isMenu: false,
  }),

  methods: {
    show_menu() {
      this.isMenu = true;
    },
    close_menu() {
      this.isMenu = false;
    },
    page(url) {
      this.$router.push(url);
      this.close_menu();
    },
    logout() {
      this.$store.dispatch('user/logOutUser');
      window.location.href = '/';
    },
  },
};
</script>

<style lang="scss" scoped>
.sp_menu {
  z-index: 10;
}
.humberger_menu {
  padding: 10px;
  background-color: $deepGray;
  position: fixed;
  top: 12px;
  right: 8px;
  z-index: 10000;
  .humberger {
    width: 24px;
    height: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    div {
      width: 100%;
      border: solid 1px #f5c236;
      transition: 0.4s;
    }
  }
}
.scroll_area {
  overflow-y: auto;
  position: fixed;
  right: -340px;
  top: 0;
  height: 100%;
  overflow-y: auto;
  transition: 0.4s;
  z-index: 10010;
  .menu_list {
    right: 10px;
    top: 10px;
    color: #f5c236;
    width: 300px;
    background-color: #272524;
    padding: 100px 20px 20px 20px;
    min-height: 910px;
    height: 100vh;
    .close_button {
      width: 34px;
      height: 20px;
      position: absolute;
      top: 36px;
      right: 10px;
      div {
        width: 100%;
        border: solid 1px #f5c236;
        margin: 0!important;
        cursor: pointer;
        &:nth-child(1) {
          transform: rotate(45deg) translate(-2px, 0px);
        }
        &:nth-child(2) {
          transform: rotate(-45deg) translate(1px, -4px)
        }
      }
    }
    div {
      margin-bottom: 40px;
      margin-left: 10px;
      text-align: center;
      a {
        color: #f5c236;
        text-decoration: none;
      }
    }
    .logout, login {
      cursor: pointer;
      margin-top: 100px;
    }

    hr {
      height: 1px;
      background-color: #f5c236;
      border: none;
      margin-bottom: 40px;
    }

    .copy {
      color: #fff;
      font-size: 10px;
      font-weight: normal;
      font-family: auto;
    }
  }
}
.scroll_area.active{
  right: 0;
}
@media screen and  (max-width: $tabletWidth) {
  .sp_menu {
    z-index: 10000;
  }
  .humberger_menu {
    position: initial;
    padding: 4px;
  }
  .scroll_area {
    height: 100vh;
  }
}
</style>
