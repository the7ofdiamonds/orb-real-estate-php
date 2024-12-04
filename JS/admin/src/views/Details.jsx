import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AdminDelete from './AdminDelete';

import {
  expireAccount,
  unexpireAccount,
  expireCredentials,
  unexpireCredentials,
  lockAccount,
  unlockAccount,
  disableAccount,
  enableAccount,
} from '../controllers/detailsSlice';
import { setMessage, setMessageType } from '../controllers/messageSlice';

function Details(props) {
  const {
    email,
    isCredentialsNonExpired,
    isAccountNonLocked,
    isEnabled,
    isAccountNonExpired,
  } = props;

  return (
    <>
      <div class="details" id="details">
        <form method="post" class="subscription" id="subscription">
          <h3>Subscription Current</h3>
          {isAccountNonExpired ? (
            <span>
              <h4 id="expired">True</h4>
              <button
                type="submit"
                class="unsubscribe-btn"
                id="unsubscribe_btn">
                Unsubscribe
              </button>
            </span>
          ) : (
            <span>
              <h4 id="expired">False</h4>
              <button type="submit" class="subscribe-btn" id="subscribe_btn">
                Subscribe
              </button>
            </span>
          )}
        </form>

        <form method="post" class="password" id="password">
          <h3>Credentials Current</h3>
          {isCredentialsNonExpired ? (
            <span>
              <h4 id="credentials">True</h4>
              <button type="submit" class="unexpire-btn" id="unexpire_btn">
                Unexpire
              </button>
            </span>
          ) : (
            <span>
              <h4 id="credentials">False</h4>
              <button type="submit" class="expire-btn" id="expire_btn">
                Expire
              </button>
            </span>
          )}
        </form>

        <form method="post" class="lock-account" id="lock_account">
          <h3>Account Unlocked</h3>
          {isAccountNonLocked ? (
            <span>
              <h4 id="locked">True</h4>
              <button type="submit" class="lock-btn" id="lock_btn">
                Lock
              </button>
            </span>
          ) : (
            <span>
              <h4 id="locked">False</h4>
              <button type="submit" class="unlock-btn" id="unlock_btn">
                Unlock
              </button>
            </span>
          )}
        </form>

        <form method="post" class="enable-account" id="enable_account">
          <h3>Account Enabled</h3>
          {isEnabled ? (
            <span>
              <h4 id="enabled">True</h4>
              <button type="submit" class="disable-btn" id="disable_btn">
                Disable
              </button>
            </span>
          ) : (
            <span>
              <h4 id="enabled">False</h4>
              <button type="submit" class="enable-btn" id="enable_btn">
                Enable
              </button>
            </span>
          )}
        </form>

        {!isCredentialsNonExpired &&
          !isAccountNonLocked &&
          !isEnabled &&
          !isAccountNonExpired && <AdminDelete email={email} />}
      </div>
    </>
  );
}

export default Details;
