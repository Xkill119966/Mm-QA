import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

// import { DashboardWrapper, DashboardBody } from './Dashboard.style';

import AuthRoute from "../../components/AuthRoutes";
import Articles from "../Articles/Articles";
// import AddBug from 'components/AddBug/AddBug';
// import Navbar from 'components/Navbar/Navbar';
// import NotFound from 'components/NotFound';
// import Sidebar from 'components/Sidebar/Sidebar';
// import Footer from 'components/Footer';

// import Bugs from 'pages/Bugs/Bugs';
// import Profile from 'pages/Profile/Profile';
// import Profiles from 'pages/Profiles/Profiles';
// import SingleBug from 'pages/SingleBug/SingleBug';
// import Notifications from 'pages/Notifications/Notifications';

// extracting out the logic to prevent re-render
// const Navigation = React.memo(() => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

//   const handleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     document.addEventListener('click', (e: any) => {
//       if (e.target.closest('a')) {
//         setIsSidebarOpen(false);
//       }
//     });
//   }, []);
//   return (
//     <>
//       <Navbar handleSidebar={handleSidebar} />
//       <Sidebar isOpen={isSidebarOpen} />
//     </>
//   );
// });

const Dashboard = () => {
  return (
    // <DashboardWrapper>
    //   <Navigation />
    <div>
      <h1>Hello</h1>
    </div>
    // </DashboardWrapper>
  );
};

export default Dashboard;
