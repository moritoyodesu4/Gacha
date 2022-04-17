import ApiClient from '@/api/settings/axios';

const apiClient = new ApiClient();

const requestLoginUser = ({ csrfToken, postParams }) => {
  const result = apiClient.post(
    '/user/login',
    { csrfToken, postParams },
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

const requestLogOutUser = () => {
  const result = apiClient.get(
    '/user/logout',
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

const requestCurrentUser = () => {
  const result = apiClient.get(
    '/user/point',
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

const requestBuyPoint = ({ csrfToken, postParams }) => {
  const result = apiClient.post(
    '/user/point/buy',
    { csrfToken, postParams },
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

const requestPointAppend = ({ csrfToken, postParams }) => {
  const result = apiClient.post(
    '/user/point/append',
    { csrfToken, postParams },
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

const requestPointEnd = () => {
  const result = apiClient.get(
    '/user/point/end',
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

const requestUserDetail = () => {
  const result = apiClient.get(
    '/user/detail',
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

const requestChangeUserInformation = ({ csrfToken, postParams }) => {
  const result = apiClient.post(
    '/user/change',
    { csrfToken, postParams },
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

const requestChangeUserPassword = ({ csrfToken, postParams }) => {
  const result = apiClient.post(
    '/user/change_password',
    { csrfToken, postParams },
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

const requestConfirmUser = ({ csrfToken, postParams }) => {
  const result = apiClient.post(
    '/user/confirm',
    { csrfToken, postParams },
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

const requestAppendUser = ({ csrfToken, postParams }) => {
  const result = apiClient.post(
    '/user/append',
    { csrfToken, postParams },
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

const requestReissuePassword = ({ csrfToken, postParams }) => {
  const result = apiClient.post(
    '/user/reset_password',
    { csrfToken, postParams },
  ).then(
    (res) => res,
  ).catch(
    (err) => err,
  );
  return result;
};

export {
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
  requestAppendUser,
  requestReissuePassword,
};
