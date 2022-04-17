import ApiClient from '@/api/settings/axios';

const apiClient = new ApiClient();

const requestCurrentBank = () => {
  const result = apiClient.get(
    '/user/bank',
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

export default requestCurrentBank;
