import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logout, logoutAll } from '../../controllers/logoutSlice';
import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../../controllers/messageSlice';

import StatusBarComponent from '../../../../components/StatusBarComponent';

function AuthComponent() {
  const dispatch = useDispatch();

  const {
    logoutLoading,
    logoutError,
    logoutSuccessMessage,
    logoutErrorMessage,
    logoutStatusCode,
  } = useSelector((state) => state.logout);

  useEffect(() => {
    if (logoutLoading) {
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [logoutLoading]);

  useEffect(() => {
    if (logoutSuccessMessage) {
      dispatch(setMessageType('success'));
      dispatch(setMessage(logoutSuccessMessage));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [logoutSuccessMessage]);

  useEffect(() => {
    if (logoutErrorMessage) {
      dispatch(setMessageType('error'));
      dispatch(setMessage(logoutErrorMessage));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [logoutErrorMessage]);

  useEffect(() => {
    if (logoutError) {
      dispatch(setMessageType('error'));
      dispatch(setMessage(logoutError));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [logoutError]);

  useEffect(() => {
    if (logoutStatusCode == 200) {
      setTimeout(() => {
        window.location.href = '/';
      }, 5000);
    }
  }, [logoutStatusCode]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLogoutAll = () => {
    dispatch(logoutAll());
  };

  return (
    <>
      <main className="auth">
        <span className="logout">
          <button onClick={handleLogout} id="logout_btn">
            <h3>LOG OUT</h3>
          </button>

          <button onClick={handleLogoutAll} id="logout_all_btn">
            <h3>LOG OUT ALL</h3>
          </button>
        </span>

        <StatusBarComponent />
      </main>
    </>
  );
}

export default AuthComponent;
