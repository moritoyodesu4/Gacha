import requestPointHistoryList from '@/api/pointHistory';

const state = {
  pointHistoryList: null,
};

const getters = {
  pointHistoryList: (state) => state.pointHistoryList,
};

const actions = {
  async setPointHistoryList({ commit, dispatch }, { pageNumber }) {
    await dispatch('setIsLoading', true, { root: true });
    const result = await requestPointHistoryList({ pageNumber });
    commit('setPointHistoryList', result.data);
    await dispatch('setIsLoading', false, { root: true });
  },
};

const mutations = {
  setPointHistoryList(state, pointHistoryList) {
    state.pointHistoryList = pointHistoryList;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
