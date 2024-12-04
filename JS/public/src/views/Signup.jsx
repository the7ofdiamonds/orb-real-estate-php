import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLocation } from '../../../utils/Location';

import NavigationLoginComponent from './components/NavigationLoginComponent';

import StatusBarComponent from '../../../components/StatusBarComponent';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../controllers/messageSlice';
import { signup } from '../controllers/signupSlice';
import {
  updateAccessToken,
  updateRefreshToken,
} from '../controllers/loginSlice';

import {
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidUsername,
  isValidPhone,
} from '../../../utils/Validation';

function SignUpComponent() {
  let page = 'signup';

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nicename, setNicename] = useState('');
  const [nickname, setNickname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const {
    signupLoading,
    signupStatusCode,
    signupSuccessMessage,
    signupErrorMessage,
    accessToken,
    refreshToken,
  } = useSelector((state) => state.signup);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    dispatch(
      setMessage(
        'Enter the username, email, and password of your choice to sign up.'
      )
    );
    dispatch(setShowStatusBar(Date.now()));
  }, []);

  useEffect(() => {
    if (signupLoading) {
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [signupLoading]);

  useEffect(() => {
    if (signupSuccessMessage) {
      dispatch(setMessageType('success'));
      dispatch(setMessage(signupSuccessMessage));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [signupSuccessMessage]);

  useEffect(() => {
    if (signupErrorMessage) {
      dispatch(setMessageType('error'));
      dispatch(setMessage(signupErrorMessage));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [signupErrorMessage]);

  useEffect(() => {
    if (accessToken && refreshToken) {
      dispatch(updateAccessToken(accessToken));
      dispatch(updateRefreshToken(refreshToken));
    }
  }, [dispatch, accessToken, refreshToken]);

  useEffect(() => {
    if (accessToken && refreshToken && signupStatusCode == 200) {
      const urlParams = new URLSearchParams(window.location.search);
      const redirectTo = urlParams.get('redirectTo');

      setTimeout(() => {
        if (redirectTo == null) {
          window.location.href = '/dashboard';
        } else {
          window.location.href = redirectTo;
        }
      }, 5000);
    }
  }, [dispatch, accessToken, refreshToken, signupStatusCode]);

  const handleChangePassword = (e) => {
    try {
      if (e.target.name == 'password' && isValidPassword(e.target.value)) {
        setPassword(e.target.value);
        dispatch(setMessage('Password entered is valid.'));
        dispatch(setMessageType('success'));
      }
    } catch (error) {
      dispatch(setMessage(error.message));
      dispatch(setMessageType('error'));
    }
  };

  const handleChangeConfirmPassword = (e) => {
    try {
      if (e.target.name == 'confirm-password' && e.target.value == password) {
        setConfirmPassword(e.target.value);
        dispatch(setMessage('Passwords match.'));
        dispatch(setMessageType('success'));
      } else {
        throw Error('Passwords do not match.');
      }
    } catch (error) {
      dispatch(setMessage(error.message));
      dispatch(setMessageType('error'));
    }
  };

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;

      if (name === 'username') {
        setUsername(value);

        if (isValidUsername(value)) {
          dispatch(setMessage('Username is valid.'));
          dispatch(setMessageType('success'));
        }
      } else if (name === 'email') {
        setEmail(value);

        if (isValidEmail(value)) {
          dispatch(setMessage('Email is valid.'));
          dispatch(setMessageType('success'));
        }
      } else if (name === 'nicename') {
        setNicename(value);

        if (isValidName(value)) {
          dispatch(setMessage('Nicename is valid.'));
          dispatch(setMessageType('success'));
        }
      } else if (name === 'nickname') {
        setNickname(value);

        if (isValidName(value)) {
          dispatch(setMessage('Nickname is valid.'));
          dispatch(setMessageType('success'));
        }
      } else if (name === 'firstname') {
        setFirstname(value);

        if (isValidName(value)) {
          dispatch(setMessage('First name is valid.'));
          dispatch(setMessageType('success'));
        }
      } else if (name === 'lastname') {
        setLastname(value);

        if (isValidName(value)) {
          dispatch(setMessage('Last name is valid.'));
          dispatch(setMessageType('success'));
        }
      } else if (name === 'phone') {
        setPhone(value);

        if (isValidPhone(value)) {
          dispatch(setMessage('Phone number is valid.'));
          dispatch(setMessageType('success'));
        }
      }
    } catch (error) {
      dispatch(setMessage(error.message));
      dispatch(setMessageType('error'));
    }
  };

  const credentials = {
    username: username,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    nicename: nicename,
    nickname: nickname,
    firstname: firstname,
    lastname: lastname,
    phone: phone,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== '' && confirmPassword !== '') {
      dispatch(setMessageType('info'));
      dispatch(setMessage('Standby signup attempt in progress.'));
      dispatch(signup(credentials));
    }
  };

  return (
    <>
      <main className='signup'>
        <NavigationLoginComponent page={page} />

        <form className="signup-form">
          <div className="required-card card">
            <input
              className="input-email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              className="input-password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChangePassword}
              required
            />
            <input
              className="input-password"
              type="password"
              name="confirm-password"
              placeholder="Confirm Password"
              onChange={handleChangeConfirmPassword}
              required
            />
          </div>

          <div className="optional-card card">
            <input
              className="input-username"
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <input
              className="input-name"
              type="text"
              name="nicename"
              placeholder="Nice Name (eg. /nicename)"
              onChange={handleChange}
              required
            />
            <input
              className="input-name"
              type="text"
              name="nickname"
              placeholder="Nickname"
              onChange={handleChange}
              required
            />
          </div>

          <div className="account-card card">
            <input
              className="input-name"
              type="text"
              name="firstname"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <input
              className="input-name"
              type="text"
              name="lastname"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />

            <input
              className="input-phone"
              type="tel"
              name="phone"
              id="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="123-456-7890"
              onChange={handleChange}
            />
          </div>

          <button type="submit" onClick={handleSubmit} id="signup_btn">
            <h3>SIGN UP</h3>
          </button>
        </form>

        <StatusBarComponent />
      </main>
    </>
  );
}

export default SignUpComponent;
