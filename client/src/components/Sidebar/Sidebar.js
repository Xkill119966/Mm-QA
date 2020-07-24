import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import http from "../../utils/httpInstance";
import { Avatar, BugVillaLogo, Flex, IconLink } from "../../@ui";

import SidebarWrapper, { SidebarLinks } from "./Sidebar.style";
// import { logUserOut } from "store/ducks/auth";

const Sidebar = ({ isOpen }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  console.log("User", user)

  const logout = () => {
    alert("Logout")
    // http.get("/api/user/logout").then(() => {
    //   console.log("logged out");
    //   history.push("/");
    //   // dispatch(logUserOut());
    // });
  };

  return (
    <SidebarWrapper isOpen={isOpen}>
      <Link to="/articles">
        {/* <BugVillaLogo width="100px" /> */}
      </Link>
      <div className="sidebar--sticky">
        <Flex align="center" justify="flex-start">
          <Avatar
            className="dashboard__avatar"
            width="130px"
            height="130px"
            size={130}
            username={user.username}
          />
          <div>
            <h2 className="text--bold">{user ? user.name : ""}</h2>
            <p className="color--gray">@{user ? user.username : ""}</p>
          </div>
        </Flex>

        <SidebarLinks>
          <Flex gap="large" direction="column">
            <IconLink isNav icon="home" to="/dashboard/articles">
              Articles
            </IconLink>
            {/* <IconLink isNav icon="times" to="/dashboard/bugs?status=closed">
              Closed Bugs
            </IconLink>
            <IconLink isNav icon="bell" to="/dashboard/notifications">
              Notifications
            </IconLink> */}
            <IconLink isNav icon="user" to="/profiles">
              Profiles
            </IconLink>
            <IconLink isNav icon="sign-out-alt" to="#" onClick={logout}>
              Logout
            </IconLink>
          </Flex>
        </SidebarLinks>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
