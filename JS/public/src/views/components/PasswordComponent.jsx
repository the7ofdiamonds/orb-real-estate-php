import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changePassword } from '../../controllers/passwordSlice';
import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../controllers/messageSlice';

import { isValidPassword } from '../../../../utils/Validation';

import StatusBarComponent from '../../../../components/StatusBarComponent';

function PasswordComponent() {
  const dispatch = useDispatch();

  const {
    passwordLoading,
    passwordSuccessMessage,
    passwordErrorMessage,
    passwordStatusCode,
  } = useSelector((state) => state.password);

  const { loginStatusCode } = useSelector((state) => state.login);

  const [showLogin, setShowLogin] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setMessage('Enter your preferred password twice.');
    dispatch(setShowStatusBar(Date.now()));
  }, []);

  useEffect(() => {
    if (passwordLoading) {
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [passwordLoading]);

  useEffect(() => {
    if (loginStatusCode == 200) {
      setShowLogin(false);
    }
  }, [loginStatusCode]);

  useEffect(() => {
    if (passwordStatusCode == 403) {
      setShowLogin(true);
    }
  }, [passwordStatusCode]);

  useEffect(() => {
    if (passwordSuccessMessage) {
      setMessage(passwordSuccessMessage);
      setMessageType('success');
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [passwordSuccessMessage]);

  useEffect(() => {
    if (passwordErrorMessage) {
      setMessage(passwordErrorMessage);
      setMessageType('error');
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [passwordErrorMessage]);

  const handleChangePassword = (e) => {
    try {
      if (e.target.name == 'password' && isValidPassword(e.target.value)) {
        setPassword(e.target.value);
        setMessage('Password entered is valid.');
        setMessageType('success');
      }
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');
    }
  };

  const handleChangeConfirmPassword = (e) => {
    try {
      if (e.target.name == 'confirm-password' && e.target.value == password) {
        setConfirmPassword(e.target.value);
        setMessage('Passwords match.');
        setMessageType('success');
      } else {
        throw Error('Passwords do not match.');
      }
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== '' && confirmPassword !== '') {
      setMessage('Standby for confirmation of password change.');
      dispatch(changePassword({ password, confirmPassword }));
    }
  };

  return (
    <>
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
                    id="change_password_btn">
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

      {showLogin && (
        <div className="modal-overlay">
          <main className="login">
            <LoginComponent />
          </main>
        </div>
      )}
    </>
  );
}

export default PasswordComponent;
