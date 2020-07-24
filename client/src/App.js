// import React, { useEffect } from "react";
// import Notifications from "react-notify-toast";
// import { ThemeProvider } from "styled-components";
// import { Router, Route, Switch } from "react-router-dom";
// import history from "./utils/history";
// import ErrorBoundary from "./components/ErrorBoundary";
// import theme from "./@ui/theme";
// import GlobalStyles from "./styles/GlobalStyles";
// import Home from "./pages/Home/Home";
// import Login from "./pages/Login/Login";
// // import { toast } from '@bug-ui';

// // import socket from 'utils/socket';
// // import history from 'utils/history';

// // import Login from 'pages/Login/Login';
// import Signup from "./pages/Signup/Signup";
// import Dashboard from "./pages/Dashboard/Dashboard";

// // import NotFound from 'components/NotFound';
// import AuthRoute from "./components/AuthRoutes";
// // import SEO from 'components/SEO';

// // socket.on("received-notification", () => {
// //   toast.info("New notifications available");
// // });

// const App = () => {
//   useEffect(() => {
//     // intercept a:href links in markdown
//     document.addEventListener("click", e => {
//       if (!e.target.closest(".markdown-preview") || e.target.tagName !== "A") {
//         return;
//       }
//       const href = e.target.getAttribute("href");
//       if (href.match(/http(s?):\/\//)) return;
//       e.preventDefault();
//       history.push(href);
//     });
//   }, []);

//   return (
//     <ThemeProvider theme={theme}>
//       {/* <SEO title="BugVilla | Universal bug tracker for everyone!" /> */}

//       <Router history={history}>
//         <Notifications
//           options={{
//             zIndex: 200,
//             top: "85%",
//             colors: {
//               error: {
//                 color: theme.colors.red,
//                 backgroundColor: theme.colors.redlight
//               },
//               success: {
//                 color: theme.colors.green,
//                 backgroundColor: theme.colors.greenlight
//               },
//               info: {
//                 color: theme.colors.primary,
//                 backgroundColor: theme.colors.accent
//               }
//             }
//           }}
//         />
//         <GlobalStyles />
//         <ErrorBoundary>
//           <div>
//             <Switch>
//               <Switch>
//                 <Route path="/" exact>
//                   <Home right={Login} />
//                 </Route>
//                 <Route path="/signup" exact>
//                   <Home right={Signup} />
//                 </Route>

//                 <AuthRoute path="/" component={Dashboard} />
//                 {/* <Route component={NotFound} /> */}
//               </Switch>
//               {/* <Route component={NotFound} /> */}
//             </Switch>
//           </div>
//         </ErrorBoundary>
//       </Router>
//     </ThemeProvider>
//   );
// };

// export default App;

/**
 * Entry application component used to compose providers and render Routes.
 * */

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { LastLocationProvider } from "react-router-last-location";
import Notifications from "react-notify-toast";
import { ThemeProvider } from "styled-components";
import theme from "./@ui/theme";
import { Routes } from "./router/Routes";
import GlobalStyles from "./styles/GlobalStyles";

// import { I18nProvider, LayoutSplashScreen, ThemeProvider } from "./_metronic";

export default function App({ store }) {
  return (
    /* Provide Redux store */
    <Provider store={store}>
      {/* <Provider store={store} loading={<LayoutSplashScreen />}> */}

      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      {/* <PersistGate persistor={persistor}> */}
      {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
      {/* <React.Suspense fallback={<LayoutSplashScreen />}> */}

      {/* Override `basename` (e.g: `homepage` in `package.json`) */}
      <BrowserRouter>
        {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
        <LastLocationProvider>
          {/* Provide Metronic theme overrides. */}
          <ThemeProvider theme={theme}>
            <Notifications
              options={{
                zIndex: 200,
                top: "85%",
                colors: {
                  error: {
                    color: theme.colors.red,
                    backgroundColor: theme.colors.redlight
                  },
                  success: {
                    color: theme.colors.green,
                    backgroundColor: theme.colors.greenlight
                  },
                  info: {
                    color: theme.colors.primary,
                    backgroundColor: theme.colors.accent
                  }
                }
              }}
            />
            <GlobalStyles />
            {/* Provide `react-intl` context synchronized with Redux state.  */}
            {/* <I18nProvider> */}
            {/* Render routes with provided `Layout`. */}
            <Routes />
            {/* </I18nProvider> */}
          </ThemeProvider>
        </LastLocationProvider>
      </BrowserRouter>
      {/* </React.Suspense> */}
      {/* </PersistGate> */}
    </Provider>
  );
}
