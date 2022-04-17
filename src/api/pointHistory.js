import ApiClient from '@/api/settings/axios';

const apiClient = new ApiClient();

const requestPointHistoryList = ({ pageNumber }) => {
  let getUrl = '/user/point/list';
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

export default requestPointHistoryList;
