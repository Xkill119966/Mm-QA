export function setupAxios(axios, store) {
  const instance = axios.create({
    baseURL: "/",
    withCredentials: true
  });

  instance.interceptors.request.use(
    config => {
      // const {
      //   auth: { authToken }
      // } = store.getState();

      // if (authToken) {
      //   config.headers.Authorization = `Bearer ${authToken}`;
      // }

      console.log("Config", config)

      config.timeout = 30000;

      return config;
    },
    err => {
      // handle error
      if (axios.isCancel(err)) {
        console.log(`request cancelled`);
      }
      return Promise.reject(err);
    }
  );
}
