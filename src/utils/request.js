import axios from 'axios';

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 401 || response.status === 403) {
    logout();
    window.location.reload();
  }
  return response.data;
}

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.headers.common.Accept = 'application/json';
axios.interceptors.response.use(
  (response) => checkStatus(response),
  (error) => Promise.reject(checkStatus(error.response))
);

export const callApi = (
  endpoint,
  method = 'GET',
  body,
  headers = { 'Content-Type': 'application/json' }
) =>
  axios({
    method,
    url: `${endpoint}`,
    headers: { ...headers, Accept: 'application/json' },
    data: body,
  });

export const callAuthorizationApi = (
  endpoint,
  method = 'GET',
  body,
  headers = { 'Content-Type': 'application/json' }
) => {
  const token = localStorage.getItem('token');
  return callApi(endpoint, method, body, {
    ...headers,
    Authorization: `Bearer ${token}`,
  });
};
