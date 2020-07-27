import React, { Suspense, lazy, useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// import { LayoutSplashScreen } from "../../../_metronic";
import { DashboardBody, DashboardWrapper } from "./Home.Style";
import Articles from "../pages/Articles/Articles";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
const Navigation = React.memo(() => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    document.addEventListener("click", e => {
      if (e.target.closest("a")) {
        setIsSidebarOpen(false);
      }
    });
  }, []);
  return (
    <>
      <Navbar handleSidebar={handleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
    </>
  );
});

export default function HomePage({ userLastLocation }) {
  return (
    // <Suspense fallback={<LayoutSplashScreen />}>
    <Suspense>
      <DashboardWrapper>
        <Navigation />
        <div>
          <DashboardBody>
            <Switch>
            {
              <Redirect exact from="/" to="/dashboard/articles" />
            }
              <Route path="/dashboard/articles" component={Articles} />
            </Switch>
          </DashboardBody>
          {/* <Footer /> */}
        </div>
      </DashboardWrapper>
    </Suspense>
  );
}
