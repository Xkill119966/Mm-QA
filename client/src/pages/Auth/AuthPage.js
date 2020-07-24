import React, { useEffect } from "react";
// import { useSelector } from 'react-redux';
// import { StoreState } from 'store';
import { useHistory } from "react-router-dom";
import { Link, Switch, Route, Redirect } from "react-router-dom";

import { Flex } from "../../@ui/Flex";
// import circleShapes from 'assets/svg/circle_shapes.svg';

import HomeWrapper from "./Auht.style";
import Login from "./Login/Login"
const Auth = () => {

  return (
    <HomeWrapper>
      {/* <img className="home__shape" src={circleShapes} /> */}
      <Flex>
        <div className="home__left">
          <div className="home__text">
            <h1 className="text--light">Mm</h1>
            <h1 className="text--light">QA</h1>
            <span>Question and Answer About Islam</span>
            {/* <IconLink className="color--white" icon="arrow-right" to="/bugs">
              Wanna see the currenty active bugs?
            </IconLink> */}
          </div>
        </div>
        <div className="home__right">
          <Switch>
            <Route path="/auth/login" component={Login} />
            {/* <Route path="/auth/registration" component={Registration} />
            <Route path="/auth/forgot-password" component={ForgotPassword} /> */}
            <Redirect from="/auth" exact={true} to="/auth/login" />
            <Redirect to="/auth/login" />
          </Switch>
          {/* <Right /> */}
        </div>
      </Flex>
    </HomeWrapper>
  );
};

export default Auth;
