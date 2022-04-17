import ApiClient from '@/api/settings/axios';

const apiClient = new ApiClient();

const requestPayList = () => {
  const result = apiClient.get(
    '/user/pay_style',
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

export default requestPayList;
