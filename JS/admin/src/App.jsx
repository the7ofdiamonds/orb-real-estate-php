import { lazy, Suspense } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './model/store.js';

import LoadingComponent from '../../components/LoadingComponent.jsx';

const Dashboard = lazy(() => import('./views/Dashboard.jsx'));
const Account = lazy(() => import('./views/Account.jsx'));
const AccountCreate = lazy(() => import('./views/AccountCreate.jsx'));
const AccountFind = lazy(() => import('./views/AccountFind.jsx'));
const AccountUpdate = lazy(() => import('./views/AccountUpdate.jsx'));
const Details = lazy(() => import('./views/Details.jsx'));
const Password = lazy(() => import('./views/Password.jsx'));
const Session = lazy(() => import('./views/Session.jsx'));
const SessionConfigure = lazy(() => import('./views/SessionConfigure.jsx'));
const SessionFind = lazy(() => import('./views/SessionFind.jsx'));
const SessionGet = lazy(() => import('./views/SessionGet.jsx'));
const User = lazy(() => import('./views/User.jsx'));
const UserCreate = lazy(() => import('./views/UserCreate.jsx'));
const UserDetails = lazy(() => import('./views/UserDetails.jsx'));
const UserFind = lazy(() => import('./views/UserFind.jsx'));
const UserUpdate = lazy(() => import('./views/UserUpdate.jsx'));

const usePageQuery = () => {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  return searchParams.get('page');
};

function App() {
  const page = usePageQuery();

  return (
    <>
      <Provider store={store}>
        <Router>
          <Suspense fallback={<LoadingComponent />}>
            <Routes>
              {page === 'seven-tech-gateway' && (
                <Route path="/" element={<Dashboard />} />
              )}
              {page === 'seven-tech-gateway-account' && (
                <Route path="/" element={<Account />} />
              )}
              {page === 'seven-tech-gateway-account-create' && (
                <Route path="/" element={<AccountCreate />} />
              )}
              {page === 'seven-tech-gateway-account-find' && (
                <Route path="/" element={<AccountFind />} />
              )}
              {page === 'seven-tech-gateway-account-update' && (
                <Route path="/" element={<AccountUpdate />} />
              )}
              {page === 'seven-tech-gateway-details' && (
                <Route path="/" element={<Details />} />
              )}
              {page === 'seven-tech-gateway-password' && (
                <Route path="/" element={<Password />} />
              )}
              {page === 'seven-tech-gateway-session' && (
                <Route path="/" element={<Session />} />
              )}
              {page === 'seven-tech-gateway-session-configure' && (
                <Route path="/" element={<SessionConfigure />} />
              )}
              {page === 'seven-tech-gateway-session-find' && (
                <Route path="/" element={<SessionFind />} />
              )}
              {page === 'seven-tech-gateway-session-get' && (
                <Route path="/" element={<SessionGet />} />
              )}
              {page === 'seven-tech-gateway-user' && (
                <Route path="/" element={<User />} />
              )}
              {page === 'seven-tech-gateway-user-create' && (
                <Route path="/" element={<UserCreate />} />
              )}
              {page === 'seven-tech-gateway-user-details' && (
                <Route path="/" element={<UserDetails />} />
              )}
              {page === 'seven-tech-gateway-user-find' && (
                <Route path="/" element={<UserFind />} />
              )}
              {page === 'seven-tech-gateway-user-update' && (
                <Route path="/" element={<UserUpdate />} />
              )}
            </Routes>
          </Suspense>
        </Router>
      </Provider>
    </>
  );
}

export default App;
