import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './model/store.js';

import LoadingComponent from '../../components/LoadingComponent.jsx';

const FrontPage = lazy(() => import('./views/FrontPage.jsx'));
const About = lazy(() => import('./views/About.jsx'));
const Schedule = lazy(() => import('./views/Schedule.jsx'));
const Login = lazy(() => import('./views/Login.jsx'));
const LogOut = lazy(() => import('./views/Logout.jsx'));
const SignUp = lazy(() => import('./views/Signup.jsx'));
const Forgot = lazy(() => import('./views/Forgot.jsx'));
const Dashboard = lazy(() => import('./views/Dashboard.jsx'));
const AccountActivation = lazy(() => import('./views/AccountActivation.jsx'));
const AccountRecovery = lazy(() => import('./views/AccountRecovery.jsx'));
const PasswordRecovery = lazy(() => import('./views/PasswordRecovery.jsx'));

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Suspense fallback={<LoadingComponent />}>
            <Routes>
              <Route path="/" element={<FrontPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<LogOut />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot" element={<Forgot />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/account/activation/:emailEncoded/:userActivationKey"
                element={<AccountActivation />}
              />
              <Route
                path="/account/recovery/:emailEncoded/:userActivationKey"
                element={<AccountRecovery />}
              />
               <Route
                path="/password/recovery/:emailEncoded/:confirmationCode"
                element={<PasswordRecovery />}
              />
            </Routes>
          </Suspense>
        </Router>
      </Provider>
    </>
  );
}

export default App;
