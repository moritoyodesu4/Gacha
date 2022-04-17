import ApiClient from '@/api/settings/axios';

const apiClient = new ApiClient();

const requestPackList = () => {
  const result = apiClient.get(
    '/user/pack/list',
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

const requestPackDetail = ({ packId }) => {
  const result = apiClient.get(
    `/user/pack/detail/${packId}`,
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

const requestCheckPack = ({ csrfToken, postParams }) => {
  const result = apiClient.post(
    '/user/pack/check',
    { csrfToken, postParams },
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

const requestBuyPack = ({ csrfToken }) => {
  const result = apiClient.post(
    '/user/pack/buy',
    { csrfToken },
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

const requestBuyPackResult = () => {
  const result = apiClient.get(
    '/user/pack/buy_result',
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

const requestDividePackCard = ({ csrfToken, postParams }) => {
  const result = apiClient.post(
    '/user/pack/decision',
    { csrfToken, postParams },
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

export {
  requestPackList,
  requestPackDetail,
  requestCheckPack,
  requestBuyPack,
  requestBuyPackResult,
  requestDividePackCard,
};
