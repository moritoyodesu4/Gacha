import {
  requestPackHistoryList,
  requestPackHistoryDetail,
} from '@/api/packHistory';

const state = {
  packHistoryList: null,
  currentPackHistory: null,
};

const getters = {
  packHistoryList: (state) => state.packHistoryList,
  currentPackHistory: (state) => state.currentPackHistory,
};

const actions = {
  async setPackHistoryList({ commit, dispatch }, { pageNumber }) {
    await dispatch('setIsLoading', true, { root: true });
    const result = await requestPackHistoryList({ pageNumber });
    commit('setPackHistoryList', result.data);
    await dispatch('setIsLoading', false, { root: true });
  },
  async setCurrentPackHistory({ commit, dispatch }, { packHistoryId }) {
    await dispatch('setIsLoading', true, { root: true });
    const result = await requestPackHistoryDetail({ packHistoryId });
    commit('setCurrentPackHistory', result.data);
    await dispatch('setIsLoading', false, { root: true });
  },
};

const mutations = {
  setPackHistoryList(state, packHistoryList) {
    state.packHistoryList = packHistoryList;
  },
  setCurrentPackHistory(state, currentPackHistory) {
    state.currentPackHistory = currentPackHistory.detail;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
