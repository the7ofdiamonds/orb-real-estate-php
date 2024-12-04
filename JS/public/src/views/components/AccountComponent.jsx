import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { lockAccount } from '../../controllers/accountSlice';
import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../controllers/messageSlice';

import LoginComponent from './LoginComponent';

import StatusBarComponent from '../../../../components/StatusBarComponent';

function AccountComponent() {
  const dispatch = useDispatch();

  const {
    accountLoading,
    accountSuccessMessage,
    accountErrorMessage,
    accountStatusCode,
  } = useSelector((state) => state.account);
  const { email } = useSelector((state) => state.user);
  const { loginStatusCode } = useSelector((state) => state.login);

  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (accountLoading) {
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [accountLoading]);

  useEffect(() => {
    if (loginStatusCode == 200) {
      setShowLogin(false);
    }
  }, [loginStatusCode]);

  useEffect(() => {
    if (accountSuccessMessage) {
      dispatch(setMessageType('success'));
      dispatch(setMessage(accountSuccessMessage));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [accountSuccessMessage]);

  useEffect(() => {
    if (accountErrorMessage && accountStatusCode != 403) {
      dispatch(setMessageType('error'));
      dispatch(setMessage(accountErrorMessage));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [accountErrorMessage]);

  useEffect(() => {
    if (accountStatusCode != 403 && message != '') {
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [accountStatusCode, message]);

  useEffect(() => {
    if (accountStatusCode == 200) {
      setTimeout(() => {
        window.location.href = '/';
      }, 5000);
    }
  }, [accountStatusCode]);

  useEffect(() => {
    if (accountStatusCode == 403) {
      setShowLogin(true);
    }
  }, [accountStatusCode]);

  const handleLockAccount = () => {
    if (email != '' || localStorage.getItem('email') != '') {
      dispatch(setMessageType('info'));
      dispatch(setMessage('Standbye while your account is being locked.'));
      dispatch(lockAccount(email ? email : localStorage.getItem('email')));
    } else {
      dispatch(setMessageType('error'));
      dispatch(setMessage('An email is required to lock your account.'));
      dispatch(setShowStatusBar(Date.now()));
    }
  };

  return (
    <>
      <main className="account">
        <span className="lock-account">
          <button onClick={handleLockAccount} id="lock_account_btn">
            <h3>LOCK ACCOUNT</h3>
          </button>
        </span>

        <StatusBarComponent />
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

export default AccountComponent;
