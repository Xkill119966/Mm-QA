import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// import { StoreState } from "../store/store";

const AuthRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  // https://stackoverflow.com/a/56175010/10629172
  const checkingAuthStatus = useSelector(
    state => state.loading["auth/CHECK_AUTH"]
  );

  alert("Hiii");

  return (
    <Route
      {...rest}
      render={props =>
        checkingAuthStatus ? (
          <></>
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default AuthRoute;
