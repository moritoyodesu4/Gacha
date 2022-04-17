import {
  requestLoginUser,
  requestLogOutUser,
  requestCurrentUser,
  requestBuyPoint,
  requestPointAppend,
  requestPointEnd,
  requestUserDetail,
  requestChangeUserInformation,
  requestChangeUserPassword,
  requestConfirmUser,
  requestReissuePassword,
  requestAppendUser,
} from '@/api/user';

const state = {
  loginUserResult: null,
  logOutUserResult: null,
  currentUser: null,
  buyPointResult: null,
  currentUserDetail: null,
  pointAppendResult: null,
  pointEndResult: null,
  changeUserInformationResult: null,
  changeUserPasswordResult: null,
  confirmUserResult: null,
  appendUserResult: null,
  reissuePasswordResult: null,
};

const getters = {
  loginUserResult: (state) => state.loginUserResult,
  logOutUserResult: (state) => state.logOutUserResult,
  currentUser: (state) => state.currentUser,
  buyPointResult: (state) => state.buyPointResult,
  currentUserDetail: (state) => state.currentUserDetail,
  pointAppendResult: (state) => state.pointAppendResult,
  pointEndResult: (state) => state.pointEndResult,
  changeUserInformationResult: (state) => state.changeUserInformationResult,
  changeUserPasswordResult: (state) => state.changeUserPasswordResult,
  confirmUserResult: (state) => state.confirmUserResult,
  appendUserResult: (state) => state.appendUserResult,
  reissuePasswordResult: (state) => state.reissuePasswordResult,
};

const actions = {
  async loginUser({ commit, dispatch, rootGetters }, { postParams }) {
    const { isLoading } = rootGetters;
    if (isLoading) {
      return;
    }
    dispatch('setIsLoading', true, { root: true });
    const csrfToken = rootGetters.csrf;
    const result = await requestLoginUser({ csrfToken, postParams });
    commit('setLoginUserResult', result.data);
    dispatch('setCsrf', { csrfToken: result.data.csrf }, { root: true });
    dispatch('setIsLoading', false, { root: true });
  },
  clearLoginUserResult({ commit }) {
    commit('setLoginUserResult', null);
  },
  async logOutUser({ commit, dispatch }) {
    dispatch('setIsLoading', true, { root: true });
    const result = await requestLogOutUser();
    commit('setLogOutUserResult', result.data);
    dispatch('setIsLoading', false, { root: true });
  },
  clearLogOutUserResult({ commit }) {
    commit('setLogOutUserResult', null);
  },
  async setCurrentUser({ commit, dispatch }) {
    await dispatch('setIsLoading', true, { root: true });
    const result = await requestCurrentUser();
    commit('setCurrentUser', result.data);
    await dispatch('setIsLoading', false, { root: true });
  },
  async buyPoint({ commit, dispatch, rootGetters }, { postParams }) {
    const { isLoading } = rootGetters;
    if (isLoading) {
      return;
    }
    dispatch('setIsLoading', true, { root: true });
    const csrfToken = rootGetters.csrf;
    const result = await requestBuyPoint({ csrfToken, postParams });
    commit('setBuyPointResult', result.data);
    dispatch('setCsrf', { csrfToken: result.data.csrf }, { root: true });
    dispatch('setIsLoading', false, { root: true });
  },
  clearBuyPointResult({ commit }) {
    commit('setBuyPointResult', null);
  },
  async pointAppend({ commit, dispatch, rootGetters }, { postParams }) {
    dispatch('setIsLoading', true, { root: true });
    const csrfToken = rootGetters.csrf;
    const result = await requestPointAppend({ csrfToken, postParams });
    commit('setPointAppendResult', result.data);
    dispatch('setCsrf', { csrfToken: result.data.csrf }, { root: true });
    dispatch('setIsLoading', false, { root: true });
  },
  async setPointEndResult({ commit, dispatch }) {
    await dispatch('setIsLoading', true, { root: true });
    const result = await requestPointEnd();
    commit('setPointEndResult', result.data);
    await dispatch('setIsLoading', false, { root: true });
  },
  async setCurrentUserDetail({ commit, dispatch }) {
    await dispatch('setIsLoading', true, { root: true });
    const result = await requestUserDetail();
    commit('setCurrentUserDetail', result.data);
    await dispatch('setIsLoading', false, { root: true });
  },
  async changeUserInformation({ commit, dispatch, rootGetters }, { postParams }) {
    const { isLoading } = rootGetters;
    if (isLoading) {
      return;
    }
    dispatch('setIsLoading', true, { root: true });
    const csrfToken = rootGetters.csrf;
    const result = await requestChangeUserInformation({ csrfToken, postParams });
    commit('setChangeUserInformationResult', result.data);
    dispatch('setCsrf', { csrfToken: result.data.csrf }, { root: true });
    dispatch('setIsLoading', false, { root: true });
  },
  clearChangeUserInformationResult({ commit }) {
    commit('setChangeUserInformationResult', null);
  },
  async changeUserPassword({ commit, dispatch, rootGetters }, { postParams }) {
    const { isLoading } = rootGetters;
    if (isLoading) {
      return;
    }
    dispatch('setIsLoading', true, { root: true });
    const csrfToken = rootGetters.csrf;
    const result = await requestChangeUserPassword({ csrfToken, postParams });
    commit('setChangeUserPasswordResult', result.data);
    dispatch('setCsrf', { csrfToken: result.data.csrf }, { root: true });
    dispatch('setIsLoading', false, { root: true });
  },
  clearChangeUserPasswordResult({ commit }) {
    commit('setChangeUserPasswordResult', null);
  },
  async confirmUser({ commit, dispatch, rootGetters }, { postParams }) {
    const { isLoading } = rootGetters;
    if (isLoading) {
      return;
    }
    dispatch('setIsLoading', true, { root: true });
    const csrfToken = rootGetters.csrf;
    const result = await requestConfirmUser({ csrfToken, postParams });
    commit('setConfirmUserResult', result.data);
    dispatch('setCsrf', { csrfToken: result.data.csrf }, { root: true });
    dispatch('setIsLoading', false, { root: true });
  },
  clearConfirmUserResult({ commit }) {
    commit('setConfirmUserResult', null);
  },
  async appendUser({ commit, dispatch, rootGetters }, { postParams }) {
    const { isLoading } = rootGetters;
    if (isLoading) {
      return;
    }
    dispatch('setIsLoading', true, { root: true });
    const csrfToken = rootGetters.csrf;
    const result = await requestAppendUser({ csrfToken, postParams });
    commit('setAppendUserResult', result.data);
    dispatch('setCsrf', { csrfToken: result.data.csrf }, { root: true });
    dispatch('setIsLoading', false, { root: true });
  },
  clearAppendUserResult({ commit }) {
    commit('setAppendUserResult', null);
  },
  async reissuePassword({ commit, dispatch, rootGetters }, { postParams }) {
    const { isLoading } = rootGetters;
    if (isLoading) {
      return;
    }
    dispatch('setIsLoading', true, { root: true });
    const csrfToken = rootGetters.csrf;
    const result = await requestReissuePassword({ csrfToken, postParams });
    commit('setReissuePasswordResult', result.data);
    dispatch('setCsrf', { csrfToken: result.data.csrf }, { root: true });
    dispatch('setIsLoading', false, { root: true });
  },
  clearReissuePasswordResult({ commit }) {
    commit('setReissuePasswordResult', null);
  },
};

const mutations = {
  setLoginUserResult(state, loginUserResult) {
    state.loginUserResult = loginUserResult;
  },
  setLogOutUserResult(state, logOutUserResult) {
    state.logOutUserResult = logOutUserResult;
  },
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser;
  },
  setBuyPointResult(state, buyPointResult) {
    state.buyPointResult = buyPointResult;
  },
  setPointAppendResult(state, pointAppendResult) {
    state.pointAppendResult = pointAppendResult;
  },
  setPointEndResult(state, pointEndResult) {
    state.pointEndResult = pointEndResult;
  },
  setCurrentUserDetail(state, currentUserDetail) {
    state.currentUserDetail = currentUserDetail.detail;
  },
  setChangeUserInformationResult(state, changeUserInformationResult) {
    state.changeUserInformationResult = changeUserInformationResult;
  },
  setChangeUserPasswordResult(state, changeUserPasswordResult) {
    state.changeUserPasswordResult = changeUserPasswordResult;
  },
  setConfirmUserResult(state, confirmUserResult) {
    state.confirmUserResult = confirmUserResult;
  },
  setAppendUserResult(state, appendUserResult) {
    state.appendUserResult = appendUserResult;
  },
  setReissuePasswordResult(state, reissuePasswordResult) {
    state.reissuePasswordResult = reissuePasswordResult;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
