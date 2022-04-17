import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import UserLogin from '@/components/pages/UserLogin.vue';
import PasswordReissue from '@/components/pages/PasswordReissue.vue';
import CompletePasswordReissue from '@/components/pages/CompletePasswordReissue.vue';
import UserRegister from '@/components/pages/UserRegister.vue';
import ConfirmUserRegister from '@/components/pages/ConfirmUserRegister.vue';
import CompleteUserRegister from '@/components/pages/CompleteUserRegister.vue';

import Top from '@/components/pages/Top.vue';
import PackDetail from '@/components/pages/PackDetail.vue';
import BuyPoint from '@/components/pages/BuyPoint.vue';
import ConfirmBuyPoint from '@/components/pages/ConfirmBuyPoint.vue';
import ConfirmCombini from '@/components/pages/ConfirmCombini.vue';
import BankTransferInformation from '@/components/pages/BankTransferInformation.vue';
import PaygeTransferInformation from '@/components/pages/PaygeTransferInformation.vue';
import PayRedirect from '@/components/pages/PayRedirect.vue';
import CompleteBuyPoint from '@/components/pages/CompleteBuyPoint.vue';
import BuyProduct from '@/components/pages/BuyProduct.vue';
import ConfirmBuyProduct from '@/components/pages/ConfirmBuyProduct.vue';
import GachaAnimation from '@/components/pages/GachaAnimation.vue';
import GetCardList from '@/components/pages/GetCardList.vue';
import ConfirmGetCardList from '@/components/pages/ConfirmGetCardList.vue';
import ThankYou from '@/components/pages/ThankYou.vue';
import MyPage from '@/components/pages/MyPage.vue';
import ChangePassword from '@/components/pages/ChangePassword.vue';
import BuyPointHistory from '@/components/pages/BuyPointHistory.vue';
import BuyProductHistory from '@/components/pages/BuyProductHistory.vue';
import BuyProductHistoryDetail from '@/components/pages/BuyProductHistoryDetail.vue';
import SpecificCommerce from '@/components/pages/SpecificCommerce.vue';
import FundSettlement from '@/components/pages/FundSettlement.vue';
import PointTermsOfService from '@/components/pages/PointTermsOfService.vue';
import TermsOfService from '@/components/pages/TermsOfService.vue';
import PrivacyProtection from '@/components/pages/PrivacyProtection.vue';
import UserGuide from '@/components/pages/UserGuide.vue';
import CardInput from '@/components/pages/CardInput.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/', name: 'Top', component: Top, meta: { requiresLogin: false },
  },
  {
    path: '/pack-detail', name: 'PackDetail', component: PackDetail, meta: { requiresLogin: false },
  },
  {
    path: '/login', name: 'UserLogin', component: UserLogin, meta: { requiresLogin: false },
  },
  {
    path: '/password-reissue', name: 'PasswordReissue', component: PasswordReissue, meta: { requiresLogin: false },
  },
  {
    path: '/complete-password-reissue', name: 'CompletePasswordReissue', component: CompletePasswordReissue, meta: { requiresLogin: false },
  },
  {
    path: '/user-register', name: 'UserRegister', component: UserRegister, meta: { requiresLogin: false },
  },
  {
    path: '/confirm-user-register', name: 'ConfirmUserRegister', component: ConfirmUserRegister, meta: { requiresLogin: false },
  },
  {
    path: '/complete-user-register', name: 'CompleteUserRegister', component: CompleteUserRegister, meta: { requiresLogin: false },
  },
  {
    path: '/buy-point', name: 'BuyPoint', component: BuyPoint, meta: { requiresLogin: true },
  },
  {
    path: '/confirm-buy-point', name: 'ConfirmBuyPoint', component: ConfirmBuyPoint, meta: { requiresLogin: true },
  },
  {
    path: '/confirm-combini', name: 'ConfirmCombini', component: ConfirmCombini, meta: { requiresLogin: true },
  },
  {
    path: '/bank-transfer-information', name: 'BankTransferInformation', component: BankTransferInformation, meta: { requiresLogin: true },
  },
  {
    path: '/payge-transfer-information', name: 'PaygeTransferInformation', component: PaygeTransferInformation, meta: { requiresLogin: true },
  },
  {
    path: '/user-guide', name: 'UserGuide', component: UserGuide, meta: { requiresLogin: false },
  },
  {
    // MEMO: イプシロンからのリダイレクト先空ページ
    path: '/pay-redirect',
    name: 'PayRedirect',
    component: PayRedirect,
    meta: { requiresLogin: true },
    beforeEnter: (to, from, next) => {
      const postParams = {
        token: to.query.trans_code,
      };
      store.dispatch('user/pointAppend', { postParams });
      next({ path: '/complete-buy-point', query: to.query });
    },
  },
  {
    path: '/complete-buy-point', name: 'CompleteBuyPoint', component: CompleteBuyPoint, meta: { requiresLogin: true },
  },
  {
    path: '/buy-product', name: 'BuyProduct', component: BuyProduct, meta: { requiresLogin: true },
  },
  {
    path: '/confirm-buy-product', name: 'ConfirmBuyProduct', component: ConfirmBuyProduct, meta: { requiresLogin: true },
  },
  {
    path: '/gacha-animation',
    name: 'GachaAnimation',
    component: GachaAnimation,
    meta: { requiresLogin: true },
    beforeEnter: (to, from, next) => {
      (async () => {
        await store.dispatch('pack/setBuyPackResult');
        const buyPackResult = store.getters['pack/buyPackResult'];
        const isRedirectTop = buyPackResult.cards.length === 0;
        if (isRedirectTop) {
          next('/');
        } else if (from.name === 'ConfirmBuyProduct') {
          next();
        } else {
          next('/get-card-list');
        }
      })();
    },
  },
  {
    path: '/get-card-list',
    name: 'GetCardList',
    component: GetCardList,
    meta: { requiresLogin: true },
    beforeEnter: (to, from, next) => {
      (async () => {
        await store.dispatch('pack/setBuyPackResult');
        const buyPackResult = store.getters['pack/buyPackResult'];
        const isRedirectTop = buyPackResult.cards.length === 0;
        if (isRedirectTop) {
          next('/');
        } else {
          next();
        }
      })();
    },
  },
  {
    path: '/confirm-get-card-list',
    name: 'ConfirmGetCardList',
    component: ConfirmGetCardList,
    meta: { requiresLogin: true },
    beforeEnter: (to, from, next) => {
      (async () => {
        await store.dispatch('pack/setBuyPackResult');
        const buyPackResult = store.getters['pack/buyPackResult'];
        const isRedirectTop = buyPackResult.cards.length === 0;
        if (isRedirectTop) {
          next('/');
        } else {
          next();
        }
      })();
    },
  },
  {
    path: '/thank-you', name: 'ThankYou', component: ThankYou, meta: { requiresLogin: true },
  },
  {
    path: '/my-page', name: 'MyPage', component: MyPage, meta: { requiresLogin: true },
  },
  {
    path: '/change-password', name: 'ChangePassword', component: ChangePassword, meta: { requiresLogin: true },
  },
  {
    path: '/buy-point-history', name: 'BuyPointHistory', component: BuyPointHistory, meta: { requiresLogin: true },
  },
  {
    path: '/buy-product-history', name: 'BuyProductHistory', component: BuyProductHistory, meta: { requiresLogin: true },
  },
  {
    path: '/buy-product-history-detail', name: 'BuyProductHistoryDetail', component: BuyProductHistoryDetail, meta: { requiresLogin: true },
  },
  {
    path: '/specific-commerce', name: 'SpecificCommerce', component: SpecificCommerce, meta: { requiresLogin: false },
  },
  {
    path: '/fund-settlement', name: 'FundSettlement', component: FundSettlement, meta: { requiresLogin: true },
  },
  {
    path: '/point-terms-of-service', name: 'PointTermsOfService', component: PointTermsOfService, meta: { requiresLogin: true },
  },
  {
    path: '/terms-of-service', name: 'TermsOfService', component: TermsOfService, meta: { requiresLogin: false },
  },
  {
    path: '/privacy-protection', name: 'PrivacyProtection', component: PrivacyProtection, meta: { requiresLogin: false },
  },
  {
    path: '*',
    name: 'NotFound',
    beforeEnter: (to, from, next) => {
      next('/');
    },
  },
  {
    path: '/card-input', name: 'CardInput', component: CardInput, meta: { requiresLogin: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresLogin)) {
    (async () => {
      try {
        await store.dispatch('user/setCurrentUser');
        const storeDataUser = store.getters['user/currentUser'];
        const csrfToken = storeDataUser.csrf;
        store.dispatch('setCsrf', { csrfToken });
        const isLogin = storeDataUser.is_login;
        if (isLogin === '1') {
          next();
        } else {
          next('/login');
        }
      } catch (error) {
        next('/login');
      }
    })();
  } else {
    (async () => {
      try {
        await store.dispatch('user/setCurrentUser');
        const storeDataUser = store.getters['user/currentUser'];
        const csrfToken = storeDataUser.csrf;
        store.dispatch('setCsrf', { csrfToken });
        next();
      } catch (error) {
        next();
      }
    })();
  }
});

export default router;
