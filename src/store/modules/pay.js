import requestPayList from '@/api/pay';

const state = {
  payList: null,
};

const getters = {
  payList: (state) => state.payList,
};

const actions = {
  async setPayList({ commit, dispatch }) {
    await dispatch('setIsLoading', true, { root: true });
    const result = await requestPayList();
    commit('setPayList', result.data);
    await dispatch('setIsLoading', false, { root: true });
  },
};

const mutations = {
  setPayList(state, payList) {
    state.payList = payList;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
