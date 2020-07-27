import history from "../../utils/history";
import { put, takeLatest } from "redux-saga/effects";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import http from "../../utils/httpInstance";
// import { API } from './single-bug';
// import { ApiAction } from 'store/middlewares/apiMiddleware';
import { createAPIAction } from "../helpers";
import { CLEAR_ALL_ERRORS } from "./errors";
import { checkAuth } from "../../axios/auth";


// action
export const AUTH_LOGOUT = "auth/LOGOUT";
export const AUTH_SET_USER = "auth/SET_USER";

export const CHECK_AUTH = createAPIAction("auth/CHECK_AUTH");
export const UPLOAD_AVATAR = createAPIAction("user/UPLOAD_AVATAR");
export const UPDATE_BIO = createAPIAction("user/UPDATE_BIO");

export const LOGIN = createAPIAction("user/LOGIN");
export const SIGNUP = createAPIAction("user/SIGN_UP");
export const LOGIN_CLEAR_ERROR = "login/CLEAR_ERROR";
export const SIGNUP_CLEAR_ERROR = "signup/CLEAR_ERROR";

const API = "API";
// reducers
const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {}
};
export const reducer = persistReducer(
  { storage, key: "mmqa" },
  (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case CHECK_AUTH.SUCCESS:
        return { ...state, isAuthenticated: true, user: action.payload.data };
      case AUTH_LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          user: null
        };

      case LOGIN.SUCCESS:
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true
        };

      case UPDATE_BIO.SUCCESS:
        return { ...state, user: { ...state.user, bio: action.payload } };
      default:
        return state;
    }
  }
);

export default reducer;

// actions creators
// export const logUserOut = () => ({ type: AUTH_LOGOUT });

// // side effects
// export const checkAuth = () => ({
//   type: API,
//   payload: {
//     method: "POST",
//     url: "/api/user/check-auth",
//     formData: null
//   },
//   onRequest: CHECK_AUTH.REQUEST,
//   onSuccess: CHECK_AUTH.SUCCESS,
//   onFailure: CHECK_AUTH.FAILURE
// });

export const actions = {
  checkAuth: () => ({ type: CHECK_AUTH.REQUEST }),
  // register: authToken => ({
  //   type: actionTypes.Register,
  //   payload: { authToken }
  // }),
  // logout: () => ({ type: actionTypes.Logout }),
  // requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUser: data => ({ type: CHECK_AUTH.SUCCESS, payload: { data } }),
  failure: error => ({ type: CHECK_AUTH.FAILURE, payload: { error } })
};

export function* saga() {
  // yield takeLatest(actionTypes.Login, function* loginSaga() {
  //   yield put(actions.requestUser());
  // });

  // yield takeLatest(actionTypes.Register, function* registerSaga() {
  //   yield put(actions.requestUser());
  // });

  yield takeLatest(CHECK_AUTH.REQUEST, function* auth() {
    try {
      const {
        data: { data }
      } = yield http({
        method: "POST",
        url: "api/user/check-auth",
        data: null
      });
      console.log("Check Auth")
      console.log("Data", data);
      yield put(actions.fulfillUser(data));
    } catch (error) {
      history.push("/auth/login")
      yield put(actions.failure(error));
    }
  });
}

// export const signUserUp = formData => ({
//   type: API,
//   payload: {
//     method: "POST",
//     url: "/api/user/signup",
//     formData
//   },
//   onRequest: SIGNUP.REQUEST,
//   onSuccess: (dispatch, data) => {
//     dispatch({ type: CLEAR_ALL_ERRORS });
//     dispatch({ type: SIGNUP.SUCCESS });
//     history.push(`/?signedup=true&email=${data.email}`);
//   },
//   onFailure: (dispatch, err) => {
//     dispatch({ type: SIGNUP.FAILURE, payload: err });
//     dispatch({ type: AUTH_LOGOUT });
//     dispatch({ type: CLEAR_ALL_ERRORS });
//   }
// });

// export const loginUser = formData => ({
//   type: API,
//   payload: {
//     method: "POST",
//     url: "/api/user/login",
//     formData
//   },
//   onRequest: LOGIN.REQUEST,
//   onSuccess: (dispatch, data) => {
//     dispatch({ type: LOGIN.SUCCESS, payload: data });
//     dispatch({ type: CLEAR_ALL_ERRORS });
//     history.push("/dashboard/bugs");
//   },
//   onFailure: (dispatch, err) => {
//     dispatch({ type: LOGIN.FAILURE, payload: err });
//     dispatch({ type: AUTH_LOGOUT });
//     dispatch({ type: CLEAR_ALL_ERRORS });
//   }
// });

// export const updateUserAvatar = formData => ({
//   type: API,
//   payload: {
//     method: "PATCH",
//     url: "/api/user/me/avatar/upload",
//     formData
//   },
//   onRequest: UPLOAD_AVATAR.REQUEST,
//   onSuccess: UPLOAD_AVATAR.SUCCESS,
//   onFailure: UPLOAD_AVATAR.FAILURE
// });

// export const updateUserBio = formData => ({
//   type: API,
//   payload: {
//     method: "PATCH",
//     url: "/api/user/me/bio",
//     formData
//   },
//   onRequest: UPDATE_BIO.REQUEST,
//   onSuccess: UPDATE_BIO.SUCCESS,
//   onFailure: UPDATE_BIO.FAILURE
// });
