import ApiClient from '@/api/settings/axios';

const apiClient = new ApiClient();

const requestPrefectureList = () => {
  const result = apiClient.get(
    '/user/pref_list',
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

export default requestPrefectureList;
