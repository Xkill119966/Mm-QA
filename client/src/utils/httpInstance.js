import axios from "axios";

const instance = axios.create({
  baseURL: "/",
  withCredentials: true
});

const requestHandler = config => {
  //   const {
  //     auth: { authToken }
  //   } = store.getState();

  config.timeout = 30000;
  return config;
};

instance.interceptors.request.use(requestHandler);
instance.interceptors.response.use(undefined, error => {
  // handle error
  if (axios.isCancel(error)) {
    console.log(`request cancelled`);
  }
  return Promise.reject(error);
});

export default instance;
