import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../controllers/logoutSlice';

import StatusBarComponent from '../../../components/StatusBarComponent';

import {
  setMessage,
  setMessageType,
  setShowStatusBar
} from '../controllers/messageSlice';

function Logout() {
  const dispatch = useDispatch();

  const {
    logoutSuccessMessage,
    logoutErrorMessage,
    logoutError,
    logoutStatusCode
  } = useSelector((state) => state.logout);

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
      dispatch(setMessage(logoutError.message));
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

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <main className="logout">
        <button onClick={handleClick}>
          <h3>LOG OUT</h3>
        </button>

        <StatusBarComponent />
      </main>
    </>
  );
}

export default Logout;
