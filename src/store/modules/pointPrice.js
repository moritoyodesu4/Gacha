import {
  requestPointPriceList,
  requestPointPriceDetail,
} from '@/api/pointPrice';

const state = {
  pointPriceList: null,
  currentPointPrice: null,
};

const getters = {
  pointPriceList: (state) => state.pointPriceList,
  currentPointPrice: (state) => state.currentPointPrice,
};

const actions = {
  async setPointPriceList({ commit, dispatch }, { pageNumber }) {
    await dispatch('setIsLoading', true, { root: true });
    const result = await requestPointPriceList({ pageNumber });
    commit('setPointPriceList', result);
    await dispatch('setIsLoading', false, { root: true });
  },
  async setCurrentPointPrice({ commit, dispatch }, { pointPriceId }) {
    await dispatch('setIsLoading', true, { root: true });
    const result = await requestPointPriceDetail({ pointPriceId });
    commit('setPointPriceDetail', result);
    await dispatch('setIsLoading', false, { root: true });
  },
};

const mutations = {
  setPointPriceList(state, pointPriceList) {
    state.pointPriceList = pointPriceList.data.list;
  },
  setPointPriceDetail(state, currentPointPrice) {
    state.currentPointPrice = currentPointPrice.data.detail;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
