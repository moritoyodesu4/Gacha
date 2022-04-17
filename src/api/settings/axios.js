import axios from 'axios';

class ApiClient {
  constructor() {
    this.axiosBase = axios.create({
      baseURL: process.env.VUE_APP_API_BASE_URL,
    });
  }

  get(endPoint) {
    const result = this.axiosBase.get(
      endPoint,
    ).then(
      (res) => res,
    ).catch(
      (err) => err,
    );
    return result;
  }

  post(endPoint, { csrfToken, postParams }) {
    const params = new URLSearchParams();
    params.append(csrfToken.keys.name, csrfToken.name);
    params.append(csrfToken.keys.value, csrfToken.value);
    if (postParams) {
      const json = JSON.stringify(postParams);
      params.append('json', json);
    }
    const result = this.axiosBase.post(
      endPoint,
      params,
    ).then(
      (res) => res,
    ).catch(
      (err) => err,
    );
    return result;
  }
}

export default ApiClient;
