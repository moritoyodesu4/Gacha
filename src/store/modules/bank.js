import requestCurrentBank from '@/api/bank';

const state = {
  currentBank: {},
};

const getters = {
  currentBank: (state) => state.currentBank,
};

const actions = {
  async setCurrentBank({ commit, dispatch }) {
    await dispatch('setIsLoading', true, { root: true });
    const result = await requestCurrentBank();
    commit('setCurrentBank', result.data);
    await dispatch('setIsLoading', false, { root: true });
  },
};

const mutations = {
  setCurrentBank(state, currentBank) {
    state.currentBank = currentBank;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
