import Vue from 'vue';
import Vuex from 'vuex';

import prefecture from '@/store/modules/prefecture';
import zipCode from '@/store/modules/zipCode';

import user from '@/store/modules/user';
import pack from '@/store/modules/pack';
import pointPrice from '@/store/modules/pointPrice';
import pay from '@/store/modules/pay';
import bank from '@/store/modules/bank';
import pointHistory from '@/store/modules/pointHistory';
import packHistory from '@/store/modules/packHistory';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    csrf: null,
    isLoading: false,
  },
  getters: {
    csrf: (state) => state.csrf,
    isLoading: (state) => state.isLoading,
  },
  actions: {
    setIsLoading({ commit }, isLoading) {
      commit('setIsLoading', isLoading);
    },
    setCsrf({ commit }, { csrfToken }) {
      commit('setCsrf', csrfToken);
    },
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setCsrf(state, csrf) {
      state.csrf = csrf;
    },
  },
  modules: {
    prefecture,
    zipCode,
    user,
    pack,
    pointPrice,
    pay,
    bank,
    pointHistory,
    packHistory,
  },
});
