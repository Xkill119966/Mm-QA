/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/pages/auth/AuthPage`, `src/pages/home/HomePage`).
 */

import React from "react";
import { Redirect, Switch, withRouter } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { useLastLocation } from "react-router-last-location";

import HomePage from "../pages/Home";
import AuthPage from "../pages/Auth/AuthPage";
import * as routerHelpers from "./RoutesHelper";
export const Routes = withRouter(({ history }) => {
  const lastLocation = useLastLocation();
  routerHelpers.saveLastLocation(lastLocation);
  const { isAuthorized, userLastLocation } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.isAuthenticated,
      userLastLocation: routerHelpers.getLastLocation()
    }),
    shallowEqual
  );



  return (
    /* Create `LayoutContext` from current `history` and `menuConfig`. */

    <Switch>
      {!isAuthorized ? (
        /* Render auth page when user at `/auth` and not authorized. */
        <AuthPage />
      ) : (
        /* Otherwise redirect to root page (`/`) */
        <Redirect from="/auth" to={userLastLocation} />
      )}
      {/* 
        <Route path="/error" component={ErrorsPage} />
        <Route path="/logout" component={LogoutPage} /> */}

      {!isAuthorized ? (
        /* Redirect to `/auth` when user is not authorized */
        <Redirect to="/auth/login" />
      ) : (
        // <Layout>
        <HomePage userLastLocation={userLastLocation} />
        // </Layout>
      )}
    </Switch>
  );
});
