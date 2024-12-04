import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../controllers/messageSlice';
import { updatePassword } from '../controllers/passwordSlice';

import { isValidPassword } from '../../../utils/Validation';

import StatusBarComponent from '../../../components/StatusBarComponent';

function PasswordRecovery() {
  const { emailEncoded, confirmationCode } = useParams();

  const email = emailEncoded.replace(/%40/g, '@');

  const dispatch = useDispatch();

  const {
    passwordLoading,
    passwordSuccessMessage,
    passwordErrorMessage,
    passwordStatusCode,
  } = useSelector((state) => state.password);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    dispatch(setMessage('Please enter your desired password in both fields.'));
    dispatch(setShowStatusBar(Date.now()));
  }, []);

  useEffect(() => {
    if (passwordLoading) {
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [passwordLoading]);

  useEffect(() => {
    if (passwordSuccessMessage) {
      dispatch(setMessage(passwordSuccessMessage));
      dispatch(setMessageType('success'));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [passwordSuccessMessage]);

  useEffect(() => {
    if (passwordErrorMessage) {
      dispatch(setMessage(passwordErrorMessage));
      dispatch(setMessageType('error'));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [passwordErrorMessage]);

  useEffect(() => {
    if (passwordStatusCode == 200) {
      dispatch(setShowStatusBar(Date.now()));

      setTimeout(() => {
        window.location.href = '/login';
      }, 5000);
    }
  }, [passwordStatusCode]);

  useEffect(() => {
    if (passwordStatusCode == 403) {
      dispatch(setShowStatusBar(Date.now()));

      setTimeout(() => {
        window.location.href = '/forgot';
      }, 5000);
    }
  }, [passwordStatusCode]);

  const handleChangePassword = (e) => {
    try {
      if (e.target.name == 'password' && isValidPassword(e.target.value)) {
        setPassword(e.target.value);
        dispatch(setMessage('The password entered is valid.'));
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
        dispatch(setMessage('The passwords match.'));
        dispatch(setMessageType('success'));
      } else {
        throw new Error('The passwords do not match.');
      }
    } catch (error) {
      dispatch(setMessage(error.message));
      dispatch(setMessageType('error'));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== '' && confirmPassword !== '') {
      dispatch(setMessage('Standby for confirmation of password change.'));
      dispatch(setMessageType('info'));
      dispatch(
        updatePassword({ email, confirmationCode, password, confirmPassword })
      );
    }
  };

  return (
    <>
      <section>
        <main>
          <form action="">
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChangePassword}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="password"
                      name="confirm-password"
                      placeholder="Confirm Password"
                      onChange={handleChangeConfirmPassword}
                      required
                    />
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      id="confirm_password_btn">
                      <h3>CONFIRM</h3>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <StatusBarComponent />
                  </td>
                </tr>
              </tfoot>
            </table>
          </form>
        </main>
      </section>
    </>
  );
}

export default PasswordRecovery;
