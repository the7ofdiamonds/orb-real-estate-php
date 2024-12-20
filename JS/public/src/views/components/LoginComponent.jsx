import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  login,
  loginWithToken,
  updateAccessToken,
  updateRefreshToken,
  updateUsername,
} from '../../controllers/loginSlice';
import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../controllers/messageSlice';

import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { isValidEmail, isValidPassword } from '../../../../utils/Validation';

import StatusBarComponent from '../../../../components/StatusBarComponent';

const firebaseAuth = getAuth();
const google = new GoogleAuthProvider();
const microsoft = new OAuthProvider('microsoft.com');
const apple = new OAuthProvider('apple');

function LoginComponent() {
  const dispatch = useDispatch();

  const {
    loginLoading,
    loginStatusCode,
    loginSuccessMessage,
    loginErrorMessage,
    accessToken,
    refreshToken,
    username,
  } = useSelector((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(setMessage('Enter your email and password to log in.'));
    dispatch(setMessageType('info'));
    dispatch(setShowStatusBar(Date.now()));
  }, []);

  useEffect(() => {
    if (loginLoading) {
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [loginLoading]);

  useEffect(() => {
    if (loginSuccessMessage) {
      dispatch(setMessage(loginSuccessMessage));
      dispatch(setMessageType('success'));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [loginSuccessMessage]);

  useEffect(() => {
    if (loginErrorMessage) {
      dispatch(setMessage(loginErrorMessage));
      dispatch(setMessageType('error'));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [loginErrorMessage]);

  useEffect(() => {
    if (username) {
      dispatch(updateUsername(username));
    }
  }, [dispatch, username]);

  useEffect(() => {
    if (accessToken && refreshToken && loginStatusCode == 200) {
      dispatch(updateAccessToken(accessToken));
      dispatch(updateRefreshToken(refreshToken));

      if (
        localStorage.getItem('access_token') != null &&
        localStorage.getItem('refresh_token') != null
      ) {
        dispatch(setShowStatusBar(''));
      }
    }
  }, [dispatch, accessToken, refreshToken, loginStatusCode]);

  const handleEmailChange = async (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = async (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      isValidEmail(email);
      isValidPassword(password);

      const loginRequest = {
        email: email,
        password: password,
      };

      dispatch(login(loginRequest));

      dispatch(setMessageType('info'));
      dispatch(setMessage('Standbye while an attempt to log you is made.'));
    } catch (error) {
      dispatch(setMessageType('error'));
      dispatch(setMessage(error.message));
      dispatch(setShowStatusBar(Date.now()));
    }
  };

  const handleGoogleSignIn = async () => {
    await signInWithPopup(firebaseAuth, google).then((response) => {
      var accessToken = response._tokenResponse.idToken;
      dispatch(updateAccessToken(accessToken));
      var refreshToken = response._tokenResponse.refreshToken;
      dispatch(updateRefreshToken(refreshToken));
      dispatch(loginWithToken());
    });
  };

  const handleMicrosoftSignIn = async () => {
    await signInWithPopup(firebaseAuth, microsoft).then((response) => {
      var accessToken = response._tokenResponse.idToken;
      dispatch(updateAccessToken(accessToken));
      var refreshToken = response._tokenResponse.refreshToken;
      dispatch(updateRefreshToken(refreshToken));
      dispatch(loginWithToken());
    });
  };

  const handleAppleSignIn = async () => {
    await signInWithPopup(firebaseAuth, apple).then((response) => {
      var accessToken = response._tokenResponse.idToken;
      dispatch(updateAccessToken(accessToken));
      var refreshToken = response._tokenResponse.refreshToken;
      dispatch(updateRefreshToken(refreshToken));
      dispatch(loginWithToken());
    });
  };

  return (
    <>
      <div className="login-options">
        <form className="email-pass" onSubmit={handleSubmit}>
          <div className="login-card card">
            <input
              className="input-email"
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />

            <input
              className="input-password"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <button id="login_btn" type="submit">
            <h3>LOGIN</h3>
          </button>
        </form>

        <div className="providers">
          <button className="login-button google" onClick={handleGoogleSignIn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            <h3>Login with Google</h3>
          </button>

          <button
            className="login-button microsoft"
            onClick={handleMicrosoftSignIn}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
              <path fill="#f35325" d="M0 0h10v10H0z" />
              <path fill="#81bc06" d="M11 0h10v10H11z" />
              <path fill="#05a6f0" d="M0 11h10v10H0z" />
              <path fill="#ffba08" d="M11 11h10v10H11z" />
            </svg>
            <h3>Login with Microsoft</h3>
          </button>

          <button className="login-button apple" onClick={handleAppleSignIn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="170px"
              viewBox="0 0 170 170"
              version="1.1"
              height="170px">
              <path
                d="m150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929 0.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002 0.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-0.9 2.61-1.85 5.11-2.86 7.51zm-31.26-123.01c0 8.1021-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375-0.119-0.972-0.188-1.995-0.188-3.07 0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.3113 11.45-8.597 4.62-2.2516 8.99-3.4968 13.1-3.71 0.12 1.0831 0.17 2.1663 0.17 3.2409z"
                fill="#FFF"
              />
            </svg>
            <h3>Login with Apple</h3>
          </button>
        </div>
      </div>

      <StatusBarComponent />
    </>
  );
}

export default LoginComponent;
