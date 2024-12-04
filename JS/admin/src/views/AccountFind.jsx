import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { findAccount } from '../controllers/accountSlice';
import { setMessage, setMessageType } from '../controllers/messageSlice';

function AccountFind(props) {
  const { email } = props;

  const dispatch = useDispatch();

  const [Email, setEmail] = useState(email);

  const {
    accountLoading,
    accountError,
    accountSuccessMessage,
    accountErrorMessage,
    id,
    providerGivenID,
    username,
    firstname,
    lastname,
    nickname,
    nicename,
    roles,
    phone,
  } = useSelector((state) => state.account);

  useEffect(() => {
    if(accountLoading){
      dispatch(setMessage('Standbye while the account is located.....'));
      dispatch(setMessageType('info'));
    } else {
      dispatch(setMessage(''));
    }
  }, [accountLoading]);

  useEffect(() => {
    if (accountSuccessMessage) {
      dispatch(setMessage(accountSuccessMessage));
      dispatch(setMessageType('success'));
    }
  }, [accountSuccessMessage]);

  useEffect(() => {
    if (accountError) {
      dispatch(setMessage(accountError));
      dispatch(setMessageType('error'));
    }
  }, [accountError]);

  useEffect(() => {
    if (accountErrorMessage) {
      dispatch(setMessage(accountErrorMessage));
      dispatch(setMessageType('error'));
    }
  }, [accountErrorMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    }
  };

  const handleFind = (e) => {
    e.preventDefault();

    if (Email == '') {
      dispatch(setMessage('An email is not provided.'));
    } else {
      dispatch(findAccount(Email));
    }
  };

  return (
    <>
      <div class="session-management-find" id="session_management_find">
        <form method="post" class="find-session" id="find_session">
          <h2>Find Session</h2>
          <div class="find-session-submit">
            <input
              type="text"
              name="email"
              placeholder="Email"
              id="email"
              value={Email}
              onChange={handleChange}
            />
            <button onClick={handleFind} id="find_session_btn" type="submit">
              Find
            </button>
          </div>
        </form>

        <div class="session" id="session">
          <div class="account-id">
            <h3>Account ID</h3>
            <h4 id="account_id">{`${id}`}</h4>
          </div>

          <div class="provider-given-id">
            <h3>Provider Given ID</h3>
            <h4 id="provider_given_id">{`${providerGivenID}`}</h4>
          </div>

          <div class="username">
            <h3>Username</h3>
            <h4 id="username">{`${username}`}</h4>
          </div>

          <div class="first-name">
            <h3>First Name</h3>
            <h4 id="first_name">{`${firstname}`}</h4>
          </div>

          <div class="last-name">
            <h3>Last Name</h3>
            <h4 id="last_name">{`${lastname}`}</h4>
          </div>

          <div class="nickname">
            <h3>nickname</h3>
            <h4 id="nickname">{`${nickname}`}</h4>
          </div>

          <div class="nicename">
            <h3>Nicename</h3>
            <h4 id="nicename">{`${nicename}`}</h4>
          </div>

          <div class="phone-number">
            <h3>Phone Number</h3>
            <h4 id="phone_number">{`${phone}`}</h4>
          </div>

          <div class="roles">
            <h3>Roles</h3>
            <h4 id="roles"></h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountFind;
