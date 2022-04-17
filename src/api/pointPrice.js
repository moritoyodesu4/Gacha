import ApiClient from '@/api/settings/axios';

const apiClient = new ApiClient();

const requestPointPriceList = ({ pageNumber }) => {
  let getUrl = '/user/point_price';
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

const requestPointPriceDetail = ({ pointPriceId }) => {
  const result = apiClient.get(
    `/user/point_price/detail/${pointPriceId}`,
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

export {
  requestPointPriceList,
  requestPointPriceDetail,
};
