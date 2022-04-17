import requestPrefectureList from '@/api/prefecture';

const state = {
  prefectureList: null,
};

const getters = {
  prefectureList: (state) => state.prefectureList,
};

const actions = {
  async setPrefectureList({ commit, dispatch }) {
    await dispatch('setIsLoading', true, { root: true });
    const result = await requestPrefectureList();
    commit('setPrefectureList', result);
    await dispatch('setIsLoading', false, { root: true });
  },
};

const mutations = {
  setPrefectureList(state, prefectureList) {
    state.prefectureList = prefectureList.data.list;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
