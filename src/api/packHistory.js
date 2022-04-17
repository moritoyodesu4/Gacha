import ApiClient from '@/api/settings/axios';

const apiClient = new ApiClient();

const requestPackHistoryList = ({ pageNumber }) => {
  let getUrl = '/user/history/list';
  if (pageNumber) {
    getUrl += `/${pageNumber}`;
  }
  const result = apiClient.get(
    getUrl,
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

const requestPackHistoryDetail = ({ packHistoryId }) => {
  const result = apiClient.get(
    `/user/history/detail/${packHistoryId}`,
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

export {
  requestPackHistoryList,
  requestPackHistoryDetail,
};
