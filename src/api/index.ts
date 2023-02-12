import axios from 'axios';

const instance = axios.create({
  timeout: 30 * 1000
});

instance.interceptors.request.use(
  (config) => {
    if (!config.baseURL) {
      throw new Error('Invalid endpoint');
    }

    return config;
  });

export const getInstanceBaseUrl = () => {
  return instance.defaults.baseURL;
};

export const setInstanceBaseUrl = (baseUrl: string) => {
  instance.defaults.baseURL = baseUrl;
};

export default instance;
