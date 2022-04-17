import ApiClient from '@/api/settings/axios';

const apiClient = new ApiClient();

const requestAddress = ({ csrfToken, postParams }) => {
  const result = apiClient.post(
    '/address/zipcode',
    { csrfToken, postParams },
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

export default requestAddress;
