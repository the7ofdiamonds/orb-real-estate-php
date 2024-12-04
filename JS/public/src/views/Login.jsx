import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLocation } from "../../../utils/Location";

import LoginComponent from './components/LoginComponent';
import NavigationLoginComponent from './components/NavigationLoginComponent';

function Login() {
  const dispatch = useDispatch();

  const { loginStatusCode, accessToken, refreshToken } = useSelector(
    (state) => state.login
  );

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (accessToken && refreshToken && loginStatusCode == 200) {
      const urlParams = new URLSearchParams(window.location.search);
      const redirectTo = urlParams.get('redirectTo');

      if (
        localStorage.getItem('access_token') != null &&
        localStorage.getItem('refresh_token') != null
      ) {
        setTimeout(() => {
          if (redirectTo == null) {
            window.location.href = '/dashboard';
          } else {
            window.location.href = redirectTo;
          }
        }, 5000);
      }
    }
  }, [dispatch, accessToken, refreshToken, loginStatusCode]);

  useEffect(() => {
    if (loginStatusCode == 404) {
      setTimeout(() => {
        window.location.href = '/signup';
      }, 5000);
    }
  }, [loginStatusCode]);

  return (
    <>
      <main className="login">
        <NavigationLoginComponent page={'login'} />
        <LoginComponent />
      </main>
    </>
  );
}

export default Login;
