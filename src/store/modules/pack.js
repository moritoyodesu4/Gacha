import {
  requestPackList,
  requestPackDetail,
  requestCheckPack,
  requestBuyPack,
  requestBuyPackResult,
  requestDividePackCard,
} from '@/api/pack';

const state = {
  packList: null,
  currentPack: null,
  packCheckResult: null,
  buyPackResult: null,
  devidePackCardresult: null,
};

const getters = {
  packList: (state) => state.packList,
  currentPack: (state) => state.currentPack,
  packCheckResult: (state) => state.packCheckResult,
  buyPackResult: (state) => state.buyPackResult,
  devidePackCardresult: (state) => state.devidePackCardresult,
};

const actions = {
  async setPackList({ commit, dispatch }) {
    await dispatch('setIsLoading', true, { root: true });
    const result = await requestPackList();
    commit('setPackList', result.data);
    await dispatch('setIsLoading', false, { root: true });
  },
  async setCurrentPack({ commit, dispatch }, { packId }) {
    await dispatch('setIsLoading', true, { root: true });
    const result = await requestPackDetail({ packId });
    if (result.data.detail.id === '') {
      window.location.href = '/';
    }
    commit('setCurrentPack', result.data.detail);
    await dispatch('setIsLoading', false, { root: true });
  },
  clearCurrentPack({ commit }) {
    commit('setCurrentPack', null);
  },
  async setCheckPackResult({ commit, dispatch, rootGetters }, { postParams }) {
    const { isLoading } = rootGetters;
    if (isLoading) {
      return;
    }
    dispatch('setIsLoading', true, { root: true });
    const csrfToken = rootGetters.csrf;
    const result = await requestCheckPack({ csrfToken, postParams });
    commit('setCheckPackResult', result.data);
    dispatch('setCsrf', { csrfToken: result.data.csrf }, { root: true });
    dispatch('setIsLoading', false, { root: true });
  },
  clearPackCheckResult({ commit }) {
    commit('setCheckPackResult', null);
  },
  async buyPack({ commit, dispatch, rootGetters }) {
    const { isLoading } = rootGetters;
    if (isLoading) {
      return;
    }
    dispatch('setIsLoading', true, { root: true });
    const csrfToken = rootGetters.csrf;
    const result = await requestBuyPack({ csrfToken });
    commit('setBuyPackResult', result.data);
    dispatch('setCsrf', { csrfToken: result.data.csrf }, { root: true });
    dispatch('setIsLoading', false, { root: true });
  },
  clearBuyPackResult({ commit }) {
    commit('setBuyPackResult', null);
  },
  async setBuyPackResult({ commit, dispatch }) {
    await dispatch('setIsLoading', true, { root: true });
    const result = await requestBuyPackResult();
    commit('setBuyPackResult', result.data);
    await dispatch('setIsLoading', false, { root: true });
  },
  async devidePackCard({ commit, dispatch, rootGetters }, { postParams }) {
    const { isLoading } = rootGetters;
    if (isLoading) {
      return;
    }
    dispatch('setIsLoading', true, { root: true });
    const csrfToken = rootGetters.csrf;
    const result = await requestDividePackCard({ csrfToken, postParams });
    commit('setDevidePackCardResult', result.data);
    dispatch('setCsrf', { csrfToken: result.data.csrf }, { root: true });
    dispatch('setIsLoading', false, { root: true });
  },
  clearDevidePackCardResult({ commit }) {
    commit('setDevidePackCardResult', null);
  },
};

const mutations = {
  setPackList(state, packList) {
    state.packList = packList;
  },
  setCurrentPack(state, currentPack) {
    state.currentPack = currentPack;
  },
  setCheckPackResult(state, packCheckResult) {
    state.packCheckResult = packCheckResult;
  },
  setBuyPackResult(state, buyPackResult) {
    state.buyPackResult = buyPackResult;
  },
  setDevidePackCardResult(state, devidePackCardresult) {
    state.devidePackCardresult = devidePackCardresult;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
