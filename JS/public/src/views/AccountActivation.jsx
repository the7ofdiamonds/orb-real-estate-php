import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { activateAccount } from '../controllers/accountSlice';
import {
  setMessage,
  setMessageType,
  setShowStatusBar
} from '../controllers/messageSlice';

import StatusBarComponent from '../../../components/StatusBarComponent';

import { isValidEmail } from '../../../utils/Validation';

function AccountActivation() {
  const { emailEncoded, userActivationKey } = useParams();

  const email = emailEncoded.replace(/%40/g, '@');

  const dispatch = useDispatch();

  const {
    accountLoading,
    accountSuccessMessage,
    accountErrorMessage,
    accountStatusCode
  } = useSelector((state) => state.account);

  useEffect(() => {
    if (accountLoading) {
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [accountLoading]);

  useEffect(() => {
    if (accountSuccessMessage) {
      dispatch(setMessage(accountSuccessMessage));
      dispatch(setMessageType('success'));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [accountSuccessMessage]);

  useEffect(() => {
    if (accountStatusCode == 200) {
      setTimeout(() => {
        window.location.href = '/login';
      }, 5000);
    }
  }, [accountStatusCode]);

  useEffect(() => {
    if (accountErrorMessage) {
      dispatch(setMessage(accountErrorMessage));
      dispatch(setMessageType('error'));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [accountErrorMessage]);

  useEffect(() => {
    try {
      if (isValidEmail(email)) {
        dispatch(setShowStatusBar(Date.now()));
        dispatch(setMessageType('info'));
        dispatch(
          setMessage(
            'Standbye while an attempt to activate your account is made.'
          )
        );

        const activationRequest = {
          email: email,
          user_activation_key: userActivationKey,
        };

        dispatch(activateAccount(activationRequest));
      }
    } catch (error) {
      dispatch(setShowStatusBar(Date.now()));
      dispatch(setMessageType('error'));
      dispatch(setMessage(error.message));
    }
  }, [dispatch, email, userActivationKey]);

  return (
    <>
      <main>
        <StatusBarComponent />
      </main>
    </>
  );
}

export default AccountActivation;
