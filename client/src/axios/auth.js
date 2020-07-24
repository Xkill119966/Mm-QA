import axios from "axios";

export const URL = "http://localhost:5000/api/user/check-auth";

export function checkAuth() {
  return axios.post(URL);
}

// export function checkAuth(email, password) {
//     return axios.post(LOGIN_URL, { email, password });
//   }

// export function register(email, fullname, username, password) {
//   return axios.post(REGISTER_URL, { email, fullname, username, password });
// }

// export function requestPassword(email) {
//   return axios.post(REQUEST_PASSWORD_URL, { email });
// }

// export function getUserByToken() {
//   // Authorization head should be fulfilled in interceptor.
//   return axios.get(ME_URL);
// }
