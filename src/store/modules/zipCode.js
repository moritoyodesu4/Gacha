import requestAddress from '@/api/zipCode';

const state = {
  currentAddress: null,
};

const getters = {
  currentAddress: (state) => state.currentAddress,
};

const actions = {
  async setCurrentAddress({ commit, dispatch, rootGetters }, { postParams }) {
    const { isLoading } = rootGetters;
    if (isLoading) {
      return;
    }
    await dispatch('setIsLoading', true, { root: true });
    const csrfToken = rootGetters.csrf;
    const result = await requestAddress({ csrfToken, postParams });
    commit('setCurrentAddress', result);
    dispatch('setCsrf', { csrfToken: result.data.csrf }, { root: true });
    await dispatch('setIsLoading', false, { root: true });
  },
};

const mutations = {
  setCurrentAddress(state, currentAddress) {
    state.currentAddress = currentAddress.data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
