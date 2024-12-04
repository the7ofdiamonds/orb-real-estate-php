import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sendForgotPasswordEmail } from '../../controllers/passwordSlice';
import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../controllers/messageSlice';

import { isValidEmail } from '../../../../utils/Validation';

import StatusBarComponent from '../../../../components/StatusBarComponent';

function ForgotComponent() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const {
    passwordLoading,
    passwordSuccessMessage,
    passwordErrorMessage,
    passwordStatusCode,
  } = useSelector((state) => state.password);

  useEffect(() => {
    dispatch(
      setMessage('If you forgot your password, enter your username or email.')
    );
    dispatch(setShowStatusBar(Date.now()));
  }, []);

  useEffect(() => {
    if (passwordLoading) {
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [passwordLoading]);

  useEffect(() => {
    if (passwordSuccessMessage) {
      const urlParams = new URLSearchParams(window.location.search);
      const redirectTo = urlParams.get('redirectTo');

      setTimeout(() => {
        if (redirectTo === null) {
          window.location.href = '/login';
        } else {
          window.location.href = redirectTo;
        }
      }, 5000);

      dispatch(setMessageType('success'));
      dispatch(setMessage(passwordSuccessMessage));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [dispatch, passwordSuccessMessage]);

  useEffect(() => {
    if (passwordErrorMessage && passwordStatusCode != 403) {
      dispatch(setMessageType('error'));
      dispatch(setMessage(passwordErrorMessage));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [dispatch, passwordErrorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isValidEmail(email)) {
        dispatch(setMessageType('info'));
        dispatch(
          setMessage(
            'Standbye while an attempt to help get access to your account is made.'
          )
        );
        dispatch(sendForgotPasswordEmail(email));
      }
    } catch (error) {
      dispatch(setMessageType('error'));
      dispatch(setMessage(error.message));
      dispatch(setShowStatusBar(Date.now()));
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
  };

  return (
    <>
      <form className='forgot-form'>
        <div className="forgot-card card">
          <input
            className="input-email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" onClick={handleSubmit}>
          <h3>RESET</h3>
        </button>
      </form>

      <StatusBarComponent />
    </>
  );
}

export default ForgotComponent;
