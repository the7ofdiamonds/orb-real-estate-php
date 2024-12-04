import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import StatusBarComponent from '../../../components/StatusBarComponent';

import { setMessage, setMessageType } from '../controllers/messageSlice';

import AccountCreate from './AccountCreate';
import AccountFind from './AccountFind';
import AccountUpdate from './AccountUpdate';

import Details from './Details';

function Account() {
  const dispatch = useDispatch();

  const {
    accountError,
    accountSuccessMessage,
    accountErrorMessage,
    email,
    username,
    firstname,
    lastname,
    nickname,
    nicename,
    roles,
    phone,
    isAuthenticated,
    isCredentialsNonExpired,
    isAccountNonLocked,
    isEnabled,
    isAccountNonExpired,
  } = useSelector((state) => state.account);
  const { changeError, changeSuccessMessage, changeErrorMessage } = useSelector(
    (state) => state.change
  );

  const [showStatusbar, setShowStatusBar] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showFind, setShowFind] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleCreate = () => {
    setShowCreate(true);
    setShowFind(false);
    setShowUpdate(false);
    setShowDetails(false);
  };

  const handleFind = () => {
    setShowCreate(false);
    setShowFind(true);
    setShowUpdate(false);
    setShowDetails(false);
  };

  const handleUpdate = () => {
    setShowCreate(false);
    setShowFind(false);
    setShowUpdate(true);
    setShowDetails(false);
  };

  const handleDetails = () => {
    setShowCreate(false);
    setShowFind(false);
    setShowUpdate(false);
    setShowDetails(true);
  };

  useEffect(() => {
    if (
      accountError ||
      accountErrorMessage ||
      changeError ||
      changeErrorMessage
    ) {
      dispatch(setMessageType('error'));
      setShowStatusBar(true);

      setTimeout(() => {
        setShowStatusBar(false);
      }, 5000);

      if (accountError) {

        dispatch(setMessage(accountError));
      }

      if (accountErrorMessage) {
        dispatch(setMessage(accountErrorMessage));
      }

      if (changeError) {
        dispatch(setMessage(changeError));
      }

      if (changeErrorMessage) {
        dispatch(setMessage(changeErrorMessage));
      }
    }
  }, [accountError, accountErrorMessage, changeError, changeErrorMessage]);

  useEffect(() => {
    if (accountSuccessMessage || changeSuccessMessage) {
      dispatch(setMessageType('success'));
      setShowStatusBar(true);

      setTimeout(() => {
        setShowStatusBar(false);
      }, 5000);

      if (accountSuccessMessage) {
        dispatch(setMessage(accountSuccessMessage));
      }

      if (changeSuccessMessage) {
        dispatch(setMessage(changeSuccessMessage));
      }
    }
  }, [accountSuccessMessage, changeSuccessMessage]);

  return (
    <>
      <div class="account-management" id="account_management">
        <div class="options" id="options">
          <button onClick={handleCreate} id="create_account">
            <h3>Create Account</h3>
          </button>

          <button onClick={handleFind} id="find_account">
            <h3>Find Account</h3>
          </button>

          <button onClick={handleUpdate} id="update_account">
            <h3>Update Account</h3>
          </button>

          <button onClick={handleDetails} id="details">
            <h3>Details</h3>
          </button>
        </div>

        {showCreate && <AccountCreate />}

        {showFind && <AccountFind email={email} />}

        {showUpdate && (
          <AccountUpdate
            usrname={username}
            firstName={firstname}
            lastName={lastname}
            nickName={nickname}
            niceName={nicename}
            rolesSelected={roles}
            phoneNumber={phone}
          />
        )}

        {showDetails && (
          <Details
            email={email}
            isAuthenticated={isAuthenticated}
            isCredentialsNonExpired={isCredentialsNonExpired}
            isAccountNonLocked={isAccountNonLocked}
            isEnabled={isEnabled}
            isAccountNonExpired={isAccountNonExpired}
          />
        )}

        <span className={showStatusbar}>
          <StatusBarComponent />
        </span>
      </div>
    </>
  );
}

export default Account;
